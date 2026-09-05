'use client'

import { Home, RotateCcw, Save, Star, X } from 'lucide-react'
import { FEATURED_LIMIT } from './featuredStore'

/**
 * The homepage-picks toolbar shown above the packages table and the
 * destinations grid. It owns no state — the list page holds the selection and
 * passes it down, so the star on each row and this bar can never disagree.
 */
export default function FeaturedBar({
  picks,
  labelFor,
  onRemove,
  onReset,
  onSave,
  dirty,
}: {
  /** Chosen slugs, in the order they will appear on the homepage. */
  picks: string[]
  labelFor: (slug: string) => string
  onRemove: (slug: string) => void
  onReset: () => void
  onSave: () => void
  /** False when the selection matches what is already saved. */
  dirty: boolean
}) {
  const full = picks.length >= FEATURED_LIMIT

  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-4 mb-4">
      <div className="flex flex-wrap items-center gap-3">
        <span className="inline-flex w-9 h-9 rounded-xl bg-gray-900 items-center justify-center flex-shrink-0">
          <Home className="w-[18px] h-[18px] text-white" />
        </span>

        <div className="min-w-0">
          <p className="text-sm font-semibold text-gray-900">Homepage picks</p>
          <p className="text-xs text-gray-400">
            {picks.length} of {FEATURED_LIMIT} chosen
            {full
              ? ' — remove one to swap in another'
              : ` — star ${FEATURED_LIMIT - picks.length} more`}
          </p>
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <button
            onClick={onReset}
            disabled={!dirty}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-gray-200 text-xs font-semibold text-gray-600 hover:border-gray-400 hover:text-gray-900 disabled:opacity-40 disabled:hover:border-gray-200 disabled:hover:text-gray-600 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
          <button
            onClick={onSave}
            disabled={!dirty}
            className="inline-flex items-center gap-2 bg-gray-900 text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <Save className="w-3.5 h-3.5" />
            Save selection
          </button>
        </div>
      </div>

      {/* Chosen items in homepage order. Removing here is the same action as
          un-starring the row, so the two stay in step. */}
      {picks.length > 0 && (
        <ol className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-gray-100">
          {picks.map((slug, i) => (
            <li key={slug}>
              <span className="inline-flex items-center gap-1.5 bg-gray-50 border border-gray-200 text-xs text-gray-700 pl-2 pr-1 py-1 rounded-lg">
                <span className="text-gray-300 tabular-nums">{i + 1}</span>
                <span className="max-w-[14rem] truncate">{labelFor(slug)}</span>
                <button
                  onClick={() => onRemove(slug)}
                  className="p-0.5 rounded text-gray-300 hover:text-red-500 transition-colors"
                  aria-label={`Remove ${labelFor(slug)} from the homepage`}
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            </li>
          ))}
        </ol>
      )}

      {picks.length === 0 && (
        <p className="mt-3 pt-3 border-t border-gray-100 text-xs text-gray-400">
          Nothing chosen — the homepage falls back to the six most-reviewed entries.
        </p>
      )}
    </div>
  )
}

/** The star toggle rendered on each row or card. */
export function FeaturedStar({
  active,
  disabled,
  label,
  onToggle,
  className = '',
}: {
  active: boolean
  /** True when the limit is reached and this one is not already chosen. */
  disabled: boolean
  label: string
  onToggle: () => void
  className?: string
}) {
  return (
    <button
      onClick={onToggle}
      disabled={disabled}
      aria-pressed={active}
      title={
        active
          ? `Remove ${label} from the homepage`
          : disabled
            ? `The homepage holds ${FEATURED_LIMIT} — remove one first`
            : `Show ${label} on the homepage`
      }
      className={`p-1.5 rounded-lg transition-colors ${
        active
          ? 'text-amber-500 hover:bg-amber-50'
          : 'text-gray-300 hover:text-gray-900 hover:bg-gray-100 disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-gray-300 disabled:cursor-not-allowed'
      } ${className}`}
    >
      <Star className={`w-4 h-4 ${active ? 'fill-amber-500' : ''}`} />
      <span className="sr-only">{active ? 'On the homepage' : 'Not on the homepage'}</span>
    </button>
  )
}
