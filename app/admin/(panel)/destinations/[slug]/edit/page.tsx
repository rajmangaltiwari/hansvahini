import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Eye } from 'lucide-react'
import PageHeader from '@/src/admin/ui/PageHeader'
import CreateDestination from '@/src/admin/destinations/CreateDestination'
import { getDestinationBySlug } from '@/src/data/destinations'

export const metadata: Metadata = { title: 'Edit Destination' }

export default async function EditDestinationPage(props: PageProps<'/admin/destinations/[slug]/edit'>) {
  const { slug } = await props.params
  const dest = getDestinationBySlug(slug)
  if (!dest) notFound()

  return (
    <>
      <Link
        href="/admin/destinations"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-gray-900 transition-colors mb-4"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Back to destinations
      </Link>

      <PageHeader
        title={`Edit ${dest.name}`}
        subtitle="The same form the destination was created with, prefilled from the live record."
        actions={
          <Link
            href={`/admin/destinations/${dest.slug}/preview`}
            className="inline-flex items-center gap-2 bg-white border border-gray-200 text-gray-700 text-sm font-semibold px-4 py-2.5 rounded-lg hover:border-gray-400 hover:text-gray-900 transition-colors"
          >
            <Eye className="w-4 h-4" />
            Preview
          </Link>
        }
      />

      <CreateDestination initial={dest} />
    </>
  )
}
