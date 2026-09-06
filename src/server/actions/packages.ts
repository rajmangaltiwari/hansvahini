'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/src/lib/supabase/server'
import { verifySession } from '@/src/lib/dal'
import { packageToRow } from '@/src/lib/queries/map'
import type { TravelPackage } from '@/src/data/packages'

/**
 * Create or update a package.
 *
 * Upserts on `slug`. `id` is deliberately not sent: it is a generated identity
 * column, so the database owns it on insert and keeps it on update.
 */
export async function savePackage(
  record: TravelPackage
): Promise<{ ok: boolean; error?: string; slug?: string }> {
  await verifySession()

  const slug = record.slug?.trim()
  if (!slug) return { ok: false, error: 'A slug is required.' }
  if (!record.title?.trim()) return { ok: false, error: 'A title is required.' }
  if (!record.destinationSlug?.trim()) return { ok: false, error: 'Pick a destination.' }

  const supabase = await createClient()
  const { error } = await supabase
    .from('packages')
    .upsert(packageToRow({ ...record, slug }), { onConflict: 'slug' })

  if (error) {
    console.error('[packages] save failed:', error.message)
    // The destination_slug foreign key is the likeliest failure here.
    return { ok: false, error: error.message }
  }

  revalidatePath('/packages')
  revalidatePath(`/packages/${slug}`)
  revalidatePath(`/destination/${record.destinationSlug}`)
  revalidatePath('/')
  revalidatePath('/admin/packages')

  return { ok: true, slug }
}

export async function deletePackage(slug: string): Promise<{ ok: boolean; error?: string }> {
  await verifySession()
  const supabase = await createClient()

  const { error } = await supabase.from('packages').delete().eq('slug', slug)
  if (error) {
    console.error('[packages] delete failed:', error.message)
    return { ok: false, error: 'That package could not be deleted.' }
  }

  revalidatePath('/packages')
  revalidatePath('/')
  revalidatePath('/admin/packages')
  return { ok: true }
}
