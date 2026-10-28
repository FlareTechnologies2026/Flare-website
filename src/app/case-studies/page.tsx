import type { Metadata } from 'next'
import { BY_SLUG } from '@/lib/content'
import { getCases } from '@/lib/caseStore'
import HeroInner from '@/components/HeroInner'
import CasesSection from '@/components/CasesSection'
import FaqSection from '@/components/FaqSection'
import RelatedSection from '@/components/RelatedSection'
import CtaBand from '@/components/CtaBand'

const page = BY_SLUG['case-studies']

export const metadata: Metadata = {
  title: page.title,
  description: page.desc,
  openGraph: { title: page.title, description: page.desc, images: ['/assets/og-image.png'] },
}

// Always read fresh data from the JSON store
export const dynamic = 'force-dynamic'

export default async function CaseStudiesPage() {
  const cases = await getCases()

  return (
    <>
      <HeroInner page={page} />
      <section className="section alt">
        <div className="wrap wide">
          <CasesSection items={cases} />
        </div>
      </section>
      {page.faqs && <FaqSection faqs={page.faqs} />}
      {page.related && <RelatedSection related={page.related} />}
      <CtaBand />
    </>
  )
}
