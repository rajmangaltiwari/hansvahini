import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import PackageCard from '@/src/packages/PackageCard'
import { homepagePackages, travelPackages } from '@/src/data/packages'

// Same card as the full /packages page, in its compact form. Which six show up
// is curated from /admin/packages; the copy is trimmed so the rows stay level.
const featured = homepagePackages(6)

export default function Packages() {
  return (
    <section id="packages" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="text-center mb-14">
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">
            What We Offer
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Our Popular Packages
          </h2>
          <div className="mt-4 w-12 h-0.5 bg-gray-900 mx-auto" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} compact />
          ))}
        </div>

        {/* View all → full packages page */}
        <div className="text-center mt-12">
          <Link
            href="/packages"
            className="inline-flex items-center gap-2 bg-gray-900 text-white text-sm font-semibold px-8 py-3 rounded-full hover:bg-gray-700 transition-colors"
          >
            View All {travelPackages.length} Packages
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
