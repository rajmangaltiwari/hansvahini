import LegalDocument from '@/src/components/LegalDocument'
import { privacySections, privacyUpdated } from './privacySections'

/** Privacy policy page body. Copy lives in ./privacySections. */
export default function PrivacyPolicy() {
  return (
    <LegalDocument
      eyebrow="Your Data"
      title="Privacy Policy"
      intro="What we collect when you enquire or travel with us, who we pass it to in order to run your trip, and how to get it back or have it deleted."
      updated={privacyUpdated}
      sections={privacySections}
    />
  )
}
