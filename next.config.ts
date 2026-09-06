import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
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
