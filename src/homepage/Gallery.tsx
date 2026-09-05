'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Camera, Expand } from 'lucide-react'
import Lightbox from '@/src/components/Lightbox'
import { destinations, type GalleryImage } from '@/src/data/destinations'

/** A gallery photo that remembers which destination it came from. */
type Shot = GalleryImage & { place: string; slug: string }

/**
 * Deterministic PRNG (mulberry32). A plain Math.random() shuffle would order the
 * photos differently on the server and on the client, which React reports as a
 * hydration mismatch — a fixed seed gives a shuffled-looking strip that both
 * renders agree on.
 */
function seededRandom(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function shuffle<T>(items: T[], seed: number): T[] {
  const random = seededRandom(seed)
  const out = [...items]
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1))
      ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

// Every photo across every destination guide, mixed so the rows are not grouped by place.
const everyShot: Shot[] = destinations.flatMap((dest) =>
  dest.gallery.map((image) => ({ ...image, place: dest.name, slug: dest.slug }))
)

// 24 is enough to read as endless once each row is duplicated, without shipping 96 images.
const shots = shuffle(everyShot, 20260905).slice(0, 24)
const rows = [shots.slice(0, 12), shots.slice(12)]

export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  return (
    <section id="gallery" className="py-20 bg-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-gray-400 mb-2">
            <Camera className="w-3.5 h-3.5" />
            From The Road
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Moments From Our Trips</h2>
          <div className="mt-4 w-12 h-0.5 bg-white mx-auto" />
          <p className="mt-5 text-sm text-gray-400 max-w-xl mx-auto leading-relaxed">
            Photographs from {destinations.length} destinations — taken on the trips we run, not
            bought from a stock library. Tap any of them to look properly.
          </p>
        </div>
      </div>

      {/* Two rows drifting in opposite directions, edge to edge past the container */}
      <div className="relative space-y-4">
        {rows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="marquee-row group flex overflow-hidden motion-reduce:overflow-x-auto"
          >
            {/* The track is rendered twice so the loop point is invisible; aria-hidden on
                the copy keeps every photo announced exactly once. */}
            {[0, 1].map((copy) => (
              <ul
                key={copy}
                aria-hidden={copy === 1 ? true : undefined}
                className={`flex shrink-0 gap-4 pr-4 ${rowIndex === 0 ? 'animate-marquee-left' : 'animate-marquee-right'
                  }`}
              >
                {row.map((shot, i) => {
                  // Index into `shots` so the lightbox opens on the photo that was clicked.
                  const index = rowIndex * 12 + i

                  return (
                    <li key={`${copy}-${shot.url}-${i}`}>
                      <button
                        onClick={() => setLightboxIndex(index)}
                        tabIndex={copy === 1 ? -1 : undefined}
                        aria-label={`View photo: ${shot.caption}`}
                        className="group/tile relative block w-64 sm:w-72 aspect-[4/3] rounded-2xl overflow-hidden bg-gray-800"
                      >
                        <img
                          src={shot.url}
                          alt={shot.caption}
                          loading="lazy"
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover/tile:scale-105"
                        />
                        <span className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-70 group-hover/tile:opacity-100 transition-opacity" />

                        <span className="absolute inset-x-0 bottom-0 p-4 text-left">
                          <span className="block text-[11px] uppercase tracking-widest text-gray-300">
                            {shot.place}
                          </span>
                          <span className="block text-sm font-medium text-white leading-snug truncate">
                            {shot.caption}
                          </span>
                        </span>

                        <span className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover/tile:opacity-100 transition-opacity">
                          <Expand className="w-3.5 h-3.5 text-gray-900" />
                        </span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            ))}
          </div>
        ))}

        {/* Edge fades, so the rows dissolve rather than getting cut off */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-gray-900 to-transparent" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-gray-900 to-transparent" aria-hidden="true" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mt-14">
          <Link
            href="/destination"
            className="inline-flex items-center gap-2 bg-white text-gray-900 text-sm font-semibold px-8 py-3 rounded-full hover:bg-gray-100 transition-colors"
          >
            Explore Destination
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {lightboxIndex !== null && (
        <Lightbox images={shots} startIndex={lightboxIndex} onClose={() => setLightboxIndex(null)} />
      )}
    </section>
  )
}
