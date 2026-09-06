'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/src/lib/supabase/server'
import { verifySession } from '@/src/lib/dal'
import { FEATURED_LIMIT } from '@/src/admin/featuredStore'

/**
 * Replace the homepage picks for one kind.
 *
 * The stored `position` is what orders the strip, so the array order given here
 * is the order they appear on the homepage. Rows are replaced wholesale rather
 * than diffed — the list is at most six entries.
 */
export async function setFeaturedPicks(
  kind: 'destination' | 'package',
  slugs: string[]
): Promise<{ ok: boolean; error?: string }> {
  await verifySession()

  if (slugs.length > FEATURED_LIMIT) {
    return { ok: false, error: `The homepage strip holds ${FEATURED_LIMIT} cards.` }
  }

  const supabase = await createClient()

  const { error: clearError } = await supabase.from('featured_picks').delete().eq('kind', kind)
  if (clearError) {
    console.error('[featured] clear failed:', clearError.message)
    return { ok: false, error: 'Those picks could not be saved.' }
  }

  if (slugs.length > 0) {
    const { error } = await supabase
      .from('featured_picks')
      .insert(slugs.map((slug, position) => ({ kind, slug, position })))

    if (error) {
      console.error('[featured] insert failed:', error.message)
      return { ok: false, error: 'Those picks could not be saved.' }
    }
  }

  revalidatePath('/')
  revalidatePath(kind === 'destination' ? '/admin/destinations' : '/admin/packages')
  return { ok: true }
}
