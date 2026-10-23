import React from 'react'
import Link from 'next/link'
import type { Metadata } from 'next'
import LoopSvg from '@/components/LoopSvg'
import CasesSection from '@/components/CasesSection'
import CtaBand from '@/components/CtaBand'
import FaqSection from '@/components/FaqSection'
import HomeClient from '@/components/HomeClient'
import HeroStage from '@/components/HeroStage'
import { SYSTEM_STEPS } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Flare Technologies | B2B Lead Generation & Growth Team — India, UAE & US',
  description: 'We book qualified sales meetings for B2B companies in India, the UAE and the US. Flare finds your buyers, runs outreach and ads, and our sales team puts meetings in your calendar.',
}

const labels = SYSTEM_STEPS.map(([t]) => t)

// Plan names in no-ad-spend-first order with plain-English descriptions
const plans = [
  {
    name: 'Outreach Engine',
    plain: 'No ad spend',
    desc: 'Meetings from LinkedIn, email and our sales team only. No ad budget needed.',
  },
  {
    name: 'Outreach + Ads',
    plain: 'With paid ads',
    desc: 'Everything in Outreach Engine, plus Google, Meta, LinkedIn and ChatGPT ads for more volume.',
  },
  {
    name: 'Full Growth System',
    plain: 'Fully managed',
    desc: 'Sales, marketing and growth run end to end — outreach, ads, SEO, content, social and consulting.',
  },
]

const industries = ['B2B SaaS & AI','Cybersecurity','Fintech & remittance','Construction & interiors','Real estate','Manufacturing','Trade & logistics','Food & FMCG','Beauty & wellness','Consumer apps']

// First FAQ open by default — moved "What does Flare do?" to top and marked open
const homeFaqs: [string, string][] = [
  ['What does Flare Technologies do?', 'Flare runs sales and marketing for B2B companies in India, the UAE and the US as one system. We find your ideal buyers, build verified lead lists, fix your LinkedIn and website for SEO, run outreach and ads, and our in-house sales team books qualified meetings straight into your calendar. We also build custom software, mobile apps and ERP systems through our Custom Development team.'],
  ['Is Flare an agency or a sales team?', 'Both, working as one. Our marketers make you visible and trusted online, and our sales team speaks to your prospects directly and books calls. You get one team and one monthly report instead of three vendors who never talk to each other.'],
  ['What do "ICP", "pipeline" and "outreach" mean?', 'ICP (Ideal Customer Profile) is a description of the companies and roles most likely to buy from you. Pipeline is the list of potential deals in progress. Outreach means sending personalised LinkedIn messages and emails to start conversations with the right people.'],
  ['Do I have to run paid ads?', 'No. The Outreach Engine plan uses LinkedIn, email and our sales team with zero ad spend. You can add Google, Meta, LinkedIn or ChatGPT ads at any time.'],
  ['Which countries do you work in?', 'We work with clients across India, the UAE and the US, and can target buyers in any country where your customers are. Our team is based in Bengaluru, India.'],
  ['How do I get started?', 'Book a 30-minute strategy call. We look at your current situation, recommend a plan, and send a written proposal within two working days — no commitment required.'],
]

export default function HomePage() {
  const marquee = industries.map((x, i) => <li key={i}>{x}</li>)

  return (
    <>
      <HomeClient />

      {/* ── HERO ── */}
      <section className="hero-immersive" aria-labelledby="home-h1">
        <HeroStage />
        <div className="hero-glow" aria-hidden="true" />
        <div className="wrap hero-imm-inner">

          {/* Eyebrow — tells who it's for and where */}
          <p className="hero-kicker">
            <span className="live-dot" aria-hidden="true" />
            B2B sales and marketing — India, UAE &amp; US
          </p>

          {/* H1 — clear outcome */}
          <h1 id="home-h1">
            <span className="line">We book qualified</span>{' '}
            <span className="line">sales meetings for</span>{' '}
            <span className="line">B2B companies.</span>
          </h1>

          {/* Subhead — explains how */}
          <p className="lead">
            Flare finds your buyers, runs LinkedIn, email and ads, and our sales team puts qualified meetings in your calendar. You close the deals.
          </p>

          {/* CTA + commitment-reducer */}
          <div className="hero-actions">
            <Link className="btn btn-primary btn-lg magnetic" href="/contact/">Book a strategy call</Link>
            <a className="btn btn-glass btn-lg" href="#system">See how it works</a>
          </div>
          <p className="hero-commit">30 minutes &middot; we review your pipeline &middot; written proposal within two working days</p>

          {/* Plan names — one-line row, no-ad-spend first */}
          <div className="hero-plans-row" aria-label="Plans">
            {plans.map((p, i) => (
              <span key={i} className="hero-plan-chip">
                <span className="hero-plan-name">{p.name}</span>
                <span className="hero-plan-plain">{p.plain}</span>
              </span>
            ))}
          </div>

          {/* Stats — removed "19 products" (moved to Custom Dev section) */}
          <ul className="proof-row on-dark">
            <li><strong data-count="260" data-suffix="+">260+</strong> qualified leads in 45 days for SlashLLM</li>
            <li><strong data-count="6">6</strong> national consumer brands on retainer</li>
            <li><strong data-count="3" data-suffix=" markets">3 markets</strong> India, the UAE and the US</li>
          </ul>
        </div>
        <a className="scroll-cue" href="#system" aria-label="Scroll to how the system works"><span /></a>
      </section>

      {/* ── INDUSTRIES MARQUEE ── */}
      <section className="marquee-band" aria-label="Industries we have worked in">
        <div className="marquee">
          <ul>{marquee}</ul>
          <ul aria-hidden="true">{marquee}</ul>
        </div>
      </section>

      {/* ── WHAT WE DO — moved up from FAQ ── */}
      <section className="section what-we-do" aria-labelledby="wwd-h">
        <div className="wrap split">
          <h2 id="wwd-h" className="reveal">One team. Sales, marketing and software — run as a system.</h2>
          <div className="reveal">
            <p className="big">Most founders hire a lead-gen vendor, an ad agency and an SEO freelancer who never talk to each other. The leads go cold. The follow-up never happens. You still chase everything yourself.</p>
            <p className="big">Flare replaces that with one team that owns every step: finding the right buyers, making you visible online, running outreach and ads, and booking qualified meetings in your calendar. <strong>You close and deliver.</strong></p>
            <p><Link className="text-link" href="/growth-system/">See how the Growth System works</Link></p>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS — scrollytelling ── */}
      <section className="scrolly" id="system" aria-labelledby="sys-h">
        <div className="wrap scrolly-grid">
          <div className="scrolly-sticky">
            <h2 id="sys-h">Seven steps. One team. Repeated every month.</h2>
            <p className="section-lead">Each step feeds the next. When one breaks, we fix it the same week — because one team owns all of it.</p>
            <figure className="scrolly-loop" aria-hidden="true">
              <LoopSvg labels={labels} id="scrolly" />
              <div className="scrolly-count">
                <span data-scrolly-num>1</span><span>/ 7</span>
              </div>
            </figure>
          </div>
          <ol className="scrolly-steps">
            {SYSTEM_STEPS.map(([title, desc], i) => (
              <li key={i} className="scrolly-step" data-step={i + 1}>
                <span className="n" aria-hidden="true">{i + 1}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── TWO WAYS WE HELP — doors ── */}
      <section className="section" aria-labelledby="doors-h">
        <div className="wrap wide">
          <h2 id="doors-h" className="reveal">Two ways we help</h2>
          <div className="doors">
            <Link className="door door-grow spot" href="/growth-system/">
              <span className="door-k">Growth System</span>
              <span className="door-t">We run your sales and marketing</span>
              <span className="door-d">Lead generation, LinkedIn, email, paid ads (Google, Meta, ChatGPT), SEO and AI search, social media, a sales team that books meetings, and monthly consulting.</span>
              <span className="door-go">Explore the Growth System</span>
            </Link>
            <Link className="door door-build spot" href="/custom-development/">
              <span className="door-k">Custom Development</span>
              <span className="door-t">We build your software</span>
              <span className="door-d">Web and mobile apps, MVPs, ERP, AI automation and cloud — by a team with 7 years of experience and 19 products shipped across fintech, enterprise and consumer.</span>
              <span className="door-go">Explore Custom Development</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── PLANS ── */}
      <section className="section alt" aria-labelledby="plans-h">
        <div className="wrap wide">
          <h2 id="plans-h" className="reveal">Three plans, starting from no ad spend</h2>
          <p className="section-lead">Every plan starts from the same foundation — ICP research, verified lists, LinkedIn fixes, and a sales team that books meetings. You pick how much to layer on top.</p>
          <ol className="plans">
            {plans.map((p, i) => (
              <li key={i} className="spot">
                <span className="plan-n">{p.plain}</span>
                <h3>{p.name}</h3>
                <p>{p.desc}</p>
              </li>
            ))}
          </ol>
          <p><Link className="text-link" href="/growth-system/">See exactly what each plan includes</Link></p>
        </div>
      </section>

      {/* ── RESULTS ── */}
      <section className="section dark results-dark" aria-labelledby="res-h">
        <div className="wrap wide">
          <h2 id="res-h" className="reveal">Results we can show you</h2>
          <p className="section-lead" style={{color:'var(--ink-400)'}}>One result stands out for B2B lead generation. The others show the range of what the team does.</p>
          <CasesSection limit={3} />
          <p><Link className="text-link light" href="/case-studies/">See all case studies</Link></p>
        </div>
      </section>

      {/* ── FAQs — first one open by default ── */}
      <FaqSection faqs={homeFaqs} firstOpen />

      {/* ── CTA ── */}
      <CtaBand />
    </>
  )
}
