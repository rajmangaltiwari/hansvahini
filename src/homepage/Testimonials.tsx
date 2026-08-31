const testimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    location: 'Mumbai',
    rating: 5,
    avatar: 'PS',
    text: 'Hansvahini Expeditions made our Ladakh trip absolutely unforgettable. Every detail was perfectly planned — the accommodations, the itinerary, and especially the local guides. We felt safe and cared for throughout the journey.',
    trip: 'Ladakh Adventure',
    // People trekking / enjoying mountains in Ladakh
    image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=80',
  },
  {
    id: 2,
    name: 'Rahul Mehta',
    location: 'Delhi',
    rating: 5,
    avatar: 'RM',
    text: 'The Spiti Valley trip was beyond my expectations. The team handled everything from permits to meals with such professionalism. The route they chose was scenic and well-paced. Highly recommended for anyone who loves the mountains.',
    trip: 'Spiti Valley Odyssey',
    // Group of friends hiking in snowy mountains
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80',
  },
  {
    id: 3,
    name: 'Ananya Iyer',
    location: 'Bengaluru',
    rating: 5,
    avatar: 'AI',
    text: 'We were a family of five including elderly parents. The team was extremely considerate and made sure everyone was comfortable. The Kedarnath Yatra was spiritually enriching and well-organized. Thank you, Hansvahini!',
    trip: 'Kedarnath Yatra',
    // Family / pilgrims enjoying a mountain spiritual journey
    image: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=800&q=80',
  },
  {
    id: 4,
    name: 'Vikram Singh',
    location: 'Jaipur',
    rating: 5,
    avatar: 'VS',
    text: 'Second time booking with Hansvahini and they never disappoint. The Manali package was excellent value for money. The campfire evenings and the snow activities were the highlights. Will definitely book again!',
    trip: 'Manali Retreat',
    // People around campfire / enjoying snow
    image: 'https://images.unsplash.com/photo-1537905569824-f89f14cceb68?w=800&q=80',
  },
  {
    id: 5,
    name: 'Deepa Nair',
    location: 'Kochi',
    rating: 5,
    avatar: 'DN',
    text: "A solo female traveller here — I felt completely safe with Hansvahini. The guides were knowledgeable, respectful, and fun. Rishikesh was magical and the rafting experience was thrilling. Couldn't have asked for more.",
    trip: 'Rishikesh & Haridwar',
    // People white water rafting / river adventure
    image: 'https://images.unsplash.com/photo-1530866495561-507c9faab2ed?w=800&q=80',
  },
  {
    id: 6,
    name: 'Amit Gupta',
    location: 'Pune',
    rating: 5,
    avatar: 'AG',
    text: 'The Ranthambore Safari was my dream trip and Hansvahini delivered it perfectly. We spotted a tiger on day one! The naturalist guide was exceptional. The resort they arranged was also top-notch.',
    trip: 'Ranthambore Wildlife Safari',
    // People on a jeep safari / wildlife adventure
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80',
  },
]

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <svg
          key={i}
          className="w-4 h-4 text-yellow-400 fill-yellow-400"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section heading */}
        <div className="text-center mb-14">
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">
            What Travellers Say
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Stories from Our Explorers
          </h2>
          <div className="mt-4 w-12 h-0.5 bg-gray-900 mx-auto" />
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-3 gap-4 mb-14 max-w-2xl mx-auto text-center">
          {[
            { value: '5,000+', label: 'Happy Travellers' },
            { value: '150+',   label: 'Destinations' },
            { value: '10+',    label: 'Years Experience' },
          ].map((stat) => (
            <div key={stat.label} className="border border-gray-100 rounded-xl py-5 px-3">
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Testimonial grid — each card has its own background image */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="relative overflow-hidden rounded-2xl min-h-72 flex flex-col justify-end group"
            >
              {/* Card background image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url('${t.image}')` }}
                aria-hidden="true"
              />

              {/* Gray overlay on the card */}
              <div className="absolute inset-0 bg-gray-900/60" aria-hidden="true" />

              {/* Card content */}
              <div className="relative z-10 p-6 flex flex-col gap-3">
                {/* Quote icon */}
                <svg
                  className="w-7 h-7 text-white/40"
                  fill="currentColor"
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                >
                  <path d="M10 8C6.686 8 4 10.686 4 14v10h10V14H7.999C8 11.791 9.791 10 12 10V8h-2zm14 0c-3.314 0-6 2.686-6 6v10h10V14h-6.001C22 11.791 23.791 10 26 10V8h-2z" />
                </svg>

                <p className="text-sm text-gray-100 leading-relaxed">
                  &ldquo;{t.text}&rdquo;
                </p>

                <div>
                  <StarRating count={t.rating} />
                  <p className="text-xs text-gray-400 mt-1">{t.trip}</p>
                </div>

                {/* Author */}
                <div className="flex items-center gap-3 pt-2 border-t border-white/20">
                  <div className="w-9 h-9 rounded-full bg-white text-gray-900 text-xs font-bold flex items-center justify-center flex-shrink-0">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.location}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
