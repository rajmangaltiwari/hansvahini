import type { Destination } from '@/src/data/destinations'
import Testimonials from '@/src/homepage/Testimonials'

import Hero from './dastinationDetail/Hero'
import Overview from './dastinationDetail/Overview'
import PopularPlaces from './dastinationDetail/PopularPlaces'
import ThingsToDo from './dastinationDetail/ThingsToDo'
import GallerySection from './dastinationDetail/GallerySection'
import DestinationPackages from './dastinationDetail/DestinationPackages'
import PlanYourVisit from './dastinationDetail/PlanYourVisit'
import BackLink from './dastinationDetail/BackLink'

/**
 * Destination guide page. Each section lives in ./dastinationDetail — edit a
 * section there, or reorder the page by moving a line below.
 *
 * This is a Server Component: only ThingsToDo (tabs) and Gallery (lightbox)
 * ship JavaScript to the browser.
 */
export default function DestinationDetail({ dest }: { dest: Destination }) {
  return (
    <main className="pt-16">
      <Hero dest={dest} />
      <Overview dest={dest} />
      <PopularPlaces dest={dest} />
      <ThingsToDo dest={dest} />
      <GallerySection dest={dest} />
      <DestinationPackages dest={dest} />
      <PlanYourVisit dest={dest} />
      <Testimonials />
      <BackLink />
    </main>
  )
}
