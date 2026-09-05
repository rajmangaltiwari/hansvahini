import type { Metadata } from 'next'
import Header from '@/src/components/Header'
import Footer from '@/src/components/Footer'
import PrivacyPolicy from '@/src/PrivacyPolicy/PrivacyPolicy'

export const metadata: Metadata = {
  title: 'Privacy Policy — Hansvahini Expeditions',
  description:
    'What personal information Hansvahini Expeditions collects when you enquire or travel with us, who we share it with to run your trip, how long we keep it, and how to have it corrected or deleted.',
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <PrivacyPolicy />
      <Footer />
    </>
  )
}
