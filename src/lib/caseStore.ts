import fs from 'fs/promises'
import path from 'path'

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

const DATA_FILE = path.join(process.cwd(), 'data', 'case-studies.json')

/** Ensure the data file exists, seeding from nothing if missing */
async function ensureFile(): Promise<void> {
  try {
    await fs.access(DATA_FILE)
  } catch {
    await fs.mkdir(path.dirname(DATA_FILE), { recursive: true })
    await fs.writeFile(DATA_FILE, '[]', 'utf-8')
  }
}

/** Read all case studies from the JSON store */
export async function getCases(): Promise<CaseStudy[]> {
  await ensureFile()
  const raw = await fs.readFile(DATA_FILE, 'utf-8')
  return JSON.parse(raw)
}

/** Add a new case study */
export async function addCase(data: Omit<CaseStudy, 'id'>): Promise<CaseStudy> {
  await ensureFile()
  const cases = await getCases()
  const id = `case-${Date.now()}`
  const entry: CaseStudy = { id, ...data }
  cases.push(entry)
  await fs.writeFile(DATA_FILE, JSON.stringify(cases, null, 2), 'utf-8')
  return entry
}

/** Update an existing case study by id */
export async function updateCase(id: string, updates: Partial<Omit<CaseStudy, 'id'>>): Promise<CaseStudy | null> {
  await ensureFile()
  const cases = await getCases()
  const idx = cases.findIndex(c => c.id === id)
  if (idx === -1) return null
  cases[idx] = { ...cases[idx], ...updates, id }
  await fs.writeFile(DATA_FILE, JSON.stringify(cases, null, 2), 'utf-8')
  return cases[idx]
}

/** Delete a case study by id */
export async function deleteCase(id: string): Promise<boolean> {
  await ensureFile()
  const cases = await getCases()
  const filtered = cases.filter(c => c.id !== id)
  if (filtered.length === cases.length) return false
  await fs.writeFile(DATA_FILE, JSON.stringify(filtered, null, 2), 'utf-8')
  return true
}
