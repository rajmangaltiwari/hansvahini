import Link from 'next/link'
import { Eye, FileText, TriangleAlert } from 'lucide-react'

/** Confirmation strip shown above a form after "Save as draft". */
export default function DraftNotice({
  slug,
  previewHref,
  stored,
}: {
  slug: string
  previewHref: string
  /** False when sessionStorage refused the write — say so rather than lie. */
  stored: boolean
}) {
  if (!stored) {
    return (
      <div className="flex items-center gap-2 bg-amber-50 border border-amber-100 text-amber-800 rounded-xl px-4 py-2.5 mb-4">
        <TriangleAlert className="w-4 h-4 flex-shrink-0" />
        <p className="text-xs">
          The draft could not be stored — browser storage is unavailable here, so the preview has nothing to read.
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-wrap items-center gap-2 bg-gray-900 text-white rounded-xl px-4 py-2.5 mb-4">
      <FileText className="w-4 h-4 flex-shrink-0 text-gray-400" />
      <p className="text-xs">
        Draft saved as <span className="font-semibold">{slug}</span>. It stays out of the live list until you publish.
      </p>
      <Link
        href={previewHref}
        className="ml-auto inline-flex items-center gap-1.5 text-xs font-semibold text-white hover:underline"
      >
        <Eye className="w-3.5 h-3.5" />
        Preview the page
      </Link>
    </div>
  )
}
