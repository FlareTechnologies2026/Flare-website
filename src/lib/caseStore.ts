import { supabase } from './supabase'

export interface CaseStudy {
  id: string
  sector: string
  client: string
  logo?: string
  title: string
  body: string
  stats: [string, string][]
  link: string
}

export async function getCases(): Promise<CaseStudy[]> {
  const { data, error } = await supabase.from('case_studies').select('*').order('created_at', { ascending: false })
  if (error) { console.error('getCases error:', error); return [] }
  return (data || []).map(rowToCase)
}

export async function addCase(c: Omit<CaseStudy, 'id'>): Promise<CaseStudy> {
  const { data, error } = await supabase.from('case_studies').insert([caseToRow(c)]).select().single()
  if (error) throw new Error(error.message)
  return rowToCase(data)
}

export async function updateCase(id: string, updates: Partial<Omit<CaseStudy, 'id'>>): Promise<CaseStudy | null> {
  const { data, error } = await supabase.from('case_studies').update(caseToRow(updates as CaseStudy)).eq('id', id).select().single()
  if (error || !data) return null
  return rowToCase(data)
}

export async function deleteCase(id: string): Promise<boolean> {
  const { error } = await supabase.from('case_studies').delete().eq('id', id)
  return !error
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function rowToCase(row: any): CaseStudy {
  return {
    id: row.id,
    sector: row.sector,
    client: row.client,
    logo: row.logo,
    title: row.title,
    body: row.body,
    stats: row.stats || [],
    link: row.link,
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function caseToRow(c: Partial<CaseStudy>): any {
  const row: Record<string, unknown> = {}
  if (c.sector !== undefined) row.sector = c.sector
  if (c.client !== undefined) row.client = c.client
  if (c.logo !== undefined) row.logo = c.logo
  if (c.title !== undefined) row.title = c.title
  if (c.body !== undefined) row.body = c.body
  if (c.stats !== undefined) row.stats = c.stats
  if (c.link !== undefined) row.link = c.link
  return row
}
