import type { LegalSection } from '@/src/components/LegalDocument'

/**
 * Privacy policy copy. Kept as data so the page component stays layout-only —
 * edit the wording here, not in the JSX.
 */
export const privacyUpdated = '5 September 2026'

export const privacySections: LegalSection[] = [
  {
    id: 'who-we-are',
    title: 'Who we are',
    body: [
      'Hansvahini Expeditions plans and operates guided travel across India — the Himalaya, the Uttarakhand pilgrimage circuits, Rajasthan, Varanasi and the Andaman Islands. This policy explains what we do with the personal information you give us when you enquire about a trip, book one, or simply browse the site.',
      'It applies to hansvahini.com and to every enquiry that reaches us through the website forms, the pop-up enquiry form, WhatsApp, email or phone.',
    ],
  },
  {
    id: 'what-we-collect',
    title: 'What we collect',
    body: [
      'We only ask for what a trip actually needs. Depending on how far you go with us, that falls into three groups.',
      {
        list: [
          'Enquiry details — your name, email address, phone number, the destination you are interested in, rough travel dates, the number of travellers and anything you write in the message box.',
          'Booking details — the full names as printed on your government photo ID, date of birth, nationality, ID or passport number where a permit requires it, emergency contact, dietary requirements and any medical condition you choose to disclose so we can plan safely around it.',
          'Site usage — pages visited, approximate location from your IP address, browser and device type, and how you arrived at the site. This is aggregate traffic data and is not tied to your name.',
        ],
      },
      'We do not collect payment card numbers. Payments run through a third-party gateway that handles the card details directly; we only ever see a transaction reference and whether it succeeded.',
    ],
  },
  {
    id: 'how-we-use-it',
    title: 'How we use it',
    body: [
      {
        list: [
          'To answer your enquiry and put together an itinerary and quote.',
          'To make the bookings a confirmed trip requires — hotels and homestays, flights and trains, permits, vehicles, guides and activity operators.',
          'To reach you before and during the trip about timings, weather, road closures and any change to the plan.',
          'To meet legal obligations, including the identity records hotels and permit authorities are required to keep.',
          'To improve the site and understand which trips people are looking for.',
        ],
      },
      'We will only send you marketing email or WhatsApp messages if you have asked for them, and every one of them carries a way to stop.',
    ],
  },
  {
    id: 'who-we-share-with',
    title: 'Who we share it with',
    body: [
      'Running a trip means passing some of your details to the people delivering it. We share the minimum each one needs, and nothing more.',
      {
        list: [
          'Accommodation providers — the names of the guests staying, and ID details where the state requires guest registration.',
          'Transport operators and airlines — names as they appear on your ID, and contact details for the driver or crew.',
          'Permit authorities — for Inner Line Permits in Ladakh and Spiti, Char Dham Yatra registration and Andaman entry permits, all of which are issued against government ID.',
          'Activity operators — rafting, paragliding, diving and safari partners, who need the participant list and any declared medical condition.',
          'Payment gateway and accounting providers — transaction records only.',
        ],
      },
      'We do not sell your personal information, and we do not share it with advertisers or data brokers. We will disclose information where a court, tax authority or law-enforcement agency legally requires it.',
    ],
  },
  {
    id: 'cookies',
    title: 'Cookies and analytics',
    body: [
      'The site uses a small number of cookies to keep the pages working and to count visits. None of them identify you by name.',
      {
        list: [
          'Essential cookies keep forms and navigation working. The site does not function properly without them.',
          'Analytics cookies tell us how many people visited a page and where they came from, in aggregate.',
        ],
      },
      'You can block or delete cookies in your browser settings. Blocking the essential ones may break parts of the site.',
    ],
  },
  {
    id: 'how-long-we-keep-it',
    title: 'How long we keep it',
    body: [
      {
        list: [
          'Enquiries that do not turn into a booking are kept for 24 months, in case you come back to the same plan.',
          'Booking and billing records are kept for eight years, which is what Indian tax and accounting rules require.',
          'Analytics data is retained in aggregate and is not linked to an individual.',
        ],
      },
      'You can ask us to delete your details sooner, and we will, except where the law requires us to hold a record.',
    ],
  },
  {
    id: 'your-rights',
    title: 'Your rights',
    body: [
      'Under the Digital Personal Data Protection Act, 2023, you can ask us to do any of the following, and we will respond within thirty days.',
      {
        list: [
          'Tell you what personal data of yours we hold and what we have done with it.',
          'Correct anything that is wrong, incomplete or out of date.',
          'Erase data we no longer need for the purpose you gave it for.',
          'Withdraw a consent you previously gave, such as for marketing messages.',
          'Nominate someone to exercise these rights on your behalf if you are unable to.',
        ],
      },
      'Send any of these requests to hello@hansvahini.com with the word "Privacy" in the subject line. If you are not satisfied with how we handle it, you may complain to the Data Protection Board of India.',
    ],
  },
  {
    id: 'security',
    title: 'How we protect it',
    body: [
      'Enquiry and booking records are held in access-controlled systems, and only the staff working on your trip can open them. Data moving between your browser and our site travels over an encrypted connection.',
      'No system is perfectly secure. If a breach ever affects your personal data, we will tell you and the Data Protection Board of India as the law requires, and we will tell you plainly what happened.',
    ],
  },
  {
    id: 'children',
    title: 'Children',
    body: [
      'Children travel with us often, and we are glad to have them. We collect a child\'s details only from the parent or guardian making the booking, use them solely to plan and run the trip, and never for marketing or profiling of any kind.',
    ],
  },
  {
    id: 'changes',
    title: 'Changes to this policy',
    body: [
      'When we change how we handle personal information, we update this page and move the date at the top. If a change materially affects how we use data you have already given us, we will email you about it rather than rely on you noticing.',
    ],
  },
  {
    id: 'grievance-officer',
    title: 'Grievance Officer',
    body: [
      'In line with Indian law, you can raise any privacy complaint with our Grievance Officer, who will acknowledge it within 48 hours and resolve it within thirty days.',
      {
        list: [
          'Email — privacy@hansvahini.com',
          'Phone — +91 98765 43210, Monday to Saturday, 9 AM to 7 PM IST',
          'Post — Hansvahini Expeditions, Grievance Officer, Dehradun, Uttarakhand, India',
        ],
      },
    ],
  },
]
