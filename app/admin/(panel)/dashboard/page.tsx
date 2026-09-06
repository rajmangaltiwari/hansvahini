import type { Metadata } from 'next'
import Link from 'next/link'
import { Images, Inbox, MapPinned, Package, TrendingUp } from 'lucide-react'
import PageHeader from '@/src/admin/ui/PageHeader'
import Card from '@/src/admin/ui/Card'
import StatCard from '@/src/admin/ui/StatCard'
import EnquiryChart from '@/src/admin/dashboard/EnquiryChart'
import RecentLeads from '@/src/admin/dashboard/RecentLeads'
import TopPackages from '@/src/admin/dashboard/TopPackages'
import ActivityFeed from '@/src/admin/dashboard/ActivityFeed'
import { listGallery } from '@/src/lib/queries/gallery'
import { dashboardStats, recentActivity } from '@/src/lib/queries/stats'
import { listLeads } from '@/src/lib/queries/leads'
import { listPackages } from '@/src/lib/queries/packages'
import { listDestinations } from '@/src/lib/queries/destinations'

export const metadata: Metadata = { title: 'Dashboard' }

const quickActions = [
  { label: 'New package',     href: '/admin/packages/new',     icon: Package },
  { label: 'New destination', href: '/admin/destinations/new', icon: MapPinned },
  { label: 'Upload photos',   href: '/admin/gallery',      icon: Images },
  { label: 'Open inbox',      href: '/admin/leads',        icon: Inbox },
]

export default async function DashboardPage() {
  // Admin session, so RLS returns drafts alongside published rows.
  const [packages, destinations, photos, stats, leads] = await Promise.all([
    listPackages(true),
    listDestinations(true),
    listGallery(),
    dashboardStats(),
    listLeads(),
  ])
  const activity = await recentActivity()

  // Twelve buckets ending with the current month.
  const chartRange =
    stats.trend.length > 0
      ? `Monthly totals, ${stats.trend[0].month} to ${stats.trend[stats.trend.length - 1].month}`
      : 'Monthly totals'

  return (
    <>
      <PageHeader
        title="Dashboard"
        subtitle="Where things stand across enquiries, trips and content."
        actions={
          <Link
            href="/admin/leads"
            className="inline-flex items-center gap-2 bg-gray-900 text-white text-sm font-semibold px-4 py-2.5 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <Inbox className="w-4 h-4" />
            Review leads
          </Link>
        }
      />

      {/* Headline figures */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        <StatCard label="New enquiries" value={String(stats.newEnquiries)} delta={stats.newDelta} hint="vs last week" icon={Inbox} />
        <StatCard label="Converted"     value={String(stats.converted)} delta={stats.convertedDelta} hint="vs last month" icon={TrendingUp} />
        <StatCard label="Live packages" value={String(packages.length)} hint="published and drafts" icon={Package} />
      </div>

      {/* Chart + activity */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mt-4">
        <Card title="Enquiry volume" subtitle={chartRange} className="xl:col-span-2">
          <EnquiryChart trend={stats.trend} />
        </Card>
        <Card title="Recent activity" subtitle="What the team changed lately">
          <ActivityFeed entries={activity} />
        </Card>
      </div>

      {/* Leads + top packages */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mt-4">
        <Card title="Latest enquiries" subtitle="Newest first" padded={false} className="xl:col-span-2">
          <RecentLeads leads={leads} />
        </Card>
        <Card title="Top packages" subtitle="Ranked by review volume">
          <TopPackages />
        </Card>
      </div>

      {/* Content snapshot + shortcuts */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mt-4">
        <Card title="Content library" subtitle="What the public site is serving right now" className="xl:col-span-2">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: 'Packages',     value: packages.length,     hint: `across ${destinations.length} destinations`, href: '/admin/packages' },
              { label: 'Destinations', value: destinations.length, hint: 'place guides',              href: '/admin/destinations' },
              { label: 'Photos',       value: photos.length,    hint: 'in the media library',    href: '/admin/gallery' },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="border border-gray-100 rounded-xl p-4 hover:border-gray-300 transition-colors"
              >
                <p className="text-2xl font-bold text-gray-900 tracking-tight">{item.value}</p>
                <p className="mt-1 text-xs font-semibold text-gray-900">{item.label}</p>
                <p className="text-[11px] text-gray-400">{item.hint}</p>
              </Link>
            ))}
          </div>
        </Card>

        <Card title="Quick actions">
          <div className="grid grid-cols-2 gap-2">
            {quickActions.map((action) => (
              <Link
                key={action.label}
                href={action.href}
                className="flex flex-col gap-2 border border-gray-100 rounded-xl p-3 hover:border-gray-300 hover:bg-gray-50 transition-colors"
              >
                <span className="w-8 h-8 rounded-lg bg-gray-900 flex items-center justify-center">
                  <action.icon className="w-4 h-4 text-white" />
                </span>
                <span className="text-xs font-medium text-gray-900 leading-snug">{action.label}</span>
              </Link>
            ))}
          </div>
        </Card>
      </div>
    </>
  )
}
