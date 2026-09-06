'use server'

import { revalidatePath } from 'next/cache'
import { createAdminClient } from '@/src/lib/supabase/admin'
import { createClient } from '@/src/lib/supabase/server'
import { verifySession } from '@/src/lib/dal'
import type { LeadStatus } from '@/src/admin/data/adminData'
import { isSupabaseConfigured } from '@/src/lib/supabase/env'
import { sendEnquiryNotification } from '@/src/lib/email/resend'
import {
  enquirySchema,
  firstErrors,
  HONEYPOT_FIELD,
  MIN_FILL_SECONDS,
  type EnquiryInput,
  type EnquiryState,
} from '@/src/lib/validation/enquiry'

/**
 * The public enquiry submission.
 *
 * Shaped for useActionState, so the form gets `pending` for free and still
 * works before hydration.
 *
 * This file is 'use server', so it may export nothing but async functions —
 * EnquiryState and initialEnquiryState live in the validation module for that
 * reason. Adding a `const` export here is a build error.
 */
export async function submitEnquiry(
  _prev: EnquiryState,
  formData: FormData
): Promise<EnquiryState> {
  /*
   * Spam checks first, before any parsing or database work.
   *
   * Both failures return the ordinary success state rather than an error: a bot
   * that is told it was blocked will adapt, whereas one that thinks it
   * succeeded moves on. A person can never trip either check.
   */
  if (String(formData.get(HONEYPOT_FIELD) ?? '').trim() !== '') {
    console.warn('[enquiry] honeypot filled — dropped')
    return { ok: true }
  }

  const startedAt = Number(formData.get('startedAt') ?? 0)
  const elapsed = (Date.now() - startedAt) / 1000
  if (startedAt > 0 && elapsed < MIN_FILL_SECONDS) {
    console.warn(`[enquiry] submitted in ${elapsed.toFixed(1)}s — dropped`)
    return { ok: true }
  }

  const parsed = enquirySchema.safeParse({
    name: formData.get('name') ?? '',
    email: formData.get('email') ?? '',
    phone: formData.get('phone') ?? '',
    destination: formData.get('destination') ?? '',
    packageSlug: formData.get('packageSlug') || undefined,
    travelDates: formData.get('travelDates') ?? '',
    travelers: formData.get('travelers') ?? '',
    message: formData.get('message') ?? '',
    source: formData.get('source') ?? 'Website form',
  })

  if (!parsed.success) {
    return { ok: false, errors: firstErrors(parsed.error) }
  }

  const enquiry: EnquiryInput = parsed.data

  if (!isSupabaseConfigured() || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    // Only reachable before .env.local is filled in. Say so in the server log
    // rather than throwing an unhandled action error at the visitor.
    console.error('[enquiry] Supabase is not configured — the enquiry was not saved.')
    return {
      ok: false,
      formError: 'We could not send that just now. Please call us on +91 98765 43210.',
    }
  }

  // The service role is used here, and only here: the public must be able to
  // create a lead but must never be able to read or change one, so `anon` has
  // no policy on this table at all.
  const supabase = createAdminClient()

  const { data: lead, error } = await supabase
    .from('leads')
    .insert({
      name: enquiry.name,
      email: enquiry.email,
      phone: enquiry.phone,
      destination: enquiry.destination,
      package_slug: enquiry.packageSlug ?? null,
      travel_dates: enquiry.travelDates,
      travelers: enquiry.travelers,
      message: enquiry.message,
      source: enquiry.source,
    })
    .select('id')
    .single()

  if (error) {
    console.error('[enquiry] insert failed:', error.message)
    return {
      ok: false,
      formError: 'We could not save that just now. Please try again, or call us directly.',
    }
  }

  // The lead is safe at this point. An email failure must not turn into a
  // failed submission — the visitor would resubmit and we would hold two rows
  // for one enquiry. Record why it failed instead, so it is visible in admin.
  try {
    await sendEnquiryNotification(enquiry)
    await supabase.from('leads').update({ notified_at: new Date().toISOString() }).eq('id', lead.id)
  } catch (err) {
    const reason = err instanceof Error ? err.message : 'Unknown error'
    console.error('[enquiry] notification failed:', reason)
    await supabase.from('leads').update({ notify_error: reason }).eq('id', lead.id)
  }

  return { ok: true }
}

/**
 * Records a status change and/or a note against a lead.
 *
 * One action rather than two because the panel's Save button does both at once,
 * and a note without the status it was written against reads as meaningless
 * later.
 *
 * Uses the session-bound client, not the service role: RLS grants `leads` to
 * authenticated only, so a missing session fails the write even if the check
 * above were somehow bypassed.
 */
export async function updateLead(
  leadId: number,
  status: LeadStatus,
  note: string
): Promise<{ ok: boolean; error?: string; noteId?: number; at?: string }> {
  // Server Actions are reachable by direct POST, so this is checked here and
  // not left to the panel layout.
  const session = await verifySession()
  const supabase = await createClient()

  const { error: statusError } = await supabase
    .from('leads')
    .update({ status })
    .eq('id', leadId)

  if (statusError) {
    console.error('[leads] status update failed:', statusError.message)
    return { ok: false, error: 'That status change did not save.' }
  }

  let noteId: number | undefined
  let at: string | undefined

  const text = note.trim()
  if (text) {
    const { data, error: noteError } = await supabase
      .from('lead_notes')
      .insert({ lead_id: leadId, status, text, author: session.displayName })
      .select('id, created_at')
      .single()

    if (noteError) {
      // The status did save, so this is a partial success — say so rather than
      // reporting a clean failure the caller would retry.
      console.error('[leads] note insert failed:', noteError.message)
      return { ok: false, error: 'Status saved, but the note did not.' }
    }
    noteId = Number(data.id)
    at = String(data.created_at)
  }

  revalidatePath('/admin/leads')
  revalidatePath('/admin/dashboard')

  return { ok: true, noteId, at }
}

/**
 * Permanently removes an enquiry and its notes.
 *
 * `lead_notes.lead_id` is declared ON DELETE CASCADE, so the history goes with
 * it rather than being orphaned.
 */
export async function deleteLead(leadId: number): Promise<{ ok: boolean; error?: string }> {
  await verifySession()
  const supabase = await createClient()

  const { error } = await supabase.from('leads').delete().eq('id', leadId)

  if (error) {
    console.error('[leads] delete failed:', error.message)
    return { ok: false, error: 'That enquiry could not be deleted.' }
  }

  revalidatePath('/admin/leads')
  revalidatePath('/admin/dashboard')
  return { ok: true }
}
