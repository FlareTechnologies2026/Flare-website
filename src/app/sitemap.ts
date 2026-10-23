import type { MetadataRoute } from 'next'
import { PAGES } from '@/lib/content'

const DOMAIN = 'https://www.flaretechnologies.in'

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.map(p => ({
    url: p.slug === '' ? `${DOMAIN}/` : `${DOMAIN}/${p.slug}/`,
    lastModified: new Date('2026-10-21'),
    changeFrequency: 'monthly' as const,
    priority: p.slug === '' ? 1 : 0.8,
  }))
}
