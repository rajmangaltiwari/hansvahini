const packages = [
  {
    id: 1,
    title: 'Ladakh Adventure',
    image: '/images/ladakh.jpg',
    duration: '8 Days / 7 Nights',
    price: '₹28,999',
    highlights: [
      "Pangong Lake & Nubra Valley",
      "Khardung La Pass (World's Highest Road)",
      'Leh Palace & Monasteries',
    ],
  },
  {
    id: 2,
    title: 'Manali Retreat',
    image: '/images/manali.jpg',
    duration: '6 Days / 5 Nights',
    price: '₹18,499',
    highlights: [
      'Rohtang Pass Snow Experience',
      'Solang Valley Activities',
      'Old Manali & Hadimba Temple',
    ],
  },
  {
    id: 3,
    title: 'Spiti Valley Odyssey',
    image: '/images/spiti.jpg',
    duration: '10 Days / 9 Nights',
    price: '₹32,999',
    highlights: [
      'Key Monastery & Pin Valley',
      'Chandratal Lake Trek',
      'Kibber — Highest Village',
    ],
  },
  {
    id: 4,
    title: 'Kedarnath Yatra',
    image: '/images/kedarnath.jpg',
    duration: '5 Days / 4 Nights',
    price: '₹15,499',
    highlights: [
      'Kedarnath Temple Darshan',
      'Chopta & Tungnath Trek',
      'Gaurikund & Sonprayag',
    ],
  },
  {
    id: 5,
    title: 'Rishikesh & Haridwar',
    image: '/images/rishikesh.jpg',
    duration: '4 Days / 3 Nights',
    price: '₹10,999',
    highlights: [
      'Ganga Aarti at Har Ki Pauri',
      'White Water Rafting',
      'Laxman Jhula & Ashrams',
    ],
  },
  {
    id: 6,
    title: 'Ranthambore Wildlife Safari',
    image: '/images/ranthambore.jpg',
    duration: '3 Days / 2 Nights',
    price: '₹12,999',
    highlights: [
      'Tiger Safari — Zone 1–5',
      'Ranthambore Fort Visit',
      'Bird Watching & Nature Walk',
    ],
  },
]

export default function Packages() {
  return (
    <section id="packages" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="text-center mb-14">
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">
            What We Offer
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Our Popular Packages
          </h2>
          <div className="mt-4 w-12 h-0.5 bg-gray-900 mx-auto" />
        </div>

        {/* Package Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className="group bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-white text-gray-900 text-xs font-bold px-3 py-1 rounded-full shadow">
                  {pkg.price}
                  <span className="font-normal text-gray-500"> /person</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-gray-900">
                    {pkg.title}
                  </h3>
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {pkg.duration}
                  </span>
                </div>

                <ul className="space-y-1.5 mb-6">
                  {pkg.highlights.map((point, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="mt-1 w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className="block text-center w-full border border-gray-900 text-gray-900 text-sm font-semibold py-2.5 rounded-full hover:bg-gray-900 hover:text-white transition-colors"
                >
                  Book Now
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
