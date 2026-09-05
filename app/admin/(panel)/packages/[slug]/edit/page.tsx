import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Eye } from 'lucide-react'
import PageHeader from '@/src/admin/ui/PageHeader'
import CreatePackages from '@/src/admin/packages/CreatePackages'
import { getPackageBySlug } from '@/src/data/packages'

export const metadata: Metadata = { title: 'Edit Package' }

export default async function EditPackagePage(props: PageProps<'/admin/packages/[slug]/edit'>) {
  const { slug } = await props.params
  const pkg = getPackageBySlug(slug)
  if (!pkg) notFound()

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
        title={`Edit ${pkg.title}`}
        subtitle="The same form the package was created with, prefilled from the live record."
        actions={
          <Link
            href={`/admin/packages/${pkg.slug}/preview`}
            className="inline-flex items-center gap-2 bg-white border border-gray-200 text-gray-700 text-sm font-semibold px-4 py-2.5 rounded-lg hover:border-gray-400 hover:text-gray-900 transition-colors"
          >
            <Eye className="w-4 h-4" />
            Preview
          </Link>
        }
      />

      <CreatePackages initial={pkg} />
    </>
  )
}
