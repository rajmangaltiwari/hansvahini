/** The white surface every panel block sits on. */
export default function Card({
  title,
  subtitle,
  action,
  padded = true,
  className = '',
  children,
}: {
  title?: string
  subtitle?: string
  action?: React.ReactNode
  /** Off for tables, which manage their own edge-to-edge padding. */
  padded?: boolean
  className?: string
  children: React.ReactNode
}) {
  return (
    <section className={`bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden ${className}`}>
      {title && (
        <div className="flex items-start justify-between gap-3 px-5 py-4 border-b border-gray-100">
          <div>
            <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
            {subtitle && <p className="mt-0.5 text-xs text-gray-400">{subtitle}</p>}
          </div>
          {action}
        </div>
      )}
      <div className={padded ? 'p-5' : ''}>{children}</div>
    </section>
  )
}
