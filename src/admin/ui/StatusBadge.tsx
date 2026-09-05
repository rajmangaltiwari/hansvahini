import { leadStatuses, type LeadStatus } from '@/src/admin/data/adminData'

export default function StatusBadge({ status }: { status: LeadStatus }) {
  const meta = leadStatuses.find((s) => s.id === status)!

  return (
    <span className={`inline-flex items-center text-[11px] font-semibold px-2 py-0.5 rounded-full border ${meta.className}`}>
      {meta.label}
    </span>
  )
}
