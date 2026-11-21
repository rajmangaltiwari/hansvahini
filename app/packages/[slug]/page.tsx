import { notFound } from 'next/navigation'
import { packageSlugs, getPackageBySlug } from '@/src/lib/queries/packages'
import Header from '@/src/components/Header'
import Footer from '@/src/components/Footer'
import PackageDetails from '@/src/packages/PackageDetails'
import EnquiryForm from '@/src/homepage/EnquiryForm'

/** Published slugs are prerendered; anything published later renders on demand. */
export async function generateStaticParams() {
  return (await packageSlugs()).map((slug) => ({ slug }))
}

/** Rebuilt hourly, and immediately whenever an admin action revalidates it. */
export const revalidate = 3600

export async function generateMetadata(props: PageProps<'/packages/[slug]'>) {
  const { slug } = await props.params
  const pkg = await getPackageBySlug(slug)
  if (!pkg) return {}
  return {
    title: `${pkg.title} — Your Travels`,
    description: pkg.summary,
  }
}

export default async function PackagePage(props: PageProps<'/packages/[slug]'>) {
  const { slug } = await props.params
  const pkg = await getPackageBySlug(slug)
  if (!pkg) notFound()

  return (
    <>
      <Header />
      <PackageDetails pkg={pkg} />
      <EnquiryForm source="Package page" packageSlug={pkg.slug} />
      <Footer />
    </>
  )
}
