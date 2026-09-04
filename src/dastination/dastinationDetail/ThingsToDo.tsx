'use client'

import { useState } from 'react'
import type { ActivityCategory, Destination } from '@/src/data/destinations'
import { activityCategories } from '@/src/data/destinations'

/**
 * Experiences grouped by Adventure / Spiritual / Nature / Culture.
 * The only interactive section on the page, hence the sole 'use client' here.
 */
export default function ThingsToDo({ dest }: { dest: Destination }) {
  const [activeTab, setActiveTab] = useState<ActivityCategory | 'All'>('All')

  const visible =
    activeTab === 'All'
      ? dest.thingsToDo
      : dest.thingsToDo.filter((t) => t.category === activeTab)

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">Experiences</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Things to Do in {dest.name}
          </h2>
          <div className="mt-4 w-12 h-0.5 bg-gray-900 mx-auto" />
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {(['All', ...activityCategories] as const).map((cat) => {
            const count =
              cat === 'All'
                ? dest.thingsToDo.length
                : dest.thingsToDo.filter((t) => t.category === cat).length
            if (count === 0) return null
            const isActive = activeTab === cat
            return (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                aria-pressed={isActive}
                className={`text-sm font-medium px-5 py-2.5 rounded-full border transition-colors ${
                  isActive
                    ? 'bg-gray-900 text-white border-gray-900'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-gray-900'
                }`}
              >
                {cat === 'All' ? 'Everything' : cat}
                <span className="text-gray-400 ml-1.5">{count}</span>
              </button>
            )
          })}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((item) => (
            <article
              key={item.title}
              className="group bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Fixed-height frame + absolute image: the photo can never drive layout */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 bg-gray-900 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow">
                  {item.category}
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-base font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
