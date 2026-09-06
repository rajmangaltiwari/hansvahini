'use client'

import { useActionState, useCallback, useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { submitEnquiry } from '@/src/server/actions/leads'
import { HONEYPOT_FIELD, initialEnquiryState, type EnquirySource } from '@/src/lib/validation/enquiry'

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

const travellerOptions = ['1', '2', '3–5', '6–10', '10+']

const inputClass =
  'w-full border border-gray-200 rounded-lg px-3.5 py-2 text-xs sm:text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:border-gray-400 transition-colors'
const labelClass =
  'block text-[11px] font-medium text-gray-600 mb-1 uppercase tracking-wide'
const errorClass = 'mt-1 text-[11px] text-red-600'

/**
 * Set once an enquiry has been sent from anywhere on the page.
 *
 * Both components live in this module, so a plain flag is enough — no context
 * for one boolean, and no subscription either, because it is only ever read at
 * the moment the pop-up decides whether to appear. It stops us asking again
 * for details someone has just finished typing into the page.
 */
let enquirySent = false

function markEnquirySent() {
  enquirySent = true
}

/** What the modal should ask about when opened deliberately. */
export type EnquiryContext = { source?: EnquirySource; packageSlug?: string }

/**
 * The mounted pop-up registers itself here so anything on the page can open it.
 *
 * A module-level handler rather than context: the pop-up lives in the root
 * layout and the buttons that open it are scattered across Server Component
 * trees, so there is no shared provider to hang a context off.
 */
let openHandler: ((context: EnquiryContext) => void) | null = null

/** Opens the enquiry modal. No-op if the pop-up is not mounted (e.g. on /admin). */
export function openEnquiryPopup(context: EnquiryContext = {}) {
  openHandler?.(context)
}

/**
 * The enquiry form fields component, shared by the homepage section and the pop-up modal.
 *
 * `source` and `packageSlug` ride along as hidden inputs so the admin can tell
 * a pop-up enquiry from one raised on a specific package page.
 */
export function EnquiryFormFields({
  idPrefix = 'enquiry',
  onSubmitted,
  source = 'Website form',
  packageSlug,
  destinations = [],
}: {
  idPrefix?: string
  onSubmitted?: () => void
  source?: EnquirySource
  packageSlug?: string
  /** Destination names for the select, resolved by a Server Component. */
  destinations?: string[]
}) {
  const destinationOptions = [...destinations, 'Other / Custom']

  const [state, formAction, pending] = useActionState(submitEnquiry, initialEnquiryState)
  const [form, setForm] = useState<FormState>(initialState)
  const [submitted, setSubmitted] = useState(false)

  // useActionState has no reset, so the success panel is held locally — that is
  // what lets "Submit another enquiry" put the form back.
  const announced = useRef(false)
  useEffect(() => {
    if (!state.ok || announced.current) return
    announced.current = true
    setSubmitted(true)
    markEnquirySent()
    onSubmitted?.()
  }, [state.ok, onSubmitted])

  const id = (field: string) => `${idPrefix}-${field}`

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
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
            announced.current = false
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
    <form action={formAction} className="space-y-3.5">
      <input type="hidden" name="source" value={source} />
      {/*
        Stamped from a ref callback rather than during render: Date.now() is
        impure, and this runs once the input exists in the DOM. A submission
        faster than a person could type is treated as automated — the action
        skips the check entirely if this never gets set.
      */}
      <input
        type="hidden"
        name="startedAt"
        ref={(el) => {
          if (el && !el.value) el.value = String(Date.now())
        }}
      />

      {/* Honeypot: off-screen, unreachable by tab, hidden from screen readers.
          Only a bot filling every input will put anything in it. */}
      <div aria-hidden="true" className="absolute left-[-9999px] w-px h-px overflow-hidden">
        <label htmlFor={id('company')}>Company (leave this blank)</label>
        <input
          id={id('company')}
          name={HONEYPOT_FIELD}
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      {packageSlug && <input type="hidden" name="packageSlug" value={packageSlug} />}

      {state.formError && (
        <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
          {state.formError}
        </p>
      )}

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
          {state.errors?.name && <p className={errorClass}>{state.errors.name}</p>}
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
          {state.errors?.phone && <p className={errorClass}>{state.errors.phone}</p>}
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
        {state.errors?.email && <p className={errorClass}>{state.errors.email}</p>}
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
        disabled={pending}
        className="w-full bg-gray-900 text-white text-sm font-semibold py-2.5 rounded-full hover:bg-gray-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {pending ? 'Sending Enquiry…' : 'Send Enquiry'}
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
export default function PopUpEnquiryForm({ destinations = [] }: { destinations?: string[] }) {
  const pathname = usePathname()
  // The admin panel is a working tool — the marketing pop-up has no business there.
  const suppressed = pathname.startsWith('/admin')

  const [open, setOpen] = useState(false)
  const [visible, setVisible] = useState(false)
  /** Set when opened from a Book Now button, so the lead records which trip. */
  const [context, setContext] = useState<EnquiryContext>({})

  const dialogRef = useRef<HTMLDivElement>(null)

  /**
   * These are refs, not state: nothing renders from them, and they are read
   * inside the timer and observer callbacks where a stale closure over state
   * would silently make the wrong decision.
   */
  const elapsed = useRef(false)
  const contactInView = useRef(false)
  /** Latches, so the pop-up appears at most once and never returns after a close. */
  const opened = useRef(false)

  const close = useCallback(() => {
    setVisible(false)
    setTimeout(() => setOpen(false), 200)
  }, [])

  /**
   * Called from the timer and from the observer — both external events, so the
   * open decision lives here rather than in an effect body.
   */
  const maybeOpen = useCallback(() => {
    if (opened.current || suppressed) return
    if (!elapsed.current || contactInView.current || enquirySent) return

    opened.current = true
    setOpen(true)
  }, [suppressed])

  useEffect(() => {
    if (suppressed) return
    const timer = setTimeout(() => {
      elapsed.current = true
      maybeOpen()
    }, POPUP_DELAY_MS)
    return () => clearTimeout(timer)
  }, [suppressed, maybeOpen])

  /**
   * Register the opener. A deliberate click bypasses every rule the timed
   * pop-up follows — the visitor asked for it, so it opens even if they are
   * looking at the inline form or have already sent an enquiry.
   */
  useEffect(() => {
    if (suppressed) return

    openHandler = (next) => {
      opened.current = true
      setContext(next)
      setOpen(true)
    }
    return () => {
      openHandler = null
    }
  }, [suppressed])

  /**
   * Watch the inline enquiry section. Interrupting someone who is part-way
   * through that form with a modal containing the same fields is the worst
   * moment this pop-up could pick.
   *
   * Re-observed per route: the section exists on the homepage, /destination and
   * /packages, but not on /about or the policy pages — where getElementById
   * returns null and the pop-up behaves as it always did.
   */
  useEffect(() => {
    if (suppressed) return

    const section = document.getElementById('contact')
    if (!section) {
      // /about and the policy pages have no enquiry section to avoid.
      contactInView.current = false
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        contactInView.current = entry.isIntersecting
        // Opening is deferred, not cancelled: if the delay ran out while the
        // form was on screen, the pop-up appears once they scroll away.
        if (!entry.isIntersecting) maybeOpen()
      },
      // Any sliver on screen counts as "they are looking at the form".
      { threshold: 0 }
    )
    observer.observe(section)

    return () => {
      observer.disconnect()
      contactInView.current = false
    }
  }, [suppressed, pathname, maybeOpen])

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

          <EnquiryFormFields
              idPrefix="enquiry-modal"
              source={context.source ?? 'Pop-up form'}
              packageSlug={context.packageSlug}
              destinations={destinations}
            />
        </div>
      </div>
    </div>
  )
}
