import type { Metadata } from 'next'
import { JsonLd, PageHero, SectionHead } from '@/components/Ui'
import { CtaBand, FaqList, MedicalDisclaimer } from '@/components/Blocks'
import { faqSchema, webPageSchema } from '@/lib/schema'
import { pageMetadata } from '@/lib/seo'
import { newPatientFaqs, openingFaqs, affiliationFaqs } from '@/content/faqs'

const TITLE = 'New Patient FAQ'
const DESCRIPTION =
  'Common questions about becoming a patient at our new Rehoboth Beach, DE dental practice: scheduling, first visits, costs, and the opening date.'
const PATH = '/new-patients/faq'

export const metadata: Metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH })

export default function Page() {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'New Patients', path: '/new-patients' },
    { name: 'Frequently Asked Questions', path: PATH },
  ]

  return (
    <>
      <JsonLd
        nodes={[
          webPageSchema({ name: TITLE, description: DESCRIPTION, path: PATH }),
          // Only questions rendered visibly on this page are included.
          faqSchema([...newPatientFaqs, ...openingFaqs, ...affiliationFaqs]),
        ]}
      />

      <PageHero
        eyebrow="Questions"
        title="Frequently Asked Questions"
        lede="The questions we hear most often from people planning to become patients. If yours is not here, please write to us."
        crumbs={crumbs}
      />

      <section className="section">
        <div className="container container--narrow">
          <SectionHead eyebrow="Becoming a patient" title="New Patient Questions" as="h2" />
          <FaqList items={newPatientFaqs} />
        </div>
      </section>

      <section className="section section--soft">
        <div className="container container--narrow">
          <SectionHead eyebrow="The opening" title="Questions About Opening" as="h2" />
          <FaqList items={openingFaqs} />
        </div>
      </section>

      <section className="section">
        <div className="container container--narrow">
          <SectionHead eyebrow="The network" title="Questions About the Affiliation" as="h2" />
          <FaqList items={affiliationFaqs} />
          <MedicalDisclaimer />
        </div>
      </section>

      <CtaBand />
    </>
  )
}
