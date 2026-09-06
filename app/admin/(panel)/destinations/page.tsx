import type { Metadata } from 'next'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import PageHeader from '@/src/admin/ui/PageHeader'
import DestinationsGrid from '@/src/admin/destinations/DestinationsGrid'
import { listDestinations } from '@/src/lib/queries/destinations'
import { listPackages } from '@/src/lib/queries/packages'
import { featuredSlugs } from '@/src/lib/queries/featured'

export const metadata: Metadata = { title: 'Destinations' }

export default async function AdminDestinationsPage() {
  const [destinations, packages, featured] = await Promise.all([
    listDestinations(true),
    listPackages(true),
    featuredSlugs('destination'),
  ])

  // One pass for every card's package count.
  const packageCounts: Record<string, number> = {}
  for (const pkg of packages) {
    packageCounts[pkg.destinationSlug] = (packageCounts[pkg.destinationSlug] ?? 0) + 1
  }

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
      <DestinationsGrid
        destinations={destinations}
        packageCounts={packageCounts}
        featured={featured}
      />
    </>
  )
}
