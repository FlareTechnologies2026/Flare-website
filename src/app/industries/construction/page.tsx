import { BY_SLUG } from '@/lib/content'
import InnerPage from '@/components/InnerPage'
import type { Metadata } from 'next'

const page = BY_SLUG['industries/construction']

export const metadata: Metadata = {
  title: page.title,
  description: page.desc,
  openGraph: { title: page.title, description: page.desc, images: ['/assets/og-image.png'] },
}

export default function Page() {
  return <InnerPage page={page} />
}
