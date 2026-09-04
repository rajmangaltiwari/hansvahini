import type { TravelPackage } from '@/src/data/packages'

/** Ticked two-column list of what the trip covers. */
export default function Highlights({ pkg }: { pkg: TravelPackage }) {
  return (
    <section>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Trip Highlights</h2>
      <div className="w-10 h-0.5 bg-gray-900 mb-6" />
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {pkg.highlights.map((h, i) => (
          <li key={i} className="flex items-start gap-3 bg-gray-50 rounded-xl px-4 py-3">
            <span className="mt-0.5 w-5 h-5 rounded-full bg-gray-900 text-white text-xs flex items-center justify-center flex-shrink-0">✓</span>
            <span className="text-sm text-gray-700">{h}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
