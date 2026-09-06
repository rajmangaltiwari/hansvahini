import { notFound } from 'next/navigation'
import { destinationSlugs, getDestinationBySlug } from '@/src/lib/queries/destinations'
import Header from '@/src/components/Header'
import Footer from '@/src/components/Footer'
import DestinationDetail from '@/src/dastination/DestinationDetail'
import EnquiryForm from '@/src/homepage/EnquiryForm'

/** Published slugs are prerendered; anything published later renders on demand. */
export async function generateStaticParams() {
  return (await destinationSlugs()).map((slug) => ({ slug }))
}

/** Rebuilt hourly, and immediately whenever an admin action revalidates it. */
export const revalidate = 3600

export async function generateMetadata(props: PageProps<'/destination/[slug]'>) {
  const { slug } = await props.params
  const dest = await getDestinationBySlug(slug)
  if (!dest) return {}
  return {
    title: `${dest.name} Travel Guide — Hansvahini Expeditions`,
    description: dest.blurb,
  }
}

export default async function DestinationPage(props: PageProps<'/destination/[slug]'>) {
  const { slug } = await props.params
  const dest = await getDestinationBySlug(slug)
  if (!dest) notFound()

  return (
    <>
      <Header />
      <DestinationDetail dest={dest} />
      <EnquiryForm />
      <Footer />
    </>
  )
}
