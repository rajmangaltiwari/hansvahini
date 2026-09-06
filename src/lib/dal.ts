import 'server-only'

import { cache } from 'react'
import { redirect } from 'next/navigation'
import { createClient } from '@/src/lib/supabase/server'
import { isSupabaseConfigured } from '@/src/lib/supabase/env'

/**
 * The Data Access Layer — the one place "is this request signed in?" is answered.
 *
 * Wrapped in React's cache() so a render pass that checks the session in the
 * layout, a page and three components still makes one call.
 *
 * Server Actions are reachable by direct POST, not just through our own UI, so
 * every admin action calls verifySession() itself. The layout check protects
 * the page; it does nothing for the action.
 */

export type AdminSession = {
  userId: string
  email: string
  /** What the panel shows as the acting user, e.g. on a lead note. */
  displayName: string
}

/** Returns the session, or null. Use this when a missing session is not an error. */
export const getSession = cache(async (): Promise<AdminSession | null> => {
  // Before .env.local exists there is no session to find. Returning null sends
  // the visitor to the sign-in page, which explains itself — far better than a
  // 500 from inside the client constructor.
  if (!isSupabaseConfigured()) return null

  const supabase = await createClient()

  // getUser() revalidates the token with Supabase rather than trusting the
  // cookie — getSession() alone would accept a forged one.
  const { data, error } = await supabase.auth.getUser()
  if (error || !data.user) return null

  const { id, email, user_metadata } = data.user

  return {
    userId: id,
    email: email ?? '',
    displayName:
      (typeof user_metadata?.full_name === 'string' && user_metadata.full_name) ||
      (email ? email.split('@')[0] : 'Admin'),
  }
})

/** Returns the session or redirects to the sign-in page. */
export const verifySession = cache(async (): Promise<AdminSession> => {
  const session = await getSession()
  if (!session) redirect('/admin/login')
  return session
})
