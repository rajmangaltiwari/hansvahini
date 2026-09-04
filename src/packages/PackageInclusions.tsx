import { BedDouble, Bus, UtensilsCrossed, UserCheck, FileCheck, LifeBuoy } from 'lucide-react'

const inclusions = [
  {
    icon: BedDouble,
    title: 'Vetted Stays',
    body: 'Hotels, camps and homestays we have slept in ourselves — chosen for location and warmth, not star ratings.',
  },
  {
    icon: Bus,
    title: 'All Ground Transport',
    body: 'Airport pickups, inter-city legs and sightseeing runs in vehicles sized to the group. No shared cabs unless you asked for one.',
  },
  {
    icon: UtensilsCrossed,
    title: 'Daily Meals',
    body: 'Breakfast and dinner on every trip, all meals on remote routes where there is nowhere else to eat.',
  },
  {
    icon: UserCheck,
    title: 'Local Trip Leader',
    body: 'One guide per departure who lives in the region, speaks the language and knows which road washed out last week.',
  },
  {
    icon: FileCheck,
    title: 'Permits & Entry Fees',
    body: 'Inner-line permits, national-park entries, monument tickets and safari bookings — all arranged before you travel.',
  },
  {
    icon: LifeBuoy,
    title: '24×7 On-Trip Support',
    body: 'A number that a human answers, plus oxygen cylinders and first-aid kits on every high-altitude departure.',
  },
]

export default function PackageInclusions() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">Standard on Every Trip</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            What Every Package Includes
          </h2>
          <div className="mt-4 w-12 h-0.5 bg-gray-900 mx-auto" />
          <p className="mt-5 text-sm text-gray-500 max-w-xl mx-auto leading-relaxed">
            Regardless of which theme or budget you pick, these six things are never an add-on.
            Anything excluded is listed in full on the destination page.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {inclusions.map((item) => (
            <div
              key={item.title}
              className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-11 h-11 rounded-full bg-gray-900 flex items-center justify-center mb-5">
                <item.icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
