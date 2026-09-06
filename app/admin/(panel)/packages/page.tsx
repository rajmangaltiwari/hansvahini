import type { Metadata } from 'next'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import PageHeader from '@/src/admin/ui/PageHeader'
import PackagesTable from '@/src/admin/packages/PackagesTable'
import { listPackages } from '@/src/lib/queries/packages'
import { featuredSlugs } from '@/src/lib/queries/featured'

export const metadata: Metadata = { title: 'Packages' }

export default async function AdminPackagesPage() {
  const [packages, featured] = await Promise.all([listPackages(true), featuredSlugs('package')])

  return (
    <>
      <PageHeader
        title="Packages"
        subtitle="The bookable trips shown at /packages — pricing, itineraries and inclusions."
        actions={
          <Link
            href="/admin/packages/new"
            className="inline-flex items-center gap-2 bg-gray-900 text-white text-sm font-semibold px-4 py-2.5 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <Plus className="w-4 h-4" />
            New package
          </Link>
        }
      />
      <PackagesTable packages={packages} featured={featured} />
    </>
  )
}
