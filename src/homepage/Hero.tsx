import HeroGlobe from './HeroGlobe'

/**
 * A word of the headline, revealed by sliding out from behind its own clip.
 * The mask is a separate element from the moving text so the letters look
 * uncovered rather than flown in. Animation timing lives in globals.css.
 */
function Word({
  children,
  delay,
  className = '',
}: {
  children: string
  /** Seconds, staggered across the headline. */
  delay: number
  className?: string
}) {
  return (
    <span className={`hero-mask ${className}`}>
      <span style={{ animationDelay: `${delay}s` }}>{children}</span>
    </span>
  )
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background image, drifting slowly. Scaling overflows the section, which clips it. */}
      <div
        className="hero-zoom absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero.jpg')" }}
        aria-hidden="true"
      />

      {/* Flat scrim for text contrast, then a vignette to pull the eye inward */}
      <div className="absolute inset-0 bg-black/50" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.55)_100%)]"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

          {/* ── Copy ── */}
          <div className="text-center lg:text-left">
            <p
              className="hero-rise text-sm sm:text-base uppercase tracking-[0.3em] text-gray-200 mb-4 font-light"
              style={{ animationDelay: '0.1s' }}
            >
              Discover · Explore · Experience
            </p>

            <h1 className="text-4xl sm:text-6xl font-bold text-white leading-tight mb-6">
              <Word delay={0.25}>Your</Word>{' '}
              <Word delay={0.34}>Journey,</Word>{' '}
              {/* Grouped so the drawn rule can span exactly the italic phrase */}
              <span className="relative inline-block">
                <Word delay={0.43} className="italic font-light">Our</Word>{' '}
                <Word delay={0.52} className="italic font-light">Passion</Word>
                <span
                  className="hero-rule absolute left-0 right-0 -bottom-1 h-px bg-white/45"
                  style={{ animationDelay: '1.15s' }}
                  aria-hidden="true"
                />
              </span>
            </h1>

            <p
              className="hero-rise text-base sm:text-lg text-gray-200 max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed"
              style={{ animationDelay: '0.75s' }}
            >
              Handcrafted expeditions to India&apos;s most breathtaking
              destinations — from the snow-capped peaks of Ladakh to the sacred
              trails of Kedarnath.
            </p>

            <div
              className="hero-rise flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              style={{ animationDelay: '0.9s' }}
            >
              <a
                href="#packages"
                className="inline-block bg-white text-gray-900 text-sm font-semibold px-8 py-3.5 rounded-full hover:bg-gray-100 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/20 transition-all duration-300"
              >
                Explore Packages
              </a>
              <a
                href="#contact"
                className="inline-block border border-white text-white text-sm font-semibold px-8 py-3.5 rounded-full hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-300"
              >
                Plan My Trip
              </a>
            </div>
          </div>

          {/* ── Globe: its own column from `lg`, where there is room for it.
                 Below that the copy takes the full width and the globe is dropped
                 rather than shrunk into something illegible. ── */}
          <div className="hidden lg:flex justify-center">
            <HeroGlobe />
          </div>
        </div>
      </div>

      {/* Scroll indicator — the line grows down, then retracts from the top */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        {/* hero-rise animates `transform`, so it cannot share an element with the
            centring translate — it would knock it out for the duration. */}
        <div
          className="hero-rise flex flex-col items-center gap-3 text-white/60"
          style={{ animationDelay: '1.4s' }}
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <span className="relative block w-px h-10 bg-white/15 overflow-hidden" aria-hidden="true">
            <span className="hero-scroll absolute inset-0 bg-white/70" />
          </span>
        </div>
      </div>
    </section>
  )
}
