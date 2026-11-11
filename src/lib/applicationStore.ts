import { supabase } from './supabase'

export interface Application {
  id: string
  vacancy_id: string
  vacancy_title: string
  name: string
  email: string
  phone: string
  cover_note: string
  resume_url: string        // public URL to the PDF in Supabase Storage
  resume_filename: string   // original filename shown in UI
  applied_at: string
}

export async function getApplications(vacancyId?: string): Promise<Application[]> {
  let query = supabase
    .from('applications')
    .select('*')
    .order('applied_at', { ascending: false })

  if (vacancyId) query = query.eq('vacancy_id', vacancyId)

  const { data, error } = await query
  if (error) { console.error('getApplications error:', error); return [] }
  return (data || []).map(rowToApplication)
}

export async function addApplication(
  a: Omit<Application, 'id' | 'applied_at'>
): Promise<Application> {
  const { data, error } = await supabase
    .from('applications')
    .insert([applicationToRow(a)])
    .select()
    .single()
  if (error) throw new Error(error.message)
  return rowToApplication(data)
}

export async function deleteApplication(id: string): Promise<boolean> {
  const { error } = await supabase.from('applications').delete().eq('id', id)
  return !error
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function rowToApplication(row: any): Application {
  return {
    id:               row.id,
    vacancy_id:       row.vacancy_id,
    vacancy_title:    row.vacancy_title,
    name:             row.name,
    email:            row.email,
    phone:            row.phone || '',
    cover_note:       row.cover_note || '',
    resume_url:       row.resume_url,
    resume_filename:  row.resume_filename,
    applied_at:       row.applied_at,
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function applicationToRow(a: Omit<Application, 'id' | 'applied_at'>): any {
  return {
    vacancy_id:      a.vacancy_id,
    vacancy_title:   a.vacancy_title,
    name:            a.name,
    email:           a.email,
    phone:           a.phone,
    cover_note:      a.cover_note,
    resume_url:      a.resume_url,
    resume_filename: a.resume_filename,
  }
}
