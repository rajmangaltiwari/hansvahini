'use client'

import { ArrowDown, ArrowUp, Plus, X } from 'lucide-react'

/**
 * Editor for a plain `string[]` field — highlights, travel tips, inclusions.
 * Rows are keyed by index, which is safe here because every row is fully
 * controlled from the array it renders.
 */
export default function StringList({
  label,
  hint,
  values,
  onChange,
  placeholder,
  addLabel = 'Add item',
  multiline = false,
}: {
  label: string
  hint?: string
  values: string[]
  onChange: (values: string[]) => void
  placeholder?: string
  addLabel?: string
  multiline?: boolean
}) {
  function update(index: number, value: string) {
    onChange(values.map((v, i) => (i === index ? value : v)))
  }

  function remove(index: number) {
    onChange(values.filter((_, i) => i !== index))
  }

  function move(index: number, delta: number) {
    const target = index + delta
    if (target < 0 || target >= values.length) return
    const next = [...values]
    ;[next[index], next[target]] = [next[target], next[index]]
    onChange(next)
  }

  const inputClass =
    'w-full border border-gray-200 rounded-lg px-3.5 py-2 text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:border-gray-400 transition-colors'

  return (
    <div>
      <div className="flex items-baseline justify-between mb-1">
        <span className="text-[11px] font-medium text-gray-600 uppercase tracking-wide">{label}</span>
        <span className="text-[11px] text-gray-300">{values.length} item{values.length === 1 ? '' : 's'}</span>
      </div>
      {hint && <p className="mb-2 text-[11px] text-gray-400">{hint}</p>}

      <div className="space-y-2">
        {values.map((value, i) => (
          <div key={i} className="flex items-start gap-1.5">
            <span className="mt-2.5 w-5 text-[11px] text-gray-300 tabular-nums flex-shrink-0">{i + 1}.</span>

            {multiline ? (
              <textarea
                rows={2}
                value={value}
                onChange={(e) => update(i, e.target.value)}
                placeholder={placeholder}
                className={`${inputClass} resize-y leading-relaxed`}
              />
            ) : (
              <input
                type="text"
                value={value}
                onChange={(e) => update(i, e.target.value)}
                placeholder={placeholder}
                className={inputClass}
              />
            )}

            <div className="flex items-center gap-0.5 flex-shrink-0 mt-1">
              <button
                type="button"
                onClick={() => move(i, -1)}
                disabled={i === 0}
                className="p-1.5 rounded-lg text-gray-300 hover:text-gray-900 hover:bg-gray-100 disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-gray-300 transition-colors"
                aria-label={`Move ${label} item ${i + 1} up`}
              >
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => move(i, 1)}
                disabled={i === values.length - 1}
                className="p-1.5 rounded-lg text-gray-300 hover:text-gray-900 hover:bg-gray-100 disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-gray-300 transition-colors"
                aria-label={`Move ${label} item ${i + 1} down`}
              >
                <ArrowDown className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => remove(i)}
                className="p-1.5 rounded-lg text-gray-300 hover:text-red-500 hover:bg-red-50 transition-colors"
                aria-label={`Remove ${label} item ${i + 1}`}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => onChange([...values, ''])}
        className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-gray-900 transition-colors"
      >
        <Plus className="w-3.5 h-3.5" />
        {addLabel}
      </button>
    </div>
  )
}
