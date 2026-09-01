import Link from 'next/link'

const destinations = [
  {
    id: 1,
    slug: 'ladakh',
    name: 'Ladakh',
    tagline: 'Land of High Passes',
    image: '/images/ladakh.jpg',
    trips: '12 Trips',
  },
  {
    id: 2,
    slug: 'manali',
    name: 'Manali',
    tagline: 'Queen of Himachal',
    image: '/images/manali.jpg',
    trips: '9 Trips',
  },
  {
    id: 3,
    slug: 'spiti',
    name: 'Spiti Valley',
    tagline: 'The Middle Land',
    image: '/images/spiti.jpg',
    trips: '7 Trips',
  },
  {
    id: 4,
    slug: 'kedarnath',
    name: 'Kedarnath',
    tagline: 'Abode of Lord Shiva',
    image: '/images/kedarnath.jpg',
    trips: '6 Trips',
  },
  {
    id: 5,
    slug: 'rishikesh',
    name: 'Rishikesh',
    tagline: 'Yoga Capital of the World',
    image: '/images/rishikesh.jpg',
    trips: '8 Trips',
  },
  {
    id: 6,
    slug: 'ranthambore',
    name: 'Ranthambore',
    tagline: 'Tiger Country',
    image: '/images/ranthambore.jpg',
    trips: '5 Trips',
  },
  {
    id: 7,
    slug: 'varanasi',
    name: 'Varanasi',
    tagline: 'The Eternal City',
    image: '/images/varanasi.jpg',
    trips: '6 Trips',
  },
  {
    id: 8,
    slug: 'andaman',
    name: 'Andaman Islands',
    tagline: 'Jewels of the Bay',
    image: '/images/andaman.jpg',
    trips: '4 Trips',
  },
]

export default function Destinations() {
  return (
    <section id="destinations" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="text-center mb-14">
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">
            Where We Go
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Popular Destinations
          </h2>
          <div className="mt-4 w-12 h-0.5 bg-gray-900 mx-auto" />
        </div>

        {/* Destinations grid — asymmetric layout */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {destinations.map((dest, index) => {
            const isLarge = index === 0 || index === 3
            return (
              <Link
                key={dest.id}
                href={`/destination/${dest.slug}`}
                className={`group relative overflow-hidden rounded-2xl cursor-pointer ${
                  isLarge ? 'md:col-span-2' : ''
                }`}
              >
                <div className={`relative ${isLarge ? 'h-72' : 'h-72'} overflow-hidden`}>
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* Explore badge on hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="bg-white text-gray-900 text-xs font-semibold px-4 py-2 rounded-full shadow-lg">
                      Explore →
                    </span>
                  </div>

                  {/* Text */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p className="text-xs text-gray-300 mb-1">{dest.trips}</p>
                    <h3 className="text-lg font-bold text-white leading-tight">
                      {dest.name}
                    </h3>
                    <p className="text-sm text-gray-300">{dest.tagline}</p>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
