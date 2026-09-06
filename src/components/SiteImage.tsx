import Image from 'next/image'

/**
 * An image that is optimised when it safely can be, and plain when it cannot.
 *
 * next/image throws for any remote host missing from next.config.ts
 * remotePatterns. The gallery lets an admin paste a URL from anywhere, so using
 * next/image everywhere would let one pasted link take down a public page.
 *
 * This checks the host first: local paths, Unsplash and our own Supabase bucket
 * go through the optimiser (resized per device, served as WebP/AVIF); anything
 * else falls back to a plain <img>, which always renders. Widening
 * remotePatterns to `**` instead would turn the optimiser into an open proxy
 * for any URL on the internet, which is a cost and abuse problem.
 */

const OPTIMISABLE_HOSTS = [
  'images.unsplash.com',
  // The Supabase project host, derived so this follows the env rather than
  // hardcoding a project ref that would silently stop matching.
  (() => {
    try {
      return new URL(process.env.NEXT_PUBLIC_SUPABASE_URL ?? '').hostname
    } catch {
      return ''
    }
  })(),
].filter(Boolean)

function canOptimise(src: string): boolean {
  // Site-relative paths are served from public/ and are always safe.
  if (src.startsWith('/')) return true

  try {
    return OPTIMISABLE_HOSTS.includes(new URL(src).hostname)
  } catch {
    return false
  }
}

export default function SiteImage({
  src,
  alt,
  className = '',
  /** Tells the optimiser which widths to generate. Get this roughly right. */
  sizes = '100vw',
  priority = false,
  width,
  height,
}: {
  src: string
  alt: string
  className?: string
  sizes?: string
  priority?: boolean
  /** Give both for a fixed-size image; omit both to fill the parent box. */
  width?: number
  height?: number
}) {
  const fixed = width !== undefined && height !== undefined

  if (canOptimise(src)) {
    return fixed ? (
      <Image src={src} alt={alt} width={width} height={height} priority={priority} className={className} />
    ) : (
      // Callers place this inside a positioned, explicitly-sized box, so `fill`
      // reproduces the old `w-full h-full` behaviour exactly.
      <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={className} />
    )
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      className={fixed ? className : `absolute inset-0 w-full h-full ${className}`}
    />
  )
}
