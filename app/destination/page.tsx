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

export const metadata: Metadata = {
  title: 'All Destinations — Hansvahini Expeditions',
  description:
    'Browse every destination we travel to — Ladakh, Spiti, Manali, Kedarnath, Rishikesh, Ranthambore, Varanasi and the Andamans. Filter by region, experience and difficulty.',
}

export default function DestinationsPage() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <DestinationsHero />
        <RegionStrip />
        <DestinationExplorer />
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
