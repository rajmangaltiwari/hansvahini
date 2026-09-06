'use client'

import { createBrowserClient } from '@supabase/ssr'
import { SUPABASE_ANON_KEY, SUPABASE_URL } from './env'

/**
 * The browser Supabase client, carrying the signed-in admin's session.
 *
 * Two callers only: the sign-in form, and the image upload in
 * src/admin/imageUpload.ts — which goes straight to Storage rather than
 * through the Next server so it clears Vercel's 4.5 MB Server Action body cap.
 *
 * Cookie handling is deliberately left to the library: @supabase/ssr reads and
 * writes document.cookie itself unless you override it, and the overrides are
 * easy to get subtly wrong.
 */
export function createClient() {
  return createBrowserClient(SUPABASE_URL(), SUPABASE_ANON_KEY())
}
