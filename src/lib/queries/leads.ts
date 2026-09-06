import 'server-only'

import { cache } from 'react'
import { createClient } from '@/src/lib/supabase/server'
import type { Lead, LeadNote, LeadSource, LeadStatus } from '@/src/admin/data/adminData'

/**
 * Admin-side reads for the enquiry inbox.
 *
 * RLS only grants `leads` to authenticated users, so these return nothing at
 * all for an anonymous request — the panel's own auth check is what makes them
 * useful, and RLS is the backstop if that check is ever missed.
 */

/** A lead plus its status-change history. */
export type LeadWithNotes = Lead & { notes: LeadNote[] }

type Row = Record<string, unknown>

const str = (v: unknown, fallback = '') => (typeof v === 'string' ? v : fallback)

/** Matches the wall-clock format the panel already renders in the history list. */
function displayStamp(iso: string): string {
  return new Date(iso).toLocaleString('en-GB', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function rowToLead(row: Row, notes: LeadNote[]): LeadWithNotes {
  return {
    id: Number(row.id),
    name: str(row.name),
    email: str(row.email),
    phone: str(row.phone),
    destination: str(row.destination),
    travelDates: str(row.travel_dates),
    travelers: str(row.travelers),
    message: str(row.message),
    status: str(row.status, 'new') as LeadStatus,
    source: str(row.source, 'Website form') as LeadSource,
    createdAt: str(row.created_at),
    notes,
  }
}

export const listLeads = cache(async (): Promise<LeadWithNotes[]> => {
  const supabase = await createClient()

  const [{ data: leadRows, error }, { data: noteRows }] = await Promise.all([
    supabase.from('leads').select('*').order('created_at', { ascending: false }),
    supabase.from('lead_notes').select('*').order('created_at', { ascending: false }),
  ])

  if (error) {
    console.error('[queries] listLeads:', error.message)
    return []
  }

  // Grouped in one pass rather than a query per lead.
  const byLead = new Map<number, LeadNote[]>()
  for (const note of noteRows ?? []) {
    const leadId = Number(note.lead_id)
    const list = byLead.get(leadId) ?? []
    list.push({
      id: Number(note.id),
      status: String(note.status) as LeadStatus,
      text: String(note.text),
      at: displayStamp(String(note.created_at)),
      by: String(note.author),
    })
    byLead.set(leadId, list)
  }

  return (leadRows ?? []).map((row) => rowToLead(row, byLead.get(Number(row.id)) ?? []))
})
