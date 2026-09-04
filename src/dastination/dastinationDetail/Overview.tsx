import type { Destination } from '@/src/data/destinations'
import QuickFacts from './QuickFacts'

/** "About {place}" plus the Known For list, with the Quick Facts rail alongside. */
export default function Overview({ dest }: { dest: Destination }) {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">About {dest.name}</h2>
            <div className="w-10 h-0.5 bg-gray-900 mb-6" />
            <p className="text-gray-600 leading-relaxed">{dest.overview}</p>

            <h3 className="text-lg font-bold text-gray-900 mt-10 mb-5">Known For</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {dest.highlights.map((h) => (
                <li key={h} className="flex items-start gap-3 bg-gray-50 rounded-xl px-4 py-3">
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-gray-900 text-white text-xs flex items-center justify-center flex-shrink-0">✓</span>
                  <span className="text-sm text-gray-700">{h}</span>
                </li>
              ))}
            </ul>
          </div>

          <QuickFacts dest={dest} />
        </div>
      </div>
    </section>
  )
}
