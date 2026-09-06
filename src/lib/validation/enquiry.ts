import { z } from 'zod'

/**
 * The public enquiry form is the one place strangers can write to the database,
 * so it is the one place validation genuinely matters. The form markup carries
 * `required` attributes but no JS validation, and a Server Action can be POSTed
 * to directly without going through the form at all — this schema is the real
 * gate.
 */

/** Mirrors LeadSource in src/admin/data/adminData.ts. */
export const leadSources = [
  'Website form',
  'Pop-up form',
  'Package page',
  'Phone',
  'WhatsApp',
] as const

/**
 * How quickly a submission is treated as automated.
 *
 * A person needs several seconds to read the labels and type a name, an email
 * and a phone number. A bot posts the moment the page parses.
 */
export const MIN_FILL_SECONDS = 3

/**
 * The hidden field a bot fills in and a person never sees.
 *
 * Named `company` rather than something obvious: scrapers look for inputs
 * called honeypot or similar and skip them. It is hidden from sighted users
 * with CSS and from screen readers with aria-hidden + tabIndex -1, so nobody
 * legitimate can reach it.
 */
export const HONEYPOT_FIELD = 'company'

export const enquirySchema = z.object({
  name: z.string().trim().min(2, 'Please tell us your name.').max(120),
  email: z.email('That email address does not look right.').max(200),
  phone: z
    .string()
    .trim()
    .min(6, 'Please give us a phone number we can reach you on.')
    .max(30),
  destination: z.string().trim().max(120).default(''),
  packageSlug: z.string().trim().max(120).optional(),
  travelDates: z.string().trim().max(60).default(''),
  travelers: z.string().trim().max(30).default(''),
  message: z.string().trim().max(4000).default(''),
  // Anything unrecognised falls back rather than failing the enquiry — the
  // source is our own bookkeeping, not something worth rejecting a lead over.
  source: z.enum(leadSources).catch('Website form'),
})

export type EnquiryInput = z.infer<typeof enquirySchema>

/** Field name → first error message, which is all the form renders. */
export type EnquiryFieldErrors = Partial<Record<keyof EnquiryInput, string>>

export function firstErrors(error: z.ZodError<EnquiryInput>): EnquiryFieldErrors {
  const { fieldErrors } = z.flattenError(error)
  const out: EnquiryFieldErrors = {}

  for (const [field, messages] of Object.entries(fieldErrors)) {
    if (messages?.length) out[field as keyof EnquiryInput] = messages[0]
  }
  return out
}

/** Where an enquiry came from, for the admin's own bookkeeping. */
export type EnquirySource = (typeof leadSources)[number]

/**
 * The shape useActionState carries for the enquiry form.
 *
 * This lives here rather than beside the action because a 'use server' file may
 * only export async functions — exporting a plain object from one is a build
 * error ("A \"use server\" file can only export async functions").
 */
export type EnquiryState = {
  ok: boolean
  /** Per-field messages rendered under the inputs. */
  errors?: EnquiryFieldErrors
  /** Something went wrong that is not the visitor's fault. */
  formError?: string
}

export const initialEnquiryState: EnquiryState = { ok: false }
