/**
 * Env access in one place, so a missing variable fails loudly at the boundary
 * rather than as a confusing `undefined` deep inside a Supabase call.
 */

/** Throws with the variable's name rather than returning undefined. */
export function required(name: string): string {
  const value = process.env[name]
  if (!value) {
    throw new Error(
      `Missing environment variable ${name}. Copy .env.example to .env.local and fill it in.`
    )
  }
  return value
}

// NEXT_PUBLIC_* are inlined at build time, so they must be referenced as full
// static property accesses — process.env[name] does not work for them in the
// browser bundle.
export const SUPABASE_URL = () =>
  process.env.NEXT_PUBLIC_SUPABASE_URL ??
  (() => {
    throw new Error('Missing environment variable NEXT_PUBLIC_SUPABASE_URL.')
  })()

export const SUPABASE_ANON_KEY = () =>
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  (() => {
    throw new Error('Missing environment variable NEXT_PUBLIC_SUPABASE_ANON_KEY.')
  })()

/**
 * Whether Supabase is configured at all.
 *
 * Lets the admin panel fail with a readable message during first-time setup
 * instead of a 500 from deep inside a client constructor.
 */
export const isSupabaseConfigured = () =>
  Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
