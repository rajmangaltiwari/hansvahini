import 'server-only'

import { cache } from 'react'
import { createClient, createStaticClient } from '@/src/lib/supabase/server'
import { rowToPackage } from './map'
import type { PackageCategory, TravelPackage } from '@/src/data/packages'

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
 * Database replacements for the helpers that read the static array in
 * src/data/packages.ts. Same names and return shapes — now async.
 *
 * RLS decides visibility: an anonymous request sees published packages only, a
 * signed-in admin sees drafts too. Everything is wrapped in React's cache(), so
 * a detail page whose Hero, QuickFacts and DestinationPackages all ask for the
 * same destination's trips still makes one query.
 */

export const listPackages = cache(async (includeDrafts = false): Promise<TravelPackage[]> => {
  const supabase = await db(includeDrafts)
  const { data, error } = await supabase.from('packages').select('*').order('id')

  if (error) {
    console.error('[queries] listPackages:', error.message)
    return []
  }
  return (data ?? []).map(rowToPackage)
})

export const getPackageBySlug = cache(async (slug: string, includeDrafts = false): Promise<TravelPackage | undefined> => {
  const supabase = await db(includeDrafts)
  const { data, error } = await supabase
    .from('packages')
    .select('*')
    .eq('slug', slug)
    .maybeSingle()

  if (error) {
    console.error('[queries] getPackageBySlug:', error.message)
    return undefined
  }
  return data ? rowToPackage(data) : undefined
})

/** Slugs only — generateStaticParams does not need whole records. */
export const packageSlugs = cache(async (): Promise<string[]> => {
  // Session-less on purpose — this runs at build time, where cookies() throws.
  const supabase = createStaticClient()
  const { data, error } = await supabase.from('packages').select('slug').eq('status', 'published')

  if (error) {
    console.error('[queries] packageSlugs:', error.message)
    return []
  }
  return (data ?? []).map((row) => row.slug as string)
})

/** Every package running to a destination, cheapest first. */
export const packagesForDestination = cache(async (destinationSlug: string): Promise<TravelPackage[]> => {
  const all = await listPackages()
  return all.filter((p) => p.destinationSlug === destinationSlug).sort((a, b) => a.price - b.price)
})

/**
 * Destinations carry no price of their own — the "from" figure a place shows is
 * simply its cheapest package. Returns 0 when nothing runs there yet.
 */
export const fromPrice = cache(async (destinationSlug: string): Promise<number> => {
  const trips = await packagesForDestination(destinationSlug)
  return trips.length ? Math.min(...trips.map((p) => p.price)) : 0
})

/** Unique destinations present in the package list — powers the destination filter. */
export const packageDestinations = cache(async (): Promise<{ slug: string; name: string }[]> => {
  const all = await listPackages()
  return Array.from(
    new Map(all.map((p) => [p.destinationSlug, { slug: p.destinationSlug, name: p.destinationName }])).values()
  ).sort((a, b) => a.name.localeCompare(b.name))
})

/** Most-reviewed first — the fallback ordering for the homepage strip. */
export const popularPackages = cache(async (limit = 6): Promise<TravelPackage[]> => {
  const all = await listPackages()
  return [...all].sort((a, b) => b.reviews - a.reviews).slice(0, limit)
})

/**
 * The homepage strip: exactly what is starred in /admin/packages, in that order.
 *
 * Once any pick is set, the strip is precisely those picks — no topping up. A
 * starred trip that is drafted or deleted drops out and the strip simply gets
 * shorter, rather than silently promoting a package nobody chose.
 *
 * The popular fallback applies only when nothing has ever been starred, so a
 * fresh install still has something on the homepage.
 */
export const homepagePackages = cache(async (limit = 6): Promise<TravelPackage[]> => {
  const supabase = createStaticClient()
  const all = await listPackages()

  const { data } = await supabase
    .from('featured_picks')
    .select('slug, position')
    .eq('kind', 'package')
    .order('position')

  const picks = data ?? []
  if (picks.length === 0) return popularPackages(limit)

  // `all` is published-only for the public, so a drafted pick resolves to
  // nothing and is dropped here.
  return picks
    .map((row) => all.find((p) => p.slug === row.slug))
    .filter((p): p is TravelPackage => Boolean(p))
    .slice(0, limit)
})

/** How many packages sit in each category — shown on the filter chips. */
export const countByCategory = cache(async (category: PackageCategory | 'all'): Promise<number> => {
  const all = await listPackages()
  return category === 'all' ? all.length : all.filter((p) => p.categories.includes(category)).length
})

/**
 * Cheapest trip per destination slug, for every destination at once.
 *
 * Client Components (DestinationExplorer) cannot call fromPrice() themselves,
 * and calling it per card would be one pass over the package list per card.
 * This builds the whole map in a single pass.
 */
export const fromPriceMap = cache(async (): Promise<Record<string, number>> => {
  const all = await listPackages()
  const map: Record<string, number> = {}

  for (const pkg of all) {
    const current = map[pkg.destinationSlug]
    if (current === undefined || pkg.price < current) map[pkg.destinationSlug] = pkg.price
  }
  return map
})
