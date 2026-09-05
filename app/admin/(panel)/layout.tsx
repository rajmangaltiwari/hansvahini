import type { Metadata } from 'next'
import AdminShell from '@/src/admin/AdminShell'

export const metadata: Metadata = {
  title: { default: 'Admin — Hansvahini Expeditions', template: '%s — Hansvahini Admin' },
  robots: { index: false, follow: false },
}

/**
 * Wraps every panel screen in the sidebar + topbar chrome. The route group
 * keeps `/admin/login` outside this layout while leaving the URLs unchanged.
 */
export default function AdminPanelLayout({ children }: LayoutProps<'/admin'>) {
  return <AdminShell>{children}</AdminShell>
}
