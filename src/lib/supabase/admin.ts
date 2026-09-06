import 'server-only'

import { createClient } from '@supabase/supabase-js'
import { required, SUPABASE_URL } from './env'

/**
 * The service-role client. It BYPASSES ROW LEVEL SECURITY entirely.
 *
 * Exactly one caller: submitEnquiry() in src/server/actions/leads.ts. The
 * public has to be able to create a lead, but must not be able to read, edit
 * or delete one — so `anon` gets no policy on `leads` at all and this client
 * makes that single write on their behalf, after validation.
 *
 * Do not reach for this anywhere else. Admin writes go through
 * src/lib/supabase/server.ts so that RLS stays a backstop behind the auth check.
 */
export function createAdminClient() {
  return createClient(SUPABASE_URL(), required('SUPABASE_SERVICE_ROLE_KEY'), {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}
