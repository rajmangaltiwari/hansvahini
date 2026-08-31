export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image via CSS */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('/images/hero.jpg')",
        }}
        aria-hidden="true"
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
        <p className="text-sm sm:text-base uppercase tracking-[0.3em] text-gray-200 mb-4 font-light">
          Discover · Explore · Experience
        </p>
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
          Your Journey,{' '}
          <span className="italic font-light">Our Passion</span>
        </h1>
        <p className="text-base sm:text-lg text-gray-200 max-w-xl mx-auto mb-10 leading-relaxed">
          Handcrafted expeditions to India&apos;s most breathtaking
          destinations — from the snow-capped peaks of Ladakh to the sacred
          trails of Kedarnath.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#packages"
            className="inline-block bg-white text-gray-900 text-sm font-semibold px-8 py-3.5 rounded-full hover:bg-gray-100 transition-colors"
          >
            Explore Packages
          </a>
          <a
            href="#contact"
            className="inline-block border border-white text-white text-sm font-semibold px-8 py-3.5 rounded-full hover:bg-white/10 transition-colors"
          >
            Plan My Trip
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-white/40 animate-pulse" />
      </div>
    </section>
  )
}
