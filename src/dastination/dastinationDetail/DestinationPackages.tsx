import Link from 'next/link'
import type { Destination } from '@/src/data/destinations'
import { packagesForDestination } from '@/src/data/packages'
import PackageCard from '@/src/packages/PackageCard'

/** The bookable trips running to this place — this is where pricing lives. */
export default function DestinationPackages({ dest }: { dest: Destination }) {
  const packages = packagesForDestination(dest.slug)

  return (
    <section id="packages" className="py-20 bg-white scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">Book This Place</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Our {dest.name} Packages
          </h2>
          <div className="mt-4 w-12 h-0.5 bg-gray-900 mx-auto" />
          <p className="mt-5 text-sm text-gray-500 max-w-xl mx-auto leading-relaxed">
            {packages.length} trips run to {dest.name}, each with its own pace, budget and
            itinerary. Open one for the full day-by-day breakdown and what is included.
          </p>
        </div>

        {packages.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {packages.map((pkg) => (
                <PackageCard key={pkg.id} pkg={pkg} />
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                href={`/packages?destination=${dest.slug}`}
                className="inline-flex items-center gap-2 border border-gray-900 text-gray-900 text-sm font-semibold px-8 py-3 rounded-full hover:bg-gray-900 hover:text-white transition-colors"
              >
                Compare all {dest.name} packages
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-16 border border-dashed border-gray-200 rounded-2xl">
            <p className="text-sm text-gray-500 mb-6">
              We do not have a fixed departure here yet — but we will build one for you.
            </p>
            <a href="#contact" className="bg-gray-900 text-white text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-gray-700 transition-colors">
              Request a custom trip
            </a>
          </div>
        )}
      </div>
    </section>
  )
}
