import type { Metadata } from 'next'
import PageHeader from '@/src/admin/ui/PageHeader'
import GalleryManager from '@/src/admin/gallery/GalleryManager'
import { listDestinations } from '@/src/lib/queries/destinations'
import { listGallery } from '@/src/lib/queries/gallery'

export const metadata: Metadata = { title: 'Gallery' }

export default async function AdminGalleryPage() {
  const [destinations, library] = await Promise.all([listDestinations(true), listGallery()])

  return (
    <>
      <PageHeader
        title="Gallery"
        subtitle="The photo library behind the destination and package pages."
      />
      <GalleryManager destinations={destinations} initialLibrary={library} />
    </>
  )
}
