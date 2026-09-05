'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ExternalLink, LogOut, X } from 'lucide-react'
import { adminNav } from './adminNav'

/**
 * The dark navigation rail. It is rendered once by AdminShell and positioned
 * by the parent: docked at `lg` and up, a slide-over drawer below that.
 */
export default function AdminSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()

  return (
    <div className="flex flex-col h-full bg-gray-900 text-gray-300">

      {/* Brand */}
      <div className="flex items-center justify-between h-16 px-5 border-b border-white/10 flex-shrink-0">
        <Link href="/admin/dashboard" onClick={onNavigate} className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
            </svg>
          </div>
          <div className="leading-tight">
            <span className="block text-sm font-bold text-white tracking-wide uppercase">Hansvahini</span>
            <span className="block text-[10px] text-gray-400 tracking-[0.2em] uppercase">Admin Panel</span>
          </div>
        </Link>

        {/* Drawer close — hidden once the rail is docked */}
        <button
          onClick={onNavigate}
          className="lg:hidden p-1.5 -mr-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Close navigation"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-5">
        <p className="px-3 mb-2 text-[10px] font-semibold text-gray-500 uppercase tracking-[0.15em]">Manage</p>
        <ul className="space-y-1">
          {adminNav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
            const Icon = item.icon

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onNavigate}
                  aria-current={active ? 'page' : undefined}
                  className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    active
                      ? 'bg-white text-gray-900'
                      : 'text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className={`w-[18px] h-[18px] flex-shrink-0 ${active ? 'text-gray-900' : 'text-gray-500 group-hover:text-white'}`} />
                  <span className="flex-1">{item.label}</span>
                  {item.badge ? (
                    <span
                      className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
                        active ? 'bg-gray-900 text-white' : 'bg-white/10 text-gray-300'
                      }`}
                    >
                      {item.badge}
                    </span>
                  ) : null}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="px-3 pb-5 pt-4 border-t border-white/10 space-y-1 flex-shrink-0">
        <Link
          href="/"
          onClick={onNavigate}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <ExternalLink className="w-[18px] h-[18px] text-gray-500" />
          View live site
        </Link>
        <Link
          href="/admin/login"
          onClick={onNavigate}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <LogOut className="w-[18px] h-[18px] text-gray-500" />
          Sign out
        </Link>
      </div>
    </div>
  )
}
