import type { Metadata } from 'next'
import CtaBand from '@/components/CtaBand'

export const metadata: Metadata = {
  title: 'Privacy Policy | Flare Technologies',
  description: 'Privacy Policy for Flare Technologies. How we collect, use and protect your personal information.',
  robots: { index: true, follow: true },
}

const LAST_UPDATED = '1 November 2026'
const COMPANY = 'Flare Technologies'
const BRAND = 'Flare Technologies'
const EMAIL = 'marketing@flaretechnologies.in'
const WEBSITE = 'https://www.flaretechnologies.in'

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="hero hero-inner">
        <div className="wrap" style={{ maxWidth: 800 }}>
          <h1>Privacy Policy</h1>
          <p className="lead">Last updated: {LAST_UPDATED}</p>
        </div>
      </section>

      <section className="section">
        <div className="wrap" style={{ maxWidth: 800 }}>
          <div className="blog-body">

            <p>
              {BRAND} is a brand of {COMPANY} (&ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;us&rdquo;).
              This Privacy Policy explains how we collect, use, disclose and protect information about you
              when you visit <a href={WEBSITE}>{WEBSITE}</a> or contact us through any channel.
              By using our website you agree to this policy.
            </p>

            <h2>1. Information we collect</h2>
            <p>We collect information in two ways:</p>
            <p><strong>Information you give us directly</strong></p>
            <ul>
              <li>Name, work email address, company name and message when you submit our contact form</li>
              <li>Any other details you choose to share when communicating with us by email or WhatsApp</li>
            </ul>
            <p><strong>Information collected automatically</strong></p>
            <ul>
              <li>Pages visited, time spent and actions taken on the website (via Google Analytics and Google Tag Manager)</li>
              <li>Device type, browser, operating system and approximate location (city/country level)</li>
              <li>IP address and referral source</li>
            </ul>
            <p>We do not collect sensitive personal data such as payment card numbers, government ID numbers or health information.</p>

            <h2>2. How we use your information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Respond to your enquiry and send you the written proposal you requested</li>
              <li>Schedule and conduct the strategy call you booked</li>
              <li>Send service updates or follow-up communications directly related to your enquiry</li>
              <li>Improve the website, understand which pages and services are most useful, and fix problems</li>
              <li>Comply with legal obligations</li>
            </ul>
            <p>We do not use your information for automated decision-making or profiling.</p>

            <h2>3. Legal basis for processing</h2>
            <p>Where applicable under data protection law, we rely on the following lawful bases:</p>
            <ul>
              <li><strong>Contractual necessity</strong> — to respond to your enquiry and deliver the services you requested</li>
              <li><strong>Legitimate interests</strong> — to improve our website and follow up on genuine business enquiries</li>
              <li><strong>Consent</strong> — where we ask for your explicit agreement, such as for marketing communications</li>
            </ul>

            <h2>4. Sharing your information</h2>
            <p>We do not sell, rent or trade your personal information. We may share it with:</p>
            <ul>
              <li><strong>Resend</strong> — our email delivery provider, used only to send you a confirmation of your form submission</li>
              <li><strong>Google Analytics / Google Tag Manager</strong> — for anonymised website analytics</li>
              <li><strong>Koalendar</strong> — if you book a strategy call through our booking widget</li>
              <li><strong>Legal authorities</strong> — if required by law or to protect our rights</li>
            </ul>
            <p>All third-party providers are required to handle your data securely and only for the purposes we specify.</p>

            <h2>5. Cookies</h2>
            <p>Our website uses cookies and similar tracking technologies:</p>
            <ul>
              <li><strong>Essential cookies</strong> — required for the website to function (e.g. admin session cookie)</li>
              <li><strong>Analytics cookies</strong> — placed by Google Analytics to measure site usage (anonymised)</li>
            </ul>
            <p>
              You can control cookies through your browser settings. Disabling analytics cookies will not affect your ability to use the website.
              For more information see <a href="https://www.google.com/policies/privacy/partners/" target="_blank" rel="noopener">Google&apos;s privacy partners page</a>.
            </p>

            <h2>6. Data retention</h2>
            <p>
              We retain contact form submissions for as long as necessary to complete your enquiry and for up to 2 years thereafter
              for legitimate business purposes. Analytics data is retained in accordance with Google Analytics&apos; standard retention periods.
              You may request deletion of your data at any time (see Section 8).
            </p>

            <h2>7. Data security</h2>
            <p>
              We take reasonable technical and organisational measures to protect your personal information from unauthorised access,
              disclosure, alteration or destruction. Our website is served over HTTPS. Access to contact form data is restricted to
              authorised personnel only.
            </p>
            <p>
              No method of transmission over the internet is completely secure. While we do our best to protect your data,
              we cannot guarantee absolute security.
            </p>

            <h2>8. Your rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li><strong>Access</strong> — request a copy of the personal data we hold about you</li>
              <li><strong>Correction</strong> — ask us to correct inaccurate or incomplete data</li>
              <li><strong>Deletion</strong> — ask us to delete your personal data (&ldquo;right to be forgotten&rdquo;)</li>
              <li><strong>Objection</strong> — object to processing based on legitimate interests</li>
              <li><strong>Portability</strong> — request your data in a structured, machine-readable format</li>
              <li><strong>Withdraw consent</strong> — where processing is based on consent, withdraw it at any time</li>
            </ul>
            <p>
              To exercise any of these rights, email us at <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
              We will respond within 30 days.
            </p>

            <h2>9. Third-party links</h2>
            <p>
              Our website may contain links to third-party websites (LinkedIn, WhatsApp, Google, etc.).
              We are not responsible for the privacy practices of those sites and encourage you to read their privacy policies.
            </p>

            <h2>10. Children&apos;s privacy</h2>
            <p>
              Our website and services are not directed at children under 16 years of age.
              We do not knowingly collect personal information from children.
            </p>

            <h2>11. Changes to this policy</h2>
            <p>
              We may update this Privacy Policy from time to time. The &ldquo;Last updated&rdquo; date at the top of this page
              will reflect any changes. Continued use of the website after changes are posted constitutes acceptance of the updated policy.
            </p>

            <h2>12. Contact us</h2>
            <p>
              If you have any questions about this Privacy Policy or how we handle your data, please contact us:
            </p>
            <ul>
              <li><strong>Email:</strong> <a href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
              <li><strong>Company:</strong> {COMPANY}</li>
              <li><strong>Brand:</strong> {BRAND}</li>
              <li><strong>Website:</strong> <a href={WEBSITE}>{WEBSITE}</a></li>
            </ul>

          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
