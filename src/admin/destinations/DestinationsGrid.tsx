'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { Eye, Images, MapPin, Package, Pencil, Search, Star, Trash2 } from 'lucide-react'
import FeaturedBar, { FeaturedStar } from '@/src/admin/FeaturedBar'
import OutputModal from '@/src/admin/forms/OutputModal'
import { FEATURED_LIMIT, readPicks, savePicks } from '@/src/admin/featuredStore'
import {
  destinations,
  featuredDestinationSlugs,
  regions,
  type Region,
} from '@/src/data/destinations'
import { packagesForDestination } from '@/src/data/packages'

const nameFor = (slug: string) =>
  destinations.find((d) => d.slug === slug)?.name ?? slug

export default function DestinationsGrid() {
  const [region, setRegion] = useState<Region | 'All'>('All')
  const [query, setQuery]   = useState('')

  // Seeded from what this session last chose, else from the live homepage list.
  const [saved, setSaved] = useState<string[]>(() => readPicks('destination') ?? featuredDestinationSlugs)
  const [picks, setPicks] = useState<string[]>(saved)
  const [savedList, setSavedList] = useState<string[] | null>(null)

  const dirty = picks.length !== saved.length || picks.some((slug, i) => slug !== saved[i])

  function togglePick(slug: string) {
    setPicks((prev) => {
      if (prev.includes(slug)) return prev.filter((s) => s !== slug)
      if (prev.length >= FEATURED_LIMIT) return prev
      return [...prev, slug]
    })
  }

  function handleSave() {
    savePicks('destination', picks)
    setSaved(picks)
    setSavedList(picks)
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()

    return destinations.filter((dest) => {
      if (region !== 'All' && dest.region !== region) return false
      if (!q) return true
      return `${dest.name} ${dest.region} ${dest.tagline}`.toLowerCase().includes(q)
    })
  }, [region, query])

  return (
    <>
      <FeaturedBar
        picks={picks}
        labelFor={nameFor}
        onRemove={togglePick}
        onReset={() => setPicks(saved)}
        onSave={handleSave}
        dirty={dirty}
      />

      <div className="flex flex-col lg:flex-row lg:items-center gap-3 mb-4">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {regions.map((r) => {
            const active = region === r
            return (
              <button
                key={r}
                onClick={() => setRegion(r)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  active
                    ? 'bg-gray-900 text-white'
                    : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-400 hover:text-gray-900'
                }`}
              >
                {r}
              </button>
            )
          })}
        </div>

        <div className="relative lg:ml-auto lg:w-72">
          <Search className="w-4 h-4 text-gray-300 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search destinations…"
            className="w-full bg-white border border-gray-200 rounded-lg pl-9 pr-3 py-2 text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:border-gray-400 transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((dest) => (
          <article
            key={dest.slug}
            className={`bg-white border rounded-2xl shadow-sm overflow-hidden transition-colors ${
              picks.includes(dest.slug)
                ? 'border-amber-300 ring-1 ring-amber-200'
                : 'border-gray-100 hover:border-gray-300'
            }`}
          >
            {/* Fixed aspect box — the image is absolutely positioned so it can never set the height */}
            <div className="relative aspect-[16/9] bg-gray-100">
              <img src={dest.image} alt={dest.name} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent" />

              <span className="absolute top-3 left-3 inline-flex items-center gap-1 bg-white/90 backdrop-blur text-[11px] font-semibold text-gray-900 px-2 py-0.5 rounded-full">
                <MapPin className="w-3 h-3" />
                {dest.region}
              </span>
              {dest.trending && (
                <span className="absolute top-3 right-3 text-[11px] font-semibold text-white bg-gray-900/80 backdrop-blur px-2 py-0.5 rounded-full">
                  Trending
                </span>
              )}

              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-base font-bold text-white tracking-tight">{dest.name}</h3>
                <p className="text-[11px] text-gray-300 truncate">{dest.tagline}</p>
              </div>
            </div>

            <div className="p-4">
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span className="inline-flex items-center gap-1">
                  <Package className="w-3.5 h-3.5 text-gray-300" />
                  {packagesForDestination(dest.slug).length} packages
                </span>
                <span className="inline-flex items-center gap-1">
                  <Images className="w-3.5 h-3.5 text-gray-300" />
                  {dest.gallery.length} photos
                </span>
                <span className="inline-flex items-center gap-1 ml-auto">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  {dest.rating}
                </span>
              </div>

              <div className="mt-4 flex items-center gap-2">
                <FeaturedStar
                  active={picks.includes(dest.slug)}
                  disabled={!picks.includes(dest.slug) && picks.length >= FEATURED_LIMIT}
                  label={dest.name}
                  onToggle={() => togglePick(dest.slug)}
                  className="border border-gray-200 rounded-lg p-2"
                />
                <Link
                  href={`/admin/destinations/${dest.slug}/edit`}
                  className="flex-1 flex items-center justify-center gap-1.5 border border-gray-200 rounded-lg py-2 text-xs font-semibold text-gray-700 hover:border-gray-400 hover:text-gray-900 transition-colors"
                >
                  <Pencil className="w-3.5 h-3.5" />
                  Edit
                </Link>
                <Link
                  href={`/admin/destinations/${dest.slug}/preview`}
                  className="p-2 rounded-lg border border-gray-200 text-gray-400 hover:text-gray-900 hover:border-gray-400 transition-colors"
                  aria-label={`Preview ${dest.name}`}
                >
                  <Eye className="w-4 h-4" />
                </Link>
                <button
                  className="p-2 rounded-lg border border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-200 transition-colors"
                  aria-label={`Delete ${dest.name}`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {savedList && (
        <OutputModal
          title="Homepage destinations"
          targetFile="src/data/destinations.ts → featuredDestinationSlugs"
          payload={savedList}
          onClose={() => setSavedList(null)}
        />
      )}

      {filtered.length === 0 && (
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm px-5 py-14 text-center">
          <p className="text-sm font-medium text-gray-900">No destinations match that</p>
          <p className="mt-1 text-xs text-gray-400">Try another region or clear the search.</p>
        </div>
      )}
    </>
  )
}
