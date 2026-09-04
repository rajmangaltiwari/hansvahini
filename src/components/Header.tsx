'use client'

import { useState } from 'react'
import Link from 'next/link'

const destinations = [
  { name: 'Ladakh',            slug: 'ladakh' },
  { name: 'Manali',            slug: 'manali' },
  { name: 'Spiti Valley',      slug: 'spiti' },
  { name: 'Kedarnath',         slug: 'kedarnath' },
  { name: 'Rishikesh',         slug: 'rishikesh' },
  { name: 'Ranthambore',       slug: 'ranthambore' },
  { name: 'Varanasi',          slug: 'varanasi' },
  { name: 'Andaman Islands',   slug: 'andaman' },
]

const navLinks = [
  { label: 'Home',         href: '/#home' },
  { label: 'Packages',     href: '/packages' },
  { label: 'Destinations', href: '/destination', hasDropdown: true },
  { label: 'Testimonials', href: '/#testimonials' },
  { label: 'Contact',      href: '/#contact' },
]

/** Route links get client-side navigation; same-page anchors stay plain <a>. */
const isRoute = (href: string) => !href.includes('#')

export default function Header() {
  const [menuOpen, setMenuOpen]           = useState(false)
  const [destMobileOpen, setDestMobileOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-gray-900 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                  d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
              </svg>
            </div>
            <div className="leading-tight">
              <span className="block text-sm font-bold text-gray-900 tracking-wide uppercase">Hansvahini</span>
              <span className="block text-xs text-gray-500 tracking-widest uppercase">Expeditions</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) =>
              link.hasDropdown ? (
                /* Destinations with hover dropdown */
                <div key={link.href} className="relative group">
                  <Link
                    href={link.href}
                    className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 transition-colors font-medium py-5"
                  >
                    {link.label}
                    <svg className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-600 transition-colors mt-px" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </Link>

                  {/* Dropdown panel — shown on group hover */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="bg-white border border-gray-100 rounded-2xl shadow-lg p-3 w-96 overflow-hidden">
                      <div className="grid grid-cols-3 gap-1">
                        {destinations.map((dest) => (
                          <Link
                            key={dest.slug}
                            href={`/destination/${dest.slug}`}
                            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-gray-300 flex-shrink-0" />
                            {dest.name}
                          </Link>
                        ))}
                      </div>
                      <Link
                        href="/destination"
                        className="mt-2 block text-center text-xs font-semibold text-gray-900 border-t border-gray-100 pt-3 hover:text-gray-500 transition-colors"
                      >
                        View all destinations →
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                isRoute(link.href) ? (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors font-medium"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors font-medium"
                  >
                    {link.label}
                  </a>
                )
              )
            )}
          </nav>

          {/* CTA */}
          <div className="hidden md:block">
            <Link href="/#contact" className="inline-block bg-gray-900 text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-gray-700 transition-colors">
              Submit Enquiry
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-1">
          {navLinks.map((link) =>
            link.hasDropdown ? (
              <div key={link.href}>
                {/* Destinations accordion toggle */}
                <button
                  onClick={() => setDestMobileOpen(!destMobileOpen)}
                  className="w-full flex items-center justify-between text-sm text-gray-700 font-medium hover:text-gray-900 py-2"
                >
                  {link.label}
                  <svg
                    className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${destMobileOpen ? 'rotate-180' : ''}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Sub-links */}
                {destMobileOpen && (
                  <div className="pl-4 pb-2 space-y-1 border-l border-gray-100 ml-1">
                    <Link
                      href="/destination"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-2 text-sm font-semibold text-gray-900 py-1.5"
                    >
                      <span className="w-1 h-1 rounded-full bg-gray-900 flex-shrink-0" />
                      All Destinations
                    </Link>
                    {destinations.map((dest) => (
                      <Link
                        key={dest.slug}
                        href={`/destination/${dest.slug}`}
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 py-1.5"
                      >
                        <span className="w-1 h-1 rounded-full bg-gray-400 flex-shrink-0" />
                        {dest.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              isRoute(link.href) ? (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block text-sm text-gray-700 font-medium hover:text-gray-900 py-2"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block text-sm text-gray-700 font-medium hover:text-gray-900 py-2"
                >
                  {link.label}
                </a>
              )
            )
          )}

          <Link
            href="/#contact"
            onClick={() => setMenuOpen(false)}
            className="block w-full text-center bg-gray-900 text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-gray-700 transition-colors mt-3"
          >
            Get a Quote
          </Link>
        </div>
      )}
    </header>
  )
}
