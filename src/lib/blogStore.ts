import fs from 'fs/promises'
import path from 'path'

// A content block — either a regular section or a FAQ
export type ContentBlock =
  | { type: 'section'; heading: string; body: string }
  | { type: 'faq'; question: string; answer: string }

export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  blocks: ContentBlock[]   // structured content blocks
  coverImage?: string      // path relative to /public e.g. /uploads/blog-123.jpg
  author: string
  publishedAt: string      // ISO date string
  category: string
  // SEO
  metaTitle?: string
  metaDesc?: string
  ogImage?: string
  published: boolean
}

const DATA_FILE = path.join(process.cwd(), 'data', 'blog-posts.json')

async function ensureFile(): Promise<void> {
  try {
    await fs.access(DATA_FILE)
  } catch {
    await fs.mkdir(path.dirname(DATA_FILE), { recursive: true })
    await fs.writeFile(DATA_FILE, '[]', 'utf-8')
  }
}

export async function getPosts(onlyPublished = false): Promise<BlogPost[]> {
  await ensureFile()
  const raw = await fs.readFile(DATA_FILE, 'utf-8')
  const posts: BlogPost[] = JSON.parse(raw)
  return onlyPublished ? posts.filter(p => p.published) : posts
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getPosts()
  return posts.find(p => p.slug === slug) ?? null
}

export async function addPost(data: Omit<BlogPost, 'id'>): Promise<BlogPost> {
  await ensureFile()
  const posts = await getPosts()
  const id = `post-${Date.now()}`
  const entry: BlogPost = { id, ...data }
  posts.push(entry)
  await fs.writeFile(DATA_FILE, JSON.stringify(posts, null, 2), 'utf-8')
  return entry
}

export async function updatePost(id: string, updates: Partial<Omit<BlogPost, 'id'>>): Promise<BlogPost | null> {
  await ensureFile()
  const posts = await getPosts()
  const idx = posts.findIndex(p => p.id === id)
  if (idx === -1) return null
  posts[idx] = { ...posts[idx], ...updates, id }
  await fs.writeFile(DATA_FILE, JSON.stringify(posts, null, 2), 'utf-8')
  return posts[idx]
}

export async function deletePost(id: string): Promise<boolean> {
  await ensureFile()
  const posts = await getPosts()
  const filtered = posts.filter(p => p.id !== id)
  if (filtered.length === posts.length) return false
  await fs.writeFile(DATA_FILE, JSON.stringify(filtered, null, 2), 'utf-8')
  return true
}
