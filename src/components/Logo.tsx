import { practiceName } from '@/config/practice'

type Variant = 'horizontal' | 'horizontal-reversed' | 'vertical' | 'vertical-reversed' | 'icon'

const sources: Record<Variant, { src: string; w: number; h: number }> = {
  horizontal: { src: '/logos/logo-horizontal.svg', w: 2000, h: 720 },
  'horizontal-reversed': { src: '/logos/logo-horizontal-reversed.svg', w: 2000, h: 720 },
  vertical: { src: '/logos/logo-vertical.svg', w: 1362, h: 1155 },
  'vertical-reversed': { src: '/logos/logo-vertical-reversed.svg', w: 1362, h: 1155 },
  icon: { src: '/logos/icon-mark.svg', w: 512, h: 512 },
}

/**
 * Brand Guidelines §2 minimum sizes, enforced here so no caller can render the
 * logo below the point where the light wordmark strokes disappear:
 *   horizontal lockups: 200px wide minimum
 *   vertical lockups:   130px wide minimum
 */
const minWidth: Record<Variant, number> = {
  horizontal: 200,
  'horizontal-reversed': 200,
  vertical: 130,
  'vertical-reversed': 130,
  icon: 24,
}

interface LogoProps {
  variant?: Variant
  /** Rendered width in px. Clamped up to the brand minimum for the variant. */
  width?: number
  /** Set true when the logo sits inside a link that already has a text label. */
  decorative?: boolean
  /** Above-the-fold instances load eagerly. */
  priority?: boolean
  className?: string
}

/**
 * Renders a logo lockup.
 *
 * Uses a plain <img> rather than next/image, deliberately. The logos are SVG,
 * and next/image brings nothing to an SVG: its optimizer refuses SVG by design
 * (the endpoint returns 400 without `dangerouslyAllowSVG`), and it generates no
 * srcset for vector sources. What it does add is a lazy-loading
 * IntersectionObserver, which was leaving the footer lockup permanently
 * unloaded even once scrolled into view.
 *
 * Explicit width and height attributes preserve the aspect ratio and reserve
 * layout space, so there is no CLS cost to dropping the wrapper.
 */
export function Logo({
  variant = 'horizontal',
  width = 260,
  decorative = false,
  priority = false,
  className,
}: LogoProps) {
  const source = sources[variant]
  const w = Math.max(width, minWidth[variant])
  const h = Math.round((w * source.h) / source.w)

  return (
    // eslint-disable-next-line @next/next/no-img-element -- SVG: see note above.
    <img
      src={source.src}
      width={w}
      height={h}
      className={className}
      alt={decorative ? '' : `${practiceName} Dentistry`}
      aria-hidden={decorative || undefined}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding={priority ? 'sync' : 'async'}
      style={{ width: w, height: 'auto' }}
    />
  )
}
