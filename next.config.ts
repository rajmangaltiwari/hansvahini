import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    // Client Cache TTLs, in seconds. Every admin route is dynamic (session
    // cookie), and `dynamic` has defaulted to 0 since Next 15 — so leaving the
    // panel and coming back re-fetched every segment from Mumbai each time.
    //
    // 30s is safe here because Server Actions that mutate leads, packages and
    // destinations return a fresh RSC payload, which replaces the cached
    // segment regardless of its age. The window only affects rows changed
    // outside this browser tab.
    staleTimes: {
      dynamic: 30,
      static: 300,
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        // Uploads served from Supabase Storage. next/image refuses any remote
        // host that is not listed here.
        protocol: 'https',
        hostname: 'nyolfoewfgdrezzfeqfr.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
}

export default nextConfig
