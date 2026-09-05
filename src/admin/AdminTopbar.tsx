'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Bell, LogOut, Menu, Search, Settings, User } from 'lucide-react'
import { navItemFor } from './adminNav'

export default function AdminTopbar({ onOpenNav }: { onOpenNav: () => void }) {
  const pathname = usePathname()
  const current = navItemFor(pathname)

  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Close the account menu on an outside click or Escape.
  useEffect(() => {
    if (!menuOpen) return

    function handlePointerDown(e: MouseEvent) {
      if (!menuRef.current?.contains(e.target as Node)) setMenuOpen(false)
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setMenuOpen(false)
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [menuOpen])

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/90 backdrop-blur border-b border-gray-100 flex-shrink-0">
      <div className="h-full px-4 sm:px-6 flex items-center gap-3">

        <button
          onClick={onOpenNav}
          className="lg:hidden p-2 -ml-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors"
          aria-label="Open navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="min-w-0">
          <h1 className="text-sm font-semibold text-gray-900 truncate">
            {current?.label ?? 'Admin'}
          </h1>
          <p className="hidden sm:block text-xs text-gray-400 truncate">{current?.description}</p>
        </div>

        {/* Search — decorative for now, wired to nothing */}
        <div className="hidden md:flex items-center ml-auto relative">
          <Search className="w-4 h-4 text-gray-300 absolute left-3 pointer-events-none" />
          <input
            type="search"
            placeholder="Search leads, packages…"
            className="w-56 lg:w-72 border border-gray-200 rounded-lg pl-9 pr-3 py-2 text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:border-gray-400 transition-colors"
          />
        </div>

        <div className="flex items-center gap-1 ml-auto md:ml-2">
          <button
            className="relative p-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white" />
          </button>

          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-haspopup="menu"
              className="flex items-center gap-2 pl-1.5 pr-2 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <span className="w-8 h-8 rounded-full bg-gray-900 text-white text-xs font-semibold flex items-center justify-center flex-shrink-0">
                RT
              </span>
              <span className="hidden sm:block text-left leading-tight">
                <span className="block text-xs font-semibold text-gray-900">Raj Mangal</span>
                <span className="block text-[10px] text-gray-400">Administrator</span>
              </span>
            </button>

            {menuOpen && (
              <div
                role="menu"
                className="absolute right-0 top-full mt-2 w-52 bg-white border border-gray-100 rounded-xl shadow-lg py-1.5 overflow-hidden"
              >
                <div className="px-3 py-2 border-b border-gray-100">
                  <p className="text-xs font-semibold text-gray-900">Raj Mangal</p>
                  <p className="text-[11px] text-gray-400 truncate">admin@hansvahini.com</p>
                </div>
                <button className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors">
                  <User className="w-4 h-4 text-gray-400" /> Profile
                </button>
                <button className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors">
                  <Settings className="w-4 h-4 text-gray-400" /> Settings
                </button>
                <Link
                  href="/admin/login"
                  className="flex items-center gap-2.5 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors border-t border-gray-100 mt-1 pt-2"
                >
                  <LogOut className="w-4 h-4 text-gray-400" /> Sign out
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
