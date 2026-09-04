import Link from 'next/link'

export default function PackagesCta() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-900 rounded-2xl px-6 sm:px-12 py-14 text-center">
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-3">
            None of These Quite Right?
          </p>
          <h2 className="text-2xl sm:text-4xl font-bold text-white max-w-2xl mx-auto leading-tight">
            Every package here started as somebody&apos;s custom request.
          </h2>
          <p className="mt-5 text-sm text-gray-400 max-w-xl mx-auto leading-relaxed">
            Send us the dates, the group and roughly what you want the days to feel like. We will
            come back with a full itinerary and a fixed price — no obligation, no deposit to see it.
          </p>

          <div className="mt-9 flex flex-wrap gap-3 justify-center">
            <Link
              href="#contact"
              className="bg-white text-gray-900 text-sm font-semibold px-8 py-3 rounded-full hover:bg-gray-100 transition-colors"
            >
              Build My Trip
            </Link>
            <Link
              href="/destination"
              className="border border-white/30 text-white text-sm font-semibold px-8 py-3 rounded-full hover:bg-white/10 transition-colors"
            >
              Browse Destinations
            </Link>
          </div>

          <p className="mt-7 text-xs text-gray-500">
            Or call us on{' '}
            <a href="tel:+919876543210" className="text-gray-300 hover:text-white transition-colors">
              +91 98765 43210
            </a>{' '}
            · Mon–Sat, 9 AM – 7 PM
          </p>
        </div>
      </div>
    </section>
  )
}
