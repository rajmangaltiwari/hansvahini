import type { ActivityEntry } from '@/src/lib/queries/stats'

export default function ActivityFeed({ entries }: { entries: ActivityEntry[] }) {
  if (entries.length === 0) {
    return (
      <p className="text-xs text-gray-400 leading-relaxed">
        Nothing has changed yet. Publishing content or replying to an enquiry will show up here.
      </p>
    )
  }

  return (
    <ol className="relative space-y-5">
      {entries.map((entry, i) => (
        <li key={entry.id} className="relative flex gap-3">
          {/* Connector — skipped on the last row so the line stops at the final dot */}
          {i < entries.length - 1 && (
            <span className="absolute left-[5px] top-4 bottom-[-20px] w-px bg-gray-100" aria-hidden="true" />
          )}
          <span className="relative mt-1.5 w-2.5 h-2.5 rounded-full bg-gray-300 ring-4 ring-white flex-shrink-0" />
          <div className="min-w-0">
            <p className="text-xs text-gray-600 leading-relaxed">
              <span className="font-semibold text-gray-900">{entry.actor}</span>{' '}
              {entry.action}{' '}
              <span className="font-medium text-gray-900">{entry.target}</span>
            </p>
            <p className="mt-0.5 text-[11px] text-gray-400">{entry.at}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}
