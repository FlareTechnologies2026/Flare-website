import React from 'react'
import Link from 'next/link'
import type { PageData } from '@/lib/types'
import { BY_SLUG, GROUP_PARENT, MENU_LABEL } from '@/lib/content'

function crumbsFor(p: PageData): [string, string][] {
  const c: [string, string][] = [['Home', '']]
  const grp = p.nav_group ? GROUP_PARENT[p.nav_group] : null
  if (grp && grp[1] !== p.slug) {
    c.push(grp)
  }
  if (p.slug) {
    c.push([MENU_LABEL[p.slug] ?? p.h1, p.slug])
  }
  return c
}

interface Props {
  page: PageData
}

export default function HeroInner({ page }: Props) {
  const crumbs = crumbsFor(page)

  const inc = page.includes ? (
    <aside className="includes" aria-label="What is included">
      <p className="inc-h">What is included</p>
      <ul>
        {page.includes.map((x, i) => <li key={i}>{x}</li>)}
      </ul>
    </aside>
  ) : null

  return (
    <section className="hero hero-inner">
      <div className={`wrap hero-grid${inc ? ' has-aside' : ''}`}>
        <div className="hero-copy">
          <nav className="crumbs" aria-label="Breadcrumb">
            <ol>
              {crumbs.map(([name, slug], i) => (
                <li key={i} aria-current={i === crumbs.length - 1 ? 'page' : undefined}>
                  {i === crumbs.length - 1 ? name : (
                    <Link href={slug === '' ? '/' : `/${slug}/`}>{name}</Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
          <h1>{page.h1}</h1>
          <p className="lead">{page.lead}</p>
          <div className="hero-actions">
            <Link className="btn btn-primary btn-lg" href="/contact/">Book a strategy call</Link>
            <Link className="btn btn-outline btn-lg" href="/case-studies/">See results</Link>
          </div>
        </div>
        {inc}
      </div>
    </section>
  )
}
