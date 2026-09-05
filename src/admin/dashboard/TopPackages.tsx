import { popularPackages, formatPrice } from '@/src/data/packages'

/** Best-performing trips by review volume, straight from the live site data. */
export default function TopPackages() {
  const top = popularPackages(5)
  const peak = Math.max(...top.map((p) => p.reviews))

  return (
    <ul className="space-y-4">
      {top.map((pkg, i) => (
        <li key={pkg.slug} className="flex items-center gap-3">
          <span className="w-6 text-xs font-semibold text-gray-300 tabular-nums flex-shrink-0">
            {String(i + 1).padStart(2, '0')}
          </span>

          <div className="min-w-0 flex-1">
            <div className="flex items-baseline justify-between gap-3">
              <p className="text-xs font-semibold text-gray-900 truncate">{pkg.title}</p>
              <p className="text-xs text-gray-500 whitespace-nowrap">{formatPrice(pkg.price)}</p>
            </div>
            <div className="mt-1.5 flex items-center gap-2">
              <div className="flex-1 h-1.5 rounded-full bg-gray-100 overflow-hidden">
                <div className="h-full rounded-full bg-gray-900" style={{ width: `${(pkg.reviews / peak) * 100}%` }} />
              </div>
              <span className="text-[10px] text-gray-400 tabular-nums w-16 text-right">{pkg.reviews} reviews</span>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}
