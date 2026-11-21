import type { Metadata } from 'next'
import Header from '@/src/components/Header'
import Footer from '@/src/components/Footer'
import DestinationsHero from '@/src/dastination/DestinationsHero'
import RegionStrip from '@/src/dastination/RegionStrip'
import DestinationExplorer from '@/src/dastination/DestinationExplorer'
import FeaturedDestination from '@/src/dastination/FeaturedDestination'
import DestinationComparison from '@/src/dastination/DestinationComparison'
import WhyTravelWithUs from '@/src/dastination/WhyTravelWithUs'
import DestinationsCta from '@/src/dastination/DestinationsCta'
import Testimonials from '@/src/homepage/Testimonials'
import EnquiryForm from '@/src/homepage/EnquiryForm'
import { listDestinations } from '@/src/lib/queries/destinations'
import { fromPriceMap } from '@/src/lib/queries/packages'

export const metadata: Metadata = {
  title: 'All Destinations — Your Travels',
  description:
    'Browse every destination we travel to — Ladakh, Spiti, Manali, Kedarnath, Rishikesh, Ranthambore, Varanasi and the Andamans. Filter by region, experience and difficulty.',
}

/** Rebuilt hourly, and immediately when an admin action revalidates it. */
export const revalidate = 3600

export default async function DestinationsPage() {
  // Fetched once here and handed to the client explorer, which cannot query.
  const [destinations, prices] = await Promise.all([listDestinations(), fromPriceMap()])

  return (
    <>
      <Header />
      <main className="pt-16">
        <DestinationsHero />
        <RegionStrip />
        <DestinationExplorer destinations={destinations} prices={prices} />
        <FeaturedDestination />
        <DestinationComparison />
        <WhyTravelWithUs />
        <Testimonials />
        <DestinationsCta />
        <EnquiryForm />
      </main>
      <Footer />
    </>
  )
}
