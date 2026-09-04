import Link from 'next/link'
import { formatPrice, type TravelPackage } from '@/src/data/packages'

/** Sticky booking rail: price, CTAs, inclusions/exclusions and the help card. */
export default function BookingSidebar({ pkg }: { pkg: TravelPackage }) {
  return (
    <aside>
      <div className="sticky top-24 space-y-6">
        {/* Price + CTAs */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">Book This Trip</p>
          <p className="text-3xl font-bold text-gray-900 mb-1">
            {formatPrice(pkg.price)}
            {pkg.oldPrice && (
              <span className="ml-2 text-base font-normal text-gray-400 line-through">
                {formatPrice(pkg.oldPrice)}
              </span>
            )}
          </p>
          <p className="text-xs text-gray-400 mb-6">
            per person · {pkg.durationDays} Days / {pkg.durationNights} Nights
          </p>
          <Link href="/#contact" className="block w-full text-center bg-gray-900 text-white text-sm font-semibold py-3.5 rounded-full hover:bg-gray-700 transition-colors">
            Enquire Now
          </Link>
          <Link href="/#contact" className="block w-full text-center border border-gray-900 text-gray-900 text-sm font-semibold py-3 rounded-full hover:bg-gray-100 transition-colors mt-3">
            Get a Custom Quote
          </Link>
        </div>

        {/* Included */}
        <div className="bg-gray-50 rounded-2xl p-6">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4">
            What&apos;s Included
          </h3>
          <ul className="space-y-2">
            {pkg.included.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                <span className="text-green-600 font-bold flex-shrink-0">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Excluded */}
        <div className="bg-gray-50 rounded-2xl p-6">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4">
            Not Included
          </h3>
          <ul className="space-y-2">
            {pkg.excluded.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                <span className="text-gray-400 font-bold flex-shrink-0">✗</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Help */}
        <div className="bg-gray-900 rounded-2xl p-6 text-white">
          <h3 className="text-sm font-bold mb-2">Need Help Planning?</h3>
          <p className="text-xs text-gray-400 leading-relaxed mb-4">
            Our travel experts are available Mon–Sat, 9 AM – 7 PM.
          </p>
          <a href="tel:+919876543210" className="block text-center bg-white text-gray-900 text-sm font-semibold py-2.5 rounded-full hover:bg-gray-100 transition-colors">
            📞 Call Us Now
          </a>
        </div>
      </div>
    </aside>
  )
}
