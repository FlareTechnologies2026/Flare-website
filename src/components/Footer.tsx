import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { GROWTH_MENU, BUILD_MENU, INDUSTRY_MENU, MENU_LABEL } from '@/lib/content'

const EMAIL = 'marketing@flaretechnologies.in'
const PHONE = '+91 78991 04311'
const WHATSAPP = 'https://wa.me/917899104311'
const LINKEDIN = 'https://www.linkedin.com/company/flaretechnologiespvtltd/'
const INSTAGRAM = 'https://www.instagram.com/flare_technologies/'

const cols: [string, string[]][] = [
  ['Lead generation & sales', [
    ...GROWTH_MENU[0][1],
    ...GROWTH_MENU[3][1],
    'partnerships',
  ]],
  ['Marketing & ads', [
    ...GROWTH_MENU[1][1],
    ...GROWTH_MENU[2][1],
    'paid-ads',
  ]],
  ['Custom Development', BUILD_MENU.flatMap(([, items]) => items)],
  ['Industries & locations', INDUSTRY_MENU.flatMap(([, items]) => items)],
  ['Company', ['growth-system', 'services', 'case-studies', 'about', 'careers', 'contact', 'blog/b2b-lead-generation-guide', 'b2b-technical-marketing']],
]

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="f-top">
          <div className="f-brand">
            <Image
              src="/assets/flare-logo.webp"
              width={160}
              height={78}
              alt="Flare Technologies"
              loading="lazy"
            />
            <p>Sales, marketing and custom software for B2B companies in India, the UAE and the US. One team, one system.</p>
            <p className="f-contact">
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              <br />
              <a href={WHATSAPP}>WhatsApp {PHONE}</a>
              <br />
              Bengaluru, India
            </p>
            <p className="f-social">
              <a href={LINKEDIN} rel="noopener">LinkedIn</a>
              <a href={INSTAGRAM} rel="noopener">Instagram</a>
            </p>
          </div>
          <div className="f-cols">
            {cols.map(([heading, items]) => (
              <div key={heading}>
                <p className="f-head">{heading}</p>
                <ul>
                  {items.map(slug => (
                    <li key={slug}>
                      <Link href={`/${slug}/`}>{MENU_LABEL[slug] ?? slug}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="f-bottom">
          <p>&copy; 2026 Flare Technologies. A brand of MS Digitflare IT Solutions (OPC) Private Limited.</p>
        </div>
      </div>
    </footer>
  )
}
