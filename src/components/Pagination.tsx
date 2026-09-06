'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'

/**
 * Page controls shared by the public explorers and the admin tables.
 *
 * Page numbers are windowed: past a handful of pages, showing every one turns
 * the control into a wall of digits. First and last are always reachable, with
 * an ellipsis standing in for the gap.
 */
function pageNumbers(current: number, total: number): (number | 'gap')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)

  const pages = new Set<number>([1, total, current, current - 1, current + 1])
  const sorted = [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b)

  const out: (number | 'gap')[] = []
  let previous = 0
  for (const page of sorted) {
    if (previous && page - previous > 1) out.push('gap')
    out.push(page)
    previous = page
  }
  return out
}

export default function Pagination({
  page,
  totalPages,
  onChange,
  /** Dark surfaces (the public explorers sit on white; adjust if that changes). */
  className = '',
}: {
  page: number
  totalPages: number
  onChange: (page: number) => void
  className?: string
}) {
  // One page needs no controls at all.
  if (totalPages <= 1) return null

  const go = (next: number) => {
    onChange(Math.min(Math.max(next, 1), totalPages))
    // Jump back to the top of the list rather than leaving the reader mid-grid.
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const buttonClass =
    'inline-flex items-center justify-center min-w-8 h-8 px-2 rounded-lg text-xs font-semibold transition-colors disabled:opacity-30 disabled:cursor-not-allowed'

  return (
    <nav aria-label="Pagination" className={`flex items-center justify-center gap-1.5 ${className}`}>
      <button
        type="button"
        onClick={() => go(page - 1)}
        disabled={page === 1}
        aria-label="Previous page"
        className={`${buttonClass} border border-gray-200 text-gray-600 hover:border-gray-400 hover:text-gray-900`}
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {pageNumbers(page, totalPages).map((entry, i) =>
        entry === 'gap' ? (
          <span key={`gap-${i}`} className="px-1 text-xs text-gray-300" aria-hidden="true">
            …
          </span>
        ) : (
          <button
            key={entry}
            type="button"
            onClick={() => go(entry)}
            aria-current={entry === page ? 'page' : undefined}
            className={`${buttonClass} ${
              entry === page
                ? 'bg-gray-900 text-white'
                : 'border border-gray-200 text-gray-600 hover:border-gray-400 hover:text-gray-900'
            }`}
          >
            {entry}
          </button>
        )
      )}

      <button
        type="button"
        onClick={() => go(page + 1)}
        disabled={page === totalPages}
        aria-label="Next page"
        className={`${buttonClass} border border-gray-200 text-gray-600 hover:border-gray-400 hover:text-gray-900`}
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </nav>
  )
}
