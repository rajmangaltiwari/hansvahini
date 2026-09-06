import type { Metadata } from 'next'
import PageHeader from '@/src/admin/ui/PageHeader'
import LeadsTable from '@/src/admin/leads/LeadsTable'
import ExportLeadsButton from '@/src/admin/leads/ExportLeadsButton'
import { listLeads } from '@/src/lib/queries/leads'

export const metadata: Metadata = { title: 'Leads' }

export default async function LeadsPage(props: PageProps<'/admin/leads'>) {
  const { q } = await props.searchParams
  const initialQuery = Array.isArray(q) ? q[0] : (q ?? '')

  const leads = await listLeads()

  return (
    <>
      <PageHeader
        title="Leads"
        subtitle="Every enquiry from the website forms, the pop-up and WhatsApp."
        actions={<ExportLeadsButton leads={leads} />}
      />
      <LeadsTable initialLeads={leads} initialQuery={initialQuery} />
    </>
  )
}
