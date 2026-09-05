'use client'

import { ArrowDown, ArrowUp, Plus, Trash2 } from 'lucide-react'

/**
 * Editor for an array of objects — itinerary days, attractions, seasons.
 * The caller supplies a blank row and renders the fields for one entry; this
 * component owns add, remove and reorder.
 */
export default function Repeater<T>({
  label,
  hint,
  items,
  onChange,
  blank,
  addLabel,
  rowTitle,
  children,
}: {
  label: string
  hint?: string
  items: T[]
  onChange: (items: T[]) => void
  blank: () => T
  addLabel: string
  /** Heading shown on each row's card, e.g. `Day 1`. */
  rowTitle: (item: T, index: number) => string
  children: (item: T, update: (patch: Partial<T>) => void, index: number) => React.ReactNode
}) {
  function update(index: number, patch: Partial<T>) {
    onChange(items.map((item, i) => (i === index ? { ...item, ...patch } : item)))
  }

  function remove(index: number) {
    onChange(items.filter((_, i) => i !== index))
  }

  function move(index: number, delta: number) {
    const target = index + delta
    if (target < 0 || target >= items.length) return
    const next = [...items]
    ;[next[index], next[target]] = [next[target], next[index]]
    onChange(next)
  }

  return (
    <div>
      <div className="flex items-baseline justify-between mb-1">
        <span className="text-[11px] font-medium text-gray-600 uppercase tracking-wide">{label}</span>
        <span className="text-[11px] text-gray-300">{items.length} entr{items.length === 1 ? 'y' : 'ies'}</span>
      </div>
      {hint && <p className="mb-2 text-[11px] text-gray-400">{hint}</p>}

      <div className="space-y-3">
        {items.map((item, i) => (
          <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
            <div className="flex items-center justify-between gap-2 bg-gray-50 px-3 py-2">
              <p className="text-xs font-semibold text-gray-700 truncate">{rowTitle(item, i)}</p>
              <div className="flex items-center gap-0.5 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => move(i, -1)}
                  disabled={i === 0}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-gray-900 hover:bg-white disabled:opacity-40 transition-colors"
                  aria-label="Move up"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => move(i, 1)}
                  disabled={i === items.length - 1}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-gray-900 hover:bg-white disabled:opacity-40 transition-colors"
                  aria-label="Move down"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => remove(i)}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                  aria-label="Remove entry"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="p-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {children(item, (patch) => update(i, patch), i)}
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => onChange([...items, blank()])}
        className="mt-3 w-full flex items-center justify-center gap-1.5 border border-dashed border-gray-200 rounded-xl py-2.5 text-xs font-semibold text-gray-500 hover:border-gray-400 hover:text-gray-900 transition-colors"
      >
        <Plus className="w-3.5 h-3.5" />
        {addLabel}
      </button>
    </div>
  )
}
