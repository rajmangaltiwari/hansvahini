import { Clock } from 'lucide-react'
import type { Destination } from '@/src/data/destinations'

/** Grid of named places — temples, lakes, passes, beaches — inside the destination. */
export default function PopularPlaces({ dest }: { dest: Destination }) {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">Must-See</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Popular Places in {dest.name}
          </h2>
          <div className="mt-4 w-12 h-0.5 bg-gray-900 mx-auto" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {dest.attractions.map((place) => (
            <article
              key={place.name}
              className="group bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Fixed-height frame + absolute image: the photo can never drive layout */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={place.image}
                  alt={place.name}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 bg-gray-900 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow">
                  {place.category}
                </span>
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="text-base font-bold text-gray-900 leading-snug">{place.name}</h3>
                  <span className="inline-flex items-center gap-1 text-[11px] text-gray-500 flex-shrink-0 mt-0.5">
                    <Clock className="w-3 h-3" /> {place.timeNeeded}
                  </span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{place.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
