import type { Destination } from '@/src/data/destinations'
import { packagesForDestination } from '@/src/data/packages'

/** Sticky sidebar rail that sits beside the Overview section. */
export default function QuickFacts({ dest }: { dest: Destination }) {
  const packageCount = packagesForDestination(dest.slug).length

  const facts = [
    { label: 'Region',           value: dest.region },
    { label: 'Best Season',      value: dest.bestTime },
    { label: 'Difficulty',       value: dest.difficulty },
    { label: 'Trips We Run',     value: `${packageCount} packages` },
    { label: 'Traveller Rating', value: `${dest.rating} / 5` },
  ]

  return (
    <aside>
      <div className="sticky top-24 space-y-6">
        <div className="bg-gray-50 rounded-2xl p-6">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-5">
            Quick Facts
          </h3>
          <dl className="space-y-4">
            {facts.map((row) => (
              <div key={row.label} className="flex items-start justify-between gap-4">
                <dt className="text-xs uppercase tracking-widest text-gray-400">{row.label}</dt>
                <dd className="text-sm font-semibold text-gray-900 text-right">{row.value}</dd>
              </div>
            ))}
          </dl>
          <div className="flex flex-wrap gap-2 mt-6 pt-5 border-t border-gray-200">
            {dest.experiences.map((exp) => (
              <span key={exp} className="border border-gray-300 text-gray-600 text-[11px] px-2.5 py-1 rounded-full">
                {exp}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-gray-900 rounded-2xl p-6 text-white">
          <h3 className="text-sm font-bold mb-2">Planning a trip here?</h3>
          <p className="text-xs text-gray-400 leading-relaxed mb-4">
            Our team has run this route dozens of times. Tell us your dates and we will build it
            around you.
          </p>
          <a href="#contact" className="block text-center bg-white text-gray-900 text-sm font-semibold py-2.5 rounded-full hover:bg-gray-100 transition-colors">
            Plan My Trip
          </a>
        </div>
      </div>
    </aside>
  )
}
