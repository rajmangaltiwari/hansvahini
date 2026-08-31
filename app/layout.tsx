import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'

const geist = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Hansvahini Expeditions — Travel & Trip Planner',
  description:
    'Handcrafted travel packages to Ladakh, Manali, Spiti Valley, Kedarnath, and more. Plan your perfect Indian expedition with Hansvahini Expeditions.',
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-gray-900">
        {children}
      </body>
    </html>
  )
}
