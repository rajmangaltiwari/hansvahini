import type { Metadata } from 'next'
import PackagePreview from '@/src/admin/packages/PackagePreview'
import { getPackageBySlug } from '@/src/lib/queries/packages'

export const metadata: Metadata = { title: 'Package Preview' }

/**
 * Resolved entirely on the server. The admin's session lets RLS return draft
 * rows too, so unpublished work previews without any client-side draft store.
 */
export default async function PackagePreviewPage(props: PageProps<'/admin/packages/[slug]/preview'>) {
  const { slug } = await props.params
  return <PackagePreview slug={slug} record={(await getPackageBySlug(slug, true)) ?? null} />
}
