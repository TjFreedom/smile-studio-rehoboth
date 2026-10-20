import type { Metadata } from 'next'
import { JsonLd, PageHero, SectionHead, Callout } from '@/components/Ui'
import { CtaBand, MedicalDisclaimer, ServiceGrid } from '@/components/Blocks'
import { webPageSchema } from '@/lib/schema'
import { pageMetadata } from '@/lib/seo'
import { networkSpecialties, services } from '@/content/services'
import { parentOrganization, practiceName } from '@/config/practice'

const TITLE = 'Planned Dental Services'
const DESCRIPTION =
  'Planned services at our new Rehoboth Beach, DE practice: preventive, restorative, cosmetic, implants, emergency, TMJ, and sleep and airway care.'

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: '/services',
})

export default function ServicesPage() {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
  ]

  return (
    <>
      <JsonLd nodes={[webPageSchema({ name: TITLE, description: DESCRIPTION, path: '/services' })]} />

      <PageHero
        eyebrow="Planned services"
        title="The Care We Are Building For"
        lede={`${practiceName} is being developed to provide comprehensive dental care for Rehoboth Beach and the surrounding coastal Delaware communities.`}
        crumbs={crumbs}
      />

      <section className="section">
        <div className="container">
          {/* The single most important disclosure on this page, placed above
              the service grid rather than buried beneath it. */}
          <Callout>
            <p>
              <strong>Everything on this page is planned, not confirmed.</strong>
            </p>
            <p style={{ fontSize: 'var(--fs-small)' }}>
              The office is under construction. Final services, the providers who will deliver them,
              and any visiting specialty schedules are all subject to confirmation by clinical
              leadership before opening. We will not describe a service as available until it
              genuinely is, and we will not advertise a service performed elsewhere in the network
              as though it happens here.
            </p>
          </Callout>

          <div style={{ marginTop: 'var(--sp-8)' }}>
            <ServiceGrid />
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <SectionHead
            eyebrow="How to read this"
            title="Three Categories, Labeled Honestly"
            lede="Dental group websites often blur the line between what a location does and what the wider organization does. We would rather be explicit about it."
          />

          <div className="grid grid-3">
            {[
              {
                h: 'Confirmed at Rehoboth',
                p: 'Performed at the Plantations Road office by our own team. Once the practice opens, these are the services you can book directly. Nothing carries this label yet.',
              },
              {
                h: 'Planned',
                p: 'Expected, and being planned for, but not yet confirmed by clinical leadership. Every service currently listed on this website is in this category.',
              },
              {
                h: `Available through ${parentOrganization}`,
                p: 'Provided at another affiliated location rather than in Rehoboth Beach. We coordinate the referral and tell you honestly how far the travel is.',
              },
            ].map((c) => (
              <div key={c.h} className="card">
                <h3>{c.h}</h3>
                <p style={{ marginTop: 'var(--sp-3)', fontSize: 'var(--fs-small)' }}>{c.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="Specialty care"
            title={`Specialty Services Through ${parentOrganization}`}
            lede="Some care is better handled by a specialist. Where that is the case, we coordinate the referral rather than stretching beyond what this practice does well."
          />

          <div className="grid grid-3">
            {networkSpecialties.map((s) => (
              <div key={s.name} className="card">
                <span className="tier-badge tier-badge--network">Network service</span>
                <h3 style={{ marginTop: 'var(--sp-3)' }}>{s.name}</h3>
                <p style={{ marginTop: 'var(--sp-2)', fontSize: 'var(--fs-small)' }}>
                  {s.description}
                </p>
                <p style={{ marginTop: 'var(--sp-3)', fontSize: 'var(--fs-caption)', color: 'var(--mist)' }}>
                  {s.note}
                </p>
              </div>
            ))}
          </div>

          <div className="callout callout--info" style={{ marginTop: 'var(--sp-7)' }}>
            <p style={{ fontSize: 'var(--fs-small)' }}>
              <strong>These services are not performed at the Rehoboth Beach office.</strong> Which
              specialty care will be available on site, and whether any visiting specialists will
              hold sessions here, has not been determined. Some affiliated locations are a
              substantial drive from the shore, and we will tell you how far before you commit to a
              referral.
            </p>
          </div>

          <MedicalDisclaimer />
        </div>
      </section>

      <CtaBand
        eyebrow="Service announcements"
        title="Hear the Confirmed Service List First"
        lede={`We will publish the final list of services, providers, and specialty schedules before opening. Opening list subscribers receive it first. ${services.length} planned categories are in development.`}
      />
    </>
  )
}
