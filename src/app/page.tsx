import type { Metadata } from 'next'
import Link from 'next/link'
import {
  CtaBand,
  FaqList,
  LocationDetails,
  QuickBar,
  ServiceGrid,
  StaticMap,
  Timeline,
} from '@/components/Blocks'
import { OpeningListForm } from '@/components/Forms'
import { Logo } from '@/components/Logo'
import { Button, JsonLd, PlaceholderNote, SectionHead, WaveRule } from '@/components/Ui'
import { openingFaqs } from '@/content/faqs'
import { sortedUpdates } from '@/content/construction'
import { faqSchema, webPageSchema } from '@/lib/schema'
import { pageMetadata } from '@/lib/seo'
import {
  address,
  affiliationLabel,
  anticipatedOpening,
  cta,
  directionsUrl,
  email,
  hoursLabel,
  mailtoUrl,
  openingQualifier,
  parentOrganization,
  parentOrganizationUrl,
  practiceName,
} from '@/config/practice'

const TITLE = 'New Dentist Coming to Rehoboth Beach, DE | Smile Studio of Rehoboth'
const DESCRIPTION =
  'A new dental practice under construction at 19411 Plantations Road, Rehoboth Beach, DE. Anticipated opening late November or early December 2026.'

export const metadata: Metadata = {
  ...pageMetadata({ title: TITLE, description: DESCRIPTION, path: '/' }),
  // The root layout template would append the brand a second time.
  title: { absolute: TITLE },
}

export default function HomePage() {
  const latest = sortedUpdates[0]

  return (
    <>
      <JsonLd
        nodes={[
          webPageSchema({ name: TITLE, description: DESCRIPTION, path: '/' }),
          faqSchema(openingFaqs),
        ]}
      />

      {/* ---------------------------------------------------------------- *
       * SECTION 3 — HERO
       * ---------------------------------------------------------------- */}
      <section className="hero">
        <div className="container">
          <div className="hero__grid">
            <div className="hero__content">
              <span className="eyebrow eyebrow--invert">
                {address.city}, {address.stateName}
              </span>
              <h1>Modern Dental Care Is Coming to Rehoboth Beach</h1>
              <p className="hero__lede">
                {practiceName} is currently under construction at {address.line1}. We anticipate
                welcoming patients in {anticipatedOpening} with comprehensive, patient-centered
                dentistry in a thoughtfully designed new office.
              </p>

              <div className="hero__actions">
                <Button href={cta.primaryHref} variant="invert" size="lg">
                  {cta.primaryLabel}
                </Button>
                <Button
                  href={mailtoUrl}
                  variant="ghost-invert"
                  size="lg"
                  event="email_click"
                >
                  Email Our Team
                </Button>
              </div>

              <Link href="/contact/directions" className="hero__tertiary" data-event="directions_click">
                View Our Location
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4.5 12h14M13 6.5l5.5 5.5L13 17.5" />
                </svg>
              </Link>

              <p className="hero__qualifier">{openingQualifier}</p>
            </div>

            {/* Hero visual.
                No approved rendering or construction photograph exists yet, so
                this is a branded visual treatment rather than an unrelated
                stock dental office implied to be this location.

                Uses the full vertical lockup rather than the icon-only mark.
                Brand Guide §2 restricts the icon mark to favicons, avatars,
                embroidery, and wayfinding, and says to "lead with the full
                lockup" until the mark is recognised locally on its own. The
                panel is portrait, which is exactly what the vertical lockup is
                for. Reversed variant, because it sits on Harbor Navy. */}
            <figure className="hero__visual" style={{ margin: 0 }}>
              <Logo
                variant="vertical-reversed"
                mobileVariant="horizontal-reversed"
                switchAt={900}
                width={340}
                className="hero__visualMark"
                priority
                decorative
              />
              <figcaption className="hero__visualCaption">
                {address.line1}, {address.city}, {address.state} {address.postalCode}
              </figcaption>
            </figure>
          </div>
        </div>
        <WaveRule className="hero__horizon" />
      </section>

      <div className="container" style={{ paddingTop: 'var(--sp-5)' }}>
        <PlaceholderNote label="Placeholder: hero visual">
          Replace with an approved architectural rendering or a construction-progress photograph of
          19411 Plantations Road. Required: desktop 16:9 or 3:2 at 2400px wide, mobile 4:5 at
          1200px wide, AVIF or WebP. Draft alt text: &ldquo;Construction progress at the future
          Smile Studio of Rehoboth office on Plantations Road.&rdquo; Do not substitute stock
          photography of an unrelated dental office.
        </PlaceholderNote>
      </div>

      {/* ---------------------------------------------------------------- *
       * SECTION 4 — QUICK INFORMATION BAR
       * ---------------------------------------------------------------- */}
      <QuickBar />

      {/* ---------------------------------------------------------------- *
       * SECTION 5 — INTRODUCTION
       * ---------------------------------------------------------------- */}
      <section className="section">
        <div className="container">
          <div className="split">
            <div>
              <span className="eyebrow">A new practice at the shore</span>
              <h2>A Thoughtfully Designed New Dental Experience</h2>
              <div className="stack" style={{ marginTop: 'var(--sp-5)' }}>
                <p className="lede">
                  Sussex County has grown, and the people who live here year-round deserve a dental
                  practice built around them rather than around the summer.
                </p>
                <p>
                  {practiceName} is being created to provide comfortable, comprehensive, modern
                  dental care for Rehoboth Beach and the surrounding coastal Delaware communities.
                  That means the everyday work of dentistry done well: cleanings and examinations
                  that run on time, findings explained in plain language, and treatment planned with
                  you rather than presented to you.
                </p>
                <p>
                  It also means an office designed for the visit, not just the procedure. We are
                  building the space, the schedule, and the team together, because a calm
                  appointment depends on all three.
                </p>
                <p>
                  If you are new to the area, if it has been a while since your last visit, or if
                  you have simply never found a practice that fit, this is being built with you in
                  mind.
                </p>
              </div>
            </div>

            <aside className="split__aside">
              <div className="card card--soft">
                <h3>What we can tell you today</h3>
                <ul className="list-clean" style={{ display: 'grid', gap: 'var(--sp-3)', marginTop: 'var(--sp-4)', fontSize: 'var(--fs-small)' }}>
                  <li>
                    <strong>Where:</strong> {address.line1}, in {address.complex}
                  </li>
                  <li>
                    <strong>When:</strong> anticipated {anticipatedOpening}
                  </li>
                  <li>
                    <strong>{hoursLabel}:</strong> Monday through Friday, 8:00 a.m. to 5:00 p.m.
                  </li>
                  <li>
                    <strong>Contact:</strong>{' '}
                    <a href={mailtoUrl} data-event="email_click">
                      {email}
                    </a>
                  </li>
                </ul>
                <p style={{ marginTop: 'var(--sp-4)', fontSize: 'var(--fs-caption)', color: 'var(--mist)' }}>
                  Providers, confirmed services, insurance participation, and a public phone number
                  will be published here as each is confirmed.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- *
       * SECTION 6 — PLANNED CARE CATEGORIES
       * ---------------------------------------------------------------- */}
      <section className="section section--soft">
        <div className="container">
          <SectionHead
            eyebrow="Planned care"
            title="The Care We Are Building For"
            lede="The new practice is being developed to provide comprehensive dental care. Final services and provider schedules will be announced before opening."
            center
            ruled
          />
          <ServiceGrid />
          <div className="btn-row" style={{ justifyContent: 'center', marginTop: 'var(--sp-8)' }}>
            <Button href="/services" variant="outline">
              Explore All Planned Services
            </Button>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- *
       * SECTION 7 — CONSTRUCTION PROGRESS
       * ---------------------------------------------------------------- */}
      <section className="section" id="progress">
        <div className="container">
          <div className="split">
            <div>
              <span className="eyebrow">Construction progress</span>
              <h2>Watch the Office Take Shape</h2>
              <p className="lede" style={{ marginTop: 'var(--sp-4)' }}>
                We will post real progress as it happens, and we will not post progress that has not
                happened. Only completed milestones are marked complete.
              </p>

              <div style={{ marginTop: 'var(--sp-7)' }}>
                <Timeline />
              </div>

              <PlaceholderNote label="Placeholder: construction photography">
                No approved construction photography exists yet. See
                docs/PHOTOGRAPHY-SHOT-LIST.md for the pre-opening shot list. Add images to
                src/content/construction.ts as they are captured and approved. Do not populate this
                section with stock imagery.
              </PlaceholderNote>
            </div>

            <aside className="split__aside">
              {latest ? (
                <article className="card">
                  <span className="eyebrow" style={{ marginBottom: 'var(--sp-2)' }}>
                    Latest update
                  </span>
                  <h3 style={{ marginBottom: 'var(--sp-2)' }}>{latest.title}</h3>
                  <p style={{ fontSize: 'var(--fs-small)', color: 'var(--charcoal)' }}>
                    {latest.summary}
                  </p>
                  <Link
                    href="/our-new-office/construction-updates"
                    className="link-arrow"
                    style={{ marginTop: 'var(--sp-4)' }}
                    data-event="construction_update_view"
                  >
                    Read all construction updates
                  </Link>
                </article>
              ) : null}
            </aside>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- *
       * SECTION 8 — THE PRACTICE DIFFERENCE
       * ---------------------------------------------------------------- */}
      <section className="section section--navy">
        <div className="container">
          <SectionHead
            eyebrow="Our approach"
            title="Dentistry That Looks Beyond the Tooth"
            lede="The mouth is connected to the rest of you. How you chew, how you sleep, how you breathe, and whether you are comfortable eating are all things a dental examination can notice."
            center
            ruled
            invert
          />

          <div className="grid grid-3" style={{ marginTop: 'var(--sp-8)' }}>
            {[
              {
                h: 'Comfort and function first',
                p: 'A tooth that looks right but does not bite right is not finished. We plan around how your teeth actually meet, because restorations that ignore the bite tend not to last.',
              },
              {
                h: 'Sleep, breathing, and the jaw',
                p: 'Worn teeth, a sore jaw in the morning, and a history of snoring are things we notice during an ordinary examination. Noticing them is not the same as diagnosing them, and we will tell you plainly which is which.',
              },
              {
                h: 'Working with your physician',
                p: 'Some findings belong with your doctor rather than your dentist. Where that is the case, we say so and coordinate rather than treating outside our lane.',
              },
            ].map((c) => (
              <div key={c.h}>
                <h3 style={{ marginBottom: 'var(--sp-3)' }}>{c.h}</h3>
                <p style={{ fontSize: 'var(--fs-small)' }}>{c.p}</p>
              </div>
            ))}
          </div>

          <p
            style={{
              marginTop: 'var(--sp-8)',
              marginInline: 'auto',
              textAlign: 'center',
              fontSize: 'var(--fs-caption)',
              color: 'var(--seaglass)',
              maxWidth: '76ch',
            }}
          >
            Oral health is associated with general health in a number of ways, and research in this
            area continues to develop. Association is not the same as cause, and dental treatment is
            not a treatment for unrelated medical conditions. We will describe what we can help with
            and what we cannot.
          </p>

          <div className="btn-row" style={{ justifyContent: 'center', marginTop: 'var(--sp-7)' }}>
            <Button href="/about/whole-person-care" variant="invert">
              How We Think About Whole-Person Care
            </Button>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- *
       * SECTION 9 — FREEDOM DENTAL HEALTH AFFILIATION
       * ---------------------------------------------------------------- */}
      <section className="section">
        <div className="container">
          <div className="split">
            <div>
              <span className="eyebrow">{affiliationLabel}</span>
              <h2>Independent Care, Supported by a Wider Network</h2>
              <div className="stack" style={{ marginTop: 'var(--sp-5)' }}>
                <p className="lede">
                  {practiceName} is part of {parentOrganization}, a Delaware-based network of dental
                  and healthcare professionals working together to provide comprehensive,
                  patient-centered care.
                </p>
                <p>
                  What that means in practice is straightforward. The relationship you build is with
                  the team in this office, and the decisions about your care are made here with your
                  provider. The network provides the infrastructure behind it: shared administrative
                  and operational support, access to a broader group of colleagues, and a route to
                  specialty collaboration when a case calls for it.
                </p>
                <p>
                  It also means we will be honest about geography. Not every service available
                  somewhere in the network will be available in Rehoboth Beach, and some specialty
                  care involves a drive. Where that is true we will tell you how far, so you can
                  decide what works for you.
                </p>
              </div>

              <div className="btn-row" style={{ marginTop: 'var(--sp-6)' }}>
                <Button href="/about/freedom-dental-health" variant="outline">
                  About the Affiliation
                </Button>
                <a
                  href={parentOrganizationUrl}
                  className="link-arrow"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-event="freedom_dental_health_click"
                >
                  Visit {parentOrganization}
                </a>
              </div>
            </div>

            <aside className="split__aside">
              <div className="card card--soft">
                <h3>How the affiliation may help you</h3>
                <ul
                  className="list-clean"
                  style={{ display: 'grid', gap: 'var(--sp-4)', marginTop: 'var(--sp-4)', fontSize: 'var(--fs-small)' }}
                >
                  <li>
                    <strong style={{ color: 'var(--navy)' }}>Coordinated care.</strong> Records and
                    referrals move between affiliated practices without you retelling your history.
                  </li>
                  <li>
                    <strong style={{ color: 'var(--navy)' }}>Specialty collaboration.</strong> A
                    route to periodontics, endodontics, oral surgery, and orthodontics when a case
                    needs it.
                  </li>
                  <li>
                    <strong style={{ color: 'var(--navy)' }}>Shared resources.</strong> Operational
                    support that lets the clinical team spend its attention on patients.
                  </li>
                  <li>
                    <strong style={{ color: 'var(--navy)' }}>Continuity.</strong> A practice with
                    the backing to still be here in ten years.
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- *
       * SECTION 10 — LOCATION
       * ---------------------------------------------------------------- */}
      <section className="section section--soft" id="location">
        <div className="container">
          <SectionHead
            eyebrow="Find us"
            title="Convenient to Route 1, and Away from the Traffic"
            lede="Plantations Professional Park sits just off the Coastal Highway and Route 1 corridor, with access from the Route 24 and Route 9 corridors."
          />

          <div className="split">
            <StaticMap />
            <aside className="split__aside">
              <LocationDetails />
            </aside>
          </div>

          <div className="card card--soft" style={{ marginTop: 'var(--sp-7)' }}>
            <h3>Convenient for coastal Sussex County</h3>
            <p style={{ marginTop: 'var(--sp-3)', fontSize: 'var(--fs-small)' }}>
              The Plantations Road location is a practical drive from Rehoboth Beach, Lewes, Dewey
              Beach, Henlopen Acres, Milton, Harbeson, Long Neck, and Millsboro, without routing you
              through the busiest stretch of downtown in season.
            </p>
            <p style={{ marginTop: 'var(--sp-3)', fontSize: 'var(--fs-caption)', color: 'var(--mist)' }}>
              Parking and accessible entry details will be published once construction is complete
              enough for us to describe them accurately.
            </p>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- *
       * SECTION 11 — OPENING FAQ
       * ---------------------------------------------------------------- */}
      <section className="section">
        <div className="container container--narrow">
          <SectionHead
            eyebrow="Opening questions"
            title="What People Are Asking"
            center
            ruled
          />
          <FaqList items={openingFaqs} />
          <div className="btn-row" style={{ justifyContent: 'center', marginTop: 'var(--sp-7)' }}>
            <Button href="/our-new-office/opening-faq" variant="outline">
              See All Opening Questions
            </Button>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- *
       * SECTION 12 — OPENING LIST
       * ---------------------------------------------------------------- */}
      <section className="section section--soft" id="opening-list">
        <div className="container">
          <div className="split">
            <div>
              <span className="eyebrow">Opening list</span>
              <h2>Be Among the First to Hear When Scheduling Opens</h2>
              <p className="lede" style={{ marginTop: 'var(--sp-4)' }}>
                Appointments are not open yet. When they are, the people on this list hear first.
              </p>
              <ul
                className="list-clean"
                style={{ display: 'grid', gap: 'var(--sp-3)', marginTop: 'var(--sp-6)', fontSize: 'var(--fs-small)' }}
              >
                {[
                  'The confirmed opening date, as soon as it is set',
                  'Provider introductions and credentials',
                  'Confirmed services and specialty schedules',
                  'Construction progress from the office itself',
                  'Early scheduling information before appointments open to the public',
                ].map((i) => (
                  <li key={i} style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 'var(--sp-3)' }}>
                    <span
                      aria-hidden="true"
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        background: 'var(--blue)',
                        marginTop: '0.55em',
                      }}
                    />
                    <span>{i}</span>
                  </li>
                ))}
              </ul>
              <p style={{ marginTop: 'var(--sp-5)', fontSize: 'var(--fs-caption)', color: 'var(--mist)' }}>
                A short form, and you can unsubscribe from any email we send.
              </p>
            </div>

            <div className="form-card">
              <OpeningListForm />
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- *
       * SECTION 13 — FINAL CTA
       * ---------------------------------------------------------------- */}
      <CtaBand />
    </>
  )
}
