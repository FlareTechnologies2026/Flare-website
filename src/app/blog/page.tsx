import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getPosts } from '@/lib/blogStore'
import CtaBand from '@/components/CtaBand'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Blog | Flare Technologies',
  description: 'B2B marketing, lead generation and sales insights from the Flare Technologies team.',
  openGraph: {
    title: 'Blog | Flare Technologies',
    description: 'B2B marketing, lead generation and sales insights from the Flare Technologies team.',
    images: ['/assets/og-image.png'],
  },
}

// The existing hardcoded guide always shows as a card
const STATIC_POSTS = [
  {
    id: 'static-b2b-guide',
    slug: null, // uses href directly
    href: '/blog/b2b-lead-generation-guide/',
    title: 'B2B Lead Generation: A Practical Guide for 2026',
    excerpt: 'What B2B lead generation is, the channels that work in 2026, how to build an ICP, write outreach that gets replies and measure results.',
    coverImage: null,
    category: 'Lead Generation',
    publishedAt: '2026-01-01T00:00:00.000Z',
    author: 'Flare Technologies',
  },
]

export default async function BlogIndexPage() {
  const posts = await getPosts(true)

  return (
    <>
      <section className="hero hero-inner">
        <div className="wrap">
          <h1>Blog</h1>
          <p className="lead">B2B marketing, lead generation and sales insights from the Flare team.</p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="blog-grid">
            {/* Dynamic posts from admin */}
            {posts.map(post => (
              <article key={post.id} className="blog-card">
                {post.coverImage && (
                  <Link href={`/blog/${post.slug}/`} tabIndex={-1}>
                    <div className="blog-card-img">
                      <Image src={post.coverImage} alt={post.title} width={720} height={400}
                        style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                    </div>
                  </Link>
                )}
                <div className="blog-card-body">
                  <p className="blog-meta">
                    <span className="blog-tag">{post.category}</span>
                    <span>{new Date(post.publishedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                  </p>
                  <h2 className="blog-card-title">
                    <Link href={`/blog/${post.slug}/`}>{post.title}</Link>
                  </h2>
                  <p className="blog-card-excerpt">{post.excerpt}</p>
                  <Link className="text-link" href={`/blog/${post.slug}/`}>Read article →</Link>
                </div>
              </article>
            ))}

            {/* Static hardcoded posts */}
            {STATIC_POSTS.map(post => (
              <article key={post.id} className="blog-card">
                <div className="blog-card-body">
                  <p className="blog-meta">
                    <span className="blog-tag">{post.category}</span>
                    <span>{new Date(post.publishedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                  </p>
                  <h2 className="blog-card-title">
                    <Link href={post.href}>{post.title}</Link>
                  </h2>
                  <p className="blog-card-excerpt">{post.excerpt}</p>
                  <Link className="text-link" href={post.href}>Read article →</Link>
                </div>
              </article>
            ))}

            {posts.length === 0 && STATIC_POSTS.length === 0 && (
              <p style={{ color: 'var(--ink-500)' }}>No posts yet. Check back soon.</p>
            )}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
