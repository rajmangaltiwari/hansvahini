'use client'

import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react'
import { usePathname } from 'next/navigation'
import { destinations } from '@/src/data/destinations'

type FormState = {
  name: string
  email: string
  phone: string
  destination: string
  travelDates: string
  travelers: string
  message: string
}

const initialState: FormState = {
  name: '',
  email: '',
  phone: '',
  destination: '',
  travelDates: '',
  travelers: '',
  message: '',
}

const destinationOptions = [...destinations.map((d) => d.name), 'Other / Custom']
const travellerOptions = ['1', '2', '3–5', '6–10', '10+']

const inputClass =
  'w-full border border-gray-200 rounded-lg px-3.5 py-2 text-xs sm:text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:border-gray-400 transition-colors'
const labelClass =
  'block text-[11px] font-medium text-gray-600 mb-1 uppercase tracking-wide'

/**
 * The enquiry form fields component, shared by the homepage section and the pop-up modal.
 */
export function EnquiryFormFields({
  idPrefix = 'enquiry',
  onSubmitted,
}: {
  idPrefix?: string
  onSubmitted?: () => void
}) {
  const [form, setForm] = useState<FormState>(initialState)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const id = (field: string) => `${idPrefix}-${field}`

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
      onSubmitted?.()
    }, 1000)
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-12 gap-4">
        <div className="w-16 h-16 rounded-full bg-gray-900 flex items-center justify-center">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-900">Enquiry Received!</h3>
        <p className="text-sm text-gray-500 max-w-xs">
          Thank you, {form.name || 'traveller'}! Our team will reach out within 24 hours with your
          personalised itinerary.
        </p>
        <button
          onClick={() => {
            setSubmitted(false)
            setForm(initialState)
          }}
          className="mt-2 text-sm font-semibold text-gray-900 underline underline-offset-4"
        >
          Submit another enquiry
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-3.5">
      {/* Name + phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <div>
          <label htmlFor={id('name')} className={labelClass}>
            Full Name <span className="text-gray-400">*</span>
          </label>
          <input
            id={id('name')}
            name="name"
            type="text"
            required
            value={form.name}
            onChange={handleChange}
            placeholder="Raj Kumar"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor={id('phone')} className={labelClass}>
            Phone <span className="text-gray-400">*</span>
          </label>
          <input
            id={id('phone')}
            name="phone"
            type="tel"
            required
            value={form.phone}
            onChange={handleChange}
            placeholder="+91 98765 43210"
            className={inputClass}
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <label htmlFor={id('email')} className={labelClass}>
          Email Address <span className="text-gray-400">*</span>
        </label>
        <input
          id={id('email')}
          name="email"
          type="email"
          required
          value={form.email}
          onChange={handleChange}
          placeholder="you@email.com"
          className={inputClass}
        />
      </div>

      {/* Destination */}
      <div>
        <label htmlFor={id('destination')} className={labelClass}>
          Destination of Interest
        </label>
        <select
          id={id('destination')}
          name="destination"
          value={form.destination}
          onChange={handleChange}
          className={`${inputClass} bg-white`}
        >
          <option value="">Select a destination</option>
          {destinationOptions.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </div>

      {/* Dates + travellers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <div>
          <label htmlFor={id('travelDates')} className={labelClass}>
            Preferred Travel Date
          </label>
          <input
            id={id('travelDates')}
            name="travelDates"
            type="date"
            min={new Date().toISOString().split('T')[0]}
            value={form.travelDates}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor={id('travelers')} className={labelClass}>
            No. of Travellers
          </label>
          <select
            id={id('travelers')}
            name="travelers"
            value={form.travelers}
            onChange={handleChange}
            className={`${inputClass} bg-white`}
          >
            <option value="">Select</option>
            {travellerOptions.map((n) => (
              <option key={n} value={n}>
                {n} {n === '1' ? 'person' : 'people'}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor={id('message')} className={labelClass}>
          Additional Requirements
        </label>
        <textarea
          id={id('message')}
          name="message"
          rows={3}
          value={form.message}
          onChange={handleChange}
          placeholder="Tell us about your trip expectations, special requirements, or any questions..."
          className={`${inputClass} resize-none`}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gray-900 text-white text-sm font-semibold py-2.5 rounded-full hover:bg-gray-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? 'Sending Enquiry…' : 'Send Enquiry'}
      </button>
    </form>
  )
}

/** How long the visitor browses before the enquiry modal appears. */
const POPUP_DELAY_MS = 10_000

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

/**
 * Timed enquiry pop-up modal component, mounted once in the root layout.
 */
export default function PopUpEnquiryForm() {
  const pathname = usePathname()
  // The admin panel is a working tool — the marketing pop-up has no business there.
  const suppressed = pathname.startsWith('/admin')

  const [open, setOpen] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const [visible, setVisible] = useState(false)

  const dialogRef = useRef<HTMLDivElement>(null)

  const close = useCallback(() => {
    setVisible(false)
    setDismissed(true)
    setTimeout(() => setOpen(false), 200)
  }, [])

  useEffect(() => {
    if (dismissed || suppressed) return
    const timer = setTimeout(() => setOpen(true), POPUP_DELAY_MS)
    return () => clearTimeout(timer)
  }, [dismissed, suppressed])

  useEffect(() => {
    if (!open) return
    const frame = requestAnimationFrame(() => setVisible(true))
    return () => cancelAnimationFrame(frame)
  }, [open])

  useEffect(() => {
    if (!open) return

    const previouslyFocused = document.activeElement as HTMLElement | null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    dialogRef.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus()

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        close()
        return
      }
      if (e.key !== 'Tab' || !dialogRef.current) return

      const items = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE))
      if (items.length === 0) return
      const first = items[0]
      const last = items[items.length - 1]

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
      previouslyFocused?.focus()
    }
  }, [open, close])

  if (!open || suppressed) return null

  return (
    <div
      className={`fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 transition-opacity duration-200 motion-reduce:transition-none ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={close}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" aria-hidden="true" />

      {/* Dialog */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="enquiry-modal-title"
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-xl transition-all duration-200 motion-reduce:transition-none ${
          visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        {/* Close */}
        <button
          onClick={close}
          aria-label="Close enquiry form"
          className="absolute top-3.5 right-3.5 z-10 w-8 h-8 text-gray-500 flex items-center justify-center hover:text-red-500 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-5 sm:p-6">
          <div className="mb-4 pr-8">
            <p className="text-[11px] uppercase tracking-widest text-gray-400 mb-1">Get in Touch</p>
            <h2 id="enquiry-modal-title" className="text-xl font-bold text-gray-900">
              Plan Your Dream Trip
            </h2>
            <div className="mt-2 w-8 h-0.5 bg-gray-900" />
            <p className="mt-2 text-xs sm:text-sm text-gray-500 leading-relaxed">
              Tell us where you want to go and our travel experts will come back within 24 hours
              with a personalised itinerary and quote.
            </p>
          </div>

          <EnquiryFormFields idPrefix="enquiry-modal" />
        </div>
      </div>
    </div>
  )
}
