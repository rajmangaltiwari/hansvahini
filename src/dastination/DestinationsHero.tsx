import Link from 'next/link'
import { MapPin, Compass, Star, Users } from 'lucide-react'
import { destinations } from '@/src/data/destinations'

const stats = [
  { icon: MapPin,  value: `${destinations.length}`, label: 'Destinations' },
  { icon: Compass, value: '30+',                        label: 'Curated Trips' },
  { icon: Users,   value: '12,000+',                    label: 'Travellers Hosted' },
  { icon: Star,    value: '4.8/5',                      label: 'Average Rating' },
]

export default function DestinationsHero() {
  return (
    <section className="relative h-[60vh] min-h-96 flex items-end overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/hero.jpg')" }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <nav className="flex items-center gap-2 text-xs text-gray-300 mb-4" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <span className="text-white">Destinations</span>
        </nav>

        <p className="text-xs uppercase tracking-widest text-gray-300 mb-2">
          Where We Travel
        </p>
        <h1 className="text-3xl sm:text-5xl font-bold text-white max-w-3xl leading-tight">
          Every Destination We Run, In One Place
        </h1>
        <p className="mt-4 text-gray-200 text-sm sm:text-base max-w-2xl leading-relaxed">
          From the 5,000-metre passes of Ladakh to the coral shelves of the Andamans — eight
          destinations, each with a full itinerary, real costs and the honest version of what the
          days actually look like.
        </p>

        {/* Stat row */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-3 border border-white/15"
            >
              <stat.icon className="w-4 h-4 text-gray-200 mb-1.5" />
              <p className="text-lg sm:text-xl font-bold text-white leading-none">{stat.value}</p>
              <p className="text-[11px] text-gray-300 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
