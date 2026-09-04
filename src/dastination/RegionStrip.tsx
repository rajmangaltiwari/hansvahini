import { destinations, regions, countByRegion } from '@/src/data/destinations'

// One representative image per region, taken from the first destination in it.
function regionImage(region: string): string {
  return destinations.find((d) => d.region === region)?.image ?? '/images/hero.jpg'
}

export default function RegionStrip() {
  const realRegions = regions.filter((r) => r !== 'All')

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">By Geography</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Explore by Region</h2>
          <div className="mt-4 w-12 h-0.5 bg-gray-900 mx-auto" />
          <p className="mt-5 text-sm text-gray-500 max-w-xl mx-auto leading-relaxed">
            Six regions, each with its own season, altitude curve and permit rules. Pick the one
            that fits the time of year you can actually travel.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {realRegions.map((region) => (
            <a
              key={region}
              href="#explore"
              className="group relative h-40 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <img
                src={regionImage(region)}
                alt={region}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20 group-hover:from-black/85 transition-colors" />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <p className="text-sm font-bold text-white leading-tight">{region}</p>
                <p className="text-[11px] text-gray-300 mt-0.5">
                  {countByRegion(region)}{' '}
                  {countByRegion(region) === 1 ? 'destination' : 'destinations'}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
