'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FileQuestion } from 'lucide-react'
import DestinationDetail from '@/src/dastination/DestinationDetail'
import PreviewFrame from '@/src/admin/PreviewFrame'
import { readDraft } from '@/src/admin/draftStore'
import type { Destination } from '@/src/data/destinations'

/**
 * Renders the real /destination/[slug] page against whichever copy is newest: a
 * local draft if one exists, otherwise the published record passed in by the
 * route. Reading storage in a lazy initialiser keeps it out of render.
 */
export default function DestinationPreview({
  slug,
  published,
}: {
  slug: string
  published: Destination | null
}) {
  const [draft] = useState(() => readDraft<Destination>('destination', slug))
  const dest = draft ?? published

  if (!dest) {
    return (
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm px-6 py-16 text-center">
        <FileQuestion className="w-8 h-8 text-gray-300 mx-auto mb-3" />
        <p className="text-sm font-semibold text-gray-900">Nothing to preview for “{slug}”</p>
        <p className="mt-1 text-xs text-gray-400 max-w-sm mx-auto">
          No published destination uses this slug, and there is no draft saved in this browser.
          Drafts do not travel between devices.
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

  return (
    <PreviewFrame
      title={dest.name || 'Untitled destination'}
      backHref="/admin/destinations"
      backLabel="Back to destinations"
      editHref={`/admin/destinations/${slug}/edit`}
      liveHref={published ? `/destination/${published.slug}` : undefined}
      source={draft ? 'draft' : 'published'}
    >
      <DestinationDetail dest={dest} />
    </PreviewFrame>
  )
}
