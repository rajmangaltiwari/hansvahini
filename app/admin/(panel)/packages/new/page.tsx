import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import PageHeader from '@/src/admin/ui/PageHeader'
import CreatePackages from '@/src/admin/packages/CreatePackages'
import { listDestinations } from '@/src/lib/queries/destinations'
import { listPackages } from '@/src/lib/queries/packages'

export const metadata: Metadata = { title: 'New Package' }

export default async function NewPackagePage() {
  const [destinations, packages] = await Promise.all([listDestinations(true), listPackages(true)])

  return (
    <>
      <Link
        href="/admin/packages"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-gray-900 transition-colors mb-4"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Back to packages
      </Link>

      <PageHeader
        title="New package"
        subtitle="Every field on the TravelPackage record, in the order the detail page uses them."
      />

      <CreatePackages destinations={destinations} liveCount={packages.length} />
    </>
  )
}
