'use client'

import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight, Eye, EyeOff, Loader2, Lock, Mail, ShieldCheck } from 'lucide-react'

const inputClass =
  'w-full border border-gray-200 rounded-lg pl-10 pr-3 py-2.5 text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:border-gray-400 transition-colors'
const labelClass =
  'block text-[11px] font-medium text-gray-600 mb-1.5 uppercase tracking-wide'

/**
 * UI only — there is no auth yet, so any credentials are accepted and the form
 * simply routes to the dashboard. Swap the submit handler for a real sign-in
 * call (and gate /admin/(panel) behind it) when authentication lands.
 */
export default function AdminLoginForm() {
  const router = useRouter()

  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading]   = useState(false)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    // Brief pause so the button state reads as a real sign-in.
    setTimeout(() => router.push('/admin/dashboard'), 600)
  }

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

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
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
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="admin-password" className={`${labelClass} mb-0`}>Password</label>
            <a href="#" className="text-[11px] font-medium text-gray-500 hover:text-gray-900 transition-colors">
              Forgot password?
            </a>
          </div>
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

        <label className="flex items-center gap-2 text-xs text-gray-600 select-none">
          <input
            type="checkbox"
            name="remember"
            defaultChecked
            className="w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-0 focus:ring-offset-0 accent-gray-900"
          />
          Keep me signed in for 30 days
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white text-sm font-semibold px-5 py-3 rounded-lg hover:bg-gray-800 disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? (
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
        This area is restricted to Hansvahini staff. Authentication is not wired up yet —
        any credentials will take you through to the dashboard.
      </p>
    </div>
  )
}
