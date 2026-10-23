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
  title: 'Flare Technologies | B2B Lead Generation & Growth Team',
  description: 'We run your sales and marketing as one system: ICP research, LinkedIn, SEO, ads and a sales team that books qualified meetings in your calendar.',
}

const labels = SYSTEM_STEPS.map(([t]) => t)

const plans = [
  { name: 'Outreach Engine', desc: 'Meetings without ad spend: ICP, lists, LinkedIn, outreach and our sales team.' },
  { name: 'Outreach + Ads', desc: 'Everything in Outreach Engine, plus Google, Meta, LinkedIn and ChatGPT ads.' },
  { name: 'Full Growth System', desc: 'Sales and marketing fully run: plus SEO, content, social, founder brand and consulting.' },
]

const industries = ['B2B SaaS & AI','Cybersecurity','Fintech & remittance','Construction & interiors','Real estate','Manufacturing','Trade & logistics','Food & FMCG','Beauty & wellness','Consumer apps']

const homeFaqs: [string, string][] = [
  ['What does Flare Technologies do?', 'Flare runs sales and marketing for B2B companies as one system. We research your ideal customer, build lead lists, fix your LinkedIn and website, run outreach and ads, and our sales team books qualified meetings for you. We also build custom software, apps and ERP systems through Custom Development.'],
  ['Is Flare an agency or a sales team?', 'Both, working as one. Our marketers make you visible and trusted, and our sales team talks to your prospects directly and books calls. You get one team and one report instead of three vendors who never speak to each other.'],
  ['Do I have to run paid ads?', 'No. Many clients choose the Outreach Engine plan, which uses LinkedIn, email and our sales team with no ad spend. You can add Google, Meta, LinkedIn or ChatGPT ads later if you want more volume.'],
  ['Which countries do you work in?', 'We work with clients across India, the UAE and the US, and we can target buyers in any country where your customers are. Our team is based in Bengaluru, India.'],
  ['Which industries do you work with?', 'Most of our work is B2B: SaaS and AI, fintech, construction and interiors, real estate, manufacturing, and trade and logistics. We also run campaigns for consumer brands in food, beauty and apps.'],
  ['How do I get started?', 'Book a strategy call. In 30 minutes we look at your current pipeline, tell you which plan fits, and send a written proposal within two working days.'],
]

export default function HomePage() {
  const marquee = industries.map((x, i) => <li key={i}>{x}</li>)

  return (
    <>
      {/* Adds page-home class to body on client — no hydration mismatch */}
      <HomeClient />

      {/* HERO */}
      <section className="hero-immersive" aria-labelledby="home-h1">
        <HeroStage />
        <div className="hero-glow" aria-hidden="true" />
        <div className="wrap hero-imm-inner">
          <p className="hero-kicker">
            <span className="live-dot" aria-hidden="true" />
            Sales and marketing, run as one system
          </p>
          <h1 id="home-h1">
            <span className="line">Your sales and</span>{' '}
            <span className="line">marketing team,</span>{' '}
            <span className="line">already built.</span>
          </h1>
          <p className="lead">Flare runs the whole system that keeps your pipeline full: finding the right buyers, getting you found online, running ads and outreach, and a real sales team that books meetings for you. You focus on closing and delivering.</p>
          <div className="hero-actions">
            <Link className="btn btn-primary btn-lg magnetic" href="/contact/">Book a strategy call</Link>
            <a className="btn btn-glass btn-lg" href="#system">See how the system works</a>
          </div>
          <ul className="proof-row on-dark">
            <li><strong data-count="260" data-suffix="+">260+</strong> qualified leads in 45 days for SlashLLM</li>
            <li><strong data-count="19">19</strong> products built by our development team</li>
            <li><strong data-count="3" data-suffix=" markets">3 markets</strong> clients in India, the UAE and the US</li>
          </ul>
        </div>
        <a className="scroll-cue" href="#system" aria-label="Scroll to how the system works"><span /></a>
      </section>

      {/* MARQUEE */}
      <section className="marquee-band" aria-label="Industries we have worked in">
        <div className="marquee">
          <ul>{marquee}</ul>
          <ul aria-hidden="true">{marquee}</ul>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="section split-section" aria-labelledby="prob-h">
        <div className="wrap split">
          <h2 id="prob-h" className="reveal">Most founders are still the sales team, the marketing team and the product team.</h2>
          <div className="reveal">
            <p className="big">You hired a lead-gen vendor, an ad agency and a freelancer for the website. None of them talk to each other, the leads go cold, and you still chase every follow-up yourself.</p>
            <p className="big">Flare replaces that patchwork with one system and one team. We find the buyers, make you visible where they look, start the conversations and book the meetings. <strong>You close and deliver.</strong></p>
          </div>
        </div>
      </section>

      {/* SCROLLYTELLING */}
      <section className="scrolly" id="system" aria-labelledby="sys-h">
        <div className="wrap scrolly-grid">
          <div className="scrolly-sticky">
            <h2 id="sys-h">How the Growth System works</h2>
            <p className="section-lead">Seven steps, run by one team, repeated every month so your pipeline never runs dry.</p>
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

      {/* DOORS */}
      <section className="section" aria-labelledby="doors-h">
        <div className="wrap wide">
          <h2 id="doors-h" className="reveal">Two ways we help</h2>
          <div className="doors">
            <Link className="door door-grow spot" href="/growth-system/">
              <span className="door-k">Growth System</span>
              <span className="door-t">We run your sales and marketing</span>
              <span className="door-d">Lead generation, LinkedIn, SEO and AI search, paid ads, social media, a sales team that books meetings, and sales consulting and training.</span>
              <span className="door-go">Explore the Growth System</span>
            </Link>
            <Link className="door door-build spot" href="/custom-development/">
              <span className="door-k">Custom Development</span>
              <span className="door-t">We build your software</span>
              <span className="door-d">Web and mobile apps, MVPs, ERP implementation, AI automation and cloud, by a team with 7 years of experience and 19 products shipped.</span>
              <span className="door-go">Explore Custom Development</span>
            </Link>
          </div>
        </div>
      </section>

      {/* PLANS */}
      <section className="section alt" aria-labelledby="plans-h">
        <div className="wrap wide">
          <h2 id="plans-h" className="reveal">With ads, without ads, or fully run</h2>
          <p className="section-lead">Some clients want direct outreach only. Some want ads alongside it. Every plan starts from the same foundation.</p>
          <ol className="plans">
            {plans.map((p, i) => (
              <li key={i} className="spot">
                <span className="plan-n">Plan {i + 1}</span>
                <h3>{p.name}</h3>
                <p>{p.desc}</p>
              </li>
            ))}
          </ol>
          <p><Link className="text-link" href="/growth-system/">See what each plan includes</Link></p>
        </div>
      </section>

      {/* RESULTS */}
      <section className="section dark results-dark" aria-labelledby="res-h">
        <div className="wrap wide">
          <h2 id="res-h" className="reveal">Results we can show you</h2>
          <CasesSection limit={3} />
          <p><Link className="text-link light" href="/case-studies/">See all case studies</Link></p>
        </div>
      </section>

      {/* FAQs */}
      <FaqSection faqs={homeFaqs} />

      {/* CTA */}
      <CtaBand />
    </>
  )
}
