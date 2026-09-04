'use client'

import { useState } from 'react'

const faqs = [
  {
    id: 1,
    question: 'What is the difference between a family package and a regular one?',
    answer:
      'Pacing, mostly. Family departures use shorter driving legs, later start times and hotels with triple or connecting rooms. Activity days are optional rather than assumed, and we avoid overnight altitude gains above 3,500m with young children.',
  },
  {
    id: 2,
    question: 'What do honeymoon packages include that others do not?',
    answer:
      'Private transfers throughout, a room upgrade wherever the property allows it, one candlelit dinner, and flower-decorated rooms on arrival. Group activities are replaced with private ones, so you are never sharing a jeep or a boat.',
  },
  {
    id: 3,
    question: 'Can I book a package for a destination that is not listed?',
    answer:
      'Yes. Use the enquiry form and tell us where you want to go — we run custom routes across the Himalayas, Rajasthan, the Northeast and South India. You will get a costed itinerary within 24 hours.',
  },
  {
    id: 4,
    question: 'Are the prices per person or for the whole trip?',
    answer:
      'Every price shown is per person on twin-sharing basis. Solo travellers pay a single-occupancy supplement, and children under five travel free on most trips. The exact figure is confirmed at enquiry.',
  },
  {
    id: 5,
    question: 'How much do I pay to confirm a booking?',
    answer:
      '25% of the package cost holds your departure. The balance is due seven days before travel. For flight-inclusive and helicopter packages the ticket cost is charged upfront because those bookings are non-refundable.',
  },
  {
    id: 6,
    question: 'Can a package be customised after booking?',
    answer:
      'Up to two weeks before departure, yes — extra nights, hotel upgrades, a private vehicle or a changed route. Any difference in cost is invoiced separately. Inside two weeks it depends on what the hotels will release.',
  },
  {
    id: 7,
    question: 'What is your cancellation policy?',
    answer:
      'Full refund minus 5% up to 30 days before departure, 50% between 30 and 15 days, and no refund inside 15 days. Permits, flights and helicopter tickets are non-refundable at any point.',
  },
  {
    id: 8,
    question: 'Do you run fixed departures for solo travellers?',
    answer:
      'Yes — the Spiti backpacker circuit and the Ladakh expedition both have fixed Saturday departures with shared dorms or twin-sharing with a same-gender roommate at no supplement.',
  },
]

export default function PackagesFaq() {
  const [openId, setOpenId] = useState<number | null>(1)

  function toggle(id: number) {
    setOpenId((prev) => (prev === id ? null : id))
  }

  return (
    <section id="packages-faq" className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">Before You Book</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Package Questions</h2>
          <div className="mt-4 w-12 h-0.5 bg-gray-900 mx-auto" />
        </div>

        <div className="space-y-3">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id
            return (
              <div
                key={faq.id}
                className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => toggle(faq.id)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-semibold text-gray-900 leading-snug">
                    {faq.question}
                  </span>
                  <span className="flex-shrink-0 w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center">
                    <svg
                      className={`w-3.5 h-3.5 text-gray-600 transition-transform duration-300 ${
                        isOpen ? 'rotate-45' : 'rotate-0'
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </span>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="px-6 pb-5 text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
