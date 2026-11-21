'use client'

import { useEffect, useMemo, useState, useTransition } from 'react'
import {
  AlertCircle, Calendar, Check, Loader2, Mail, MapPin, MessageCircle, MessageSquarePlus,
  Phone, Search, Trash2, Users, X,
} from 'lucide-react'
import StatusBadge from '@/src/admin/ui/StatusBadge'
import Pagination from '@/src/components/Pagination'
import {
  leadStatuses,
  quickNotes,
  formatDateTime,
  whatsappNumber,
  type Lead,
  type LeadNote,
  type LeadStatus,
} from '@/src/admin/data/adminData'
import { deleteLead, updateLead } from '@/src/server/actions/leads'

/** A lead plus the status-change history added while the panel is open. */
type LeadRow = Lead & { notes: LeadNote[] }

const filters: { id: LeadStatus | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  ...leadStatuses.map((s) => ({ id: s.id, label: s.label })),
]

/** Only used for the optimistic note; the server sends the real timestamp back. */
function stamp(): string {
  return new Date().toLocaleString('en-GB', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function LeadsTable({
  initialLeads,
  initialQuery = '',
}: {
  initialLeads: LeadRow[]
  /** Seeded from ?q= so the topbar search lands on a filtered list. */
  initialQuery?: string
}) {
  // Seeded from the server, then held here so the drawer stays responsive while
  // a save is in flight. The action revalidates, so a refresh shows the truth.
  const [rows, setRows] = useState<LeadRow[]>(initialLeads)
  const [status, setStatus] = useState<LeadStatus | 'all'>('all')
  const [query, setQuery] = useState(initialQuery)
  /** Fifteen rows fills a laptop screen without scrolling past the filters. */
  const PER_PAGE = 15
  const [page, setPage] = useState(1)

  const [saving, startSaving] = useTransition()
  const [saveError, setSaveError] = useState<string | null>(null)
  const [deleting, startDeleting] = useTransition()
  /** Deleting is irreversible, so the button asks once before it does it. */
  const [confirmDelete, setConfirmDelete] = useState(false)

  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [draftStatus, setDraftStatus] = useState<LeadStatus>('new')
  const [draftNote, setDraftNote] = useState('')

  const selected = rows.find((row) => row.id === selectedId) ?? null

  // Hold the page still behind the drawer.
  useEffect(() => {
    if (selectedId === null) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [selectedId])

  // Escape closes the drawer.
  useEffect(() => {
    if (selectedId === null) return
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setSelectedId(null)
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [selectedId])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()

    return rows.filter((lead) => {
      if (status !== 'all' && lead.status !== status) return false
      if (!q) return true
      const haystack = `${lead.name} ${lead.email} ${lead.phone} ${lead.destination} ${lead.message}`
      return haystack.toLowerCase().includes(q)
    })
  }, [rows, status, query])

  // Filtering to a smaller set can strand the reader on a page that no longer
  // exists, so any change resets to the first. Adjusted during render rather
  // than in an effect: an effect would paint the stale page first.
  const filterKey = `${status}|${query}`
  const [lastFilters, setLastFilters] = useState(filterKey)
  if (filterKey !== lastFilters) {
    setLastFilters(filterKey)
    setPage(1)
  }

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE))
  const visible = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  function countFor(id: LeadStatus | 'all') {
    return id === 'all' ? rows.length : rows.filter((row) => row.status === id).length
  }

  /** Opening seeds the draft from the lead, so no effect has to sync it afterwards. */
  function openLead(lead: LeadRow) {
    setSelectedId(lead.id)
    setDraftStatus(lead.status)
    setDraftNote('')
    setConfirmDelete(false)
    setSaveError(null)
  }

  function removeLead() {
    if (!selected || deleting) return

    if (!confirmDelete) {
      setConfirmDelete(true)
      return
    }

    const lead = selected
    const previous = rows

    startDeleting(async () => {
      // Closed and removed up front so the drawer does not sit on a row that
      // is about to vanish; restored in full if the server refuses.
      setSelectedId(null)
      setRows((prev) => prev.filter((row) => row.id !== lead.id))

      const result = await deleteLead(lead.id)
      if (!result.ok) {
        setRows(previous)
        setSelectedId(lead.id)
        setSaveError(result.error ?? 'That enquiry could not be deleted.')
      }
      setConfirmDelete(false)
    })
  }

  const noteText = draftNote.trim()
  const statusChanged = selected ? draftStatus !== selected.status : false
  const canSave = Boolean(selected) && (statusChanged || noteText.length > 0)

  function saveUpdate() {
    if (!selected || !canSave || saving) return

    const lead = selected
    const previous = rows
    const optimistic: LeadNote | null = noteText
      ? { id: Date.now(), status: draftStatus, text: noteText, at: stamp(), by: 'Saving…' }
      : null

    setSaveError(null)
    setRows((prev) =>
      prev.map((row) =>
        row.id === lead.id
          ? {
              ...row,
              status: draftStatus,
              notes: optimistic ? [optimistic, ...row.notes] : row.notes,
            }
          : row
      )
    )
    setDraftNote('')

    startSaving(async () => {
      const result = await updateLead(lead.id, draftStatus, noteText)

      if (!result.ok) {
        // Put the drawer back the way it was rather than leaving a note on
        // screen that never reached the database.
        setRows(previous)
        setDraftNote(noteText)
        setSaveError(result.error ?? 'That did not save.')
      }
    })
  }

  return (
    <>
      {/* Status tabs + search */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-3 mb-4">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {filters.map((filter) => {
            const active = status === filter.id
            return (
              <button
                key={filter.id}
                onClick={() => setStatus(filter.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${active
                    ? 'bg-gray-900 text-white'
                    : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-400 hover:text-gray-900'
                  }`}
              >
                {filter.label}
                <span className={active ? 'text-gray-400' : 'text-gray-300'}>{countFor(filter.id)}</span>
              </button>
            )
          })}
        </div>

        <div className="relative lg:ml-auto lg:w-72">
          <Search className="w-4 h-4 text-gray-300 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name, email or destination…"
            className="w-full bg-white border border-gray-200 rounded-lg pl-9 pr-3 py-2 text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:border-gray-400 transition-colors"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[640px]">
            <thead className="bg-gray-50">
              <tr className="text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wide">
                <th className="px-5 py-3 font-semibold">Enquiry</th>
                <th className="px-5 py-3 font-semibold">Destination</th>
                <th className="px-5 py-3 font-semibold hidden lg:table-cell">Travelling</th>
                <th className="px-5 py-3 font-semibold hidden md:table-cell">Source</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold hidden sm:table-cell">Received</th>
                <th className="px-5 py-3 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {visible.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3.5">
                    <p className="font-medium text-gray-900">{lead.name}</p>
                    <p className="text-xs text-gray-400">{lead.email}</p>
                  </td>
                  <td className="px-5 py-3.5 text-gray-600 whitespace-nowrap">{lead.destination}</td>
                  <td className="px-5 py-3.5 text-gray-600 whitespace-nowrap hidden lg:table-cell">
                    {lead.travelDates} · {lead.travelers} pax
                  </td>
                  <td className="px-5 py-3.5 text-gray-500 text-xs whitespace-nowrap hidden md:table-cell">{lead.source}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1.5">
                      <StatusBadge status={lead.status} />
                      {lead.notes.length > 0 && (
                        <span className="text-[10px] text-gray-400 whitespace-nowrap">{lead.notes.length} note{lead.notes.length > 1 ? 's' : ''}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-gray-400 text-xs whitespace-nowrap hidden sm:table-cell">
                    {formatDateTime(lead.createdAt)}
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <button
                      onClick={() => openLead(lead)}
                      className="text-xs font-semibold text-gray-900 hover:underline whitespace-nowrap"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="px-5 py-14 text-center">
            <p className="text-sm font-medium text-gray-900">No enquiries match that</p>
            <p className="mt-1 text-xs text-gray-400">Try a different status or clear the search.</p>
          </div>
        )}

        {filtered.length > 0 && (
          <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 border-t border-gray-100">
            <p className="text-xs text-gray-400">
              Showing {(page - 1) * PER_PAGE + 1}–{(page - 1) * PER_PAGE + visible.length} of{' '}
              {filtered.length} enquiries
            </p>
            <Pagination page={page} totalPages={totalPages} onChange={setPage} />
          </div>
        )}
      </div>

      {/* Detail drawer */}
      {selected && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <button
            className="absolute inset-0 bg-gray-900/50"
            onClick={() => setSelectedId(null)}
            aria-label="Close enquiry"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`Enquiry from ${selected.name}`}
            className="relative w-full max-w-md bg-white h-full shadow-xl flex flex-col"
          >
            <div className="flex items-start justify-between gap-3 px-5 py-4 border-b border-gray-100 flex-shrink-0">
              <div>
                <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">Enquiry</p>
                <h3 className="text-lg font-bold text-gray-900 tracking-tight">{selected.name}</h3>
              </div>
              <button
                onClick={() => setSelectedId(null)}
                className="p-1.5 -mr-1.5 rounded-lg text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-5 space-y-6">
              <div className="flex items-center gap-2">
                <StatusBadge status={selected.status} />
                <span className="text-xs text-gray-400">via {selected.source} · {formatDateTime(selected.createdAt)}</span>
              </div>

              <dl className="space-y-3">
                {[
                  { icon: Mail, label: 'Email', value: selected.email },
                  { icon: Phone, label: 'Phone', value: selected.phone },
                  { icon: MapPin, label: 'Destination', value: selected.destination },
                  { icon: Calendar, label: 'Travel dates', value: selected.travelDates },
                  { icon: Users, label: 'Travellers', value: selected.travelers },
                ].map((row) => (
                  <div key={row.label} className="flex items-start gap-3">
                    <row.icon className="w-4 h-4 text-gray-300 mt-0.5 flex-shrink-0" />
                    <div className="min-w-0">
                      <dt className="text-[11px] font-medium text-gray-400 uppercase tracking-wide">{row.label}</dt>
                      <dd className="text-sm text-gray-900 break-words">{row.value}</dd>
                    </div>
                  </div>
                ))}
              </dl>

              <div>
                <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wide mb-1.5">Message</p>
                <p className="text-sm text-gray-600 leading-relaxed bg-gray-50 rounded-xl p-4">{selected.message}</p>
              </div>

              {/* ── Status change, with the note that explains it ── */}
              <div className="border border-gray-200 rounded-xl p-4">
                <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wide mb-2">Move to</p>
                <div className="flex flex-wrap gap-1.5">
                  {leadStatuses.map((s) => {
                    const active = draftStatus === s.id
                    return (
                      <button
                        key={s.id}
                        onClick={() => setDraftStatus(s.id)}
                        aria-pressed={active}
                        className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border transition-all ${s.className} ${active ? 'ring-2 ring-gray-900 ring-offset-1' : 'opacity-50 hover:opacity-100'
                          }`}
                      >
                        {s.label}
                      </button>
                    )
                  })}
                </div>

                <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wide mt-4 mb-2">Quick notes</p>
                <div className="flex flex-wrap gap-1.5">
                  {quickNotes[draftStatus].map((note) => (
                    <button
                      key={note}
                      onClick={() => setDraftNote(note)}
                      className="inline-flex items-center gap-1 text-[11px] font-medium text-gray-600 bg-gray-50 border border-gray-200 px-2.5 py-1 rounded-full hover:border-gray-400 hover:text-gray-900 transition-colors text-left"
                    >
                      <MessageSquarePlus className="w-3 h-3 flex-shrink-0 text-gray-300" />
                      {note}
                    </button>
                  ))}
                </div>

                <label htmlFor="lead-note" className="block text-[11px] font-medium text-gray-400 uppercase tracking-wide mt-4 mb-1.5">
                  Note
                </label>
                <textarea
                  id="lead-note"
                  rows={3}
                  value={draftNote}
                  onChange={(e) => setDraftNote(e.target.value)}
                  placeholder="Why the status is changing, what was agreed, what happens next…"
                  className="w-full border border-gray-200 rounded-lg px-3.5 py-2 text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:border-gray-400 transition-colors resize-y leading-relaxed"
                />

                <button
                  onClick={saveUpdate}
                  disabled={!canSave || saving}
                  className="mt-2 w-full flex items-center justify-center gap-2 bg-gray-900 text-white text-sm font-semibold px-4 py-2.5 rounded-lg hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                  {saving
                    ? 'Saving…'
                    : statusChanged
                      ? `Save as ${leadStatuses.find((s) => s.id === draftStatus)!.label}`
                      : 'Save note'}
                </button>

                {saveError && (
                  <p className="mt-2 flex items-start gap-1.5 text-[11px] text-red-600">
                    <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 mt-px" />
                    {saveError}
                  </p>
                )}
              </div>

              {/* History */}
              <div>
                <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wide mb-2">
                  History {selected.notes.length > 0 && <span className="text-gray-300">({selected.notes.length})</span>}
                </p>

                {selected.notes.length === 0 ? (
                  <p className="text-xs text-gray-400">
                    No updates logged yet. Change the status or leave a note above and it will appear here.
                  </p>
                ) : (
                  <ol className="space-y-3">
                    {selected.notes.map((note) => (
                      <li key={note.id} className="border-l-2 border-gray-100 pl-3">
                        <div className="flex items-center gap-2 flex-wrap">
                          <StatusBadge status={note.status} />
                          <span className="text-[11px] text-gray-400">{note.by} · {note.at}</span>
                        </div>
                        {note.text && <p className="mt-1 text-xs text-gray-600 leading-relaxed">{note.text}</p>}
                      </li>
                    ))}
                  </ol>
                )}
              </div>

              {/* Deleting sits at the very bottom, apart from the save controls,
                  so it is never the button you reach for by mistake. */}
              <div className="border-t border-gray-100 pt-4">
                <button
                  onClick={removeLead}
                  disabled={deleting}
                  className={`w-full flex items-center justify-center gap-2 text-sm font-semibold px-4 py-2.5 rounded-lg border transition-colors disabled:opacity-50 ${
                    confirmDelete
                      ? 'bg-red-600 border-red-600 text-white hover:bg-red-700'
                      : 'bg-white border-gray-200 text-red-600 hover:border-red-300 hover:bg-red-50'
                  }`}
                >
                  {deleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                  {deleting
                    ? 'Deleting…'
                    : confirmDelete
                      ? 'Tap again to delete permanently'
                      : 'Delete enquiry'}
                </button>

                {confirmDelete && !deleting && (
                  <button
                    onClick={() => setConfirmDelete(false)}
                    className="mt-2 w-full text-xs font-medium text-gray-500 hover:text-gray-900 transition-colors"
                  >
                    Cancel
                  </button>
                )}

                <p className="mt-2 text-[11px] text-gray-400 text-center">
                  This removes the enquiry and its history for good.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 px-5 py-4 border-t border-gray-100 flex-shrink-0">
              <a
                href={`mailto:${selected.email}?subject=${encodeURIComponent(`Your ${selected.destination} enquiry — Your Travels`)}`}
                className="flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-700 text-sm font-semibold px-4 py-2.5 rounded-lg hover:border-gray-400 hover:text-gray-900 transition-colors"
              >
                <Mail className="w-4 h-4" />
                Reply by email
              </a>
              <a
                href={`https://wa.me/${whatsappNumber(selected.phone)}?text=${encodeURIComponent(
                  `Hi ${selected.name}, this is Your Travels about your ${selected.destination} enquiry.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-emerald-600 text-white text-sm font-semibold px-4 py-2.5 rounded-lg hover:bg-emerald-700 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
