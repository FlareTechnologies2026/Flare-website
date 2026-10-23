import React from 'react'
import type { PageData } from '@/lib/types'
import HeroInner from './HeroInner'
import Sections from './Sections'
import FaqSection from './FaqSection'
import RelatedSection from './RelatedSection'
import CtaBand from './CtaBand'

interface Props {
  page: PageData
}

export default function InnerPage({ page }: Props) {
  return (
    <>
      <HeroInner page={page} />
      {page.sections && <Sections sections={page.sections} />}
      {page.faqs && <FaqSection faqs={page.faqs} />}
      {page.related && <RelatedSection related={page.related} />}
      <CtaBand />
    </>
  )
}
