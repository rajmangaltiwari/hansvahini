'use client'

import { createClient } from '@/src/lib/supabase/client'

/**
 * The single place a chosen file becomes a URL.
 *
 * Uploads go from the browser straight to Supabase Storage rather than through
 * a Server Action. That clears Vercel's 4.5 MB action body limit and nginx's
 * 1 MB default on a self-hosted box — neither ever sees the file.
 *
 * Writing to the bucket requires the signed-in admin's session, which the
 * browser client carries; the storage policy allows `authenticated` only.
 */

export const MAX_UPLOAD_MB = 10

/**
 * Photos are downscaled and re-encoded before upload.
 *
 * A phone camera produces 4000px, 6 MB JPEGs. Nothing on this site displays an
 * image wider than about 1600 CSS pixels, so the rest is bandwidth the visitor
 * pays for and storage we pay for. WebP is typically 25–35% smaller than JPEG
 * at the same quality and is supported by every browser this site targets.
 */
export const MAX_DIMENSION = 2000
const WEBP_QUALITY = 0.82

/** Object URLs only live in the tab that made them, so they cannot be published. */
export const isPreviewUrl = (url: string) => url.startsWith('blob:')

export type UploadedImage = {
  url: string
  /** Kept so the object can be removed from the bucket later. */
  path: string
  width: number
  height: number
  sizeBytes: number
}

/** Decode the file so it can be measured and redrawn. */
function load(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file)
    const img = new Image()

    img.onload = () => {
      URL.revokeObjectURL(url)
      resolve(img)
    }
    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('That image could not be read.'))
    }
    img.src = url
  })
}

type Processed = { blob: Blob; width: number; height: number; ext: string; type: string }

/**
 * Downscales to MAX_DIMENSION on the long edge and re-encodes as WebP.
 *
 * Returns the original untouched if anything goes wrong, or if the result would
 * be no smaller — re-encoding an already-optimised image can easily make it
 * bigger, and shipping the larger file would defeat the point.
 */
async function process(file: File): Promise<Processed> {
  const fallback = (): Processed => ({
    blob: file,
    width: 0,
    height: 0,
    ext: file.name.split('.').pop()?.toLowerCase() || 'jpg',
    type: file.type,
  })

  // Animated GIFs would lose their animation, and SVG is not a raster format.
  if (file.type === 'image/gif' || file.type === 'image/svg+xml') return fallback()

  try {
    const img = await load(file)
    const { naturalWidth: w, naturalHeight: h } = img
    if (!w || !h) return fallback()

    const scale = Math.min(1, MAX_DIMENSION / Math.max(w, h))
    const width = Math.round(w * scale)
    const height = Math.round(h * scale)

    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height

    const ctx = canvas.getContext('2d')
    if (!ctx) return { ...fallback(), width: w, height: h }

    ctx.drawImage(img, 0, 0, width, height)

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, 'image/webp', WEBP_QUALITY)
    )

    // Keep the original when the conversion did not actually help.
    if (!blob || blob.size >= file.size) {
      return { ...fallback(), width: w, height: h }
    }

    return { blob, width, height, ext: 'webp', type: 'image/webp' }
  } catch {
    return fallback()
  }
}

function validate(file: File) {
  if (!file.type.startsWith('image/')) {
    throw new Error('That file is not an image.')
  }
  if (file.size > MAX_UPLOAD_MB * 1024 * 1024) {
    throw new Error(
      `Images must be under ${MAX_UPLOAD_MB} MB — this one is ${(file.size / 1024 / 1024).toFixed(1)} MB.`
    )
  }
}

/**
 * Uploads the file and returns its public URL plus the metadata the library
 * stores alongside it.
 *
 * `folder` groups objects in the bucket by destination slug. The filename is a
 * UUID rather than the original: two people uploading `IMG_1234.jpg` must not
 * collide, and an arbitrary user-supplied name has no business in a path.
 */
export async function uploadImageDetailed(file: File, folder = 'general'): Promise<UploadedImage> {
  // Validate the original: the limit is about what someone may hand us, not
  // what we end up storing.
  validate(file)

  const { blob, width, height, ext, type } = await process(file)

  const supabase = createClient()
  const path = `${folder}/${crypto.randomUUID()}.${ext}`

  const { error } = await supabase.storage.from('media').upload(path, blob, {
    contentType: type,
    upsert: false,
  })
  if (error) throw new Error(error.message)

  const { publicUrl } = supabase.storage.from('media').getPublicUrl(path).data

  return { url: publicUrl, path, width, height, sizeBytes: blob.size }
}

/**
 * The URL-only form, for callers that just need a string — the image fields on
 * the destination and package forms.
 */
export async function uploadImage(file: File, folder = 'general'): Promise<string> {
  return (await uploadImageDetailed(file, folder)).url
}

/**
 * Frees a preview URL. Only call this when the value is being replaced or
 * cleared — never on unmount, because a repeater row that is reordered
 * unmounts and remounts while its value is still held in form state.
 */
export function releasePreview(url: string): void {
  if (isPreviewUrl(url)) URL.revokeObjectURL(url)
}
