import 'server-only'

import { cache } from 'react'
import { createClient } from '@/src/lib/supabase/server'
import type { LeadStatus } from '@/src/admin/data/adminData'

/**
 * Dashboard figures, derived from the leads table rather than fixtures.
 *
 * Everything here is admin-only, so it uses the session client — RLS grants
 * `leads` to authenticated users and nobody else.
 */

export type MonthPoint = { month: string; count: number }

export type DashboardStats = {
  newEnquiries: number
  converted: number
  /** Percent change vs the previous period, or undefined when there is no
   *  previous period to compare against — a made-up number is worse than none. */
  newDelta?: number
  convertedDelta?: number
  /** Twelve months ending with the current one. */
  trend: MonthPoint[]
  totalLastYear: number
}

/** Percent change, or undefined when the baseline is zero. */
function delta(current: number, previous: number): number | undefined {
  if (previous === 0) return undefined
  return Math.round(((current - previous) / previous) * 100)
}

export const countLeadsByStatus = cache(async (status: LeadStatus): Promise<number> => {
  const supabase = await createClient()
  const { count, error } = await supabase
    .from('leads')
    .select('*', { count: 'exact', head: true })
    .eq('status', status)

  if (error) {
    console.error('[stats] countLeadsByStatus:', error.message)
    return 0
  }
  return count ?? 0
})

export const dashboardStats = cache(async (): Promise<DashboardStats> => {
  const supabase = await createClient()

  const { data, error } = await supabase.from('leads').select('status, created_at')
  if (error) {
    console.error('[stats] dashboardStats:', error.message)
    return { newEnquiries: 0, converted: 0, trend: [], totalLastYear: 0 }
  }

  const rows = (data ?? []).map((r) => ({
    status: String(r.status) as LeadStatus,
    at: new Date(String(r.created_at)),
  }))

  const now = new Date()
  const daysAgo = (n: number) => new Date(now.getTime() - n * 86_400_000)

  const thisWeek = rows.filter((r) => r.at >= daysAgo(7)).length
  const lastWeek = rows.filter((r) => r.at >= daysAgo(14) && r.at < daysAgo(7)).length

  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)
  const prevMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1)

  const convertedRows = rows.filter((r) => r.status === 'converted')
  const convertedThisMonth = convertedRows.filter((r) => r.at >= monthStart).length
  const convertedLastMonth = convertedRows.filter(
    (r) => r.at >= prevMonthStart && r.at < monthStart
  ).length

  // Twelve buckets ending with the current month, so the chart always spans a year.
  const trend: MonthPoint[] = []
  for (let i = 11; i >= 0; i--) {
    const start = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const end = new Date(now.getFullYear(), now.getMonth() - i + 1, 1)

    trend.push({
      month: start.toLocaleString('en-GB', { month: 'short' }),
      count: rows.filter((r) => r.at >= start && r.at < end).length,
    })
  }

  return {
    newEnquiries: rows.filter((r) => r.status === 'new').length,
    converted: convertedRows.length,
    newDelta: delta(thisWeek, lastWeek),
    convertedDelta: delta(convertedThisMonth, convertedLastMonth),
    trend,
    totalLastYear: trend.reduce((sum, m) => sum + m.count, 0),
  }
})

export type ActivityEntry = {
  id: string
  actor: string
  action: string
  target: string
  at: string
}

/** "3 hours ago", "Yesterday", "2 days ago". */
function relativeTime(iso: string): string {
  const then = new Date(iso).getTime()
  const mins = Math.round((Date.now() - then) / 60_000)

  if (mins < 1) return 'Just now'
  if (mins < 60) return `${mins} minute${mins === 1 ? '' : 's'} ago`

  const hours = Math.round(mins / 60)
  if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'} ago`

  const days = Math.round(hours / 24)
  if (days === 1) return 'Yesterday'
  if (days < 30) return `${days} days ago`

  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
}

/**
 * What actually changed lately, assembled from the records that carry a
 * timestamp: notes written against leads, and content edited in the panel.
 *
 * There is no audit log, so this is a reconstruction rather than a history —
 * it shows the latest state of each record, not every past edit.
 */
export const recentActivity = cache(async (limit = 6): Promise<ActivityEntry[]> => {
  const supabase = await createClient()

  const [{ data: notes }, { data: dests }, { data: pkgs }] = await Promise.all([
    supabase
      .from('lead_notes')
      .select('id, status, author, created_at, lead_id, leads(name)')
      .order('created_at', { ascending: false })
      .limit(limit),
    supabase.from('destinations').select('slug, name, status, updated_at')
      .order('updated_at', { ascending: false }).limit(limit),
    supabase.from('packages').select('slug, title, status, updated_at')
      .order('updated_at', { ascending: false }).limit(limit),
  ])

  const entries: ActivityEntry[] = []

  for (const note of notes ?? []) {
    const lead = note.leads as { name?: string } | { name?: string }[] | null
    const name = Array.isArray(lead) ? lead[0]?.name : lead?.name

    entries.push({
      id: `note-${note.id}`,
      actor: String(note.author),
      action: `marked as ${String(note.status)}`,
      target: name ? `enquiry from ${name}` : `enquiry #${note.lead_id}`,
      at: String(note.created_at),
    })
  }

  for (const d of dests ?? []) {
    entries.push({
      id: `dest-${d.slug}`,
      actor: 'Someone',
      action: d.status === 'draft' ? 'saved a draft of' : 'published',
      target: String(d.name),
      at: String(d.updated_at),
    })
  }

  for (const p of pkgs ?? []) {
    entries.push({
      id: `pkg-${p.slug}`,
      actor: 'Someone',
      action: p.status === 'draft' ? 'saved a draft of' : 'published',
      target: String(p.title),
      at: String(p.updated_at),
    })
  }

  return entries
    .sort((a, b) => new Date(b.at).getTime() - new Date(a.at).getTime())
    .slice(0, limit)
    .map((e) => ({ ...e, at: relativeTime(e.at) }))
})
