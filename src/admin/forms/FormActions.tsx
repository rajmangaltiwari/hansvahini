'use client'

import Link from 'next/link'
import { Check, Eye, FileText } from 'lucide-react'

/**
 * Sticky footer for the create and edit forms. "Save as draft" keeps the record
 * out of the live list so it can be previewed first; the primary button is the
 * one that publishes.
 */
export default function FormActions({
  cancelHref,
  submitLabel,
  onSaveDraft,
  previewHref,
  note,
}: {
  cancelHref: string
  submitLabel: string
  onSaveDraft: () => void
  /** Shown once a draft exists, so the preview is one click from the form. */
  previewHref?: string
  note?: string
}) {
  return (
    <div className="sticky bottom-0 -mx-4 sm:-mx-6 px-4 sm:px-6 py-4 bg-white/90 backdrop-blur border-t border-gray-100">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-3">
        {note && <p className="text-xs text-gray-400 hidden lg:block">{note}</p>}

        <div className="flex flex-wrap items-center gap-2 ml-auto">
          <Link
            href={cancelHref}
            className="px-4 py-2.5 rounded-lg border border-gray-200 text-sm font-semibold text-gray-600 hover:border-gray-400 hover:text-gray-900 transition-colors"
          >
            Cancel
          </Link>

          {previewHref && (
            <Link
              href={previewHref}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-200 text-sm font-semibold text-gray-600 hover:border-gray-400 hover:text-gray-900 transition-colors"
            >
              <Eye className="w-4 h-4" />
              Preview
            </Link>
          )}

          <button
            type="button"
            onClick={onSaveDraft}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-200 text-sm font-semibold text-gray-600 hover:border-gray-400 hover:text-gray-900 transition-colors"
          >
            <FileText className="w-4 h-4" />
            Save as draft
          </button>

          <button
            type="submit"
            className="inline-flex items-center gap-2 bg-gray-900 text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <Check className="w-4 h-4" />
            {submitLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
