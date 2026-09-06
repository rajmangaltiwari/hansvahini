'use client'

import { useMemo, useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Eye, Pencil, Search, Star, Trash2 } from 'lucide-react'
import FeaturedBar, { FeaturedStar } from '@/src/admin/FeaturedBar'
import { FEATURED_LIMIT } from '@/src/admin/featuredStore'
import { setFeaturedPicks } from '@/src/server/actions/featured'
import { deletePackage } from '@/src/server/actions/packages'
import ConfirmDialog from '@/src/admin/ui/ConfirmDialog'
import {
  packageCategories,
  formatPrice,
  type PackageCategory,
  type TravelPackage,
} from '@/src/data/packages'

/** The list and the current homepage picks arrive as props — this cannot query. */
export default function PackagesTable({
  packages,
  featured,
}: {
  packages: TravelPackage[]
  featured: string[]
}) {
  const titleFor = (slug: string) => packages.find((p) => p.slug === slug)?.title ?? slug

  const router = useRouter()
  const [category, setCategory] = useState<PackageCategory | 'all'>('all')
  /** Publication state is a separate axis from theme, so it gets its own tabs. */
  const [status, setStatus] = useState<'all' | 'published' | 'draft'>('all')
  const [query, setQuery]   = useState('')

  /** The row awaiting confirmation, or null when the dialog is closed. */
  const [confirming, setConfirming] = useState<{ slug: string; label: string } | null>(null)
  const [pending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  // Seeded from the picks stored in the database.
  const [saved, setSaved] = useState<string[]>(featured)
  const [picks, setPicks] = useState<string[]>(featured)

  const dirty = picks.length !== saved.length || picks.some((slug, i) => slug !== saved[i])

  function togglePick(slug: string) {
    setPicks((prev) => {
      if (prev.includes(slug)) return prev.filter((s) => s !== slug)
      if (prev.length >= FEATURED_LIMIT) return prev
      return [...prev, slug]
    })
  }

  function handleSave() {
    setError(null)
    startTransition(async () => {
      const result = await setFeaturedPicks('package', picks)
      if (!result.ok) {
        setError(result.error ?? 'Those picks could not be saved.')
        return
      }
      setSaved(picks)
      router.refresh()
    })
  }

  function confirmRemove() {
    if (!confirming) return
    const { slug } = confirming

    setError(null)
    startTransition(async () => {
      const result = await deletePackage(slug)
      setConfirming(null)

      if (!result.ok) {
        setError(result.error ?? 'That package could not be deleted.')
        return
      }
      router.refresh()
    })
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()

    return packages.filter((pkg) => {
      if (category !== 'all' && !pkg.categories.includes(category)) return false
      // Records that predate drafts carry no status and count as published.
      if (status !== 'all' && (pkg.status ?? 'published') !== status) return false
      if (!q) return true
      return `${pkg.title} ${pkg.destinationName} ${pkg.region}`.toLowerCase().includes(q)
    })
  }, [packages, category, status, query])

  const countFor = (id: 'all' | 'published' | 'draft') =>
    id === 'all' ? packages.length : packages.filter((p) => (p.status ?? 'published') === id).length

  return (
    <>
      <FeaturedBar
        picks={picks}
        labelFor={titleFor}
        onRemove={togglePick}
        onReset={() => setPicks(saved)}
        onSave={handleSave}
        dirty={dirty}
      />

      {error && (
        <p className="mb-3 text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
          {error}
        </p>
      )}

      {/* Publication state — a separate axis from the theme chips below. */}
      <div className="flex items-center gap-1.5 mb-3">
        {([
          { id: 'all', label: 'All' },
          { id: 'published', label: 'Published' },
          { id: 'draft', label: 'Drafts' },
        ] as const).map((tab) => (
          <button
            key={tab.id}
            onClick={() => setStatus(tab.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              status === tab.id
                ? 'bg-gray-900 text-white'
                : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-400 hover:text-gray-900'
            }`}
          >
            {tab.label}
            <span className={status === tab.id ? 'ml-1.5 text-gray-400' : 'ml-1.5 text-gray-300'}>
              {countFor(tab.id)}
            </span>
          </button>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row lg:items-center gap-3 mb-4">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {/* packageCategories already opens with an 'all' entry — do not prepend another. */}
          {packageCategories.map((tab) => {
            const active = category === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setCategory(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  active
                    ? 'bg-gray-900 text-white'
                    : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-400 hover:text-gray-900'
                }`}
              >
                {tab.label.replace(' Packages', '')}
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
            placeholder="Search packages…"
            className="w-full bg-white border border-gray-200 rounded-lg pl-9 pr-3 py-2 text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:border-gray-400 transition-colors"
          />
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[760px]">
            <thead className="bg-gray-50">
              <tr className="text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wide">
                <th className="pl-5 pr-2 py-3 font-semibold">Home</th>
                <th className="px-5 py-3 font-semibold">Package</th>
                <th className="px-5 py-3 font-semibold">Destination</th>
                <th className="px-5 py-3 font-semibold">Duration</th>
                <th className="px-5 py-3 font-semibold">Price</th>
                <th className="px-5 py-3 font-semibold hidden lg:table-cell">Rating</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((pkg) => (
                <tr key={pkg.slug} className="hover:bg-gray-50 transition-colors">
                  <td className="pl-5 pr-2 py-3">
                    <FeaturedStar
                      active={picks.includes(pkg.slug)}
                      disabled={!picks.includes(pkg.slug) && picks.length >= FEATURED_LIMIT}
                      label={pkg.title}
                      onToggle={() => togglePick(pkg.slug)}
                    />
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      {/* Fixed box + object-cover so a tall source photo can't stretch the row */}
                      <span className="relative w-14 h-10 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                        <img src={pkg.image} alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                      </span>
                      <div className="min-w-0">
                        <p className="font-medium text-gray-900 truncate max-w-[220px]">{pkg.title}</p>
                        <p className="text-xs text-gray-400 truncate max-w-[220px]">/{pkg.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-gray-600 whitespace-nowrap">{pkg.destinationName}</td>
                  <td className="px-5 py-3 text-gray-600 whitespace-nowrap">{pkg.durationDays}D / {pkg.durationNights}N</td>
                  <td className="px-5 py-3 font-medium text-gray-900 whitespace-nowrap">{formatPrice(pkg.price)}</td>
                  <td className="px-5 py-3 hidden lg:table-cell">
                    <span className="inline-flex items-center gap-1 text-gray-600 whitespace-nowrap">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      {pkg.rating}
                      <span className="text-xs text-gray-400">({pkg.reviews})</span>
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    {/* A record with no status predates drafts, so it is live. */}
                    {(pkg.status ?? 'published') === 'draft' ? (
                      <span className="inline-flex items-center text-[11px] font-semibold px-2 py-0.5 rounded-full border bg-amber-50 text-amber-700 border-amber-100">
                        Draft
                      </span>
                    ) : (
                      <span className="inline-flex items-center text-[11px] font-semibold px-2 py-0.5 rounded-full border bg-emerald-50 text-emerald-700 border-emerald-100">
                        Published
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/admin/packages/${pkg.slug}/preview`}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                        aria-label={`Preview ${pkg.title}`}
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <Link
                        href={`/admin/packages/${pkg.slug}/edit`}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                        aria-label={`Edit ${pkg.title}`}
                      >
                        <Pencil className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => setConfirming({ slug: pkg.slug, label: pkg.title })}
                        disabled={pending}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 disabled:opacity-40 transition-colors"
                        aria-label={`Delete ${pkg.title}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 ? (
          <div className="px-5 py-14 text-center">
            <p className="text-sm font-medium text-gray-900">No packages match that</p>
            <p className="mt-1 text-xs text-gray-400">Try another category or clear the search.</p>
          </div>
        ) : (
          <div className="px-5 py-3 border-t border-gray-100">
            <p className="text-xs text-gray-400">Showing {filtered.length} of {packages.length} packages</p>
          </div>
        )}
      </div>


      <ConfirmDialog
        open={confirming !== null}
        title={`Delete this package?`}
        message={`“${confirming?.label ?? ''}” will be removed permanently. This cannot be undone.`}
        busy={pending}
        onConfirm={confirmRemove}
        onCancel={() => setConfirming(null)}
      />
    </>
  )
}
