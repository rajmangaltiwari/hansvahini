import 'server-only'

import { cache } from 'react'
import { createClient } from '@/src/lib/supabase/server'
import { rowToDestination } from './map'

/**
 * The photo library, assembled from the two places photos actually live.
 *
 * A destination's photos ARE its `gallery` field — the same array the
 * "Gallery images" repeater on the destination form edits, and the same one
 * /destination/[slug] renders. The Gallery screen is a second editor for it,
 * not a separate store, so a photo added in either place shows in both.
 *
 * The `media` table holds only what has no destination to belong to: brand
 * assets under "General".
 */
export type GalleryPhoto = {
  /** `dest:<slug>:<index>` for a destination photo, `media:<uuid>` for a general one. */
  id: string
  url: string
  caption: string
  /** A destination slug, or 'general'. */
  album: string
  /** Position within a destination's gallery — the first takes the large tile. */
  position?: number
  fileName?: string
  sizeBytes?: number
  width?: number
  height?: number
  createdAt?: string
}

/** PostgREST hands back loose JSON; narrow it at this boundary. */
const str = (v: unknown, fallback = '') => (typeof v === 'string' ? v : fallback)
const num = (v: unknown) => {
  const n = typeof v === 'string' ? Number(v) : v
  return typeof n === 'number' && Number.isFinite(n) ? n : undefined
}

export const destPhotoId = (slug: string, index: number) => `dest:${slug}:${index}`
export const mediaPhotoId = (id: string) => `media:${id}`

/** Splits a composite id back into the store it came from. */
export function parsePhotoId(
  id: string
): { kind: 'dest'; slug: string; index: number } | { kind: 'media'; id: string } | null {
  if (id.startsWith('media:')) return { kind: 'media', id: id.slice(6) }

  if (id.startsWith('dest:')) {
    const rest = id.slice(5)
    const cut = rest.lastIndexOf(':')
    if (cut === -1) return null

    const slug = rest.slice(0, cut)
    const index = Number(rest.slice(cut + 1))
    if (!slug || !Number.isInteger(index) || index < 0) return null

    return { kind: 'dest', slug, index }
  }
  return null
}

export const listGallery = cache(async (): Promise<GalleryPhoto[]> => {
  // Admin-only screen, so drafts are included: their photos are editable too.
  const supabase = await createClient()

  const [{ data: destRows, error: destError }, { data: mediaRows }] = await Promise.all([
    supabase.from('destinations').select('*').order('name'),
    supabase.from('media').select('*').order('created_at', { ascending: false }),
  ])

  if (destError) {
    console.error('[queries] listGallery:', destError.message)
    return []
  }

  const fromDestinations: GalleryPhoto[] = (destRows ?? []).flatMap((row) => {
    const dest = rowToDestination(row)
    return dest.gallery.map((image, index) => ({
      id: destPhotoId(dest.slug, index),
      url: image.url,
      caption: image.caption,
      album: dest.slug,
      position: index,
    }))
  })

  const fromMedia: GalleryPhoto[] = (mediaRows ?? []).map((row) => ({
    id: mediaPhotoId(str(row.id)),
    url: str(row.url),
    caption: str(row.caption),
    album: str(row.album, 'general'),
    fileName: str(row.file_name) || undefined,
    sizeBytes: num(row.size_bytes),
    width: num(row.width),
    height: num(row.height),
    createdAt: str(row.created_at),
  }))

  return [...fromDestinations, ...fromMedia]
})
