import type { Metadata } from 'next'
import PackagePreview from '@/src/admin/packages/PackagePreview'
import { getPackageBySlug } from '@/src/data/packages'

export const metadata: Metadata = { title: 'Package Preview' }

/**
 * The published record is resolved on the server; the client component prefers a
 * locally saved draft when there is one, so unpublished work can be previewed.
 */
export default async function PackagePreviewPage(props: PageProps<'/admin/packages/[slug]/preview'>) {
  const { slug } = await props.params
  return <PackagePreview slug={slug} published={getPackageBySlug(slug) ?? null} />
}
