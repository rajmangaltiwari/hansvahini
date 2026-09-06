import type { EnquiryInput } from '@/src/lib/validation/enquiry'

/**
 * The notification the admin receives for every enquiry.
 *
 * Deliberately plain: this is an internal alert that needs to be readable in a
 * phone notification and forwardable, not a marketing email. Inline styles
 * only — email clients strip <style> blocks.
 */

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

export function enquirySubject(enquiry: EnquiryInput): string {
  const where = enquiry.destination || enquiry.packageSlug
  return where
    ? `New enquiry — ${enquiry.name} · ${where}`
    : `New enquiry — ${enquiry.name}`
}

export function enquiryText(enquiry: EnquiryInput, adminUrl: string): string {
  return [
    `New enquiry via ${enquiry.source}`,
    '',
    `Name:        ${enquiry.name}`,
    `Email:       ${enquiry.email}`,
    `Phone:       ${enquiry.phone}`,
    `Destination: ${enquiry.destination || '—'}`,
    enquiry.packageSlug ? `Package:     ${enquiry.packageSlug}` : null,
    `Dates:       ${enquiry.travelDates || '—'}`,
    `Travellers:  ${enquiry.travelers || '—'}`,
    '',
    'Message:',
    enquiry.message || '(none)',
    '',
    `Open in admin: ${adminUrl}`,
  ]
    .filter((line) => line !== null)
    .join('\n')
}

export function enquiryHtml(enquiry: EnquiryInput, adminUrl: string): string {
  const row = (label: string, value: string) => `
    <tr>
      <td style="padding:6px 16px 6px 0;color:#6b7280;font-size:13px;white-space:nowrap;vertical-align:top">${label}</td>
      <td style="padding:6px 0;color:#111827;font-size:14px;font-weight:600">${escapeHtml(value)}</td>
    </tr>`

  return `
<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:560px;margin:0 auto;padding:24px">
  <p style="margin:0 0 4px;font-size:11px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:#6b7280">
    ${escapeHtml(enquiry.source)}
  </p>
  <h1 style="margin:0 0 20px;font-size:20px;color:#111827">New enquiry from ${escapeHtml(enquiry.name)}</h1>

  <table style="border-collapse:collapse;width:100%;margin-bottom:20px">
    ${row('Email', enquiry.email)}
    ${row('Phone', enquiry.phone)}
    ${row('Destination', enquiry.destination || '—')}
    ${enquiry.packageSlug ? row('Package', enquiry.packageSlug) : ''}
    ${row('Dates', enquiry.travelDates || '—')}
    ${row('Travellers', enquiry.travelers || '—')}
  </table>

  ${
    enquiry.message
      ? `<div style="border-left:3px solid #e5e7eb;padding:2px 0 2px 14px;margin-bottom:24px">
           <p style="margin:0;color:#374151;font-size:14px;line-height:1.6;white-space:pre-wrap">${escapeHtml(enquiry.message)}</p>
         </div>`
      : ''
  }

  <a href="${adminUrl}" style="display:inline-block;background:#111827;color:#fff;text-decoration:none;font-size:14px;font-weight:600;padding:10px 18px;border-radius:8px">
    Open in admin
  </a>

  <p style="margin:24px 0 0;color:#9ca3af;font-size:12px">
    Reply to this email to answer ${escapeHtml(enquiry.name)} directly.
  </p>
</div>`.trim()
}
