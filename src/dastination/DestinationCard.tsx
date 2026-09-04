import Link from 'next/link'
import { Package, Star, MountainSnow, CalendarDays } from 'lucide-react'
import type { Destination } from '@/src/data/destinations'
import { formatPrice, fromPrice } from '@/src/data/packages'

export default function DestinationCard({ dest }: { dest: Destination }) {
  // Destinations carry no price of their own — this is the cheapest trip there.
  const from = fromPrice(dest.slug)

  return (
    <article className="group bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
      <Link href={`/destination/${dest.slug}`} className="block">
        <div className="relative h-52 overflow-hidden">
          <img
            src={dest.image}
            alt={dest.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2 items-start">
            {dest.badge && (
              <span className="bg-gray-900 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow">
                {dest.badge}
              </span>
            )}
            {dest.trending && (
              <span className="bg-white/90 backdrop-blur-sm text-gray-900 text-[11px] font-semibold px-3 py-1 rounded-full shadow">
                Trending
              </span>
            )}
          </div>

          {from > 0 && (
            <div className="absolute top-4 right-4 bg-white text-gray-900 text-xs font-bold px-3 py-1 rounded-full shadow">
              <span className="font-normal text-gray-500">from </span>
              {formatPrice(from)}
            </div>
          )}

          {/* Region pill */}
          <div className="absolute bottom-4 left-4">
            <span className="bg-black/50 backdrop-blur-sm text-white text-[11px] px-3 py-1 rounded-full">
              {dest.region}
            </span>
          </div>
        </div>

        <div className="px-6 pt-6">
          <div className="flex items-start justify-between gap-3 mb-1">
            <h3 className="text-lg font-bold text-gray-900 leading-snug">{dest.name}</h3>
            <span className="flex items-center gap-1 text-xs text-gray-500 flex-shrink-0 mt-1">
              <Star className="w-3.5 h-3.5 fill-gray-900 text-gray-900" />
              <span className="font-semibold text-gray-900">{dest.rating}</span>
              <span className="text-gray-400">({dest.reviews})</span>
            </span>
          </div>

          <p className="text-xs uppercase tracking-widest text-gray-400 mb-3">{dest.tagline}</p>
          <p className="text-sm text-gray-600 leading-relaxed">{dest.blurb}</p>

          {/* Meta row */}
          <div className="flex flex-wrap gap-x-4 gap-y-2 mt-4 text-xs text-gray-500">
            <span className="inline-flex items-center gap-1.5">
              <Package className="w-3.5 h-3.5" /> {dest.tripCount} packages
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MountainSnow className="w-3.5 h-3.5" /> {dest.difficulty}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="w-3.5 h-3.5" /> {dest.bestTime}
            </span>
          </div>

          {/* Experience tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            {dest.experiences.map((exp) => (
              <span
                key={exp}
                className="border border-gray-200 text-gray-600 text-[11px] px-2.5 py-1 rounded-full"
              >
                {exp}
              </span>
            ))}
          </div>
        </div>
      </Link>

      {/* Buttons — outside the Link so no nested anchors */}
      <div className="px-6 pb-6 pt-5 mt-auto flex gap-3">
        <Link
          href={`/destination/${dest.slug}`}
          className="flex-1 text-center border border-gray-900 text-gray-900 text-sm font-semibold py-2.5 rounded-full hover:bg-gray-900 hover:text-white transition-colors"
        >
          View Details
        </Link>
        <Link
          href={`/packages?destination=${dest.slug}`}
          className="flex-1 text-center bg-gray-900 text-white text-sm font-semibold py-2.5 rounded-full hover:bg-gray-700 transition-colors"
        >
          {dest.tripCount} Packages
        </Link>
      </div>
    </article>
  )
}
