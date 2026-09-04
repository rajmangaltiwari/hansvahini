import { notFound } from 'next/navigation'
import { destinations, getDestinationBySlug } from '@/src/data/destinations'
import Header from '@/src/components/Header'
import Footer from '@/src/components/Footer'
import DestinationDetail from '@/src/dastination/DestinationDetail'
import EnquiryForm from '@/src/homepage/EnquiryForm'

export function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }))
}

export async function generateMetadata(props: PageProps<'/destination/[slug]'>) {
  const { slug } = await props.params
  const dest = getDestinationBySlug(slug)
  if (!dest) return {}
  return {
    title: `${dest.name} Travel Guide — Hansvahini Expeditions`,
    description: dest.blurb,
  }
}

export default async function DestinationPage(props: PageProps<'/destination/[slug]'>) {
  const { slug } = await props.params
  const dest = getDestinationBySlug(slug)
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
