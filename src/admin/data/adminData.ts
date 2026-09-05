// ─────────────────────────────────────────────────────────────────────────────
// Dummy data for the admin panel — enquiries, media library and dashboard
// figures. Packages and destinations are NOT duplicated here: those admin
// screens read the live site data from src/data/*, so the panel always lists
// exactly what the public site is showing.
// ─────────────────────────────────────────────────────────────────────────────

/** Where an enquiry sits in the sales pipeline. */
export type LeadStatus = 'new' | 'potential' | 'converted' | 'lost' | 'not-answered'

/** Which form the enquiry came in through. */
export type LeadSource = 'Website form' | 'Pop-up form' | 'Package page' | 'Phone' | 'WhatsApp'

export type Lead = {
  id: number
  name: string
  email: string
  phone: string
  destination: string
  travelDates: string
  travelers: string
  message: string
  status: LeadStatus
  source: LeadSource
  /** ISO date — formatted for display with formatDate(). */
  createdAt: string
}

/** One status change, with the note the agent left explaining it. */
export type LeadNote = {
  id: number
  status: LeadStatus
  text: string
  at: string
  by: string
}

/**
 * One-tap notes offered alongside each status. They exist so a status change
 * never gets saved without a reason just because typing was too slow.
 */
export const quickNotes: Record<LeadStatus, string[]> = {
  'new':          ['Fresh enquiry — not contacted yet', 'Reopened, needs a fresh call', 'Assigned for follow-up'],
  'potential':    ['Spoke to them, sending options today', 'Quote sent by email', 'Shared three options, awaiting their pick', 'Following up next week'],
  'converted':    ['Advance received, booking confirmed', 'Dates locked, vouchers going out', 'Booked over WhatsApp'],
  'lost':         ['Went with another operator', 'Budget too low for these dates', 'Postponed — try again next season'],
  'not-answered': ['Called twice — no answer', 'Phone switched off', 'WhatsApp sent, no reply yet'],
}

export const leadStatuses: { id: LeadStatus; label: string; className: string }[] = [
  { id: 'new',          label: 'New',          className: 'bg-blue-50 text-blue-700 border-blue-100' },
  { id: 'potential',    label: 'Potential',    className: 'bg-violet-50 text-violet-700 border-violet-100' },
  { id: 'converted',    label: 'Converted',    className: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
  { id: 'lost',         label: 'Lost',         className: 'bg-gray-100 text-gray-500 border-gray-200' },
  { id: 'not-answered', label: 'Not answered', className: 'bg-amber-50 text-amber-700 border-amber-100' },
]

export const leads: Lead[] = [
  { id: 1048, name: 'Ananya Sharma',    email: 'ananya.sharma@gmail.com',   phone: '+91 98110 44523', destination: 'Ladakh',          travelDates: 'Jun 2026',      travelers: '3–5',  message: 'Planning a family trip with two kids (9 and 12). Is the Khardung La drive alright for them?', status: 'new',          source: 'Website form',  createdAt: '2026-09-04' },
  { id: 1047, name: 'Rahul Verma',      email: 'rahul.verma91@outlook.com', phone: '+91 99872 10034', destination: 'Spiti Valley',    travelDates: 'Jul 2026',      travelers: '2',    message: 'Looking for the 9-day circuit. Can you do a Delhi pickup instead of Shimla?',                status: 'potential',    source: 'Package page',  createdAt: '2026-09-04' },
  { id: 1046, name: 'Meera Iyer',       email: 'meera.iyer@yahoo.in',       phone: '+91 90045 77120', destination: 'Andaman Islands', travelDates: 'Dec 2026',      travelers: '2',    message: 'Honeymoon in the first week of December. Need a sea-facing room and the scuba add-on.',       status: 'potential',    source: 'Pop-up form',   createdAt: '2026-09-03' },
  { id: 1045, name: 'Karan Mehta',      email: 'karan.mehta@gmail.com',     phone: '+91 98203 66781', destination: 'Kedarnath',       travelDates: 'May 2026',      travelers: '6–10', message: 'Group of 8 from Mumbai. Do you arrange the helicopter leg from Phata?',                       status: 'converted',    source: 'WhatsApp',      createdAt: '2026-09-02' },
  { id: 1044, name: 'Priya Nair',       email: 'priya.nair@gmail.com',      phone: '+91 96334 90210', destination: 'Manali',          travelDates: 'Feb 2026',      travelers: '3–5',  message: 'Want to see snow with elderly parents. Something relaxed, no trekking.',                      status: 'potential',    source: 'Website form',  createdAt: '2026-09-02' },
  { id: 1043, name: 'Aditya Raghavan',  email: 'aditya.r@protonmail.com',   phone: '+91 87900 12456', destination: 'Rishikesh',       travelDates: 'Mar 2026',      travelers: '10+',  message: 'Corporate offsite for 14 people. Rafting plus a yoga session on day two.',                    status: 'potential',    source: 'Phone',         createdAt: '2026-09-01' },
  { id: 1042, name: 'Sneha Kulkarni',   email: 'sneha.k@gmail.com',         phone: '+91 93712 88345', destination: 'Ranthambore',     travelDates: 'Nov 2026',      travelers: '2',    message: 'Two safaris minimum. Prefer zone 3 or 4 if that can be arranged.',                            status: 'new',          source: 'Package page',  createdAt: '2026-09-01' },
  { id: 1041, name: 'Vikram Singh',     email: 'vikram.singh@rediff.com',   phone: '+91 98680 23111', destination: 'Varanasi',        travelDates: 'Oct 2026',      travelers: '1',    message: 'Solo, four nights. Interested in the Ganga aarti and a Sarnath day trip.',                    status: 'converted',    source: 'Website form',  createdAt: '2026-08-31' },
  { id: 1040, name: 'Fatima Khan',      email: 'fatima.khan@gmail.com',     phone: '+91 90876 45219', destination: 'Ladakh',          travelDates: 'Aug 2026',      travelers: '3–5',  message: 'Four friends, want the Nubra camel ride and a night camping at Pangong.',                     status: 'lost',         source: 'Pop-up form',   createdAt: '2026-08-30' },
  { id: 1039, name: 'Joseph D’Souza',   email: 'joseph.dsouza@gmail.com',   phone: '+91 91234 55098', destination: 'Spiti Valley',    travelDates: 'Sep 2026',      travelers: '2',    message: 'Photography-led trip. Flexible on dates, need the darkest-sky nights.',                       status: 'not-answered', source: 'WhatsApp',      createdAt: '2026-08-29' },
  { id: 1038, name: 'Divya Menon',      email: 'divya.menon@gmail.com',     phone: '+91 97455 31207', destination: 'Manali',          travelDates: 'Jan 2027',      travelers: '2',    message: 'New Year trip. Budget around ₹40k per head, all inclusive.',                                  status: 'new',          source: 'Website form',  createdAt: '2026-08-29' },
  { id: 1037, name: 'Arjun Bhatia',     email: 'arjun.bhatia@icloud.com',   phone: '+91 88009 74123', destination: 'Andaman Islands', travelDates: 'Apr 2026',      travelers: '6–10', message: 'Extended family of 9, three of them senior citizens. Need ferry assistance.',                 status: 'potential',    source: 'Phone',         createdAt: '2026-08-28' },
]

/** Twelve months of enquiry volume — drives the dashboard bar chart. */
export const enquiryTrend = [
  { month: 'Sep', count:  38 },
  { month: 'Oct', count:  52 },
  { month: 'Nov', count:  61 },
  { month: 'Dec', count:  84 },
  { month: 'Jan', count:  73 },
  { month: 'Feb', count:  66 },
  { month: 'Mar', count:  91 },
  { month: 'Apr', count: 108 },
  { month: 'May', count: 127 },
  { month: 'Jun', count: 142 },
  { month: 'Jul', count: 119 },
  { month: 'Aug', count:  96 },
]

export type ActivityEntry = {
  id: number
  actor: string
  action: string
  target: string
  time: string
}

export const activityFeed: ActivityEntry[] = [
  { id: 1, actor: 'You',    action: 'marked as converted',  target: 'Lead #1045 — Karan Mehta',        time: '12 minutes ago' },
  { id: 2, actor: 'Priyam', action: 'updated pricing on',   target: 'Spiti Valley Circuit',            time: '1 hour ago' },
  { id: 3, actor: 'You',    action: 'uploaded 6 photos to', target: 'Ladakh gallery',                  time: '3 hours ago' },
  { id: 4, actor: 'Priyam', action: 'published',            target: 'Andaman Island Hopper',           time: 'Yesterday, 6:40 pm' },
  { id: 5, actor: 'You',    action: 'replied to',           target: 'Lead #1041 — Vikram Singh',       time: 'Yesterday, 2:15 pm' },
  { id: 6, actor: 'Priyam', action: 'archived',             target: 'Monsoon Konkan Escape',           time: '2 days ago' },
]

export type MediaImage = {
  id: number
  url: string
  /** The line shown under the photo on the public site — GalleryImage.caption. */
  caption: string
  /** Destination slug the photo belongs to, or 'general' for brand assets. */
  album: string
  size: string
  dimensions: string
  uploadedAt: string
  /** Original file name, kept as a fallback label until a caption is written. */
  fileName?: string
}

const unsplash = (id: string) => `https://images.unsplash.com/photo-${id}?w=800&q=80`

export const mediaImages: MediaImage[] = [
  { id: 1,  url: unsplash('1589308078059-be1415eab4c3'), caption: 'Pangong Tso at first light',   album: 'ladakh',     size: '2.4 MB', dimensions: '4000 × 2667', uploadedAt: '2026-09-03' },
  { id: 2,  url: unsplash('1506905925346-21bda4d32df4'), caption: 'Khardung La prayer flags',     album: 'ladakh',     size: '1.8 MB', dimensions: '3600 × 2400', uploadedAt: '2026-09-03' },
  { id: 3,  url: unsplash('1516426122078-c23e76319801'), caption: 'Thiksey dawn prayers',         album: 'ladakh',     size: '2.1 MB', dimensions: '3840 × 2560', uploadedAt: '2026-09-01' },
  { id: 4,  url: unsplash('1502086223501-7ea6ecd79368'), caption: 'Hunder dunes, late afternoon', album: 'ladakh',     size: '3.0 MB', dimensions: '4200 × 2800', uploadedAt: '2026-08-30' },
  { id: 5,  url: unsplash('1464822759023-fed622ff2c3b'), caption: 'Zanskar gorge from above',     album: 'spiti',      size: '2.6 MB', dimensions: '4000 × 2667', uploadedAt: '2026-08-29' },
  { id: 6,  url: unsplash('1537905569824-f89f14cceb68'), caption: 'Key Monastery ridge',          album: 'spiti',      size: '1.9 MB', dimensions: '3500 × 2333', uploadedAt: '2026-08-28' },
  { id: 7,  url: unsplash('1483729558449-99ef09a8c325'), caption: 'Solang valley snowfields',     album: 'manali',     size: '2.2 MB', dimensions: '3800 × 2534', uploadedAt: '2026-08-27' },
  { id: 8,  url: unsplash('1519681393784-d120267933ba'), caption: 'Old Manali footbridge',        album: 'manali',     size: '1.5 MB', dimensions: '3200 × 2133', uploadedAt: '2026-08-26' },
  { id: 9,  url: unsplash('1544735716-392fe2489ffa'),    caption: 'Ganga aarti, Dashashwamedh',   album: 'varanasi',   size: '2.8 MB', dimensions: '4100 × 2733', uploadedAt: '2026-08-24' },
  { id: 10, url: unsplash('1524492412937-b28074a5d7da'), caption: 'Kedarnath temple approach',    album: 'kedarnath',  size: '2.3 MB', dimensions: '3900 × 2600', uploadedAt: '2026-08-22' },
  { id: 11, url: unsplash('1516815231560-8f41ec531527'), caption: 'Radhanagar beach sunset',      album: 'andaman',    size: '3.2 MB', dimensions: '4500 × 3000', uploadedAt: '2026-08-20' },
  { id: 12, url: unsplash('1544551763-46a013bb70d5'),    caption: 'Snorkelling at Elephant Beach',album: 'andaman',    size: '2.7 MB', dimensions: '4000 × 2667', uploadedAt: '2026-08-19' },
  { id: 13, url: unsplash('1568454537842-d933259bb258'), caption: 'Tiger sighting, zone 3',       album: 'ranthambore',size: '3.4 MB', dimensions: '4600 × 3067', uploadedAt: '2026-08-17' },
  { id: 14, url: unsplash('1544735716-ea9ef790f501'),    caption: 'Rafting the Shivpuri stretch', album: 'rishikesh',  size: '2.0 MB', dimensions: '3700 × 2467', uploadedAt: '2026-08-15' },
  { id: 15, url: unsplash('1512343879784-a960bf40e7f2'), caption: 'Team on location, Leh',        album: 'general',    size: '1.4 MB', dimensions: '3000 × 2000', uploadedAt: '2026-08-12' },
]

/** '2026-09-04' → '4 Sep 2026'. Fixed locale so server and client agree. */
export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

/** '+91 98110 44523' → '919811044523', the digits-only form wa.me expects. */
export function whatsappNumber(phone: string): string {
  return phone.replace(/\D/g, '')
}

export function countByStatus(status: LeadStatus | 'all'): number {
  return status === 'all' ? leads.length : leads.filter((l) => l.status === status).length
}
