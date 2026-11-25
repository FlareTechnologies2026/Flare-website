import type { Metadata } from 'next'
import { BY_SLUG } from '@/lib/content'
import { getCases } from '@/lib/caseStore'
import HeroInner from '@/components/HeroInner'
import WorkGrid from '@/components/WorkGrid'
import CasesCompact from '@/components/CasesCompact'
import FaqSection from '@/components/FaqSection'
import RelatedSection from '@/components/RelatedSection'
import CtaBand from '@/components/CtaBand'

const page = BY_SLUG['custom-development/work']

export const metadata: Metadata = {
  title: page.title,
  description: page.desc,
  openGraph: { title: page.title, description: page.desc, images: ['/assets/og-image.png'] },
}

// Always read fresh data from the JSON store
export const dynamic = 'force-dynamic'

export default async function WorkPage() {
  const cases = await getCases()

  return (
    <>
      <HeroInner page={page} />
      <section className="section alt">
        <div className="wrap wide">
          <WorkGrid />
        </div>
      </section>

      {/* Case studies as compact cards */}
      {cases.length > 0 && (
        <section className="section">
          <div className="wrap wide">
            <h2 className="reveal">Case studies</h2>
            <CasesCompact items={cases} />
          </div>
        </section>
      )}

      {page.faqs && <FaqSection faqs={page.faqs} />}
      {page.related && <RelatedSection related={page.related} />}
      <CtaBand />
    </>
  )
}
