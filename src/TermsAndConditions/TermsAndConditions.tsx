import LegalDocument from '@/src/components/LegalDocument'
import { termsSections, termsUpdated } from './termsSections'

/** Terms and conditions page body. Copy lives in ./termsSections. */
export default function TermsAndConditions() {
  return (
    <LegalDocument
      eyebrow="The Agreement"
      title="Terms & Conditions"
      intro="How a booking works, what the price covers, what happens when a mountain road closes, and where responsibility sits between us and you."
      updated={termsUpdated}
      sections={termsSections}
    />
  )
}
