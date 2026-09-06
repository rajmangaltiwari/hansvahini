import Link from 'next/link'
import { FileQuestion } from 'lucide-react'
import DestinationDetail from '@/src/dastination/DestinationDetail'
import PreviewFrame from '@/src/admin/PreviewFrame'
import type { Destination } from '@/src/data/destinations'

/**
 * Renders the real /destination/[slug] page against the stored record.
 *
 * A Server Component, because DestinationDetail is one — its sections query the
 * database for package counts, so it cannot be rendered from client code.
 *
 * Drafts come from the database rather than sessionStorage now: RLS lets a
 * signed-in admin read `status = 'draft'` rows that the public cannot see, so a
 * draft previews on any device instead of only in the tab that wrote it.
 */
export default function DestinationPreview({
  slug,
  record,
}: {
  slug: string
  record: Destination | null
}) {
  if (!record) {
    return (
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm px-6 py-16 text-center">
        <FileQuestion className="w-8 h-8 text-gray-300 mx-auto mb-3" />
        <p className="text-sm font-semibold text-gray-900">Nothing to preview for “{slug}”</p>
        <p className="mt-1 text-xs text-gray-400 max-w-sm mx-auto">
          No destination uses this slug — neither published nor saved as a draft.
        </p>
        <Link
          href="/admin/destinations"
          className="mt-5 inline-flex items-center gap-2 bg-gray-900 text-white text-sm font-semibold px-4 py-2.5 rounded-lg hover:bg-gray-800 transition-colors"
        >
          Back to destinations
        </Link>
      </div>
    )
  }

  const isDraft = record.status === 'draft'

  return (
    <PreviewFrame
      title={record.name || 'Untitled destination'}
      backHref="/admin/destinations"
      backLabel="Back to destinations"
      editHref={`/admin/destinations/${slug}/edit`}
      liveHref={isDraft ? undefined : `/destination/${record.slug}`}
      source={isDraft ? 'draft' : 'published'}
    >
      <DestinationDetail dest={record} />
    </PreviewFrame>
  )
}
