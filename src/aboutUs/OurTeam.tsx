const team = [
  {
    name: 'Raj Mangal',
    role: 'Founder & Trip Design',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
    bio: 'Drove the first Manali–Leh run in 2016 and has been rewriting the acclimatisation schedule ever since. Handles anything above 4,000 metres.',
  },
  {
    name: 'Priyam Sharma',
    role: 'Operations',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80',
    bio: 'Holds the permits, the hotel contracts and the phone that rings when a highway closes. Knows every driver on the roster by name.',
  },
  {
    name: 'Tenzin Norbu',
    role: 'Lead Guide, Ladakh & Spiti',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80',
    bio: 'Born in Leh, guiding since 2011. Reads weather on the passes better than any forecast and will turn a convoy around when it needs turning around.',
  },
  {
    name: 'Anita Rawat',
    role: 'Guest Relations',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&q=80',
    bio: 'Answers the enquiries, builds the quotes and talks people out of trips that will not suit them. The honest voice on the other end of the line.',
  },
]

export default function OurTeam() {
  return (
    <section className="py-16 sm:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-3">The Team</p>
          <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 leading-tight tracking-tight">
            Four people, and the drivers and guides who have been with us for years.
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {team.map((person) => (
            <article
              key={person.name}
              className="bg-white border border-gray-100 rounded-2xl overflow-hidden"
            >
              {/* Fixed aspect box — the image is absolutely positioned so it cannot set the height */}
              <div className="relative aspect-[4/5] bg-gray-100">
                <img
                  src={person.image}
                  alt={person.name}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="p-5">
                <h3 className="text-base font-bold text-gray-900 tracking-tight">{person.name}</h3>
                <p className="text-xs text-gray-400 uppercase tracking-wide mt-0.5">{person.role}</p>
                <p className="mt-3 text-sm text-gray-600 leading-relaxed">{person.bio}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
