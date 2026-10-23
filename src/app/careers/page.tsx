import type { Metadata } from 'next'
import { BY_SLUG } from '@/lib/content'
import InnerPage from '@/components/InnerPage'

const page = BY_SLUG['careers']

export const metadata: Metadata = {
  title: page.title,
  description: page.desc,
  openGraph: { title: page.title, description: page.desc, images: ['/assets/og-image.png'] },
}

export default function CareersPage() {
  return <InnerPage page={page} />
}
