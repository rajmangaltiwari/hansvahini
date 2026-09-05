/**
 * The single place a chosen file becomes a URL.
 *
 * There is no storage backend yet, so `uploadImage` hands back a local object
 * URL that previews correctly in this tab and nowhere else. It is async and
 * validating from day one so that swapping in Supabase Storage is a change to
 * this one function — every caller already awaits it and already handles the
 * error and loading states.
 */

export const MAX_UPLOAD_MB = 10

/** Object URLs only live in the tab that made them, so they cannot be published. */
export const isPreviewUrl = (url: string) => url.startsWith('blob:')

/**
 * Validates the file and returns the URL to store.
 *
 * When Supabase is wired, the body becomes:
 *
 *   const ext = file.name.split('.').pop()
 *   const path = `${folder}/${crypto.randomUUID()}.${ext}`
 *   const { error } = await supabase.storage.from('media').upload(path, file)
 *   if (error) throw new Error(error.message)
 *   return supabase.storage.from('media').getPublicUrl(path).data.publicUrl
 *
 * Note it uploads straight from the browser rather than through a route
 * handler: a self-hosted Next server sits behind nginx, whose default
 * `client_max_body_size` is 1 MB — well under the limit advertised here.
 */
// `folder` is unused until the Supabase call above replaces the body — it is in
// the signature now so callers already pass it and nothing has to change later.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function uploadImage(file: File, folder = 'general'): Promise<string> {
  if (!file.type.startsWith('image/')) {
    throw new Error('That file is not an image.')
  }
  if (file.size > MAX_UPLOAD_MB * 1024 * 1024) {
    throw new Error(`Images must be under ${MAX_UPLOAD_MB} MB — this one is ${(file.size / 1024 / 1024).toFixed(1)} MB.`)
  }

  return URL.createObjectURL(file)
}

/**
 * Frees a preview URL. Only call this when the value is being replaced or
 * cleared — never on unmount, because a repeater row that is reordered
 * unmounts and remounts while its value is still held in form state.
 */
export function releasePreview(url: string): void {
  if (isPreviewUrl(url)) URL.revokeObjectURL(url)
}
