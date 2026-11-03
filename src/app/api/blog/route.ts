import { NextRequest, NextResponse } from 'next/server'
import { getPosts, addPost } from '@/lib/blogStore'

function isAdmin(req: NextRequest): boolean {
  return req.cookies.get('flare_admin')?.value === '1'
}

export async function GET(req: NextRequest) {
  const admin = isAdmin(req)
  const posts = await getPosts(!admin)
  return NextResponse.json(posts)
}

export async function POST(req: NextRequest) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json()
  const { slug, title, excerpt, blocks, coverImage, author, publishedAt, category, metaTitle, metaDesc, ogImage, published } = body

  if (!slug || !title || !excerpt) {
    return NextResponse.json({ error: 'Title, slug and excerpt are required' }, { status: 400 })
  }

  const existing = await getPosts()
  if (existing.find(p => p.slug === slug)) {
    return NextResponse.json({ error: 'A post with this slug already exists' }, { status: 409 })
  }

  const entry = await addPost({
    slug,
    title,
    excerpt,
    blocks: blocks || [],
    coverImage: coverImage || undefined,
    author: author || 'Flare Technologies',
    publishedAt: publishedAt || new Date().toISOString(),
    category: category || 'General',
    metaTitle: metaTitle || title,
    metaDesc: metaDesc || excerpt,
    ogImage: ogImage || coverImage || '/assets/og-image.png',
    published: published ?? false,
  })

  return NextResponse.json(entry, { status: 201 })
}
