'use client'

import { useMemo, useState } from 'react'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import DestinationCard from './DestinationCard'
import {
  destinations,
  regions,
  experiences,
  difficulties,
  destinationSortOptions,
  countByRegion,
  type Region,
  type Experience,
  type DestinationSortId,
} from '@/src/data/destinations'
import { fromPrice } from '@/src/data/packages'

export default function DestinationExplorer() {
  const [query, setQuery]           = useState('')
  const [region, setRegion]         = useState<Region | 'All'>('All')
  const [experience, setExperience] = useState<Experience | 'All'>('All')
  const [difficulty, setDifficulty] = useState<string>('All')
  const [sort, setSort]             = useState<DestinationSortId>('popular')
  const [filtersOpen, setFiltersOpen] = useState(false)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()

    const list = destinations.filter((d) => {
      if (region !== 'All' && d.region !== region) return false
      if (experience !== 'All' && !d.experiences.includes(experience)) return false
      if (difficulty !== 'All' && d.difficulty !== difficulty) return false
      if (q) {
        const haystack = `${d.name} ${d.tagline} ${d.blurb} ${d.region} ${d.experiences.join(' ')}`
        if (!haystack.toLowerCase().includes(q)) return false
      }
      return true
    })

    const sorted = [...list]
    switch (sort) {
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating)
        break
      case 'price-low':
        sorted.sort((a, b) => fromPrice(a.slug) - fromPrice(b.slug))
        break
      case 'price-high':
        sorted.sort((a, b) => fromPrice(b.slug) - fromPrice(a.slug))
        break
      case 'name':
        sorted.sort((a, b) => a.name.localeCompare(b.name))
        break
      default:
        sorted.sort((a, b) => b.reviews - a.reviews)
    }
    return sorted
  }, [query, region, experience, difficulty, sort])

  const activeCount =
    (region !== 'All' ? 1 : 0) +
    (experience !== 'All' ? 1 : 0) +
    (difficulty !== 'All' ? 1 : 0) +
    (query.trim() ? 1 : 0)

  function reset() {
    setQuery('')
    setRegion('All')
    setExperience('All')
    setDifficulty('All')
    setSort('popular')
  }

  return (
    <section id="explore" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section heading */}
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">Browse & Filter</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Explore All Destinations</h2>
          <div className="mt-4 w-12 h-0.5 bg-gray-900 mx-auto" />
        </div>

        {/* ── Search + sort bar ── */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search destinations, regions or experiences…"
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
            onChange={(e) => setSort(e.target.value as DestinationSortId)}
            className="border border-gray-200 rounded-full px-5 py-3 text-sm text-gray-700 focus:outline-none focus:border-gray-900 transition-colors bg-white"
            aria-label="Sort destinations"
          >
            {destinationSortOptions.map((opt) => (
              <option key={opt.id} value={opt.id}>{opt.label}</option>
            ))}
          </select>
        </div>

        {/* ── Region chips ── */}
        <div className={`${filtersOpen ? 'block' : 'hidden'} sm:block`}>
          <div className="flex flex-wrap gap-2 mb-4">
            {regions.map((r) => (
              <button
                key={r}
                onClick={() => setRegion(r)}
                className={`text-sm px-4 py-2 rounded-full border transition-colors ${
                  region === r
                    ? 'bg-gray-900 text-white border-gray-900'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-gray-900'
                }`}
              >
                {r === 'All' ? 'All Regions' : r}
                <span className={region === r ? 'text-gray-400 ml-1.5' : 'text-gray-400 ml-1.5'}>
                  {countByRegion(r)}
                </span>
              </button>
            ))}
          </div>

          {/* ── Experience + difficulty selects ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
            <label className="block">
              <span className="block text-xs uppercase tracking-widest text-gray-400 mb-2">
                Experience
              </span>
              <select
                value={experience}
                onChange={(e) => setExperience(e.target.value as Experience | 'All')}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-gray-900 transition-colors bg-white"
              >
                {experiences.map((exp) => (
                  <option key={exp} value={exp}>
                    {exp === 'All' ? 'All Experiences' : exp}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="block text-xs uppercase tracking-widest text-gray-400 mb-2">
                Difficulty
              </span>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-gray-900 transition-colors bg-white"
              >
                {difficulties.map((d) => (
                  <option key={d} value={d}>{d === 'All' ? 'Any Difficulty' : d}</option>
                ))}
              </select>
            </label>
          </div>
        </div>

        {/* ── Result count + reset ── */}
        <div className="flex items-center justify-between border-t border-gray-100 pt-5 mb-8">
          <p className="text-sm text-gray-500">
            Showing <span className="font-semibold text-gray-900">{filtered.length}</span> of{' '}
            {destinations.length} destinations
          </p>
          {activeCount > 0 && (
            <button
              onClick={reset}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
              Clear filters
            </button>
          )}
        </div>

        {/* ── Grid ── */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((dest) => (
              <DestinationCard key={dest.slug} dest={dest} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border border-dashed border-gray-200 rounded-2xl">
            <p className="text-4xl mb-4">🧭</p>
            <h3 className="text-lg font-bold text-gray-900 mb-2">No destinations match that</h3>
            <p className="text-sm text-gray-500 max-w-sm mx-auto mb-6">
              Try widening the region or clearing a filter — or tell us where you want to go and we
              will build the trip from scratch.
            </p>
            <button
              onClick={reset}
              className="bg-gray-900 text-white text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-gray-700 transition-colors"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
