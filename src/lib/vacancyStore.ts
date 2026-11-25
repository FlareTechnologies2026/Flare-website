import { supabase } from './supabase'

export interface Vacancy {
  id: string
  title: string
  department: string
  location: string
  type: string          // Full-time, Part-time, Contract, Internship
  experience: string    // e.g. "2–4 years"
  salary: string        // optional range
  about_role: string    // markdown body
  responsibilities: string   // markdown list
  qualifications: string     // markdown list (optional)
  nice_to_have: string       // optional
  benefits: string           // optional
  apply_link: string         // mailto or external URL
  open: boolean              // published / active
  created_at?: string
}

export async function getVacancies(onlyOpen = false): Promise<Vacancy[]> {
  let query = supabase.from('vacancies').select('*').order('created_at', { ascending: false })
  if (onlyOpen) query = query.eq('open', true)
  const { data, error } = await query
  if (error) { console.error('getVacancies error:', error); return [] }
  return (data || []).map(rowToVacancy)
}

export async function addVacancy(v: Omit<Vacancy, 'id' | 'created_at'>): Promise<Vacancy> {
  const { data, error } = await supabase.from('vacancies').insert([vacancyToRow(v)]).select().single()
  if (error) throw new Error(error.message)
  return rowToVacancy(data)
}

export async function updateVacancy(id: string, updates: Partial<Omit<Vacancy, 'id' | 'created_at'>>): Promise<Vacancy | null> {
  const { data, error } = await supabase.from('vacancies').update(vacancyToRow(updates as Vacancy)).eq('id', id).select().single()
  if (error || !data) return null
  return rowToVacancy(data)
}

export async function deleteVacancy(id: string): Promise<boolean> {
  const { error } = await supabase.from('vacancies').delete().eq('id', id)
  return !error
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function rowToVacancy(row: any): Vacancy {
  return {
    id: row.id,
    title: row.title,
    department: row.department || '',
    location: row.location || '',
    type: row.type || '',
    experience: row.experience || '',
    salary: row.salary || '',
    about_role: row.about_role || '',
    responsibilities: row.responsibilities || '',
    qualifications: row.qualifications || '',
    nice_to_have: row.nice_to_have || '',
    benefits: row.benefits || '',
    apply_link: row.apply_link || '',
    open: row.open ?? true,
    created_at: row.created_at,
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function vacancyToRow(v: Partial<Vacancy>): any {
  const row: Record<string, unknown> = {}
  if (v.title !== undefined)           row.title = v.title
  if (v.department !== undefined)      row.department = v.department
  if (v.location !== undefined)        row.location = v.location
  if (v.type !== undefined)            row.type = v.type
  if (v.experience !== undefined)      row.experience = v.experience
  if (v.salary !== undefined)          row.salary = v.salary
  if (v.about_role !== undefined)      row.about_role = v.about_role
  if (v.responsibilities !== undefined) row.responsibilities = v.responsibilities
  if (v.qualifications !== undefined)  row.qualifications = v.qualifications
  if (v.nice_to_have !== undefined)    row.nice_to_have = v.nice_to_have
  if (v.benefits !== undefined)        row.benefits = v.benefits
  if (v.apply_link !== undefined)      row.apply_link = v.apply_link
  if (v.open !== undefined)            row.open = v.open
  return row
}
