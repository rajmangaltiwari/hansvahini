'use client'

import { useState, type FormEvent } from 'react'
import {
  activityCategories,
  destinations,
  knownExperiences,
  regions,
  type ActivityCategory,
  type Attraction,
  type Destination,
  type Experience,
  type Region,
} from '@/src/data/destinations'
import FormSection from '@/src/admin/forms/FormSection'
import FormActions from '@/src/admin/forms/FormActions'
import DraftNotice from '@/src/admin/forms/DraftNotice'
import OutputModal from '@/src/admin/forms/OutputModal'
import { saveDraft, clearDraft } from '@/src/admin/draftStore'
import ImageField from '@/src/admin/forms/ImageField'
import Repeater from '@/src/admin/forms/Repeater'
import StringList from '@/src/admin/forms/StringList'
import { ChipGroup, Field, SelectInput, TextArea, TextInput, Toggle } from '@/src/admin/forms/Fields'

type AttractionCategory = Attraction['category']

/** Numbers live as strings while typing and are parsed once, on submit. */
type DestinationFormState = {
  slug: string
  name: string
  tagline: string
  heroImage: string
  image: string
  overview: string
  blurb: string
  highlights: string[]
  bestTime: string
  difficulty: string
  region: Region
  experiences: Experience[]
  rating: string
  reviews: string
  tripCount: string
  trending: boolean
  badge: string
  gallery: { url: string; caption: string }[]
  attractions: { name: string; category: AttractionCategory; image: string; description: string; timeNeeded: string }[]
  thingsToDo: { category: ActivityCategory; image: string; title: string; description: string }[]
  byAir: string
  byRail: string
  byRoad: string
  seasons: { season: string; months: string; note: string }[]
  travelTips: string[]
  localFood: string[]
}

/** Row shapes for the object-array editors — annotating blank() keeps the literal unions. */
type AttractionRow = DestinationFormState['attractions'][number]
type ThingToDoRow = DestinationFormState['thingsToDo'][number]

const initialState: DestinationFormState = {
  slug: '',
  name: '',
  tagline: '',
  heroImage: '',
  image: '',
  overview: '',
  blurb: '',
  highlights: [''],
  bestTime: '',
  difficulty: 'Easy',
  region: 'Himalayas',
  experiences: [],
  rating: '4.8',
  reviews: '0',
  tripCount: '0',
  trending: false,
  badge: '',
  gallery: [{ url: '', caption: '' }],
  attractions: [{ name: '', category: 'Sightseeing', image: '', description: '', timeNeeded: '' }],
  thingsToDo: [{ category: 'Adventure', image: '', title: '', description: '' }],
  byAir: '',
  byRail: '',
  byRoad: '',
  seasons: [{ season: '', months: '', note: '' }],
  travelTips: [''],
  localFood: [''],
}

// `regions` opens with an 'All' filter entry — not a real value.
const regionOptions = regions
  .filter((r): r is Region => r !== 'All')
  .map((r) => ({ value: r, label: r }))

const experienceOptions = knownExperiences.map((e) => ({ value: e as Experience, label: e }))

const difficultyOptions = ['Easy', 'Easy–Moderate', 'Moderate', 'Challenging'].map((d) => ({ value: d, label: d }))

const attractionCategories: AttractionCategory[] = ['Sightseeing', 'Adventure', 'Spiritual', 'Nature', 'Culture']
const attractionCategoryOptions = attractionCategories.map((c) => ({ value: c, label: c }))
const activityCategoryOptions = activityCategories.map((c) => ({ value: c, label: c }))

/** 'Spiti Valley' → 'spiti-valley' */
function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

const clean = (values: string[]) => values.map((v) => v.trim()).filter(Boolean)

const orBlank = <T,>(list: T[], blank: T): T[] => (list.length ? list : [blank])

/** Turns an existing record back into form state so editing starts prefilled. */
function stateFrom(dest: Destination): DestinationFormState {
  return {
    slug: dest.slug,
    name: dest.name,
    tagline: dest.tagline,
    heroImage: dest.heroImage,
    image: dest.image,
    overview: dest.overview,
    blurb: dest.blurb,
    highlights: orBlank(dest.highlights, ''),
    bestTime: dest.bestTime,
    difficulty: dest.difficulty,
    region: dest.region,
    experiences: dest.experiences,
    rating: String(dest.rating),
    reviews: String(dest.reviews),
    tripCount: String(dest.tripCount),
    trending: dest.trending ?? false,
    badge: dest.badge ?? '',
    gallery: orBlank(dest.gallery.map((g) => ({ url: g.url, caption: g.caption })), { url: '', caption: '' }),
    attractions: orBlank(
      dest.attractions.map((a) => ({ ...a })),
      { name: '', category: 'Sightseeing', image: '', description: '', timeNeeded: '' }
    ),
    thingsToDo: orBlank(
      dest.thingsToDo.map((t) => ({ ...t })),
      { category: 'Adventure', image: '', title: '', description: '' }
    ),
    byAir: dest.howToReach.byAir,
    byRail: dest.howToReach.byRail,
    byRoad: dest.howToReach.byRoad,
    seasons: orBlank(dest.seasons.map((s) => ({ ...s })), { season: '', months: '', note: '' }),
    travelTips: orBlank(dest.travelTips, ''),
    localFood: orBlank(dest.localFood, ''),
  }
}

/**
 * One form for both create and edit — pass `initial` to edit. When the API
 * exists, publish becomes a POST for a new record and a PUT/PATCH for an
 * existing one; the field mapping in buildDestination() is already the body.
 */
export default function CreateDestination({ initial }: { initial?: Destination }) {
  const isEdit = Boolean(initial)

  const [form, setForm] = useState<DestinationFormState>(() => (initial ? stateFrom(initial) : initialState))
  const [created, setCreated] = useState<Destination | null>(null)
  const [draft, setDraft] = useState<{ slug: string; stored: boolean } | null>(null)

  const set = <K extends keyof DestinationFormState>(key: K, value: DestinationFormState[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }))

  // The slug follows the name until someone edits it by hand.
  const slug = form.slug || slugify(form.name)

  function buildDestination(status: 'draft' | 'published'): Destination {
    return {
      slug,
      name: form.name.trim(),
      tagline: form.tagline.trim(),
      heroImage: form.heroImage.trim(),
      image: form.image.trim(),
      overview: form.overview.trim(),
      highlights: clean(form.highlights),
      bestTime: form.bestTime.trim(),
      difficulty: form.difficulty,
      gallery: form.gallery
        .filter((g) => g.url.trim())
        .map((g) => ({ url: g.url.trim(), caption: g.caption.trim() })),
      attractions: form.attractions
        .filter((a) => a.name.trim())
        .map((a) => ({
          name: a.name.trim(),
          category: a.category,
          image: a.image.trim(),
          description: a.description.trim(),
          timeNeeded: a.timeNeeded.trim(),
        })),
      thingsToDo: form.thingsToDo
        .filter((t) => t.title.trim())
        .map((t) => ({
          category: t.category,
          image: t.image.trim(),
          title: t.title.trim(),
          description: t.description.trim(),
        })),
      howToReach: {
        byAir: form.byAir.trim(),
        byRail: form.byRail.trim(),
        byRoad: form.byRoad.trim(),
      },
      seasons: form.seasons
        .filter((s) => s.season.trim())
        .map((s) => ({ season: s.season.trim(), months: s.months.trim(), note: s.note.trim() })),
      travelTips: clean(form.travelTips),
      localFood: clean(form.localFood),
      region: form.region,
      experiences: form.experiences,
      blurb: form.blurb.trim(),
      rating: Number(form.rating) || 0,
      reviews: Number(form.reviews) || 0,
      tripCount: Number(form.tripCount) || 0,
      ...(form.trending ? { trending: true } : {}),
      ...(form.badge.trim() ? { badge: form.badge.trim() } : {}),
      status,
    }
  }

  function handleSaveDraft() {
    const record = buildDestination('draft')
    const stored = saveDraft('destination', record.slug, record)
    setDraft({ slug: record.slug, stored })
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const record = buildDestination('published')
    // Publishing supersedes the draft, so it should not linger in the preview.
    clearDraft('destination', record.slug)
    setDraft(null)
    setCreated(record)
  }

  return (
    <>
      {draft && (
        <DraftNotice slug={draft.slug} stored={draft.stored} previewHref={`/admin/destinations/${draft.slug}/preview`} />
      )}

      <form onSubmit={handleSubmit} className="space-y-4">

        <FormSection title="Basics" description="Identity and the two images the place is shown with.">
          <Field label="Name" required htmlFor="dest-name">
            <TextInput id="dest-name" value={form.name} onChange={(v) => set('name', v)} placeholder="Spiti Valley" />
          </Field>

          <Field label="Slug" hint="Used in the URL: /destination/<slug>." htmlFor="dest-slug">
            <TextInput id="dest-slug" value={slug} onChange={(v) => set('slug', slugify(v))} placeholder="spiti" />
          </Field>

          <Field label="Tagline" required hint="Short epithet under the name, e.g. The Middle Land." htmlFor="dest-tagline">
            <TextInput id="dest-tagline" value={form.tagline} onChange={(v) => set('tagline', v)} placeholder="The Middle Land" />
          </Field>

          <Field label="Region" required htmlFor="dest-region">
            <SelectInput id="dest-region" value={form.region} onChange={(v) => set('region', v)} options={regionOptions} />
          </Field>

          <Field label="Hero image" required hint="Full-bleed banner on the detail page." htmlFor="dest-hero">
            <ImageField id="dest-hero" value={form.heroImage} onChange={(v) => set('heroImage', v)} placeholder="/images/spiti.jpg" folder={slug} />
          </Field>

          <Field label="Card image" required hint="Used in listing grids." htmlFor="dest-image">
            <ImageField id="dest-image" value={form.image} onChange={(v) => set('image', v)} placeholder="/images/spiti.jpg" folder={slug} />
          </Field>

          <Field
            label="Experiences"
            hint="Shown on the card and the detail page. A new one you add here works straight away; add it to knownExperiences in src/data/destinations.ts to give it a filter option on /destination too."
            className="sm:col-span-2"
          >
            <ChipGroup
              options={experienceOptions}
              selected={form.experiences}
              onChange={(v) => set('experiences', v)}
              allowCustom
              addPlaceholder="New experience…"
            />
          </Field>
        </FormSection>

        <FormSection title="Copy" description="How the place is described, short and long.">
          <Field label="Blurb" required hint="One line for the destination card." htmlFor="dest-blurb" className="sm:col-span-2">
            <TextArea id="dest-blurb" rows={2} value={form.blurb} onChange={(v) => set('blurb', v)} placeholder="The cold desert — monasteries above 4,000m and skies with no light pollution." />
          </Field>

          <Field label="Overview" required hint="Long-form introduction on the detail page." htmlFor="dest-overview" className="sm:col-span-2">
            <TextArea id="dest-overview" rows={6} value={form.overview} onChange={(v) => set('overview', v)} placeholder="What the place is, what it feels like, and what it asks of visitors…" />
          </Field>

          <div className="sm:col-span-2">
            <StringList
              label="Highlights"
              hint="What the place is known for — not trip inclusions."
              values={form.highlights}
              onChange={(v) => set('highlights', v)}
              placeholder="Key Monastery, a thousand years old at 4,166m"
              addLabel="Add highlight"
            />
          </div>
        </FormSection>

        <FormSection title="Visiting" description="When to come and how hard it is.">
          <Field label="Best time" required htmlFor="dest-besttime">
            <TextInput id="dest-besttime" value={form.bestTime} onChange={(v) => set('bestTime', v)} placeholder="June – September" />
          </Field>

          <Field label="Difficulty" required htmlFor="dest-difficulty">
            <SelectInput id="dest-difficulty" value={form.difficulty} onChange={(v) => set('difficulty', v)} options={difficultyOptions} />
          </Field>
        </FormSection>

        <FormSection title="Attractions" description="Named places inside the destination — temples, lakes, passes, forts.">
          <div className="sm:col-span-2">
            <Repeater
              label="Attractions"
              items={form.attractions}
              onChange={(v) => set('attractions', v)}
              blank={(): AttractionRow => ({ name: '', category: 'Sightseeing', image: '', description: '', timeNeeded: '' })}
              addLabel="Add an attraction"
              rowTitle={(item, i) => item.name || `Attraction ${i + 1}`}
            >
              {(item, update) => (
                <>
                  <Field label="Name">
                    <TextInput value={item.name} onChange={(v) => update({ name: v })} placeholder="Key Monastery" />
                  </Field>
                  <Field label="Category">
                    <SelectInput value={item.category} onChange={(v) => update({ category: v })} options={attractionCategoryOptions} />
                  </Field>
                  <Field label="Image">
                    <ImageField value={item.image} onChange={(v) => update({ image: v })} folder={slug} />
                  </Field>
                  <Field label="Time needed" hint="e.g. 2 hours, Half day.">
                    <TextInput value={item.timeNeeded} onChange={(v) => update({ timeNeeded: v })} placeholder="2 hours" />
                  </Field>
                  <Field label="Description" className="sm:col-span-2">
                    <TextArea rows={3} value={item.description} onChange={(v) => update({ description: v })} placeholder="What it is and why it is worth the detour." />
                  </Field>
                </>
              )}
            </Repeater>
          </div>
        </FormSection>

        <FormSection title="Things to do" description="Grouped on the detail page under Adventure, Spiritual, Nature and Culture.">
          <div className="sm:col-span-2">
            <Repeater
              label="Things to do"
              items={form.thingsToDo}
              onChange={(v) => set('thingsToDo', v)}
              blank={(): ThingToDoRow => ({ category: 'Adventure', image: '', title: '', description: '' })}
              addLabel="Add a thing to do"
              rowTitle={(item, i) => item.title || `Activity ${i + 1}`}
            >
              {(item, update) => (
                <>
                  <Field label="Title">
                    <TextInput value={item.title} onChange={(v) => update({ title: v })} placeholder="Camp at Chandratal" />
                  </Field>
                  <Field label="Category">
                    <SelectInput value={item.category} onChange={(v) => update({ category: v })} options={activityCategoryOptions} />
                  </Field>
                  <Field label="Image" className="sm:col-span-2">
                    <ImageField value={item.image} onChange={(v) => update({ image: v })} folder={slug} />
                  </Field>
                  <Field label="Description" className="sm:col-span-2">
                    <TextArea rows={3} value={item.description} onChange={(v) => update({ description: v })} placeholder="What the experience involves and when it runs." />
                  </Field>
                </>
              )}
            </Repeater>
          </div>
        </FormSection>

        <FormSection title="How to reach" description="One paragraph per route — all three are shown on the detail page.">
          <Field label="By air" required htmlFor="dest-byair" className="sm:col-span-2">
            <TextArea id="dest-byair" rows={2} value={form.byAir} onChange={(v) => set('byAir', v)} placeholder="Nearest airport, which cities fly there, and any seasonal caveats." />
          </Field>
          <Field label="By rail" required htmlFor="dest-byrail" className="sm:col-span-2">
            <TextArea id="dest-byrail" rows={2} value={form.byRail} onChange={(v) => set('byRail', v)} placeholder="Nearest railhead and the onward journey from it." />
          </Field>
          <Field label="By road" required htmlFor="dest-byroad" className="sm:col-span-2">
            <TextArea id="dest-byroad" rows={2} value={form.byRoad} onChange={(v) => set('byRoad', v)} placeholder="Highways, distances, drive times and when they close." />
          </Field>
        </FormSection>

        <FormSection title="Seasons" description="What each part of the year is like.">
          <div className="sm:col-span-2">
            <Repeater
              label="Season notes"
              items={form.seasons}
              onChange={(v) => set('seasons', v)}
              blank={() => ({ season: '', months: '', note: '' })}
              addLabel="Add a season"
              rowTitle={(item, i) => item.season || `Season ${i + 1}`}
            >
              {(item, update) => (
                <>
                  <Field label="Season">
                    <TextInput value={item.season} onChange={(v) => update({ season: v })} placeholder="Peak" />
                  </Field>
                  <Field label="Months">
                    <TextInput value={item.months} onChange={(v) => update({ months: v })} placeholder="June – September" />
                  </Field>
                  <Field label="Note" className="sm:col-span-2">
                    <TextArea rows={2} value={item.note} onChange={(v) => update({ note: v })} placeholder="What is open, what is shut, and how busy it gets." />
                  </Field>
                </>
              )}
            </Repeater>
          </div>
        </FormSection>

        <FormSection title="Gallery" description="Photos for the bento grid on the detail page.">
          <div className="sm:col-span-2">
            <Repeater
              label="Gallery images"
              hint="The first image takes the large 2×2 tile."
              items={form.gallery}
              onChange={(v) => set('gallery', v)}
              blank={() => ({ url: '', caption: '' })}
              addLabel="Add a photo"
              rowTitle={(item, i) => item.caption || `Photo ${i + 1}`}
            >
              {(item, update) => (
                <>
                  <Field label="Image">
                    <ImageField value={item.url} onChange={(v) => update({ url: v })} folder={slug} />
                  </Field>
                  <Field label="Caption">
                    <TextInput value={item.caption} onChange={(v) => update({ caption: v })} placeholder="Key Monastery at golden hour" />
                  </Field>
                </>
              )}
            </Repeater>
          </div>
        </FormSection>

        <FormSection title="Practical notes" description="The advice and the food.">
          <StringList
            label="Travel tips"
            values={form.travelTips}
            onChange={(v) => set('travelTips', v)}
            placeholder="There is one ATM in Kaza and it fails often. Carry cash."
            addLabel="Add tip"
            multiline
          />
          <StringList
            label="Local food"
            values={form.localFood}
            onChange={(v) => set('localFood', v)}
            placeholder="Thukpa — hand-pulled noodle soup"
            addLabel="Add dish"
          />
        </FormSection>

        <FormSection title="Listing metadata" description="Figures and flags that drive the cards, filters and sorting.">
          <Field label="Rating" hint="0 – 5, one decimal." htmlFor="dest-rating">
            <TextInput id="dest-rating" type="number" value={form.rating} onChange={(v) => set('rating', v)} placeholder="4.9" />
          </Field>

          <Field label="Reviews" htmlFor="dest-reviews">
            <TextInput id="dest-reviews" type="number" value={form.reviews} onChange={(v) => set('reviews', v)} placeholder="243" />
          </Field>

          <Field label="Trip count" hint="How many packages run here — keep in sync with packages.ts." htmlFor="dest-tripcount">
            <TextInput id="dest-tripcount" type="number" value={form.tripCount} onChange={(v) => set('tripCount', v)} placeholder="3" />
          </Field>

          <Field label="Badge" hint="Optional label on the card, e.g. For Explorers." htmlFor="dest-badge">
            <TextInput id="dest-badge" value={form.badge} onChange={(v) => set('badge', v)} placeholder="For Explorers" />
          </Field>

          <div className="sm:col-span-2">
            <Toggle
              label="Mark as trending"
              description="Surfaces the destination in trending strips on the homepage."
              checked={form.trending}
              onChange={(v) => set('trending', v)}
            />
          </div>
        </FormSection>

        <FormActions
          cancelHref="/admin/destinations"
          submitLabel={isEdit ? 'Publish changes' : 'Publish destination'}
          onSaveDraft={handleSaveDraft}
          previewHref={draft || isEdit ? `/admin/destinations/${slug}/preview` : undefined}
          note={`No backend yet — drafts are held in this browser. ${destinations.length} destinations live.`}
        />
      </form>

      {created && (
        <OutputModal
          title={isEdit ? 'Updated destination record' : 'Destination record'}
          targetFile="src/data/destinations.ts → destinations"
          payload={created}
          onClose={() => setCreated(null)}
        />
      )}
    </>
  )
}
