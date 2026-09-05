import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import PageHeader from '@/src/admin/ui/PageHeader'
import CreateDestination from '@/src/admin/destinations/CreateDestination'

export const metadata: Metadata = { title: 'New Destination' }

export default function NewDestinationPage() {
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
        title="New destination"
        subtitle="Every field on the Destination record — place guide, seasons, gallery and listing metadata."
      />

      <CreateDestination />
    </>
  )
}
