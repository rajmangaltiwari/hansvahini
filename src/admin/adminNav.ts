import {
  LayoutDashboard,
  Inbox,
  Package,
  MapPinned,
  Images,
  type LucideIcon,
} from 'lucide-react'

export type AdminNavItem = {
  label: string
  href: string
  icon: LucideIcon
  description: string
}

/**
 * The single source of truth for admin navigation. The sidebar renders it, and
 * the topbar looks up the current entry here for the page title.
 */
export const adminNav: AdminNavItem[] = [
  { label: 'Dashboard',    href: '/admin/dashboard',    icon: LayoutDashboard, description: 'Overview of enquiries, bookings and content' },
  { label: 'Leads',        href: '/admin/leads',        icon: Inbox,           description: 'Every enquiry that came in through the site' },
  { label: 'Packages',     href: '/admin/packages',     icon: Package,         description: 'The bookable trips shown at /packages' },
  { label: 'Destinations', href: '/admin/destinations', icon: MapPinned,       description: 'Place guides shown at /destination' },
  { label: 'Gallery',      href: '/admin/gallery',      icon: Images,          description: 'Photo library used across the site' },
]

export function navItemFor(pathname: string): AdminNavItem | undefined {
  return adminNav.find((item) => pathname === item.href || pathname.startsWith(`${item.href}/`))
}
