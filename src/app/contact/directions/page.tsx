import type { Metadata } from 'next'
import { JsonLd, PageHero, SectionHead, Button, PlaceholderNote } from '@/components/Ui'
import { LocationDetails, StaticMap, CtaBand } from '@/components/Blocks'
import { webPageSchema } from '@/lib/schema'
import { pageMetadata } from '@/lib/seo'
import {
  address,
  directionsUrl,
  isAcceptingAppointments,
  practiceName,
  serviceArea,
} from '@/config/practice'

const TITLE = 'Directions and Parking'
const DESCRIPTION =
  'Directions to Smile Studio of Rehoboth at 19411 Plantations Road, Rehoboth Beach, DE 19971, in Plantations Professional Park, with access from Route 1 and Route 24.'

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: '/contact/directions',
})

/**
 * Route guidance is written from public road geography only. Nothing here
 * claims a turn, a landmark, or a signage detail that has not been verified,
 * and travel times are deliberately absent because they vary enormously
 * between season and off-season on Route 1.
 */
const routes = [
  {
    from: 'From Rehoboth Beach and Dewey Beach',
    body: 'Head inland from the beach toward the Route 1 corridor, then follow Plantations Road. The professional park is on Plantations Road, which lets you avoid the downtown grid in season.',
  },
  {
    from: 'From Lewes and Henlopen Acres',
    body: 'Take Route 1 south toward Rehoboth Beach, then follow signs for Plantations Road. The office sits just off the corridor rather than on it.',
  },
  {
    from: 'From Milton and Harbeson',
    body: 'Route 5 and Route 9 connect to the Route 1 corridor north of Rehoboth Beach. From there, continue to Plantations Road.',
  },
  {
    from: 'From Long Neck and Millsboro',
    body: 'Route 24 runs east toward the coast and meets the Route 1 corridor near Rehoboth Beach. Plantations Road is accessible from that junction.',
  },
]

export default function DirectionsPage() {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Contact', path: '/contact' },
    { name: 'Directions', path: '/contact/directions' },
  ]

  return (
    <>
      <JsonLd
        nodes={[webPageSchema({ name: TITLE, description: DESCRIPTION, path: '/contact/directions' })]}
      />

      <PageHero
        eyebrow="Find us"
        title="Directions to Our New Rehoboth Beach Office"
        lede={`${practiceName} is being built at ${address.line1} in ${address.complex}, just off the Coastal Highway and Route 1 corridor.`}
        crumbs={crumbs}
      >
        <div className="btn-row" style={{ marginTop: 'var(--sp-6)' }}>
          <Button href={directionsUrl} event="directions_click" external>
            Open in Google Maps
          </Button>
          <Button href="/opening-list" variant="outline">
            Join the Opening List
          </Button>
        </div>
      </PageHero>

      <section className="section">
        <div className="container">
          <div className="split">
            <StaticMap />
            <aside className="split__aside">
              <LocationDetails />
            </aside>
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <SectionHead
            eyebrow="Getting here"
            title="Routes from Around Coastal Sussex County"
            lede="Plantations Road is reachable from the main corridors without routing through downtown Rehoboth Beach, which matters most between Memorial Day and Labor Day."
          />

          <div className="grid grid-2">
            {routes.map((r) => (
              <div key={r.from} className="card">
                <h3>{r.from}</h3>
                <p style={{ marginTop: 'var(--sp-3)', fontSize: 'var(--fs-small)' }}>{r.body}</p>
              </div>
            ))}
          </div>

          <p
            style={{
              marginTop: 'var(--sp-6)',
              fontSize: 'var(--fs-caption)',
              color: 'var(--mist)',
              maxWidth: '76ch',
            }}
          >
            These are general route descriptions. Please use a navigation app for turn-by-turn
            directions, and allow extra time during the summer season. We will publish detailed
            arrival instructions, including the building entrance and suite, once construction and
            signage are complete.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="split">
            <div>
              <SectionHead
                eyebrow="Parking and access"
                title="What We Can and Cannot Tell You Yet"
                as="h2"
              />
              <div className="stack">
                <p>
                  The office is under construction, and we are not going to describe a parking lot,
                  an entrance, or an accessible route before we can describe it accurately. Getting
                  this wrong is worse than saying nothing: a patient who needs step-free access and
                  arrives to find something different has been let down by our website.
                </p>
                <p>
                  What we will publish before opening, in plain language: where to park, how far the
                  walk is from the parking area to the door, whether the entrance is step-free,
                  where accessible parking is located, how to reach the suite from the building
                  entrance, and what to do if you need assistance on arrival.
                </p>
                <p>
                  If you have a specific access requirement and would like to know whether we can
                  meet it, please write to us. We would rather answer an individual question
                  honestly now than publish a general claim we have not verified.
                </p>
              </div>

              <PlaceholderNote label="Required before opening: parking and accessibility">
                Confirm and publish: total parking spaces, accessible space count and location,
                distance from parking to entrance, step-free entry, door type and width, elevator
                availability if the suite is not on the ground floor, accessible restroom, and
                operatory access for wheelchair users. Source: construction manager and a physical
                site walk. Owner: Director of Marketing and Communications.
              </PlaceholderNote>
            </div>

            <aside className="split__aside">
              <div className="card card--soft">
                <h3>Communities we expect to serve</h3>
                <ul
                  className="list-clean"
                  style={{ display: 'grid', gap: '0.55rem', marginTop: 'var(--sp-4)', fontSize: 'var(--fs-small)' }}
                >
                  {serviceArea.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
                <p style={{ marginTop: 'var(--sp-4)', fontSize: 'var(--fs-caption)', color: 'var(--mist)' }}>
                  Plus the surrounding coastal Sussex County communities.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Before you visit"
        title={
          isAcceptingAppointments
            ? 'We Are Not Open Yet, But We Are Booking Appointments'
            : 'We Are Not Open Yet, But You Can Be First in Line'
        }
        lede={
          isAcceptingAppointments
            ? 'Request an appointment for after we open, and our team will call you back to confirm the time and tell you exactly where to park and which door to use.'
            : 'Join the opening list for the confirmed opening date, arrival details, and early scheduling information.'
        }
      />
    </>
  )
}
