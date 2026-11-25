import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { marked } from 'marked'
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

// Render markdown or plain text to clean HTML
function renderContent(text: string): string {
  if (!text) return ''
  // Use marked to parse markdown
  const html = marked.parse(text, { async: false }) as string
  return html
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post || !post.published) notFound()

  return (
    <>
      <article>
        {/* Hero — with cover image as background if available */}
        <section
          className="blog-hero"
          style={post.coverImage ? {
            background: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(${post.coverImage}) center/cover no-repeat`,
            color: '#fff',
          } : {}}
        >
          <div className="wrap" style={{ maxWidth: 800, paddingTop: '4rem', paddingBottom: '4rem' }}>
            <p className="blog-meta" style={{ marginBottom: '1rem', color: post.coverImage ? 'rgba(255,255,255,0.8)' : undefined }}>
              <span className="blog-tag" style={post.coverImage ? { background: 'rgba(255,255,255,0.2)', color: '#fff' } : undefined}>{post.category}</span>
              <span>{new Date(post.publishedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              <span>·</span>
              <span>By {post.author}</span>
            </p>
            <h1 style={{ maxWidth: '100%', color: post.coverImage ? '#fff' : undefined }}>{post.title}</h1>
            <p className="lead" style={{ color: post.coverImage ? 'rgba(255,255,255,0.88)' : undefined }}>{post.excerpt}</p>
          </div>
        </section>

        {/* Content */}
        <section className="section">
          <div className="wrap" style={{ maxWidth: 780 }}>

            {/* Section blocks */}
            {post.blocks.filter(b => b.type === 'section').length > 0 && (
              post.blocks.filter(b => b.type === 'section').map((block, i) => {
                if (block.type !== 'section') return null
                return (
                  <div key={i} style={{ marginBottom: '2.5rem' }}>
                    {block.heading && <h2 className="blog-section-heading">{block.heading}</h2>}
                    <div
                      className="blog-body"
                      dangerouslySetInnerHTML={{ __html: renderContent(block.body) }}
                    />
                  </div>
                )
              })
            )}

            {/* FAQ blocks */}
            {post.blocks.filter(b => b.type === 'faq').length > 0 && (
              <div className="blog-faq-section">
                <h2 className="blog-section-heading">Frequently Asked Questions</h2>
                <div className="blog-faq-list">
                  {post.blocks.filter(b => b.type === 'faq').map((block, i) => {
                    if (block.type !== 'faq') return null
                    return (
                      <div key={i} className="blog-faq-item">
                        <h3 className="blog-faq-q">
                          <span className="blog-faq-num">{i + 1}</span>
                          {block.question}
                        </h3>
                        <div
                          className="blog-body blog-faq-a"
                          dangerouslySetInnerHTML={{ __html: renderContent(block.answer) }}
                        />
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

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
