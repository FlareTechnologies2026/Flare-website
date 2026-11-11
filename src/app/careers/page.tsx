import type { Metadata } from 'next'
import { BY_SLUG } from '@/lib/content'
import { getVacancies } from '@/lib/vacancyStore'
import CareersClient from '@/components/CareersClient'

const page = BY_SLUG['careers']

export const metadata: Metadata = {
  title: page.title,
  description: page.desc,
  openGraph: { title: page.title, description: page.desc, images: ['/assets/og-image.png'] },
}

export default async function CareersPage() {
  const vacancies = await getVacancies(true) // only open roles
  return <CareersClient page={page} vacancies={vacancies} />
}
