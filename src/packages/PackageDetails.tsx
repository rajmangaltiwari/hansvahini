import { type TravelPackage } from '@/src/data/packages'
import { getDestinationBySlug } from '@/src/data/destinations'
import Testimonials from '@/src/homepage/Testimonials'

import Hero from './packageDetail/Hero'
import Overview from './packageDetail/Overview'
import Highlights from './packageDetail/Highlights'
import Itinerary from './packageDetail/Itinerary'
import Activities from './packageDetail/Activities'
import BookingSidebar from './packageDetail/BookingSidebar'
import GallerySection from './packageDetail/GallerySection'
import BackLink from './packageDetail/BackLink'

/**
 * Package (trip) detail page. Each section lives in ./packageDetail — edit a
 * section there, or reorder the page by moving a line below.
 *
 * This is a Server Component: only Gallery (lightbox) ships JavaScript.
 */
export default function PackageDetails({ pkg }: { pkg: TravelPackage }) {
  // Packages borrow their photo set from the place they run to.
  const gallery = getDestinationBySlug(pkg.destinationSlug)?.gallery ?? []

  return (
    <main className="pt-16">
      <Hero pkg={pkg} />

      {/* Body: trip content on the left, booking rail on the right */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-14">
            <Overview pkg={pkg} />
            <Highlights pkg={pkg} />
            <Itinerary pkg={pkg} />
            <Activities pkg={pkg} />
          </div>

          <BookingSidebar pkg={pkg} />
        </div>
      </div>

      <GallerySection images={gallery} />
      <Testimonials />
      <BackLink />
    </main>
  )
}
