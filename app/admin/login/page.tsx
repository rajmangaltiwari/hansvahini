import type { Metadata } from 'next'
import { Quote } from 'lucide-react'
import AdminLoginForm from '@/src/admin/AdminLoginForm'

export const metadata: Metadata = {
  title: 'Admin Sign In — Hansvahini Expeditions',
  // Reached by URL only: nothing on the public site links here, and it stays out of search.
  robots: { index: false, follow: false },
}

/** Landscape strip along the bottom of the brand panel. */
const showcase = [
  { url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80', name: 'Ladakh' },
  { url: 'https://images.unsplash.com/photo-1537905569824-f89f14cceb68?w=600&q=80', name: 'Spiti Valley' },
  { url: 'https://images.unsplash.com/photo-1516815231560-8f41ec531527?w=600&q=80', name: 'Andaman' },
]

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">

      {/* ── Left: brand panel. Collapses away below `lg`, where the form takes the full width. ── */}
      <div className="relative hidden lg:flex flex-col justify-between bg-gray-900 p-12 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=1600&q=80"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Two stacked scrims: a vertical one so the top and bottom text clears the photo,
            and a flat one to knock the whole image back behind the type. */}
        <div className="absolute inset-0 bg-gray-900/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-gray-900/80" />

        <div className="relative">
          <div className="flex items-center gap-2.5">
            <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                  d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
              </svg>
            </div>
            <div className="leading-tight">
              <span className="block text-base font-bold text-white tracking-wide uppercase">Hansvahini</span>
              <span className="block text-xs text-gray-400 tracking-[0.2em] uppercase">Expeditions</span>
            </div>
          </div>
        </div>

        <div className="relative max-w-md py-10">
          <h2 className="text-3xl xl:text-4xl font-bold text-white leading-tight tracking-tight">
            Every enquiry, package and photograph — in one place.
          </h2>
          <p className="mt-4 text-sm text-gray-300 leading-relaxed">
            The control room behind the trips. Track leads as they come in, keep itineraries
            and pricing current, and curate the photography that sells them.
          </p>

          <div className="mt-8 flex items-start gap-3 border-l-2 border-white/20 pl-4">
            <Quote className="w-4 h-4 text-gray-500 flex-shrink-0 mt-1" />
            <p className="text-sm text-gray-300 italic leading-relaxed">
              &ldquo;Roads climb over passes higher than any mountain in Europe.&rdquo;
              <span className="not-italic block mt-1 text-xs text-gray-500">— Ladakh, from the field notes</span>
            </p>
          </div>
        </div>

        {/* Landscape strip — fixed aspect so a tall source photo can never stretch a tile */}
        <div className="relative">
          <div className="grid grid-cols-3 gap-3">
            {showcase.map((place) => (
              <figure key={place.name} className="relative aspect-[4/3] rounded-xl overflow-hidden ring-1 ring-white/15">
                <img
                  src={place.url}
                  alt={place.name}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
                <figcaption className="absolute bottom-0 left-0 right-0 px-3 py-2 text-[11px] font-medium text-white truncate">
                  {place.name}
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-3 gap-6 max-w-md">
            {[
              { value: '18',   label: 'Live packages' },
              { value: '10',   label: 'Destinations' },
              { value: '2.4k', label: 'Enquiries a year' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-bold text-white tracking-tight">{stat.value}</p>
                <p className="mt-0.5 text-[11px] text-gray-400 uppercase tracking-wide">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right: the form ── */}
      <div className="flex items-center justify-center bg-white px-6 py-12 sm:px-12">
        <AdminLoginForm />
      </div>
    </div>
  )
}
