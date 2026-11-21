'use client'

import { useState } from 'react'
import { Check, Download } from 'lucide-react'
import { formatDateTime, type Lead } from '@/src/admin/data/adminData'

/**
 * Downloads every enquiry as a CSV, built in the browser from the rows the
 * server already sent — no extra round trip and no export endpoint to secure.
 */

const columns: { header: string; value: (lead: Lead) => string }[] = [
  { header: 'Received',    value: (l) => formatDateTime(l.createdAt) },
  { header: 'Name',        value: (l) => l.name },
  { header: 'Email',       value: (l) => l.email },
  { header: 'Phone',       value: (l) => l.phone },
  { header: 'Destination', value: (l) => l.destination },
  { header: 'Travel date', value: (l) => l.travelDates },
  { header: 'Travellers',  value: (l) => l.travelers },
  { header: 'Source',      value: (l) => l.source },
  { header: 'Status',      value: (l) => l.status },
  { header: 'Message',     value: (l) => l.message },
]

/**
 * A field is quoted whenever it holds a comma, quote or newline — an enquiry
 * message routinely holds all three, and an unescaped one would shift every
 * later column on that row. Inner quotes double per RFC 4180.
 */
function csvCell(value: string): string {
  const text = value ?? ''
  return /[",\n\r]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text
}

function toCsv(leads: Lead[]): string {
  const rows = [
    columns.map((c) => c.header),
    ...leads.map((lead) => columns.map((c) => csvCell(c.value(lead)))),
  ]
  // CRLF and a BOM so Excel opens it as UTF-8 rather than mangling the ₹ and
  // the en-dashes in "3–5".
  return '﻿' + rows.map((r) => r.join(',')).join('\r\n')
}

export default function ExportLeadsButton({ leads }: { leads: Lead[] }) {
  const [done, setDone] = useState(false)

  function download() {
    const blob = new Blob([toCsv(leads)], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = url
    link.download = `yourtravels-leads-${new Date().toISOString().slice(0, 10)}.csv`
    document.body.appendChild(link)
    link.click()
    link.remove()

    // Freed on the next tick — revoking synchronously can cancel the download.
    setTimeout(() => URL.revokeObjectURL(url), 1000)

    setDone(true)
    setTimeout(() => setDone(false), 2000)
  }

  return (
    <button
      type="button"
      onClick={download}
      disabled={leads.length === 0}
      className="inline-flex items-center gap-2 bg-white border border-gray-200 text-gray-700 text-sm font-semibold px-4 py-2.5 rounded-lg hover:border-gray-400 hover:text-gray-900 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      title={leads.length === 0 ? 'No enquiries to export yet' : `Export all ${leads.length} enquiries`}
    >
      {done ? <Check className="w-4 h-4 text-green-600" /> : <Download className="w-4 h-4" />}
      {done ? 'Downloaded' : 'Export CSV'}
    </button>
  )
}
