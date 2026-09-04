import { notFound } from 'next/navigation'
import { travelPackages, getPackageBySlug } from '@/src/data/packages'
import Header from '@/src/components/Header'
import Footer from '@/src/components/Footer'
import PackageDetails from '@/src/packages/PackageDetails'
import EnquiryForm from '@/src/homepage/EnquiryForm'

export function generateStaticParams() {
  return travelPackages.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata(props: PageProps<'/packages/[slug]'>) {
  const { slug } = await props.params
  const pkg = getPackageBySlug(slug)
  if (!pkg) return {}
  return {
    title: `${pkg.title} — Hansvahini Expeditions`,
    description: pkg.summary,
  }
}

export default async function PackagePage(props: PageProps<'/packages/[slug]'>) {
  const { slug } = await props.params
  const pkg = getPackageBySlug(slug)
  if (!pkg) notFound()

  return (
    <>
      <Header />
      <PackageDetails pkg={pkg} />
      <EnquiryForm />
      <Footer />
    </>
  )
}
