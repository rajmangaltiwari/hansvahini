const destinations = [
  {
    id: 1,
    name: 'Ladakh',
    tagline: 'Land of High Passes',
    image: '/images/ladakh.jpg',
    trips: '12 Trips',
  },
  {
    id: 2,
    name: 'Manali',
    tagline: 'Queen of Himachal',
    image: '/images/manali.jpg',
    trips: '9 Trips',
  },
  {
    id: 3,
    name: 'Spiti Valley',
    tagline: 'The Middle Land',
    image: '/images/spiti.jpg',
    trips: '7 Trips',
  },
  {
    id: 4,
    name: 'Kedarnath',
    tagline: 'Abode of Lord Shiva',
    image: '/images/kedarnath.jpg',
    trips: '6 Trips',
  },
  {
    id: 5,
    name: 'Rishikesh',
    tagline: 'Yoga Capital of the World',
    image: '/images/rishikesh.jpg',
    trips: '8 Trips',
  },
  {
    id: 6,
    name: 'Ranthambore',
    tagline: 'Tiger Country',
    image: '/images/ranthambore.jpg',
    trips: '5 Trips',
  },
  {
    id: 7,
    name: 'Varanasi',
    tagline: 'The Eternal City',
    image: '/images/varanasi.jpg',
    trips: '6 Trips',
  },
  {
    id: 8,
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
              <div
                key={dest.id}
                className={`group relative overflow-hidden rounded-2xl cursor-pointer ${
                  isLarge ? 'md:col-span-2' : ''
                }`}
              >
                <div className={`relative ${isLarge ? 'h-72' : 'h-52'} overflow-hidden`}>
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* Text */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p className="text-xs text-gray-300 mb-1">{dest.trips}</p>
                    <h3 className="text-lg font-bold text-white leading-tight">
                      {dest.name}
                    </h3>
                    <p className="text-sm text-gray-300">{dest.tagline}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
