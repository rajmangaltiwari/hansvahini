import Link from 'next/link'
import { Clock, Users, MountainSnow, CalendarDays, MapPin } from 'lucide-react'
import { formatPrice, type TravelPackage } from '@/src/data/packages'

/** Full-bleed hero carrying the trip's headline price. */
export default function Hero({ pkg }: { pkg: TravelPackage }) {
  const discount = pkg.oldPrice
    ? Math.round(((pkg.oldPrice - pkg.price) / pkg.oldPrice) * 100)
    : 0

  return (
    <section className="relative h-[60vh] min-h-80 flex items-end overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${pkg.image}')` }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" aria-hidden="true" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <nav className="flex items-center gap-2 text-xs text-gray-300 mb-4" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link href="/packages" className="hover:text-white transition-colors">Packages</Link>
          <span>/</span>
          <span className="text-white">{pkg.title}</span>
        </nav>

        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Link
              href={`/destination/${pkg.destinationSlug}`}
              className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-gray-300 hover:text-white transition-colors mb-2"
            >
              <MapPin className="w-3.5 h-3.5" />
              {pkg.destinationName}
            </Link>
            <h1 className="text-3xl sm:text-5xl font-bold text-white">{pkg.title}</h1>
            <div className="flex flex-wrap gap-3 mt-4">
              {[
                { icon: <Clock className="w-3.5 h-3.5" />,        text: `${pkg.durationDays} Days / ${pkg.durationNights} Nights` },
                { icon: <Users className="w-3.5 h-3.5" />,        text: pkg.groupSize },
                { icon: <MountainSnow className="w-3.5 h-3.5" />, text: pkg.difficulty },
                { icon: <CalendarDays className="w-3.5 h-3.5" />, text: pkg.bestTime },
              ].map((chip) => (
                <span key={chip.text} className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full">
                  {chip.icon} {chip.text}
                </span>
              ))}
            </div>
          </div>

          <div className="text-right">
            <p className="text-gray-300 text-sm">Starting from</p>
            <p className="text-3xl font-bold text-white">
              {formatPrice(pkg.price)}
              {pkg.oldPrice && (
                <span className="ml-2 text-base font-normal text-gray-400 line-through">
                  {formatPrice(pkg.oldPrice)}
                </span>
              )}
            </p>
            <p className="text-gray-300 text-xs">
              per person{discount > 0 && ` · save ${discount}%`}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
