import type { Metadata } from 'next'
import { BY_SLUG } from '@/lib/content'
import InnerPage from '@/components/InnerPage'

const page = BY_SLUG['about']

export const metadata: Metadata = {
  title: page.title,
  description: page.desc,
  openGraph: { title: page.title, description: page.desc, images: ['/assets/og-image.png'] },
}

export default function AboutPage() {
  return <InnerPage page={page} />
}
