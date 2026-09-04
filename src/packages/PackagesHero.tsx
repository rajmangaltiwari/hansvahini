import Link from 'next/link'
import { Heart, Users, Mountain, Landmark } from 'lucide-react'
import { travelPackages, countByCategory, type PackageCategory } from '@/src/data/packages'

const quickLinks: { id: PackageCategory; label: string; icon: typeof Users }[] = [
  { id: 'family',     label: 'Family',     icon: Users    },
  { id: 'honeymoon',  label: 'Honeymoon',  icon: Heart    },
  { id: 'adventure',  label: 'Adventure',  icon: Mountain },
  { id: 'pilgrimage', label: 'Pilgrimage', icon: Landmark },
]

export default function PackagesHero() {
  const lowest = Math.min(...travelPackages.map((p) => p.price))

  return (
    <section className="relative h-[60vh] min-h-96 flex items-end overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/spiti.jpg')" }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <nav className="flex items-center gap-2 text-xs text-gray-300 mb-4" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <span className="text-white">Packages</span>
        </nav>

        <p className="text-xs uppercase tracking-widest text-gray-300 mb-2">
          {travelPackages.length} Curated Trips
        </p>
        <h1 className="text-3xl sm:text-5xl font-bold text-white max-w-3xl leading-tight">
          Find the Package That Fits Your Trip
        </h1>
        <p className="mt-4 text-gray-200 text-sm sm:text-base max-w-2xl leading-relaxed">
          Family holidays, honeymoons, high-altitude expeditions, temple circuits and safari
          weekends — filter by theme, destination, length and budget until one of them is obviously
          yours. Starting at ₹{lowest.toLocaleString('en-IN')} per person.
        </p>

        {/* Jump straight to a theme */}
        <div className="mt-8 flex flex-wrap gap-3">
          {quickLinks.map((link) => (
            <Link
              key={link.id}
              href={`/packages?category=${link.id}#browse`}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/15 text-white text-sm px-4 py-2.5 rounded-full hover:bg-white/20 transition-colors"
            >
              <link.icon className="w-4 h-4" />
              {link.label}
              <span className="text-gray-300 text-xs">{countByCategory(link.id)}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
