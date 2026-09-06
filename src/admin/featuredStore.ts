/**
 * The homepage strip holds exactly six cards.
 *
 * This file used to hold the picks in sessionStorage. They now live in the
 * `featured_picks` table — read by src/lib/queries/featured.ts and written by
 * setFeaturedPicks() — so a selection survives a refresh and is what the public
 * homepage actually renders. Only the limit is still shared from here.
 */
export const FEATURED_LIMIT = 6
