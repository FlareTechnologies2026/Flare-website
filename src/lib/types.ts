export interface PageData {
  slug: string
  kind: 'home' | 'system' | 'service' | 'build' | 'article' | 'work' | 'cases' | 'about' | 'contact' | 'simple' | 'services'
  keyword: string
  title: string
  desc: string
  h1: string
  lead: string
  nav_group?: string | null
  includes?: string[]
  sections?: [string, string][]
  faqs?: [string, string][]
  related?: string[]
  area?: string
}

export interface CaseStudy {
  sector: string
  client: string
  title: string
  body: string
  stats: [string, string][]
  link: string
}
