'use client'

import { useActionState, useState } from 'react'
import { AlertCircle, ArrowRight, Eye, EyeOff, Loader2, Lock, Mail, ShieldCheck } from 'lucide-react'
import { signIn } from '@/src/server/actions/auth'

const inputClass =
  'w-full border border-gray-200 rounded-lg pl-10 pr-3 py-2.5 text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:border-gray-400 transition-colors'
const labelClass =
  'block text-[11px] font-medium text-gray-600 mb-1.5 uppercase tracking-wide'

/**
 * Signs in against Supabase Auth. Accounts are created by hand in the Supabase
 * dashboard — there is no sign-up route, by design.
 */
export default function AdminLoginForm() {
  const [state, formAction, pending] = useActionState(signIn, {})

  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="w-full max-w-sm">

      {/* Brand mark — the left panel carries it from `lg` up, so this is the small-screen stand-in */}
      <div className="lg:hidden flex items-center gap-2.5 mb-8">
        <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center flex-shrink-0">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
              d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
          </svg>
        </div>
        <div className="leading-tight">
          <span className="block text-sm font-bold text-gray-900 tracking-wide uppercase">Hansvahini</span>
          <span className="block text-xs text-gray-500 tracking-widest uppercase">Expeditions</span>
        </div>
      </div>

      <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-gray-500 uppercase tracking-[0.15em] mb-3">
        <ShieldCheck className="w-3.5 h-3.5" />
        Staff access
      </span>

      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">Sign in to the panel</h1>
      <p className="mt-2 text-sm text-gray-500">
        Manage enquiries, packages, destinations and the photo library.
      </p>

      <form action={formAction} className="mt-8 space-y-5">
        {state.error && (
          <p className="flex items-start gap-2 text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2.5">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-px" />
            {state.error}
          </p>
        )}

        <div>
          <label htmlFor="admin-email" className={labelClass}>Email address</label>
          <div className="relative">
            <Mail className="w-4 h-4 text-gray-300 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              id="admin-email"
              name="email"
              type="email"
              autoComplete="username"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@hansvahini.com"
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label htmlFor="admin-password" className={labelClass}>Password</label>
          <div className="relative">
            <Lock className="w-4 h-4 text-gray-300 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              id="admin-password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className={`${inputClass} pr-10`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 rounded text-gray-300 hover:text-gray-600 transition-colors"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={pending}
          className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white text-sm font-semibold px-5 py-3 rounded-lg hover:bg-gray-800 disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
        >
          {pending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Signing in…
            </>
          ) : (
            <>
              Sign in
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      <p className="mt-8 text-[11px] leading-relaxed text-gray-400">
        This area is restricted to Hansvahini staff. Accounts are issued from the Supabase
        dashboard — there is no self sign-up, and no self-serve password reset.
      </p>
    </div>
  )
}
