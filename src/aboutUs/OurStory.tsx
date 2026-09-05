const chapters = [
  {
    year: '2016',
    title: 'One borrowed Bolero',
    text: 'We started with a single hired vehicle and a Manali–Leh run for six friends who could not find an operator willing to build the itinerary around acclimatisation rather than around the schedule. That trip took eleven days instead of the usual seven. Nobody got sick.',
  },
  {
    year: '2019',
    title: 'Beyond the Himalaya',
    text: 'Ranthambore, Varanasi and the Andamans came next, on the same principle — go often enough to know the place properly, then write the itinerary from what you actually found rather than from a brochure.',
  },
  {
    year: '2021',
    title: 'The quiet years',
    text: 'When travel stopped, we spent the time paying our guides and drivers, and rewriting every itinerary against what the roads and permits had become. We came back with fewer trips and better ones.',
  },
  {
    year: 'Today',
    title: 'Eight destinations, one standard',
    text: 'Around a thousand travellers a year across the Himalaya, Uttarakhand, Rajasthan, Uttar Pradesh and the islands. Small groups, the same drivers year after year, and an honest answer when a plan will not work.',
  },
]

export default function OurStory() {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          <div className="lg:sticky lg:top-24">
            <p className="text-xs uppercase tracking-widest text-gray-400 mb-3">Our Story</p>
            <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 leading-tight tracking-tight">
              It began because nobody would build the trip the way it needed building.
            </h2>
            <p className="mt-5 text-sm text-gray-600 leading-relaxed">
              Most Ladakh itineraries on sale in 2016 climbed 3,000 metres in a day because it made
              the brochure look efficient. We thought that was a bad reason to make people ill, so we
              built one that did not — and then kept going.
            </p>

            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mt-8">
              <img
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80"
                alt="A mountain road climbing towards a Himalayan pass"
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>

          <ol className="relative space-y-10">
            {chapters.map((chapter, i) => (
              <li key={chapter.year} className="relative pl-8">
                {/* Connector, stopped short on the final entry */}
                {i < chapters.length - 1 && (
                  <span className="absolute left-[5px] top-5 bottom-[-40px] w-px bg-gray-100" aria-hidden="true" />
                )}
                <span className="absolute left-0 top-1.5 w-2.5 h-2.5 rounded-full bg-gray-900" />

                <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">{chapter.year}</p>
                <h3 className="mt-1 text-lg font-bold text-gray-900 tracking-tight">{chapter.title}</h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">{chapter.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
