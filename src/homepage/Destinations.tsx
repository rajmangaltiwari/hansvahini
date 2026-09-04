import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import DestinationCard from '@/src/dastination/DestinationCard'
import { popularDestinations, destinations } from '@/src/data/destinations'

// Same card as the full /destination page — the homepage just shows the top six.
const featured = popularDestinations(6)

export default function Destinations() {
  return (
    <section id="destinations" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="text-center mb-14">
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">
            Where We Go
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Popular Destinations
          </h2>
          <div className="mt-4 w-12 h-0.5 bg-gray-900 mx-auto" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((dest) => (
            <DestinationCard key={dest.slug} dest={dest} />
          ))}
        </div>

        {/* View all → full destinations page */}
        <div className="text-center mt-12">
          <Link
            href="/destination"
            className="inline-flex items-center gap-2 bg-gray-900 text-white text-sm font-semibold px-8 py-3 rounded-full hover:bg-gray-700 transition-colors"
          >
            View All {destinations.length} Destinations
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
