import type { Metadata } from 'next'
import { BY_SLUG } from '@/lib/content'
import ContactForm from '@/components/ContactForm'
import FaqSection from '@/components/FaqSection'
import RelatedSection from '@/components/RelatedSection'
import CtaBand from '@/components/CtaBand'

const page = BY_SLUG['contact']

export const metadata: Metadata = {
  title: page.title,
  description: page.desc,
  openGraph: { title: page.title, description: page.desc, images: ['/assets/og-image.png'] },
}

export default function ContactPage() {
  return (
    <>
      <section className="hero hero-inner">
        <div className="wrap">
          <ContactForm />
        </div>
      </section>
      {page.faqs && <FaqSection faqs={page.faqs} />}
      {page.related && <RelatedSection related={page.related} />}
      <CtaBand />
    </>
  )
}
