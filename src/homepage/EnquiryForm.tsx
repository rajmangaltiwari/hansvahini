'use client'

import { useState, FormEvent } from 'react'

type FormState = {
  name: string
  email: string
  phone: string
  destination: string
  travelDates: string
  travelers: string
  message: string
}

const initialState: FormState = {
  name: '',
  email: '',
  phone: '',
  destination: '',
  travelDates: '',
  travelers: '',
  message: '',
}

const destinations = [
  'Ladakh',
  'Manali',
  'Spiti Valley',
  'Kedarnath',
  'Rishikesh & Haridwar',
  'Ranthambore',
  'Varanasi',
  'Andaman Islands',
  'Other / Custom',
]

export default function EnquiryForm() {
  const [form, setForm] = useState<FormState>(initialState)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    // Simulate form submission (replace with real API call)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 1000)
  }

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left — Info */}
          <div>
            <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">
              Get in Touch
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Plan Your Dream Trip
            </h2>
            <div className="w-12 h-0.5 bg-gray-900 mb-6" />
            <p className="text-gray-500 leading-relaxed mb-10">
              Fill in the enquiry form and our travel experts will get back to
              you within 24 hours with a personalised itinerary and quote
              tailored to your preferences.
            </p>

            {/* Contact details */}
            <div className="space-y-5">
              {[
                {
                  icon: (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.8}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  ),
                  label: 'Phone',
                  value: '+91 98765 43210',
                },
                {
                  icon: (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.8}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  ),
                  label: 'Email',
                  value: 'info@hansvahiniexpeditions.com',
                },
                {
                  icon: (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.8}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  ),
                  label: 'Address',
                  value: '14, Expedition Lane, New Delhi — 110001',
                },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-5 h-5 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      {item.icon}
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide">
                      {item.label}
                    </p>
                    <p className="text-sm font-medium text-gray-800">
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Form */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            {submitted ? (
              <div className="flex flex-col items-center justify-center text-center py-12 gap-4">
                <div className="w-16 h-16 rounded-full bg-gray-900 flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  Enquiry Received!
                </h3>
                <p className="text-sm text-gray-500 max-w-xs">
                  Thank you, {form.name || 'traveller'}! Our team will reach
                  out within 24 hours with your personalised itinerary.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false)
                    setForm(initialState)
                  }}
                  className="mt-2 text-sm font-semibold text-gray-900 underline underline-offset-4"
                >
                  Submit another enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* Row 1 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-xs font-medium text-gray-600 mb-1.5 uppercase tracking-wide"
                    >
                      Full Name <span className="text-gray-400">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Raj Kumar"
                      className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:border-gray-400 transition-colors"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-xs font-medium text-gray-600 mb-1.5 uppercase tracking-wide"
                    >
                      Phone <span className="text-gray-400">*</span>
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:border-gray-400 transition-colors"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-medium text-gray-600 mb-1.5 uppercase tracking-wide"
                  >
                    Email Address <span className="text-gray-400">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@email.com"
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:border-gray-400 transition-colors"
                  />
                </div>

                {/* Destination */}
                <div>
                  <label
                    htmlFor="destination"
                    className="block text-xs font-medium text-gray-600 mb-1.5 uppercase tracking-wide"
                  >
                    Destination of Interest
                  </label>
                  <select
                    id="destination"
                    name="destination"
                    value={form.destination}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-gray-400 transition-colors bg-white"
                  >
                    <option value="">Select a destination</option>
                    {destinations.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Row 3 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="travelDates"
                      className="block text-xs font-medium text-gray-600 mb-1.5 uppercase tracking-wide"
                    >
                      Preferred Travel Dates
                    </label>
                    <input
                      id="travelDates"
                      name="travelDates"
                      type="text"
                      value={form.travelDates}
                      onChange={handleChange}
                      placeholder="e.g. Oct 15 – Oct 22"
                      className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:border-gray-400 transition-colors"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="travelers"
                      className="block text-xs font-medium text-gray-600 mb-1.5 uppercase tracking-wide"
                    >
                      No. of Travellers
                    </label>
                    <select
                      id="travelers"
                      name="travelers"
                      value={form.travelers}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-gray-400 transition-colors bg-white"
                    >
                      <option value="">Select</option>
                      {['1', '2', '3–5', '6–10', '10+'].map((n) => (
                        <option key={n} value={n}>
                          {n} {n === '1' ? 'person' : 'people'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-medium text-gray-600 mb-1.5 uppercase tracking-wide"
                  >
                    Additional Requirements
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us about your trip expectations, special requirements, or any questions..."
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:border-gray-400 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gray-900 text-white text-sm font-semibold py-3.5 rounded-full hover:bg-gray-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? 'Sending Enquiry…' : 'Send Enquiry'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
