/**
 * Instant fallback for every panel screen.
 *
 * Panel routes are dynamic (session cookie + Supabase), and Next skips
 * prefetching a dynamic route entirely unless it has a loading boundary — so
 * without this file a click on the sidebar left the old page on screen for the
 * whole server round trip. With it, the shell is prefetched and this skeleton
 * paints immediately while the page's queries stream in.
 *
 * Deliberately generic: it sits above leads, packages, destinations and
 * gallery, all of which are a header plus one table-ish card.
 */
export default function PanelLoading() {
  return (
    <div className="animate-pulse">
      {/* Mirrors PageHeader's title / subtitle / action row. */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
        <div>
          <div className="h-7 sm:h-8 w-48 bg-gray-200 rounded-lg" />
          <div className="mt-2 h-4 w-72 max-w-full bg-gray-100 rounded" />
        </div>
        <div className="h-10 w-32 bg-gray-100 rounded-lg flex-shrink-0" />
      </div>

      {/* Filter pills + search, as on the leads and packages screens. */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex flex-wrap gap-2">
          {[64, 72, 88, 92, 68].map((w, i) => (
            <div key={i} style={{ width: w }} className="h-9 bg-gray-100 rounded-full" />
          ))}
        </div>
        <div className="h-10 w-full sm:w-72 bg-gray-100 rounded-lg" />
      </div>

      <section className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-5 py-3.5 border-b border-gray-100">
          <div className="h-3 w-24 bg-gray-100 rounded" />
        </div>
        {Array.from({ length: 6 }).map((_, row) => (
          <div key={row} className="flex items-center gap-4 px-5 py-4 border-b border-gray-50 last:border-0">
            <div className="flex-1 min-w-0">
              <div className="h-4 w-40 max-w-full bg-gray-200 rounded" />
              <div className="mt-2 h-3 w-56 max-w-full bg-gray-100 rounded" />
            </div>
            <div className="hidden md:block h-4 w-24 bg-gray-100 rounded" />
            <div className="hidden lg:block h-4 w-32 bg-gray-100 rounded" />
            <div className="h-6 w-20 bg-gray-100 rounded-full" />
            <div className="hidden sm:block h-4 w-28 bg-gray-100 rounded" />
          </div>
        ))}
      </section>

      <span className="sr-only" role="status">Loading…</span>
    </div>
  )
}
