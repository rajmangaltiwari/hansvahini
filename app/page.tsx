import Header from '@/src/components/Header'
import Hero from '@/src/homepage/Hero'
import Packages from '@/src/homepage/Packages'
import Destinations from '@/src/homepage/Destinations'
import Gallery from '@/src/homepage/Gallery'
import Testimonials from '@/src/homepage/Testimonials'
import Faq from '@/src/homepage/Faq'
import EnquiryForm from '@/src/homepage/EnquiryForm'
import Footer from '@/src/components/Footer'
import { listDestinations } from '@/src/lib/queries/destinations'

/** Rebuilt hourly, and immediately when an admin action revalidates it. */
export const revalidate = 3600

export default async function Page() {
  // The gallery is a Client Component, so its photos are resolved here.
  const destinations = await listDestinations()

  return (
    <>
      <Header />
      <main className="pt-16">
        <Hero />
        <Packages />
        <Destinations />
        <Gallery destinations={destinations} />
        <Testimonials />
        <Faq />
        <EnquiryForm />
      </main>
      <Footer />
    </>
  )
}
