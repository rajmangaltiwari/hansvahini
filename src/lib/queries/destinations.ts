import 'server-only'

import { cache } from 'react'
import { createClient, createStaticClient } from '@/src/lib/supabase/server'
import { rowToDestination } from './map'
import type { Destination, Region } from '@/src/data/destinations'

/**
 * Public reads use the session-less client on purpose.
 *
 * Touching cookies() opts a route out of static rendering, and the marketing
 * pages are the whole reason this site is fast — the root layout alone would
 * have turned every page dynamic. Anonymous also means RLS returns published
 * rows only, which is exactly what the public should see.
 *
 * Pass `includeDrafts` from admin screens: that uses the cookie-bound client,
 * so the signed-in admin's session lets RLS return drafts too.
 */
async function db(includeDrafts: boolean) {
  return includeDrafts ? await createClient() : createStaticClient()
}


/**
 * Database replacements for the helpers that used to read the static array in
 * src/data/destinations.ts. Same names, same return shapes — now async.
 *
 * Visibility is handled by RLS rather than by a flag passed around here: an
 * anonymous visitor's request only ever sees `status = 'published'`, while a
 * signed-in admin's request sees drafts too. One function, correct for both.
 *
 * Every export is wrapped in React's cache(), so a page that asks three
 * different components for the destination list still makes one query.
 */

const SELECT = '*'

export const listDestinations = cache(async (includeDrafts = false): Promise<Destination[]> => {
  const supabase = await db(includeDrafts)
  const { data, error } = await supabase.from('destinations').select(SELECT).order('name')

  if (error) {
    console.error('[queries] listDestinations:', error.message)
    return []
  }
  return (data ?? []).map(rowToDestination)
})

export const getDestinationBySlug = cache(async (slug: string, includeDrafts = false): Promise<Destination | undefined> => {
  const supabase = await db(includeDrafts)
  const { data, error } = await supabase
    .from('destinations')
    .select(SELECT)
    .eq('slug', slug)
    .maybeSingle()

  // A miss is not an error — the caller turns it into notFound().
  if (error) {
    console.error('[queries] getDestinationBySlug:', error.message)
    return undefined
  }
  return data ? rowToDestination(data) : undefined
})

/** Slugs only — for generateStaticParams, which does not need whole records. */
export const destinationSlugs = cache(async (): Promise<string[]> => {
  // Session-less on purpose — this runs at build time, where cookies() throws.
  const supabase = createStaticClient()
  const { data, error } = await supabase
    .from('destinations')
    .select('slug')
    .eq('status', 'published')

  if (error) {
    console.error('[queries] destinationSlugs:', error.message)
    return []
  }
  return (data ?? []).map((row) => row.slug as string)
})

export const countByRegion = cache(async (region: Region | 'All'): Promise<number> => {
  const all = await listDestinations()
  return region === 'All' ? all.length : all.filter((d) => d.region === region).length
})

/** Most-reviewed first — the fallback ordering when no picks are set. */
export const popularDestinations = cache(async (limit = 6): Promise<Destination[]> => {
  const all = await listDestinations()
  return [...all].sort((a, b) => b.reviews - a.reviews).slice(0, limit)
})

/**
 * The homepage strip: exactly what is starred in /admin/destinations, in that
 * order.
 *
 * Once any pick is set, the strip is precisely those picks — no topping up. A
 * starred destination that is drafted or deleted drops out and the strip simply
 * gets shorter, rather than silently promoting one nobody chose.
 *
 * The popular fallback applies only when nothing has ever been starred, so a
 * fresh install still has something on the homepage.
 */
export const homepageDestinations = cache(async (limit = 6): Promise<Destination[]> => {
  const supabase = createStaticClient()
  const all = await listDestinations()

  const { data } = await supabase
    .from('featured_picks')
    .select('slug, position')
    .eq('kind', 'destination')
    .order('position')

  const picks = data ?? []
  if (picks.length === 0) return popularDestinations(limit)

  // `all` is published-only for the public, so a drafted pick resolves to
  // nothing and is dropped here.
  return picks
    .map((row) => all.find((d) => d.slug === row.slug))
    .filter((d): d is Destination => Boolean(d))
    .slice(0, limit)
})
