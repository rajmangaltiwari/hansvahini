/**
 * Drafts live in sessionStorage until there is a backend to hold them.
 *
 * The create/edit forms write here on "Save as draft", and the preview screens
 * read from here first so you can see unsaved work rendered as the real page.
 * When the API lands, swap these four functions for POST/PATCH calls and the
 * screens above them do not have to change.
 */

export type DraftKind = 'package' | 'destination'

const key = (kind: DraftKind, slug: string) => `hansvahini:admin:draft:${kind}:${slug}`

/** Storage can throw outright in private windows, so every access is guarded. */
export function saveDraft(kind: DraftKind, slug: string, record: unknown): boolean {
  try {
    sessionStorage.setItem(key(kind, slug), JSON.stringify(record))
    return true
  } catch {
    return false
  }
}

export function readDraft<T>(kind: DraftKind, slug: string): T | null {
  try {
    const raw = sessionStorage.getItem(key(kind, slug))
    return raw ? (JSON.parse(raw) as T) : null
  } catch {
    return null
  }
}

export function clearDraft(kind: DraftKind, slug: string): void {
  try {
    sessionStorage.removeItem(key(kind, slug))
  } catch {
    // Nothing to clean up if storage is unavailable.
  }
}
