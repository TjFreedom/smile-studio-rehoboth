import type { Metadata } from 'next'
import Link from 'next/link'
import { JsonLd, PageHero, SectionHead, PlaceholderNote, Button } from '@/components/Ui'
import { CtaBand, QuickBar } from '@/components/Blocks'
import { webPageSchema } from '@/lib/schema'
import { pageMetadata } from '@/lib/seo'
import {
  address,
  affiliationLabel,
  anticipatedOpening,
  parentOrganization,
  practiceName,
} from '@/config/practice'

const TITLE = 'About Our Practice'
const DESCRIPTION =
  'Smile Studio of Rehoboth is a new dental practice under construction in Rehoboth Beach, Delaware, built around comfortable, comprehensive, patient-centered care.'

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: '/about',
})

const pillars = [
  {
    h: 'A dental home at the beach',
    p: 'Somewhere you return to, where your history is known and you do not start over every visit. Continuity is the whole point of a general practice.',
    href: '/about/our-approach',
  },
  {
    h: 'Guidance and reassurance',
    p: 'You should always know what is happening and what comes next. No treatment starts without an explanation you followed and a cost you have seen.',
    href: '/about/our-approach',
  },
  {
    h: 'Comfort-first care',
    p: 'Unhurried appointments, no lectures about the gap since your last visit, and a pace you set rather than one we impose.',
    href: '/new-patients/what-to-expect',
  },
  {
    h: 'Whole-person thinking',
    p: 'The mouth connects to comfort, function, sleep, breathing, and nutrition. We look at the whole picture, and we are careful about what we claim.',
    href: '/about/whole-person-care',
  },
  {
    h: 'Modern dentistry, thoughtfully delivered',
    p: 'Current technology in service of comfort and fewer visits, described accurately once it is actually installed.',
    href: '/our-new-office/technology',
  },
  {
    h: 'Rooted in the community',
    p: 'Built for the people who live here year-round, and open to anyone who needs a dentist while they are at the beach.',
    href: '/about/community',
  },
]

export default function AboutPage() {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
  ]

  return (
    <>
      <JsonLd nodes={[webPageSchema({ name: TITLE, description: DESCRIPTION, path: '/about' })]} />

      <PageHero
        eyebrow={affiliationLabel}
        title="A New Dental Practice, Built for Coastal Delaware"
        lede={`${practiceName} is under construction at ${address.line1} in ${address.city}, with an anticipated opening in ${anticipatedOpening}.`}
        crumbs={crumbs}
      />

      <QuickBar />

      <section className="section">
        <div className="container">
          <div className="split">
            <div className="article-body">
              <p>
                Most dental practices introduce themselves with a history. We do not have one yet.
                What we have is a set of decisions, made deliberately, before the habits set in.
              </p>
              <p>
                {practiceName} is being built for a specific place. Sussex County has grown, and it
                has grown in two directions at once: a substantial year-round population, including
                many people who moved here on purpose to retire near the water, and a seasonal
                population that swells every summer. A practice here has to work for both, and it
                has to work for the residents first.
              </p>
              <p>
                That shapes practical things. It is why the office is on Plantations Road, just off
                the Route 1 corridor rather than in the middle of the downtown grid, so that a
                cleaning in July does not require a traffic strategy. It is why the planned hours
                are Monday through Friday rather than built around visitor weekends. And it is why
                the priority is comprehensive general dentistry rather than a narrow cosmetic focus.
              </p>

              <h2>What we are trying to build</h2>
              <p>
                The word &ldquo;studio&rdquo; sets an expectation, and we intend to meet it. A calm,
                well-designed space. Appointments that run on time because the schedule was built
                with room in it. Explanations in plain language, with the reasoning included. Costs
                in writing before treatment is scheduled, not after.
              </p>
              <p>
                None of that is remarkable. It is simply what good dentistry looks like when the
                practice is organized around the visit rather than around throughput, and it is
                easier to build in from the start than to retrofit later.
              </p>

              <h2>What we will not do</h2>
              <p>
                We will not tell you dentistry here is pain-free, because nobody can promise how
                another person will feel. We will not describe technology we have not installed, or
                list a service clinical leadership has not confirmed, or claim to accept an
                insurance plan we have not verified.
              </p>
              <p>
                Right now that means large parts of this website say &ldquo;planned&rdquo; and
                &ldquo;to be confirmed.&rdquo; That is not an oversight. A practice that overstates
                things before it opens will overstate things after it opens too.
              </p>
            </div>

            <aside className="split__aside">
              <div className="card card--soft">
                <h3>Explore</h3>
                <ul className="list-clean" style={{ display: 'grid', gap: '0.7rem', marginTop: 'var(--sp-4)', fontSize: 'var(--fs-small)' }}>
                  <li><Link href="/about/our-approach">Our Approach</Link></li>
                  <li><Link href="/about/whole-person-care">Whole-Person Care</Link></li>
                  <li><Link href="/about/freedom-dental-health">The {parentOrganization} Connection</Link></li>
                  <li><Link href="/about/community">Community Involvement</Link></li>
                  <li><Link href="/our-new-office">Our New Office</Link></li>
                </ul>
              </div>

              <PlaceholderNote label="Required before opening: providers">
                Provider roster, credentials, biographies, and headshots are not confirmed. The
                Meet the Team section is hidden until approved provider content and photography
                exist. See docs/PROVIDER-BIO-TEMPLATE.md.
              </PlaceholderNote>
            </aside>
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <SectionHead
            eyebrow="What we stand for"
            title="Six Commitments We Are Building Around"
            center
            ruled
          />
          <div className="grid grid-3">
            {pillars.map((p) => (
              <article key={p.h} className="card card--link">
                <h3>{p.h}</h3>
                <p style={{ marginTop: 'var(--sp-3)', fontSize: 'var(--fs-small)' }}>{p.p}</p>
                <Link href={p.href} className="link-arrow" style={{ marginTop: 'var(--sp-4)' }}>
                  Read more
                  <span className="sr-only"> about {p.h}</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container container--narrow text-center">
          <SectionHead
            eyebrow="Meet the team"
            title="Provider Introductions Are Coming"
            center
            lede={`We will introduce every dentist and clinical team member with their credentials and background before we open. We are not going to publish placeholder biographies or stock headshots in the meantime.`}
          />
          <div className="btn-row" style={{ justifyContent: 'center' }}>
            <Button href="/opening-list">Hear Provider Announcements First</Button>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
