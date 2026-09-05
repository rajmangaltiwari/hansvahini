/**
 * Homepage picks live in sessionStorage until there is a backend to hold them,
 * mirroring src/admin/draftStore.ts. The list pages read from here first so a
 * selection survives navigating away and back within the session.
 *
 * When the API lands, swap these three functions for GET/PUT calls; the screens
 * above them do not have to change.
 */

export type FeaturedKind = 'package' | 'destination'

/** The homepage strip holds exactly six cards. */
export const FEATURED_LIMIT = 6

const key = (kind: FeaturedKind) => `hansvahini:admin:featured:${kind}`

/** Storage can throw outright in private windows, so every access is guarded. */
export function readPicks(kind: FeaturedKind): string[] | null {
  try {
    const raw = sessionStorage.getItem(key(kind))
    if (!raw) return null
    const parsed: unknown = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed.filter((v): v is string => typeof v === 'string') : null
  } catch {
    return null
  }
}

export function savePicks(kind: FeaturedKind, slugs: string[]): boolean {
  try {
    sessionStorage.setItem(key(kind), JSON.stringify(slugs))
    return true
  } catch {
    return false
  }
}

export function clearPicks(kind: FeaturedKind): void {
  try {
    sessionStorage.removeItem(key(kind))
  } catch {
    // Nothing to clean up if storage is unavailable.
  }
}
