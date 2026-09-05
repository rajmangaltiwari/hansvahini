import Link from 'next/link'
import { Mail, Phone } from 'lucide-react'

/** A paragraph, or a bulleted list of points. */
export type LegalBlock = string | { list: string[] }

export type LegalSection = {
  /** Anchor target, also used by the contents rail. */
  id: string
  title: string
  body: LegalBlock[]
}

/**
 * Shared shell for the policy pages — hero, sticky contents rail and the
 * numbered sections. The two documents supply nothing but their own sections,
 * so they stay identical in layout and can never drift apart visually.
 */
export default function LegalDocument({
  eyebrow,
  title,
  intro,
  updated,
  sections,
}: {
  eyebrow: string
  title: string
  intro: string
  /** Human-readable date, e.g. '5 September 2026'. */
  updated: string
  sections: LegalSection[]
}) {
  return (
    <main className="pt-16">

      {/* Hero */}
      <section className="bg-gray-900 py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-gray-400 mb-4" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">{title}</span>
          </nav>

          <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">{eyebrow}</p>
          <h1 className="text-3xl sm:text-5xl font-bold text-white max-w-3xl leading-tight">{title}</h1>
          <p className="mt-4 text-gray-300 text-sm sm:text-base max-w-2xl leading-relaxed">{intro}</p>
          <p className="mt-6 text-xs text-gray-500">Last updated {updated}</p>
        </div>
      </section>

      {/* Contents + body */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-[16rem_1fr] gap-10 lg:gap-14">

          {/* Contents rail — sticks alongside the text from `lg` up */}
          <nav aria-label="Contents" className="lg:sticky lg:top-24 lg:self-start">
            <p className="text-xs font-semibold text-gray-900 uppercase tracking-widest mb-3">Contents</p>
            <ol className="space-y-1.5">
              {sections.map((section, i) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="flex gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors leading-snug"
                  >
                    <span className="text-gray-300 tabular-nums flex-shrink-0">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="min-w-0 max-w-3xl">
            {sections.map((section, i) => (
              <article key={section.id} id={section.id} className="scroll-mt-24 mb-12 last:mb-0">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight mb-4">
                  <span className="text-gray-300 tabular-nums mr-2">{String(i + 1).padStart(2, '0')}</span>
                  {section.title}
                </h2>

                <div className="space-y-4">
                  {section.body.map((block, j) =>
                    typeof block === 'string' ? (
                      <p key={j} className="text-sm text-gray-600 leading-relaxed">{block}</p>
                    ) : (
                      <ul key={j} className="space-y-2">
                        {block.list.map((item) => (
                          <li key={item} className="flex gap-3 text-sm text-gray-600 leading-relaxed">
                            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-gray-300 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    )
                  )}
                </div>
              </article>
            ))}

            {/* Contact block — every policy ends with somewhere to send a question */}
            <div className="mt-14 border border-gray-100 rounded-2xl p-6 bg-gray-50">
              <h2 className="text-sm font-bold text-gray-900 mb-1">Questions about this document?</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                Write to us and we will come back within three working days.
              </p>
              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                <a
                  href="mailto:hello@hansvahini.com"
                  className="inline-flex items-center gap-2 text-sm font-medium text-gray-900 hover:underline"
                >
                  <Mail className="w-4 h-4 text-gray-400" />
                  hello@hansvahini.com
                </a>
                <a
                  href="tel:+919876543210"
                  className="inline-flex items-center gap-2 text-sm font-medium text-gray-900 hover:underline"
                >
                  <Phone className="w-4 h-4 text-gray-400" />
                  +91 98765 43210
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
