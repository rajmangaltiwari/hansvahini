import type { Metadata } from 'next'
import Link from 'next/link'
import { Compass, Home, MapPinned, Package } from 'lucide-react'
import Header from '@/src/components/Header'
import Footer from '@/src/components/Footer'

export const metadata: Metadata = {
  title: 'Page not found — Your Travels',
  // A 404 has nothing worth indexing, and indexing it competes with the real pages.
  robots: { index: false, follow: true },
}

const routes = [
  { href: '/',            label: 'Home',         hint: 'Start from the beginning',        icon: Home },
  { href: '/packages',    label: 'Packages',     hint: 'Every trip we run',               icon: Package },
  { href: '/destination', label: 'Destinations', hint: 'Place guides and things to do',   icon: MapPinned },
]

/**
 * Shown for any unmatched URL, and whenever a page calls notFound() — which is
 * what a slug that has been unpublished or deleted now does.
 */
export default function NotFound() {
  return (
    <>
      <Header />
      <main className="pt-16 min-h-[70vh] flex items-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-20 text-center">
          <span className="inline-flex w-14 h-14 rounded-2xl bg-gray-900 items-center justify-center mb-6">
            <Compass className="w-6 h-6 text-white" />
          </span>

          <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">Error 404</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
            This page has wandered off
          </h1>
          <div className="mt-4 w-12 h-0.5 bg-gray-900 mx-auto" />

          <p className="mt-6 text-gray-500 leading-relaxed">
            The page you are looking for does not exist. It may have moved, or the trip it
            described may no longer be running.
          </p>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className="border border-gray-200 rounded-xl p-4 hover:border-gray-900 transition-colors"
              >
                <route.icon className="w-5 h-5 text-gray-400 mb-2" />
                <p className="text-sm font-semibold text-gray-900">{route.label}</p>
                <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{route.hint}</p>
              </Link>
            ))}
          </div>

          <p className="mt-10 text-sm text-gray-400">
            Still stuck?{' '}
            <Link href="/#contact" className="font-semibold text-gray-900 underline underline-offset-4">
              Send us an enquiry
            </Link>{' '}
            and we will point you the right way.
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
