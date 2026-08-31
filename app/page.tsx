import Header from '@/src/components/Header'
import Hero from '@/src/homepage/Hero'
import Packages from '@/src/homepage/Packages'
import Destinations from '@/src/homepage/Destinations'
import Testimonials from '@/src/homepage/Testimonials'
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
        <Testimonials />
        <EnquiryForm />
      </main>
      <Footer />
    </>
  )
}
