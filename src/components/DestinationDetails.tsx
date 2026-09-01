'use client'

import Link from 'next/link'
import { useState } from 'react'
import type { Destination } from '@/src/data/destinations'
import Testimonials from '@/src/homepage/Testimonials'

// ── Lightbox ──────────────────────────────────────────────────────────────────
function Lightbox({
  images,
  startIndex,
  onClose,
}: {
  images: { url: string; caption: string }[]
  startIndex: number
  onClose: () => void
}) {
  const [current, setCurrent] = useState(startIndex)

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white/70 hover:text-white text-sm flex items-center gap-1"
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          Close
        </button>

        <img
          src={images[current].url}
          alt={images[current].caption}
          className="w-full max-h-[75vh] object-contain rounded-xl"
        />
        <p className="text-center text-sm text-gray-300 mt-3">{images[current].caption}</p>

        <button
          onClick={() => setCurrent((c) => (c === 0 ? images.length - 1 : c - 1))}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
          aria-label="Previous"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => setCurrent((c) => (c === images.length - 1 ? 0 : c + 1))}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
          aria-label="Next"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <div className="flex justify-center gap-2 mt-4">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 rounded-full transition-colors ${i === current ? 'bg-white' : 'bg-white/30'}`}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Main component ─────────────────────────────────────────────────────────────
export default function DestinationDetails({ dest }: { dest: Destination }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  return (
    <main className="pt-16">

      {/* ── Hero ── */}
      <section className="relative h-[60vh] min-h-80 flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${dest.heroImage}')` }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" aria-hidden="true" />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <nav className="flex items-center gap-2 text-xs text-gray-300 mb-4" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">{dest.name}</span>
          </nav>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-widest text-gray-300 mb-2">{dest.tagline}</p>
              <h1 className="text-3xl sm:text-5xl font-bold text-white">{dest.name}</h1>
              <div className="flex flex-wrap gap-3 mt-4">
                {[
                  { icon: '🕐', text: dest.duration },
                  { icon: '👥', text: dest.groupSize },
                  { icon: '⛰️', text: dest.difficulty },
                  { icon: '📅', text: dest.bestTime },
                ].map((chip) => (
                  <span key={chip.text} className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full">
                    <span>{chip.icon}</span> {chip.text}
                  </span>
                ))}
              </div>
            </div>
            <div className="text-right">
              <p className="text-gray-300 text-sm">Starting from</p>
              <p className="text-3xl font-bold text-white">{dest.price}</p>
              <p className="text-gray-300 text-xs">per person</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Body ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Left: main content */}
          <div className="lg:col-span-2 space-y-14">

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
              <div className="w-10 h-0.5 bg-gray-900 mb-6" />
              <p className="text-gray-600 leading-relaxed text-base">{dest.overview}</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Trip Highlights</h2>
              <div className="w-10 h-0.5 bg-gray-900 mb-6" />
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {dest.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-3 bg-gray-50 rounded-xl px-4 py-3">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-gray-900 text-white text-xs flex items-center justify-center flex-shrink-0">✓</span>
                    <span className="text-sm text-gray-700">{h}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Day-by-Day Itinerary</h2>
              <div className="w-10 h-0.5 bg-gray-900 mb-6" />
              <div className="space-y-4">
                {dest.itinerary.map((day) => (
                  <div key={day.day} className="flex gap-4">
                    <div className="flex flex-col items-center flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-gray-900 text-white text-sm font-bold flex items-center justify-center">
                        {day.day}
                      </div>
                      {day.day < dest.itinerary.length && (
                        <div className="w-px flex-1 bg-gray-200 mt-2" />
                      )}
                    </div>
                    <div className="pb-6 flex-1">
                      <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">Day {day.day}</p>
                      <h3 className="text-base font-bold text-gray-900 mb-2">{day.title}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{day.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Activities</h2>
              <div className="w-10 h-0.5 bg-gray-900 mb-6" />
              <div className="flex flex-wrap gap-3">
                {dest.activities.map((act) => (
                  <span key={act} className="border border-gray-200 text-gray-700 text-sm px-4 py-2 rounded-full hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-colors cursor-default">
                    {act}
                  </span>
                ))}
              </div>
            </section>
          </div>

          {/* Right: sticky sidebar */}
          <aside>
            <div className="sticky top-24 space-y-6">
              <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
                <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">Book This Trip</p>
                <p className="text-3xl font-bold text-gray-900 mb-1">{dest.price}</p>
                <p className="text-xs text-gray-400 mb-6">per person · {dest.duration}</p>
                <Link href="/#contact" className="block w-full text-center bg-gray-900 text-white text-sm font-semibold py-3.5 rounded-full hover:bg-gray-700 transition-colors">
                  Enquire Now
                </Link>
                <Link href="/#contact" className="block w-full text-center border border-gray-900 text-gray-900 text-sm font-semibold py-3 rounded-full hover:bg-gray-100 transition-colors mt-3">
                  Get a Custom Quote
                </Link>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4">What&apos;s Included</h3>
                <ul className="space-y-2">
                  {dest.included.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="text-green-600 font-bold flex-shrink-0">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4">Not Included</h3>
                <ul className="space-y-2">
                  {dest.excluded.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="text-gray-400 font-bold flex-shrink-0">✗</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-900 rounded-2xl p-6 text-white">
                <h3 className="text-sm font-bold mb-2">Need Help Planning?</h3>
                <p className="text-xs text-gray-400 leading-relaxed mb-4">Our travel experts are available Mon–Sat, 9 AM – 7 PM.</p>
                <a href="tel:+919876543210" className="block text-center bg-white text-gray-900 text-sm font-semibold py-2.5 rounded-full hover:bg-gray-100 transition-colors">
                  📞 Call Us Now
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* ── Gallery ── */}
      {dest.gallery && dest.gallery.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">Visual Journey</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                Scenery &amp; Moments
              </h2>
              <div className="mt-4 w-12 h-0.5 bg-gray-900 mx-auto" />
            </div>

            {/*
              Bento grid layout for 6 images:
              Row 1: [tall left — rows 1+2] [top-right] [mid-right]
              Row 2: [bottom-left] [bottom-mid] [tall right — rows 1+2]
              Using CSS grid with explicit row/col spans via inline style on a named grid
            */}
            <div
              className="grid gap-3 sm:gap-4"
              style={{
                gridTemplateColumns: '2fr 1fr 1fr',
                gridTemplateRows: '240px 240px',
              }}
            >
              {dest.gallery.map((img, i) => {
                // Bento 3×2: col 1 is wider and spans both rows (tall hero)
                // cols 2 & 3 each get 2 normal-height cells
                const style: React.CSSProperties =
                  i === 0
                    ? { gridColumn: '1', gridRow: '1 / 3' }  // tall hero left
                    : i === 1
                    ? { gridColumn: '2', gridRow: '1' }      // top center
                    : i === 2
                    ? { gridColumn: '3', gridRow: '1' }      // top right
                    : i === 3
                    ? { gridColumn: '2', gridRow: '2' }      // bottom center
                    : i === 4
                    ? { gridColumn: '3', gridRow: '2' }      // bottom right
                    : { display: 'none' }                    // hide any 7th+ images

                return (
                  <button
                    key={i}
                    onClick={() => setLightboxIndex(i)}
                    className="group relative overflow-hidden rounded-2xl w-full h-full text-left"
                    style={style}
                    aria-label={`View photo: ${img.caption}`}
                  >
                    <img
                      src={img.url}
                      alt={img.caption}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* dark overlay + caption on hover */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/45 transition-colors duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-xs text-white font-medium">{img.caption}</p>
                    </div>
                    {/* view icon */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="bg-white/90 text-gray-900 text-xs font-semibold px-3 py-1.5 rounded-full shadow">
                        View
                      </span>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── Testimonials — imported directly from homepage component ── */}
      <Testimonials />

      {/* ── Back link ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <Link href="/#packages" className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Packages
        </Link>
      </div>

      {/* ── Lightbox ── */}
      {lightboxIndex !== null && dest.gallery && (
        <Lightbox
          images={dest.gallery}
          startIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </main>
  )
}
