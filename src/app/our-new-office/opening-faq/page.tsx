import type { Metadata } from 'next'
import { JsonLd, PageHero, SectionHead, Callout } from '@/components/Ui'
import { CtaBand, FaqList } from '@/components/Blocks'
import { faqSchema, webPageSchema } from '@/lib/schema'
import { pageMetadata } from '@/lib/seo'
import { openingFaqs, affiliationFaqs } from '@/content/faqs'
import { openingQualifier } from '@/config/practice'

const TITLE = 'Opening Frequently Asked Questions'
const DESCRIPTION =
  'When will Smile Studio of Rehoboth open, where is it, what will the hours be, and can you book yet? Answers about the new Rehoboth Beach, DE dental office.'
const PATH = '/our-new-office/opening-faq'

export const metadata: Metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH })

export default function Page() {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Our New Office', path: '/our-new-office' },
    { name: 'Opening FAQ', path: PATH },
  ]

  return (
    <>
      <JsonLd
        nodes={[
          webPageSchema({ name: TITLE, description: DESCRIPTION, path: PATH }),
          faqSchema([...openingFaqs, ...affiliationFaqs]),
        ]}
      />

      <PageHero
        eyebrow="The opening"
        title="Opening Questions, Answered"
        lede="Everything we are being asked about the new office, with straight answers and no invented dates."
        crumbs={crumbs}
      />

      <section className="section">
        <div className="container container--narrow">
          <Callout>
            <p style={{ fontSize: 'var(--fs-small)' }}>{openingQualifier}</p>
          </Callout>

          <div style={{ marginTop: 'var(--sp-8)' }}>
            <SectionHead eyebrow="The opening" title="About Opening Day" as="h2" />
            <FaqList items={openingFaqs} />
          </div>

          <div style={{ marginTop: 'var(--sp-9)' }}>
            <SectionHead eyebrow="The network" title="About the Affiliation" as="h2" />
            <FaqList items={affiliationFaqs} />
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
