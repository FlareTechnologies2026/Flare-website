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

// No static posts — all blogs managed via admin
const STATIC_POSTS: never[] = []

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

            {posts.length === 0 && (
              <p style={{ color: 'var(--ink-500)' }}>No posts yet. Check back soon.</p>
            )}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
