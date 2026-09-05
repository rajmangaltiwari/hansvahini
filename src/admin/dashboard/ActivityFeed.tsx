import { activityFeed } from '@/src/admin/data/adminData'

export default function ActivityFeed() {
  return (
    <ol className="relative space-y-5">
      {activityFeed.map((entry, i) => (
        <li key={entry.id} className="relative flex gap-3">
          {/* Connector — skipped on the last row so the line stops at the final dot */}
          {i < activityFeed.length - 1 && (
            <span className="absolute left-[5px] top-4 bottom-[-20px] w-px bg-gray-100" aria-hidden="true" />
          )}
          <span className="relative mt-1.5 w-2.5 h-2.5 rounded-full bg-gray-300 ring-4 ring-white flex-shrink-0" />
          <div className="min-w-0">
            <p className="text-xs text-gray-600 leading-relaxed">
              <span className="font-semibold text-gray-900">{entry.actor}</span>{' '}
              {entry.action}{' '}
              <span className="font-medium text-gray-900">{entry.target}</span>
            </p>
            <p className="mt-0.5 text-[11px] text-gray-400">{entry.time}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}
