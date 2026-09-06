// ─────────────────────────────────────────────────────────────────────────────
// Dummy data for the admin panel — enquiries, media library and dashboard
// figures. Packages and destinations are NOT duplicated here: those admin
// screens read the live site data from src/data/*, so the panel always lists
// exactly what the public site is showing.
// ─────────────────────────────────────────────────────────────────────────────

/** Where an enquiry sits in the sales pipeline. */
export type LeadStatus = 'new' | 'potential' | 'converted' | 'lost' | 'not-answered'

/** Which form the enquiry came in through. */
export type LeadSource = 'Website form' | 'Pop-up form' | 'Package page' | 'Phone' | 'WhatsApp'

export type Lead = {
  id: number
  name: string
  email: string
  phone: string
  destination: string
  travelDates: string
  travelers: string
  message: string
  status: LeadStatus
  source: LeadSource
  /** ISO date — formatted for display with formatDate(). */
  createdAt: string
}

/** One status change, with the note the agent left explaining it. */
export type LeadNote = {
  id: number
  status: LeadStatus
  text: string
  at: string
  by: string
}

/**
 * One-tap notes offered alongside each status. They exist so a status change
 * never gets saved without a reason just because typing was too slow.
 */
export const quickNotes: Record<LeadStatus, string[]> = {
  'new':          ['Fresh enquiry — not contacted yet', 'Reopened, needs a fresh call', 'Assigned for follow-up'],
  'potential':    ['Spoke to them, sending options today', 'Quote sent by email', 'Shared three options, awaiting their pick', 'Following up next week'],
  'converted':    ['Advance received, booking confirmed', 'Dates locked, vouchers going out', 'Booked over WhatsApp'],
  'lost':         ['Went with another operator', 'Budget too low for these dates', 'Postponed — try again next season'],
  'not-answered': ['Called twice — no answer', 'Phone switched off', 'WhatsApp sent, no reply yet'],
}

export const leadStatuses: { id: LeadStatus; label: string; className: string }[] = [
  { id: 'new',          label: 'New',          className: 'bg-blue-50 text-blue-700 border-blue-100' },
  { id: 'potential',    label: 'Potential',    className: 'bg-violet-50 text-violet-700 border-violet-100' },
  { id: 'converted',    label: 'Converted',    className: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
  { id: 'lost',         label: 'Lost',         className: 'bg-gray-100 text-gray-500 border-gray-200' },
  { id: 'not-answered', label: 'Not answered', className: 'bg-amber-50 text-amber-700 border-amber-100' },
]

/** Twelve months of enquiry volume — drives the dashboard bar chart. */
/**
 * The panel renders on the server and again in the browser, so the timezone is
 * pinned rather than left to the machine — otherwise the two disagree and React
 * reports a hydration mismatch. IST is the right fixed choice here: the office
 * and the travellers are both in India.
 */
const IST = 'Asia/Kolkata'

/**
 * Accepts either a full ISO timestamp from Postgres
 * ("2026-09-05T17:12:58.239+00:00") or a bare date ("2026-06-15"). The bare
 * form has no timezone, so it is pinned to UTC midnight before formatting;
 * appending that to a full timestamp is what produced "Invalid Date".
 */
function parseStamp(iso: string): Date {
  return new Date(/^\d{4}-\d{2}-\d{2}$/.test(iso) ? `${iso}T00:00:00Z` : iso)
}

export function formatDate(iso: string): string {
  const date = parseStamp(iso)
  if (Number.isNaN(date.getTime())) return '—'

  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: IST,
  })
}

/** Date plus clock time — what the leads table shows under "Received". */
export function formatDateTime(iso: string): string {
  const date = parseStamp(iso)
  if (Number.isNaN(date.getTime())) return '—'

  return date.toLocaleString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: IST,
  })
}

/** '+91 98110 44523' → '919811044523', the digits-only form wa.me expects. */
export function whatsappNumber(phone: string): string {
  return phone.replace(/\D/g, '')
}
