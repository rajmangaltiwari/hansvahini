'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  Calendar, Check, Mail, MapPin, MessageCircle, MessageSquarePlus, Phone, Search, Users, X,
} from 'lucide-react'
import StatusBadge from '@/src/admin/ui/StatusBadge'
import {
  leads,
  leadStatuses,
  quickNotes,
  formatDate,
  whatsappNumber,
  type Lead,
  type LeadNote,
  type LeadStatus,
} from '@/src/admin/data/adminData'

/** A lead plus the status-change history added while the panel is open. */
type LeadRow = Lead & { notes: LeadNote[] }

const filters: { id: LeadStatus | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  ...leadStatuses.map((s) => ({ id: s.id, label: s.label })),
]

/** Notes are session-only, so a wall-clock stamp is honest enough. */
function stamp(): string {
  return new Date().toLocaleString('en-GB', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function LeadsTable() {
  // Seeded from the dummy data, then owned here so status changes stick while you work.
  const [rows, setRows] = useState<LeadRow[]>(() => leads.map((lead) => ({ ...lead, notes: [] })))
  const [status, setStatus] = useState<LeadStatus | 'all'>('all')
  const [query, setQuery] = useState('')

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
      const haystack = `${lead.name} ${lead.email} ${lead.phone} ${lead.destination} ${lead.message} #${lead.id}`
      return haystack.toLowerCase().includes(q)
    })
  }, [rows, status, query])

  function countFor(id: LeadStatus | 'all') {
    return id === 'all' ? rows.length : rows.filter((row) => row.status === id).length
  }

  /** Opening seeds the draft from the lead, so no effect has to sync it afterwards. */
  function openLead(lead: LeadRow) {
    setSelectedId(lead.id)
    setDraftStatus(lead.status)
    setDraftNote('')
  }

  const noteText = draftNote.trim()
  const statusChanged = selected ? draftStatus !== selected.status : false
  const canSave = Boolean(selected) && (statusChanged || noteText.length > 0)

  function saveUpdate() {
    if (!selected || !canSave) return

    const note: LeadNote = {
      id: Date.now(),
      status: draftStatus,
      text: noteText,
      at: stamp(),
      by: 'Raj Mangal',
    }

    setRows((prev) =>
      prev.map((row) =>
        row.id === selected.id
          ? { ...row, status: draftStatus, notes: [note, ...row.notes] }
          : row
      )
    )
    setDraftNote('')
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
              {filtered.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3.5">
                    <p className="font-medium text-gray-900">{lead.name}</p>
                    <p className="text-xs text-gray-400">#{lead.id} · {lead.email}</p>
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
                    {formatDate(lead.createdAt)}
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
          <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100">
            <p className="text-xs text-gray-400">Showing {filtered.length} of {rows.length} enquiries</p>
            <div className="flex items-center gap-1">
              <button disabled className="px-2.5 py-1 text-xs font-medium text-gray-300 rounded-md">Previous</button>
              <span className="px-2.5 py-1 text-xs font-semibold text-white bg-gray-900 rounded-md">1</span>
              <button disabled className="px-2.5 py-1 text-xs font-medium text-gray-300 rounded-md">Next</button>
            </div>
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
                <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">Enquiry #{selected.id}</p>
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
                <span className="text-xs text-gray-400">via {selected.source} · {formatDate(selected.createdAt)}</span>
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
                  disabled={!canSave}
                  className="mt-2 w-full flex items-center justify-center gap-2 bg-gray-900 text-white text-sm font-semibold px-4 py-2.5 rounded-lg hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <Check className="w-4 h-4" />
                  {statusChanged
                    ? `Save as ${leadStatuses.find((s) => s.id === draftStatus)!.label}`
                    : 'Save note'}
                </button>
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
            </div>

            <div className="grid grid-cols-2 gap-2 px-5 py-4 border-t border-gray-100 flex-shrink-0">
              <a
                href={`mailto:${selected.email}?subject=${encodeURIComponent(`Your ${selected.destination} enquiry — Hansvahini Expeditions`)}`}
                className="flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-700 text-sm font-semibold px-4 py-2.5 rounded-lg hover:border-gray-400 hover:text-gray-900 transition-colors"
              >
                <Mail className="w-4 h-4" />
                Reply by email
              </a>
              <a
                href={`https://wa.me/${whatsappNumber(selected.phone)}?text=${encodeURIComponent(
                  `Hi ${selected.name}, this is Hansvahini Expeditions about your ${selected.destination} enquiry.`
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
