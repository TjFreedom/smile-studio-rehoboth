import Link from 'next/link'
import type { ReactNode } from 'react'
import { JsonLd, PageHero, Callout, Button } from './Ui'
import { CtaBand, MedicalDisclaimer } from './Blocks'
import { webPageSchema, faqSchema } from '@/lib/schema'
import type { Crumb } from '@/lib/schema'
import type { Faq } from '@/content/faqs'
import { FaqList } from './Blocks'
import { cta } from '@/config/practice'

/**
 * Shared layout for editorial pages.
 *
 * Content is supplied as a typed block list rather than JSX, which keeps every
 * page's copy in one readable array and guarantees consistent heading order,
 * measure, and spacing. `h2` blocks become the only sub-headings, so the
 * document outline is correct by construction.
 */
export type Block =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'note'; text: string; variant?: 'sand' | 'info' }

export interface ProsePageProps {
  eyebrow?: string
  title: string
  lede?: string
  crumbs: Crumb[]
  seo: { name: string; description: string; path: string }
  blocks: Block[]
  aside?: ReactNode
  faqs?: readonly Faq[]
  faqTitle?: string
  /** Adds the education-not-advice disclaimer under the body. */
  disclaimer?: boolean
  /** Suppress the closing CTA band on legal pages. */
  hideCta?: boolean
  related?: { label: string; href: string }[]
}

export function ProsePage({
  eyebrow,
  title,
  lede,
  crumbs,
  seo,
  blocks,
  aside,
  faqs,
  faqTitle = 'Common questions',
  disclaimer = false,
  hideCta = false,
  related,
}: ProsePageProps) {
  const nodes: Record<string, unknown>[] = [webPageSchema(seo)]
  if (faqs?.length) nodes.push(faqSchema(faqs))

  const body = (
    <div className="article-body">
      {blocks.map((b, i) => {
        const key = `${b.type}-${i}`
        switch (b.type) {
          case 'h2':
            return <h2 key={key}>{b.text}</h2>
          case 'h3':
            return <h3 key={key} style={{ marginTop: 'var(--sp-6)' }}>{b.text}</h3>
          case 'ul':
            return (
              <ul key={key} style={{ display: 'grid', gap: 'var(--sp-2)', paddingLeft: '1.35rem', maxWidth: '70ch' }}>
                {b.items.map((li) => (
                  <li key={li}>{li}</li>
                ))}
              </ul>
            )
          case 'ol':
            return (
              <ol key={key} className="steps" style={{ marginTop: 'var(--sp-5)' }}>
                {b.items.map((li) => (
                  <li key={li}>
                    <p style={{ fontSize: 'var(--fs-small)' }}>{li}</p>
                  </li>
                ))}
              </ol>
            )
          case 'note':
            return (
              <Callout key={key} variant={b.variant ?? 'sand'}>
                <p style={{ fontSize: 'var(--fs-small)' }}>{b.text}</p>
              </Callout>
            )
          default:
            return <p key={key}>{b.text}</p>
        }
      })}
      {disclaimer ? <MedicalDisclaimer /> : null}
    </div>
  )

  const sidebar = aside ?? (
    <>
      <div className="card card--soft">
        <h3>Not open yet</h3>
        <p style={{ fontSize: 'var(--fs-small)', marginTop: 'var(--sp-2)' }}>
          Appointments cannot be scheduled while the office is under construction. Join the opening
          list to hear the confirmed date and early scheduling information first.
        </p>
        <div style={{ marginTop: 'var(--sp-4)' }}>
          <Button href={cta.primaryHref} full>
            {cta.primaryLabel}
          </Button>
        </div>
      </div>
      {related?.length ? (
        <div className="card">
          <h3>Related pages</h3>
          <ul className="list-clean" style={{ display: 'grid', gap: '0.7rem', marginTop: 'var(--sp-4)', fontSize: 'var(--fs-small)' }}>
            {related.map((r) => (
              <li key={r.href}>
                <Link href={r.href}>{r.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </>
  )

  return (
    <>
      <JsonLd nodes={nodes} />
      <PageHero eyebrow={eyebrow} title={title} lede={lede} crumbs={crumbs} />

      <section className="section">
        <div className="container">
          <div className="split">
            {body}
            <aside className="split__aside">{sidebar}</aside>
          </div>
        </div>
      </section>

      {faqs?.length ? (
        <section className="section section--soft">
          <div className="container container--narrow">
            <span className="eyebrow eyebrow--ruled" style={{ textAlign: 'center' }}>
              {faqTitle}
            </span>
            <h2 className="text-center" style={{ marginBottom: 'var(--sp-7)' }}>
              Questions People Ask
            </h2>
            <FaqList items={faqs} />
          </div>
        </section>
      ) : null}

      {hideCta ? null : <CtaBand />}
    </>
  )
}
