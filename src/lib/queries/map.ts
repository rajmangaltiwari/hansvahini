/**
 * The single translation between Postgres rows (snake_case, nullable) and the
 * TypeScript records the whole app is written against (camelCase, optionals
 * absent rather than null).
 *
 * Keeping it in one file means the DB schema and src/data/*.ts can only drift
 * in a place the compiler is looking at.
 */

import type {
  Attraction,
  Destination,
  Experience,
  GalleryImage,
  HowToReach,
  Region,
  SeasonNote,
  ThingToDo,
} from '@/src/data/destinations'
import type { ItineraryDay, PackageCategory, TravelPackage } from '@/src/data/packages'

/** Rows come back from PostgREST as `any`-ish JSON; narrow at this boundary. */
type Row = Record<string, unknown>

const str = (v: unknown, fallback = '') => (typeof v === 'string' ? v : fallback)
const num = (v: unknown, fallback = 0) => {
  // numeric columns arrive as strings from PostgREST, integers as numbers.
  const n = typeof v === 'string' ? Number(v) : v
  return typeof n === 'number' && Number.isFinite(n) ? n : fallback
}
const list = (v: unknown): string[] => (Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string') : [])
const json = <T,>(v: unknown): T[] => (Array.isArray(v) ? (v as T[]) : [])

/** Optional columns are null in Postgres but absent in the TS records. */
const optional = <T,>(key: string, value: T | null | undefined) =>
  value === null || value === undefined || value === '' ? {} : { [key]: value }

// ─── destinations ────────────────────────────────────────────────────────────

export function rowToDestination(row: Row): Destination {
  const reach = (row.how_to_reach ?? {}) as Partial<HowToReach>

  return {
    slug: str(row.slug),
    name: str(row.name),
    tagline: str(row.tagline),
    heroImage: str(row.hero_image),
    image: str(row.image),
    overview: str(row.overview),
    highlights: list(row.highlights),
    bestTime: str(row.best_time),
    difficulty: str(row.difficulty),
    gallery: json<GalleryImage>(row.gallery),

    attractions: json<Attraction>(row.attractions),
    thingsToDo: json<ThingToDo>(row.things_to_do),
    howToReach: {
      byAir: str(reach.byAir),
      byRail: str(reach.byRail),
      byRoad: str(reach.byRoad),
    },
    seasons: json<SeasonNote>(row.seasons),
    travelTips: list(row.travel_tips),
    localFood: list(row.local_food),

    region: str(row.region) as Region,
    experiences: list(row.experiences) as Experience[],
    blurb: str(row.blurb),
    rating: num(row.rating),
    reviews: num(row.reviews),
    tripCount: num(row.trip_count),
    ...optional('trending', row.trending === true ? true : null),
    ...optional('badge', row.badge as string | null),
    status: row.status === 'draft' ? 'draft' : 'published',
  }
}

export function destinationToRow(dest: Destination): Row {
  return {
    slug: dest.slug,
    name: dest.name,
    tagline: dest.tagline,
    hero_image: dest.heroImage,
    image: dest.image,
    overview: dest.overview,
    blurb: dest.blurb,
    best_time: dest.bestTime,
    difficulty: dest.difficulty,
    region: dest.region,
    highlights: dest.highlights,
    experiences: dest.experiences,
    travel_tips: dest.travelTips,
    local_food: dest.localFood,
    gallery: dest.gallery,
    attractions: dest.attractions,
    things_to_do: dest.thingsToDo,
    seasons: dest.seasons,
    how_to_reach: dest.howToReach,
    rating: dest.rating,
    reviews: dest.reviews,
    trip_count: dest.tripCount,
    trending: dest.trending ?? false,
    badge: dest.badge ?? null,
    // Records that predate drafts carry no status and are live.
    status: dest.status ?? 'published',
  }
}

// ─── packages ────────────────────────────────────────────────────────────────

export function rowToPackage(row: Row): TravelPackage {
  return {
    id: num(row.id),
    slug: str(row.slug),
    title: str(row.title),
    destinationSlug: str(row.destination_slug),
    destinationName: str(row.destination_name),
    region: str(row.region),
    image: str(row.image),
    categories: list(row.categories) as PackageCategory[],
    durationDays: num(row.duration_days),
    durationNights: num(row.duration_nights),
    price: num(row.price),
    ...optional('oldPrice', row.old_price as number | null),
    rating: num(row.rating),
    reviews: num(row.reviews),
    groupSize: str(row.group_size),
    difficulty: str(row.difficulty, 'Easy') as TravelPackage['difficulty'],
    bestTime: str(row.best_time),
    summary: str(row.summary),
    overview: str(row.overview),
    highlights: list(row.highlights),
    itinerary: json<ItineraryDay>(row.itinerary),
    included: list(row.included),
    excluded: list(row.excluded),
    activities: list(row.activities),
    ...optional('badge', row.badge as string | null),
    ...optional('trending', row.trending === true ? true : null),
    status: row.status === 'draft' ? 'draft' : 'published',
  }
}

/**
 * `id` is deliberately omitted — it is a generated identity column now, so the
 * database assigns it. Upserts key on `slug`.
 */
export function packageToRow(pkg: Omit<TravelPackage, 'id'> & { id?: number }): Row {
  return {
    slug: pkg.slug,
    title: pkg.title,
    destination_slug: pkg.destinationSlug,
    destination_name: pkg.destinationName,
    region: pkg.region,
    image: pkg.image,
    categories: pkg.categories,
    duration_days: pkg.durationDays,
    duration_nights: pkg.durationNights,
    price: pkg.price,
    old_price: pkg.oldPrice ?? null,
    rating: pkg.rating,
    reviews: pkg.reviews,
    group_size: pkg.groupSize,
    difficulty: pkg.difficulty,
    best_time: pkg.bestTime,
    summary: pkg.summary,
    overview: pkg.overview,
    highlights: pkg.highlights,
    included: pkg.included,
    excluded: pkg.excluded,
    activities: pkg.activities,
    itinerary: pkg.itinerary,
    badge: pkg.badge ?? null,
    trending: pkg.trending ?? false,
    status: pkg.status ?? 'published',
  }
}
