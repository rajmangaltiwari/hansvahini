import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import DestinationCard from '@/src/dastination/DestinationCard'
import { homepageDestinations, listDestinations } from '@/src/lib/queries/destinations'
import { fromPriceMap } from '@/src/lib/queries/packages'

export default async function Destinations() {
  // Same card as the full /destination page. Which six show up is curated
  // from /admin/destinations. Resolved per render now, not once at import.
  const [featured, all, prices] = await Promise.all([
    homepageDestinations(6),
    listDestinations(),
    fromPriceMap(),
  ])

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
            <DestinationCard key={dest.slug} dest={dest} from={prices[dest.slug] ?? 0} />
          ))}
        </div>

        {/* View all → full destinations page */}
        <div className="text-center mt-12">
          <Link
            href="/destination"
            className="inline-flex items-center gap-2 bg-gray-900 text-white text-sm font-semibold px-8 py-3 rounded-full hover:bg-gray-700 transition-colors"
          >
            View All {all.length} Destinations
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
