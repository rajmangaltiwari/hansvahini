import type { Metadata } from 'next'
import Header from '@/src/components/Header'
import Footer from '@/src/components/Footer'
import TermsAndConditions from '@/src/TermsAndConditions/TermsAndConditions'

export const metadata: Metadata = {
  title: 'Terms & Conditions — Your Travels',
  description:
    'Booking, payment and cancellation terms for trips with Your Travels, along with traveller responsibilities, altitude and insurance requirements, and how liability is shared.',
}

export default function TermsAndConditionsPage() {
  return (
    <>
      <Header />
      <TermsAndConditions />
      <Footer />
    </>
  )
}
