import type { Metadata } from 'next'
import Header from '@/src/components/Header'
import Footer from '@/src/components/Footer'
import PackagesHero from '@/src/packages/PackagesHero'
import PackagesExplorer from '@/src/packages/PackagesExplorer'
import PackageInclusions from '@/src/packages/PackageInclusions'
import HowItWorks from '@/src/packages/HowItWorks'
import PackagesFaq from '@/src/packages/PackagesFaq'
import PackagesCta from '@/src/packages/PackagesCta'
import Testimonials from '@/src/homepage/Testimonials'
import EnquiryForm from '@/src/homepage/EnquiryForm'
import {
  packageCategories,
  packageDestinations,
  type PackageCategory,
} from '@/src/data/packages'

export const metadata: Metadata = {
  title: 'Travel Packages — Family, Honeymoon & Adventure Trips | Hansvahini Expeditions',
  description:
    'Browse 18 curated travel packages across India. Filter by family, honeymoon, adventure, pilgrimage, wildlife and luxury themes, or by destination, trip length and budget.',
}

/**
 * `?category=honeymoon` and `?destination=ladakh` deep-link into a pre-filtered
 * view — used by the hero chips, the destination cards and the header menu.
 */
export default async function PackagesPage(props: PageProps<'/packages'>) {
  const { category, destination } = await props.searchParams

  const requestedCategory = Array.isArray(category) ? category[0] : category
  const requestedDestination = Array.isArray(destination) ? destination[0] : destination

  const initialCategory = packageCategories.some((c) => c.id === requestedCategory)
    ? (requestedCategory as PackageCategory | 'all')
    : 'all'

  const initialDestination = packageDestinations.some((d) => d.slug === requestedDestination)
    ? (requestedDestination as string)
    : 'all'

  return (
    <>
      <Header />
      <main className="pt-16">
        <PackagesHero />
        {/* key remounts the explorer when the query changes so the filter state re-seeds */}
        <PackagesExplorer
          key={`${initialCategory}-${initialDestination}`}
          initialCategory={initialCategory}
          initialDestination={initialDestination}
        />
        <PackageInclusions />
        <HowItWorks />
        <Testimonials />
        <PackagesFaq />
        <PackagesCta />
        <EnquiryForm />
      </main>
      <Footer />
    </>
  )
}
