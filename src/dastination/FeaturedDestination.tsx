import Link from 'next/link'
import { Package, MapPin, MountainSnow, CalendarDays, Star } from 'lucide-react'
import { formatPrice, fromPrice } from '@/src/data/packages'
import { destinations } from '@/src/data/destinations'

// The spotlight is whichever destination has the most reviews.
const featured = [...destinations].sort((a, b) => b.reviews - a.reviews)[0]

export default function FeaturedDestination() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">In the Spotlight</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Destination of the Season</h2>
          <div className="mt-4 w-12 h-0.5 bg-gray-900 mx-auto" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Image */}
          <div className="relative rounded-2xl overflow-hidden shadow-sm h-80 lg:h-[440px]">
            <img
              src={featured.heroImage}
              alt={featured.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-5 left-5 bg-white text-gray-900 text-xs font-bold px-3 py-1.5 rounded-full shadow">
              {featured.region}
            </div>
            <div className="absolute bottom-5 left-5 right-5 bg-white/90 backdrop-blur-sm rounded-2xl px-5 py-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">Packages from</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatPrice(fromPrice(featured.slug))}
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-sm">
                <Star className="w-4 h-4 fill-gray-900 text-gray-900" />
                <span className="font-bold text-gray-900">{featured.rating}</span>
                <span className="text-gray-500">({featured.reviews} reviews)</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">
              {featured.tagline}
            </p>
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">{featured.name}</h3>
            <div className="w-10 h-0.5 bg-gray-900 mb-6" />

            <p className="text-gray-600 leading-relaxed mb-6">{featured.overview}</p>

            <div className="grid grid-cols-2 gap-3 mb-6">
              {[
                { icon: MapPin,       label: 'Region',     value: featured.region                 },
                { icon: Package,      label: 'Packages',   value: `${featured.tripCount} trips`   },
                { icon: MountainSnow, label: 'Difficulty', value: featured.difficulty             },
                { icon: CalendarDays, label: 'Best Time',  value: featured.bestTime               },
              ].map((item) => (
                <div key={item.label} className="bg-white rounded-xl px-4 py-3 border border-gray-100">
                  <item.icon className="w-4 h-4 text-gray-400 mb-1.5" />
                  <p className="text-[11px] uppercase tracking-widest text-gray-400">{item.label}</p>
                  <p className="text-sm font-semibold text-gray-900 mt-0.5">{item.value}</p>
                </div>
              ))}
            </div>

            <ul className="space-y-2 mb-8">
              {featured.highlights.slice(0, 4).map((h) => (
                <li key={h} className="flex items-start gap-3 text-sm text-gray-700">
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-gray-900 text-white text-xs flex items-center justify-center flex-shrink-0">
                    ✓
                  </span>
                  {h}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-3">
              <Link
                href={`/destination/${featured.slug}`}
                className="bg-gray-900 text-white text-sm font-semibold px-7 py-3 rounded-full hover:bg-gray-700 transition-colors"
              >
                Explore the Guide
              </Link>
              <Link
                href={`/packages?destination=${featured.slug}`}
                className="border border-gray-900 text-gray-900 text-sm font-semibold px-7 py-3 rounded-full hover:bg-gray-900 hover:text-white transition-colors"
              >
                See Packages
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
