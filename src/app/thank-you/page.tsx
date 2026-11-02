import type { Metadata } from 'next'
import Link from 'next/link'
import CtaBand from '@/components/CtaBand'

export const metadata: Metadata = {
  title: 'Thank You | Flare Technologies',
  description: 'We have received your request and will get back to you within one working day.',
  robots: { index: false, follow: false },
}

export default function ThankYouPage() {
  return (
    <>
      <section className="hero hero-inner">
        <div className="wrap" style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto', padding: '4rem 1rem' }}>
          <h1>Thank you.</h1>
          <p className="lead" style={{ marginTop: '1rem' }}>
            We have your request and will reply within one working day with next steps.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem', flexWrap: 'wrap' }}>
            <Link href="/" className="btn btn-primary">Back to home</Link>
            <Link href="/case-studies" className="btn btn-secondary">See our work</Link>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  )
}
