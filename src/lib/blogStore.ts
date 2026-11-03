import { supabase } from './supabase'

export type ContentBlock =
  | { type: 'section'; heading: string; body: string }
  | { type: 'faq'; question: string; answer: string }

export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  blocks: ContentBlock[]
  coverImage?: string
  author: string
  publishedAt: string
  category: string
  metaTitle?: string
  metaDesc?: string
  ogImage?: string
  published: boolean
}

export async function getPosts(onlyPublished = false): Promise<BlogPost[]> {
  let query = supabase.from('blog_posts').select('*').order('published_at', { ascending: false })
  if (onlyPublished) query = query.eq('published', true)
  const { data, error } = await query
  if (error) { console.error('getPosts error:', error); return [] }
  return (data || []).map(rowToPost)
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const { data, error } = await supabase.from('blog_posts').select('*').eq('slug', slug).single()
  if (error || !data) return null
  return rowToPost(data)
}

export async function addPost(post: Omit<BlogPost, 'id'>): Promise<BlogPost> {
  const { data, error } = await supabase.from('blog_posts').insert([postToRow(post)]).select().single()
  if (error) throw new Error(error.message)
  return rowToPost(data)
}

export async function updatePost(id: string, updates: Partial<Omit<BlogPost, 'id'>>): Promise<BlogPost | null> {
  const { data, error } = await supabase.from('blog_posts').update(postToRow(updates as BlogPost)).eq('id', id).select().single()
  if (error || !data) return null
  return rowToPost(data)
}

export async function deletePost(id: string): Promise<boolean> {
  const { error } = await supabase.from('blog_posts').delete().eq('id', id)
  return !error
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function rowToPost(row: any): BlogPost {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    blocks: row.blocks || [],
    coverImage: row.cover_image,
    author: row.author,
    publishedAt: row.published_at,
    category: row.category,
    metaTitle: row.meta_title,
    metaDesc: row.meta_desc,
    ogImage: row.og_image,
    published: row.published,
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function postToRow(post: Partial<BlogPost>): any {
  const row: Record<string, unknown> = {}
  if (post.slug !== undefined) row.slug = post.slug
  if (post.title !== undefined) row.title = post.title
  if (post.excerpt !== undefined) row.excerpt = post.excerpt
  if (post.blocks !== undefined) row.blocks = post.blocks
  if (post.coverImage !== undefined) row.cover_image = post.coverImage
  if (post.author !== undefined) row.author = post.author
  if (post.publishedAt !== undefined) row.published_at = post.publishedAt
  if (post.category !== undefined) row.category = post.category
  if (post.metaTitle !== undefined) row.meta_title = post.metaTitle
  if (post.metaDesc !== undefined) row.meta_desc = post.metaDesc
  if (post.ogImage !== undefined) row.og_image = post.ogImage
  if (post.published !== undefined) row.published = post.published
  return row
}
