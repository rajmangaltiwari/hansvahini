// ─────────────────────────────────────────────────────────────────────────────
// Dummy data for the Destinations pages.
// A *destination* is the place itself — what to see, what to do, how to get
// there. It deliberately carries NO price and NO itinerary: those belong to the
// bookable trips in src/data/packages.ts. Use fromPrice(slug) from that file
// when a destination needs to show a "starting from" figure.
// ─────────────────────────────────────────────────────────────────────────────

/** Unsplash placeholder — swap for real photography later. */
const img = (id: string) => `https://images.unsplash.com/photo-${id}?w=800&q=80`

export type Region =
  | 'Himalayas'
  | 'Himachal'
  | 'Uttarakhand'
  | 'Rajasthan'
  | 'Uttar Pradesh'
  | 'Islands'

export type Experience =
  | 'Adventure'
  | 'Spiritual'
  | 'Wildlife'
  | 'Beach'
  | 'Culture'
  | 'Snow'
  | 'Trekking'

/** Buckets the detail page groups "things to do" under. */
export type ActivityCategory = 'Adventure' | 'Spiritual' | 'Nature' | 'Culture'

export type GalleryImage = {
  url: string
  caption: string
}

/** A named place inside a destination — temple, lake, pass, beach, fort. */
export type Attraction = {
  name: string
  category: 'Sightseeing' | 'Adventure' | 'Spiritual' | 'Nature' | 'Culture'
  image: string
  description: string
  /** Rough visit length, e.g. '2 hours', 'Half day'. */
  timeNeeded: string
}

export type ThingToDo = {
  category: ActivityCategory
  image: string
  title: string
  description: string
}

export type HowToReach = {
  byAir: string
  byRail: string
  byRoad: string
}

export type SeasonNote = {
  season: string
  months: string
  note: string
}

export type Destination = {
  slug: string
  name: string
  tagline: string
  heroImage: string
  image: string
  overview: string
  /** What the place is known for — not trip inclusions. */
  highlights: string[]
  bestTime: string
  difficulty: string
  gallery: GalleryImage[]

  // ── Place guide ──
  attractions: Attraction[]
  thingsToDo: ThingToDo[]
  howToReach: HowToReach
  seasons: SeasonNote[]
  travelTips: string[]
  localFood: string[]

  // ── Listing metadata — drives the cards, filters and sorting ──
  region: Region
  experiences: Experience[]
  /** Short one-liner for cards; `overview` is far too long for a grid. */
  blurb: string
  rating: number
  reviews: number
  /** How many packages we currently run here. Kept in sync with packages.ts. */
  tripCount: number
  trending?: boolean
  badge?: string
}

export const destinations: Destination[] = [
  {
    slug: 'ladakh',
    name: 'Ladakh',
    tagline: 'Land of High Passes',
    heroImage: '/images/ladakh.jpg',
    image: '/images/ladakh.jpg',
    overview:
      'Ladakh is a high-altitude desert carved by rivers and hemmed in by the Himalaya on one side and the Karakoram on the other. Everything about it is extreme: the light, the altitude, the emptiness, the colour of the water. Monasteries sit on ridgelines a thousand years old, roads climb over passes higher than any mountain in Europe, and villages survive on glacier melt channelled through hand-cut irrigation. It is the closest thing India has to another planet, and it rewards travellers who slow down enough to acclimatise properly.',
    highlights: [
      'Pangong Tso — the lake that changes colour hour by hour',
      'Khardung La, among the highest motorable roads on earth',
      'Nubra Valley and its double-humped Bactrian camels',
      'Thiksey, Hemis and Diskit monasteries',
      'The confluence of the Indus and Zanskar at Nimmu',
      'Some of the darkest night skies in the country',
    ],
    bestTime: 'June – September',
    difficulty: 'Moderate',
    attractions: [
      { name: 'Pangong Tso', category: 'Nature', image: img('1589308078059-be1415eab4c3'), description: 'A 134km endorheic lake at 4,350m, two-thirds of which lies in Tibet. The water shifts from turquoise to deep indigo as the sun moves.', timeNeeded: 'Overnight' },
      { name: 'Khardung La', category: 'Adventure', image: img('1506905925346-21bda4d32df4'), description: 'The pass to Nubra at 5,359m. Prayer flags, a tea stall and air with roughly half the oxygen of sea level. Stop briefly, do not linger.', timeNeeded: '30 minutes' },
      { name: 'Thiksey Monastery', category: 'Spiritual', image: img('1516426122078-c23e76319801'), description: 'A twelve-storey complex whose tiered profile deliberately echoes the Potala in Lhasa. Dawn prayers here are the best hour in Ladakh.', timeNeeded: '2 hours' },
      { name: 'Nubra Valley & Hunder Dunes', category: 'Sightseeing', image: img('1502086223501-7ea6ecd79368'), description: 'Silver sand dunes at 3,000m where Bactrian camels, left over from Silk Road caravans, still graze between the seabuckthorn.', timeNeeded: 'Full day' },
      { name: 'Hemis Monastery', category: 'Spiritual', image: img('1464822759023-fed622ff2c3b'), description: 'The largest and wealthiest gompa in Ladakh, hidden in a side gorge. Its June festival brings masked cham dances to the courtyard.', timeNeeded: '2 hours' },
      { name: 'Leh Palace & Old Town', category: 'Culture', image: img('1537905569824-f89f14cceb68'), description: 'A nine-storey seventeenth-century palace above a warren of mud-brick lanes, slowly being restored house by house.', timeNeeded: 'Half day' },
    ],
    thingsToDo: [
      { category: 'Adventure', image: img('1502086223501-7ea6ecd79368'), title: 'Drive the high passes', description: 'Khardung La, Chang La and Wari La in a single trip — three of the highest roads anywhere, all crossable between June and September.' },
      { category: 'Adventure', image: img('1464822759023-fed622ff2c3b'), title: 'Raft the Zanskar', description: 'The Chilling to Nimmu stretch runs Grade III through a gorge with no road access. Runs from late June once the melt settles.' },
      { category: 'Spiritual', image: img('1537905569824-f89f14cceb68'), title: 'Sit in on morning prayers', description: 'Thiksey and Hemis both open the prayer hall at dawn. Butter lamps, long horns, and no other visitors for the first hour.' },
      { category: 'Nature', image: img('1589308078059-be1415eab4c3'), title: 'Camp beside Pangong', description: 'Sleep on the shore at 4,350m. Cold, thin-aired and completely silent, with the Milky Way visible to the horizon.' },
      { category: 'Culture', image: img('1506905925346-21bda4d32df4'), title: 'Ride a Bactrian camel at Hunder', description: 'The double-humped camels of the old Central Asian trade routes, still working the dunes in the late afternoon.' },
      { category: 'Nature', image: img('1516426122078-c23e76319801'), title: 'Photograph the Indus–Zanskar confluence', description: 'Two rivers of visibly different colours meeting at Nimmu — brown and green in summer, both jade in winter.' },
    ],
    howToReach: {
      byAir: 'Kushok Bakula Rimpochee Airport (IXL) in Leh has direct flights from Delhi, Mumbai, Srinagar and Jammu. Morning departures only, as afternoon winds close the valley.',
      byRail: 'The nearest railhead is Jammu Tawi, about 700km away. Expect two full days on the road from there via Srinagar and Kargil.',
      byRoad: 'Two highways open seasonally — Srinagar–Leh (May to November) and Manali–Leh (June to October). Both are two-day drives and both are extraordinary.',
    },
    seasons: [
      { season: 'Peak',      months: 'June – September', note: 'All passes and both highways open. Warmest weather, busiest camps, and the only reliable window for Pangong and Nubra.' },
      { season: 'Shoulder',  months: 'May & October',    note: 'Fewer people and better light. Nights fall below freezing and the Manali highway may be shut at either end.' },
      { season: 'Winter',    months: 'November – April', note: 'Roads closed; flights only. This is Chadar trek season on the frozen Zanskar, for the very well prepared.' },
    ],
    travelTips: [
      'Give yourself two full days in Leh doing nothing before going any higher. Altitude sickness is the single most common reason trips go wrong here.',
      'Carry a printed copy of your Inner Line Permit — checkposts at Nubra and Pangong will not accept a phone screenshot.',
      'ATMs exist only in Leh and often run dry. Draw enough cash for the whole trip before you leave town.',
      'Mobile coverage is postpaid-only in Ladakh, and there is none at all beyond Khardung La. Tell people at home in advance.',
      'Drink far more water than feels natural — three to four litres a day — and avoid alcohol for the first 48 hours.',
    ],
    localFood: ['Thukpa — hand-pulled noodle soup', 'Momos with fiery chutney', 'Skyu — wheat pasta stew', 'Butter tea (gur gur cha)', 'Apricot jam and dried apricots', 'Chhang, the local barley beer'],
    gallery: [
      { url: img('1589308078059-be1415eab4c3'), caption: 'Pangong Tso Lake at dawn' },
      { url: img('1506905925346-21bda4d32df4'), caption: 'Mountain roads of Ladakh' },
      { url: img('1464822759023-fed622ff2c3b'), caption: 'Himalayan peaks above the clouds' },
      { url: img('1502086223501-7ea6ecd79368'), caption: 'Nubra Valley sand dunes' },
      { url: img('1516426122078-c23e76319801'), caption: 'Exploring the monastery trails' },
      { url: img('1537905569824-f89f14cceb68'), caption: 'Stargazing camp in Ladakh' },
    ],
    region: 'Himalayas',
    experiences: ['Adventure', 'Trekking', 'Culture', 'Snow'],
    blurb: 'A high-altitude desert of glacial lakes, 5,000m passes and monasteries clinging to bare rock.',
    rating: 4.9,
    reviews: 412,
    tripCount: 3,
    trending: true,
    badge: 'Bestseller',
  },
  {
    slug: 'manali',
    name: 'Manali',
    tagline: 'Queen of Himachal',
    heroImage: '/images/manali.jpg',
    image: '/images/manali.jpg',
    overview:
      'Manali sits at 2,050m where the Beas river runs through a valley of deodar and apple orchard. It is the easiest Himalayan town in India to reach and consequently the busiest, but the crowds thin the moment you walk uphill into Old Manali or drive twenty minutes towards Solang. It works as a first mountain trip, a snow trip, an adventure-sports base and the southern gateway to both Spiti and Ladakh — which is a lot of jobs for one small town, and it does all of them well.',
    highlights: [
      'Rohtang Pass and reliable snow into June',
      'Solang Valley — paragliding, ropeway and skiing',
      'The 16th-century Hadimba Devi Temple',
      'Old Manali cafés, orchards and the Manu Temple',
      'Grade II–III rafting on the Beas at Kullu',
      'Gateway to the Spiti and Ladakh highways',
    ],
    bestTime: 'October – June',
    difficulty: 'Easy–Moderate',
    attractions: [
      { name: 'Rohtang Pass', category: 'Adventure', image: img('1626621341517-bbf3d9990a23'), description: 'At 3,978m, the gateway to Lahaul and the most reliable snow within reach of Manali. Requires a permit and an early start.', timeNeeded: 'Full day' },
      { name: 'Solang Valley', category: 'Adventure', image: img('1500534314209-a25ddb2bd429'), description: 'A broad meadow below the Beas Kund glacier that turns into an activity park — paragliding, zorbing, tubing and a ropeway to the ridge.', timeNeeded: 'Full day' },
      { name: 'Hadimba Devi Temple', category: 'Spiritual', image: img('1506905925346-21bda4d32df4'), description: 'A 1553 pagoda of carved cedar in a grove of enormous deodars, dedicated to the demoness wife of Bhima from the Mahabharata.', timeNeeded: '1 hour' },
      { name: 'Old Manali', category: 'Culture', image: img('1537905569824-f89f14cceb68'), description: 'Uphill across the river: stone houses, apple orchards, the Manu Temple, and a café strip that has been drawing travellers since the seventies.', timeNeeded: 'Half day' },
      { name: 'Jogini Waterfall', category: 'Nature', image: img('1464822759023-fed622ff2c3b'), description: 'A 45-minute walk from Vashisht through orchards and pine to a 150ft fall with pools you can swim in during summer.', timeNeeded: '3 hours' },
      { name: 'Beas River Rafting', category: 'Adventure', image: img('1530866495561-507c9faab2ed'), description: 'The Pirdi to Jhiri stretch near Kullu runs Grade II–III — enough to be exciting, gentle enough for children over eight.', timeNeeded: 'Half day' },
    ],
    thingsToDo: [
      { category: 'Adventure', image: img('1537905569824-f89f14cceb68'), title: 'Paraglide over Solang', description: 'Tandem flights from the ridge above Solang, landing in the meadow. Runs most mornings between April and June and again in October.' },
      { category: 'Adventure', image: img('1464822759023-fed622ff2c3b'), title: 'Raft the Beas', description: 'A 14km Grade II–III run below Kullu, with the option of body surfing in the calm stretches at the end.' },
      { category: 'Nature', image: img('1530866495561-507c9faab2ed'), title: 'Soak in the Vashisht hot springs', description: 'Natural sulphur springs feeding stone bath houses beside a small temple, a short walk from town and free to enter.' },
      { category: 'Culture', image: img('1626621341517-bbf3d9990a23'), title: 'Wander Old Manali at dusk', description: 'Cross the bridge and climb through orchards to the café strip, which fills up with musicians and travellers as the light goes.' },
      { category: 'Adventure', image: img('1500534314209-a25ddb2bd429'), title: 'Trek to Bhrigu Lake', description: 'A two-day hike to an alpine lake at 4,240m above Gulaba, doable between June and October with a guide.' },
      { category: 'Spiritual', image: img('1506905925346-21bda4d32df4'), title: 'Visit the Manu Temple', description: 'The only temple in India dedicated to Manu, the progenitor of humanity in Hindu tradition, tucked into the top of Old Manali.' },
    ],
    howToReach: {
      byAir: 'Bhuntar Airport (KUU) is 50km south with limited flights from Delhi and Chandigarh. Most travellers fly to Chandigarh instead and drive the remaining 8 hours.',
      byRail: 'The nearest broad-gauge railhead is Chandigarh (310km). The narrow-gauge toy train to Joginder Nagar is a scenic but slow alternative.',
      byRoad: 'Overnight Volvo coaches run nightly from Delhi (540km, 12–14 hours) and Chandigarh (310km, 8 hours). The road is open year-round.',
    },
    seasons: [
      { season: 'Summer', months: 'March – June',      note: 'The classic season. Snow still lies at Rohtang while the valley is in blossom. Also the busiest and priciest window.' },
      { season: 'Monsoon', months: 'July – September', note: 'Green, cheap and quiet, but landslides regularly close the Kullu road. Rafting is suspended at peak flow.' },
      { season: 'Winter', months: 'October – February', note: 'Snowfall in town from late December. Rohtang closes, but Solang skiing opens and the crowds vanish.' },
    ],
    travelTips: [
      'Rohtang Pass requires an online permit and is closed on Tuesdays for maintenance — book several days ahead in season.',
      'Adventure activities at Solang are priced individually and negotiated on the spot. Agree the rate before you get in the harness.',
      'The overnight Volvo from Delhi saves a hotel night, but sit at the front — the mountain road from Mandi upward is relentless.',
      'Old Manali largely shuts down between November and February. Stay near Mall Road if you are visiting in deep winter.',
      'If you are continuing to Spiti or Leh, budget a spare day. Both highways close at short notice.',
    ],
    localFood: ['Siddu — steamed stuffed bread', 'Trout from the Beas hatcheries', 'Dham, the Himachali festive thali', 'Babru, a Himachali kachori', 'Apple cider and apple pie', 'Chha gosht — yoghurt-braised lamb'],
    gallery: [
      { url: img('1626621341517-bbf3d9990a23'), caption: 'Rohtang Pass snowfields' },
      { url: img('1464822759023-fed622ff2c3b'), caption: 'Snow-covered Himalayan peaks' },
      { url: img('1537905569824-f89f14cceb68'), caption: 'Campfire evenings in Manali' },
      { url: img('1500534314209-a25ddb2bd429'), caption: 'Trekkers in Solang Valley' },
      { url: img('1530866495561-507c9faab2ed'), caption: 'River rafting on the Beas' },
      { url: img('1506905925346-21bda4d32df4'), caption: 'Hadimba Temple cedar forest' },
    ],
    region: 'Himachal',
    experiences: ['Snow', 'Adventure', 'Culture'],
    blurb: 'Deodar forests, the Beas running through town, and snow at Rohtang an hour up the road.',
    rating: 4.7,
    reviews: 528,
    tripCount: 3,
    trending: true,
  },
  {
    slug: 'spiti',
    name: 'Spiti Valley',
    tagline: 'The Middle Land',
    heroImage: '/images/spiti.jpg',
    image: '/images/spiti.jpg',
    overview:
      'Spiti means "the middle land" — the ground between India and Tibet, and it looks the part. This is a cold desert at an average of 4,000m, cut off by snow for six months a year, where barely 12,000 people live in villages of whitewashed mud brick. The monasteries here are among the oldest continuously functioning in the world, the fossils in the riverbeds are from the Tethys Sea, and the night sky is as good as anywhere on the subcontinent. It asks more of visitors than anywhere else in this list, and gives back accordingly.',
    highlights: [
      'Key Monastery, a thousand years old at 4,166m',
      'Chandratal — the crescent-shaped moon lake',
      'Hikkim, the highest post office in the world',
      'Kibber, Komic and Langza, among the highest villages anywhere',
      'Pin Valley National Park and its snow leopards',
      'Tabo Monastery, founded in 996 AD',
    ],
    bestTime: 'June – September',
    difficulty: 'Challenging',
    attractions: [
      { name: 'Key Monastery', category: 'Spiritual', image: img('1506905925346-21bda4d32df4'), description: 'A thousand-year-old fortified gompa stacked up a conical hill at 4,166m, still home to around 250 monks.', timeNeeded: '2 hours' },
      { name: 'Chandratal Lake', category: 'Nature', image: img('1464822759023-fed622ff2c3b'), description: 'A crescent glacial lake at 4,300m below Kunzum Pass. No electricity, no signal, and consequently no light pollution.', timeNeeded: 'Overnight' },
      { name: 'Hikkim Post Office', category: 'Culture', image: img('1589308078059-be1415eab4c3'), description: 'At 4,400m, the highest functioning post office on earth. Postcards genuinely arrive, usually about a month later.', timeNeeded: '1 hour' },
      { name: 'Tabo Monastery', category: 'Spiritual', image: img('1502086223501-7ea6ecd79368'), description: 'Founded in 996 AD and never abandoned since — mud-walled halls holding some of the finest early Buddhist murals in existence.', timeNeeded: '2 hours' },
      { name: 'Pin Valley National Park', category: 'Nature', image: img('1537905569824-f89f14cceb68'), description: 'A 675 sq km cold-desert park sheltering snow leopard, Siberian ibex and the rare Himalayan wolf.', timeNeeded: 'Full day' },
      { name: 'Dhankar Monastery', category: 'Sightseeing', image: img('1626621341517-bbf3d9990a23'), description: 'Perched on an eroding spur between the Spiti and Pin rivers, with a short walk up to a startlingly green lake behind it.', timeNeeded: 'Half day' },
    ],
    thingsToDo: [
      { category: 'Nature', image: img('1502086223501-7ea6ecd79368'), title: 'Camp at Chandratal', description: 'The lake sits an hour off the road below Kunzum La. Camps run July to September only and you sleep at 4,300m — come acclimatised.' },
      { category: 'Adventure', image: img('1537905569824-f89f14cceb68'), title: 'Hunt for fossils at Langza', description: 'The hills below the giant Buddha statue are littered with ammonites from the Tethys Sea. Look, photograph, and leave them where they are.' },
      { category: 'Spiritual', image: img('1626621341517-bbf3d9990a23'), title: 'Attend morning prayers at Key', description: 'The prayer hall opens at dawn. Long horns, butter lamps and 250 monks, with almost no other visitors present.' },
      { category: 'Culture', image: img('1506905925346-21bda4d32df4'), title: 'Stay in a village homestay', description: 'Families in Kaza, Langza and Demul take guests. You eat what the household eats and sleep under yak-wool blankets.' },
      { category: 'Adventure', image: img('1464822759023-fed622ff2c3b'), title: 'Cross Kunzum La', description: 'At 4,590m, the pass linking Spiti to Lahaul. Tradition is a full circle of the chortens at the top before continuing.' },
      { category: 'Nature', image: img('1589308078059-be1415eab4c3'), title: 'Photograph the Milky Way', description: 'There is no artificial light for tens of kilometres in any direction. A tripod and a clear June night is all it takes.' },
    ],
    howToReach: {
      byAir: 'Bhuntar (KUU) near Kullu is the closest airport, roughly 200km from Kaza over Rohtang and Kunzum. Chandigarh is the more reliable option.',
      byRail: 'Shimla is the nearest useful railhead via the narrow-gauge Kalka–Shimla line, then a two-day drive in through Kinnaur.',
      byRoad: 'Two routes: Shimla–Kinnaur–Kaza (open most of the year, gains altitude gradually) and Manali–Kunzum–Kaza (June to October, far faster and far harder on the body).',
    },
    seasons: [
      { season: 'Peak',       months: 'June – September',  note: 'Both routes open and Chandratal is reachable. The only window in which the full circuit is possible.' },
      { season: 'Shoulder',   months: 'May & October',     note: 'Kinnaur route only. Cold, empty and beautiful, but Kunzum and Chandratal stay shut.' },
      { season: 'Deep winter', months: 'November – April', note: 'Kinnaur route only, often with delays. This is snow leopard season — for well-equipped expeditions rather than casual visits.' },
    ],
    travelTips: [
      'Enter via Shimla and Kinnaur if you can. Coming in over Kunzum from Manali gains 3,000m in a day and makes a lot of people very ill.',
      'There is one ATM in Kaza and it fails often. Carry all the cash you will need for the valley.',
      'BSNL is the only network with any coverage, and only around Kaza. Assume you are offline everywhere else.',
      'Nights fall below freezing even in July. Pack a proper down layer regardless of what the plains forecast says.',
      'Fuel is available at Kaza and Tabo only — the stretch to Manali is over 200km with no pump. Fill up whenever you can.',
    ],
    localFood: ['Thukpa and thenthuk noodle soups', 'Momos, steamed and fried', 'Chhurpi — hardened yak cheese', 'Seabuckthorn juice', 'Butter tea', 'Tsampa — roasted barley flour'],
    gallery: [
      { url: img('1506905925346-21bda4d32df4'), caption: 'Key Monastery at golden hour' },
      { url: img('1464822759023-fed622ff2c3b'), caption: 'Chandratal Moon Lake' },
      { url: img('1502086223501-7ea6ecd79368'), caption: 'Spiti Valley high-altitude landscape' },
      { url: img('1589308078059-be1415eab4c3'), caption: 'Village life in Kibber' },
      { url: img('1537905569824-f89f14cceb68'), caption: 'Camping under the Milky Way' },
      { url: img('1626621341517-bbf3d9990a23'), caption: 'Kunzum Pass gateway' },
    ],
    region: 'Himachal',
    experiences: ['Adventure', 'Trekking', 'Wildlife', 'Culture'],
    blurb: 'The cold desert — thousand-year-old monasteries, villages above 4,000m and skies with no light pollution.',
    rating: 4.9,
    reviews: 243,
    tripCount: 3,
    badge: 'For Explorers',
  },
  {
    slug: 'kedarnath',
    name: 'Kedarnath',
    tagline: 'Abode of Lord Shiva',
    heroImage: '/images/kedarnath.jpg',
    image: '/images/kedarnath.jpg',
    overview:
      'Kedarnath sits at 3,583m in the Garhwal Himalaya, one of the twelve Jyotirlingas and the most physically demanding of the Char Dham. The stone temple is over a thousand years old, backed by the Kedarnath peak and flanked by the Chorabari and Companion glaciers. There is no road: everyone walks, rides or flies the last sixteen kilometres from Gaurikund. That effort is the point, and it is why the place still feels like a pilgrimage rather than a destination.',
    highlights: [
      'The Kedarnath Temple and its Jyotirlinga',
      'The 16km trek up from Gaurikund',
      'Chopta — the meadow they call mini Switzerland',
      'Tungnath, the highest Shiva temple in the world',
      'Chandrashila summit and its 360° Himalayan view',
      'Vasuki Tal, a glacial lake above the temple',
    ],
    bestTime: 'May – June, September – November',
    difficulty: 'Moderate',
    attractions: [
      { name: 'Kedarnath Temple', category: 'Spiritual', image: img('1472396961693-142e6e269027'), description: 'A stone shrine of interlocking grey slabs, built without mortar and standing since at least the eighth century. It survived the 2013 floods intact.', timeNeeded: 'Half day' },
      { name: 'Gaurikund', category: 'Spiritual', image: img('1589308078059-be1415eab4c3'), description: 'The trailhead at 1,982m, with hot springs where Parvati is said to have bathed while performing penance for Shiva.', timeNeeded: '2 hours' },
      { name: 'Tungnath Temple', category: 'Spiritual', image: img('1500534314209-a25ddb2bd429'), description: 'At 3,680m, the highest Shiva temple on earth and the loftiest of the Panch Kedar. A 3.5km climb from Chopta.', timeNeeded: 'Half day' },
      { name: 'Chandrashila Peak', category: 'Adventure', image: img('1464822759023-fed622ff2c3b'), description: 'A further 1.5km above Tungnath to 4,130m, with Nanda Devi, Trishul and Chaukhamba laid out around you at sunrise.', timeNeeded: '4 hours' },
      { name: 'Chopta', category: 'Nature', image: img('1506905925346-21bda4d32df4'), description: 'High meadows of rhododendron and alpine grass at 2,680m, empty enough that the nickname mini Switzerland is not entirely absurd.', timeNeeded: 'Full day' },
      { name: 'Vasuki Tal', category: 'Nature', image: img('1502086223501-7ea6ecd79368'), description: 'A glacial lake at 4,135m, 8km above the temple past the Chaturangi glacier. A serious day hike for the well acclimatised.', timeNeeded: 'Full day' },
    ],
    thingsToDo: [
      { category: 'Spiritual', image: img('1464822759023-fed622ff2c3b'), title: 'Attend the dawn abhishek', description: 'The morning ritual bathing of the lingam begins around 4am. Staying overnight at Kedarnath is the only way to be there for it.' },
      { category: 'Adventure', image: img('1506905925346-21bda4d32df4'), title: 'Walk up from Gaurikund', description: 'Sixteen kilometres and 1,600m of ascent through forest, waterfall and moraine. Ponies and porters are available at every stage.' },
      { category: 'Adventure', image: img('1502086223501-7ea6ecd79368'), title: 'Summit Chandrashila at sunrise', description: 'Leave Chopta at 4am to be on top for first light. On a clear day the entire Garhwal range is visible.' },
      { category: 'Nature', image: img('1472396961693-142e6e269027'), title: 'Walk to the Chorabari glacier', description: 'A short hike behind the temple to the glacier snout and Gandhi Sarovar, where part of Gandhi\'s ashes were immersed.' },
      { category: 'Spiritual', image: img('1589308078059-be1415eab4c3'), title: 'Visit Bhairavnath Temple', description: 'A short climb above the main temple to the shrine of its guardian deity, who is said to protect Kedarnath through the closed winter months.' },
      { category: 'Nature', image: img('1500534314209-a25ddb2bd429'), title: 'Birdwatch in the Chopta forest', description: 'Monal, koklass pheasant and Himalayan griffon all occur along the Tungnath trail through the rhododendron belt.' },
    ],
    howToReach: {
      byAir: 'Jolly Grant Airport at Dehradun (239km) is the nearest, with daily flights from Delhi. Helicopter services to Kedarnath run from Phata and Sersi in season.',
      byRail: 'Rishikesh (216km) and Haridwar (239km) are the closest railheads, both well connected to Delhi overnight.',
      byRoad: 'Drive to Sonprayag via Rudraprayag and Guptkashi, then a shuttle to Gaurikund. The last 16km to the temple is on foot, pony or helicopter.',
    },
    seasons: [
      { season: 'Opening',    months: 'Late April – June',   note: 'The temple opens on Akshaya Tritiya. Snow still lies on the trail in May. Busiest period of the year.' },
      { season: 'Monsoon',    months: 'July – August',       note: 'Heavy rain and real landslide risk on the Garhwal roads. Generally best avoided.' },
      { season: 'Post-monsoon', months: 'September – November', note: 'The best window — clear skies, firm trail, thinner crowds. The temple closes for winter around Diwali.' },
    ],
    travelTips: [
      'Register for the Char Dham Yatra online before you travel; biometric registration is checked at Sonprayag.',
      'Start the climb from Gaurikund by 6am. The weather closes in most afternoons and the last stretch is exposed.',
      'Carry cash. There are no ATMs beyond Guptkashi and porters, ponies and shops at Kedarnath are cash-only.',
      'Helicopter tickets sell out weeks ahead in peak season and flights are cancelled at short notice for cloud. Keep a spare day.',
      'The temple is at 3,583m — treat it as a high-altitude trek, not a temple visit. Ascend slowly and stay hydrated.',
    ],
    localFood: ['Aloo ke gutke', 'Mandua ki roti — finger millet bread', 'Jhangore ki kheer', 'Bhatt ki churkani', 'Hot ginger-lemon-honey on the trail', 'Simple langar meals at the temple'],
    gallery: [
      { url: img('1472396961693-142e6e269027'), caption: 'Trek route to Kedarnath' },
      { url: img('1464822759023-fed622ff2c3b'), caption: 'Snow-capped peaks near Kedarnath' },
      { url: img('1502086223501-7ea6ecd79368'), caption: 'Pilgrims on the yatra trail' },
      { url: img('1506905925346-21bda4d32df4'), caption: 'Chopta meadows in bloom' },
      { url: img('1500534314209-a25ddb2bd429'), caption: 'Trekkers ascending to Tungnath' },
      { url: img('1589308078059-be1415eab4c3'), caption: 'Himalayan wilderness near Gaurikund' },
    ],
    region: 'Uttarakhand',
    experiences: ['Spiritual', 'Trekking'],
    blurb: 'One of the twelve Jyotirlingas, reached on foot through a valley the mountains close behind you.',
    rating: 4.8,
    reviews: 690,
    tripCount: 2,
    badge: 'Most Booked',
  },
  {
    slug: 'rishikesh',
    name: 'Rishikesh',
    tagline: 'Yoga Capital of the World',
    heroImage: '/images/rishikesh.jpg',
    image: '/images/rishikesh.jpg',
    overview:
      'Rishikesh is where the Ganga leaves the Himalaya and hits the plains, and the town has built two entirely different reputations on that one fact. Upstream it is India\'s white-water capital, with Grade III and IV rapids running past the rafting camps at Shivpuri. Downstream it is the yoga capital, a belt of ashrams and meditation halls that has drawn seekers since long before the Beatles turned up in 1968. Both versions coexist within about four kilometres of river, along with Haridwar\'s enormous evening aarti twenty minutes south.',
    highlights: [
      'White-water rafting through Grade III–IV rapids',
      'Ganga Aarti at Har Ki Pauri and Triveni Ghat',
      'Laxman Jhula and Ram Jhula suspension bridges',
      'The Beatles Ashram at Chaurasi Kutia',
      'India\'s highest bungee jump at Jumpin Heights',
      'Hundreds of ashrams and yoga schools',
    ],
    bestTime: 'October – March',
    difficulty: 'Easy',
    attractions: [
      { name: 'Har Ki Pauri, Haridwar', category: 'Spiritual', image: img('1602216056096-3b40cc0c9944'), description: 'The ghat where Vishnu is said to have left a footprint. Its evening aarti sets hundreds of lamps onto the current at once.', timeNeeded: '2 hours' },
      { name: 'Laxman Jhula', category: 'Sightseeing', image: img('1558618666-fcd25c85cd64'), description: 'A 450ft iron suspension bridge where Lakshmana is said to have crossed the river on jute rope. The view down the gorge is the draw.', timeNeeded: '1 hour' },
      { name: 'Shivpuri Rafting Stretch', category: 'Adventure', image: img('1530866495561-507c9faab2ed'), description: 'The 16km run past Roller Coaster and Golf Course, the two rapids everyone comes for. The longer 26km option starts at Marine Drive.', timeNeeded: 'Half day' },
      { name: 'Beatles Ashram', category: 'Culture', image: img('1502086223501-7ea6ecd79368'), description: 'Chaurasi Kutia, where the band studied transcendental meditation in 1968. Abandoned to the forest for decades, now covered in murals.', timeNeeded: '2 hours' },
      { name: 'Triveni Ghat', category: 'Spiritual', image: img('1500534314209-a25ddb2bd429'), description: 'Rishikesh\'s main bathing ghat, where three rivers are said to meet. Quieter and more local than Haridwar\'s aarti.', timeNeeded: '2 hours' },
      { name: 'Neer Garh Waterfall', category: 'Nature', image: img('1537905569824-f89f14cceb68'), description: 'A 30-minute walk uphill from Laxman Jhula to a three-tiered fall with pools you can swim in outside the monsoon.', timeNeeded: '3 hours' },
    ],
    thingsToDo: [
      { category: 'Adventure', image: img('1502086223501-7ea6ecd79368'), title: 'Raft the 26km stretch', description: 'From Marine Drive to Laxman Jhula through Three Blind Mice, Cash Flow, Roller Coaster and Golf Course. September to June, no experience needed.' },
      { category: 'Adventure', image: img('1500534314209-a25ddb2bd429'), title: 'Bungee jump at Jumpin Heights', description: 'India\'s highest fixed-platform jump at 83m, over a rocky gorge near Mohanchatti. Operated to international safety standards.' },
      { category: 'Spiritual', image: img('1537905569824-f89f14cceb68'), title: 'Take a yoga course', description: 'Everything from drop-in morning classes to 200-hour teacher trainings. Parmarth Niketan and Sivananda are the best-known schools.' },
      { category: 'Spiritual', image: img('1602216056096-3b40cc0c9944'), title: 'Watch the Ganga Aarti', description: 'Har Ki Pauri at Haridwar for scale and spectacle, or Parmarth Niketan at Rishikesh for something calmer and more musical.' },
      { category: 'Nature', image: img('1558618666-fcd25c85cd64'), title: 'Camp on the riverbank', description: 'Beach camps upstream at Shivpuri and Byasi put you on the sand with a bonfire, well away from the town.' },
      { category: 'Culture', image: img('1530866495561-507c9faab2ed'), title: 'Walk the ashram belt', description: 'From Ram Jhula to Swarg Ashram on foot — bookshops, kirtan halls, ayurvedic clinics and the largest Shiva statue on the river.' },
    ],
    howToReach: {
      byAir: 'Jolly Grant Airport at Dehradun is 20km away with daily Delhi flights — the easiest access of any destination on this list.',
      byRail: 'Haridwar Junction (25km) is the main railhead with frequent overnight trains from Delhi. Rishikesh has its own smaller station.',
      byRoad: 'Six hours from Delhi (240km) on good highway, with regular state and private buses to both Haridwar and Rishikesh.',
    },
    seasons: [
      { season: 'Peak',     months: 'September – November', note: 'Post-monsoon: the river is high and fast, the air is clear, and rafting is at its best.' },
      { season: 'Winter',   months: 'December – March',     note: 'Cold mornings but excellent for yoga courses and long walks. Rafting continues throughout.' },
      { season: 'Monsoon',  months: 'July – August',        note: 'Rafting is suspended entirely for safety. The town is green, cheap and very quiet.' },
    ],
    travelTips: [
      'Rafting shuts down through July and August. If the river is the reason you are coming, avoid the monsoon.',
      'Rishikesh is a vegetarian and alcohol-free town by law. Plan accordingly, and do not try to bring either in.',
      'Most ashrams have a curfew, usually around 10pm, and some require a minimum stay. Check before booking.',
      'The bridges get extremely crowded in the evening. Cross at Ram Jhula rather than Laxman Jhula if you are in a hurry.',
      'Dress modestly around the ghats and temples — shoulders and knees covered for everyone, not only women.',
    ],
    localFood: ['Aloo puri at the ghats', 'Sattvic ashram thalis', 'Chotiwala\'s famous meal', 'Ginger-lemon-honey tea', 'German bakery cakes at Laxman Jhula', 'Kachori and jalebi in Haridwar'],
    gallery: [
      { url: img('1602216056096-3b40cc0c9944'), caption: 'Ganga Aarti at Haridwar' },
      { url: img('1530866495561-507c9faab2ed'), caption: 'White water rafting on the Ganga' },
      { url: img('1558618666-fcd25c85cd64'), caption: 'Laxman Jhula suspension bridge' },
      { url: img('1537905569824-f89f14cceb68'), caption: 'Camping by the river Ganga' },
      { url: img('1500534314209-a25ddb2bd429'), caption: 'Yoga on the ghats at sunrise' },
      { url: img('1502086223501-7ea6ecd79368'), caption: 'Ashram life in Rishikesh' },
    ],
    region: 'Uttarakhand',
    experiences: ['Adventure', 'Spiritual', 'Culture'],
    blurb: 'Grade III rapids in the afternoon, the Ganga aarti at dusk, and an ashram bell before sunrise.',
    rating: 4.7,
    reviews: 745,
    tripCount: 2,
    trending: true,
  },
  {
    slug: 'ranthambore',
    name: 'Ranthambore',
    tagline: 'Tiger Country',
    heroImage: '/images/ranthambore.jpg',
    image: '/images/ranthambore.jpg',
    overview:
      'Ranthambore covers 1,334 sq km of dry deciduous forest, grassland and lake in south-eastern Rajasthan, and it is the most reliable place in India to see a wild tiger. What sets it apart is the setting: a tenth-century fort stands directly inside the reserve, and the tigers move through ruined pavilions, step wells and banyan roots as easily as through the scrub. Alongside roughly seventy tigers, the park holds leopard, sloth bear, marsh crocodile and over three hundred bird species.',
    highlights: [
      'One of India\'s highest tiger sighting rates',
      'Ranthambore Fort, a UNESCO World Heritage site inside the park',
      'Padam Talao and Malik Talao at dawn',
      'Leopard, sloth bear and marsh crocodile',
      'Over 300 resident and migratory bird species',
      'Ten safari zones, each with distinct terrain',
    ],
    bestTime: 'October – June',
    difficulty: 'Easy',
    attractions: [
      { name: 'Ranthambore Fort', category: 'Culture', image: img('1502086223501-7ea6ecd79368'), description: 'A tenth-century Chauhan stronghold on a 700ft outcrop inside the reserve, with temples, step wells and views over the whole park.', timeNeeded: 'Half day' },
      { name: 'Padam Talao', category: 'Nature', image: img('1464822759023-fed622ff2c3b'), description: 'The largest lake in the park, edged with water lilies and overlooked by the Jogi Mahal. Prime territory for dawn tiger sightings.', timeNeeded: '2 hours' },
      { name: 'Zone 3 — Rajbagh', category: 'Adventure', image: img('1561731216-c3a4d99437d5'), description: 'Ruined pavilions half-sunk in a lake, and the zone most photographed for tigers moving through the arches at dusk.', timeNeeded: 'Half day' },
      { name: 'Trinetra Ganesh Temple', category: 'Spiritual', image: img('1516426122078-c23e76319801'), description: 'A thousand-year-old Ganesh shrine inside the fort walls that still receives wedding invitations by post from across India.', timeNeeded: '1 hour' },
      { name: 'Malik Talao', category: 'Nature', image: img('1537905569824-f89f14cceb68'), description: 'The smallest of the three lakes, best for marsh crocodile, painted stork and kingfisher in the early morning.', timeNeeded: '2 hours' },
      { name: 'Rajiv Gandhi Regional Museum', category: 'Sightseeing', image: img('1500534314209-a25ddb2bd429'), description: 'A natural-history museum on the edge of Sawai Madhopur, useful for understanding the reserve before your first drive.', timeNeeded: '2 hours' },
    ],
    thingsToDo: [
      { category: 'Adventure', image: img('1516426122078-c23e76319801'), title: 'Take a core-zone safari', description: 'Zones 1 to 5 hold the highest tiger density. Drives run at dawn and mid-afternoon, in either a 6-seat jeep or a 20-seat canter.' },
      { category: 'Culture', image: img('1537905569824-f89f14cceb68'), title: 'Climb to the fort', description: 'A steep stepped path from the park gate to a plateau of palaces, mosques and step wells, with langurs and the occasional leopard for company.' },
      { category: 'Nature', image: img('1500534314209-a25ddb2bd429'), title: 'Birdwatch at the lakes', description: 'Over 300 species, including painted stork, sarus crane and the Indian skimmer. Winter brings migratory waterfowl in numbers.' },
      { category: 'Nature', image: img('1502086223501-7ea6ecd79368'), title: 'Walk the buffer zone', description: 'Guided nature walks outside the core area cover tracks, scat, alarm calls and the plants the park is built on.' },
      { category: 'Culture', image: img('1464822759023-fed622ff2c3b'), title: 'Visit the Dastkar craft centre', description: 'A women\'s cooperative near the park producing block-printed textiles, set up to give villagers an income that does not depend on the forest.' },
      { category: 'Adventure', image: img('1561731216-c3a4d99437d5'), title: 'Photograph from a canter at dawn', description: 'The 6am slot has the best light and the highest activity. Bring a 400mm lens if you have one, and a beanbag rather than a tripod.' },
    ],
    howToReach: {
      byAir: 'Jaipur (180km) is the nearest airport, about three hours by road, with good domestic connections.',
      byRail: 'Sawai Madhopur Junction is 10km from the park and sits on the main Delhi–Mumbai line — the easiest way in by some margin.',
      byRoad: 'Roughly 380km from Delhi and 180km from Jaipur on good highway. Most lodges arrange station pickups.',
    },
    seasons: [
      { season: 'Peak',     months: 'October – March', note: 'Pleasant days, cool mornings and full foliage. The most comfortable time to visit, and the busiest.' },
      { season: 'Best odds', months: 'April – June',   note: 'Brutally hot, up to 45°C, but the undergrowth dies back and animals concentrate at the waterholes. Sightings peak.' },
      { season: 'Closed',   months: 'July – September', note: 'Core zones shut for the monsoon and the breeding season. Some buffer zones stay open.' },
    ],
    travelTips: [
      'Book safaris online the moment they open — 90 days ahead. Zones are allotted by lottery and peak dates sell out immediately.',
      'Take at least three or four drives. A single safari is largely a matter of luck.',
      'Jeeps seat six and get closer than the 20-seat canters. Pay the difference if you can.',
      'Wear muted greens and browns. Bright colours and white are genuinely counterproductive in the forest.',
      'Mornings are cold from December to February in an open vehicle at speed. Bring a proper jacket.',
    ],
    localFood: ['Laal maas — fiery mutton curry', 'Dal baati churma', 'Ker sangri', 'Gatte ki sabzi', 'Bajre ki roti with garlic chutney', 'Ghevar and malpua'],
    gallery: [
      { url: img('1561731216-c3a4d99437d5'), caption: 'Royal Bengal Tiger in the wild' },
      { url: img('1516426122078-c23e76319801'), caption: 'Jeep safari through the jungle' },
      { url: img('1500534314209-a25ddb2bd429'), caption: 'Wildlife photography at sunrise' },
      { url: img('1502086223501-7ea6ecd79368'), caption: 'Ranthambore Fort over the jungle' },
      { url: img('1464822759023-fed622ff2c3b'), caption: 'Padam Talao lake at dusk' },
      { url: img('1537905569824-f89f14cceb68'), caption: 'Bird watching in the reserve' },
    ],
    region: 'Rajasthan',
    experiences: ['Wildlife', 'Culture'],
    blurb: 'Dry deciduous forest wrapped around a tenth-century fort, and the best tiger odds in India.',
    rating: 4.6,
    reviews: 318,
    tripCount: 2,
  },
  {
    slug: 'varanasi',
    name: 'Varanasi',
    tagline: 'The Eternal City',
    heroImage: '/images/varanasi.jpg',
    image: '/images/varanasi.jpg',
    overview:
      'Varanasi — Kashi, Benaras — has been continuously inhabited for over three thousand years, which makes it one of the oldest living cities on earth. Eighty-eight ghats run along a four-kilometre curve of the Ganga, and everything happens on them: bathing, laundry, cricket, cremation, prayer, and a nightly aarti watched by thousands. Behind them is a lattice of lanes too narrow for cars, holding silk workshops, sweet shops and the Kashi Vishwanath temple. Twelve kilometres away at Sarnath, the Buddha gave his first sermon.',
    highlights: [
      'The Ganga Aarti at Dashashwamedh Ghat',
      'Sunrise from a boat past all 88 ghats',
      'Kashi Vishwanath, one of the twelve Jyotirlingas',
      'Manikarnika, the eternal cremation ghat',
      'Sarnath and the Dhamek Stupa',
      'Banarasi silk weaving in the old quarter',
    ],
    bestTime: 'October – March',
    difficulty: 'Easy',
    attractions: [
      { name: 'Dashashwamedh Ghat', category: 'Spiritual', image: img('1570168007204-dfb528c6958f'), description: 'The main ghat and the site of the nightly Ganga Aarti, where seven priests move brass lamps in unison to drums and bells.', timeNeeded: '2 hours' },
      { name: 'Kashi Vishwanath Temple', category: 'Spiritual', image: img('1602216056096-3b40cc0c9944'), description: 'One of the twelve Jyotirlingas, rebuilt in 1780 by Ahilyabai Holkar and now approached through a broad new corridor.', timeNeeded: '2 hours' },
      { name: 'Manikarnika Ghat', category: 'Spiritual', image: img('1558618666-fcd25c85cd64'), description: 'The principal cremation ghat, where fires have reportedly burned without interruption for centuries. Photography is not permitted.', timeNeeded: '1 hour' },
      { name: 'Sarnath', category: 'Culture', image: img('1500534314209-a25ddb2bd429'), description: 'The deer park where the Buddha first taught, 12km north. The Dhamek Stupa, the monastery ruins and the original Ashokan lion capital.', timeNeeded: 'Half day' },
      { name: 'Assi Ghat', category: 'Sightseeing', image: img('1502086223501-7ea6ecd79368'), description: 'The southernmost of the main ghats, quieter and more student-heavy, with a well-attended sunrise yoga and music session.', timeNeeded: '2 hours' },
      { name: 'Banarasi Silk Workshops', category: 'Culture', image: img('1537905569824-f89f14cceb68'), description: 'Family looms in the Madanpura quarter, where a single heavy brocade sari can take two weavers several months.', timeNeeded: '2 hours' },
    ],
    thingsToDo: [
      { category: 'Spiritual', image: img('1500534314209-a25ddb2bd429'), title: 'Take the sunrise boat', description: 'Push off around 5:30am and drift the length of the ghats as the city wakes. It is the single best thing to do in Varanasi.' },
      { category: 'Spiritual', image: img('1502086223501-7ea6ecd79368'), title: 'Watch the evening aarti from the water', description: 'Hire a boat rather than fighting for space on the steps. The view is better and you can leave whenever you like.' },
      { category: 'Culture', image: img('1537905569824-f89f14cceb68'), title: 'Walk the old city lanes', description: 'The galis behind the ghats are genuinely maze-like. Go with a guide the first time, then get lost on purpose afterwards.' },
      { category: 'Culture', image: img('1570168007204-dfb528c6958f'), title: 'Eat your way through Benaras', description: 'Kachori sabzi for breakfast, malaiyo in winter, and a paan afterwards. The city takes all three extremely seriously.' },
      { category: 'Spiritual', image: img('1602216056096-3b40cc0c9944'), title: 'Day trip to Sarnath', description: 'The stupa, the excavated monasteries and the museum. Quiet, green and about as far from the ghats in atmosphere as it is in distance.' },
      { category: 'Culture', image: img('1558618666-fcd25c85cd64'), title: 'Hear classical music at Assi', description: 'Varanasi is a gharana city. Evening recitals of sitar, sarangi and tabla run regularly at Assi Ghat and in small halls nearby.' },
    ],
    howToReach: {
      byAir: 'Lal Bahadur Shastri International Airport (VNS) is 26km from the ghats, with flights from Delhi, Mumbai, Bengaluru and Kathmandu.',
      byRail: 'Varanasi Junction and Banaras station are both major stops with direct overnight trains from Delhi, Kolkata and Mumbai.',
      byRoad: 'About 820km from Delhi and 320km from Lucknow. The train is almost always the better choice.',
    },
    seasons: [
      { season: 'Peak',    months: 'October – March', note: 'Cool and clear, and the season for Dev Deepawali in November when every ghat is lit with oil lamps.' },
      { season: 'Summer',  months: 'April – June',    note: 'Extremely hot, regularly above 43°C. Only the early mornings and evenings are usable.' },
      { season: 'Monsoon', months: 'July – September', note: 'The river rises and can submerge the lower ghats entirely, sometimes suspending boat rides.' },
    ],
    travelTips: [
      'Never photograph the cremation ghats. Someone will offer to let you for a fee — they have no authority to, and it is deeply offensive.',
      'Fix the boat fare before you get in, and agree whether it is per person or per boat.',
      'The lanes flood with motorbikes. Walk them early in the morning when they are almost empty.',
      'Leave shoes, belts and leather bags outside the temples. Kashi Vishwanath also has phone and camera restrictions.',
      'Dev Deepawali in November is spectacular but books out months ahead. Plan early or avoid it entirely.',
    ],
    localFood: ['Kachori sabzi with jalebi', 'Tamatar chaat', 'Malaiyo — a winter milk foam', 'Banarasi paan', 'Baati chokha', 'Lassi in a clay kulhad'],
    gallery: [
      { url: img('1570168007204-dfb528c6958f'), caption: 'Dashashwamedh Ghat at sunrise' },
      { url: img('1602216056096-3b40cc0c9944'), caption: 'Evening Ganga Aarti ceremony' },
      { url: img('1558618666-fcd25c85cd64'), caption: 'Boat ride on the sacred Ganga' },
      { url: img('1502086223501-7ea6ecd79368'), caption: 'Ancient lanes of Varanasi' },
      { url: img('1500534314209-a25ddb2bd429'), caption: 'Sarnath Dhamek Stupa' },
      { url: img('1537905569824-f89f14cceb68'), caption: 'Silk weaving workshop in Benaras' },
    ],
    region: 'Uttar Pradesh',
    experiences: ['Spiritual', 'Culture'],
    blurb: 'The oldest continuously inhabited city on earth, best seen from a boat at first light.',
    rating: 4.8,
    reviews: 402,
    tripCount: 2,
  },
  {
    slug: 'andaman',
    name: 'Andaman Islands',
    tagline: 'Jewels of the Bay of Bengal',
    heroImage: '/images/andaman.jpg',
    image: '/images/andaman.jpg',
    overview:
      'The Andamans are 572 islands in the Bay of Bengal, closer to Myanmar than to mainland India, of which around thirty are inhabited and a handful open to visitors. What you get is genuinely tropical: fringing coral reefs, rainforest running down to the sand, and water clear enough to see the bottom at fifteen metres. Layered over that is a heavy colonial history — the Cellular Jail at Port Blair held India\'s independence fighters in solitary confinement, and it remains the most affecting thing on the islands.',
    highlights: [
      'Radhanagar Beach, repeatedly rated Asia\'s best',
      'Coral reefs and beginner-friendly scuba at Havelock',
      'The Cellular Jail and its light and sound show',
      'Ross Island, reclaimed by banyan roots',
      'Neil Island\'s Natural Bridge and sunsets',
      'Some of the clearest water in the Indian Ocean',
    ],
    bestTime: 'October – May',
    difficulty: 'Easy',
    attractions: [
      { name: 'Radhanagar Beach', category: 'Nature', image: img('1547036967-23d11aacaee0'), description: 'Two kilometres of white sand backed by mahua forest on Havelock, with no development on the beach itself. Sunsets here are the island\'s set piece.', timeNeeded: 'Half day' },
      { name: 'Cellular Jail', category: 'Culture', image: img('1500534314209-a25ddb2bd429'), description: 'The colonial prison known as Kala Pani, built with seven wings radiating from a central tower so no inmate could see another.', timeNeeded: 'Half day' },
      { name: 'Elephant Beach', category: 'Adventure', image: img('1558618666-fcd25c85cd64'), description: 'Reached by boat or a muddy jungle trek, with a shallow coral shelf that makes it the best snorkelling on Havelock.', timeNeeded: 'Half day' },
      { name: 'Ross Island', category: 'Culture', image: img('1516426122078-c23e76319801'), description: 'The former British administrative capital, abandoned after the 1941 earthquake and now a ruin of church and ballroom held together by fig roots.', timeNeeded: 'Half day' },
      { name: 'Natural Bridge, Neil Island', category: 'Nature', image: img('1602216056096-3b40cc0c9944'), description: 'A coral arch on the Laxmanpur shore, exposed only at low tide along with rock pools full of anemone and octopus.', timeNeeded: '2 hours' },
      { name: 'North Bay Island', category: 'Adventure', image: img('1530866495561-507c9faab2ed'), description: 'Twenty minutes from Port Blair and the easiest reef to reach — glass-bottom boats, sea walking and shallow snorkelling.', timeNeeded: 'Half day' },
    ],
    thingsToDo: [
      { category: 'Adventure', image: img('1516426122078-c23e76319801'), title: 'Learn to scuba dive', description: 'Havelock is one of the cheapest and calmest places in Asia to certify. Discovery dives need no experience and reach around 12m.' },
      { category: 'Nature', image: img('1602216056096-3b40cc0c9944'), title: 'Snorkel the coral shelf', description: 'Elephant Beach and North Bay both have reef within wading distance — parrotfish, clownfish and the occasional turtle.' },
      { category: 'Culture', image: img('1530866495561-507c9faab2ed'), title: 'Attend the Cellular Jail show', description: 'The evening light and sound performance tells the jail\'s history from the perspective of the peepal tree in its courtyard.' },
      { category: 'Adventure', image: img('1547036967-23d11aacaee0'), title: 'Kayak the mangroves', description: 'Night kayaking through the mangrove creeks near Havelock, often with bioluminescent plankton lighting each paddle stroke.' },
      { category: 'Nature', image: img('1500534314209-a25ddb2bd429'), title: 'Watch turtles nest', description: 'Between December and February, olive ridley and leatherback turtles come ashore at Kalipur and Ramnagar on North Andaman.' },
      { category: 'Nature', image: img('1558618666-fcd25c85cd64'), title: 'Cycle Neil Island', description: 'The whole island is about 14km across and almost flat. A rented bicycle covers every beach on it in a day.' },
    ],
    howToReach: {
      byAir: 'Veer Savarkar International Airport (IXZ) at Port Blair has direct flights from Chennai, Kolkata, Delhi and Bengaluru. This is the only practical way in.',
      byRail: 'None — there is no railway on the islands.',
      byRoad: 'Passenger ships sail from Chennai, Kolkata and Visakhapatnam, taking 50–60 hours. Between islands, use the private catamaran ferries.',
    },
    seasons: [
      { season: 'Peak',      months: 'December – April',   note: 'Dry, calm seas and the best underwater visibility of the year. Also the priciest and most crowded.' },
      { season: 'Shoulder',  months: 'October, November & May', note: 'Occasional showers but far fewer people and noticeably lower rates. Diving remains good.' },
      { season: 'Monsoon',   months: 'June – September',   note: 'Heavy rain and rough crossings. Ferries are cancelled at short notice and some dive sites close.' },
    ],
    travelTips: [
      'Book inter-island ferries well in advance — the private catamarans sell out in season and the government ferries are slow and unreliable.',
      'Mobile data is weak and often absent outside Port Blair. Download maps and tickets before you leave the capital.',
      'Carry cash. Card machines fail regularly on Havelock and Neil, and ATMs run out at weekends.',
      'A permit is required for foreign nationals and is issued on arrival at Port Blair airport. Keep it with you throughout.',
      'Do not touch or stand on the coral, and use reef-safe sunscreen. Much of the shallow reef is still recovering from bleaching.',
    ],
    localFood: ['Grilled fish and lobster at Havelock', 'Coconut prawn curry', 'Amritsari fish fry at Aberdeen Bazaar', 'Fresh tender coconut water', 'Chilli crab', 'Tropical fruit — papaya, guava, pineapple'],
    gallery: [
      { url: img('1547036967-23d11aacaee0'), caption: 'Radhanagar Beach, Havelock Island' },
      { url: img('1530866495561-507c9faab2ed'), caption: 'Kayaking in crystal-clear waters' },
      { url: img('1558618666-fcd25c85cd64'), caption: 'Coral reef snorkelling at Elephant Beach' },
      { url: img('1602216056096-3b40cc0c9944'), caption: 'Sunset at Laxmanpur Beach, Neil Island' },
      { url: img('1516426122078-c23e76319801'), caption: 'Sea walk underwater adventure' },
      { url: img('1500534314209-a25ddb2bd429'), caption: 'Cellular Jail historical monument' },
    ],
    region: 'Islands',
    experiences: ['Beach', 'Adventure'],
    blurb: 'Coral reefs, white sand and a ferry timetable that is the only schedule you will need to keep.',
    rating: 4.9,
    reviews: 367,
    tripCount: 2,
    trending: true,
  },
]

// ── Filter options ────────────────────────────────────────────────────────────

export const regions: (Region | 'All')[] = [
  'All',
  'Himalayas',
  'Himachal',
  'Uttarakhand',
  'Rajasthan',
  'Uttar Pradesh',
  'Islands',
]

export const experiences: (Experience | 'All')[] = [
  'All',
  'Adventure',
  'Trekking',
  'Spiritual',
  'Wildlife',
  'Beach',
  'Culture',
  'Snow',
]

export const difficulties = ['All', 'Easy', 'Easy–Moderate', 'Moderate', 'Challenging'] as const

export const activityCategories: ActivityCategory[] = ['Adventure', 'Spiritual', 'Nature', 'Culture']

export const destinationSortOptions = [
  { id: 'popular',    label: 'Most Popular'       },
  { id: 'rating',     label: 'Top Rated'          },
  { id: 'price-low',  label: 'Price: Low to High' },
  { id: 'price-high', label: 'Price: High to Low' },
  { id: 'name',       label: 'A – Z'              },
] as const

export type DestinationSortId = (typeof destinationSortOptions)[number]['id']

// ── Helpers ───────────────────────────────────────────────────────────────────

export function getDestinationBySlug(slug: string): Destination | undefined {
  return destinations.find((d) => d.slug === slug)
}

/** How many destinations sit in each region — shown next to the filter chips. */
export function countByRegion(region: Region | 'All'): number {
  if (region === 'All') return destinations.length
  return destinations.filter((d) => d.region === region).length
}

/** Most-reviewed first — used for "Popular Destinations" on the homepage. */
export function popularDestinations(limit = 6): Destination[] {
  return [...destinations].sort((a, b) => b.reviews - a.reviews).slice(0, limit)
}
