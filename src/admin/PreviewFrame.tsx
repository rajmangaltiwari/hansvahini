'use client'

import Link from 'next/link'
import { ArrowLeft, ExternalLink, Eye, FileText, Pencil } from 'lucide-react'

/**
 * Chrome around an admin preview: a toolbar saying which version you are
 * looking at, wrapping the *real* public page component underneath. Nothing is
 * re-implemented here, so the preview cannot drift from what actually ships.
 */
export default function PreviewFrame({
  title,
  backHref,
  backLabel,
  editHref,
  liveHref,
  source,
  children,
}: {
  title: string
  backHref: string
  backLabel: string
  editHref: string
  /** Omitted when the record has never been published, so there is no live URL. */
  liveHref?: string
  /** Which copy is on screen — a local draft, or the published record. */
  source: 'draft' | 'published'
  children: React.ReactNode
}) {
  const isDraft = source === 'draft'

  return (
    <>
      <Link
        href={backHref}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-gray-900 transition-colors mb-4"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        {backLabel}
      </Link>

      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight truncate">{title}</h2>
            <span
              className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full border flex-shrink-0 ${
                isDraft
                  ? 'bg-amber-50 text-amber-700 border-amber-100'
                  : 'bg-emerald-50 text-emerald-700 border-emerald-100'
              }`}
            >
              {isDraft ? <FileText className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
              {isDraft ? 'Draft' : 'Published'}
            </span>
          </div>
          <p className="mt-1 text-sm text-gray-500">
            {isDraft
              ? 'Unsaved draft held in this browser — nobody else can see this yet.'
              : 'The published page exactly as visitors see it.'}
          </p>
        </div>

        <div className="flex items-center gap-2 sm:ml-auto flex-shrink-0">
          <Link
            href={editHref}
            className="inline-flex items-center gap-2 bg-gray-900 text-white text-sm font-semibold px-4 py-2.5 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <Pencil className="w-4 h-4" />
            Edit
          </Link>
          {liveHref && (
            <a
              href={liveHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white border border-gray-200 text-gray-700 text-sm font-semibold px-4 py-2.5 rounded-lg hover:border-gray-400 hover:text-gray-900 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Live page
            </a>
          )}
        </div>
      </div>

      {/* Browser-ish frame so the page inside reads as a preview, not as the panel */}
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 border-b border-gray-200">
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="w-2.5 h-2.5 rounded-full bg-gray-200" />
            <span className="w-2.5 h-2.5 rounded-full bg-gray-200" />
            <span className="w-2.5 h-2.5 rounded-full bg-gray-200" />
          </span>
          <span className="flex-1 text-center text-[11px] text-gray-400 truncate">
            hansvahini.com{liveHref ?? ''}
          </span>
        </div>

        {/* The public page assumes a fixed header; there is none here, so pull the top padding back. */}
        <div className="[&>main]:pt-0">{children}</div>
      </div>
    </>
  )
}
