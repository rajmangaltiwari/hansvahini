'use client'

import { useState } from 'react'
import { Plus, X } from 'lucide-react'

/**
 * Form primitives shared by the create-package and create-destination screens.
 * Every input is controlled — numeric fields are held as strings so a half-typed
 * value never becomes NaN, and are parsed once on submit.
 */

const inputClass =
  'w-full border border-gray-200 rounded-lg px-3.5 py-2 text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:border-gray-400 transition-colors'
const labelClass =
  'block text-[11px] font-medium text-gray-600 mb-1 uppercase tracking-wide'

export function Field({
  label,
  hint,
  required,
  htmlFor,
  className = '',
  children,
}: {
  label: string
  hint?: string
  required?: boolean
  htmlFor?: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className={labelClass}>
        {label}
        {required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      {children}
      {hint && <p className="mt-1 text-[11px] text-gray-400">{hint}</p>}
    </div>
  )
}

export function TextInput({
  id,
  value,
  onChange,
  placeholder,
  type = 'text',
  disabled,
}: {
  id?: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  type?: 'text' | 'number' | 'url'
  disabled?: boolean
}) {
  return (
    <input
      id={id}
      type={type}
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`${inputClass} ${disabled ? 'bg-gray-50 text-gray-400' : ''}`}
    />
  )
}

export function TextArea({
  id,
  value,
  onChange,
  placeholder,
  rows = 4,
}: {
  id?: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  rows?: number
}) {
  return (
    <textarea
      id={id}
      rows={rows}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`${inputClass} resize-y leading-relaxed`}
    />
  )
}

export function SelectInput<T extends string>({
  id,
  value,
  onChange,
  options,
}: {
  id?: string
  value: T
  onChange: (value: T) => void
  options: readonly { value: T; label: string }[]
}) {
  return (
    <select
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value as T)}
      className={`${inputClass} bg-white`}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}

/**
 * Multi-select rendered as toggle chips — used for categories and experiences.
 *
 * Any selected value that is not in `options` still renders as a chip, so a
 * record carrying a custom value shows it when the form is reopened to edit.
 * With `allowCustom`, an inline field adds values the preset list does not have.
 */
export function ChipGroup<T extends string>({
  options,
  selected,
  onChange,
  allowCustom = false,
  addPlaceholder = 'Add your own',
}: {
  options: readonly { value: T; label: string }[]
  selected: T[]
  onChange: (values: T[]) => void
  allowCustom?: boolean
  addPlaceholder?: string
}) {
  const [custom, setCustom] = useState('')

  function toggle(value: T) {
    onChange(selected.includes(value) ? selected.filter((v) => v !== value) : [...selected, value])
  }

  function addCustom() {
    const value = custom.trim()
    if (!value) return
    // Case-insensitive so "trekking" does not become a second Trekking chip.
    const clash = selected.some((v) => v.toLowerCase() === value.toLowerCase())
    const preset = options.find((o) => o.value.toLowerCase() === value.toLowerCase())

    if (!clash) onChange([...selected, (preset?.value ?? value) as T])
    setCustom('')
  }

  // Values on the record that the preset list does not cover.
  const extras = selected.filter((value) => !options.some((option) => option.value === value))

  return (
    <div>
      <div className="flex flex-wrap gap-1.5">
        {options.map((option) => {
          const active = selected.includes(option.value)
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => toggle(option.value)}
              aria-pressed={active}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                active
                  ? 'bg-gray-900 text-white'
                  : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-400 hover:text-gray-900'
              }`}
            >
              {option.label}
            </button>
          )
        })}

        {extras.map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => toggle(value)}
            aria-pressed
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-gray-900 text-white"
          >
            {value}
            <X className="w-3 h-3 text-gray-400" />
          </button>
        ))}
      </div>

      {allowCustom && (
        <div className="flex items-center gap-2 mt-2">
          <input
            type="text"
            value={custom}
            onChange={(e) => setCustom(e.target.value)}
            onKeyDown={(e) => {
              // Enter would otherwise submit the whole form.
              if (e.key !== 'Enter') return
              e.preventDefault()
              addCustom()
            }}
            placeholder={addPlaceholder}
            className="w-48 border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-900 placeholder-gray-300 focus:outline-none focus:border-gray-400 transition-colors"
          />
          <button
            type="button"
            onClick={addCustom}
            disabled={!custom.trim()}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-gray-900 disabled:opacity-40 disabled:hover:text-gray-600 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            Add
          </button>
        </div>
      )}
    </div>
  )
}

export function Toggle({
  label,
  description,
  checked,
  onChange,
}: {
  label: string
  description?: string
  checked: boolean
  onChange: (checked: boolean) => void
}) {
  return (
    <label className="flex items-start gap-3 cursor-pointer select-none">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 w-4 h-4 rounded border-gray-300 accent-gray-900"
      />
      <span>
        <span className="block text-sm text-gray-900">{label}</span>
        {description && <span className="block text-[11px] text-gray-400">{description}</span>}
      </span>
    </label>
  )
}
