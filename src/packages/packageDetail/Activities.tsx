import type { TravelPackage } from '@/src/data/packages'

/** Pill list of what you actually do on the trip. */
export default function Activities({ pkg }: { pkg: TravelPackage }) {
  return (
    <section>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Activities</h2>
      <div className="w-10 h-0.5 bg-gray-900 mb-6" />
      <div className="flex flex-wrap gap-3">
        {pkg.activities.map((act) => (
          <span
            key={act}
            className="border border-gray-200 text-gray-700 text-sm px-4 py-2 rounded-full hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-colors cursor-default"
          >
            {act}
          </span>
        ))}
      </div>
    </section>
  )
}
