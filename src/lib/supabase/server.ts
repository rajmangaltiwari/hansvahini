import 'server-only'

import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import { SUPABASE_ANON_KEY, SUPABASE_URL } from './env'

/**
 * The server Supabase client — anon key plus whatever session cookie the
 * request carries. This is the default for reads and for every admin write.
 *
 * Because it runs under RLS, one code path gives the right answer to both
 * audiences: an anonymous visitor sees `status = 'published'` rows only, and a
 * signed-in admin sees drafts too. Prefer it over the service-role client for
 * admin writes — if an auth check is ever missed, RLS still refuses the write.
 *
 * Must be created per request, never shared: the client holds the request's
 * cookies.
 */
export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(SUPABASE_URL(), SUPABASE_ANON_KEY(), {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll: (cookiesToSet) => {
        // Server Components cannot set cookies — Next throws here. That is
        // expected and safe to swallow: proxy.ts refreshes the session on
        // every request, so the refreshed token still reaches the browser.
        try {
          for (const { name, value, options } of cookiesToSet) {
            cookieStore.set(name, value, options)
          }
        } catch {
          // Called from a Server Component. See above.
        }
      },
    },
  })
}

/**
 * A session-less client for code that runs without an HTTP request.
 *
 * `generateStaticParams` executes at build time, where calling cookies() throws
 * ("used `cookies()` inside `generateStaticParams`"). This client reads no
 * cookies, so it is always the anonymous role — which is exactly right there:
 * a build should prerender the published pages, never an admin's drafts.
 */
export function createStaticClient() {
  return createSupabaseClient(SUPABASE_URL(), SUPABASE_ANON_KEY(), {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}
