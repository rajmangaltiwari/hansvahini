import type { Metadata } from 'next'
import DestinationPreview from '@/src/admin/destinations/DestinationPreview'
import { getDestinationBySlug } from '@/src/data/destinations'

export const metadata: Metadata = { title: 'Destination Preview' }

/**
 * The published record is resolved on the server; the client component prefers a
 * locally saved draft when there is one, so unpublished work can be previewed.
 */
export default async function DestinationPreviewPage(props: PageProps<'/admin/destinations/[slug]/preview'>) {
  const { slug } = await props.params
  return <DestinationPreview slug={slug} published={getDestinationBySlug(slug) ?? null} />
}
