const steps = [
  {
    step: '01',
    title: 'Pick a Package',
    body: 'Filter by theme, destination, length and budget until two or three trips stand out. Every listing links to a full day-by-day itinerary.',
  },
  {
    step: '02',
    title: 'Send an Enquiry',
    body: 'Tell us your dates and group size. A trip planner replies within 24 hours with availability and a costed breakdown.',
  },
  {
    step: '03',
    title: 'Customise It',
    body: 'Swap hotels, add a rest day, upgrade to a private vehicle or extend the route. Nothing on this page is fixed.',
  },
  {
    step: '04',
    title: 'Confirm & Travel',
    body: 'Pay 25% to hold the departure, the balance a week before. Permits, tickets and the final kit list land in your inbox.',
  },
]

export default function HowItWorks() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">The Process</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">How Booking Works</h2>
          <div className="mt-4 w-12 h-0.5 bg-gray-900 mx-auto" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item, i) => (
            <div key={item.step} className="relative">
              {/* Connector line on desktop */}
              {i < steps.length - 1 && (
                <div
                  className="hidden lg:block absolute top-6 left-[calc(50%+2rem)] right-[-1.5rem] h-px bg-gray-200"
                  aria-hidden="true"
                />
              )}
              <div className="relative bg-white border border-gray-100 rounded-2xl p-6 shadow-sm h-full">
                <div className="w-12 h-12 rounded-full bg-gray-900 text-white text-sm font-bold flex items-center justify-center mb-5">
                  {item.step}
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
