'use client'

import { useMemo, useState } from 'react'
import {
  Search, X, SlidersHorizontal, Sparkles, Users, Heart, Mountain, Landmark,
  Binoculars, Palmtree, CalendarClock, Gem, Backpack, UsersRound,
} from 'lucide-react'
import PackageCard from './PackageCard'
import {
  travelPackages,
  packageCategories,
  packageDestinations,
  durationOptions,
  budgetOptions,
  sortOptions,
  countByCategory,
  type PackageCategory,
  type DurationId,
  type BudgetId,
  type SortId,
} from '@/src/data/packages'

// Data files stay pure — icon keys are resolved to components here.
const icons = {
  sparkles: Sparkles,
  users: Users,
  heart: Heart,
  mountain: Mountain,
  landmark: Landmark,
  binoculars: Binoculars,
  palmtree: Palmtree,
  calendarclock: CalendarClock,
  gem: Gem,
  backpack: Backpack,
  usersround: UsersRound,
} as const

export default function PackagesExplorer({
  initialCategory = 'all',
  initialDestination = 'all',
}: {
  initialCategory?: PackageCategory | 'all'
  initialDestination?: string
}) {
  const [category, setCategory]       = useState<PackageCategory | 'all'>(initialCategory)
  const [destination, setDestination] = useState<string>(initialDestination)
  const [duration, setDuration]       = useState<DurationId>('all')
  const [budget, setBudget]           = useState<BudgetId>('all')
  const [sort, setSort]               = useState<SortId>('popular')
  const [query, setQuery]             = useState('')
  const [filtersOpen, setFiltersOpen] = useState(false)

  const activeCategory = packageCategories.find((c) => c.id === category)

  const filtered = useMemo(() => {
    const durationRange = durationOptions.find((d) => d.id === duration)!
    const budgetRange   = budgetOptions.find((b) => b.id === budget)!
    const q = query.trim().toLowerCase()

    const list = travelPackages.filter((p) => {
      if (category !== 'all' && !p.categories.includes(category)) return false
      if (destination !== 'all' && p.destinationSlug !== destination) return false
      if (p.durationDays < durationRange.min || p.durationDays > durationRange.max) return false
      if (p.price < budgetRange.min || p.price > budgetRange.max) return false
      if (q) {
        const haystack = `${p.title} ${p.destinationName} ${p.region} ${p.summary} ${p.categories.join(' ')} ${p.highlights.join(' ')}`
        if (!haystack.toLowerCase().includes(q)) return false
      }
      return true
    })

    const sorted = [...list]
    switch (sort) {
      case 'price-low':
        sorted.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        sorted.sort((a, b) => b.price - a.price)
        break
      case 'duration':
        sorted.sort((a, b) => a.durationDays - b.durationDays)
        break
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating)
        break
      default:
        sorted.sort((a, b) => b.reviews - a.reviews)
    }
    return sorted
  }, [category, destination, duration, budget, sort, query])

  const activeCount =
    (category !== 'all' ? 1 : 0) +
    (destination !== 'all' ? 1 : 0) +
    (duration !== 'all' ? 1 : 0) +
    (budget !== 'all' ? 1 : 0) +
    (query.trim() ? 1 : 0)

  function reset() {
    setCategory('all')
    setDestination('all')
    setDuration('all')
    setBudget('all')
    setSort('popular')
    setQuery('')
  }

  return (
    <section id="browse" className="py-20 bg-white scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section heading */}
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">Browse by Theme</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Pick Your Kind of Trip</h2>
          <div className="mt-4 w-12 h-0.5 bg-gray-900 mx-auto" />
        </div>

        {/* ── Category chips ── */}
        <div className="flex flex-wrap justify-center gap-3 mb-4">
          {packageCategories.map((cat) => {
            const Icon = icons[cat.icon as keyof typeof icons] ?? Sparkles
            const isActive = category === cat.id
            return (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                aria-pressed={isActive}
                className={`inline-flex items-center gap-2 text-sm font-medium px-4 py-2.5 rounded-full border transition-colors ${
                  isActive
                    ? 'bg-gray-900 text-white border-gray-900'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-gray-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                {cat.label}
                <span className={isActive ? 'text-gray-400' : 'text-gray-400'}>
                  {countByCategory(cat.id)}
                </span>
              </button>
            )
          })}
        </div>

        {/* Active category blurb */}
        {activeCategory && (
          <p className="text-center text-sm text-gray-500 mb-10 max-w-xl mx-auto">
            {activeCategory.description}
          </p>
        )}

        {/* ── Search + sort ── */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search packages, destinations or activities…"
              className="w-full border border-gray-200 rounded-full pl-11 pr-10 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-900 transition-colors"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-900"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="sm:hidden inline-flex items-center justify-center gap-2 border border-gray-200 rounded-full px-5 py-3 text-sm font-medium text-gray-700 hover:border-gray-900 transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
            {activeCount > 0 && (
              <span className="bg-gray-900 text-white text-[11px] w-5 h-5 rounded-full flex items-center justify-center">
                {activeCount}
              </span>
            )}
          </button>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortId)}
            className="border border-gray-200 rounded-full px-5 py-3 text-sm text-gray-700 bg-white focus:outline-none focus:border-gray-900 transition-colors"
            aria-label="Sort packages"
          >
            {sortOptions.map((opt) => (
              <option key={opt.id} value={opt.id}>{opt.label}</option>
            ))}
          </select>
        </div>

        {/* ── Destination / duration / budget ── */}
        <div className={`${filtersOpen ? 'grid' : 'hidden'} sm:grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6`}>
          <label className="block">
            <span className="block text-xs uppercase tracking-widest text-gray-400 mb-2">
              Destination
            </span>
            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 bg-white focus:outline-none focus:border-gray-900 transition-colors"
            >
              <option value="all">All Destinations</option>
              {packageDestinations.map((d) => (
                <option key={d.slug} value={d.slug}>{d.name}</option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="block text-xs uppercase tracking-widest text-gray-400 mb-2">
              Trip Length
            </span>
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value as DurationId)}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 bg-white focus:outline-none focus:border-gray-900 transition-colors"
            >
              {durationOptions.map((d) => (
                <option key={d.id} value={d.id}>{d.label}</option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="block text-xs uppercase tracking-widest text-gray-400 mb-2">
              Budget per Person
            </span>
            <select
              value={budget}
              onChange={(e) => setBudget(e.target.value as BudgetId)}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 bg-white focus:outline-none focus:border-gray-900 transition-colors"
            >
              {budgetOptions.map((b) => (
                <option key={b.id} value={b.id}>{b.label}</option>
              ))}
            </select>
          </label>
        </div>

        {/* ── Result count + reset ── */}
        <div className="flex items-center justify-between border-t border-gray-100 pt-5 mb-8">
          <p className="text-sm text-gray-500">
            Showing <span className="font-semibold text-gray-900">{filtered.length}</span> of{' '}
            {travelPackages.length} packages
          </p>
          {activeCount > 0 && (
            <button
              onClick={reset}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
              Clear all filters
            </button>
          )}
        </div>

        {/* ── Grid ── */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border border-dashed border-gray-200 rounded-2xl">
            <p className="text-4xl mb-4">🎒</p>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              No packages match those filters
            </h3>
            <p className="text-sm text-gray-500 max-w-sm mx-auto mb-6">
              Loosen the budget or trip length — or send us your dates and we will build a custom
              itinerary at your price point.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={reset}
                className="bg-gray-900 text-white text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-gray-700 transition-colors"
              >
                Reset filters
              </button>
              <a
                href="#contact"
                className="border border-gray-900 text-gray-900 text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-gray-900 hover:text-white transition-colors"
              >
                Request a custom trip
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
