import Link from 'next/link'
import { formatPrice, fromPrice } from '@/src/data/packages'
import { destinations } from '@/src/data/destinations'

export default function DestinationComparison() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">At a Glance</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Compare Every Destination</h2>
          <div className="mt-4 w-12 h-0.5 bg-gray-900 mx-auto" />
          <p className="mt-5 text-sm text-gray-500 max-w-xl mx-auto leading-relaxed">
            Season, difficulty and starting cost side by side — the fastest way to narrow eight
            options down to two.
          </p>
        </div>

        {/* Table scrolls horizontally on small screens rather than breaking the page */}
        <div className="overflow-x-auto border border-gray-100 rounded-2xl shadow-sm">
          <table className="w-full min-w-[760px] text-left">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                {['Destination', 'Region', 'Packages', 'Best Season', 'Difficulty', 'From', ''].map(
                  (heading) => (
                    <th
                      key={heading}
                      className="px-5 py-4 text-[11px] uppercase tracking-widest text-gray-400 font-semibold whitespace-nowrap"
                    >
                      {heading}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {destinations.map((dest) => (
                <tr
                  key={dest.slug}
                  className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={dest.image}
                        alt=""
                        className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                      />
                      <div>
                        <p className="text-sm font-semibold text-gray-900 whitespace-nowrap">
                          {dest.name}
                        </p>
                        <p className="text-[11px] text-gray-400">{dest.tagline}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-600 whitespace-nowrap">{dest.region}</td>
                  <td className="px-5 py-4 text-sm text-gray-600 whitespace-nowrap">{dest.tripCount} trips</td>
                  <td className="px-5 py-4 text-sm text-gray-600 whitespace-nowrap">{dest.bestTime}</td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <span className="border border-gray-200 text-gray-600 text-[11px] px-2.5 py-1 rounded-full">
                      {dest.difficulty}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm font-bold text-gray-900 whitespace-nowrap">
                    {formatPrice(fromPrice(dest.slug))}
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <Link
                      href={`/destination/${dest.slug}`}
                      className="text-sm font-semibold text-gray-900 hover:text-gray-500 transition-colors"
                    >
                      View →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
