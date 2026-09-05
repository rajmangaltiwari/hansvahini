'use client'

import { useState, type FormEvent } from 'react'
import {
  travelPackages,
  packageCategories,
  type ItineraryDay,
  type PackageCategory,
  type TravelPackage,
} from '@/src/data/packages'
import { destinations } from '@/src/data/destinations'
import FormSection from '@/src/admin/forms/FormSection'
import FormActions from '@/src/admin/forms/FormActions'
import DraftNotice from '@/src/admin/forms/DraftNotice'
import OutputModal from '@/src/admin/forms/OutputModal'
import { saveDraft, clearDraft } from '@/src/admin/draftStore'
import Repeater from '@/src/admin/forms/Repeater'
import StringList from '@/src/admin/forms/StringList'
import { ChipGroup, Field, SelectInput, TextArea, TextInput, Toggle } from '@/src/admin/forms/Fields'

type Difficulty = TravelPackage['difficulty']

/** Numbers live as strings while typing and are parsed once, on submit. */
type PackageFormState = {
  slug: string
  title: string
  destinationSlug: string
  region: string
  image: string
  categories: PackageCategory[]
  durationDays: string
  durationNights: string
  price: string
  oldPrice: string
  rating: string
  reviews: string
  groupSize: string
  difficulty: Difficulty
  bestTime: string
  summary: string
  overview: string
  highlights: string[]
  itinerary: { day: string; title: string; description: string }[]
  included: string[]
  excluded: string[]
  activities: string[]
  badge: string
  trending: boolean
}

const initialState: PackageFormState = {
  slug: '',
  title: '',
  destinationSlug: destinations[0].slug,
  region: destinations[0].region,
  image: '',
  categories: [],
  durationDays: '',
  durationNights: '',
  price: '',
  oldPrice: '',
  rating: '4.8',
  reviews: '0',
  groupSize: '',
  difficulty: 'Easy',
  bestTime: '',
  summary: '',
  overview: '',
  highlights: [''],
  itinerary: [{ day: '1', title: '', description: '' }],
  included: [''],
  excluded: [''],
  activities: [''],
  badge: '',
  trending: false,
}

const difficultyOptions: { value: Difficulty; label: string }[] = [
  { value: 'Easy',          label: 'Easy' },
  { value: 'Easy–Moderate', label: 'Easy–Moderate' },
  { value: 'Moderate',      label: 'Moderate' },
  { value: 'Challenging',   label: 'Challenging' },
]

const destinationOptions = destinations.map((d) => ({ value: d.slug, label: d.name }))

/** `all` is a filter pseudo-category, not something a package can be tagged with. */
const categoryOptions = packageCategories
  .filter((c) => c.id !== 'all')
  .map((c) => ({ value: c.id as PackageCategory, label: c.label.replace(' Packages', '') }))

/** 'Ladakh High Passes' → 'ladakh-high-passes' */
function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

const clean = (values: string[]) => values.map((v) => v.trim()).filter(Boolean)

/** Turns an existing record back into form state so editing starts prefilled. */
function stateFrom(pkg: TravelPackage): PackageFormState {
  return {
    slug: pkg.slug,
    title: pkg.title,
    destinationSlug: pkg.destinationSlug,
    region: pkg.region,
    image: pkg.image,
    categories: pkg.categories,
    durationDays: String(pkg.durationDays),
    durationNights: String(pkg.durationNights),
    price: String(pkg.price),
    oldPrice: pkg.oldPrice ? String(pkg.oldPrice) : '',
    rating: String(pkg.rating),
    reviews: String(pkg.reviews),
    groupSize: pkg.groupSize,
    difficulty: pkg.difficulty,
    bestTime: pkg.bestTime,
    summary: pkg.summary,
    overview: pkg.overview,
    highlights: pkg.highlights.length ? pkg.highlights : [''],
    itinerary: pkg.itinerary.length
      ? pkg.itinerary.map((d) => ({ day: String(d.day), title: d.title, description: d.description }))
      : [{ day: '1', title: '', description: '' }],
    included: pkg.included.length ? pkg.included : [''],
    excluded: pkg.excluded.length ? pkg.excluded : [''],
    activities: pkg.activities.length ? pkg.activities : [''],
    badge: pkg.badge ?? '',
    trending: pkg.trending ?? false,
  }
}

/**
 * One form for both create and edit — pass `initial` to edit. When the API
 * exists, publish becomes a POST for a new record and a PUT/PATCH for an
 * existing one; the field mapping in buildPackage() is already the request body.
 */
export default function CreatePackages({ initial }: { initial?: TravelPackage }) {
  const isEdit = Boolean(initial)

  const [form, setForm] = useState<PackageFormState>(() => (initial ? stateFrom(initial) : initialState))
  const [created, setCreated] = useState<TravelPackage | null>(null)
  const [draft, setDraft] = useState<{ slug: string; stored: boolean } | null>(null)

  const set = <K extends keyof PackageFormState>(key: K, value: PackageFormState[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }))

  const destination = destinations.find((d) => d.slug === form.destinationSlug)
  // The slug follows the title until someone edits it by hand.
  const slug = form.slug || slugify(form.title)

  function handleDestinationChange(destinationSlug: string) {
    const next = destinations.find((d) => d.slug === destinationSlug)
    setForm((prev) => ({ ...prev, destinationSlug, region: next?.region ?? prev.region }))
  }

  function buildPackage(status: 'draft' | 'published'): TravelPackage {
    return {
      id: initial?.id ?? Math.max(0, ...travelPackages.map((p) => p.id)) + 1,
      slug,
      title: form.title.trim(),
      destinationSlug: form.destinationSlug,
      destinationName: destination?.name ?? '',
      region: form.region.trim(),
      image: form.image.trim(),
      categories: form.categories,
      durationDays: Number(form.durationDays) || 0,
      durationNights: Number(form.durationNights) || 0,
      price: Number(form.price) || 0,
      ...(form.oldPrice.trim() ? { oldPrice: Number(form.oldPrice) } : {}),
      rating: Number(form.rating) || 0,
      reviews: Number(form.reviews) || 0,
      groupSize: form.groupSize.trim(),
      difficulty: form.difficulty,
      bestTime: form.bestTime.trim(),
      summary: form.summary.trim(),
      overview: form.overview.trim(),
      highlights: clean(form.highlights),
      itinerary: form.itinerary
        .filter((d) => d.title.trim() || d.description.trim())
        .map((d, i): ItineraryDay => ({
          day: Number(d.day) || i + 1,
          title: d.title.trim(),
          description: d.description.trim(),
        })),
      included: clean(form.included),
      excluded: clean(form.excluded),
      activities: clean(form.activities),
      ...(form.badge.trim() ? { badge: form.badge.trim() } : {}),
      ...(form.trending ? { trending: true } : {}),
      status,
    }
  }

  function handleSaveDraft() {
    const record = buildPackage('draft')
    const stored = saveDraft('package', record.slug, record)
    setDraft({ slug: record.slug, stored })
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const record = buildPackage('published')
    // Publishing supersedes the draft, so it should not linger in the preview.
    clearDraft('package', record.slug)
    setDraft(null)
    setCreated(record)
  }

  return (
    <>
      {draft && (
        <DraftNotice slug={draft.slug} stored={draft.stored} previewHref={`/admin/packages/${draft.slug}/preview`} />
      )}

      <form onSubmit={handleSubmit} className="space-y-4">

        <FormSection title="Basics" description="What the trip is called and where it goes.">
          <Field label="Title" required htmlFor="pkg-title" className="sm:col-span-2">
            <TextInput
              id="pkg-title"
              value={form.title}
              onChange={(v) => set('title', v)}
              placeholder="Ladakh High Passes Expedition"
            />
          </Field>

          <Field label="Slug" hint="Used in the URL: /packages/<slug>. Left blank, it follows the title." htmlFor="pkg-slug">
            <TextInput id="pkg-slug" value={slug} onChange={(v) => set('slug', slugify(v))} placeholder="ladakh-high-passes" />
          </Field>

          <Field label="Destination" required htmlFor="pkg-destination">
            <SelectInput id="pkg-destination" value={form.destinationSlug} onChange={handleDestinationChange} options={destinationOptions} />
          </Field>

          <Field label="Destination name" hint="Filled from the destination above." htmlFor="pkg-destname">
            <TextInput id="pkg-destname" value={destination?.name ?? ''} onChange={() => {}} disabled />
          </Field>

          <Field label="Region" required htmlFor="pkg-region">
            <TextInput id="pkg-region" value={form.region} onChange={(v) => set('region', v)} placeholder="Himalayas" />
          </Field>

          <Field label="Card image URL" required htmlFor="pkg-image" className="sm:col-span-2">
            <TextInput id="pkg-image" type="url" value={form.image} onChange={(v) => set('image', v)} placeholder="/images/ladakh.jpg" />
          </Field>

          <Field label="Categories" hint="Drives the theme filters on /packages." className="sm:col-span-2">
            <ChipGroup options={categoryOptions} selected={form.categories} onChange={(v) => set('categories', v)} />
          </Field>
        </FormSection>

        <FormSection title="Trip shape" description="Length, price and the practical detail shown on the card.">
          <Field label="Duration — days" required htmlFor="pkg-days">
            <TextInput id="pkg-days" type="number" value={form.durationDays} onChange={(v) => set('durationDays', v)} placeholder="8" />
          </Field>

          <Field label="Duration — nights" required htmlFor="pkg-nights">
            <TextInput id="pkg-nights" type="number" value={form.durationNights} onChange={(v) => set('durationNights', v)} placeholder="7" />
          </Field>

          <Field label="Price (₹)" required hint="Per person, numeric only — formatted by formatPrice()." htmlFor="pkg-price">
            <TextInput id="pkg-price" type="number" value={form.price} onChange={(v) => set('price', v)} placeholder="42000" />
          </Field>

          <Field label="Old price (₹)" hint="Optional — shown struck through." htmlFor="pkg-oldprice">
            <TextInput id="pkg-oldprice" type="number" value={form.oldPrice} onChange={(v) => set('oldPrice', v)} placeholder="48000" />
          </Field>

          <Field label="Rating" hint="0 – 5, one decimal." htmlFor="pkg-rating">
            <TextInput id="pkg-rating" type="number" value={form.rating} onChange={(v) => set('rating', v)} placeholder="4.9" />
          </Field>

          <Field label="Reviews" htmlFor="pkg-reviews">
            <TextInput id="pkg-reviews" type="number" value={form.reviews} onChange={(v) => set('reviews', v)} placeholder="412" />
          </Field>

          <Field label="Group size" required htmlFor="pkg-group">
            <TextInput id="pkg-group" value={form.groupSize} onChange={(v) => set('groupSize', v)} placeholder="6 – 12 travellers" />
          </Field>

          <Field label="Difficulty" required htmlFor="pkg-difficulty">
            <SelectInput id="pkg-difficulty" value={form.difficulty} onChange={(v) => set('difficulty', v)} options={difficultyOptions} />
          </Field>

          <Field label="Best time" required htmlFor="pkg-besttime" className="sm:col-span-2">
            <TextInput id="pkg-besttime" value={form.bestTime} onChange={(v) => set('bestTime', v)} placeholder="June – September" />
          </Field>
        </FormSection>

        <FormSection title="Copy" description="The words that sell the trip.">
          <Field label="Summary" required hint="One line for the package card." htmlFor="pkg-summary" className="sm:col-span-2">
            <TextArea id="pkg-summary" rows={2} value={form.summary} onChange={(v) => set('summary', v)} placeholder="Eight days across the highest motorable passes on earth." />
          </Field>

          <Field label="Overview" required hint="Long-form intro on the package detail page." htmlFor="pkg-overview" className="sm:col-span-2">
            <TextArea id="pkg-overview" rows={6} value={form.overview} onChange={(v) => set('overview', v)} placeholder="What the trip is, who it suits, and what makes it different…" />
          </Field>

          <div className="sm:col-span-2">
            <StringList
              label="Highlights"
              hint="Bullet points on the detail page."
              values={form.highlights}
              onChange={(v) => set('highlights', v)}
              placeholder="Pangong Tso — the lake that changes colour hour by hour"
              addLabel="Add highlight"
            />
          </div>
        </FormSection>

        <FormSection title="Itinerary" description="Day by day, in order.">
          <div className="sm:col-span-2">
            <Repeater
              label="Itinerary days"
              items={form.itinerary}
              onChange={(v) => set('itinerary', v)}
              blank={() => ({ day: String(form.itinerary.length + 1), title: '', description: '' })}
              addLabel="Add a day"
              rowTitle={(item, i) => `Day ${item.day || i + 1}${item.title ? ` — ${item.title}` : ''}`}
            >
              {(item, update) => (
                <>
                  <Field label="Day number">
                    <TextInput type="number" value={item.day} onChange={(v) => update({ day: v })} placeholder="1" />
                  </Field>
                  <Field label="Title">
                    <TextInput value={item.title} onChange={(v) => update({ title: v })} placeholder="Arrive in Leh — acclimatise" />
                  </Field>
                  <Field label="Description" className="sm:col-span-2">
                    <TextArea rows={3} value={item.description} onChange={(v) => update({ description: v })} placeholder="What happens on this day, where you sleep, how far you travel." />
                  </Field>
                </>
              )}
            </Repeater>
          </div>
        </FormSection>

        <FormSection title="Inclusions & activities" description="What the price covers, and what it does not.">
          <StringList
            label="Included"
            values={form.included}
            onChange={(v) => set('included', v)}
            placeholder="All accommodation on twin-share"
            addLabel="Add inclusion"
          />
          <StringList
            label="Excluded"
            values={form.excluded}
            onChange={(v) => set('excluded', v)}
            placeholder="Flights to and from Leh"
            addLabel="Add exclusion"
          />
          <div className="sm:col-span-2">
            <StringList
              label="Activities"
              hint="Shown as chips on the detail page."
              values={form.activities}
              onChange={(v) => set('activities', v)}
              placeholder="High-pass driving"
              addLabel="Add activity"
            />
          </div>
        </FormSection>

        <FormSection title="Listing flags" description="Optional badges that change how the card looks.">
          <Field label="Badge" hint="Short label on the card, e.g. Bestseller." htmlFor="pkg-badge">
            <TextInput id="pkg-badge" value={form.badge} onChange={(v) => set('badge', v)} placeholder="Bestseller" />
          </Field>
          <div className="flex items-end pb-2">
            <Toggle
              label="Mark as trending"
              description="Surfaces the package in trending strips."
              checked={form.trending}
              onChange={(v) => set('trending', v)}
            />
          </div>
        </FormSection>

        <FormActions
          cancelHref="/admin/packages"
          submitLabel={isEdit ? 'Publish changes' : 'Publish package'}
          onSaveDraft={handleSaveDraft}
          previewHref={draft || isEdit ? `/admin/packages/${slug}/preview` : undefined}
          note="No backend yet — drafts are held in this browser and publishing shows the record to paste into the data file."
        />
      </form>

      {created && (
        <OutputModal
          title={isEdit ? 'Updated package record' : 'Package record'}
          targetFile="src/data/packages.ts → travelPackages"
          payload={created}
          onClose={() => setCreated(null)}
        />
      )}
    </>
  )
}
