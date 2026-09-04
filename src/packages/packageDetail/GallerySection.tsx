import type { GalleryImage } from '@/src/data/destinations'
import Gallery from '@/src/components/Gallery'

/** Section wrapper around the shared bento photo grid. */
export default function GallerySection({ images }: { images: GalleryImage[] }) {
  if (images.length === 0) return null

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">Visual Journey</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Scenery &amp; Moments</h2>
          <div className="mt-4 w-12 h-0.5 bg-gray-900 mx-auto" />
        </div>

        <Gallery images={images} />
      </div>
    </section>
  )
}
