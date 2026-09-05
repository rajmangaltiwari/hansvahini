import type { LegalSection } from '@/src/components/LegalDocument'

/**
 * Terms and conditions copy. Kept as data so the page component stays
 * layout-only — edit the wording here, not in the JSX.
 */
export const termsUpdated = '5 September 2026'

export const termsSections: LegalSection[] = [
  {
    id: 'about-these-terms',
    title: 'About these terms',
    body: [
      'These terms govern every trip booked with Hansvahini Expeditions. Making a payment towards a trip means you have read them and accepted them on behalf of everyone travelling in your booking.',
      'Where a specific itinerary or written quote says something different from this page, the itinerary wins. Nothing here removes any right you have under Indian consumer law.',
    ],
  },
  {
    id: 'booking',
    title: 'Booking and confirmation',
    body: [
      'A trip is held, not booked, until we confirm it in writing. The sequence is always the same.',
      {
        list: [
          'You send an enquiry and we come back with an itinerary and a fixed price.',
          'You pay the booking advance, which is 25% of the trip cost unless the itinerary says otherwise.',
          'We confirm in writing and start making the bookings the trip depends on.',
          'The balance is due 21 days before departure, or immediately if you book inside 21 days.',
        ],
      },
      'A booking is only confirmed once you have our written confirmation. Until then, availability and price can both move.',
    ],
  },
  {
    id: 'pricing',
    title: 'Pricing and what is included',
    body: [
      'Prices are per person on twin sharing in Indian Rupees, and include exactly what the itinerary\'s inclusions list says. Anything in the exclusions list is not covered.',
      {
        list: [
          'Flights are excluded unless the itinerary explicitly names them as included.',
          'Prices are held for 15 days from the date of the quote.',
          'A change in government tax, fuel surcharge, permit fee or monument entry fee after booking is passed on at cost, with the calculation shown to you.',
          'Where a group size changes after booking, the per-person price is recalculated on the new group size.',
        ],
      },
    ],
  },
  {
    id: 'cancellation',
    title: 'Cancellation by you',
    body: [
      'Cancel in writing to hello@hansvahini.com. The refund is calculated on the date we receive that email, against the total trip cost.',
      {
        list: [
          'More than 45 days before departure — 90% refunded.',
          '30 to 45 days before departure — 75% refunded.',
          '15 to 29 days before departure — 50% refunded.',
          '7 to 14 days before departure — 25% refunded.',
          'Less than 7 days before departure, or no-show — no refund.',
        ],
      },
      'Flights, train tickets and permits already issued in your name are refunded only to the extent the airline, railway or authority refunds them, and that sits outside the percentages above. Refunds are paid to the original payment method within 10 working days of being agreed.',
    ],
  },
  {
    id: 'changes-by-us',
    title: 'Changes and cancellation by us',
    body: [
      'Mountain travel is not a fixed timetable. Passes close, rivers rise, roads are cut and flights into Leh are turned back for weather more often than anyone would like. When that happens we change the plan to keep the trip safe and as close to what you booked as possible.',
      {
        list: [
          'Minor changes — a different hotel of the same standard, a reordered itinerary, a substituted activity. We tell you and the trip proceeds.',
          'Major changes — a materially shorter trip, a different destination or a change of departure date. You may accept the change, move to another departure, or cancel with a full refund.',
          'Cancellation by us — if we cancel a trip for any reason other than force majeure, you receive a full refund or a credit towards another trip, whichever you prefer.',
        ],
      },
      'We are not liable for the cost of flights or other arrangements you have made independently around a trip we change or cancel. This is the single strongest reason to insure the trip.',
    ],
  },
  {
    id: 'your-responsibilities',
    title: 'Your responsibilities',
    body: [
      {
        list: [
          'Carry valid government photo ID for every traveller, and a passport and visa where the destination requires one. Names must match across ID, tickets and permits exactly.',
          'Give us accurate names, ages and nationalities at the time of booking — permits are issued against them and cannot be amended later without a fee.',
          'Reach the start point at the stated time. We cannot hold a group or a permit convoy for a late arrival.',
          'Follow your guide\'s instructions on safety, particularly at altitude, on water and around wildlife.',
          'Respect local custom, dress codes at religious sites, and the photography restrictions in force at cremation ghats and inside certain temples and monasteries.',
        ],
      },
      'We may end a traveller\'s trip without refund where their behaviour puts the safety of the group, our staff or local communities at risk. This is rare and never a decision we take lightly.',
    ],
  },
  {
    id: 'health-and-fitness',
    title: 'Health, fitness and altitude',
    body: [
      'Several of our trips spend days above 3,500 metres, and Ladakh and Spiti both cross passes above 5,000 metres. Altitude affects fit people and unfit people alike, and it is the most common reason a trip goes wrong.',
      {
        list: [
          'Tell us at the time of booking about any heart or lung condition, pregnancy, recent surgery, diabetes or mobility limitation. It changes what we plan, not whether we will take you.',
          'Each itinerary states a difficulty grade. Book honestly against it.',
          'Follow the acclimatisation schedule in the itinerary. It is built in deliberately and is not padding.',
          'Our guides carry first aid and can arrange evacuation, but they are not doctors and the trips are not medically supervised.',
        ],
      },
      'Where a traveller has withheld a material medical condition, we accept no liability for the consequences of it.',
    ],
  },
  {
    id: 'insurance',
    title: 'Travel insurance',
    body: [
      'Comprehensive travel insurance is mandatory on every trip that goes above 3,000 metres, and strongly recommended on all the others. It should cover medical treatment, emergency evacuation from remote terrain, trip cancellation and curtailment, and your baggage.',
      'We may ask to see your policy number before departure on high-altitude trips.',
    ],
  },
  {
    id: 'force-majeure',
    title: 'Force majeure',
    body: [
      'We are not liable for failure to deliver a trip where the cause is outside our reasonable control — landslide, flood, earthquake, snowfall closing a highway, epidemic, strike, civil unrest, act of terrorism, government restriction, or the closure of a permit route or airspace.',
      'In these circumstances we will recover whatever we can from our suppliers and pass on every rupee of it, after deducting costs already spent that cannot be recovered. We will always tell you exactly what was recovered and what was not.',
    ],
  },
  {
    id: 'liability',
    title: 'Liability',
    body: [
      'We take responsibility for the parts of your trip we deliver ourselves, and for choosing our suppliers with care.',
      {
        list: [
          'Our total liability for any claim is limited to the amount you paid us for the trip.',
          'We are not liable for the acts or omissions of independent suppliers such as airlines, railways and hotels, whose own terms apply to their part of the trip.',
          'We are not liable for indirect losses, including missed connections onward from a trip or loss of earnings.',
          'Adventure activities — rafting, paragliding, diving, high-altitude driving and trekking — carry inherent risk that no operator can remove. You take part in them accepting that risk.',
        ],
      },
      'Nothing in this section limits our liability for death or personal injury caused by our own negligence, which cannot be excluded under Indian law.',
    ],
  },
  {
    id: 'photography',
    title: 'Photography and media',
    body: [
      'We photograph our trips, and we sometimes use those photographs on this website and on social media. Tell your guide at the start of the trip if you would rather not appear, and we will keep you out of frame. If a photograph of you is already published and you want it taken down, email us and it will be removed within seven days.',
    ],
  },
  {
    id: 'complaints',
    title: 'Complaints',
    body: [
      'If something is wrong during a trip, tell your guide or trip leader immediately. Almost everything can be fixed on the ground, and almost nothing can be fixed afterwards.',
      'If it is not resolved on the trip, write to hello@hansvahini.com within 30 days of returning. We acknowledge every complaint within 48 hours and aim to close it within 30 days.',
    ],
  },
  {
    id: 'governing-law',
    title: 'Governing law',
    body: [
      'These terms are governed by the laws of India. Any dispute arising from them is subject to the exclusive jurisdiction of the courts at Dehradun, Uttarakhand.',
    ],
  },
]
