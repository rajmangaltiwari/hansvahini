import 'server-only'

import { cache } from 'react'
import { createStaticClient } from '@/src/lib/supabase/server'



/**
 * The homepage picks, read from the featured_picks table.
 *
 * Replaces the hardcoded featuredDestinationSlugs / featuredPackageSlugs, which
 * could only be changed by editing source. Written by setFeaturedPicks() from
 * the star toggles on the admin list screens.
 */
export type FeaturedKind = 'destination' | 'package'

export const featuredSlugs = cache(async (kind: FeaturedKind): Promise<string[]> => {
  // Picks are public data; no cookies, so pages using them stay static.
  const supabase = createStaticClient()
  const { data, error } = await supabase
    .from('featured_picks')
    .select('slug, position')
    .eq('kind', kind)
    .order('position')

  if (error) {
    console.error('[queries] featuredSlugs:', error.message)
    return []
  }
  return (data ?? []).map((row) => row.slug as string)
})
