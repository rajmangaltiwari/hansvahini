const steps = [
  {
    title: 'We go first',
    text: 'Nothing goes on the site until someone from the team has driven the road, walked the trail or slept in the room. Where a place changes season to season, we go back.',
  },
  {
    title: 'We build around the body',
    text: 'Altitude gain, drive lengths and rest days come before sightseeing when we lay out an itinerary. The list of what you will see is what fits safely, not the other way round.',
  },
  {
    title: 'We price it in full',
    text: 'Permits, monument fees, driver allowances and the taxes all go into the quoted figure. What is genuinely not covered — flights, insurance, personal spending — is listed as excluded.',
  },
  {
    title: 'We stay reachable',
    text: 'Someone from the office is contactable through the whole trip, not only in office hours. When a highway shuts at 6 AM, the replan starts at 6 AM.',
  },
]

export default function HowWePlan() {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-3">How We Plan</p>
          <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 leading-tight tracking-tight">
            Every itinerary on this site went through the same four steps.
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <div key={step.title} className="border-t border-gray-200 pt-5">
              <p className="text-3xl font-bold text-gray-200 tabular-nums leading-none">
                {String(i + 1).padStart(2, '0')}
              </p>
              <h3 className="mt-4 text-base font-bold text-gray-900 tracking-tight">{step.title}</h3>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
