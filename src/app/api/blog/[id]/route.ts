import { NextRequest, NextResponse } from 'next/server'
import { updatePost, deletePost } from '@/lib/blogStore'

function isAdmin(req: NextRequest): boolean {
  return req.cookies.get('flare_admin')?.value === '1'
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const body = await req.json()

  const updated = await updatePost(id, {
    slug: body.slug,
    title: body.title,
    excerpt: body.excerpt,
    blocks: body.blocks || [],
    coverImage: body.coverImage || undefined,
    author: body.author,
    publishedAt: body.publishedAt,
    category: body.category,
    metaTitle: body.metaTitle || body.title,
    metaDesc: body.metaDesc || body.excerpt,
    ogImage: body.ogImage || undefined,
    published: body.published ?? false,
  })

  if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(updated)
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  const ok = await deletePost(id)
  if (!ok) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json({ ok: true })
}
