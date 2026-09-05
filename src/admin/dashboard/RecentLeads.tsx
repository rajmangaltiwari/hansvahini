import Link from 'next/link'
import { leads, formatDate } from '@/src/admin/data/adminData'
import StatusBadge from '@/src/admin/ui/StatusBadge'

/** The five newest enquiries. The full list lives at /admin/leads. */
export default function RecentLeads() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wide">
            <th className="px-5 py-2.5 font-semibold">Enquiry</th>
            <th className="px-5 py-2.5 font-semibold hidden sm:table-cell">Destination</th>
            <th className="px-5 py-2.5 font-semibold">Status</th>
            <th className="px-5 py-2.5 font-semibold hidden md:table-cell">Received</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {leads.slice(0, 5).map((lead) => (
            <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-5 py-3">
                <p className="font-medium text-gray-900">{lead.name}</p>
                <p className="text-xs text-gray-400 truncate max-w-[200px]">{lead.email}</p>
              </td>
              <td className="px-5 py-3 text-gray-600 hidden sm:table-cell">{lead.destination}</td>
              <td className="px-5 py-3"><StatusBadge status={lead.status} /></td>
              <td className="px-5 py-3 text-gray-400 text-xs whitespace-nowrap hidden md:table-cell">
                {formatDate(lead.createdAt)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="px-5 py-3 border-t border-gray-100">
        <Link href="/admin/leads" className="text-xs font-semibold text-gray-900 hover:underline">
          View all {leads.length} enquiries →
        </Link>
      </div>
    </div>
  )
}
