import Link from 'next/link'
import { MapPin, CalendarDays, MountainSnow, Star, Package } from 'lucide-react'
import type { Destination } from '@/src/data/destinations'
import { packagesForDestination } from '@/src/data/packages'

/** Full-bleed hero. Deliberately shows no price — a destination is a place, not a product. */
export default function Hero({ dest }: { dest: Destination }) {
  const packageCount = packagesForDestination(dest.slug).length

  return (
    <section className="relative h-[60vh] min-h-96 flex items-end overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${dest.heroImage}')` }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10" aria-hidden="true" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <nav className="flex items-center gap-2 text-xs text-gray-300 mb-4" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link href="/destination" className="hover:text-white transition-colors">Destinations</Link>
          <span>/</span>
          <span className="text-white">{dest.name}</span>
        </nav>

        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-widest text-gray-300 mb-2">{dest.tagline}</p>
            <h1 className="text-3xl sm:text-5xl font-bold text-white">{dest.name}</h1>
            <div className="flex flex-wrap gap-3 mt-4">
              {[
                { icon: <MapPin className="w-3.5 h-3.5" />,       text: dest.region },
                { icon: <CalendarDays className="w-3.5 h-3.5" />, text: dest.bestTime },
                { icon: <MountainSnow className="w-3.5 h-3.5" />, text: dest.difficulty },
                { icon: <Star className="w-3.5 h-3.5" />,         text: `${dest.rating} (${dest.reviews} reviews)` },
              ].map((chip) => (
                <span key={chip.text} className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full">
                  {chip.icon} {chip.text}
                </span>
              ))}
            </div>
          </div>

          <a
            href="#packages"
            className="inline-flex items-center gap-2 bg-white text-gray-900 text-sm font-semibold px-6 py-3 rounded-full hover:bg-gray-100 transition-colors"
          >
            <Package className="w-4 h-4" />
            See {packageCount} {packageCount === 1 ? 'Package' : 'Packages'}
          </a>
        </div>
      </div>
    </section>
  )
}
