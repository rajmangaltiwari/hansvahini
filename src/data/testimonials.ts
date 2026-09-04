// ─────────────────────────────────────────────────────────────────────────────
// Dummy data for the testimonials section, which appears on the homepage, both
// listing pages and both detail pages.
// Each entry names the `trip` it came from, so reviews can later be filtered
// per destination or per package.
// ─────────────────────────────────────────────────────────────────────────────

/** Unsplash placeholder — swap for real photography later. */
const img = (id: string) => `https://images.unsplash.com/photo-${id}?w=800&q=80`

export type Testimonial = {
  id: number
  name: string
  location: string
  /** Out of 5. */
  rating: number
  /** Initials shown in the avatar circle. */
  avatar: string
  text: string
  /** The trip this traveller took. */
  trip: string
  /** Card background photo. */
  image: string
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Priya Sharma',
    location: 'Mumbai',
    rating: 5,
    avatar: 'PS',
    text: 'Hansvahini Expeditions made our Ladakh trip absolutely unforgettable. Every detail was perfectly planned — the accommodations, the itinerary, and especially the local guides. We felt safe and cared for throughout the journey.',
    trip: 'Ladakh Adventure',
    // People trekking / enjoying mountains in Ladakh
    image: img('1500534314209-a25ddb2bd429'),
  },
  {
    id: 2,
    name: 'Rahul Mehta',
    location: 'Delhi',
    rating: 5,
    avatar: 'RM',
    text: 'The Spiti Valley trip was beyond my expectations. The team handled everything from permits to meals with such professionalism. The route they chose was scenic and well-paced. Highly recommended for anyone who loves the mountains.',
    trip: 'Spiti Valley Odyssey',
    // Group of friends hiking in snowy mountains
    image: img('1464822759023-fed622ff2c3b'),
  },
  {
    id: 3,
    name: 'Ananya Iyer',
    location: 'Bengaluru',
    rating: 5,
    avatar: 'AI',
    text: 'We were a family of five including elderly parents. The team was extremely considerate and made sure everyone was comfortable. The Kedarnath Yatra was spiritually enriching and well-organized. Thank you, Hansvahini!',
    trip: 'Kedarnath Yatra',
    // Family / pilgrims enjoying a mountain spiritual journey
    image: img('1502086223501-7ea6ecd79368'),
  },
  {
    id: 4,
    name: 'Vikram Singh',
    location: 'Jaipur',
    rating: 5,
    avatar: 'VS',
    text: 'Second time booking with Hansvahini and they never disappoint. The Manali package was excellent value for money. The campfire evenings and the snow activities were the highlights. Will definitely book again!',
    trip: 'Manali Retreat',
    // People around campfire / enjoying snow
    image: img('1537905569824-f89f14cceb68'),
  },
  {
    id: 5,
    name: 'Deepa Nair',
    location: 'Kochi',
    rating: 5,
    avatar: 'DN',
    text: "A solo female traveller here — I felt completely safe with Hansvahini. The guides were knowledgeable, respectful, and fun. Rishikesh was magical and the rafting experience was thrilling. Couldn't have asked for more.",
    trip: 'Rishikesh & Haridwar',
    // People white water rafting / river adventure
    image: img('1530866495561-507c9faab2ed'),
  },
  {
    id: 6,
    name: 'Amit Gupta',
    location: 'Pune',
    rating: 5,
    avatar: 'AG',
    text: 'The Ranthambore Safari was my dream trip and Hansvahini delivered it perfectly. We spotted a tiger on day one! The naturalist guide was exceptional. The resort they arranged was also top-notch.',
    trip: 'Ranthambore Wildlife Safari',
    // People on a jeep safari / wildlife adventure
    image: img('1516426122078-c23e76319801'),
  },
]

// ── Stats bar shown above the testimonial grid ────────────────────────────────

export const testimonialStats = [
  { value: '5,000+', label: 'Happy Travellers' },
  { value: '150+',   label: 'Destinations'     },
  { value: '10+',    label: 'Years Experience' },
]
