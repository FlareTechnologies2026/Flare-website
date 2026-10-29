import type { Metadata } from 'next'
import './globals.css'
import Script from 'next/script'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ScrollProgress from '@/components/ScrollProgress'

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-TCNXKNRH'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.flaretechnologies.in'),
  title: 'Flare Technologies | B2B Lead Generation & Growth Team',
  description: 'We run your sales and marketing as one system: ICP research, LinkedIn, SEO, ads and a sales team that books qualified meetings in your calendar.',
  openGraph: {
    images: ['/assets/og-image.png'],
  },
}
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/assets/favicon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&family=Manrope:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Script src={`https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`} strategy="afterInteractive" />
        <Script id="google-tag" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());`}
        </Script>
        <a className="skip" href="#main">Skip to content</a>
        <ScrollProgress />
        <Header />
        <main id="main" style={{ display: 'contents' }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
