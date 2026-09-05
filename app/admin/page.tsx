import { redirect } from 'next/navigation'

/** `/admin` is not a screen — send visitors to the sign-in page. */
export default function AdminIndexPage() {
  redirect('/admin/login')
}
