import type { Metadata } from 'next'
import { JsonLd, PageHero, SectionHead, Callout } from '@/components/Ui'
import { CtaBand, MedicalDisclaimer, ServiceGrid } from '@/components/Blocks'
import { webPageSchema } from '@/lib/schema'
import { pageMetadata } from '@/lib/seo'
import { networkSpecialties, services } from '@/content/services'
import { parentOrganization, practiceName } from '@/config/practice'

const TITLE = 'Dental Services'
const DESCRIPTION =
  'Dental services at Smile Studio of Rehoboth in Rehoboth Beach, DE: preventive, restorative, cosmetic, implants, emergency, TMJ, and sleep and airway care.'

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
        eyebrow="Our services"
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
              <strong>Dr. Cottone provides every service on this page.</strong>
            </p>
            <p style={{ fontSize: 'var(--fs-small)' }}>
              The office is still under construction, so these begin when we open rather than
              today, and we are scheduling now for appointments from that point onward. What we
              will not do is advertise a service performed elsewhere in the network as though it
              happens here: the specialty list further down is clearly separated for that reason.
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
                p: 'Performed at the Plantations Road office by Dr. Cottone. These are the services you can book directly, and every category above carries this label.',
              },
              {
                h: 'Next door',
                p: `Provided at Plantations Professional Park but by a different practice. Periodontal Associates of Delaware is opening in Suite 4, in our building, so periodontal care is a walk rather than a drive.`,
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
            lede="Some care is better handled by a specialist. Where that is the case, we coordinate it rather than stretching beyond what this practice does well. For periodontics that is a very short walk: Periodontal Associates of Delaware is opening next door."
          />

          <div className="grid grid-3">
            {networkSpecialties.map((s) => (
              <div key={s.name} className="card">
                <span className="tier-badge tier-badge--network">
                  {s.neighboring ? 'Next door' : 'Network service'}
                </span>
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
              <strong>Periodontics is the exception, and it is next door.</strong> Periodontal
              Associates of Delaware is opening in Suite 4 at Plantations Professional Park, in the
              same building as us. If you need periodontal care, that is a walk down the covered
              walkway rather than a drive.
            </p>
            <p style={{ fontSize: 'var(--fs-small)', marginTop: 'var(--sp-3)' }}>
              The remaining specialties are not performed at the Rehoboth Beach office. Whether any
              visiting specialists will hold sessions here has not been determined. Some affiliated
              locations are a substantial drive from the beach, and we will tell you how far before
              you commit to a referral.
            </p>
          </div>

          <MedicalDisclaimer />
        </div>
      </section>

      <CtaBand
        eyebrow="Service announcements"
        title="Hear the Confirmed Service List First"
        lede={`Dr. Cottone provides all ${services.length} of the categories above. Specialty schedules and any visiting specialists will be confirmed before opening, and opening list subscribers hear first.`}
      />
    </>
  )
}
