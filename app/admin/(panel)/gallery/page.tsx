import type { Metadata } from 'next'
import PageHeader from '@/src/admin/ui/PageHeader'
import GalleryManager from '@/src/admin/gallery/GalleryManager'

export const metadata: Metadata = { title: 'Gallery' }

export default function AdminGalleryPage() {
  return (
    <>
      <PageHeader
        title="Gallery"
        subtitle="The photo library behind the destination and package pages."
      />
      <GalleryManager />
    </>
  )
}
