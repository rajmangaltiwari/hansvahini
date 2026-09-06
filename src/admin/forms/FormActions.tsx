'use client'

import Link from 'next/link'
import { AlertCircle, Check, Eye, FileText, Loader2 } from 'lucide-react'

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
  busy = false,
  error,
  note,
}: {
  cancelHref: string
  submitLabel: string
  onSaveDraft: () => void
  /** True while a save is in flight — both buttons lock so it cannot double-submit. */
  busy?: boolean
  /** Why the last save failed, if it did. */
  error?: string | null
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
            disabled={busy}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-200 text-sm font-semibold text-gray-600 hover:border-gray-400 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <FileText className="w-4 h-4" />
            Save as draft
          </button>

          <button
            type="submit"
            disabled={busy}
            className="inline-flex items-center gap-2 bg-gray-900 text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-gray-800 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
          >
            {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
            {busy ? 'Saving…' : submitLabel}
          </button>
        </div>
      </div>

      {error && (
        <p className="flex items-start gap-1.5 px-4 pb-3 text-[11px] text-red-600">
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 mt-px" />
          {error}
        </p>
      )}
    </div>
  )
}
