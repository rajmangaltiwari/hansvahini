import 'server-only'

import { Resend } from 'resend'
import type { EnquiryInput } from '@/src/lib/validation/enquiry'
import { enquiryHtml, enquirySubject, enquiryText } from './enquiryTemplate'

/**
 * Sends the admin the alert for a new enquiry.
 *
 * Throws on failure — deliberately. The caller in src/server/actions/leads.ts
 * catches it and records the reason on the lead row, because the lead has
 * already been saved by then and losing the email is recoverable in a way that
 * losing the enquiry is not.
 */

/** Comma-separated in the env so a second admin needs no code change. */
function recipients(): string[] {
  const raw = process.env.ADMIN_NOTIFY_EMAILS ?? ''
  const list = raw
    .split(',')
    .map((address) => address.trim())
    .filter(Boolean)

  if (list.length === 0) {
    throw new Error('ADMIN_NOTIFY_EMAILS is empty — nobody would be told about this enquiry.')
  }
  return list
}

export async function sendEnquiryNotification(enquiry: EnquiryInput): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) throw new Error('RESEND_API_KEY is not set.')

  const from = process.env.ENQUIRY_FROM_EMAIL ?? 'Hansvahini <onboarding@resend.dev>'
  const site = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
  const adminUrl = `${site.replace(/\/$/, '')}/admin/leads`

  const { error } = await new Resend(apiKey).emails.send({
    from,
    to: recipients(),
    subject: enquirySubject(enquiry),
    text: enquiryText(enquiry, adminUrl),
    html: enquiryHtml(enquiry, adminUrl),
    // So hitting reply in the inbox answers the traveller, not us.
    replyTo: enquiry.email,
  })

  // The SDK returns errors in the payload rather than throwing.
  if (error) throw new Error(error.message)
}
