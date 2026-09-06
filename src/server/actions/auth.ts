'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { createClient } from '@/src/lib/supabase/server'
import { isSupabaseConfigured } from '@/src/lib/supabase/env'

/**
 * Sign-in and sign-out for the admin panel.
 *
 * There is no sign-up: admin users are created by hand in the Supabase
 * dashboard (Authentication → Users → Add user). A travel company's panel has
 * a known, small set of staff, and a public sign-up route would just be an
 * opening.
 */

export type SignInState = { error?: string }

export async function signIn(_prev: SignInState, formData: FormData): Promise<SignInState> {
  const email = String(formData.get('email') ?? '').trim()
  const password = String(formData.get('password') ?? '')

  if (!email || !password) {
    return { error: 'Enter your email address and password.' }
  }

  if (!isSupabaseConfigured()) {
    return { error: 'Supabase is not connected yet — add the keys to .env.local and restart the dev server.' }
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    // Deliberately vague: saying which half was wrong tells an attacker
    // whether an address is a real account.
    return { error: 'That email address and password do not match.' }
  }

  // The panel is rendered per-request off the session cookie that was just set.
  revalidatePath('/admin', 'layout')
  redirect('/admin/dashboard')
}

export async function signOut(): Promise<void> {
  const supabase = await createClient()
  await supabase.auth.signOut()

  revalidatePath('/admin', 'layout')
  redirect('/admin/login')
}
