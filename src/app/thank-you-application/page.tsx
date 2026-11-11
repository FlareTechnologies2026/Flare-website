import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Application Received | Flare Technologies',
  description: 'Your job application has been received. We will review it and get back to you soon.',
  robots: { index: false, follow: false },
}

export default function ThankYouApplicationPage() {
  return (
    <section className="hero hero-inner">
      <div
        className="wrap"
        style={{
          textAlign: 'center',
          maxWidth: '600px',
          margin: '0 auto',
          padding: '5rem 1rem 4rem',
        }}
      >
        {/* Big tick */}
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: '50%',
            background: 'rgba(52,194,131,.12)',
            border: '2px solid rgba(52,194,131,.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 36,
            margin: '0 auto 28px',
          }}
          aria-hidden="true"
        >
          ✓
        </div>

        <h1 style={{ marginBottom: '0.5rem' }}>Application received.</h1>
        <p className="lead" style={{ marginTop: '1rem', color: 'var(--ink-700)' }}>
          Thanks for applying. We&apos;ve got your resume and will review it carefully.
          We&apos;ll be in touch within a few working days.
        </p>

        <p style={{ fontSize: 15, color: 'var(--ink-500)', marginTop: '1rem' }}>
          In the meantime, feel free to explore what we do.
        </p>

        <div
          style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            marginTop: '2.5rem',
            flexWrap: 'wrap',
          }}
        >
          <Link href="/careers/" className="btn btn-primary">
            See all open roles
          </Link>
          <Link href="/" className="btn btn-outline">
            Back to home
          </Link>
        </div>
      </div>
    </section>
  )
}
