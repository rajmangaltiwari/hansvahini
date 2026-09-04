import type { TravelPackage } from '@/src/data/packages'

/** Numbered day-by-day timeline with a connecting rail. */
export default function Itinerary({ pkg }: { pkg: TravelPackage }) {
  return (
    <section>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Day-by-Day Itinerary</h2>
      <div className="w-10 h-0.5 bg-gray-900 mb-6" />
      <div className="space-y-4">
        {pkg.itinerary.map((day) => (
          <div key={day.day} className="flex gap-4">
            <div className="flex flex-col items-center flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-gray-900 text-white text-sm font-bold flex items-center justify-center">
                {day.day}
              </div>
              {/* Rail stops after the last day */}
              {day.day < pkg.itinerary.length && (
                <div className="w-px flex-1 bg-gray-200 mt-2" />
              )}
            </div>
            <div className="pb-6 flex-1">
              <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">Day {day.day}</p>
              <h3 className="text-base font-bold text-gray-900 mb-2">{day.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{day.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
