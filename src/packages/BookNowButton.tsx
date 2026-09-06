'use client'

import { openEnquiryPopup } from '@/src/components/PopUpEnquiryForm'

/**
 * Opens the enquiry modal already knowing which trip was clicked, so the lead
 * arrives tagged with the package instead of the visitor having to say.
 *
 * A Client Component because PackageCard is rendered on the server; this is the
 * smallest possible island around the click handler.
 */
export default function BookNowButton({
  packageSlug,
  className,
  label = 'Book Now',
}: {
  packageSlug: string
  className?: string
  label?: string
}) {
  return (
    <button
      type="button"
      onClick={() => openEnquiryPopup({ source: 'Package page', packageSlug })}
      className={className}
    >
      {label}
    </button>
  )
}
