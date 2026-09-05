import Link from 'next/link'
import { Clock, Star, Users, MapPin } from 'lucide-react'
import { formatPrice, packageCategories, type TravelPackage } from '@/src/data/packages'

const labelFor = (id: string) =>
  packageCategories.find((c) => c.id === id)?.label.replace(' Packages', '') ?? id

/**
 * `compact` trims the card down for dense grids — the homepage strip, where six
 * of these sit above the fold and the full copy makes the rows ragged. The
 * listing pages keep the roomier default.
 */
export default function PackageCard({
  pkg,
  compact = false,
}: {
  pkg: TravelPackage
  compact?: boolean
}) {
  const discount = pkg.oldPrice
    ? Math.round(((pkg.oldPrice - pkg.price) / pkg.oldPrice) * 100)
    : 0

  const shownHighlights = compact ? 2 : 3

  return (
    <article className="group bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
      <Link href={`/packages/${pkg.slug}`} className="block">
        <div className="relative h-52 overflow-hidden">
          <img
            src={pkg.image}
            alt={pkg.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          <div className="absolute top-4 left-4 flex flex-col gap-2 items-start">
            {pkg.badge && (
              <span className="bg-gray-900 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow">
                {pkg.badge}
              </span>
            )}
            {discount > 0 && (
              <span className="bg-white/90 backdrop-blur-sm text-gray-900 text-[11px] font-bold px-3 py-1 rounded-full shadow">
                {discount}% off
              </span>
            )}
          </div>

          <div className="absolute top-4 right-4 bg-white text-gray-900 text-xs font-bold px-3 py-1 rounded-full shadow">
            {formatPrice(pkg.price)}
            <span className="font-normal text-gray-500"> /person</span>
          </div>

          <div className="absolute bottom-4 left-4">
            <span className="inline-flex items-center gap-1.5 bg-black/50 backdrop-blur-sm text-white text-[11px] px-3 py-1 rounded-full">
              <MapPin className="w-3 h-3" />
              {pkg.destinationName}
            </span>
          </div>
        </div>

        <div className="px-6 pt-6">
          <div className="flex items-start justify-between gap-3 mb-3">
            <h3 className="text-lg font-bold text-gray-900 leading-snug">{pkg.title}</h3>
            <span className="flex items-center gap-1 text-xs flex-shrink-0 mt-1">
              <Star className="w-3.5 h-3.5 fill-gray-900 text-gray-900" />
              <span className="font-semibold text-gray-900">{pkg.rating}</span>
              <span className="text-gray-400">({pkg.reviews})</span>
            </span>
          </div>

          <p
            className={`text-sm text-gray-600 leading-relaxed ${compact ? 'line-clamp-2' : ''}`}
          >
            {pkg.summary}
          </p>

          {/* Meta row */}
          <div className="flex flex-wrap gap-x-4 gap-y-2 mt-4 text-xs text-gray-500">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {pkg.durationDays} Days / {pkg.durationNights} Nights
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5" /> {pkg.groupSize}
            </span>
          </div>

          {/* Highlights */}
          <ul className="space-y-1.5 mt-4">
            {pkg.highlights.slice(0, shownHighlights).map((point) => (
              <li key={point} className="flex items-start gap-2 text-sm text-gray-600">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0" />
                {point}
              </li>
            ))}
          </ul>

          {/* Category tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            {pkg.categories.map((cat) => (
              <span
                key={cat}
                className="border border-gray-200 text-gray-600 text-[11px] px-2.5 py-1 rounded-full"
              >
                {labelFor(cat)}
              </span>
            ))}
          </div>
        </div>
      </Link>

      {/* Price strip + buttons — outside the Link so no nested anchors */}
      <div className="px-6 pb-6 pt-5 mt-auto">
        <div className="flex items-end justify-between border-t border-gray-100 pt-4 mb-4">
          <div>
            <p className="text-[11px] uppercase tracking-widest text-gray-400">Starting from</p>
            <p className="text-xl font-bold text-gray-900 leading-tight">
              {formatPrice(pkg.price)}
              {pkg.oldPrice && (
                <span className="ml-2 text-sm font-normal text-gray-400 line-through">
                  {formatPrice(pkg.oldPrice)}
                </span>
              )}
            </p>
          </div>
          <span className="text-[11px] text-gray-400">{pkg.difficulty}</span>
        </div>

        <div className="flex gap-3">
          <Link
            href={`/packages/${pkg.slug}`}
            className="flex-1 text-center border border-gray-900 text-gray-900 text-sm font-semibold py-2.5 rounded-full hover:bg-gray-900 hover:text-white transition-colors"
          >
            View Details
          </Link>
          <a
            href="#contact"
            className="flex-1 text-center bg-gray-900 text-white text-sm font-semibold py-2.5 rounded-full hover:bg-gray-700 transition-colors"
          >
            Book Now
          </a>
        </div>
      </div>
    </article>
  )
}
