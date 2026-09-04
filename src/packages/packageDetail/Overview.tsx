import type { TravelPackage } from '@/src/data/packages'

/** Long-form intro to the trip. */
export default function Overview({ pkg }: { pkg: TravelPackage }) {
  return (
    <section>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
      <div className="w-10 h-0.5 bg-gray-900 mb-6" />
      <p className="text-gray-600 leading-relaxed text-base">{pkg.overview}</p>
    </section>
  )
}
