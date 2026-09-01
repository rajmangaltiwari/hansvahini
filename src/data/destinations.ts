export type ItineraryDay = {
  day: number
  title: string
  description: string
}

export type GalleryImage = {
  url: string
  caption: string
}

export type Destination = {
  slug: string
  name: string
  tagline: string
  heroImage: string
  duration: string
  price: string
  groupSize: string
  difficulty: string
  overview: string
  highlights: string[]
  itinerary: ItineraryDay[]
  included: string[]
  excluded: string[]
  activities: string[]
  bestTime: string
  image: string
  gallery: GalleryImage[]
}

export const destinations: Destination[] = [
  {
    slug: 'ladakh',
    name: 'Ladakh Adventure',
    tagline: 'Land of High Passes',
    heroImage: '/images/ladakh.jpg',
    image: '/images/ladakh.jpg',
    duration: '8 Days / 7 Nights',
    price: '₹28,999',
    groupSize: '2–16 people',
    difficulty: 'Moderate',
    bestTime: 'June – September',
    overview:
      'Ladakh is a high-altitude desert carved by rivers and crowned by the Himalayas and the Karakoram range. This 8-day expedition takes you through ancient monasteries, pristine glacial lakes, and stark lunar landscapes that feel like another planet. From the vibrant market lanes of Leh to the midnight blue of Pangong Lake, every moment is a postcard.',
    highlights: [
      'Pangong Tso Lake — the iconic blue lake straddling India and China',
      'Khardung La Pass — one of the world\'s highest motorable roads at 5,359m',
      'Nubra Valley — double-humped Bactrian camels on silver sand dunes',
      'Thiksey, Hemis & Diskit Monasteries',
      'Magnetic Hill & Confluence of Indus and Zanskar rivers',
      'Leh Palace and old Leh town exploration',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrive in Leh — Acclimatisation Day',
        description:
          'Arrive at Kushok Bakula Rimpochee Airport, Leh (3,524m). Transfer to hotel. Rest and acclimatise — no strenuous activity. Evening walk to the local market. Overnight in Leh.',
      },
      {
        day: 2,
        title: 'Leh Local Sightseeing',
        description:
          'Visit Shanti Stupa, Leh Palace, and the old town bazaar. Afternoon trip to Magnetic Hill and the confluence of the Indus and Zanskar rivers. Overnight in Leh.',
      },
      {
        day: 3,
        title: 'Leh → Nubra Valley via Khardung La',
        description:
          'Drive over Khardung La Pass (5,359m). Descend into the Nubra Valley. Visit Diskit Monastery and the giant Maitreya Buddha statue. Evening camel safari on sand dunes at Hunder. Overnight in Nubra.',
      },
      {
        day: 4,
        title: 'Nubra Valley → Pangong Lake',
        description:
          'Drive through remote Shyok Valley to Pangong Tso (4,350m). Arrive by afternoon. Witness the lake change colours from blue to green to red at sunset. Overnight in tents/camps by the lake.',
      },
      {
        day: 5,
        title: 'Pangong Lake — Free Day',
        description:
          'Full day at leisure by Pangong Lake. Morning photography, meditation, or simply soaking in the silence. Afternoon explore the eastern bank. Overnight in camps.',
      },
      {
        day: 6,
        title: 'Pangong → Leh via Chang La',
        description:
          'Return to Leh via Chang La Pass (5,360m), the third highest motorable pass in the world. Stop at Hemis Monastery en route — the largest and wealthiest monastery in Ladakh. Overnight in Leh.',
      },
      {
        day: 7,
        title: 'Thiksey & Shey Monasteries',
        description:
          'Morning visit to Thiksey Monastery, resembling the Potala Palace in Lhasa. Afternoon at Shey Palace and monastery. Evening free for shopping in Leh market. Overnight in Leh.',
      },
      {
        day: 8,
        title: 'Departure',
        description:
          'Transfer to Leh Airport for your onward flight. End of expedition.',
      },
    ],
    included: [
      '7 nights accommodation (hotels + tented camps)',
      'All meals — breakfast, lunch & dinner',
      'All transfers in private SUV/Innova',
      'Experienced local guide throughout',
      'Inner Line Permits (Pangong, Nubra)',
      'Camel safari at Nubra',
    ],
    excluded: [
      'Flights to/from Leh',
      'Travel insurance',
      'Personal expenses & tips',
      'Alcoholic beverages',
      'Optional adventure activities',
    ],
    activities: [
      'Camel Safari',
      'Mountain Photography',
      'Monastery Visits',
      'High-Altitude Trekking',
      'River Rafting (optional)',
      'Stargazing',
    ],
      gallery: [
      { url: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=800&q=80', caption: 'Pangong Tso Lake at dawn' },
      { url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80', caption: 'Mountain roads of Ladakh' },
      { url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80', caption: 'Himalayan peaks above the clouds' },
      { url: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=800&q=80', caption: 'Nubra Valley sand dunes' },
      { url: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80', caption: 'Exploring the monastery trails' },
      { url: 'https://images.unsplash.com/photo-1537905569824-f89f14cceb68?w=800&q=80', caption: 'Stargazing camp in Ladakh' },
    ],
  },
  {
    slug: 'manali',
    name: 'Manali Retreat',
    tagline: 'Queen of Himachal',
    heroImage: '/images/manali.jpg',
    image: '/images/manali.jpg',
    duration: '6 Days / 5 Nights',
    price: '₹18,499',
    groupSize: '2–20 people',
    difficulty: 'Easy–Moderate',
    bestTime: 'October – June',
    overview:
      'Nestled at 2,050m in the Beas River valley, Manali is Himachal Pradesh\'s crown jewel. This 6-day retreat blends snow-capped adventure with ancient culture — from the thrill of Rohtang Pass to the tranquillity of Hadimba Temple. Whether you\'re a first-time hill-station visitor or a seasoned Himalayan traveller, Manali has something magical waiting.',
    highlights: [
      'Rohtang Pass snow experience (3,978m)',
      'Solang Valley — skiing, paragliding, zorbing',
      'Old Manali\'s cafes, temples & apple orchards',
      'Hadimba Devi Temple — ancient wood-carved shrine',
      'Jogini Waterfall trek',
      'Campfire evenings under the Himalayan sky',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrive Manali — Settle In',
        description:
          'Arrive in Manali. Check into your hotel. Evening stroll through the Mall Road and Manali bazaar. Explore local cafes and gear shops. Overnight in Manali.',
      },
      {
        day: 2,
        title: 'Old Manali & Hadimba Temple',
        description:
          'Morning visit to the iconic Hadimba Devi Temple set amidst cedar forests. Walk through Old Manali village — hippie cafes, apple orchards, and the Manu Temple. Afternoon trek to Jogini Waterfall. Overnight in Manali.',
      },
      {
        day: 3,
        title: 'Solang Valley — Adventure Day',
        description:
          'Full day at Solang Valley (2,480m). Activities include skiing (winter), zorbing, rope courses, and paragliding. Stunning views of Beas Kund glacier. Return to Manali by evening. Overnight in Manali.',
      },
      {
        day: 4,
        title: 'Rohtang Pass Excursion',
        description:
          'Early morning drive to Rohtang Pass (3,978m) — snow even in June. Snowball fights, sledging, and panoramic views of the Kullu and Lahaul valleys. Subject to weather and permit availability. Overnight in Manali.',
      },
      {
        day: 5,
        title: 'Kullu — River Rafting & Market',
        description:
          'Drive to Kullu (90 min). White water rafting on the Beas River (Grade II–III rapids). Afternoon visit to Kullu\'s famous Shawl factories and Raghunath Temple. Return to Manali. Campfire dinner. Overnight in Manali.',
      },
      {
        day: 6,
        title: 'Departure',
        description:
          'Morning at leisure. Check out and depart for Chandigarh or Delhi by Volvo bus or taxi. End of trip.',
      },
    ],
    included: [
      '5 nights hotel accommodation',
      'Daily breakfast and dinner',
      'All local transfers by cab',
      'Guide for all sightseeing',
      'Rohtang Pass permit fees',
      'River rafting in Kullu',
    ],
    excluded: [
      'Travel to/from Manali',
      'Lunch on all days',
      'Adventure activity charges at Solang',
      'Personal expenses',
      'Travel insurance',
    ],
    activities: [
      'Snow Activities',
      'Paragliding',
      'River Rafting',
      'Zorbing',
      'Trekking',
      'Campfire Nights',
    ],
      gallery: [
      { url: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&q=80', caption: 'Rohtang Pass snowfields' },
      { url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80', caption: 'Snow-covered Himalayan peaks' },
      { url: 'https://images.unsplash.com/photo-1537905569824-f89f14cceb68?w=800&q=80', caption: 'Campfire evenings in Manali' },
      { url: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=80', caption: 'Trekkers in Solang Valley' },
      { url: 'https://images.unsplash.com/photo-1530866495561-507c9faab2ed?w=800&q=80', caption: 'River rafting on the Beas' },
      { url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80', caption: 'Hadimba Temple cedar forest' },
    ],
  },
  {
    slug: 'spiti',
    name: 'Spiti Valley Odyssey',
    tagline: 'The Middle Land',
    heroImage: '/images/spiti.jpg',
    image: '/images/spiti.jpg',
    duration: '10 Days / 9 Nights',
    price: '₹32,999',
    groupSize: '4–14 people',
    difficulty: 'Challenging',
    bestTime: 'June – September',
    overview:
      'Spiti — meaning "Middle Land" — is a cold desert mountain valley in the Himalayas at an average elevation of 4,000m. Cut off from the world for months every winter, Spiti is raw, pristine, and humbling. This 10-day odyssey takes you through ancient Buddhist monasteries clinging to clifftops, remote villages barely touched by modernity, and Chandratal — the Moon Lake — one of India\'s most beautiful alpine lakes.',
    highlights: [
      'Key Monastery — 1,000-year-old monastery at 4,166m',
      'Chandratal Lake — crescent-shaped glacial lake at 4,300m',
      'Kibber Village — once world\'s highest motorable village',
      'Pin Valley National Park — home to Snow Leopards',
      'Dhankar Monastery perched on a cliff edge',
      'Kunzum Pass (4,590m) gateway to Spiti',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Shimla → Narkanda',
        description:
          'Depart Shimla. Drive through apple orchards and dense pine forests to Narkanda (2,708m). Overnight in Narkanda.',
      },
      {
        day: 2,
        title: 'Narkanda → Sangla Valley',
        description:
          'Drive to Sangla in the Baspa Valley. En route visit Rampur and Jeori. Arrive Sangla (2,680m) — a green oasis with apple and apricot trees. Overnight in Sangla.',
      },
      {
        day: 3,
        title: 'Sangla → Chitkul → Kalpa',
        description:
          'Morning visit to Chitkul — the last inhabited village before the Tibet border. Afternoon drive to Kalpa (2,960m) with stunning views of the Kinnaur Kailash range. Overnight in Kalpa.',
      },
      {
        day: 4,
        title: 'Kalpa → Tabo',
        description:
          'Drive through the dramatic Spiti canyon. Visit Tabo Monastery (996 AD) — the oldest continuously functioning monastery in India. Overnight in Tabo.',
      },
      {
        day: 5,
        title: 'Tabo → Dhankar → Pin Valley → Kaza',
        description:
          'Visit Dhankar Monastery and Lake. Drive through Pin Valley — explore remote villages. Arrive Kaza — the headquarters of Spiti. Overnight in Kaza.',
      },
      {
        day: 6,
        title: 'Kaza Local — Key, Kibber & Komic',
        description:
          'Visit Key Monastery (4,166m). Drive to Kibber and Komic — among the world\'s highest villages. Afternoon at Hikkim — the world\'s highest post office. Overnight in Kaza.',
      },
      {
        day: 7,
        title: 'Kaza → Langza → Lhalung',
        description:
          'Morning visit to Langza village — fossil hunting and giant Buddha statue. Afternoon drive to Lhalung Monastery. Overnight in Kaza.',
      },
      {
        day: 8,
        title: 'Kaza → Chandratal Lake',
        description:
          'Drive to Chandratal Lake (4,300m) via Kunzum Pass (4,590m). Trek to the crescent-shaped moon lake. Camp overnight by the lake under the stars.',
      },
      {
        day: 9,
        title: 'Chandratal → Manali',
        description:
          'Morning at the lake. Drive through Rohtang Pass to Manali. Arrive evening. Overnight in Manali.',
      },
      {
        day: 10,
        title: 'Departure from Manali',
        description:
          'Check out from hotel. Depart for Delhi or Chandigarh. End of expedition.',
      },
    ],
    included: [
      '9 nights accommodation (hotels + tents)',
      'All meals throughout',
      'Private vehicle (Innova/SUV)',
      'Expert local guide',
      'All permits (Inner Line, forest)',
      'Camping equipment at Chandratal',
    ],
    excluded: [
      'Travel to Shimla / from Manali',
      'Travel insurance',
      'Personal expenses',
      'Alcoholic beverages',
      'Porter charges if needed',
    ],
    activities: [
      'High-Altitude Trekking',
      'Fossil Hunting',
      'Monastery Visits',
      'Wildlife Spotting',
      'Camping',
      'Photography Expeditions',
    ],
      gallery: [
      { url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80', caption: 'Key Monastery at golden hour' },
      { url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80', caption: 'Chandratal Moon Lake' },
      { url: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=800&q=80', caption: 'Spiti Valley high-altitude landscape' },
      { url: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=800&q=80', caption: 'Village life in Kibber' },
      { url: 'https://images.unsplash.com/photo-1537905569824-f89f14cceb68?w=800&q=80', caption: 'Camping under the Milky Way' },
      { url: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&q=80', caption: 'Kunzum Pass gateway' },
    ],
  },
  {
    slug: 'kedarnath',
    name: 'Kedarnath Yatra',
    tagline: 'Abode of Lord Shiva',
    heroImage: '/images/kedarnath.jpg',
    image: '/images/kedarnath.jpg',
    duration: '5 Days / 4 Nights',
    price: '₹15,499',
    groupSize: '2–25 people',
    difficulty: 'Moderate',
    bestTime: 'May – June, September – November',
    overview:
      'Kedarnath is one of the twelve Jyotirlingas of Lord Shiva and sits at a breathtaking 3,583m in the Garhwal Himalayas. The Kedarnath Temple, believed to be over 1,000 years old, is flanked by glaciers and snow-capped peaks. This 5-day spiritual expedition combines pilgrimage with the raw beauty of the Uttarakhand Himalayas, trekking through rhododendron forests and crossing glacial rivers.',
    highlights: [
      'Kedarnath Temple darshan — one of India\'s 12 Jyotirlingas',
      'Trek through Gaurikund — legendary bathing site of Goddess Parvati',
      'Chopta — the "Mini Switzerland of India"',
      'Tungnath — world\'s highest Shiva temple (3,680m)',
      'Chandrashila Peak (4,130m) — 360° Himalayan views',
      'Vasuki Tal glacial lake trek (optional)',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Haridwar / Rishikesh → Sonprayag',
        description:
          'Depart from Haridwar or Rishikesh by road. Drive through the scenic Garhwal hills to Sonprayag (1,829m) — the last motor road point before Kedarnath. Check in. Evening Ganga Aarti by the river. Overnight in Sonprayag.',
      },
      {
        day: 2,
        title: 'Sonprayag → Gaurikund → Kedarnath',
        description:
          'Drive to Gaurikund (1,982m). Begin the 19km trek to Kedarnath (or take helicopter if preferred). Pass through dense forests, waterfalls, and mountain streams. Arrive Kedarnath by afternoon. Evening darshan at the temple. Overnight in Kedarnath.',
      },
      {
        day: 3,
        title: 'Kedarnath — Temple & Surroundings',
        description:
          'Early morning abhishek and darshan at Kedarnath Temple. Explore the area around the temple — Bhairavnath Temple, Gandhi Sarovar lake, and Chorabari Glacier. Optional trek to Vasuki Tal (5km each way). Overnight in Kedarnath.',
      },
      {
        day: 4,
        title: 'Kedarnath → Chopta',
        description:
          'Early morning darshan. Trek back down to Gaurikund. Drive to Chopta (2,680m) — a meadow offering stunning views of Trishul, Nanda Devi, and Chaukhamba peaks. Overnight in Chopta.',
      },
      {
        day: 5,
        title: 'Tungnath & Chandrashila → Departure',
        description:
          'Early morning trek to Tungnath (3,680m) — the world\'s highest Shiva temple. Continue to Chandrashila Peak (4,130m) for panoramic Himalayan views. Descend and drive back to Haridwar/Rishikesh. End of yatra.',
      },
    ],
    included: [
      '4 nights accommodation (guesthouses)',
      'All meals during the trek',
      'Transportation Haridwar/Rishikesh to Sonprayag and back',
      'Experienced trek guide and support staff',
      'First-aid kit and oxygen cylinder',
      'Temple entry and photography permits',
    ],
    excluded: [
      'Helicopter charges (optional)',
      'Porter / horse charges',
      'Personal expenses',
      'Travel to/from Haridwar',
      'Travel insurance',
    ],
    activities: [
      'Pilgrimage Trekking',
      'Temple Darshan',
      'Glacier Walk',
      'Alpine Lake Visits',
      'Bird Watching',
      'Meditation & Yoga',
    ],
      gallery: [
      { url: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&q=80', caption: 'Trek route to Kedarnath' },
      { url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80', caption: 'Snow-capped peaks near Kedarnath' },
      { url: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=800&q=80', caption: 'Pilgrims on the yatra trail' },
      { url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80', caption: 'Chopta meadows in bloom' },
      { url: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=80', caption: 'Trekkers ascending to Tungnath' },
      { url: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=800&q=80', caption: 'Himalayan wilderness near Gaurikund' },
    ],
  },
  {
    slug: 'rishikesh',
    name: 'Rishikesh & Haridwar',
    tagline: 'Yoga Capital of the World',
    heroImage: '/images/rishikesh.jpg',
    image: '/images/rishikesh.jpg',
    duration: '4 Days / 3 Nights',
    price: '₹10,999',
    groupSize: '2–30 people',
    difficulty: 'Easy',
    bestTime: 'October – March',
    overview:
      'Rishikesh and Haridwar sit where the Ganga descends from the Himalayas into the plains — two of India\'s most sacred cities and a global hub for yoga, meditation, and adventure. This 4-day journey blends the spiritual thunder of Haridwar\'s Ganga Aarti, the adrenaline of white water rafting, the serenity of ashram life, and the warm chaos of the ancient ghats.',
    highlights: [
      'Ganga Aarti at Har Ki Pauri — Haridwar\'s most iconic ritual',
      'White water rafting on the Ganga (Grade III–IV rapids)',
      'Laxman Jhula & Ram Jhula — historic suspension bridges',
      'Triveni Ghat — sunrise prayers on the holy river',
      'Beatles Ashram (Maharishi Mahesh Yogi Ashram)',
      'Bungee jumping, cliff jumping & kayaking (optional)',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrive Haridwar — Ganga Aarti',
        description:
          'Arrive in Haridwar. Check in. Afternoon visit to Mansa Devi Temple via cable car. Evening — the spectacular Ganga Aarti at Har Ki Pauri. Thousands of diyas floating on the holy Ganga. Overnight in Haridwar.',
      },
      {
        day: 2,
        title: 'Haridwar → Rishikesh — Temples & Ghats',
        description:
          'Morning dip at Har Ki Pauri. Drive to Rishikesh (30 min). Visit Triveni Ghat, Laxman Jhula, Ram Jhula, and the famous Geeta Bhawan. Afternoon free to explore yoga studios and the ashram belt. Overnight in Rishikesh.',
      },
      {
        day: 3,
        title: 'White Water Rafting & Adventure Day',
        description:
          'Full day white water rafting from Shivpuri or Marine Drive to Laxman Jhula (16km or 26km stretches). Grade II–IV rapids — Roller Coaster, Golf Course, and the mighty Return to Sender. Afternoon optional bungee jumping or cliff jumping at Jumpin Heights. Overnight in Rishikesh.',
      },
      {
        day: 4,
        title: 'Beatles Ashram & Departure',
        description:
          'Morning visit to the Beatles Ashram (Chaurasi Kutia) where the Fab Four studied TM in 1968. Colourful murals and a peaceful forest setting. Optional yoga class. Check out and depart. End of trip.',
      },
    ],
    included: [
      '3 nights hotel accommodation',
      'Daily breakfast',
      'All transfers',
      'White water rafting (26km stretch)',
      'Ganga Aarti experience with guide',
      'Beatles Ashram entry fee',
    ],
    excluded: [
      'Travel to/from Haridwar/Rishikesh',
      'Lunch and dinner',
      'Bungee/cliff jumping charges',
      'Personal expenses',
      'Travel insurance',
    ],
    activities: [
      'White Water Rafting',
      'Bungee Jumping',
      'Kayaking',
      'Yoga & Meditation',
      'Temple Visits',
      'Camping by the Ganga',
    ],
      gallery: [
      { url: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&q=80', caption: 'Ganga Aarti at Haridwar' },
      { url: 'https://images.unsplash.com/photo-1530866495561-507c9faab2ed?w=800&q=80', caption: 'White water rafting on the Ganga' },
      { url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', caption: 'Laxman Jhula suspension bridge' },
      { url: 'https://images.unsplash.com/photo-1537905569824-f89f14cceb68?w=800&q=80', caption: 'Camping by the river Ganga' },
      { url: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=80', caption: 'Yoga on the ghats at sunrise' },
      { url: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=800&q=80', caption: 'Ashram life in Rishikesh' },
    ],
  },
  {
    slug: 'ranthambore',
    name: 'Ranthambore Wildlife Safari',
    tagline: 'Tiger Country',
    heroImage: '/images/ranthambore.jpg',
    image: '/images/ranthambore.jpg',
    duration: '3 Days / 2 Nights',
    price: '₹12,999',
    groupSize: '2–18 people',
    difficulty: 'Easy',
    bestTime: 'October – June',
    overview:
      'Ranthambore National Park in Rajasthan is one of India\'s best places to spot the Bengal Tiger in the wild. Spread across 1,334 sq km of dry deciduous forest, grasslands, and lakes, the park also shelters leopards, sloth bears, crocodiles, and over 300 species of birds. The iconic 10th-century Ranthambore Fort towers over the jungle, creating a backdrop unlike any other wildlife reserve in the world.',
    highlights: [
      'Zone 1–5 tiger safaris — highest tiger sighting probability',
      'Ranthambore Fort — UNESCO-listed heritage site within the park',
      'Padam Talao, Malik Talao — crocodile and bird-rich lakes',
      'Leopard, sloth bear, and Indian wild boar sightings',
      'Over 300 resident and migratory bird species',
      'Naturalist-led evening talks and wildlife presentations',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrive Ranthambore — Evening Safari',
        description:
          'Arrive at Sawai Madhopur. Transfer to resort. After lunch, depart for your first game drive (afternoon safari zone allocation by forest department). Experienced naturalist guide on board. Debrief session at the resort. Overnight.',
      },
      {
        day: 2,
        title: 'Full Day Safaris — Morning & Evening',
        description:
          'Early morning safari (6:00 AM — best time for tiger sightings). Return for breakfast. Rest. Afternoon safari in a different zone. Evening naturalist presentation on tiger behaviour, tracking, and conservation. Overnight.',
      },
      {
        day: 3,
        title: 'Morning Safari & Ranthambore Fort → Departure',
        description:
          'One final early morning safari. Return for breakfast. Visit the Ranthambore Fort (10th century) overlooking the jungle. Check out by noon. Transfer to Sawai Madhopur Railway Station for onward journey.',
      },
    ],
    included: [
      '2 nights jungle resort accommodation',
      'All meals — breakfast, lunch & dinner',
      '4 safari rides (canter or jeep)',
      'Expert naturalist guide on all safaris',
      'Safari zone booking fees and park entry',
      'Ranthambore Fort visit',
    ],
    excluded: [
      'Train/flight to Sawai Madhopur',
      'Personal expenses',
      'Alcoholic beverages',
      'Camera fee inside the park',
      'Travel insurance',
    ],
    activities: [
      'Jeep Safari',
      'Canter Safari',
      'Bird Watching',
      'Nature Walk',
      'Fort Exploration',
      'Wildlife Photography',
    ],
      gallery: [
      { url: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=800&q=80', caption: 'Royal Bengal Tiger in the wild' },
      { url: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80', caption: 'Jeep safari through the jungle' },
      { url: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=80', caption: 'Wildlife photography at sunrise' },
      { url: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=800&q=80', caption: 'Ranthambore Fort over the jungle' },
      { url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80', caption: 'Padam Talao lake at dusk' },
      { url: 'https://images.unsplash.com/photo-1537905569824-f89f14cceb68?w=800&q=80', caption: 'Bird watching in the reserve' },
    ],
  },
  {
    slug: 'varanasi',
    name: 'Varanasi Spiritual Journey',
    tagline: 'The Eternal City',
    heroImage: '/images/varanasi.jpg',
    image: '/images/varanasi.jpg',
    duration: '4 Days / 3 Nights',
    price: '₹11,499',
    groupSize: '2–20 people',
    difficulty: 'Easy',
    bestTime: 'October – March',
    overview:
      'Varanasi — also known as Kashi and Benaras — is one of the world\'s oldest living cities and the spiritual heart of India. Sitting on the banks of the sacred Ganga, its ancient ghats have witnessed centuries of life, death, prayer, and celebration. This 4-day journey takes you deep into the soul of India — from the thundering Ganga Aarti at Dashashwamedh Ghat to the narrow lanes of the Kashi Vishwanath temple complex.',
    highlights: [
      'Ganga Aarti at Dashashwamedh Ghat — the grandest in India',
      'Sunrise boat ride on the Ganga past 88 ghats',
      'Kashi Vishwanath Temple — one of 12 Jyotirlingas',
      'Sarnath — where Buddha gave his first sermon',
      'Manikarnika Ghat — the eternal cremation ghat',
      'Silk weaving workshops and Banarasi cuisine',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrive Varanasi — Evening Ganga Aarti',
        description:
          'Arrive at Varanasi airport or railway station. Transfer to hotel. Evening boat ride to witness the spectacular Ganga Aarti at Dashashwamedh Ghat — priests, fire, incense, and thousands of devotees. Overnight in Varanasi.',
      },
      {
        day: 2,
        title: 'Sunrise Ghat Walk & Kashi Vishwanath',
        description:
          'Pre-dawn boat ride along the ghats as the city slowly wakes up — cremations at Manikarnika, bathers at Assi, sadhus in meditation. Visit Kashi Vishwanath Temple. Afternoon — explore the old city\'s narrow lanes, Bengali Tola, and silk bazaars. Overnight in Varanasi.',
      },
      {
        day: 3,
        title: 'Sarnath Excursion',
        description:
          'Drive to Sarnath (12km) — the deer park where Gautam Buddha first taught the Dharma after his enlightenment. Visit the Dhamek Stupa, Sarnath Museum, and Mulagandhakuti Vihara temple. Afternoon back in Varanasi for a silk weaving workshop. Overnight in Varanasi.',
      },
      {
        day: 4,
        title: 'Free Morning & Departure',
        description:
          'Early morning yoga on the ghats (optional). Final stroll through the ghats. Transfer to airport/station for onward journey. End of trip.',
      },
    ],
    included: [
      '3 nights hotel accommodation',
      'Daily breakfast',
      'All transfers by AC vehicle',
      'Boat rides (evening Aarti + sunrise)',
      'Guide for all sightseeing',
      'Sarnath entrance fees',
    ],
    excluded: [
      'Travel to/from Varanasi',
      'Lunch and dinner',
      'Temple offering/prasad charges',
      'Personal expenses',
      'Travel insurance',
    ],
    activities: [
      'Boat Rides on Ganga',
      'Temple Visits',
      'Ghat Walks',
      'Silk Weaving Workshop',
      'Yoga on the Ghats',
      'Street Food Tour',
    ],
      gallery: [
      { url: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800&q=80', caption: 'Dashashwamedh Ghat at sunrise' },
      { url: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&q=80', caption: 'Evening Ganga Aarti ceremony' },
      { url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', caption: 'Boat ride on the sacred Ganga' },
      { url: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=800&q=80', caption: 'Ancient lanes of Varanasi' },
      { url: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=80', caption: 'Sarnath Dhamek Stupa' },
      { url: 'https://images.unsplash.com/photo-1537905569824-f89f14cceb68?w=800&q=80', caption: 'Silk weaving workshop in Benaras' },
    ],
  },
  {
    slug: 'andaman',
    name: 'Andaman Islands',
    tagline: 'Jewels of the Bay of Bengal',
    heroImage: '/images/andaman.jpg',
    image: '/images/andaman.jpg',
    duration: '6 Days / 5 Nights',
    price: '₹24,999',
    groupSize: '2–16 people',
    difficulty: 'Easy',
    bestTime: 'October – May',
    overview:
      'The Andaman Islands are a paradise of emerald forests, coral reefs, and powder-white beaches floating in the Bay of Bengal. Far removed from mainland India, these islands feel like an entirely different world — think turquoise water, giant sea turtles, and the haunting history of the Cellular Jail. This 6-day journey takes you from Port Blair\'s colonial past to the untouched shores of Havelock and Neil Island.',
    highlights: [
      'Radhanagar Beach — Asia\'s finest beach (Havelock Island)',
      'Scuba diving & snorkelling on pristine coral reefs',
      'Cellular Jail — colonial-era prison and light & sound show',
      'Ross Island — British administrative HQ now reclaimed by nature',
      'Neil Island — quiet coves and stunning sunsets',
      'Sea walk, glass-bottom boat rides & kayaking',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrive Port Blair — Ross Island',
        description:
          'Arrive at Veer Savarkar International Airport, Port Blair. Transfer to hotel. Afternoon visit to Ross Island — once the British headquarters, now overtaken by jungle and deer. Evening light & sound show at Cellular Jail. Overnight in Port Blair.',
      },
      {
        day: 2,
        title: 'Cellular Jail & Port Blair Sightseeing',
        description:
          'Morning tour of the Cellular Jail — the "Kala Pani" colonial prison that housed Indian freedom fighters. Afternoon visit to Corbyn\'s Cove Beach, Samudrika Marine Museum, and Chatham Saw Mill. Overnight in Port Blair.',
      },
      {
        day: 3,
        title: 'Port Blair → Havelock Island',
        description:
          'Morning ferry to Havelock Island (Swaraj Dweep). Check in. Afternoon at Radhanagar Beach (Beach No. 7) — azure waters, soft white sand, and spectacular sunsets. One of Asia\'s most beautiful beaches. Overnight in Havelock.',
      },
      {
        day: 4,
        title: 'Havelock — Scuba Diving & Snorkelling',
        description:
          'Full day water sports at Elephant Beach. Scuba diving for beginners and certified divers alike — coral gardens, tropical fish, sea turtles. Snorkelling, sea walk, and glass-bottom boat rides. Overnight in Havelock.',
      },
      {
        day: 5,
        title: 'Havelock → Neil Island',
        description:
          'Morning ferry to Neil Island (Shaheed Dweep). Explore Natural Bridge (Howrah Bridge), Bharatpur Beach, and Laxmanpur Beach — famous for its sunset views. Quieter and more secluded than Havelock. Overnight in Neil Island.',
      },
      {
        day: 6,
        title: 'Neil Island → Port Blair → Departure',
        description:
          'Morning ferry back to Port Blair. Time for any last-minute shopping at Aberdeen Bazaar. Transfer to airport for departure. End of trip.',
      },
    ],
    included: [
      '5 nights accommodation (hotels/resorts)',
      'Daily breakfast',
      'Ferry tickets (Port Blair–Havelock–Neil–Port Blair)',
      'All sightseeing transfers',
      'Cellular Jail entry & sound show',
      'Scuba diving intro dive (1 dive)',
    ],
    excluded: [
      'Flights to/from Port Blair',
      'Lunch and dinner',
      'Additional water sports / dives',
      'Personal expenses',
      'Travel insurance',
    ],
    activities: [
      'Scuba Diving',
      'Snorkelling',
      'Sea Walk',
      'Kayaking',
      'Glass-Bottom Boat',
      'Beach Walks & Sunset Viewing',
    ],
      gallery: [
      { url: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&q=80', caption: 'Radhanagar Beach, Havelock Island' },
      { url: 'https://images.unsplash.com/photo-1530866495561-507c9faab2ed?w=800&q=80', caption: 'Kayaking in crystal-clear waters' },
      { url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', caption: 'Coral reef snorkelling at Elephant Beach' },
      { url: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&q=80', caption: 'Sunset at Laxmanpur Beach, Neil Island' },
      { url: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80', caption: 'Sea walk underwater adventure' },
      { url: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=80', caption: 'Cellular Jail historical monument' },
    ],
  },
]

export function getDestinationBySlug(slug: string): Destination | undefined {
  return destinations.find((d) => d.slug === slug)
}
