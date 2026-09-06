'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/src/lib/supabase/server'
import { verifySession } from '@/src/lib/dal'
import { parsePhotoId } from '@/src/lib/queries/gallery'
import type { GalleryImage } from '@/src/data/destinations'

/**
 * Writes for the photo library.
 *
 * A destination album writes straight into that destination's `gallery` array —
 * the same field the destination form edits — so a photo added here appears on
 * /destination/[slug] immediately. "General" is the only album backed by the
 * `media` table, because those assets belong to no destination.
 */

export type NewPhoto = {
  url: string
  caption: string
  fileName?: string
  sizeBytes?: number
  width?: number
  height?: number
}

type Result = { ok: boolean; error?: string }

/**
 * Recovers the object path from a public Storage URL.
 *
 * Destination galleries store only a URL, so this is what lets a delete clean
 * up the underlying file. A URL from anywhere else yields null and its file is
 * left alone — it is not ours to remove.
 */
function storagePathFromUrl(url: string): string | null {
  const marker = '/storage/v1/object/public/media/'
  const at = url.indexOf(marker)
  return at === -1 ? null : url.slice(at + marker.length)
}

async function readGallery(supabase: Awaited<ReturnType<typeof createClient>>, slug: string) {
  const { data, error } = await supabase
    .from('destinations')
    .select('gallery')
    .eq('slug', slug)
    .single()

  if (error) throw new Error(error.message)
  return (Array.isArray(data?.gallery) ? data.gallery : []) as GalleryImage[]
}

async function writeGallery(
  supabase: Awaited<ReturnType<typeof createClient>>,
  slug: string,
  gallery: GalleryImage[]
) {
  const { error } = await supabase.from('destinations').update({ gallery }).eq('slug', slug)
  if (error) throw new Error(error.message)

  revalidatePath(`/destination/${slug}`)
  revalidatePath('/destination')
  revalidatePath('/')
}

function done() {
  revalidatePath('/admin/gallery')
  return { ok: true } as const
}

/** Appends photos to an album. */
export async function addPhotos(album: string, photos: NewPhoto[]): Promise<Result> {
  await verifySession()
  if (photos.length === 0) return { ok: true }

  const supabase = await createClient()

  try {
    if (album === 'general') {
      const { error } = await supabase.from('media').insert(
        photos.map((p) => ({
          url: p.url,
          storage_path: storagePathFromUrl(p.url) ?? '',
          caption: p.caption,
          album: 'general',
          file_name: p.fileName ?? null,
          size_bytes: p.sizeBytes ?? null,
          width: p.width ?? null,
          height: p.height ?? null,
        }))
      )
      if (error) throw new Error(error.message)
    } else {
      const gallery = await readGallery(supabase, album)
      await writeGallery(supabase, album, [
        ...gallery,
        ...photos.map((p) => ({ url: p.url, caption: p.caption })),
      ])
    }
    return done()
  } catch (err) {
    console.error('[gallery] add failed:', err)
    return { ok: false, error: 'Those photos could not be saved.' }
  }
}

/** Edits one photo's caption, and moves it between albums when asked. */
export async function updatePhoto(id: string, caption: string, album: string): Promise<Result> {
  await verifySession()

  const parsed = parsePhotoId(id)
  if (!parsed) return { ok: false, error: 'That photo could not be found.' }

  const supabase = await createClient()

  try {
    if (parsed.kind === 'media') {
      if (album === 'general') {
        const { error } = await supabase.from('media').update({ caption }).eq('id', parsed.id)
        if (error) throw new Error(error.message)
      } else {
        // Moving out of General means moving stores, not just changing a column.
        const { data, error } = await supabase.from('media').select('url').eq('id', parsed.id).single()
        if (error) throw new Error(error.message)

        const gallery = await readGallery(supabase, album)
        await writeGallery(supabase, album, [...gallery, { url: String(data.url), caption }])
        await supabase.from('media').delete().eq('id', parsed.id)
      }
      return done()
    }

    const gallery = await readGallery(supabase, parsed.slug)
    const photo = gallery[parsed.index]
    if (!photo) return { ok: false, error: 'That photo is no longer there — reload the page.' }

    if (album === parsed.slug) {
      const next = [...gallery]
      next[parsed.index] = { ...photo, caption }
      await writeGallery(supabase, parsed.slug, next)
      return done()
    }

    // Moving to another album: drop it here, add it there.
    await writeGallery(supabase, parsed.slug, gallery.filter((_, i) => i !== parsed.index))

    if (album === 'general') {
      const { error } = await supabase.from('media').insert({
        url: photo.url,
        storage_path: storagePathFromUrl(photo.url) ?? '',
        caption,
        album: 'general',
      })
      if (error) throw new Error(error.message)
    } else {
      const target = await readGallery(supabase, album)
      await writeGallery(supabase, album, [...target, { url: photo.url, caption }])
    }
    return done()
  } catch (err) {
    console.error('[gallery] update failed:', err)
    return { ok: false, error: 'That change could not be saved.' }
  }
}

/**
 * Removes photos, and the files behind them for anything hosted in our bucket.
 *
 * Destination indices shift as entries are removed, so deletions are grouped by
 * destination and applied highest-index-first.
 */
export async function deletePhotos(ids: string[]): Promise<Result> {
  await verifySession()
  if (ids.length === 0) return { ok: true }

  const supabase = await createClient()
  const parsed = ids.map(parsePhotoId).filter((p) => p !== null)

  try {
    const urls: string[] = []

    // ── General assets ──
    const mediaIds = parsed.filter((p) => p.kind === 'media').map((p) => p.id)
    if (mediaIds.length > 0) {
      const { data } = await supabase.from('media').select('url').in('id', mediaIds)
      urls.push(...(data ?? []).map((r) => String(r.url)))

      const { error } = await supabase.from('media').delete().in('id', mediaIds)
      if (error) throw new Error(error.message)
    }

    // ── Destination galleries ──
    const bySlug = new Map<string, number[]>()
    for (const p of parsed) {
      if (p.kind !== 'dest') continue
      bySlug.set(p.slug, [...(bySlug.get(p.slug) ?? []), p.index])
    }

    for (const [slug, indices] of bySlug) {
      const gallery = await readGallery(supabase, slug)
      for (const i of indices) if (gallery[i]) urls.push(gallery[i].url)

      const drop = new Set(indices)
      await writeGallery(supabase, slug, gallery.filter((_, i) => !drop.has(i)))
    }

    const paths = urls.map(storagePathFromUrl).filter((p): p is string => Boolean(p))
    if (paths.length > 0) {
      const { error } = await supabase.storage.from('media').remove(paths)
      // The records are already gone; a leftover object is invisible and cheap.
      if (error) console.error('[gallery] bucket cleanup failed:', error.message)
    }

    return done()
  } catch (err) {
    console.error('[gallery] delete failed:', err)
    return { ok: false, error: 'Those photos could not be deleted.' }
  }
}
