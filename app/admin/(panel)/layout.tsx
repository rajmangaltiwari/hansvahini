import type { Metadata } from 'next'
import AdminShell from '@/src/admin/AdminShell'
import { verifySession } from '@/src/lib/dal'
import { countLeadsByStatus } from '@/src/lib/queries/stats'

export const metadata: Metadata = {
  title: { default: 'Admin — Your Travels', template: '%s — Your Travels Admin' },
  robots: { index: false, follow: false },
}

/**
 * Wraps every panel screen in the sidebar + topbar chrome. The route group
 * keeps `/admin/login` outside this layout while leaving the URLs unchanged.
 *
 * verifySession() redirects to /admin/login when there is no session. proxy.ts
 * already does an optimistic version of this check, but that one only reads the
 * cookie — this one validates the token with Supabase, and it is the check that
 * counts.
 */
export default async function AdminPanelLayout({ children }: LayoutProps<'/admin'>) {
  // Both hit Supabase over the network, and Mumbai is a long way from the
  // function region — awaiting them in sequence doubled the delay before this
  // layout resolved, and loading.tsx cannot show a fallback for a layout that
  // is still awaiting. Kicking them off together halves it.
  //
  // countLeadsByStatus runs even on a request that turns out to be signed out;
  // RLS returns 0 there and verifySession's redirect still wins.
  const [session, newLeads] = await Promise.all([
    verifySession(),
    // The Leads pill counts enquiries nobody has looked at yet.
    countLeadsByStatus('new'),
  ])

  return (
    <AdminShell
      badges={{ '/admin/leads': newLeads }}
      user={{ name: session.displayName, email: session.email }}
      newLeads={newLeads}
    >
      {children}
    </AdminShell>
  )
}
