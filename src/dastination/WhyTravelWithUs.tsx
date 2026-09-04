import { ShieldCheck, Map, HeartHandshake, Wallet } from 'lucide-react'

const reasons = [
  {
    icon: Map,
    title: 'Routes We Have Walked',
    body: 'Every itinerary on this page was run by our own team first. The altitude curve, the drive times and the rest days are set from experience, not from a brochure.',
  },
  {
    icon: ShieldCheck,
    title: 'Permits & Safety Handled',
    body: 'Inner-line permits, forest entries and park bookings are arranged before you arrive. Oxygen support and first-aid kits travel on every high-altitude departure.',
  },
  {
    icon: Wallet,
    title: 'Honest, Fixed Pricing',
    body: 'The price you see is the price you pay. Inclusions and exclusions are listed in full on every destination page — no surprise line items at checkout.',
  },
  {
    icon: HeartHandshake,
    title: 'Small Groups, Real Guides',
    body: 'Departures cap out early so a guide is never spread across forty people. Most of ours are from the valleys they take you through.',
  },
]

export default function WhyTravelWithUs() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">Why Hansvahini</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            What You Get on Every Trip
          </h2>
          <div className="mt-4 w-12 h-0.5 bg-gray-900 mx-auto" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason) => (
            <div
              key={reason.title}
              className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-11 h-11 rounded-full bg-gray-900 flex items-center justify-center mb-5">
                <reason.icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-2">{reason.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{reason.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
