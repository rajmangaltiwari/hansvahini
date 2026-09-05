import { TrendingDown, TrendingUp, type LucideIcon } from 'lucide-react'

export default function StatCard({
  label,
  value,
  delta,
  hint,
  icon: Icon,
}: {
  label: string
  value: string
  /** Percent change vs the previous period; negative renders in red. */
  delta?: number
  hint?: string
  icon: LucideIcon
}) {
  const up = (delta ?? 0) >= 0
  const Trend = up ? TrendingUp : TrendingDown

  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5">
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{label}</p>
        <span className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center flex-shrink-0">
          <Icon className="w-[18px] h-[18px] text-gray-500" />
        </span>
      </div>

      <p className="mt-3 text-2xl font-bold text-gray-900 tracking-tight">{value}</p>

      <div className="mt-2 flex items-center gap-2">
        {delta !== undefined && (
          <span
            className={`inline-flex items-center gap-1 text-xs font-semibold ${
              up ? 'text-emerald-600' : 'text-red-500'
            }`}
          >
            <Trend className="w-3.5 h-3.5" />
            {up ? '+' : ''}{delta}%
          </span>
        )}
        {hint && <span className="text-xs text-gray-400 truncate">{hint}</span>}
      </div>
    </div>
  )
}
