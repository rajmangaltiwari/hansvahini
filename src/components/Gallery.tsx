'use client'

import { useState } from 'react'
import Lightbox from './Lightbox'
import type { GalleryImage } from '@/src/data/destinations'

/**
 * Bento photo grid shared by the destination and package detail pages.
 *
 * Height is owned entirely by the grid's row tracks (`auto-rows-*`), and every
 * <img> is absolutely positioned inside its tile. That combination means an
 * image's intrinsic size can never leak into layout, so a tall source photo
 * cannot stretch a tile. Do not put `h-full` on a tile whose row track is auto —
 * that is a circular percentage height and the image will blow the row open.
 */
export default function Gallery({ images }: { images: GalleryImage[] }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  if (images.length === 0) return null

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 auto-rows-[160px] sm:auto-rows-[190px] lg:auto-rows-[210px]">
        {images.map((image, i) => (
          <button
            key={`${image.url}-${i}`}
            onClick={() => setLightboxIndex(i)}
            /* The first tile takes a 2×2 block from `sm` up; the rest are 1×1. */
            className={`group relative overflow-hidden rounded-2xl text-left ${
              i === 0 ? 'sm:col-span-2 sm:row-span-2' : ''
            }`}
            aria-label={`View photo: ${image.caption}`}
          >
            <img
              src={image.url}
              alt={image.caption}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/45 transition-colors duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <p className="text-xs text-white font-medium">{image.caption}</p>
            </div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="bg-white/90 text-gray-900 text-xs font-semibold px-3 py-1.5 rounded-full shadow">
                View
              </span>
            </div>
          </button>
        ))}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          startIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </>
  )
}
