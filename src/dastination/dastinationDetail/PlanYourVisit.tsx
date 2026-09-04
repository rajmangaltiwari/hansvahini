import { Plane, TrainFront, Bus, Lightbulb, UtensilsCrossed } from 'lucide-react'
import type { Destination } from '@/src/data/destinations'

/** Practical planning info: getting there, when to go, tips and what to eat. */
export default function PlanYourVisit({ dest }: { dest: Destination }) {
  const routes = [
    { icon: Plane,      label: 'By Air',  text: dest.howToReach.byAir  },
    { icon: TrainFront, label: 'By Rail', text: dest.howToReach.byRail },
    { icon: Bus,        label: 'By Road', text: dest.howToReach.byRoad },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">Good to Know</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Planning Your Visit</h2>
          <div className="mt-4 w-12 h-0.5 bg-gray-900 mx-auto" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* How to reach */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <h3 className="text-base font-bold text-gray-900 mb-5">How to Reach</h3>
            <div className="space-y-5">
              {routes.map((row) => (
                <div key={row.label} className="flex gap-4">
                  <div className="w-9 h-9 rounded-full bg-gray-900 flex items-center justify-center flex-shrink-0">
                    <row.icon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">{row.label}</p>
                    <p className="text-sm text-gray-600 leading-relaxed">{row.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* When to go */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <h3 className="text-base font-bold text-gray-900 mb-5">When to Go</h3>
            <div className="space-y-4">
              {dest.seasons.map((season) => (
                <div key={season.season} className="border-l-2 border-gray-200 pl-4">
                  <div className="flex flex-wrap items-baseline gap-x-3">
                    <p className="text-sm font-bold text-gray-900">{season.season}</p>
                    <p className="text-xs text-gray-400">{season.months}</p>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed mt-1">{season.note}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Travel tips */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <h3 className="flex items-center gap-2 text-base font-bold text-gray-900 mb-5">
              <Lightbulb className="w-4 h-4 text-gray-400" />
              Travel Tips
            </h3>
            <ul className="space-y-3">
              {dest.travelTips.map((tip) => (
                <li key={tip} className="flex items-start gap-3 text-sm text-gray-600 leading-relaxed">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-900 flex-shrink-0" />
                  {tip}
                </li>
              ))}
            </ul>
          </div>

          {/* Local food */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <h3 className="flex items-center gap-2 text-base font-bold text-gray-900 mb-5">
              <UtensilsCrossed className="w-4 h-4 text-gray-400" />
              What to Eat
            </h3>
            <div className="flex flex-wrap gap-2">
              {dest.localFood.map((food) => (
                <span
                  key={food}
                  className="border border-gray-200 text-gray-700 text-sm px-4 py-2 rounded-full hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-colors cursor-default"
                >
                  {food}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
