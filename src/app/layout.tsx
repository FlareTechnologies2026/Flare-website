import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ScrollProgress from '@/components/ScrollProgress'

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
