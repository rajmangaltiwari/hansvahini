/**
 * One-off: pushes the destinations and packages currently hardcoded in
 * src/data/*.ts into Supabase.
 *
 *   npm run seed
 *
 * Upserts on `slug`, so it is safe to re-run — it will update existing rows
 * rather than duplicating them. Destinations go first because packages carry a
 * foreign key to destinations.slug.
 *
 * Uses the service-role key: seeding writes published content, which RLS only
 * lets an authenticated admin do, and a script has no session.
 *
 * Seeds CONTENT ONLY — destinations, packages and the homepage picks. Leads are
 * never seeded: the dummy enquiries in src/admin/data/adminData.ts are UI
 * fixtures, and writing them here would put fake people into a real inbox and
 * skew every count on the dashboard. The leads table starts empty and fills up
 * from the live form.
 */

import { loadEnvConfig } from '@next/env'

// Must run before anything reads process.env.
loadEnvConfig(process.cwd())

import { createClient } from '@supabase/supabase-js'
import { destinations } from '../src/data/destinations'
import { travelPackages } from '../src/data/packages'
import { destinationToRow, packageToRow } from '../src/lib/queries/map'

function env(name: string): string {
  const value = process.env[name]
  if (!value) {
    console.error(`\n  Missing ${name}. Copy .env.example to .env.local and fill it in.\n`)
    process.exit(1)
  }
  return value
}

async function main() {
  const supabase = createClient(
    env('NEXT_PUBLIC_SUPABASE_URL'),
    env('SUPABASE_SERVICE_ROLE_KEY'),
    { auth: { persistSession: false } }
  )

  console.log(`Seeding ${destinations.length} destinations…`)
  const { error: destError } = await supabase
    .from('destinations')
    .upsert(destinations.map(destinationToRow), { onConflict: 'slug' })

  if (destError) {
    console.error('  destinations failed:', destError.message)
    process.exit(1)
  }
  console.log('  done.')

  console.log(`Seeding ${travelPackages.length} packages…`)
  const { error: pkgError } = await supabase
    .from('packages')
    .upsert(travelPackages.map(packageToRow), { onConflict: 'slug' })

  if (pkgError) {
    console.error('  packages failed:', pkgError.message)
    process.exit(1)
  }
  console.log('  done.')

  // The homepage picks the front end currently hardcodes.
  const { featuredDestinationSlugs } = await import('../src/data/destinations')
  const { featuredPackageSlugs } = await import('../src/data/packages')

  const picks = [
    ...featuredDestinationSlugs.map((slug, i) => ({ kind: 'destination', slug, position: i })),
    ...featuredPackageSlugs.map((slug, i) => ({ kind: 'package', slug, position: i })),
  ]

  console.log(`Seeding ${picks.length} featured picks…`)
  const { error: pickError } = await supabase
    .from('featured_picks')
    .upsert(picks, { onConflict: 'kind,slug' })

  if (pickError) {
    console.error('  featured picks failed:', pickError.message)
    process.exit(1)
  }
  console.log('  done.\n')

  console.log('Seed complete.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
