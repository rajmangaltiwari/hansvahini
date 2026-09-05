import type { Metadata } from 'next'
import Header from '@/src/components/Header'
import Footer from '@/src/components/Footer'
import AboutHero from '@/src/aboutUs/AboutHero'
import OurStory from '@/src/aboutUs/OurStory'
import WhatWeBelieve from '@/src/aboutUs/WhatWeBelieve'
import HowWePlan from '@/src/aboutUs/HowWePlan'
import OurTeam from '@/src/aboutUs/OurTeam'
import AboutCta from '@/src/aboutUs/AboutCta'
import Testimonials from '@/src/homepage/Testimonials'
import EnquiryForm from '@/src/homepage/EnquiryForm'

export const metadata: Metadata = {
  title: 'About Us — Hansvahini Expeditions',
  description:
    'A small team running guided travel across the Indian Himalaya, Uttarakhand, Rajasthan and the Andamans since 2016. How we plan trips, what we believe, and who you will be travelling with.',
}

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <AboutHero />
        <OurStory />
        <WhatWeBelieve />
        <HowWePlan />
        <OurTeam />
        <Testimonials />
        <AboutCta />
        <EnquiryForm />
      </main>
      <Footer />
    </>
  )
}
