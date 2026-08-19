import type { Metadata } from 'next'
import { JsonLd, PageHero, SectionHead, Callout, Button, PlaceholderNote } from '@/components/Ui'
import { CtaBand, LocationDetails } from '@/components/Blocks'
import { webPageSchema } from '@/lib/schema'
import { pageMetadata } from '@/lib/seo'
import { hoursLabel, plannedHours, practiceName, anticipatedOpening } from '@/config/practice'

const TITLE = 'Planned Office Hours'
const DESCRIPTION =
  'Planned office hours for Smile Studio of Rehoboth: Monday through Friday, 8:00 a.m. to 5:00 p.m. Hours will be confirmed before the Rehoboth Beach, DE office opens.'
const PATH = '/our-new-office/planned-hours'

export const metadata: Metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH })

export default function Page() {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Our New Office', path: '/our-new-office' },
    { name: 'Planned Office Hours', path: PATH },
  ]

  return (
    <>
      <JsonLd nodes={[webPageSchema({ name: TITLE, description: DESCRIPTION, path: PATH })]} />

      <PageHero
        eyebrow="Our new office"
        title="Planned Office Hours"
        lede={`${practiceName} is not open yet. These are the hours we are planning for, and they will be confirmed before we begin seeing patients in ${anticipatedOpening}.`}
        crumbs={crumbs}
      />

      <section className="section">
        <div className="container">
          <div className="split">
            <div>
              <Callout>
                <p style={{ fontSize: 'var(--fs-small)' }}>
                  <strong>These are planned hours, not current hours.</strong> The office is under
                  construction and is not open to patients. We have deliberately kept these out of
                  our search listing data, because publishing planned hours as though they were
                  operating hours would send people to a building site.
                </p>
              </Callout>

              <SectionHead
                eyebrow={hoursLabel}
                title="Monday Through Friday"
                as="h2"
              />

              <div className="table-wrap">
                <table>
                  <caption className="sr-only">
                    Planned office hours by day of the week. Saturday and Sunday hours have not been
                    determined.
                  </caption>
                  <thead>
                    <tr>
                      <th scope="col">Day</th>
                      <th scope="col">Planned hours</th>
                    </tr>
                  </thead>
                  <tbody>
                    {plannedHours.map((d) => (
                      <tr key={d.day}>
                        <th scope="row">{d.day}</th>
                        <td>{d.display}</td>
                      </tr>
                    ))}
                    <tr>
                      <th scope="row">Saturday</th>
                      <td style={{ color: 'var(--mist)' }}>Not yet determined</td>
                    </tr>
                    <tr>
                      <th scope="row">Sunday</th>
                      <td style={{ color: 'var(--mist)' }}>Not yet determined</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="article-body" style={{ marginTop: 'var(--sp-8)' }}>
                <h2>Why weekdays</h2>
                <p>
                  A practice built primarily for year-round residents works best on a weekday
                  schedule. It is also the schedule that supports a stable clinical team, and team
                  stability is what lets you see the same faces at each visit.
                </p>

                <h2>Why we have not invented weekend hours</h2>
                <p>
                  Saturday hours would be genuinely useful to a lot of people, particularly anyone
                  working in hospitality or service roles where weekdays are the busiest days. We
                  understand that, and it is a real consideration for a practice in this market.
                </p>
                <p>
                  Whether we can offer them depends on staffing, and staffing decisions have not
                  been made. Publishing a Saturday on this page before we know we can staff it
                  would be a promise we might have to withdraw, and withdrawing it would cost more
                  trust than never offering it.
                </p>

                <h2>Extended and seasonal hours</h2>
                <p>
                  A resort market has an unusual rhythm, and it is reasonable to expect that demand
                  in July looks different from demand in February. How the schedule responds to
                  that, if at all, will be decided once the practice has been open long enough to
                  see the pattern rather than guess at it.
                </p>

                <h2>When hours become official</h2>
                <p>
                  Once the practice opens, this page will be relabelled Office Hours, the verified
                  hours will be added to our search listing data, and any variation such as a lunch
                  closure will be stated plainly rather than left for you to discover.
                </p>
              </div>

              <PlaceholderNote label="Required before opening: confirm hours">
                Confirm final operating hours including any lunch closure, Saturday availability,
                emergency and after-hours policy, and holiday closures. Then: change
                `openingStatus` to &apos;open&apos; in src/config/practice.ts, which relabels this
                page and adds openingHoursSpecification to the Dentist schema automatically. Update
                Google Business Profile the same day. Owner: Practice Operations.
              </PlaceholderNote>
            </div>

            <aside className="split__aside">
              <LocationDetails />
              <div className="card card--soft">
                <h3>Hear the confirmed hours</h3>
                <p style={{ fontSize: 'var(--fs-small)', marginTop: 'var(--sp-2)' }}>
                  Final hours go out to the opening list along with the confirmed opening date.
                </p>
                <div style={{ marginTop: 'var(--sp-4)' }}>
                  <Button href="/opening-list" full>
                    Join the Opening List
                  </Button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
