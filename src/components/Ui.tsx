import Link from 'next/link'
import type { ReactNode } from 'react'
import { breadcrumbSchema, buildGraph, type Crumb } from '@/lib/schema'
import { CheckIcon } from './Icons'

/* ------------------------------------------------------------------ *
 * JSON-LD
 * ------------------------------------------------------------------ */

export function JsonLd({ nodes }: { nodes: readonly Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      // Content is built from typed config objects, not user input.
      dangerouslySetInnerHTML={{ __html: buildGraph(nodes) }}
    />
  )
}

/* ------------------------------------------------------------------ *
 * WAVE RULE  — the signature device (Brand Guidelines §6)
 * ------------------------------------------------------------------ *
 * The two cresting waves lifted from the logo. Used deliberately, not on
 * every section. Decorative only, so it is hidden from assistive tech.
 */

export function WaveRule({ className = '', tone = '' }: { className?: string; tone?: string }) {
  return (
    <svg
      className={`wave-rule ${tone} ${className}`}
      viewBox="0 0 1200 60"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M0 34c120-26 220-26 330 4 96 26 178 30 268 10 92-20 168-22 262-4 84 16 190 14 340-18v34H0Z"
        fill="currentColor"
        opacity="0.42"
      />
      <path
        d="M0 46c150-28 254-24 358 6 92 26 176 28 262 8 96-22 176-20 276 2 74 16 178 12 304-16v14H0Z"
        fill="currentColor"
      />
    </svg>
  )
}

/* ------------------------------------------------------------------ *
 * PAGE HERO
 * ------------------------------------------------------------------ */

export function PageHero({
  eyebrow,
  title,
  lede,
  children,
  crumbs,
}: {
  eyebrow?: string
  title: string
  lede?: string
  children?: ReactNode
  crumbs?: readonly Crumb[]
}) {
  return (
    <header className="page-hero">
      <div className="container">
        {crumbs ? <Breadcrumbs crumbs={crumbs} /> : null}
        {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
        <h1>{title}</h1>
        {lede ? <p className="lede">{lede}</p> : null}
        {children}
      </div>
    </header>
  )
}

/* ------------------------------------------------------------------ *
 * BREADCRUMBS
 * ------------------------------------------------------------------ */

export function Breadcrumbs({ crumbs }: { crumbs: readonly Crumb[] }) {
  if (crumbs.length < 2) return null
  const last = crumbs[crumbs.length - 1]

  return (
    <>
      <nav aria-label="Breadcrumb" className="breadcrumbs">
        <ol>
          {crumbs.map((c, i) => {
            const isLast = i === crumbs.length - 1
            return (
              <li key={c.path}>
                {isLast ? (
                  <span aria-current="page">{c.name}</span>
                ) : (
                  <Link href={c.path}>{c.name}</Link>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
      {last ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: buildGraph([breadcrumbSchema(crumbs)]) }}
        />
      ) : null}
    </>
  )
}

/* ------------------------------------------------------------------ *
 * SECTION HEADING
 * ------------------------------------------------------------------ */

export function SectionHead({
  eyebrow,
  title,
  lede,
  center = false,
  invert = false,
  as: Tag = 'h2',
  ruled = false,
}: {
  eyebrow?: string
  title: string
  lede?: string
  center?: boolean
  invert?: boolean
  as?: 'h2' | 'h3'
  ruled?: boolean
}) {
  return (
    <div className={`section-head${center ? ' section-head--center' : ''}`}>
      {eyebrow ? (
        <span
          className={`eyebrow${invert ? ' eyebrow--invert' : ''}${
            ruled && center ? ' eyebrow--ruled' : ''
          }`}
        >
          {eyebrow}
        </span>
      ) : null}
      <Tag>{title}</Tag>
      {lede ? <p className="lede">{lede}</p> : null}
    </div>
  )
}

/* ------------------------------------------------------------------ *
 * CHECK LIST
 * ------------------------------------------------------------------ */

export function CheckList({ items, className = '' }: { items: readonly string[]; className?: string }) {
  return (
    <ul className={`list-check ${className}`}>
      {items.map((item) => (
        <li key={item}>
          <CheckIcon size={18} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

/* ------------------------------------------------------------------ *
 * INTERNAL PLACEHOLDER MARKER
 * ------------------------------------------------------------------ *
 * Renders a loud, dashed, amber block naming exactly what is missing and what
 * must replace it. Deliberately impossible to mistake for finished content.
 *
 * Hidden in production unless NEXT_PUBLIC_SHOW_PLACEHOLDERS is set, so the
 * public site never shows internal notes, while staging always does.
 */
export function PlaceholderNote({
  label = 'Internal placeholder',
  children,
}: {
  label?: string
  children: ReactNode
}) {
  const show =
    process.env.NODE_ENV !== 'production' ||
    process.env.NEXT_PUBLIC_SHOW_PLACEHOLDERS === 'true'
  if (!show) return null

  return (
    <div className="placeholder-note" role="note">
      <strong>{label}</strong>
      {children}
    </div>
  )
}

/* ------------------------------------------------------------------ *
 * CALLOUT
 * ------------------------------------------------------------------ */

export function Callout({
  children,
  variant = 'sand',
  className = '',
}: {
  children: ReactNode
  variant?: 'sand' | 'info'
  className?: string
}) {
  return (
    <div className={`callout${variant === 'info' ? ' callout--info' : ''} ${className}`}>
      {children}
    </div>
  )
}

/* ------------------------------------------------------------------ *
 * CTA BUTTON
 * ------------------------------------------------------------------ */

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'invert' | 'ghost-invert' | 'sand'

export function Button({
  href,
  children,
  variant = 'primary',
  size,
  full = false,
  event,
  className = '',
  external = false,
}: {
  href: string
  children: ReactNode
  variant?: ButtonVariant
  size?: 'lg'
  full?: boolean
  /** Analytics event name, read by the delegated click listener. */
  event?: string
  className?: string
  external?: boolean
}) {
  const classes = [
    'btn',
    variant !== 'primary' ? `btn--${variant}` : '',
    size === 'lg' ? 'btn--lg' : '',
    full ? 'btn--full' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const isExternal = external || href.startsWith('http') || href.startsWith('mailto:')

  if (isExternal) {
    return (
      <a
        href={href}
        className={classes}
        data-event={event}
        {...(href.startsWith('http')
          ? { target: '_blank', rel: 'noopener noreferrer' }
          : {})}
      >
        {children}
      </a>
    )
  }

  return (
    <Link href={href} className={classes} data-event={event}>
      {children}
    </Link>
  )
}
