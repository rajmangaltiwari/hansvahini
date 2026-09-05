import type { Metadata } from 'next'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import PageHeader from '@/src/admin/ui/PageHeader'
import DestinationsGrid from '@/src/admin/destinations/DestinationsGrid'

export const metadata: Metadata = { title: 'Destinations' }

export default function AdminDestinationsPage() {
  return (
    <>
      <PageHeader
        title="Destinations"
        subtitle="Place guides shown at /destination — attractions, seasons and travel tips."
        actions={
          <Link
            href="/admin/destinations/new"
            className="inline-flex items-center gap-2 bg-gray-900 text-white text-sm font-semibold px-4 py-2.5 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <Plus className="w-4 h-4" />
            New destination
          </Link>
        }
      />
      <DestinationsGrid />
    </>
  )
}
