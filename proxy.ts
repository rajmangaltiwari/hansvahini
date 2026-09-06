import { NextResponse, type NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

/**
 * Next 16 renamed Middleware to Proxy — same behaviour, new filename.
 *
 * Two jobs:
 *  1. Refresh the Supabase session cookie. Server Components cannot write
 *     cookies, so without this the access token would expire and never renew.
 *  2. An optimistic redirect away from /admin when there is no session.
 *
 * "Optimistic" is the operative word: this is a cookie check, not an
 * authorisation decision. The real checks live in the panel layout and in every
 * Server Action, close to the data. Per the Next docs, a Server Function is a
 * POST to the route it is used on, so a matcher change could silently drop
 * proxy coverage — never let this file be the only thing standing guard.
 */
export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request })

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // Before the project is configured, let requests through rather than locking
  // the developer out of a site that has no auth wired up yet.
  if (!url || !key) return response

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (cookiesToSet, headers) => {
        for (const { name, value } of cookiesToSet) {
          request.cookies.set(name, value)
        }
        response = NextResponse.next({ request })
        for (const { name, value, options } of cookiesToSet) {
          response.cookies.set(name, value, options)
        }
        // Responses that set auth cookies must not be cached by Vercel's edge,
        // or one admin's token could be served to someone else.
        for (const [header, value] of Object.entries(headers)) {
          response.headers.set(header, value)
        }
      },
    },
  })

  // Must be awaited before the response is returned — a refresh that lands
  // after the response is committed is lost, and the next request refreshes
  // again.
  const { data } = await supabase.auth.getUser()
  const signedIn = Boolean(data.user)

  const { pathname } = request.nextUrl
  const isLoginPage = pathname === '/admin/login'

  if (!signedIn && !isLoginPage) {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  if (signedIn && (isLoginPage || pathname === '/admin')) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url))
  }

  return response
}

export const config = {
  // Only the admin panel needs a session. Leaving the public marketing pages
  // out keeps them statically served with no proxy hop.
  matcher: ['/admin', '/admin/:path*'],
}
