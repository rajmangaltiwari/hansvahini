'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/src/lib/supabase/server'
import { verifySession } from '@/src/lib/dal'
import { destinationToRow } from '@/src/lib/queries/map'
import type { Destination } from '@/src/data/destinations'

/**
 * Create or update a destination.
 *
 * Upserts on `slug`, so the same action serves both the "new" and "edit"
 * screens — exactly the mapping buildDestination() in the form already produces.
 * `status` is what makes a draft a draft: RLS hides `draft` rows from the
 * public while a signed-in admin still sees them.
 */
export async function saveDestination(
  record: Destination
): Promise<{ ok: boolean; error?: string; slug?: string }> {
  // Server Actions are reachable by direct POST — never rely on the layout.
  await verifySession()

  const slug = record.slug?.trim()
  if (!slug) return { ok: false, error: 'A slug is required.' }
  if (!record.name?.trim()) return { ok: false, error: 'A name is required.' }

  const supabase = await createClient()
  const { error } = await supabase
    .from('destinations')
    .upsert(destinationToRow({ ...record, slug }), { onConflict: 'slug' })

  if (error) {
    console.error('[destinations] save failed:', error.message)
    return { ok: false, error: error.message }
  }

  // The listing and this guide are prerendered, so both need rebuilding.
  revalidatePath('/destination')
  revalidatePath(`/destination/${slug}`)
  revalidatePath('/')
  revalidatePath('/admin/destinations')

  return { ok: true, slug }
}

/**
 * Remove a destination.
 *
 * Packages reference destinations.slug, so Postgres refuses while trips still
 * run there — that foreign key is doing real work and the message says so
 * rather than surfacing a raw constraint error.
 */
export async function deleteDestination(slug: string): Promise<{ ok: boolean; error?: string }> {
  await verifySession()
  const supabase = await createClient()

  const { count } = await supabase
    .from('packages')
    .select('slug', { count: 'exact', head: true })
    .eq('destination_slug', slug)

  if (count && count > 0) {
    return {
      ok: false,
      error: `${count} package${count === 1 ? '' : 's'} still run to this destination. Move or delete them first.`,
    }
  }

  const { error } = await supabase.from('destinations').delete().eq('slug', slug)
  if (error) {
    console.error('[destinations] delete failed:', error.message)
    return { ok: false, error: 'That destination could not be deleted.' }
  }

  revalidatePath('/destination')
  revalidatePath('/')
  revalidatePath('/admin/destinations')
  return { ok: true }
}
