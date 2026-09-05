'use client'

import { useEffect, useState } from 'react'
import AdminSidebar from './AdminSidebar'
import AdminTopbar from './AdminTopbar'

/**
 * Chrome for every panel route: a docked rail from `lg` up, a slide-over drawer
 * below that, and a scrolling content column. Used by app/admin/(panel)/layout.
 */
export default function AdminShell({ children }: { children: React.ReactNode }) {
  // The drawer closes from AdminSidebar's onNavigate, so a route change needs no effect here.
  const [navOpen, setNavOpen] = useState(false)

  // Lock the page behind the drawer while it is open.
  useEffect(() => {
    if (!navOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [navOpen])

  return (
    <div className="min-h-screen bg-gray-50 lg:pl-64">

      {/* Docked rail */}
      <aside className="hidden lg:block fixed inset-y-0 left-0 w-64 z-40">
        <AdminSidebar />
      </aside>

      {/* Drawer */}
      <div
        className={`lg:hidden fixed inset-0 z-50 transition-opacity duration-200 ${
          navOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <button
          className="absolute inset-0 bg-gray-900/50"
          onClick={() => setNavOpen(false)}
          aria-label="Close navigation"
          tabIndex={navOpen ? 0 : -1}
        />
        <aside
          className={`absolute inset-y-0 left-0 w-64 max-w-[80%] shadow-xl transition-transform duration-200 ${
            navOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <AdminSidebar onNavigate={() => setNavOpen(false)} />
        </aside>
      </div>

      <div className="flex flex-col min-h-screen">
        <AdminTopbar onOpenNav={() => setNavOpen(true)} />
        <main className="flex-1 px-4 sm:px-6 py-6 sm:py-8">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  )
}
