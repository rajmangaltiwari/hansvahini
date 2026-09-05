import Header from '@/src/components/Header'
import Hero from '@/src/homepage/Hero'
import Packages from '@/src/homepage/Packages'
import Destinations from '@/src/homepage/Destinations'
import Gallery from '@/src/homepage/Gallery'
import Testimonials from '@/src/homepage/Testimonials'
import Faq from '@/src/homepage/Faq'
import EnquiryForm from '@/src/homepage/EnquiryForm'
import Footer from '@/src/components/Footer'

export default function Page() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <Hero />
        <Packages />
        <Destinations />
        <Gallery />
        <Testimonials />
        <Faq />
        <EnquiryForm />
      </main>
      <Footer />
    </>
  )
}
