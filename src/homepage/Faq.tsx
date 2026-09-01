'use client'

import { useState } from 'react'

const faqs = [
  {
    id: 1,
    question: 'How do I book a trip with Hansvahini Expeditions?',
    answer:
      'Simply fill out the Enquiry Form on our website with your preferred destination, travel dates, and number of travellers. Our team will get back to you within 24 hours with a personalised itinerary and quote. You can also call or WhatsApp us directly.',
  },
  {
    id: 2,
    question: 'Are your packages customisable?',
    answer:
      'Absolutely. All our packages are fully customisable. You can choose your travel dates, accommodation preferences, add-on activities, and group size. Just mention your requirements in the enquiry form and we will tailor the itinerary to suit you perfectly.',
  },
  {
    id: 3,
    question: 'What is included in the package price?',
    answer:
      'Most packages include accommodation, meals (as specified in the itinerary), transport, experienced local guides, and all necessary permits. Flights, personal expenses, and optional activities are generally not included unless stated. We clearly list inclusions and exclusions in every quote.',
  },
  {
    id: 4,
    question: 'Is it safe to travel to remote destinations like Ladakh or Spiti?',
    answer:
      'Yes. Safety is our top priority. We have experienced local guides, well-maintained vehicles suited for mountain terrain, and first-aid trained staff on all trips. We also keep a close eye on weather and road conditions and adjust itineraries accordingly.',
  },
  {
    id: 5,
    question: 'What is your cancellation and refund policy?',
    answer:
      'Cancellations made 30+ days before departure receive a full refund minus processing fees. Cancellations 15–29 days before receive a 50% refund. Within 14 days, refunds are subject to availability and vendor policies. We always recommend travel insurance for unforeseen circumstances.',
  },
  {
    id: 6,
    question: 'Do you cater to solo travellers and senior citizens?',
    answer:
      'Yes, we welcome solo travellers and design trips specifically suited to their comfort and safety. For senior citizens, we offer easier-paced itineraries with comfortable accommodation, accessible transport, and extra care from our guides throughout the trip.',
  },
  {
    id: 7,
    question: 'What is the best time to visit Ladakh and Spiti Valley?',
    answer:
      'The ideal window for Ladakh and Spiti Valley is June to September when roads are accessible and weather is pleasant. Kedarnath is open May to November. For Rishikesh and Haridwar, October to March is most comfortable. We can advise the best timing based on your specific destination.',
  },
  {
    id: 8,
    question: 'Do you provide group discounts?',
    answer:
      'Yes. Groups of 6 or more travellers receive special pricing. The larger the group, the better the discount. Reach out to us with your group size and destination and we will put together an exclusive offer for you.',
  },
]

export default function Faq() {
  const [openId, setOpenId] = useState<number | null>(null)

  function toggle(id: number) {
    setOpenId((prev) => (prev === id ? null : id))
  }

  return (
    <section id="faq" className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section heading */}
        <div className="text-center mb-14">
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">
            Got Questions?
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Frequently Asked Questions
          </h2>
          <div className="mt-4 w-12 h-0.5 bg-gray-900 mx-auto" />
        </div>

        {/* Accordion */}
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

                  {/* +/– icon */}
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
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </span>
                </button>

                {/* Answer panel */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="px-6 pb-6 text-sm text-gray-500 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <p className="text-center text-sm text-gray-400 mt-10">
          Still have questions?{' '}
          <a
            href="#contact"
            className="font-semibold text-gray-900 underline underline-offset-4 hover:text-gray-600 transition-colors"
          >
            Get in touch with us
          </a>
        </p>
      </div>
    </section>
  )
}
