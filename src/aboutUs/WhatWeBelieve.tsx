import { HandCoins, Mountain, ShieldCheck, Users } from 'lucide-react'

const values = [
  {
    icon: Mountain,
    title: 'Acclimatisation is not padding',
    text: 'Every high-altitude itinerary we run builds in the days the body actually needs. It makes our Ladakh trips longer than most and we are not sorry about it.',
  },
  {
    icon: HandCoins,
    title: 'The price you see is the price',
    text: 'Inclusions and exclusions are listed in full on every package page. No mandatory tips, no surprise permit fees collected at a checkpost, no upsell halfway up a mountain.',
  },
  {
    icon: Users,
    title: 'Small groups, familiar faces',
    text: 'Most departures run between six and twelve travellers, with drivers and guides we have worked with for years. They know the roads in bad weather, which is when it matters.',
  },
  {
    icon: ShieldCheck,
    title: 'We say no when it is right to',
    text: 'If the pass is shut, the river is too high or a plan does not suit the people asking for it, we say so before you book rather than after you have paid.',
  },
]

export default function WhatWeBelieve() {
  return (
    <section className="py-16 sm:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-3">What We Believe</p>
          <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 leading-tight tracking-tight">
            Four things we will not trade away for a cheaper trip.
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {values.map((value) => (
            <article key={value.title} className="bg-white border border-gray-100 rounded-2xl p-6">
              <span className="inline-flex w-11 h-11 rounded-2xl bg-gray-900 items-center justify-center mb-4">
                <value.icon className="w-5 h-5 text-white" />
              </span>
              <h3 className="text-base font-bold text-gray-900 tracking-tight">{value.title}</h3>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">{value.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
