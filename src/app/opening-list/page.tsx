import type { Metadata } from 'next'
import { OpeningListForm } from '@/components/Forms'
import { JsonLd, PageHero, SectionHead } from '@/components/Ui'
import { FaqList } from '@/components/Blocks'
import { webPageSchema } from '@/lib/schema'
import { pageMetadata } from '@/lib/seo'
import {
  anticipatedOpening,
  email,
  mailtoUrl,
  openingQualifier,
  practiceName,
} from '@/config/practice'
import type { Faq } from '@/content/faqs'

const TITLE = 'Join the Opening List'
const DESCRIPTION =
  'Join the Smile Studio of Rehoboth opening list for the confirmed opening date, provider introductions, and early scheduling information in Rehoboth Beach, DE.'

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: '/opening-list',
})

const listFaqs: Faq[] = [
  {
    question: 'Does joining the list book an appointment?',
    answer:
      'No. Scheduling is not open yet, and nothing on this website books an appointment. The list is how we tell you the moment scheduling does open, before appointments are offered to the public.',
  },
  {
    question: 'How often will you email me?',
    answer:
      'Rarely, and only when there is something real to report: a confirmed opening date, a provider introduction, a service announcement, or meaningful construction progress. Every email includes an unsubscribe link.',
  },
  {
    question: 'Do I have to give a phone number?',
    answer:
      'No. The phone field is optional and is only used if you separately opt in to text updates. Email alone is entirely sufficient.',
  },
  {
    question: 'Will you share my information?',
    answer:
      'No. We use your details to send the updates you asked for and to contact you about the practice opening. We do not sell your information. Our Privacy Policy sets out the details.',
  },
  {
    question: 'What if I change my mind?',
    answer:
      'Unsubscribe from any email, or reply STOP to any text message. You can also email us and we will remove you.',
  },
]

export default function OpeningListPage() {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Join the Opening List', path: '/opening-list' },
  ]

  return (
    <>
      <JsonLd nodes={[webPageSchema({ name: TITLE, description: DESCRIPTION, path: '/opening-list' })]} />

      <PageHero
        eyebrow="Opening list"
        title="Be Among the First to Hear When Scheduling Opens"
        lede={`${practiceName} is under construction, with an anticipated opening in ${anticipatedOpening}. Join the list and you will hear the confirmed date before it is public.`}
        crumbs={crumbs}
      />

      <section className="section">
        <div className="container">
          <div className="split">
            <div>
              <SectionHead
                eyebrow="What you will receive"
                title="Real Updates, Not Marketing Filler"
                as="h2"
              />
              <ul
                className="list-clean"
                style={{ display: 'grid', gap: 'var(--sp-5)', fontSize: 'var(--fs-small)' }}
              >
                {[
                  {
                    h: 'The confirmed opening date',
                    p: 'As soon as construction gives us a date we can stand behind, it goes to this list first.',
                  },
                  {
                    h: 'Provider introductions',
                    p: 'Who the dentists and clinical team are, their credentials, and where they trained.',
                  },
                  {
                    h: 'Confirmed services',
                    p: 'The final service list once clinical leadership has signed off, including which specialty care will be available on site.',
                  },
                  {
                    h: 'Construction progress',
                    p: 'Photographs from the office as the build-out moves along.',
                  },
                  {
                    h: 'Early scheduling information',
                    p: 'How to book, and a window to do it before appointments open to the public.',
                  },
                ].map((i) => (
                  <li key={i.h}>
                    <strong style={{ color: 'var(--navy)', display: 'block', marginBottom: '0.25rem' }}>
                      {i.h}
                    </strong>
                    {i.p}
                  </li>
                ))}
              </ul>

              <div className="callout" style={{ marginTop: 'var(--sp-7)' }}>
                <p style={{ fontSize: 'var(--fs-small)' }}>{openingQualifier}</p>
              </div>

              <p style={{ marginTop: 'var(--sp-6)', fontSize: 'var(--fs-small)' }}>
                Prefer to write to a person? Email{' '}
                <a href={mailtoUrl} data-event="email_click">
                  {email}
                </a>
                .
              </p>
            </div>

            <div className="form-card">
              <h2 style={{ fontSize: 'var(--fs-h3)', fontFamily: 'var(--font-sans)' }}>
                Join the list
              </h2>
              <p style={{ fontSize: 'var(--fs-caption)', color: 'var(--mist)', marginTop: 'var(--sp-2)', marginBottom: 'var(--sp-5)' }}>
                Fields marked with an asterisk are required.
              </p>
              <OpeningListForm />
            </div>
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container container--narrow">
          <SectionHead eyebrow="Before you sign up" title="Questions About the List" center ruled />
          <FaqList items={listFaqs} />
        </div>
      </section>
    </>
  )
}
