import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getPostBySlug, getPosts } from '@/lib/blogStore'
import CtaBand from '@/components/CtaBand'

export const dynamic = 'force-dynamic'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return {}
  return {
    title: post.metaTitle || post.title,
    description: post.metaDesc || post.excerpt,
    openGraph: {
      title: post.metaTitle || post.title,
      description: post.metaDesc || post.excerpt,
      images: [post.ogImage || post.coverImage || '/assets/og-image.png'],
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.metaTitle || post.title,
      description: post.metaDesc || post.excerpt,
      images: [post.ogImage || post.coverImage || '/assets/og-image.png'],
    },
    alternates: {
      canonical: `https://www.flaretechnologies.in/blog/${slug}/`,
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post || !post.published) notFound()

  return (
    <>
      <article>
        <section className="hero hero-inner">
          <div className="wrap" style={{ maxWidth: 800 }}>
            <p className="blog-meta" style={{ marginBottom: '1rem' }}>
              <span>{post.category}</span>
              <span> · </span>
              <span>{new Date(post.publishedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              <span> · </span>
              <span>By {post.author}</span>
            </p>
            <h1 style={{ maxWidth: '100%' }}>{post.title}</h1>
            <p className="lead">{post.excerpt}</p>
          </div>
        </section>

        {post.coverImage && (
          <div className="wrap" style={{ maxWidth: 800, marginBottom: '2rem' }}>
            <Image src={post.coverImage} alt={post.title} width={800} height={450}
              style={{ width: '100%', height: 'auto', borderRadius: 'var(--radius-lg)', objectFit: 'cover' }} priority />
          </div>
        )}

        <section className="section">
          <div className="wrap" style={{ maxWidth: 800 }}>

            {/* Render all blocks in the order they were written */}
            {post.blocks.map((block, i) => {
              if (block.type === 'section') {
                return (
                  <div key={i} style={{ marginBottom: '2.5rem' }}>
                    {block.heading && <h2>{block.heading}</h2>}
                    <div className="blog-body" style={{ whiteSpace: 'pre-wrap' }}>{block.body}</div>
                  </div>
                )
              }
              if (block.type === 'faq') {
                return (
                  <div key={i} style={{ borderLeft: '3px solid var(--primary-500)', paddingLeft: '1.25rem', marginBottom: '1.5rem' }}>
                    <p style={{ fontWeight: 700, color: 'var(--ink-950)', marginBottom: '0.4rem', fontSize: '17px' }}>{block.question}</p>
                    <p style={{ color: 'var(--ink-700)', margin: 0, whiteSpace: 'pre-wrap' }}>{block.answer}</p>
                  </div>
                )
              }
              return null
            })}

            <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--ink-100)' }}>
              <Link href="/blog/" className="btn btn-outline">← Back to blog</Link>
            </div>
          </div>
        </section>
      </article>
      <CtaBand />
    </>
  )
}

export async function generateStaticParams() {
  const posts = await getPosts(true)
  return posts.map(p => ({ slug: p.slug }))
}
