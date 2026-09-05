import { enquiryTrend } from '@/src/admin/data/adminData'

/**
 * Enquiry volume by month. Plain CSS bars — no chart library, and the heights
 * are percentages of the busiest month so the tallest bar always fills the plot.
 */
export default function EnquiryChart() {
  const peak = Math.max(...enquiryTrend.map((m) => m.count))
  const total = enquiryTrend.reduce((sum, m) => sum + m.count, 0)

  return (
    <div>
      <div className="flex items-baseline gap-2 mb-5">
        <p className="text-2xl font-bold text-gray-900 tracking-tight">{total.toLocaleString('en-IN')}</p>
        <p className="text-xs text-gray-400">enquiries in the last 12 months</p>
      </div>

      <div className="flex items-end gap-1.5 sm:gap-2 h-44">
        {enquiryTrend.map((month) => (
          <div key={month.month} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
            <span className="text-[10px] font-semibold text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
              {month.count}
            </span>
            <div
              className="w-full rounded-t-md bg-gray-200 group-hover:bg-gray-900 transition-colors"
              style={{ height: `${(month.count / peak) * 100}%` }}
            />
            <span className="text-[10px] text-gray-400">{month.month}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
