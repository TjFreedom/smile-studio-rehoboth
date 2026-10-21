import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { JsonLd, PageHero, SectionHead, Callout, Button, CheckList } from '@/components/Ui'
import { CtaBand, FaqList, MedicalDisclaimer } from '@/components/Blocks'
import { serviceIcons } from '@/components/Icons'
import { faqSchema, serviceSchema, webPageSchema } from '@/lib/schema'
import { pageMetadata } from '@/lib/seo'
import { getService, services, tierLabel } from '@/content/services'
import {
  cta,
  isAcceptingAppointments,
  isPreOpening,
  practiceName,
} from '@/config/practice'

/** Fully static. Every category is known at build time. */
export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }))
}

export const dynamicParams = false

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const service = getService(slug)
  if (!service) return {}

  return pageMetadata({
    title: service.name,
    description: service.metaDescription,
    path: `/services/${service.slug}`,
  })
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = getService(slug)
  if (!service) notFound()

  const Icon = serviceIcons[service.icon]
  const badge = tierLabel(service.tier)
  const related = service.related
    .map((r) => getService(r))
    .filter((s): s is NonNullable<typeof s> => Boolean(s))

  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: service.shortName, path: `/services/${service.slug}` },
  ]

  /**
   * Service schema is emitted ONLY for confirmed services. Emitting it for a
   * planned service would tell search engines we provide something we have not
   * confirmed we provide.
   */
  const nodes: Record<string, unknown>[] = [
    webPageSchema({
      name: `${service.name} in Rehoboth Beach, DE`,
      description: service.metaDescription,
      path: `/services/${service.slug}`,
    }),
  ]

  if (service.tier === 'confirmed') {
    nodes.push(
      serviceSchema({
        name: service.name,
        description: service.cardSummary,
        path: `/services/${service.slug}`,
      }),
    )
  }

  if (service.faqs?.length) nodes.push(faqSchema(service.faqs))

  return (
    <>
      <JsonLd nodes={nodes} />

      <PageHero
        eyebrow={service.name}
        title={service.headline}
        lede={service.intro[0]}
        crumbs={crumbs}
      >
        <div style={{ display: 'flex', gap: 'var(--sp-3)', alignItems: 'center', marginTop: 'var(--sp-5)', flexWrap: 'wrap' }}>
          <span
            aria-hidden="true"
            style={{
              display: 'grid',
              placeItems: 'center',
              width: 48,
              height: 48,
              borderRadius: 'var(--radius)',
              background: 'var(--white)',
              border: '1px solid var(--line)',
              color: 'var(--blue)',
            }}
          >
            <Icon size={24} />
          </span>
          {badge ? (
            <span className={`tier-badge${service.tier === 'network' ? ' tier-badge--network' : ''}`}>
              {badge}
            </span>
          ) : null}
        </div>
      </PageHero>

      <section className="section">
        <div className="container">
          <div className="split">
            <div>
              {/* Publication gate. Sits above everything else on categories
                  where scope or provider availability is genuinely uncertain. */}
              {service.publicationGate ? (
                <Callout className="mt-0">
                  <p style={{ fontSize: 'var(--fs-small)' }}>
                    <strong>Before you read on. </strong>
                    {service.publicationGate}
                  </p>
                </Callout>
              ) : null}

              <div className="article-body" style={{ marginTop: service.publicationGate ? 'var(--sp-7)' : 0 }}>
                {service.intro.slice(1).map((p) => (
                  <p key={p.slice(0, 40)}>{p}</p>
                ))}

                {service.reasons?.length ? (
                  <>
                    <h2>Why patients come in for this</h2>
                    <CheckList items={service.reasons} />
                  </>
                ) : null}

                <h2>What this category includes</h2>
                <p style={{ fontSize: 'var(--fs-small)', color: 'var(--mist)' }}>
                  {isPreOpening
                    ? 'Planned treatments. Each is subject to confirmation by clinical leadership before opening.'
                    : 'Treatments offered at the Rehoboth Beach office.'}
                </p>
                <ul className="grid grid-2" style={{ listStyle: 'none', padding: 0, gap: 'var(--sp-3)', marginTop: 'var(--sp-4)' }}>
                  {service.treatments.map((t) => (
                    <li
                      key={t}
                      style={{
                        padding: '0.7rem 1rem',
                        background: 'var(--bg-soft)',
                        borderRadius: 'var(--radius)',
                        fontSize: 'var(--fs-small)',
                        fontWeight: 500,
                        color: 'var(--navy)',
                      }}
                    >
                      {t}
                    </li>
                  ))}
                </ul>

                {service.whatToExpect?.length ? (
                  <>
                    <h2>What a visit involves</h2>
                    <ol className="steps" style={{ marginTop: 'var(--sp-5)' }}>
                      {service.whatToExpect.map((s) => (
                        <li key={s.slice(0, 40)}>
                          <p style={{ fontSize: 'var(--fs-small)' }}>{s}</p>
                        </li>
                      ))}
                    </ol>
                  </>
                ) : null}

                <h2>Why patients may choose {practiceName}</h2>
                <p>
                  We are a new practice, so we are not going to point at decades of local
                  reputation we have not earned yet. What we can tell you is how we intend to work:
                  findings explained in plain language, options presented with their trade-offs,
                  written costs before treatment is scheduled, and a pace you set.
                </p>
                <p>
                  When a case is better handled by a specialist, we will say so and coordinate the
                  referral rather than stretching past what this practice does well.
                </p>
              </div>

              {/* Provider review attribution. Deliberately absent, with the
                  reason stated, rather than attributed to a fictional provider. */}
              <div className="med-disclaimer">
                <strong>Clinical review status</strong>
                This page has not yet been reviewed by a named provider, because the provider team
                for {practiceName} has not been confirmed. Once providers are appointed, each
                clinical page will carry the reviewing provider&rsquo;s name, credentials, review
                date, and a link to their biography. We will not attribute content to a provider who
                has not read it.
              </div>

              <MedicalDisclaimer />
            </div>

            <aside className="split__aside">
              <div className="card card--soft">
                <h3>{isAcceptingAppointments ? 'Planned service' : 'Not open yet'}</h3>
                <p style={{ fontSize: 'var(--fs-small)', marginTop: 'var(--sp-2)' }}>
                  {isAcceptingAppointments
                    ? 'We are scheduling appointments for after we open. This category is still being confirmed by clinical leadership, so mention what you need when our team calls you back and they will tell you where it stands.'
                    : 'Appointments cannot be scheduled while the office is under construction. Join the opening list and you will hear when this service is confirmed and bookable.'}
                </p>
                <div style={{ marginTop: 'var(--sp-4)' }}>
                  <Button href={cta.primaryHref} full>
                    {cta.primaryLabel}
                  </Button>
                </div>
              </div>

              {related.length ? (
                <div className="card">
                  <h3>Related planned care</h3>
                  <ul
                    className="list-clean"
                    style={{ display: 'grid', gap: '0.7rem', marginTop: 'var(--sp-4)', fontSize: 'var(--fs-small)' }}
                  >
                    {related.map((r) => (
                      <li key={r.slug}>
                        <Link href={`/services/${r.slug}`} data-event="planned_service_click">
                          {r.name}
                        </Link>
                      </li>
                    ))}
                    <li>
                      <Link href="/services">All planned services</Link>
                    </li>
                  </ul>
                </div>
              ) : null}
            </aside>
          </div>
        </div>
      </section>

      {service.faqs?.length ? (
        <section className="section section--soft">
          <div className="container container--narrow">
            <SectionHead
              eyebrow="Common questions"
              title={`${service.shortName} Questions`}
              center
              ruled
            />
            <FaqList items={service.faqs} />
          </div>
        </section>
      ) : null}

      <CtaBand
        eyebrow="Stay informed"
        title="Hear When This Service Is Confirmed"
        lede="Opening list subscribers receive the confirmed service list, provider introductions, and early scheduling information first."
      />
    </>
  )
}
