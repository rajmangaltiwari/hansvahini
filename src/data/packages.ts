// ─────────────────────────────────────────────────────────────────────────────
// Dummy data for the Packages pages.
// A *package* is a bookable trip: it owns the price, the day-by-day itinerary
// and the inclusions. A *destination* (src/data/destinations.ts) is the place
// itself and owns no pricing — see fromPrice() for the derived "from" figure.
// ─────────────────────────────────────────────────────────────────────────────

export type PackageCategory =
  | 'family'
  | 'honeymoon'
  | 'adventure'
  | 'pilgrimage'
  | 'wildlife'
  | 'beach'
  | 'weekend'
  | 'luxury'
  | 'solo'
  | 'group'

export type ItineraryDay = {
  day: number
  title: string
  description: string
}

export type TravelPackage = {
  id: number
  slug: string
  title: string
  /** Links to the place guide at /destination/[slug] */
  destinationSlug: string
  destinationName: string
  region: string
  image: string
  categories: PackageCategory[]
  durationDays: number
  durationNights: number
  /** Numeric so budget filtering / sorting works. Format with formatPrice(). */
  price: number
  /** Struck-through "was" price. */
  oldPrice?: number
  rating: number
  reviews: number
  groupSize: string
  difficulty: 'Easy' | 'Easy–Moderate' | 'Moderate' | 'Challenging'
  bestTime: string
  /** One-liner for cards. */
  summary: string
  /** Long-form intro on the package detail page. */
  overview: string
  highlights: string[]
  itinerary: ItineraryDay[]
  included: string[]
  excluded: string[]
  activities: string[]
  badge?: string
  trending?: boolean
  /** Absent means published — every entry below predates drafts and stays live. */
  status?: 'draft' | 'published'
}

export const travelPackages: TravelPackage[] = [
  {
    id: 1,
    slug: 'ladakh-high-passes-expedition',
    title: 'Ladakh High Passes Expedition',
    destinationSlug: 'ladakh',
    destinationName: 'Ladakh',
    region: 'Himalayas',
    image: '/images/ladakh.jpg',
    categories: ['adventure', 'group', 'solo'],
    durationDays: 8,
    durationNights: 7,
    price: 28999,
    oldPrice: 34999,
    rating: 4.9,
    reviews: 412,
    groupSize: '2–16 people',
    difficulty: 'Moderate',
    bestTime: 'June – September',
    summary:
      'Eight days across the highest motorable roads on earth — Khardung La, Pangong Tso and the silver dunes of Nubra, with two full days built in for acclimatisation.',
    overview:
      'This is the classic Ladakh circuit, run the way altitude demands rather than the way a brochure would like. You spend the first two days doing almost nothing in Leh, because the difference between a good trip and a miserable one at 3,500m is whether you gave your body time. From there the route climbs over Khardung La into Nubra, crosses the Shyok to Pangong, and returns via Chang La — three passes above 5,000m in six days, broken up by monasteries, sand dunes and a free day beside the bluest water in India.',
    highlights: [
      'Pangong Tso overnight in a lakeside camp',
      'Khardung La Pass at 5,359m',
      'Bactrian camels in Nubra Valley',
      'Thiksey & Hemis monastery mornings',
      'Magnetic Hill and the Indus–Zanskar confluence',
      'Two dedicated acclimatisation days in Leh',
    ],
    itinerary: [
      { day: 1, title: 'Arrive in Leh — Acclimatisation', description: 'Land at Kushok Bakula Rimpochee Airport (3,524m). Transfer to hotel and rest completely — no sightseeing, no stairs. Short evening walk to the main bazaar if you feel up to it.' },
      { day: 2, title: 'Leh Local — Easing Into Altitude', description: 'Shanti Stupa, Leh Palace and the old town lanes at a deliberately slow pace. Afternoon drive to Magnetic Hill and the Indus–Zanskar confluence at Nimmu.' },
      { day: 3, title: 'Leh → Nubra via Khardung La', description: 'Cross Khardung La (5,359m) with a short photo stop only — you do not linger at that height. Descend to Diskit for the Maitreya Buddha, then camel safari on the Hunder dunes at sunset.' },
      { day: 4, title: 'Nubra → Pangong Tso via Shyok', description: 'The rough, spectacular Shyok river road east to Pangong (4,350m). Arrive mid-afternoon and watch the lake cycle through blue, green and grey as the light drops.' },
      { day: 5, title: 'Pangong — Free Day', description: 'Nothing scheduled. Walk the shoreline, photograph the changing water, or sit still. Optional drive to Merak village on the far bank.' },
      { day: 6, title: 'Pangong → Leh via Chang La', description: 'Return over Chang La (5,360m), stopping at Hemis — the largest and wealthiest monastery in Ladakh — before dropping back into Leh.' },
      { day: 7, title: 'Thiksey, Shey & Leh Market', description: 'Early morning prayers at Thiksey, whose tiered profile echoes the Potala. Shey Palace after breakfast, then the afternoon free for pashmina and apricot shopping.' },
      { day: 8, title: 'Departure', description: 'Transfer to Leh airport for the morning flight out. Expedition ends.' },
    ],
    included: [
      '7 nights accommodation (hotels in Leh, camps at Nubra & Pangong)',
      'All meals — breakfast, lunch and dinner',
      'Private SUV/Innova with an experienced mountain driver',
      'English-speaking local guide throughout',
      'Inner Line Permits for Nubra and Pangong',
      'Camel safari at Hunder',
      'Oxygen cylinder and first-aid kit in every vehicle',
    ],
    excluded: [
      'Flights to and from Leh',
      'Travel insurance',
      'Personal expenses, tips and laundry',
      'Alcoholic beverages',
      'Optional rafting on the Zanskar',
    ],
    activities: ['Camel Safari', 'Mountain Photography', 'Monastery Visits', 'High-Altitude Driving', 'Stargazing', 'River Rafting (optional)'],
    badge: 'Bestseller',
    trending: true,
  },
  {
    id: 2,
    slug: 'manali-family-retreat',
    title: 'Manali Family Retreat',
    destinationSlug: 'manali',
    destinationName: 'Manali',
    region: 'Himachal',
    image: '/images/manali.jpg',
    categories: ['family', 'weekend'],
    durationDays: 6,
    durationNights: 5,
    price: 18499,
    oldPrice: 21999,
    rating: 4.7,
    reviews: 528,
    groupSize: '2–20 people',
    difficulty: 'Easy–Moderate',
    bestTime: 'October – June',
    summary:
      'Snow at Rohtang, gentle river walks and a hotel the kids will not want to leave. Paced for grandparents and toddlers alike, with no early-morning starts.',
    overview:
      'Manali is the easiest Himalayan introduction there is, and this itinerary leans into that. Nothing starts before 9am, no drive runs longer than two hours, and every day has an opt-out built in for whoever wants to stay by the fire instead. The hotel is chosen for its garden and its triple rooms rather than its star rating, and the adventure day at Solang is à la carte — ropeway for the grandparents, zorbing for the children, paragliding for whoever is brave.',
    highlights: [
      'Rohtang Pass snow day',
      'Solang Valley ropeway and activities',
      'Hadimba Temple among the cedar groves',
      'Old Manali cafés and apple orchards',
      'Riverside bonfire evening',
      'Jogini waterfall walk',
    ],
    itinerary: [
      { day: 1, title: 'Arrive Manali — Settle In', description: 'Arrive and check in. Nothing scheduled. Evening stroll along Mall Road for momos and woollens.' },
      { day: 2, title: 'Hadimba Temple & Old Manali', description: 'The 16th-century Hadimba Devi Temple in its deodar grove, then Manu Temple and the orchards of Old Manali. Short optional walk to Jogini waterfall.' },
      { day: 3, title: 'Solang Valley — Choose Your Own Day', description: 'Full day at Solang (2,480m). Ropeway for the views, plus zorbing, tubing and paragliding available individually so nobody is forced into anything.' },
      { day: 4, title: 'Rohtang Pass Snow Day', description: 'Early drive to Rohtang (3,978m) for snow that lasts into June — sledging, snowball fights and a great deal of tea. Subject to permit and weather.' },
      { day: 5, title: 'Kullu, Rafting & Bonfire', description: 'Drive to Kullu for a gentle Grade II rafting stretch suitable for children over eight, plus the shawl weaving workshops. Bonfire dinner back at the hotel.' },
      { day: 6, title: 'Departure', description: 'Late checkout and transfer to your onward Volvo or taxi. Trip ends.' },
    ],
    included: [
      '5 nights family-room accommodation',
      'Daily breakfast and dinner',
      'Private cab for all transfers and sightseeing',
      'Rohtang Pass permit and green tax',
      'Grade II river rafting at Kullu',
      'Bonfire evening at the hotel',
    ],
    excluded: [
      'Travel to and from Manali',
      'Lunch on all days',
      'Solang adventure activity charges',
      'Personal expenses',
      'Travel insurance',
    ],
    activities: ['Snow Play', 'Ropeway', 'River Rafting', 'Zorbing', 'Nature Walks', 'Bonfire Evenings'],
    badge: 'Family Favourite',
    trending: true,
  },
  {
    id: 3,
    slug: 'andaman-honeymoon-escape',
    title: 'Andaman Honeymoon Escape',
    destinationSlug: 'andaman',
    destinationName: 'Andaman Islands',
    region: 'Islands',
    image: '/images/andaman.jpg',
    categories: ['honeymoon', 'beach', 'luxury'],
    durationDays: 6,
    durationNights: 5,
    price: 42999,
    oldPrice: 49999,
    rating: 4.9,
    reviews: 367,
    groupSize: 'Couples only',
    difficulty: 'Easy',
    bestTime: 'October – May',
    summary:
      'Radhanagar sunsets, a private candlelit dinner on the sand and a sea-facing room on Havelock. Every transfer is private — you will never share a car.',
    overview:
      'Built for two people who would rather not be part of a group. Every transfer is a private car, every ferry a premium-class seat, and the two nights on Havelock are in a sea-facing room rather than whatever the block booking released. The set pieces are the ones worth having — a candlelit dinner laid out on the sand at Radhanagar, a first scuba dive together off Elephant Beach, and a sunset at Laxmanpur on Neil where the crowds thin out to almost nobody.',
    highlights: [
      'Private candlelit beach dinner at Havelock',
      'Discovery scuba dive for two',
      'Radhanagar Beach at sunset',
      'Elephant Beach snorkelling',
      'Neil Island Natural Bridge',
      'Cellular Jail light and sound show',
    ],
    itinerary: [
      { day: 1, title: 'Arrive Port Blair — Cellular Jail', description: 'Private transfer from Veer Savarkar airport. Afternoon at Corbyn\'s Cove, then the evening light-and-sound show at the Cellular Jail.' },
      { day: 2, title: 'Port Blair → Havelock', description: 'Morning premium ferry to Havelock (Swaraj Dweep). Check into a sea-facing room. Sunset at Radhanagar, repeatedly voted Asia\'s finest beach.' },
      { day: 3, title: 'Elephant Beach & Candlelit Dinner', description: 'Boat to Elephant Beach for a guided discovery scuba dive and snorkelling over the coral shelf. Evening: a private candlelit dinner set up on the sand.' },
      { day: 4, title: 'Havelock → Neil Island', description: 'Ferry to Neil (Shaheed Dweep). Natural Bridge at low tide, Bharatpur Beach in the afternoon, and sunset at Laxmanpur.' },
      { day: 5, title: 'Neil Island — Free Day', description: 'Nothing scheduled. Cycle the island, swim, or take an optional glass-bottom boat over the reef.' },
      { day: 6, title: 'Return & Departure', description: 'Morning ferry back to Port Blair, last shopping at Aberdeen Bazaar, private transfer to the airport.' },
    ],
    included: [
      '5 nights in sea-facing rooms and resorts',
      'Daily breakfast plus one candlelit dinner',
      'Private air-conditioned transfers throughout',
      'Premium-class ferry tickets between all three islands',
      'Discovery scuba dive for two with instructor',
      'Flower-decorated room and cake on arrival',
    ],
    excluded: [
      'Flights to and from Port Blair',
      'Lunch and dinner other than the beach dinner',
      'Additional dives and water sports',
      'Personal expenses',
      'Travel insurance',
    ],
    activities: ['Scuba Diving', 'Snorkelling', 'Beach Walks', 'Glass-Bottom Boat', 'Sunset Viewing', 'Island Cycling'],
    badge: 'Couples Pick',
    trending: true,
  },
  {
    id: 4,
    slug: 'kedarnath-sacred-yatra',
    title: 'Kedarnath Sacred Yatra',
    destinationSlug: 'kedarnath',
    destinationName: 'Kedarnath',
    region: 'Uttarakhand',
    image: '/images/kedarnath.jpg',
    categories: ['pilgrimage', 'group'],
    durationDays: 5,
    durationNights: 4,
    price: 15499,
    rating: 4.8,
    reviews: 690,
    groupSize: '2–25 people',
    difficulty: 'Moderate',
    bestTime: 'May – June, September – November',
    summary:
      'The 16km walk from Gaurikund to the temple, done properly — with a rest night at Sonprayag, porters arranged and priority darshan assistance.',
    overview:
      'Most operators run Kedarnath as a punishing two-day dash. This one does not. You sleep at Sonprayag the night before so the climb starts fresh and early, porters and ponies are pre-arranged rather than haggled for at the trailhead, and you stay a full night at Kedarnath itself — which means an evening aarti and a dawn abhishek without the crowds that arrive on the day buses. The descent then opens into Chopta and Tungnath, the highest Shiva temple in the world, so the yatra ends on a ridge instead of in a car park.',
    highlights: [
      'Kedarnath Temple darshan and dawn abhishek',
      'Overnight at Kedarnath, not a same-day return',
      'Chopta — the meadow they call mini Switzerland',
      'Tungnath, the world\'s highest Shiva temple',
      'Chandrashila summit for 360° Himalayan views',
      'Evening aarti at Gaurikund',
    ],
    itinerary: [
      { day: 1, title: 'Haridwar → Sonprayag', description: 'Drive up through the Garhwal hills along the Alaknanda and Mandakini. Arrive Sonprayag (1,829m), the last road-head. Evening riverside aarti and an early night.' },
      { day: 2, title: 'Gaurikund → Kedarnath Trek', description: 'Shuttle to Gaurikund, then the 16km climb to Kedarnath (3,583m) through forest and waterfall. Porters and ponies available. Evening darshan at the temple.' },
      { day: 3, title: 'Kedarnath — Temple & Glacier', description: 'Dawn abhishek at the sanctum. Walk up to Bhairavnath Temple and out towards the Chorabari glacier. Optional 5km trek to Vasuki Tal for the strong.' },
      { day: 4, title: 'Descend → Chopta', description: 'Final darshan, then the walk back down to Gaurikund. Drive to Chopta (2,680m) — meadows with Trishul, Nanda Devi and Chaukhamba on the skyline.' },
      { day: 5, title: 'Tungnath, Chandrashila → Departure', description: 'Pre-dawn 3.5km climb to Tungnath (3,680m) and on to Chandrashila peak (4,130m) for sunrise. Descend and drive back to Haridwar.' },
    ],
    included: [
      '4 nights accommodation (guesthouses and a night at Kedarnath)',
      'All vegetarian meals',
      'Transport from Haridwar/Rishikesh and back',
      'Experienced trek leader and support staff',
      'Darshan queue assistance',
      'First-aid kit and oxygen cylinder',
    ],
    excluded: [
      'Helicopter tickets (available as an upgrade)',
      'Porter and pony charges',
      'Travel to and from Haridwar',
      'Personal expenses',
      'Travel insurance',
    ],
    activities: ['Pilgrimage Trekking', 'Temple Darshan', 'Glacier Walk', 'Summit Hiking', 'Bird Watching', 'Meditation'],
    badge: 'Most Booked',
  },
  {
    id: 5,
    slug: 'spiti-valley-odyssey',
    title: 'Spiti Valley Odyssey',
    destinationSlug: 'spiti',
    destinationName: 'Spiti Valley',
    region: 'Himachal',
    image: '/images/spiti.jpg',
    categories: ['adventure', 'solo', 'group'],
    durationDays: 10,
    durationNights: 9,
    price: 32999,
    oldPrice: 37999,
    rating: 4.9,
    reviews: 243,
    groupSize: '4–14 people',
    difficulty: 'Challenging',
    bestTime: 'June – September',
    summary:
      'Ten days through the cold desert — Key Monastery, Chandratal under the Milky Way, and homestays in villages that sit above 4,000m.',
    overview:
      'The full Shimla-to-Manali traverse, which is the only way to see Spiti without doubling back. Going in from the Kinnaur side means you gain altitude over four days instead of one, which matters when you finish at Kunzum La at 4,590m. You sleep in family homestays in Kaza and Langza rather than hotels, eat what the household eats, and camp one night at Chandratal where there is no electricity and consequently no light pollution at all.',
    highlights: [
      'Key Monastery, a thousand years old at 4,166m',
      'Camping at Chandratal, the crescent moon lake',
      'Kibber and Komic — among the world\'s highest villages',
      'Hikkim, the highest post office on earth',
      'Pin Valley National Park',
      'Homestays with Spitian families',
    ],
    itinerary: [
      { day: 1, title: 'Shimla → Narkanda', description: 'Leave Shimla through apple orchards and pine to Narkanda (2,708m). Easy first day, deliberately short.' },
      { day: 2, title: 'Narkanda → Sangla', description: 'Follow the Sutlej into Kinnaur, then turn up the Baspa valley to Sangla (2,680m) — apricot trees and wooden temples.' },
      { day: 3, title: 'Chitkul → Kalpa', description: 'Morning at Chitkul, the last village before the Tibet border. Afternoon to Kalpa, facing the Kinnaur Kailash range head-on.' },
      { day: 4, title: 'Kalpa → Tabo', description: 'The landscape turns to rock and dust as you enter Spiti proper. Visit Tabo Monastery, founded in 996 AD and still functioning.' },
      { day: 5, title: 'Tabo → Dhankar → Kaza', description: 'Dhankar Monastery on its crumbling spur, then a detour into Pin Valley before reaching Kaza, the valley\'s main town.' },
      { day: 6, title: 'Key, Kibber, Komic & Hikkim', description: 'Key Monastery in the morning light, then the high villages — Kibber, Komic, and a postcard sent from Hikkim at 4,400m.' },
      { day: 7, title: 'Langza & Lhalung', description: 'Fossil hunting at Langza below the giant Buddha, then the golden temple at Lhalung. Homestay night.' },
      { day: 8, title: 'Kaza → Chandratal', description: 'Over Kunzum La (4,590m) and down to Chandratal (4,300m). Walk the lake circuit, then camp. No phone signal, no lights.' },
      { day: 9, title: 'Chandratal → Manali', description: 'Sunrise at the lake, then the long descent through Batal and Gramphu over Rohtang into Manali.' },
      { day: 10, title: 'Departure from Manali', description: 'Checkout and onward transfer to Delhi or Chandigarh. Expedition ends.' },
    ],
    included: [
      '9 nights (hotels, homestays and one night camping)',
      'All meals throughout',
      'Tempo Traveller / SUV with a Spiti-experienced driver',
      'Trip leader for the full route',
      'Inner Line permits and forest entry fees',
      'Camping equipment and sleeping bags at Chandratal',
    ],
    excluded: [
      'Travel to Shimla and from Manali',
      'Travel insurance',
      'Personal expenses',
      'Anything not listed as included',
    ],
    activities: ['High-Altitude Trekking', 'Fossil Hunting', 'Monastery Visits', 'Camping', 'Astrophotography', 'Village Homestays'],
    badge: 'For Explorers',
  },
  {
    id: 6,
    slug: 'ranthambore-tiger-safari',
    title: 'Ranthambore Tiger Safari',
    destinationSlug: 'ranthambore',
    destinationName: 'Ranthambore',
    region: 'Rajasthan',
    image: '/images/ranthambore.jpg',
    categories: ['wildlife', 'family', 'weekend'],
    durationDays: 3,
    durationNights: 2,
    price: 12999,
    rating: 4.6,
    reviews: 318,
    groupSize: '2–18 people',
    difficulty: 'Easy',
    bestTime: 'October – June',
    summary:
      'Four core-zone safaris across three days, with a naturalist who has tracked these tigers for a decade. Highest sighting probability of any of our trips.',
    overview:
      'Sightings are a numbers game, so this trip is built around volume: four game drives rather than the usual two, spread across different zones and both time slots, which roughly doubles your odds over a weekend visit. The naturalist riding with you has worked this park for over ten years and knows the individual tigers by name and territory. Between drives there is the Ranthambore Fort, a tenth-century UNESCO site standing directly above the jungle, which is a genuinely strange and wonderful thing to walk around.',
    highlights: [
      'Four core-zone safaris across Zones 1–5',
      'Resident naturalist on every drive',
      'Ranthambore Fort, a UNESCO site inside the park',
      'Padam Talao and Malik Talao at dusk',
      'Over 300 resident and migratory bird species',
      'Evening talk on tiger tracking and conservation',
    ],
    itinerary: [
      { day: 1, title: 'Arrive — Afternoon Safari', description: 'Arrive Sawai Madhopur and transfer to the resort. After lunch, your first game drive; zone allocation is by forest department lottery. Debrief over dinner.' },
      { day: 2, title: 'Dawn & Dusk Safaris', description: 'The 6am drive, statistically the best window for sightings. Rest through the middle of the day, then a second drive in a different zone. Evening naturalist talk.' },
      { day: 3, title: 'Final Safari & Fort → Departure', description: 'One last dawn drive, then breakfast and the climb to Ranthambore Fort with its Ganesh temple and step wells. Transfer to the station by noon.' },
    ],
    included: [
      '2 nights jungle resort accommodation',
      'All meals — breakfast, lunch and dinner',
      '4 safari drives in canter or jeep',
      'Expert naturalist on all drives',
      'Park entry, zone booking and permit fees',
      'Ranthambore Fort visit with guide',
    ],
    excluded: [
      'Train or flight to Sawai Madhopur',
      'Camera fees inside the park',
      'Personal expenses and alcohol',
      'Travel insurance',
    ],
    activities: ['Jeep Safari', 'Canter Safari', 'Bird Watching', 'Fort Exploration', 'Wildlife Photography', 'Nature Walks'],
  },
  {
    id: 7,
    slug: 'rishikesh-adventure-weekend',
    title: 'Rishikesh Adventure Weekend',
    destinationSlug: 'rishikesh',
    destinationName: 'Rishikesh',
    region: 'Uttarakhand',
    image: '/images/rishikesh.jpg',
    categories: ['adventure', 'weekend', 'solo'],
    durationDays: 4,
    durationNights: 3,
    price: 10999,
    oldPrice: 13499,
    rating: 4.7,
    reviews: 745,
    groupSize: '2–30 people',
    difficulty: 'Easy',
    bestTime: 'October – March',
    summary:
      'Grade III rapids by day, Ganga aarti at dusk and a riverside camp at night. Our most popular short break, and the easiest one to say yes to.',
    overview:
      'Four days that pack in more than most week-long trips. The rafting is the real thing — the 26km Marine Drive stretch with Roller Coaster and Golf Course, not the tame beginner run — but no experience is needed and the safety kayakers are excellent. Around it sit the two Rishikesh everyone comes for: the adrenaline one at Shivpuri, and the quiet one at dawn on the ghats. You sleep two nights in a riverside camp and one in town.',
    highlights: [
      '26km white-water rafting with Grade III rapids',
      'Ganga Aarti at Har Ki Pauri and Triveni Ghat',
      'Riverside camping with a bonfire',
      'Bungee jump at Jumpin Heights (optional)',
      'Laxman Jhula and the Beatles Ashram',
      'Cliff jumping and body surfing',
    ],
    itinerary: [
      { day: 1, title: 'Arrive Haridwar — Ganga Aarti', description: 'Arrive and check in. Cable car up to Mansa Devi in the afternoon. Evening at Har Ki Pauri for the aarti — hundreds of lamps set onto the river at once.' },
      { day: 2, title: 'Haridwar → Rishikesh, Ghats & Bridges', description: 'Morning dip at Har Ki Pauri, then the short drive to Rishikesh. Triveni Ghat, Ram Jhula and Laxman Jhula on foot. Move to the riverside camp for the night.' },
      { day: 3, title: 'Rafting Day', description: 'The full 26km run from Marine Drive to Laxman Jhula — Three Blind Mice, Cash Flow, Roller Coaster and Golf Course. Cliff jumping and body surfing in the calm stretches. Bonfire at camp.' },
      { day: 4, title: 'Beatles Ashram & Departure', description: 'Morning at Chaurasi Kutia, where the Beatles studied meditation in 1968 — now murals and forest. Optional yoga class before you leave.' },
    ],
    included: [
      '3 nights (1 hotel + 2 riverside camp)',
      'Daily breakfast and dinner',
      'All transfers',
      '26km rafting with guide, gear and safety kayaker',
      'Beatles Ashram entry',
      'Bonfire and camp activities',
    ],
    excluded: [
      'Travel to and from Haridwar',
      'Lunch on all days',
      'Bungee and cliff-jump charges',
      'Personal expenses',
      'Travel insurance',
    ],
    activities: ['White Water Rafting', 'Bungee Jumping', 'Cliff Jumping', 'Camping', 'Yoga', 'Temple Visits'],
    trending: true,
  },
  {
    id: 8,
    slug: 'varanasi-spiritual-circuit',
    title: 'Varanasi Spiritual Circuit',
    destinationSlug: 'varanasi',
    destinationName: 'Varanasi',
    region: 'Uttar Pradesh',
    image: '/images/varanasi.jpg',
    categories: ['pilgrimage', 'solo', 'weekend'],
    durationDays: 4,
    durationNights: 3,
    price: 11499,
    rating: 4.8,
    reviews: 402,
    groupSize: '2–20 people',
    difficulty: 'Easy',
    bestTime: 'October – March',
    summary:
      'Sunrise on the Ganga from a wooden boat, Kashi Vishwanath darshan, and an afternoon in Sarnath where the Buddha gave his first sermon.',
    overview:
      'Varanasi rewards being up early and staying out late, so this itinerary is built around the two ends of the day. You take a boat out before dawn when the ghats are still half-asleep, and you are back on the water in the evening for the aarti at Dashashwamedh. In between there is the old city — a maze that genuinely requires a guide — plus Sarnath, twelve kilometres and about two thousand years away, where Buddhism effectively began.',
    highlights: [
      'Sunrise boat ride past all 88 ghats',
      'Ganga Aarti at Dashashwamedh Ghat',
      'Kashi Vishwanath Temple darshan',
      'Sarnath and the Dhamek Stupa',
      'Banarasi silk weaving workshop',
      'Old city street-food walk',
    ],
    itinerary: [
      { day: 1, title: 'Arrive — Evening Ganga Aarti', description: 'Arrive and check in. Evening boat out to watch the Dashashwamedh aarti from the water, which is a far better view than the crush on the steps.' },
      { day: 2, title: 'Sunrise Boat & Kashi Vishwanath', description: 'On the river before first light — bathers, sadhus, and the cremation fires at Manikarnika. Kashi Vishwanath after breakfast, then the lanes of Bengali Tola and the silk bazaars.' },
      { day: 3, title: 'Sarnath Excursion', description: 'Drive out to Sarnath for the Dhamek Stupa, the ruins of the deer park and the archaeological museum with the original Ashokan lion capital. Silk-weaving workshop in the afternoon.' },
      { day: 4, title: 'Free Morning & Departure', description: 'Optional sunrise yoga on the ghats, a last walk along the river, then transfer to the airport or station.' },
    ],
    included: [
      '3 nights hotel accommodation near the ghats',
      'Daily breakfast',
      'All transfers by air-conditioned vehicle',
      'Both boat rides — sunrise and evening aarti',
      'Licensed local guide for all sightseeing',
      'Sarnath entry and museum fees',
    ],
    excluded: [
      'Travel to and from Varanasi',
      'Lunch and dinner',
      'Temple offerings and prasad',
      'Personal expenses',
      'Travel insurance',
    ],
    activities: ['Boat Rides', 'Temple Darshan', 'Ghat Walks', 'Silk Workshop', 'Street Food Tour', 'Sunrise Yoga'],
  },
  {
    id: 9,
    slug: 'leh-luxury-sojourn',
    title: 'Leh Luxury Sojourn',
    destinationSlug: 'ladakh',
    destinationName: 'Ladakh',
    region: 'Himalayas',
    image: '/images/ladakh.jpg',
    categories: ['luxury', 'honeymoon'],
    durationDays: 7,
    durationNights: 6,
    price: 74999,
    oldPrice: 84999,
    rating: 4.9,
    reviews: 96,
    groupSize: 'Max 6 people',
    difficulty: 'Easy–Moderate',
    bestTime: 'June – September',
    summary:
      'The same Ladakh, unhurried — boutique stays in restored Ladakhi houses, a private vehicle throughout and a historian guide for the monastery days.',
    overview:
      'Ladakh at half the usual pace and twice the comfort. You stay in restored Ladakhi houses and a luxury camp rather than the standard tourist hotels, travel in a private vehicle that waits for you rather than a schedule, and see the monasteries with a guide who can actually read the thangkas. Maximum six guests. Oxygen concentrators are in every room as standard, which changes the first two days considerably.',
    highlights: [
      'Boutique heritage stays in Leh and Nubra',
      'Private historian-led monastery tour',
      'Luxury glamping on the Pangong shore',
      'In-room oxygen concentrators throughout',
      'Private sunset at Thiksey with butter tea',
      'Dedicated trip manager for the group',
    ],
    itinerary: [
      { day: 1, title: 'Arrive Leh — Rest', description: 'Private transfer to a restored Ladakhi house in the old town. Complete rest, in-room oxygen support, and a light dinner in the courtyard.' },
      { day: 2, title: 'Old Leh with a Historian', description: 'A slow walking morning through Leh Palace and the old town with a resident historian. Afternoon free. Sunset from Shanti Stupa with tea brought up for you.' },
      { day: 3, title: 'Thiksey, Hemis & Stakna', description: 'Dawn prayers at Thiksey before any other group arrives, then Hemis and the quieter Stakna gompa across the river. Private picnic lunch by the Indus.' },
      { day: 4, title: 'Leh → Nubra via Khardung La', description: 'Over Khardung La at your own pace. Two nights in a boutique property at Hunder. Evening on the dunes with the Bactrian camels.' },
      { day: 5, title: 'Nubra — Turtuk Day Trip', description: 'Out to Turtuk, a Balti village that was part of Pakistan until 1971 — apricot orchards, stone houses and a completely different culture.' },
      { day: 6, title: 'Nubra → Pangong Luxury Camp', description: 'The Shyok road to Pangong. Check into a luxury tented camp on the shore — proper beds, heating and a private dinner set up by the water.' },
      { day: 7, title: 'Pangong → Leh → Departure', description: 'Sunrise at the lake, return over Chang La, and a private transfer to the airport.' },
    ],
    included: [
      '6 nights in boutique heritage properties and a luxury camp',
      'All meals, including two private dinners',
      'Private SUV with driver for the whole trip',
      'Historian guide for the monastery days',
      'All Inner Line permits',
      'In-room oxygen concentrators and a dedicated trip manager',
    ],
    excluded: [
      'Flights to and from Leh',
      'Travel insurance',
      'Spa treatments and personal expenses',
      'Alcoholic beverages',
    ],
    activities: ['Heritage Walks', 'Monastery Visits', 'Camel Safari', 'Private Dining', 'Photography', 'Stargazing'],
    badge: 'Premium',
  },
  {
    id: 10,
    slug: 'manali-honeymoon-hideaway',
    title: 'Manali Honeymoon Hideaway',
    destinationSlug: 'manali',
    destinationName: 'Manali',
    region: 'Himachal',
    image: '/images/manali.jpg',
    categories: ['honeymoon', 'weekend'],
    durationDays: 5,
    durationNights: 4,
    price: 22999,
    oldPrice: 26999,
    rating: 4.7,
    reviews: 289,
    groupSize: 'Couples only',
    difficulty: 'Easy',
    bestTime: 'October – June',
    summary:
      'A wood-and-stone cottage above Old Manali, a private snow-point transfer and a candlelit dinner by the Beas. Late checkouts on every night.',
    overview:
      'A deliberately lazy itinerary. One cottage for four nights so you unpack once, late checkout every morning, and only one fixed commitment per day. The cottage sits above Old Manali with the Beas audible from the deck. Solang and the snow point are done privately rather than in a shared cab, and there is a couples spa session and a riverside candlelit dinner built into the price rather than sold to you on arrival.',
    highlights: [
      'Private wood-and-stone cottage for four nights',
      'Candlelit dinner on the bank of the Beas',
      'Couples spa session included',
      'Private Solang ropeway transfer',
      'Old Manali café mornings',
      'Late checkout every day',
    ],
    itinerary: [
      { day: 1, title: 'Arrive — Cottage & Bonfire', description: 'Private transfer from Chandigarh or the Volvo stand. Check into the cottage. Private bonfire on the deck with the river below.' },
      { day: 2, title: 'Old Manali & Hadimba', description: 'A slow morning in the Old Manali cafés, then Hadimba Devi Temple in its cedar grove when the afternoon light comes through. Evening free.' },
      { day: 3, title: 'Solang Valley, Privately', description: 'Private car to Solang. Ropeway to the top for the Beas Kund views. Paragliding available for one or both of you. Couples spa session on return.' },
      { day: 4, title: 'Snow Point & Candlelit Dinner', description: 'Drive up towards Rohtang or the accessible snow point depending on season and permits. Evening: a private candlelit dinner set up beside the river.' },
      { day: 5, title: 'Departure', description: 'Late checkout, last walk along Mall Road, and your onward transfer.' },
    ],
    included: [
      '4 nights in a private cottage with mountain views',
      'Breakfast in bed daily plus one candlelit dinner',
      'Private vehicle for all transfers and sightseeing',
      'Couples spa session',
      'Solang ropeway tickets for two',
      'Flower decoration and cake on arrival',
    ],
    excluded: [
      'Travel to and from Manali',
      'Lunch and dinner other than the private dinner',
      'Paragliding and adventure charges',
      'Personal expenses',
      'Travel insurance',
    ],
    activities: ['Ropeway', 'Paragliding', 'Spa', 'Café Hopping', 'Bonfire Evenings', 'Riverside Walks'],
  },
  {
    id: 11,
    slug: 'andaman-family-island-hopper',
    title: 'Andaman Family Island Hopper',
    destinationSlug: 'andaman',
    destinationName: 'Andaman Islands',
    region: 'Islands',
    image: '/images/andaman.jpg',
    categories: ['family', 'beach'],
    durationDays: 6,
    durationNights: 5,
    price: 24999,
    rating: 4.6,
    reviews: 331,
    groupSize: '2–16 people',
    difficulty: 'Easy',
    bestTime: 'October – May',
    summary:
      'Port Blair, Havelock and Neil in six days, with glass-bottom boats instead of dives so everyone from age five upward comes along.',
    overview:
      'The same three islands as the honeymoon trip, rebuilt so nobody gets left on the beach. The reef is seen through glass-bottom boats and a shallow snorkel that a confident eight-year-old manages fine, rather than a certified dive. Ferry legs are booked in the morning when the water is calmest, and the Port Blair days include the Cellular Jail and the marine museum, both of which land well with school-age children.',
    highlights: [
      'Glass-bottom boat over the North Bay reef',
      'Radhanagar Beach at sunset',
      'Natural Bridge at Neil Island',
      'Cellular Jail and the light and sound show',
      'Samudrika Marine Museum',
      'Shallow guided snorkel at Elephant Beach',
    ],
    itinerary: [
      { day: 1, title: 'Arrive Port Blair — Ross Island', description: 'Transfer to hotel. Afternoon boat to Ross Island, the old British headquarters now half-swallowed by fig roots and full of tame deer. Evening light and sound show.' },
      { day: 2, title: 'Cellular Jail & North Bay', description: 'Morning tour of the Cellular Jail. Afternoon at North Bay for the glass-bottom boat over the coral, plus the Samudrika Marine Museum.' },
      { day: 3, title: 'Port Blair → Havelock', description: 'Morning ferry to Havelock. Check in, then a long afternoon at Radhanagar for the sand and the sunset.' },
      { day: 4, title: 'Elephant Beach', description: 'Boat to Elephant Beach for shallow guided snorkelling, sea walking for the adults and plenty of shore time for anyone who would rather stay dry.' },
      { day: 5, title: 'Havelock → Neil Island', description: 'Ferry to Neil. Natural Bridge at low tide, Bharatpur Beach for swimming, and Laxmanpur for sunset.' },
      { day: 6, title: 'Return & Departure', description: 'Morning ferry back to Port Blair, shopping at Aberdeen Bazaar, and the airport transfer.' },
    ],
    included: [
      '5 nights in family rooms at beach resorts',
      'Daily breakfast',
      'All inter-island ferry tickets',
      'All sightseeing transfers',
      'Glass-bottom boat and guided snorkel',
      'Cellular Jail entry and show tickets',
    ],
    excluded: [
      'Flights to and from Port Blair',
      'Lunch and dinner',
      'Scuba diving and additional water sports',
      'Personal expenses',
      'Travel insurance',
    ],
    activities: ['Glass-Bottom Boat', 'Snorkelling', 'Sea Walk', 'Beach Time', 'History Tours', 'Sunset Viewing'],
  },
  {
    id: 12,
    slug: 'spiti-winter-snow-leopard',
    title: 'Spiti Winter Snow Leopard Trail',
    destinationSlug: 'spiti',
    destinationName: 'Spiti Valley',
    region: 'Himachal',
    image: '/images/spiti.jpg',
    categories: ['wildlife', 'adventure'],
    durationDays: 11,
    durationNights: 10,
    price: 68999,
    rating: 4.8,
    reviews: 74,
    groupSize: '4–8 people',
    difficulty: 'Challenging',
    bestTime: 'January – March',
    summary:
      'Eleven days at −20°C with expert spotters in Kibber, tracking the ghost of the Himalayas. Small group, long lens, real chance of a sighting.',
    overview:
      'This is an expedition, not a holiday. Winter Spiti runs to −20°C at night, the Kunzum route is closed, and you go in the long way through Kinnaur. Days are spent on ridgelines above Kibber with local spotters glassing the slopes for movement — blue sheep first, then whatever is hunting them. Sightings are never guaranteed, but this window and this valley give you the best odds anywhere in the world, and the wait itself is spent somewhere extraordinary.',
    highlights: [
      'Snow leopard tracking with Kibber\'s local spotters',
      'Blue sheep and ibex herds at close range',
      'Frozen waterfalls and the icebound Spiti river',
      'Winter homestays with heated rooms',
      'Key Monastery under snow',
      'Spotting scopes and photography support provided',
    ],
    itinerary: [
      { day: 1, title: 'Shimla → Sarahan', description: 'Drive into Kinnaur along the frozen Sutlej. Overnight at Sarahan with the Bhimakali temple complex.' },
      { day: 2, title: 'Sarahan → Kalpa', description: 'Continue up the valley to Kalpa, facing Kinnaur Kailash in full winter snow.' },
      { day: 3, title: 'Kalpa → Tabo', description: 'The long, cold drive into Spiti proper. Overnight at Tabo, the lowest and warmest point in the valley.' },
      { day: 4, title: 'Tabo → Kaza → Kibber', description: 'Up to Kaza and on to Kibber (4,270m), your base for the next six nights. Briefing with the spotting team.' },
      { day: 5, title: 'First Tracking Day', description: 'Out before dawn with spotters. Establish glassing positions above the village and read the previous night\'s tracks in fresh snow.' },
      { day: 6, title: 'Tracking — Upper Ridges', description: 'A higher position covering the blue sheep herds. Where the prey is, the predator follows. Full day out with packed lunch.' },
      { day: 7, title: 'Tracking — Side Valleys', description: 'Move to the neighbouring valley system based on the week\'s track reports. Ibex and Himalayan wolf are also possible here.' },
      { day: 8, title: 'Tracking & Key Monastery', description: 'Morning session, then an afternoon at Key Monastery — utterly silent under snow, with almost no visitors this time of year.' },
      { day: 9, title: 'Final Tracking Day', description: 'Last full day with the spotters, returning to whichever position has produced the most activity.' },
      { day: 10, title: 'Kibber → Kalpa', description: 'Begin the long drive out, retracing the Kinnaur road. Overnight at Kalpa.' },
      { day: 11, title: 'Kalpa → Shimla — Departure', description: 'Final descent to Shimla. Expedition ends.' },
    ],
    included: [
      '10 nights in heated homestays and guesthouses',
      'All meals and unlimited hot drinks',
      '4x4 vehicles with winter tyres and experienced drivers',
      'Local spotting team at Kibber',
      'Shared spotting scopes and tripods',
      'Down jackets, sleeping bags and oxygen support',
    ],
    excluded: [
      'Travel to and from Shimla',
      'Personal camera equipment',
      'Travel and evacuation insurance (mandatory)',
      'Personal expenses',
    ],
    activities: ['Wildlife Tracking', 'Winter Photography', 'Snow Trekking', 'Monastery Visits', 'Bird Watching', 'Village Homestays'],
    badge: 'Expedition',
  },
  {
    id: 13,
    slug: 'rishikesh-yoga-immersion',
    title: 'Rishikesh Yoga Immersion',
    destinationSlug: 'rishikesh',
    destinationName: 'Rishikesh',
    region: 'Uttarakhand',
    image: '/images/rishikesh.jpg',
    categories: ['solo', 'weekend', 'pilgrimage'],
    durationDays: 7,
    durationNights: 6,
    price: 19999,
    rating: 4.8,
    reviews: 214,
    groupSize: '1–15 people',
    difficulty: 'Easy',
    bestTime: 'September – April',
    summary:
      'Two daily practices at a riverside ashram, silent morning walks and an Ayurvedic consult. Built for people travelling alone.',
    overview:
      'A week of structure, which is what most people actually want from a solo trip. Two practices a day at a riverside ashram — hatha in the morning before the heat, pranayama and yoga nidra in the evening — with the middle of the day free. No prior experience is assumed and the teachers adjust rather than perform. Rooms are single occupancy at no supplement, meals are sattvic and taken communally, and there is one Ayurvedic consultation and massage built in.',
    highlights: [
      'Two daily practices — hatha, pranayama and yoga nidra',
      'Ayurvedic consultation and one full massage',
      'Silent sunrise walks along the Ganga',
      'Beatles Ashram walking tour',
      'Evening aarti at Parmarth Niketan',
      'Single occupancy at no supplement',
    ],
    itinerary: [
      { day: 1, title: 'Arrive — Orientation', description: 'Airport pickup from Dehradun. Check into the ashram, orientation walk, and a gentle opening practice before the evening aarti.' },
      { day: 2, title: 'Practice Begins', description: 'First full day: 6:30am hatha, free afternoon, evening pranayama. Introduction to the week\'s sequence.' },
      { day: 3, title: 'Ayurvedic Consultation', description: 'Morning practice, then a consultation with the resident Ayurvedic doctor and a full abhyanga massage in the afternoon.' },
      { day: 4, title: 'Beatles Ashram & Yoga Nidra', description: 'Morning practice, then the walk to Chaurasi Kutia through the forest. Evening yoga nidra session.' },
      { day: 5, title: 'Silent Morning', description: 'The practice and breakfast are taken in silence, followed by a silent walk upriver. Afternoon free. Normal evening session.' },
      { day: 6, title: 'Waterfall Walk & Closing Practice', description: 'Morning practice, then the short trek to Neer Garh waterfall. Extended closing session at sunset on the ghat.' },
      { day: 7, title: 'Departure', description: 'Final morning practice, breakfast, and transfer to Dehradun airport or the Haridwar railway station.' },
    ],
    included: [
      '6 nights single-occupancy ashram accommodation',
      'All sattvic meals',
      'Two daily yoga and meditation sessions',
      'Ayurvedic consultation and one abhyanga massage',
      'Beatles Ashram entry and guided walk',
      'Airport or station transfers both ways',
    ],
    excluded: [
      'Travel to and from Dehradun/Haridwar',
      'Additional therapies and treatments',
      'Personal expenses',
      'Travel insurance',
    ],
    activities: ['Hatha Yoga', 'Pranayama', 'Yoga Nidra', 'Meditation', 'Ayurveda', 'Nature Walks'],
  },
  {
    id: 14,
    slug: 'ranthambore-luxury-wildlife-lodge',
    title: 'Ranthambore Luxury Wildlife Lodge',
    destinationSlug: 'ranthambore',
    destinationName: 'Ranthambore',
    region: 'Rajasthan',
    image: '/images/ranthambore.jpg',
    categories: ['luxury', 'wildlife', 'honeymoon'],
    durationDays: 4,
    durationNights: 3,
    price: 54999,
    rating: 4.9,
    reviews: 88,
    groupSize: 'Max 8 people',
    difficulty: 'Easy',
    bestTime: 'October – April',
    summary:
      'A tented suite with a private plunge pool, exclusive-use safari jeeps and a bush dinner under the fort walls.',
    overview:
      'The difference here is the jeep. On a standard safari you share a vehicle with five strangers and go where the group consensus lands; on this one the jeep is yours, which means you can sit on a pugmark for forty minutes if the naturalist thinks it is worth it. That single change transforms the experience. The lodge is a tented suite with its own plunge pool, the resident naturalist stays with you across all five drives, and one evening is given over to a bush dinner set up below the fort walls.',
    highlights: [
      'Tented suite with a private plunge pool',
      'Exclusive-use safari jeep on every drive',
      'Five game drives across four days',
      'Bush dinner beneath the fort walls',
      'Resident naturalist for the whole stay',
      'Private fort tour before opening hours',
    ],
    itinerary: [
      { day: 1, title: 'Arrive — Afternoon Drive', description: 'Private transfer from Sawai Madhopur. Check into the tented suite. Afternoon game drive in your own jeep, followed by dinner with the naturalist.' },
      { day: 2, title: 'Dawn & Dusk Drives', description: 'Two full drives with your naturalist, working different zones. The long middle of the day is yours — plunge pool, spa, or the lodge library.' },
      { day: 3, title: 'Drives & Bush Dinner', description: 'Morning drive, afternoon at leisure, then a second drive that ends at a bush dinner laid out under the fort walls with lanterns.' },
      { day: 4, title: 'Private Fort Tour → Departure', description: 'Early access to Ranthambore Fort before the public gates open, then breakfast and a private transfer to the station.' },
    ],
    included: [
      '3 nights in a tented suite with private plunge pool',
      'All meals, soft drinks and house beverages',
      '5 game drives in an exclusive-use jeep',
      'Resident naturalist throughout',
      'All park entry and zone fees',
      'Bush dinner and private fort tour',
    ],
    excluded: [
      'Travel to and from Sawai Madhopur',
      'Spa treatments beyond the included credit',
      'Premium alcohol',
      'Travel insurance',
    ],
    activities: ['Private Jeep Safari', 'Wildlife Photography', 'Bird Watching', 'Fort Exploration', 'Spa', 'Bush Dining'],
    badge: 'Premium',
  },
  {
    id: 15,
    slug: 'varanasi-heritage-group-offsite',
    title: 'Varanasi Heritage Group Offsite',
    destinationSlug: 'varanasi',
    destinationName: 'Varanasi',
    region: 'Uttar Pradesh',
    image: '/images/varanasi.jpg',
    categories: ['group', 'pilgrimage'],
    durationDays: 3,
    durationNights: 2,
    price: 9999,
    rating: 4.5,
    reviews: 127,
    groupSize: '10–60 people',
    difficulty: 'Easy',
    bestTime: 'October – March',
    summary:
      'A short, well-run group format with a private boat for the whole team, a conference-capable hotel and one free evening built in.',
    overview:
      'Designed for teams of ten to sixty, where the logistics are the hard part. The hotel has a proper conference room with AV, the heritage walk runs in batches of fifteen so people can actually hear the guide, and the aarti is watched from a boat chartered for the group alone rather than from the crowd. One evening is deliberately left unscheduled, because every offsite needs one.',
    highlights: [
      'Private boat charter for the whole group',
      'Conference room with full AV setup',
      'Heritage walk in small guided batches',
      'Team dinner on a riverside terrace',
      'Sarnath half-day excursion',
      'One free evening built into the schedule',
    ],
    itinerary: [
      { day: 1, title: 'Arrive — Aarti by Private Boat', description: 'Group arrival and check-in, with a working session available in the afternoon. Evening: the whole team on a chartered boat for the Dashashwamedh aarti, followed by a terrace dinner.' },
      { day: 2, title: 'Sunrise Boat, Sessions & Free Evening', description: 'Optional sunrise boat ride, then the conference room is yours through the middle of the day. Heritage walk through the old city in batches. Evening free.' },
      { day: 3, title: 'Sarnath & Departure', description: 'Half-day coach excursion to Sarnath and the Dhamek Stupa, then back for checkout and airport or station transfers.' },
    ],
    included: [
      '2 nights hotel block on twin-sharing',
      'All meals including one terrace team dinner',
      'Coach transport for the full group',
      'Conference room with projector and sound',
      'Private boat charter for the aarti',
      'Guides for the heritage walk and Sarnath',
    ],
    excluded: [
      'Travel to and from Varanasi',
      'Single-occupancy supplement',
      'Alcohol and personal expenses',
      'Travel insurance',
    ],
    activities: ['Boat Charter', 'Heritage Walks', 'Team Dinners', 'Temple Visits', 'Sarnath Excursion', 'Conference Sessions'],
  },
  {
    id: 16,
    slug: 'kedarnath-helicopter-express',
    title: 'Kedarnath Helicopter Express',
    destinationSlug: 'kedarnath',
    destinationName: 'Kedarnath',
    region: 'Uttarakhand',
    image: '/images/kedarnath.jpg',
    categories: ['pilgrimage', 'luxury', 'family'],
    durationDays: 2,
    durationNights: 1,
    price: 38999,
    rating: 4.7,
    reviews: 156,
    groupSize: '2–12 people',
    difficulty: 'Easy',
    bestTime: 'May – June, September – October',
    summary:
      'Darshan without the trek — a morning helicopter from Phata, priority entry at the temple and back down by afternoon. Ideal for elders.',
    overview:
      'For anyone who cannot do sixteen kilometres uphill but has waited a lifetime for this darshan. The helicopter from Phata takes about eight minutes each way and lands a short walk from the temple, where palki and wheelchair support can be arranged in advance. Priority darshan assistance means the queue is measured in minutes rather than hours. You overnight at a comfortable resort in Guptkashi both before and after, so the whole thing is genuinely manageable at any age.',
    highlights: [
      'Return helicopter from Phata to Kedarnath',
      'Priority darshan assistance at the temple',
      'Palki and wheelchair support on request',
      'Comfortable resort night at Guptkashi',
      'Aerial views of the Mandakini valley',
      'No trekking required at any point',
    ],
    itinerary: [
      { day: 1, title: 'Haridwar → Guptkashi', description: 'Drive up through Devprayag and Rudraprayag, where the rivers meet. Check into a Guptkashi resort. Evening briefing on the next morning\'s flight timings.' },
      { day: 2, title: 'Helicopter Darshan → Departure', description: 'Early transfer to the Phata helipad and the short flight to Kedarnath. Priority darshan at the temple with time at the sanctum, then the return flight and the drive back to Haridwar.' },
    ],
    included: [
      '1 night resort accommodation at Guptkashi',
      'All meals',
      'Return helicopter tickets from Phata',
      'Priority darshan assistance',
      'Road transfers from Haridwar and back',
      'Assistance staff at the helipad and temple',
    ],
    excluded: [
      'Travel to and from Haridwar',
      'Palki and porter charges at Kedarnath',
      'Personal expenses and offerings',
      'Travel insurance',
    ],
    activities: ['Helicopter Ride', 'Temple Darshan', 'Scenic Flights', 'River Confluence Stops'],
    badge: 'Easy Access',
  },
  {
    id: 17,
    slug: 'ladakh-family-monastery-trail',
    title: 'Ladakh Family Monastery Trail',
    destinationSlug: 'ladakh',
    destinationName: 'Ladakh',
    region: 'Himalayas',
    image: '/images/ladakh.jpg',
    categories: ['family', 'group'],
    durationDays: 6,
    durationNights: 5,
    price: 23999,
    rating: 4.6,
    reviews: 178,
    groupSize: '2–18 people',
    difficulty: 'Easy–Moderate',
    bestTime: 'June – September',
    summary:
      'Leh, Sham Valley and Nubra at a gentle altitude curve — no night above 3,500m for the first three days, and short driving legs throughout.',
    overview:
      'Ladakh is hard on children and grandparents mainly because of how fast most itineraries climb. This one refuses to. Three nights in Leh before going anywhere high, the Sham Valley loop (which actually descends) as the first excursion, and Pangong left out altogether — the Shyok road is too long a day for young children. What remains is the best of the monasteries, the dunes and camels at Hunder, and a trip everybody finishes feeling well.',
    highlights: [
      'Three acclimatisation nights before any high pass',
      'Magnetic Hill and the Indus–Zanskar confluence',
      'Diskit Monastery and the Hunder camel ride',
      'Leh Palace and old-town walk',
      'Alchi\'s thousand-year-old wall paintings',
      'Short driving legs on every day',
    ],
    itinerary: [
      { day: 1, title: 'Arrive Leh — Complete Rest', description: 'Land at Leh and go straight to the hotel. No activity at all on day one — this is what makes the rest of the trip work.' },
      { day: 2, title: 'Leh Old Town, Gently', description: 'A short morning at Leh Palace and the bazaar, with the afternoon free. Sunset at Shanti Stupa if everyone is feeling well.' },
      { day: 3, title: 'Sham Valley — Downhill Day', description: 'The Sham Valley loop actually loses altitude: Magnetic Hill, the Indus–Zanskar confluence at Nimmu, and the ancient wall paintings at Alchi.' },
      { day: 4, title: 'Leh → Nubra via Khardung La', description: 'Over Khardung La with a brief stop only, then down into Nubra. Diskit Monastery and the Maitreya Buddha, then camels on the Hunder dunes.' },
      { day: 5, title: 'Nubra → Leh', description: 'A relaxed morning in Nubra, then the return drive to Leh with plenty of stops. Afternoon free for shopping.' },
      { day: 6, title: 'Thiksey & Departure', description: 'Early morning prayers at Thiksey for anyone who wants them, then the airport transfer.' },
    ],
    included: [
      '5 nights in family-friendly hotels and a Nubra camp',
      'Daily breakfast and dinner',
      'Innova or Tempo Traveller for all transfers',
      'Inner Line permits for Nubra',
      'Camel ride at Hunder',
      'Oxygen cylinder in every vehicle',
    ],
    excluded: [
      'Flights to and from Leh',
      'Lunch on all days',
      'Personal expenses',
      'Travel insurance',
    ],
    activities: ['Camel Safari', 'Monastery Visits', 'Easy Walks', 'Photography', 'Local Markets', 'Stargazing'],
  },
  {
    id: 18,
    slug: 'manali-spiti-backpacker-circuit',
    title: 'Manali–Spiti Backpacker Circuit',
    destinationSlug: 'spiti',
    destinationName: 'Spiti Valley',
    region: 'Himachal',
    image: '/images/spiti.jpg',
    categories: ['solo', 'adventure', 'group'],
    durationDays: 8,
    durationNights: 7,
    price: 14499,
    oldPrice: 17999,
    rating: 4.5,
    reviews: 396,
    groupSize: '8–16 people',
    difficulty: 'Moderate',
    bestTime: 'June – September',
    summary:
      'The whole circuit on a backpacker budget — shared dorms, a tempo traveller full of strangers who will not be strangers by day three.',
    overview:
      'Spiti at roughly half the price of the full odyssey, achieved honestly: shared dorms instead of rooms, a tempo traveller instead of an SUV, and breakfast and dinner rather than all meals. Everything else is the same valley. Fixed departures leave every Saturday from Manali, which means you go in over Rohtang and Kunzum — a faster altitude gain than the Kinnaur route, so the first two days are deliberately light while everybody adjusts.',
    highlights: [
      'Chandratal camping under the Milky Way',
      'Key Monastery and Kibber village',
      'Hikkim — the world\'s highest post office',
      'Fossil hunting at Langza',
      'Fixed Saturday departures',
      'Shared dorms and a trip captain throughout',
    ],
    itinerary: [
      { day: 1, title: 'Manali — Group Meet', description: 'Arrive Manali and check into the hostel. Evening briefing with the trip captain and the rest of the group in the common room.' },
      { day: 2, title: 'Manali → Kaza via Kunzum La', description: 'The long haul over Rohtang and Kunzum La (4,590m), through Batal and Losar into Kaza. A big driving day, deliberately front-loaded.' },
      { day: 3, title: 'Kaza — Rest & Acclimatise', description: 'A light day at 3,800m. Short walk to the Kaza monastery and the market. Nothing strenuous while everyone adjusts.' },
      { day: 4, title: 'Key, Kibber & Hikkim', description: 'Key Monastery in the morning, then up to Kibber and a postcard posted from Hikkim at 4,400m — the highest post office in the world.' },
      { day: 5, title: 'Langza, Komic & Demul', description: 'Fossil hunting below the Langza Buddha, then Komic — one of the highest villages connected by road — and the descent through Demul.' },
      { day: 6, title: 'Pin Valley & Dhankar', description: 'Into Pin Valley National Park, then the cliff-edge monastery at Dhankar and the short walk up to Dhankar Lake.' },
      { day: 7, title: 'Kaza → Chandratal', description: 'Back over Kunzum to Chandratal (4,300m). Walk the lake circuit and camp. No signal, no lights, exceptional stars.' },
      { day: 8, title: 'Chandratal → Manali — Departure', description: 'Sunrise at the lake, then the descent to Manali. Circuit ends in the evening.' },
    ],
    included: [
      '7 nights in hostel dorms, homestays and one night camping',
      'Breakfast and dinner daily',
      'Shared Tempo Traveller for the whole route',
      'Trip captain throughout',
      'Camping gear and sleeping bags at Chandratal',
      'All permits and entry fees',
    ],
    excluded: [
      'Travel to and from Manali',
      'Lunch on all days',
      'Private room upgrades',
      'Personal expenses',
      'Travel insurance',
    ],
    activities: ['High-Altitude Trekking', 'Camping', 'Fossil Hunting', 'Monastery Visits', 'Astrophotography', 'Village Walks'],
    badge: 'Budget Pick',
  },
]

// ── Category definitions (drive the filter chips) ─────────────────────────────

export type CategoryOption = {
  id: PackageCategory | 'all'
  label: string
  /** Key mapped to a lucide icon in the component — keeps this file pure data. */
  icon: string
  description: string
}

export const packageCategories: CategoryOption[] = [
  { id: 'all',        label: 'All Packages',        icon: 'sparkles',      description: 'Every curated trip we run, across all themes and regions.' },
  { id: 'family',     label: 'Family Packages',     icon: 'users',         description: 'Comfortable pacing, kid-friendly stays and zero-stress logistics.' },
  { id: 'honeymoon',  label: 'Honeymoon Packages',  icon: 'heart',         description: 'Private transfers, candlelit dinners and rooms with a view.' },
  { id: 'adventure',  label: 'Adventure Packages',  icon: 'mountain',      description: 'High passes, long treks and rivers that fight back.' },
  { id: 'pilgrimage', label: 'Pilgrimage & Spiritual', icon: 'landmark',   description: 'Temple circuits, aartis and the quiet places in between.' },
  { id: 'wildlife',   label: 'Wildlife & Safari',   icon: 'binoculars',    description: 'Core-zone safaris with naturalists who know the territory.' },
  { id: 'beach',      label: 'Beach & Islands',     icon: 'palmtree',      description: 'Reef dives, white sand and slow island mornings.' },
  { id: 'weekend',    label: 'Weekend Getaways',    icon: 'calendarclock', description: 'Short escapes you can do on a Friday–Sunday.' },
  { id: 'luxury',     label: 'Luxury Escapes',      icon: 'gem',           description: 'Boutique properties, private guides and unhurried days.' },
  { id: 'solo',       label: 'Solo Traveller',      icon: 'backpack',      description: 'Small shared groups, safe stays and flexible days.' },
  { id: 'group',      label: 'Group & Corporate',   icon: 'usersround',    description: 'Departures built for 10+ travellers, offsites and reunions.' },
]

// ── Filter option lists ───────────────────────────────────────────────────────

export const durationOptions = [
  { id: 'all',    label: 'Any duration', min: 0,  max: 99 },
  { id: 'short',  label: '1 – 3 Days',   min: 1,  max: 3  },
  { id: 'medium', label: '4 – 6 Days',   min: 4,  max: 6  },
  { id: 'long',   label: '7 – 9 Days',   min: 7,  max: 9  },
  { id: 'epic',   label: '10+ Days',     min: 10, max: 99 },
] as const

export const budgetOptions = [
  { id: 'all',     label: 'Any budget',        min: 0,      max: 9_999_999 },
  { id: 'value',   label: 'Under ₹15,000',     min: 0,      max: 14_999    },
  { id: 'mid',     label: '₹15,000 – ₹25,000', min: 15_000, max: 25_000    },
  { id: 'high',    label: '₹25,000 – ₹40,000', min: 25_001, max: 40_000    },
  { id: 'premium', label: 'Above ₹40,000',     min: 40_001, max: 9_999_999 },
] as const

export const sortOptions = [
  { id: 'popular',    label: 'Most Popular'       },
  { id: 'price-low',  label: 'Price: Low to High' },
  { id: 'price-high', label: 'Price: High to Low' },
  { id: 'duration',   label: 'Duration: Shortest' },
  { id: 'rating',     label: 'Top Rated'          },
] as const

export type DurationId = (typeof durationOptions)[number]['id']
export type BudgetId = (typeof budgetOptions)[number]['id']
export type SortId = (typeof sortOptions)[number]['id']

// ── Helpers ───────────────────────────────────────────────────────────────────

export function formatPrice(value: number): string {
  return `₹${value.toLocaleString('en-IN')}`
}

export function getPackageBySlug(slug: string): TravelPackage | undefined {
  return travelPackages.find((p) => p.slug === slug)
}

/** Every package running to a destination, cheapest first. */
export function packagesForDestination(destinationSlug: string): TravelPackage[] {
  return travelPackages
    .filter((p) => p.destinationSlug === destinationSlug)
    .sort((a, b) => a.price - b.price)
}

/**
 * Destinations carry no price of their own — the "from" figure a place shows is
 * simply its cheapest package. Returns 0 when nothing runs there yet.
 */
export function fromPrice(destinationSlug: string): number {
  const prices = travelPackages
    .filter((p) => p.destinationSlug === destinationSlug)
    .map((p) => p.price)
  return prices.length ? Math.min(...prices) : 0
}

/** Unique destinations present in the package list — powers the destination filter. */
export const packageDestinations = Array.from(
  new Map(
    travelPackages.map((p) => [p.destinationSlug, { slug: p.destinationSlug, name: p.destinationName }])
  ).values()
).sort((a, b) => a.name.localeCompare(b.name))

/**
 * The six trips in the homepage "Our Popular Packages" strip, in the order they
 * appear there. Managed from /admin/packages — an empty list falls back to the
 * most-reviewed six, so the homepage always has something to show.
 */
export const featuredPackageSlugs: string[] = [
  'rishikesh-adventure-weekend',
  'kedarnath-sacred-yatra',
  'manali-family-retreat',
  'ladakh-high-passes-expedition',
  'varanasi-spiritual-circuit',
  'manali-spiti-backpacker-circuit',
]

/** What the homepage renders: the hand-picked list, or the popular fallback. */
export function homepagePackages(limit = 6): TravelPackage[] {
  const picked = featuredPackageSlugs
    .map((slug) => travelPackages.find((p) => p.slug === slug))
    .filter((p): p is TravelPackage => Boolean(p))

  return picked.length > 0 ? picked.slice(0, limit) : popularPackages(limit)
}

/** Most-reviewed first — used for "Popular Packages" on the homepage. */
export function popularPackages(limit = 6): TravelPackage[] {
  return [...travelPackages].sort((a, b) => b.reviews - a.reviews).slice(0, limit)
}

/** How many packages sit in each category — shown on the filter chips. */
export function countByCategory(category: PackageCategory | 'all'): number {
  if (category === 'all') return travelPackages.length
  return travelPackages.filter((p) => p.categories.includes(category)).length
}
