import { notFound } from 'next/navigation'
import { destinations, getDestinationBySlug } from '@/src/data/destinations'
import Header from '@/src/components/Header'
import Footer from '@/src/components/Footer'
import DestinationDetails from '@/src/components/DestinationDetails'

export function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }))
}

export async function generateMetadata(props: PageProps<'/destination/[slug]'>) {
  const { slug } = await props.params
  const dest = getDestinationBySlug(slug)
  if (!dest) return {}
  return {
    title: `${dest.name} — Hansvahini Expeditions`,
    description: dest.overview.slice(0, 155),
  }
}

export default async function DestinationPage(props: PageProps<'/destination/[slug]'>) {
  const { slug } = await props.params
  const dest = getDestinationBySlug(slug)
  if (!dest) notFound()

  return (
    <>
      <Header />
      <DestinationDetails dest={dest} />
      <Footer />
    </>
  )
}
