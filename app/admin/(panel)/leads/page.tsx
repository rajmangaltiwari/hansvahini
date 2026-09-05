import type { Metadata } from 'next'
import { Download } from 'lucide-react'
import PageHeader from '@/src/admin/ui/PageHeader'
import LeadsTable from '@/src/admin/leads/LeadsTable'

export const metadata: Metadata = { title: 'Leads' }

export default function LeadsPage() {
  return (
    <>
      <PageHeader
        title="Leads"
        subtitle="Every enquiry from the website forms, the pop-up and WhatsApp."
        actions={
          <button className="inline-flex items-center gap-2 bg-white border border-gray-200 text-gray-700 text-sm font-semibold px-4 py-2.5 rounded-lg hover:border-gray-400 hover:text-gray-900 transition-colors">
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        }
      />
      <LeadsTable />
    </>
  )
}
