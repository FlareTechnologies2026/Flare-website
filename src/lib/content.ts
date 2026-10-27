import type { PageData } from './types'

export const SYSTEM_STEPS: [string, string][] = [
  ['Discovery call', 'A 30-minute call to understand your offer, your best customers and your sales targets.'],
  ['ICP survey and interview', 'You fill a short form, then we interview you to define exactly who buys from you and why.'],
  ['Lead lists built', 'We build verified lists of the decision-makers who match that profile, by role, company size and country.'],
  ['LinkedIn optimised', 'Your company page and founder profile are rewritten so prospects trust what they find when they check you.'],
  ['Website fixed for SEO, AEO and GEO', 'We fix your site so Google, ChatGPT and other AI assistants can find you and recommend you.'],
  ['Outreach and ads go live', 'LinkedIn and email outreach start, and ads run on Google, Meta, LinkedIn or ChatGPT if your plan includes them.'],
  ['Our sales team books your meetings', 'Real people reply, follow up and call your prospects, then put qualified meetings in your calendar.'],
]

export const PROJECTS: [string, string][] = [
  ['KatanaPay', 'Fintech'], ['GrowFX Pro', 'Fintech'],
  ['TronWeb Rentals', 'Marketplaces'], ['Housejoy', 'Marketplaces'], ['A4U / Architect 4 You', 'Marketplaces'],
  ['Coca-Cola B2B Beverage App', 'Enterprise systems'], ['Growthmind Realty', 'Enterprise systems'],
  ['Construction Managers', 'Enterprise systems'], ['Interior Managers', 'Enterprise systems'],
  ['CyberPower Technician App', 'Enterprise systems'],
  ['Mox Mind Interactive', 'Consumer apps'], ['Hungry Owl', 'Consumer apps'], ['Aishu\'s Kitchen', 'Consumer apps'],
  ['HOH108', 'Consumer apps'], ['Interior Plus', 'Consumer apps'], ['Behind the Curtain', 'Consumer apps'],
  ['Ifitmash', 'Consumer apps'],
  ['Palmo', 'AI & EdTech'], ['Classmate AI', 'AI & EdTech'],
  ['CSG Advisory', 'Growth & Marketing'],
  ['AI Launchpad', 'Growth & Marketing'],
]

export const BUILD_STEPS_MD = `1. **Scope:** a workshop to agree the problem, users, must-have features and budget.
2. **Design:** wireframes and clickable screens you approve before any code is written.
3. **Build:** two-week sprints with a working demo at the end of each one.
4. **Test:** functional, device and load testing before launch.
5. **Launch and support:** go-live, monitoring and a support plan after launch.`

export const MENU_LABEL: Record<string, string> = {
  'b2b-lead-generation-agency': 'B2B Lead Generation',
  'linkedin-lead-generation': 'LinkedIn Lead Generation',
  'appointment-setting': 'Appointment Setting',
  'demand-generation-agency': 'Demand Generation',
  'seo-aeo-geo': 'SEO, AEO & GEO',
  'social-media-management': 'Social Media Management',
  'linkedin-marketing-agency': 'LinkedIn Marketing',
  'founder-personal-branding': 'Founder Personal Branding',
  'paid-ads': 'Paid Ads overview',
  'paid-ads/google-ads': 'Google Ads',
  'paid-ads/meta-ads': 'Meta Ads',
  'paid-ads/chatgpt-ads': 'ChatGPT Ads',
  'paid-ads/app-install-campaigns': 'App Install Campaigns',
  'outsourced-sales-team': 'Outsourced Sales Team',
  'sales-consulting': 'Sales Consulting',
  'sales-training': 'Sales Training',
  'growth-consulting': 'Growth & GTM Consulting',
  'partnerships': 'White-label & Partnerships',
  'custom-development': 'Custom Development',
  'custom-development/web-development': 'Web & E-commerce',
  'custom-development/mobile-app-development': 'Mobile Apps',
  'custom-development/mvp-development': 'MVP Development',
  'custom-development/ui-ux-design': 'UI/UX Design',
  'custom-development/ai-automation': 'AI Automation & Agents',
  'custom-development/erp-implementation': 'ERP Implementation',
  'custom-development/cloud-devops': 'Cloud & DevOps',
  'custom-development/work': 'All 19 projects',
  'industries/b2b-saas': 'B2B SaaS & AI',
  'industries/fintech': 'Fintech',
  'industries/construction': 'Construction & Interiors',
  'industries/real-estate': 'Real Estate',
  'industries/manufacturing': 'Manufacturing',
  'dubai/lead-generation-company': 'Lead Generation in Dubai',
  'dubai/b2b-marketing-agency': 'B2B Marketing in Dubai',
  'dubai/seo-agency': 'SEO in Dubai',
  'dubai/software-development-company': 'Software Development in Dubai',
  'india/b2b-lead-generation-company': 'Lead Generation in India',
  'blog/b2b-lead-generation-guide': 'B2B Lead Generation Guide',
  'b2b-technical-marketing': 'What is B2B Technical Marketing?',
  'case-studies': 'Case Studies',
  'about': 'About',
  'careers': 'Careers',
  'contact': 'Contact',
  'growth-system': 'The Growth System',
  'services': 'All services',
  '': 'Home',
}

export const GROWTH_MENU: [string, string[]][] = [
  ['Lead Generation', ['b2b-lead-generation-agency', 'linkedin-lead-generation', 'appointment-setting', 'demand-generation-agency']],
  ['Marketing', ['seo-aeo-geo', 'social-media-management', 'linkedin-marketing-agency', 'founder-personal-branding']],
  ['Paid Ads', ['paid-ads/google-ads', 'paid-ads/meta-ads', 'paid-ads/chatgpt-ads', 'paid-ads/app-install-campaigns']],
  ['Sales & Consulting', ['outsourced-sales-team', 'sales-consulting', 'sales-training', 'growth-consulting']],
]

export const BUILD_MENU: [string, string[]][] = [
  ['Build', ['custom-development', 'custom-development/web-development', 'custom-development/mobile-app-development', 'custom-development/mvp-development', 'custom-development/ui-ux-design']],
  ['Automate & run', ['custom-development/ai-automation', 'custom-development/erp-implementation', 'custom-development/cloud-devops', 'custom-development/work']],
]

export const INDUSTRY_MENU: [string, string[]][] = [
  ['Industries', ['industries/b2b-saas', 'industries/fintech', 'industries/construction', 'industries/real-estate', 'industries/manufacturing']],
  ['Locations', ['dubai/lead-generation-company', 'dubai/b2b-marketing-agency', 'dubai/software-development-company', 'india/b2b-lead-generation-company']],
]

export const RESOURCE_MENU: [string, string[]][] = [
  ['Learn', ['blog/b2b-lead-generation-guide', 'b2b-technical-marketing', 'case-studies', 'careers']],
]

export interface CaseEntry {
  sector: string
  client: string
  logo?: string   // path relative to /public, e.g. '/assets/slashllm.png'
  title: string
  body: string
  stats: [string, string][]
  link: string
}

export const CASES: CaseEntry[] = [
  {
    sector: 'AI cybersecurity SaaS', client: 'SlashLLM',
    logo: '/assets/slashllm.png',
    title: '260+ qualified CISO-level leads in 45 days',
    body: 'We built an outbound system from zero for an AI security company: ICP, lists of security leaders, outreach and follow-up. The system went live in week one.',
    stats: [['260+', 'qualified leads'], ['45 days', 'to a full pipeline'], ['Week 1', 'system live']],
    link: 'b2b-lead-generation-agency',
  },
  {
    sector: 'Trade tech and logistics', client: 'Navaro',
    logo: '/assets/navaro.png',
    title: 'Brand and growth foundation for a unified import-export platform',
    body: 'An investor-ready brand, a 60-day growth playbook and a complete SEO foundation for a category-defining trade platform, delivered on a monthly retainer.',
    stats: [['60-day', 'growth playbook'], ['7+', 'deliverables in month one'], ['Ongoing', 'monthly retainer']],
    link: 'growth-consulting',
  },
  {
    sector: 'Consumer brands', client: 'Nykaa, Sugar Cosmetics, Veet, Fast&Up, Chic Nutrix, Tencha',
    logo: '/assets/nykaa.png',
    title: 'Creator-led content across 6 national consumer brands',
    body: 'Flare works as an ongoing content partner for national consumer brands, producing authentic, conversion-focused content through a creator presence of 11,700+ followers.',
    stats: [['6', 'national brands'], ['11,700+', 'creator followers'], ['Ongoing', 'partnership']],
    link: 'social-media-management',
  },
  {
    sector: 'Enterprise systems', client: 'Coca-Cola',
    logo: '/assets/cocacola.png',
    title: 'A B2B beverage ordering app',
    body: 'Our Custom Development team designed and built a B2B app for beverage ordering, one of 19 products the team has shipped.',
    stats: [['19', 'products shipped'], ['7 years', 'team experience'], ['B2B', 'ordering app']],
    link: 'custom-development',
  },
  {
    sector: 'Offshore company formation', client: 'CSG Advisory',
    logo: '/assets/csg.png',
    title: '159K+ LinkedIn impressions in 90 days, up 2,173%',
    body: 'We built a LinkedIn growth system from near zero for the director of a global business setup firm: profile positioning, content and consistent posting aimed at founders expanding internationally. Reach and followers grew steadily from the first weeks.',
    stats: [['159K+', 'impressions in 90 days'], ['2,173%', 'growth vs prior period'], ['1,300+', 'new followers']],
    link: 'founder-personal-branding',
  },
  {
    sector: 'AI solutions & business automation', client: 'AI Launchpad',
    logo: '/assets/ailaunchpad.png',
    title: '540+ new LinkedIn followers in 90 days, with outreach running in parallel',
    body: 'We run an ongoing growth system for an AI solutions company: LinkedIn and Instagram content, Sales Navigator prospecting, personalised outreach and follow-up. The audience grew steadily every week while conversations with decision-makers were started alongside it.',
    stats: [['540+', 'new followers in 90 days'], ['5,000+', 'LinkedIn audience'], ['3 channels', 'LinkedIn, Instagram, email']],
    link: 'linkedin-marketing-agency',
  },
]

export const GROUP_PARENT: Record<string, [string, string] | null> = {
  'Lead Generation': ['Growth System', 'growth-system'],
  'Marketing': ['Growth System', 'growth-system'],
  'Paid Ads': ['Growth System', 'growth-system'],
  'Sales & Consulting': ['Growth System', 'growth-system'],
  'Custom Development': ['Custom Development', 'custom-development'],
  'Industries': ['Services', 'services'],
  'Locations': ['Services', 'services'],
  'Resources': null,
  'Company': null,
  'Growth System': null,
}

// ---------------------------------------------------------------- ALL PAGES

const PAGES: PageData[] = [
  // HOME
  {
    slug: '',
    nav_group: null,
    kind: 'home',
    keyword: 'b2b lead generation and growth team',
    title: 'Flare Technologies | B2B Lead Generation & Growth Team',
    desc: 'We run your sales and marketing as one system: ICP research, LinkedIn, SEO, ads and a sales team that books qualified meetings in your calendar.',
    h1: 'Your sales and marketing team, already built.',
    lead: 'Flare runs the whole system that keeps your pipeline full: finding the right buyers, getting you found online, running ads and outreach, and a real sales team that books meetings for you. You focus on closing and delivering.',
    faqs: [
      ['What does Flare Technologies do?', 'Flare runs sales and marketing for B2B companies as one system. We research your ideal customer, build lead lists, fix your LinkedIn and website, run outreach and ads, and our sales team books qualified meetings for you. We also build custom software, apps and ERP systems through Custom Development.'],
      ['Is Flare an agency or a sales team?', 'Both, working as one. Our marketers make you visible and trusted, and our sales team talks to your prospects directly and books calls. You get one team and one report instead of three vendors who never speak to each other.'],
      ['Do I have to run paid ads?', 'No. Many clients choose the Outreach Engine plan, which uses LinkedIn, email and our sales team with no ad spend. You can add Google, Meta, LinkedIn or ChatGPT ads later if you want more volume.'],
      ['Which countries do you work in?', 'We work with clients across India, the UAE and the US, and we can target buyers in any country where your customers are. Our team is based in Bengaluru, India.'],
      ['Which industries do you work with?', 'Most of our work is B2B: SaaS and AI, fintech, construction and interiors, real estate, manufacturing, and trade and logistics. We also run campaigns for consumer brands in food, beauty and apps.'],
      ['How do I get started?', 'Book a strategy call. In 30 minutes we look at your current pipeline, tell you which plan fits, and send a written proposal within two working days.'],
    ],
  },

  // GROWTH SYSTEM
  {
    slug: 'growth-system',
    nav_group: 'Growth System',
    kind: 'system',
    keyword: 'done-for-you sales and marketing system',
    title: 'The Flare Growth System | Done-For-You Sales & Marketing',
    desc: 'One system that finds your buyers, makes you visible, runs outreach and ads, and books meetings through our sales team. Pick the plan that fits.',
    h1: 'One system that keeps your pipeline full.',
    lead: 'Most companies hire a lead-gen vendor, an ad agency, an SEO freelancer and a sales rep, then spend their week making them talk to each other. The Flare Growth System puts all of it under one team, with one plan and one monthly report.',
    sections: [
      ['Why a system beats a set of services', `Leads go cold when the people who find them, the people who market to them and the people who call them work in different companies. A prospect sees your ad, checks your LinkedIn, finds an outdated profile and leaves. Nobody notices, because nobody owns the whole path.

In the Flare Growth System, one team owns every step from the first ad or message to the meeting in your calendar. When replies drop, we can see whether the list, the message, the website or the follow-up is the problem, and fix it the same week.`],
      ['Three ways to run it', `Some clients want ads. Some only want direct outreach. Every plan starts from the same foundation, so you can move up a level without starting again.

| Building block | Outreach Engine | Outreach + Ads | Full Growth System |
| ICP survey and interview | Included | Included | Included |
| Verified lists of decision-makers | Included | Included | Included |
| LinkedIn profile and company page fixed | Included | Included | Included |
| Website fix: SEO, AEO and GEO basics | Included | Included | Included |
| LinkedIn and email outreach | Included | Included | Included |
| Our sales team talks to prospects and books meetings | Included | Included | Included |
| Paid ads: Google, Meta, LinkedIn, ChatGPT | — | Included | Included |
| Landing pages and conversion fixes | — | Included | Included |
| Ongoing SEO and content | — | — | Included |
| Social media and founder personal branding | — | — | Included |
| Monthly sales and growth consulting | — | — | Included |
| Best for | Founders who want meetings without ad spend | Teams ready to spend on ads for more volume | Companies that want sales and marketing fully run for them |`],
      ['What you need to give us', `- One 45-minute interview for the ICP profile
- Access to your LinkedIn page, website and, if you run ads, your ad accounts
- A calendar link where our sales team can book meetings
- 15 minutes a week to review replies and approve new messages`],
      ['What you get every month', `- A list of every meeting booked, with notes from the conversation
- Reply rates, meeting rates and cost per meeting for each channel
- What we changed this month and why
- A 30-minute review call with your account lead`],
      ['How the plans compare in practice', `**Outreach Engine** suits founders with a clear target list and a strong offer. Meetings come from direct conversations, and there is no ad budget to manage.

**Outreach + Ads** suits companies that want more volume or a faster start in a new market. Ads warm up prospects before outreach and retarget them afterwards.

**Full Growth System** suits companies that want sales and marketing run end to end: outreach, ads, search, content, social media, founder brand and monthly consulting, all managed by one team.`],
    ],
    faqs: [
      ['Do I have to run ads?', 'No. The Outreach Engine plan works without any ad spend. It uses LinkedIn, email and our sales team. You can add ads at any time.'],
      ['Can I start with outreach only and add ads later?', 'Yes. Every plan uses the same foundation of ICP research, lists, LinkedIn and website fixes, so moving to Outreach + Ads only adds the ad campaigns and landing pages.'],
      ['Who talks to my prospects?', 'Our in-house sales team. They are trained on your offer before any outreach starts, and you approve the scripts and messages they use.'],
      ['How soon do meetings start?', 'The foundation takes two to three weeks: interview, lists, LinkedIn and website fixes. Outreach starts after that, and first meetings usually follow within the first month of outreach. Timelines depend on your market and offer.'],
      ['What do you need from me?', 'One interview, access to your LinkedIn page and website, a calendar link, and about 15 minutes a week to review replies and approve messages.'],
      ['Do you work with companies outside India?', 'Yes. We work with clients in India, the UAE and the US, and run outreach to buyers in any country.'],
    ],
    related: ['b2b-lead-generation-agency', 'appointment-setting', 'paid-ads', 'seo-aeo-geo'],
  },

  // SERVICES OVERVIEW
  {
    slug: 'services',
    nav_group: null,
    kind: 'services',
    keyword: 'flare technologies services',
    title: 'Services | Flare Technologies',
    desc: 'Every Flare service in one place: lead generation, marketing, paid ads, sales teams and consulting, and custom software development.',
    h1: 'Everything we do, in one place.',
    lead: 'Our services fit together as one system, but you can start with any of them. Pick the area closest to your problem, or book a call and we will tell you where to start.',
    faqs: [
      ['Can I buy a single service?', 'Yes. Many clients start with one service, such as LinkedIn lead generation or a website rebuild, and add more once they see results.'],
      ['Do you work with consumer (B2C) brands?', 'Yes. Meta ads, Google ads, app install campaigns and social media management all serve consumer brands as well as B2B companies.'],
      ['Do you build software as well as marketing?', 'Yes. Custom Development builds web apps, mobile apps, MVPs, ERP systems and AI automation. Our team has 7 years of experience and has built 19 products across industries.'],
    ],
  },
]

// ---- Growth pages continued ----
PAGES.push(
  {
    slug: 'b2b-lead-generation-agency',
    nav_group: 'Lead Generation',
    kind: 'service',
    keyword: 'b2b lead generation agency',
    title: 'B2B Lead Generation Agency | Meetings Booked | Flare',
    desc: 'We find your ideal buyers, reach them on LinkedIn and email, and our sales team books qualified meetings in your calendar.',
    h1: 'B2B lead generation agency that books your sales meetings.',
    lead: 'Flare is a B2B lead generation agency that does more than hand you a spreadsheet. We define who buys from you, find those people, start the conversation on LinkedIn and email, and our sales team books qualified meetings straight into your calendar.',
    includes: ['ICP survey and interview', 'Verified decision-maker lists', 'LinkedIn and email outreach', 'Human sales team follow-up', 'Meetings booked in your calendar', 'Monthly pipeline report'],
    sections: [
      ['The problem with most lead generation', `Most founders have tried lead generation before. They bought a list, sent a few thousand emails, got a handful of replies and almost no meetings. The list was wrong, the message sounded like everyone else's, and nobody followed up when a prospect said "send me more details".

A lead is only useful when it turns into a conversation with someone who can buy. That is the part we focus on.`],
      ['How B2B lead generation works at Flare', 'STEPS'],
      ['What you get each month', `- A fresh list of verified decision-makers who match your ICP, refreshed as people change jobs
- Personalised LinkedIn and email sequences, written for your buyer and approved by you
- Daily reply handling by our sales team, including follow-up calls where it helps
- Qualified meetings booked in your calendar, each with notes on who the prospect is and what they need
- A monthly report: messages sent, reply rate, meetings booked and cost per meeting`],
      ['Lead generation with ads, or without', `Some clients want outreach only. Others want ads running alongside it. Both work.

- **Outreach only:** LinkedIn, email and our sales team. No ad spend. Best when your buyers are a defined list of companies.
- **Outreach + ads:** we add Google, Meta, LinkedIn or [ChatGPT ads](/paid-ads/chatgpt-ads/) so prospects have already seen you when our message arrives.

See all three plans on the [Growth System](/growth-system/) page.`],
      ['Results', `For SlashLLM, an AI security SaaS company, we built the full outbound system from scratch. It went live in week one and produced 260+ qualified CISO-level leads in 45 days. [Read the case studies](/case-studies/).`],
      ['Who this is for', `- B2B founders who are still the main salesperson and need a steady flow of meetings
- Companies entering a new market such as the UAE, the US or India
- Teams with a good product and no in-house sales or marketing team

We have run lead generation for SaaS, cybersecurity, fintech, manufacturing, construction and trade companies.`],
      ['Who we target, and how we build the list', `Every campaign starts from the ICP interview, not from a database. We turn your answers into filters that a list can be built from:

| Filter | Example |
| Industry | Logistics and freight forwarding |
| Company size | 50 to 500 employees |
| Country | UAE, Saudi Arabia, Qatar |
| Decision-maker | Head of Operations, COO, Managing Director |
| Influencer | Operations Manager, IT Manager |
| Trigger | New office, recent funding, hiring for operations roles |

We pull contacts from LinkedIn Sales Navigator and B2B data providers, remove anyone outside the profile, and verify each email address before use. Triggers such as hiring or expansion let us message companies when they are most likely to need you.`],
      ['What makes outreach get replies', `Most outreach fails because it talks about the sender. Ours talks about the buyer.

- **One reason to talk now.** Each message opens with something true about the prospect: a new market, a hire, a launch.
- **One problem, in their words.** Taken from the ICP interview and from the replies we receive.
- **One small ask.** A 15-minute call, not a demo, a deck and a contract.
- **A human follow-up.** When a prospect asks a question, a person on our team answers it the same day.

We test two or three message angles in every campaign and keep the one that books the most meetings, not the one with the most opens.`],
      ['How we report', `Every month you get one page with the numbers that matter: people contacted, reply rate, positive replies, meetings booked, meetings held and cost per meeting. Below that, the notes from our sales team on what prospects are saying, which objections come up, and what we will change next month.`],
      ['Lead generation agency vs hiring a sales rep', `| | Hiring a sales rep | Flare lead generation |
| Time to start | Two to four months to recruit and train | Outreach starts in two to three weeks |
| What you get | One person's time | Data, copywriting, LinkedIn, website fixes and a sales team |
| Risk | A wrong hire costs months | Monthly plan, adjusted as results come in |
| Management | Your time every week | One review call a month |

Many clients use Flare first, then hire in-house once the playbook is proven, and we hand over everything we built.`],
    ],
    faqs: [
      ['How do you find and verify leads?', 'We build lists from LinkedIn Sales Navigator and B2B data providers, filter them against your ICP, and verify every email before it is used. Lists are refreshed monthly so job changes do not waste your outreach.'],
      ['Do you use my LinkedIn account?', 'We can run outreach from your profile, from a team member\'s profile, or from both. Founder profiles usually get the best reply rates. We keep daily activity within LinkedIn\'s limits to protect the account.'],
      ['How many meetings a month can I expect?', 'It depends on your market size, deal value and offer. We give you an estimate after the ICP interview, based on list size and the reply rates we see in similar campaigns, and report the real number every month.'],
      ['Which countries can you target?', 'Any country where your buyers are. Most of our campaigns target India, the UAE, the wider Middle East, the US and the UK.'],
      ['Who replies to prospects?', 'Our in-house sales team. They answer questions, handle objections and book the meeting. You approve the scripts before anything goes out.'],
      ['What does B2B lead generation cost?', 'Pricing depends on the plan, the number of markets and whether ads are included. Book a strategy call and we will send a written proposal within two working days.'],
    ],
    related: ['linkedin-lead-generation', 'appointment-setting', 'growth-system', 'dubai/lead-generation-company', 'blog/b2b-lead-generation-guide'],
  },
  {
    slug: 'linkedin-lead-generation',
    nav_group: 'Lead Generation',
    kind: 'service',
    keyword: 'linkedin lead generation agency',
    title: 'LinkedIn Lead Generation Agency for B2B | Flare',
    desc: 'Done-for-you LinkedIn outreach: we fix your profile, target decision-makers and hand warm replies to our sales team to book meetings.',
    h1: 'LinkedIn lead generation agency for B2B companies.',
    lead: 'LinkedIn is where your buyers check who you are before they reply. We fix your profile first, then run personalised outreach to the exact decision-makers you want, and our sales team turns replies into booked meetings.',
    includes: ['Profile and company page rewrite', 'Sales Navigator targeting', 'Personalised connection and follow-up messages', 'InMail campaigns', 'Reply handling by our sales team', 'Weekly reporting'],
    sections: [
      ['Why LinkedIn works for B2B', `Your buyers are on LinkedIn with their real job title, company and seniority. That makes it possible to reach the head of procurement at a 200-person manufacturer in Dubai, rather than guessing from an email list.

It only works if your profile looks credible and your message sounds like a person, not a template. Most LinkedIn outreach fails on both.`],
      ['How our LinkedIn outreach works', `1. **Profile first.** We rewrite your headline, about section and featured posts so a prospect understands what you do in five seconds.
2. **Targeting.** We use Sales Navigator to build a list by role, seniority, company size, industry and country.
3. **Messages.** Short connection notes and two to three follow-ups, written for your buyer and approved by you.
4. **Replies.** Our sales team handles every reply, answers questions and books the meeting.
5. **Review.** Every week we look at acceptance rate, reply rate and meetings, and change what is not working.`],
      ['A sample first message', `"Hi Priya, I saw Acme is opening a Riyadh office this quarter. We help B2B teams book first meetings in Saudi without hiring locally first. Worth a 15-minute chat next week?"

Specific, short, and about them. Every message is written for your market and approved by you before it is sent.`],
      ['Keeping your account safe', `We keep daily connection requests and messages within LinkedIn's limits, warm up new accounts gradually, and never use tools that log in from unknown locations. If you prefer, outreach can run from a team member's profile instead of yours.`],
      ['Sales Navigator targeting, step by step', `LinkedIn Sales Navigator lets us filter buyers by title, seniority, function, company headcount, industry, geography and recent activity. We build saved searches for each segment of your ICP, then check a sample by hand to make sure the results really match. A good list beats a big list: two hundred well-chosen people usually book more meetings than two thousand loose ones.`],
      ['Connection requests, InMail and follow-up', `- **Connection requests** work for prospects who share groups, connections or interests with the sender.
- **InMail** reaches senior people who do not accept strangers, and works best with a short, specific note.
- **Follow-ups** arrive three to five days apart, each adding something new: a relevant result, a question, a short resource.
- **Engagement first** for very senior buyers: we comment on their posts for a week or two before reaching out.

Every reply, positive or not, is answered by a person on our team.`],
      ['What we measure every week', `| Metric | What it tells us |
| Acceptance rate | Whether the profile and targeting are right |
| Reply rate | Whether the message is relevant |
| Positive reply rate | Whether the offer is interesting |
| Meetings booked | Whether follow-up is working |

When one number drops, we know which part to fix, instead of guessing.`],
    ],
    faqs: [
      ['Is LinkedIn lead generation better than cold email?', 'They work best together. LinkedIn gets higher reply rates from senior buyers because they can see who you are. Email reaches people who rarely log in. Most of our campaigns use both.'],
      ['Do you use automation tools?', 'We use Sales Navigator for targeting and keep sending volumes within LinkedIn\'s limits. Replies are always handled by a person on our sales team.'],
      ['Whose profile sends the messages?', 'Usually the founder\'s, because buyers respond to founders. We can also use a sales or team member\'s profile.'],
      ['How quickly will I see replies?', 'Replies usually start in the first week of outreach, once your profile has been fixed. Meeting volume depends on your market and offer.'],
      ['Do you run LinkedIn ads too?', 'Yes, through our LinkedIn marketing service. Ads and outreach together mean prospects have seen your name before your message arrives.'],
    ],
    related: ['b2b-lead-generation-agency', 'linkedin-marketing-agency', 'founder-personal-branding', 'appointment-setting'],
  },
)

PAGES.push(
  {
    slug: 'appointment-setting',
    nav_group: 'Lead Generation',
    kind: 'service',
    keyword: 'b2b appointment setting services',
    title: 'B2B Appointment Setting Services | Human SDRs | Flare',
    desc: 'Our sales team calls, messages and follows up with your prospects, qualifies them and books meetings in your calendar. Real people, not bots.',
    h1: 'B2B appointment setting by a real sales team.',
    lead: 'Leads do not book themselves. Our sales development team follows up with your prospects by phone, LinkedIn and email, checks they are a fit, and puts qualified meetings in your calendar with notes on each one.',
    includes: ['Trained sales development reps', 'Phone, LinkedIn and email follow-up', 'Qualification against your criteria', 'Meetings booked in your calendar', 'Call notes for every meeting', 'No-show reminders'],
    sections: [
      ['Why meetings fall through', `A prospect replies "sounds interesting", then nothing happens. The founder is busy, the follow-up comes a week late, and the moment is gone. Most pipelines leak right here, between the first reply and the booked call.`],
      ['How our appointment setting works', `1. **Training.** We learn your offer, pricing range, competitors and the questions buyers ask.
2. **Qualification rules.** Together we agree what a qualified meeting is: role, company size, budget, timeline.
3. **Follow-up.** Our reps reply within hours, by phone, LinkedIn or email, whichever the prospect prefers.
4. **Booking.** Qualified prospects get a meeting in your calendar, with a confirmation and reminders.
5. **Hand-over.** Before each call you get a short note on who you are meeting and what they need.`],
      ['Works with any lead source', `We can follow up leads from our own [lead generation](/b2b-lead-generation-agency/), from your ads, website forms, events or an existing list in your CRM.`],
      ['A day in the life of your appointment setter', `Each morning your rep reviews new replies and form fills, answers questions, and calls prospects who asked for a call. Midday goes to follow-ups on earlier conversations and re-booking anyone who missed a meeting. The day ends with notes in your CRM for every conversation, so you can see exactly what was said and what happens next.`],
      ['What we need from you', `- A 60-minute briefing on your offer, pricing range, competitors and best customers
- Your answers to the ten questions buyers ask most often
- Access to your calendar with meeting types set up
- Feedback after meetings, so we can tighten qualification`],
      ['How we measure appointment setting', `We report meetings booked, meetings held, show-up rate and the share of meetings you rated as qualified. A meeting only counts when it meets the rules we agreed together.`],
    ],
    faqs: [
      ['Is your sales team in-house?', 'Yes. Our sales development reps are part of the Flare team, trained on each client\'s offer before they speak to any prospect.'],
      ['What counts as a qualified meeting?', 'We agree the rules with you before we start, usually role, company size, need and timeline. Meetings that do not meet them are not counted.'],
      ['Which time zones do you cover?', 'We agree working hours with you before launch, including Middle East and US time zones, so prospects hear back during their working day.'],
      ['Can you work leads we already have?', 'Yes. We can follow up leads from your CRM, website forms, events or ads, as well as leads we generate.'],
      ['Do you reduce no-shows?', 'Every booked meeting gets a confirmation and reminders, and our reps re-book prospects who miss a call.'],
    ],
    related: ['outsourced-sales-team', 'b2b-lead-generation-agency', 'linkedin-lead-generation', 'sales-training'],
  },
  {
    slug: 'demand-generation-agency',
    nav_group: 'Lead Generation',
    kind: 'service',
    keyword: 'demand generation agency',
    title: 'B2B Demand Generation Agency | Flare Technologies',
    desc: 'Content, ads and AI search that make buyers want to talk to you before outreach starts. Demand generation that feeds your sales pipeline.',
    h1: 'B2B demand generation agency.',
    lead: 'Lead generation reaches people who are ready to talk today. Demand generation makes more people ready. We combine content, ads and AI search so your buyers already know and trust you when our sales team gets in touch.',
    includes: ['Demand generation strategy', 'Thought-leadership content', 'Paid distribution on LinkedIn, Google and Meta', 'SEO, AEO and GEO', 'Retargeting', 'Pipeline reporting'],
    sections: [
      ['Demand generation vs lead generation', `| | Demand generation | Lead generation |
| Goal | Make more buyers want what you sell | Turn interested buyers into meetings |
| Main tools | Content, ads, SEO, AI search, founder brand | Lists, outreach, sales follow-up |
| Time to results | Builds over months | Starts within weeks |
| Measured by | Branded searches, inbound enquiries, reply rates | Meetings booked, pipeline value |

The two work best together, which is why both sit inside the [Growth System](/growth-system/).`],
      ['How we build demand', `1. **Message.** We turn the ICP interview into the three problems your buyers care about most.
2. **Content.** Posts, articles, short videos and case studies that answer those problems.
3. **Distribution.** Paid promotion on LinkedIn, Google and Meta to the companies on your target list.
4. **Search.** Pages that rank on Google and get cited by ChatGPT and other AI assistants.
5. **Capture.** Retargeting and outreach to the people who engaged.`],
      ['Signals that demand generation is working', `- More people search for your brand name on Google
- More inbound enquiries mention a post, article or video
- Outreach reply rates rise because prospects recognise you
- AI assistants start to mention you for questions in your category
- Sales cycles shorten because buyers arrive already informed`],
      ['Where demand generation fits', `Demand generation is the long-term engine of the [Full Growth System](/growth-system/) plan. It runs alongside outreach and ads, so short-term meetings and long-term demand grow together.`],
    ],
    faqs: [
      ['What is demand generation?', 'Demand generation is marketing that makes more buyers aware of a problem and want your solution, before they are ready to talk to sales. It uses content, ads, search and brand.'],
      ['How is it different from lead generation?', 'Lead generation captures buyers who are ready now and turns them into meetings. Demand generation grows the number of buyers who will be ready. One fills the funnel, the other converts it.'],
      ['How long does demand generation take?', 'Expect early signals such as engagement and branded searches in the first two months, with inbound enquiries building over three to six months.'],
      ['Do I need demand generation if I already do outreach?', 'Outreach works better when prospects recognise your name. Demand generation raises reply rates on the outreach you already do.'],
    ],
    related: ['b2b-lead-generation-agency', 'seo-aeo-geo', 'paid-ads', 'founder-personal-branding'],
  },
  {
    slug: 'seo-aeo-geo',
    nav_group: 'Marketing',
    kind: 'service',
    keyword: 'generative engine optimization agency',
    title: 'B2B SEO, AEO & GEO Agency | Get Found in AI | Flare',
    desc: 'Get found on Google, ChatGPT and Perplexity. We fix your website so search engines and AI assistants can find you and recommend you.',
    h1: 'Get found on Google, ChatGPT and AI search.',
    lead: 'Your buyers now search in two places: Google, and AI assistants like ChatGPT, Gemini and Perplexity. We fix your website so both can read it, trust it and recommend you, then keep it growing with content that answers the questions your buyers ask.',
    includes: ['Technical website audit', 'Fixes for Google and AI crawlers', 'Page-by-page keyword plan', 'Schema markup', 'Content and FAQs', 'Monthly ranking and AI-visibility report'],
    sections: [
      ['SEO, AEO and GEO in plain words', `Think of your website as a shop. SEO makes sure the shop is on the main road and the sign is readable. AEO makes sure that when someone asks a question at the door, your shop gives the clearest answer. GEO makes sure that when people ask an AI assistant "which shop should I go to?", it names you.

| | What it stands for | What it does | Where it shows up |
| SEO | Search engine optimisation | Helps your pages rank in Google results | Google and Bing results |
| AEO | Answer engine optimisation | Shapes your content into direct answers | Google's answer boxes and AI Overviews, voice assistants |
| GEO | Generative engine optimisation | Makes AI assistants understand, trust and cite you | ChatGPT, Gemini, Perplexity, Claude |`],
      ['Why this keeps your business running', `Many B2B websites look fine to people but send Google an almost empty page, because the content is assembled in the browser. AI assistants read even less. If they cannot read you, they cannot recommend you, and buyers who ask "best lead generation agency in Dubai" will hear about your competitors instead.`],
      ['What we fix', `- **Readability:** every page sent fully written to Google and AI crawlers
- **One topic per page:** each page targets one search phrase, so your own pages never compete
- **Titles, descriptions and headings** written around what buyers type
- **Schema markup:** hidden labels that tell search engines "this is a company, this is a service, these are FAQs"
- **Speed and mobile** fixes for Core Web Vitals
- **FAQs and comparison tables** that AI assistants can quote
- **Directory and review profiles** such as Clutch, which AI assistants rely on`],
      ['How we work', `1. **Audit:** crawl your site and test how Google and AI assistants see it today.
2. **Plan:** map one search phrase to each page and list the pages you are missing.
3. **Fix:** technical fixes, schema and on-page rewrites.
4. **Publish:** new pages and articles that answer your buyers' questions.
5. **Track:** monthly rankings, traffic and how often AI assistants mention you.`],
      ['How AI assistants decide who to recommend', `ChatGPT, Gemini and Perplexity build answers from pages they can read and sources they trust. Three things raise your chances of being named:

- **Clear facts on your own site:** who you are, what you do, for whom, where, at what scale, written in plain sentences and marked up with schema.
- **Consistency across the web:** the same description on LinkedIn, directories, review sites and press.
- **Third-party mentions:** listings on Clutch and similar directories, "best agency" articles, reviews and discussions where buyers ask for recommendations.

Our GEO work covers all three, and we track a fixed set of buyer questions each month to see whether you are being mentioned.`],
      ['Common problems we find in audits', `- Pages that send Google an almost empty shell because they are built entirely in JavaScript
- Every page sharing the same title and description
- No canonical tags, so the same page exists at several addresses
- Missing sitemap or robots file
- Service pages with one paragraph and no FAQs
- No schema, so search engines must guess what the business is
- Slow pages on mobile because of large images and scripts`],
      ['What a first month looks like', `1. Week 1: crawl and technical audit, AI-visibility baseline on 20 to 30 buyer questions.
2. Week 2: keyword plan with one search phrase per page, and the list of missing pages.
3. Week 3: technical fixes: rendering, titles, descriptions, canonicals, sitemap, schema.
4. Week 4: first rewritten service pages and FAQs published; report and plan for month two.`],
    ],
    faqs: [
      ['What is GEO?', 'GEO, or generative engine optimisation, is the work of making AI assistants like ChatGPT, Gemini and Perplexity understand your business and mention it in their answers. It relies on clear website content, structured data and mentions on trusted third-party sites.'],
      ['What is AEO?', 'AEO, or answer engine optimisation, shapes your content into clear, direct answers so Google\'s answer boxes, AI Overviews and voice assistants can use them.'],
      ['Do I still need SEO if people use ChatGPT?', 'Yes. AI assistants lean heavily on pages that already rank well and are easy to read, so good SEO is the base GEO is built on.'],
      ['How long does SEO take?', 'Technical fixes help within weeks. New pages usually take three to six months to reach steady rankings, depending on competition.'],
      ['How do you measure AI visibility?', 'We test a fixed set of buyer questions in ChatGPT, Gemini and Perplexity every month and track how often you are mentioned and cited, alongside Google rankings and traffic.'],
      ['Can you fix a website built on Lovable or another React builder?', 'Yes. These sites often send search engines a nearly empty page. We set up pre-rendering or rebuild key pages so every page is readable without JavaScript.'],
    ],
    related: ['demand-generation-agency', 'custom-development/web-development', 'dubai/seo-agency', 'b2b-technical-marketing'],
  },
)

PAGES.push(
  {
    slug: 'social-media-management',
    nav_group: 'Marketing',
    kind: 'service',
    keyword: 'social media management agency',
    title: 'Social Media Management Agency | B2B & B2C | Flare',
    desc: 'Content calendars, design, video and community management for LinkedIn, Instagram and more, run by one team and reported every month.',
    h1: 'Social media management that builds trust and brings enquiries.',
    lead: 'We plan, create and publish your social media every week, reply to your community, and report what it is doing for your business. For B2B brands that means LinkedIn first. For consumer brands it means Instagram, reels and creators.',
    includes: ['Monthly content calendar', 'Post design and short video', 'Copywriting', 'Publishing and community replies', 'Creator partnerships for consumer brands', 'Monthly performance report'],
    sections: [
      ['For B2B companies', `B2B buyers check your company page and your founder's profile before they reply to anything. We keep both active with posts that show your work, your thinking and your results, so outreach lands on a page that looks alive.`],
      ['For consumer brands', `For consumer brands we run Instagram and short video with a creator-led approach. Flare has worked as an ongoing content partner across six national consumer brands, including Nykaa, Sugar Cosmetics, Veet and Fast&Up, using a creator presence of 11,700+ followers. [See case studies](/case-studies/).`],
      ['What happens each month', `1. Planning call and content calendar for the month
2. Design, copy and video production
3. Your approval in one shared calendar
4. Publishing at the times your audience is active
5. Daily community replies and a monthly report`],
      ['How we measure social media', `Likes are not the goal. We report reach among your target audience, profile visits, website clicks, enquiries and, for consumer brands, sales from social. Each month we show which posts moved those numbers, and plan more of what worked.`],
      ['What we need from you', `- A kick-off call on your brand, audience and goals
- Brand assets: logo, colours, fonts and photos
- A contact who can approve posts within two working days
- Access to your social accounts with the right permissions`],
    ],
    faqs: [
      ['Which platforms do you manage?', 'LinkedIn, Instagram, Facebook, X and YouTube. We recommend the two or three where your buyers actually spend time.'],
      ['How many posts do I get?', 'Typical plans range from three to five posts a week per platform, plus stories and short video where they fit.'],
      ['Who creates the content?', 'Our in-house content team. For consumer brands we also work with creators.'],
      ['Do you reply to comments?', 'Yes. Community management is included: we reply to comments and messages in your brand voice.'],
    ],
    related: ['linkedin-marketing-agency', 'founder-personal-branding', 'demand-generation-agency', 'paid-ads/meta-ads'],
  },
  {
    slug: 'linkedin-marketing-agency',
    nav_group: 'Marketing',
    kind: 'service',
    keyword: 'linkedin marketing agency',
    title: 'LinkedIn Marketing Agency for B2B | Flare Technologies',
    desc: 'LinkedIn company page management, thought leadership, ads and founder branding that build your B2B pipeline on LinkedIn.',
    h1: 'LinkedIn marketing agency for B2B.',
    lead: 'Your buyers are on LinkedIn every day. We run your company page, write thought-leadership posts for your leadership team, and run LinkedIn ads that reach decision-makers by job title, company and seniority.',
    includes: ['Company page management', 'Thought-leadership content', 'LinkedIn ads', 'Founder personal brand', 'Analytics and reporting', 'Community management'],
    sections: [
      ['What we run on LinkedIn', `- Company page: posts, articles and events that make your page worth following
- Founder and leadership posts: content that builds the person behind the brand
- LinkedIn ads: sponsored content, lead gen forms, document ads and retargeting
- LinkedIn newsletter for subscribers
- Analytics: which content drives profile visits and enquiries`],
      ['Content that works on LinkedIn for B2B', `| Format | Best for |
| Text posts | Opinions, lessons and short stories from leaders |
| Document carousels | Frameworks, checklists and step-by-step guides |
| Short video | Product walkthroughs and client stories |
| Newsletters | Building a subscribed audience over time |
| Case studies | Proof for buyers who are comparing options |

We plan the mix around what your buyers save, share and comment on, then double down on what brings profile visits and enquiries.`],
      ['LinkedIn ads formats we use', `- **Lead gen forms:** pre-filled forms inside LinkedIn, the lowest-friction way to collect B2B leads
- **Document ads:** a guide or checklist people can read in the feed and unlock with their details
- **Conversation ads:** a short, choose-your-path message for high-value audiences
- **Retargeting:** case-study ads for people who visited your website or watched your videos`],
    ],
    faqs: [
      ['Is LinkedIn marketing worth it for B2B?', 'Yes. LinkedIn is where your buyers are with their real job titles and company. Organic posts build trust over time; ads reach the right people immediately.'],
      ['How does LinkedIn marketing differ from LinkedIn lead generation?', 'LinkedIn marketing is about building your brand and presence through content and ads. LinkedIn lead generation is about direct outreach to specific decision-makers. They work best together.'],
      ['Do you run LinkedIn ads separately from content?', 'Yes. You can hire us for ads only, content only, or both.'],
    ],
    related: ['founder-personal-branding', 'linkedin-lead-generation', 'paid-ads/chatgpt-ads', 'social-media-management'],
  },
  {
    slug: 'founder-personal-branding',
    nav_group: 'Marketing',
    kind: 'service',
    keyword: 'founder personal branding',
    title: 'Founder Personal Branding for B2B | LinkedIn | Flare',
    desc: 'We write and post for founders on LinkedIn: profile rewrite, weekly content and a brand that makes outreach get better replies.',
    h1: 'Founder personal branding that opens doors.',
    lead: 'When buyers check who sent the message, they find you. A strong founder presence on LinkedIn raises reply rates, brings inbound enquiries and builds the trust that makes every other channel work better.',
    includes: ['LinkedIn profile rewrite', 'Weekly content strategy', 'Post writing and scheduling', 'Analytics and growth tracking', 'Outreach profile coordination', 'Monthly performance report'],
    sections: [
      ['Why founder branding matters for B2B', `Buyers buy from people they trust. When a message arrives from a founder with 10,000 followers, a clear voice and posts their buyers read, the reply rate is three to five times higher than from a cold account. The profile is part of the pitch.`],
      ['What we write about', `Posts come from your real work, not trend lists:

- Lessons from deals won and lost
- Opinions on how your industry is changing
- Behind-the-scenes of how your team solves problems
- Client results, told as stories with permission
- Mistakes you made and what you changed

Each month we plan a mix of these so your profile shows expertise, personality and proof.`],
      ['Your profile, rewritten', `- **Headline:** what you help whom do, not just your title
- **About:** your story, who you serve and how to reach you, in under 300 words
- **Featured:** your best case study, a talk or article, and a booking link
- **Banner:** one line on what you do, in your brand colours`],
      ['Personal branding and lead generation together', `A strong profile lifts every other channel. Prospects who receive a message from a founder with an active, credible profile reply more often. That is why founder branding sits inside the [Growth System](/growth-system/), alongside [LinkedIn lead generation](/linkedin-lead-generation/).`],
    ],
    faqs: [
      ['Do you write as me or do I write?', 'We write in your voice, based on a monthly interview or voice notes. You approve everything before it goes out.'],
      ['How quickly does founder branding work?', 'Expect profile improvements to lift reply rates in weeks, and follower growth to build over three to six months with consistent posting.'],
      ['Do you post for multiple founders?', 'Yes. Many clients run content for the founder and one or two senior team members.'],
    ],
    related: ['linkedin-marketing-agency', 'linkedin-lead-generation', 'social-media-management', 'demand-generation-agency'],
  },
)

// ---- Paid Ads ----
PAGES.push(
  {
    slug: 'paid-ads',
    nav_group: 'Paid Ads',
    kind: 'service',
    keyword: 'performance marketing agency',
    title: 'Paid Ads & Performance Marketing Agency | Flare',
    desc: 'Google, Meta, LinkedIn and ChatGPT ads planned around one goal: qualified leads and sales. For B2B companies and consumer brands.',
    h1: 'Paid ads that bring leads and sales, not just clicks.',
    lead: 'We run Google, Meta, LinkedIn and ChatGPT ads for B2B companies and consumer brands. Every campaign is planned around one number, cost per qualified lead or cost per sale, and connected to the landing page and follow-up that turn clicks into revenue.',
    includes: ['Platform and budget plan', 'Campaign setup and tracking', 'Ad copy and creative', 'Landing pages', 'Weekly optimisation', 'Monthly revenue report'],
    sections: [
      ['Which ad platform fits which goal', `| Platform | Best for | Typical use |
| Google Ads | Capturing people already searching for what you sell | Search ads for high-intent phrases, retargeting |
| Meta Ads | Consumer brands and broad B2B audiences | Product launches, lead forms, retargeting with video |
| LinkedIn Ads | Reaching B2B buyers by job title and company | Lead gen forms, account-based campaigns |
| ChatGPT Ads | Being present where buyers ask AI for recommendations | Early-mover visibility in AI conversations |
| App install campaigns | Consumer apps on Android and iOS | Google App Campaigns, Meta app ads |

Most clients start with one or two platforms and add more once costs are proven.`],
      ['How we run paid ads', `1. **Tracking first.** Conversion tracking, CRM link-up and a clear definition of a qualified lead or sale.
2. **Offer and landing page.** An offer worth clicking and a page built to convert it.
3. **Launch small.** Two or three audiences and messages per platform.
4. **Optimise weekly.** Cut what does not convert, move budget to what does.
5. **Report on revenue.** Cost per qualified lead, cost per sale and return on ad spend.`],
      ['Ads inside the Growth System', `For B2B clients, ads usually run alongside outreach. Prospects see your ad, then get a message from our team, then see a retargeting ad with a case study. Each touch makes the next one more likely to work. See the [Outreach + Ads plan](/growth-system/).`],
      ['Ads for B2B and for consumer brands', `**B2B companies** usually run fewer, tighter campaigns: search ads on high-intent phrases, LinkedIn ads to target accounts, and retargeting with case studies. Success is measured in qualified leads and meetings.

**Consumer brands** run more creative and broader audiences on Meta and Google, with success measured in purchases, return on ad spend and repeat customers.`],
      ['Why ads stop working, and what we check', `1. Tracking is broken, so the platform optimises for the wrong thing.
2. The landing page does not match the ad.
3. The offer is not strong enough to act on.
4. Creative has gone stale and needs refreshing.
5. Budget is spread across too many campaigns to learn.

We check these five before we recommend spending more.`],
    ],
    faqs: [
      ['Which ad platform is best for B2B?', 'LinkedIn for targeting by job title, Google for buyers already searching, and Meta for broad, low-cost reach and retargeting. Most B2B plans use two of the three.'],
      ['What is the minimum ad budget?', 'It depends on the platform and market. We recommend a test budget that can produce enough clicks to learn from in four weeks, and we set this out in the proposal before you spend anything.'],
      ['Who owns the ad accounts?', 'You do. We work inside ad accounts registered to your business, so all data and history stay with you.'],
      ['How do you measure results?', 'By cost per qualified lead, cost per sale and return on ad spend, tracked from the ad to your CRM, not by clicks or impressions alone.'],
      ['Do you create the ads?', 'Yes. Our team writes the copy and produces the images and short videos for each campaign.'],
    ],
    related: ['paid-ads/google-ads', 'paid-ads/meta-ads', 'paid-ads/chatgpt-ads', 'linkedin-marketing-agency'],
  },
  {
    slug: 'paid-ads/google-ads',
    nav_group: 'Paid Ads',
    kind: 'service',
    keyword: 'google ads agency',
    title: 'Google Ads Agency for Leads & Sales | Flare Technologies',
    desc: 'Search, Performance Max and retargeting campaigns built around qualified leads and sales, with tracking from click to CRM.',
    h1: 'Google Ads agency for leads and sales.',
    lead: 'Google Ads reaches buyers at the moment they search for what you sell. We build campaigns around the phrases that bring revenue, not just traffic, and track every lead from the first click to your CRM.',
    includes: ['Keyword and competitor research', 'Search and Performance Max campaigns', 'Ad copy testing', 'Conversion tracking', 'Landing pages', 'Weekly optimisation'],
    sections: [
      ['What we do', `- Research the phrases your buyers search and what competitors bid on
- Build tightly grouped search campaigns with matching ads and landing pages
- Set up Performance Max and retargeting where they make sense
- Add negative keywords every week to stop paying for the wrong searches
- Track form fills, calls and WhatsApp clicks as conversions`],
      ['Google Ads plus SEO', `Ads bring leads from day one. [SEO](/seo-aeo-geo/) brings leads that cost nothing per click but take months to build. We use ads data to show which phrases convert, then target those phrases with SEO pages.`],
    ],
    faqs: [
      ['How quickly do Google Ads work?', 'Ads can bring traffic on the day they launch. Expect two to four weeks of testing before cost per lead settles.'],
      ['Do you charge a percentage of ad spend?', 'Pricing is set out in your proposal. We agree a management fee up front so you know the cost before you start.'],
      ['Can you fix an existing Google Ads account?', 'Yes. We start with an audit of your current account, then fix tracking, structure and wasted spend.'],
      ['Do Google Ads work for B2B?', 'Yes, for buyers who search for solutions. Search ads on specific, high-intent phrases usually work best for B2B.'],
    ],
    related: ['paid-ads', 'seo-aeo-geo', 'paid-ads/meta-ads', 'b2b-lead-generation-agency'],
  },
  {
    slug: 'paid-ads/meta-ads',
    nav_group: 'Paid Ads',
    kind: 'service',
    keyword: 'meta ads agency',
    title: 'Meta Ads Agency | Facebook & Instagram Ads | Flare',
    desc: 'Facebook and Instagram ads for consumer brands and B2B companies: creative, targeting and tracking built around sales and qualified leads.',
    h1: 'Meta ads agency for Facebook and Instagram.',
    lead: 'Meta ads reach people before they start searching. We plan the creative, audiences and offers for Facebook and Instagram, and judge every campaign on sales or qualified leads, not likes.',
    includes: ['Creative strategy', 'Static, carousel and video ads', 'Audience building and lookalikes', 'Pixel and Conversions API setup', 'Retargeting', 'Weekly optimisation'],
    sections: [
      ['For consumer brands', `For D2C and consumer brands, creative is the targeting. We produce several angles for each product, test them quickly, and scale the ones that sell. We track purchases through the Meta pixel and Conversions API so results are not lost to privacy settings.`],
      ['For B2B companies', `For B2B, Meta works best as low-cost reach and retargeting: lead forms for broad audiences, and case-study ads for people who already visited your site or engaged with our outreach.`],
      ['When ads run but sales do not', `If your ads get clicks but no purchases, the problem is often the landing page, the offer or the tracking rather than the ad. We check all three before we spend more.`],
    ],
    faqs: [
      ['Do Meta ads work for B2B?', 'Yes, mainly for retargeting and lead forms aimed at broad business audiences. For precise job-title targeting, LinkedIn is usually better.'],
      ['Do you make the ad creative?', 'Yes. We write and design static, carousel and video ads, and work with creators for consumer brands.'],
      ['Why are my ads getting clicks but no sales?', 'Usually the landing page, the offer or broken tracking. We audit all three before increasing spend.'],
      ['Who owns the ad account?', 'You do. We work inside your business\'s ad account so all data stays with you.'],
    ],
    related: ['paid-ads', 'social-media-management', 'paid-ads/app-install-campaigns', 'paid-ads/google-ads'],
  },
  {
    slug: 'paid-ads/chatgpt-ads',
    nav_group: 'Paid Ads',
    kind: 'service',
    keyword: 'chatgpt ads agency',
    title: 'ChatGPT Ads Agency for B2B Brands | Flare Technologies',
    desc: 'Advertise inside ChatGPT, where buyers now ask for recommendations. We plan, launch and measure ChatGPT ad campaigns for B2B brands.',
    h1: 'ChatGPT ads agency for B2B brands.',
    lead: 'Buyers now ask ChatGPT which tools and suppliers to use. OpenAI sells ads inside ChatGPT, which puts your brand in front of people at the moment they ask. We help you test this new channel early and measure what it brings.',
    includes: ['Channel fit check', 'Campaign setup', 'Ad copy written for conversational answers', 'Landing pages', 'Tracking', 'Monthly report'],
    sections: [
      ['What ChatGPT ads are', `ChatGPT ads are sponsored placements shown inside ChatGPT conversations, sold by OpenAI through its own advertising platform. They appear when people ask questions related to what you sell, which makes them closer to search ads than to social ads.`],
      ['Who they suit', `- B2B brands whose buyers research suppliers in ChatGPT
- Companies already running Google search ads who want to reach the same intent in AI
- Brands entering a category early, before competitors raise prices`],
      ['How we run them', `1. Check whether your buyers ask ChatGPT about your category, using the same questions we track for [GEO](/seo-aeo-geo/).
2. Write ads and landing pages that answer the question the buyer asked.
3. Launch a small test with clear tracking.
4. Compare cost per qualified lead against your other channels before scaling.`],
    ],
    faqs: [
      ['What are ChatGPT ads?', 'Sponsored placements inside ChatGPT conversations, sold by OpenAI. They appear when people ask about topics related to your offer.'],
      ['Are ChatGPT ads worth it?', 'It is a new channel, so the honest answer is: test it. Early advertisers face less competition. We start small and compare results with your other channels.'],
      ['How is this different from GEO?', 'GEO earns unpaid mentions in AI answers by improving your website and reputation. ChatGPT ads are paid placements. Many brands use both.'],
      ['Do you also run Google and LinkedIn ads?', 'Yes. ChatGPT ads usually sit alongside Google and LinkedIn campaigns in one plan.'],
    ],
    related: ['paid-ads', 'seo-aeo-geo', 'paid-ads/google-ads', 'linkedin-marketing-agency'],
  },
  {
    slug: 'paid-ads/app-install-campaigns',
    nav_group: 'Paid Ads',
    kind: 'service',
    keyword: 'app install campaigns',
    title: 'App Install Campaigns for Android & iOS | Flare',
    desc: 'Google App Campaigns and Meta app ads that bring installs and active users for consumer apps, tracked to sign-ups and revenue.',
    h1: 'App install campaigns for Android and iOS.',
    lead: 'Installs are easy to buy. Active users are not. We run app install campaigns on Google and Meta that are judged on sign-ups, first actions and revenue, not just downloads.',
    includes: ['Google App Campaigns', 'Meta app ads', 'Store listing improvements', 'Attribution setup', 'Creative testing', 'Cohort reporting'],
    sections: [
      ['How we run app campaigns', `1. **Tracking:** an attribution tool and in-app events such as sign-up, first transaction and subscription.
2. **Store listing:** screenshots, title and description improved to convert store visitors.
3. **Creative:** short videos and images tested in batches.
4. **Optimise for value:** campaigns bid on in-app events, not just installs.
5. **Report by cohort:** what users from each campaign did in their first 7 and 30 days.`],
      ['Experience', `Flare has run app install acquisition across Android and iOS for a fintech lending and investing app, and we work with consumer apps in astrology and finance.`],
    ],
    faqs: [
      ['Do you run campaigns on both Android and iOS?', 'Yes, through Google App Campaigns and Meta app ads, with separate tracking for each platform.'],
      ['How do you measure app campaigns?', 'By cost per install and, more importantly, cost per sign-up, first transaction or subscription, reported by cohort.'],
      ['Can you improve our app store listing?', 'Yes. Better screenshots, titles and descriptions lift the share of store visitors who install.'],
    ],
    related: ['paid-ads', 'paid-ads/meta-ads', 'custom-development/mobile-app-development', 'industries/fintech'],
  },
)

// ---- Sales & Consulting ----
PAGES.push(
  {
    slug: 'outsourced-sales-team',
    nav_group: 'Sales & Consulting',
    kind: 'service',
    keyword: 'outsourced sales team',
    title: 'Outsourced Sales Team for B2B Companies | Flare',
    desc: 'A trained Flare sales team that prospects, follows up and books meetings for you, without the cost and delay of hiring in-house.',
    h1: 'An outsourced sales team that runs your pipeline.',
    lead: 'Hiring and training sales reps takes months, and the first hire is often the wrong one. Flare gives you a trained sales team that starts in weeks: they prospect, follow up, qualify and book meetings, while you close.',
    includes: ['Sales development reps', 'Sales manager oversight', 'Scripts and sequences', 'CRM setup and hygiene', 'Weekly pipeline review', 'Hand-over notes for every meeting'],
    sections: [
      ['When an outsourced team makes sense', `- You are the founder and still the only person selling
- You want to test a new market before hiring locally
- Your in-house team closes well but does not have time to prospect
- You hired a rep before and it did not work`],
      ['How it works', `1. **Onboarding:** your offer, pricing, competitors and objections, turned into scripts and a playbook.
2. **Pipeline setup:** your CRM organised so every lead and call is recorded.
3. **Daily work:** prospecting, follow-ups, calls and meeting booking.
4. **Weekly review:** what buyers are saying, what is working, what changes next week.
5. **Hand-over:** meetings land in your calendar with notes, or our team runs them for you if agreed.`],
      ['Part of the Growth System', `Our sales team is the last step of every [Growth System](/growth-system/) plan. You can also hire it on its own to work leads you already have.`],
    ],
    faqs: [
      ['Is the team dedicated to my company?', 'Your account has named reps who learn your business. Team size depends on your plan and lead volume.'],
      ['Do you close deals as well?', 'Our core work is booking qualified meetings. Where agreed, our team can also run discovery calls and follow up after your sales calls.'],
      ['Which CRM do you use?', 'We work in your CRM, or set one up if you do not have one, so the pipeline stays yours.'],
      ['How is this different from hiring?', 'You skip months of recruiting and training, get a manager and a playbook from day one, and can scale up or down by plan.'],
    ],
    related: ['appointment-setting', 'sales-training', 'sales-consulting', 'b2b-lead-generation-agency'],
  },
  {
    slug: 'sales-consulting',
    nav_group: 'Sales & Consulting',
    kind: 'service',
    keyword: 'b2b sales consulting',
    title: 'B2B Sales Consulting | Fix Your Sales Process | Flare',
    desc: 'We find where your pipeline leaks and fix it: ICP, offer, sales process, scripts, CRM and reporting, with a plan your team can run.',
    h1: 'B2B sales consulting that fixes the pipeline you have.',
    lead: 'If leads come in but deals do not close, the problem is usually the process, not the people. We look at your whole pipeline, find where deals leak, and give your team a clear process, scripts and reports they can run every week.',
    includes: ['Pipeline and CRM audit', 'ICP and offer review', 'Sales process design', 'Scripts and objection handling', 'KPI dashboard', 'Follow-up sessions'],
    sections: [
      ['What we look at', `- **Who you sell to:** is your ideal customer defined, and does your team follow it?
- **The offer:** is it clear, priced right and easy to say yes to?
- **The process:** what happens between first reply and signed contract, and how long each stage takes
- **The tools:** is your CRM used, and can you trust its numbers?
- **The people:** are the right people doing the right stage?`],
      ['What you get', `1. A written diagnosis of where your pipeline leaks, with numbers
2. A sales process with clear stages and exit criteria
3. Scripts, email templates and an objection-handling guide
4. A weekly KPI dashboard
5. Follow-up sessions to make sure the changes stick`],
    ],
    faqs: [
      ['How long does a sales consulting project take?', 'Most projects run four to eight weeks: two weeks of diagnosis, then implementation and follow-up.'],
      ['Do you work with our existing team?', 'Yes. We interview your team, listen to calls where possible and build the process with them.'],
      ['Can you also train our team?', 'Yes. Sales training is often the next step after consulting.'],
    ],
    related: ['sales-training', 'growth-consulting', 'outsourced-sales-team', 'growth-system'],
  },
  {
    slug: 'sales-training',
    nav_group: 'Sales & Consulting',
    kind: 'service',
    keyword: 'b2b sales training',
    title: 'B2B Sales Training for Founders & Teams | Flare',
    desc: 'Practical B2B sales training: prospecting, LinkedIn outreach, discovery calls, objection handling and follow-up, built on your own deals.',
    h1: 'B2B sales training built on your real deals.',
    lead: 'Generic sales training is forgotten in a week. We train founders and sales teams on their own market, their own offer and their own deals, using the same outreach and calling methods our sales team uses every day.',
    includes: ['Skills assessment', 'Live workshops', 'Role-play on real scenarios', 'LinkedIn and email outreach training', 'Call reviews', 'Playbook for your team'],
    sections: [
      ['What we train', `- Prospecting and building target lists
- LinkedIn and email outreach that gets replies
- Discovery calls: asking questions that uncover real need and budget
- Handling objections on price, timing and competitors
- Follow-up and closing without pressure`],
      ['How training runs', `1. Assessment of current skills and call recordings
2. Live workshops, online or on site
3. Role-play using your real objections
4. Call reviews for four weeks after training
5. A written playbook your team keeps`],
    ],
    faqs: [
      ['Is training online or on site?', 'Both are possible. Most programmes are live online sessions, with on-site workshops available in Bengaluru and by arrangement elsewhere.'],
      ['Who is the training for?', 'Founders who sell, new sales reps, and experienced teams moving into a new market or channel such as LinkedIn.'],
      ['Do you train on LinkedIn outreach?', 'Yes. LinkedIn profiles, targeting and messaging are a core module.'],
    ],
    related: ['sales-consulting', 'outsourced-sales-team', 'linkedin-lead-generation', 'founder-personal-branding'],
  },
  {
    slug: 'growth-consulting',
    nav_group: 'Sales & Consulting',
    kind: 'service',
    keyword: 'go-to-market strategy consulting',
    title: 'Growth & Go-To-Market Consulting | Flare Technologies',
    desc: 'Go-to-market strategy, growth advisory and technology roadmaps for founders launching products or entering new markets.',
    h1: 'Growth and go-to-market consulting.',
    lead: 'Before you spend on marketing or hire a team, get the plan right: who to sell to first, what to say, which channels to use and which systems you need. We build that plan with you, grounded in research rather than guesswork.',
    includes: ['Market and competitor research', 'ICP and positioning', 'Go-to-market plan', 'Channel and budget plan', 'Technology roadmap', 'Growth advisory sessions'],
    sections: [
      ['When to use it', `- Launching a new product or service
- Entering a new country such as the UAE, the US or India
- Growth has stalled and you do not know why
- You are raising money and need a credible growth plan`],
      ['What the work covers', `1. **Discovery:** sessions with your leadership on goals and constraints.
2. **Research:** your market, competitors and buyers.
3. **Strategy:** positioning, ICP, channels, budget and targets.
4. **Roadmap:** the marketing, sales and technology steps in order, with owners.
5. **Advisory:** monthly sessions to adjust as results come in.`],
      ['Example', `For Navaro, a unified import-export trade platform, Flare built an investor-ready brand, a 60-day growth playbook and a full SEO foundation. [See case studies](/case-studies/).`],
    ],
    faqs: [
      ['What is a go-to-market strategy?', 'A plan for how a product reaches its first and best customers: who they are, what you say to them, which channels you use, what it costs and what results to expect.'],
      ['Do you also execute the plan?', 'Yes. Most clients move from consulting into a Growth System plan, so the team that wrote the plan runs it.'],
      ['Do you provide technology consulting?', 'Yes. We map the tools, systems and timelines your business needs, and Custom Development can build them.'],
    ],
    related: ['sales-consulting', 'growth-system', 'industries/b2b-saas', 'custom-development'],
  },
  {
    slug: 'partnerships',
    nav_group: 'Sales & Consulting',
    kind: 'service',
    keyword: 'white label marketing agency',
    title: 'White-Label & B2B Partnerships | Flare Technologies',
    desc: 'White-label lead generation, marketing and development for agencies, and long-term retainers with SLAs for growing businesses.',
    h1: 'A long-term partner, not another vendor.',
    lead: 'Some businesses need more than a project. Flare works as a long-term partner on monthly retainers with clear deliverables and SLAs, and agencies can deliver our full capabilities under their own brand.',
    includes: ['Dedicated account manager', 'Custom monthly retainers', 'White-label delivery', 'SLA-backed commitments', 'End-to-end ownership'],
    sections: [
      ['For agencies: white-label', `Agencies and resellers can offer lead generation, outreach, SEO, ads and development under their own brand, delivered by our team. You keep the client relationship. We do the work and report in your name.`],
      ['For businesses: retainers', `A single point of contact who knows your business, monthly deliverables agreed in writing, response and delivery times guaranteed by SLA, and one team owning strategy, execution and delivery.`],
    ],
    faqs: [
      ['What can agencies white-label?', 'Lead generation, LinkedIn outreach, SEO, paid ads, content and custom development.'],
      ['Will our clients know you are involved?', 'No. White-label work is delivered and reported under your brand.'],
      ['What does an SLA cover?', 'Response times, delivery timelines and, for hosted systems, uptime. We agree these in writing before work starts.'],
    ],
    related: ['growth-system', 'outsourced-sales-team', 'custom-development', 'contact'],
  },
)

// ---- Custom Development ----
PAGES.push(
  {
    slug: 'custom-development',
    nav_group: 'Custom Development',
    kind: 'build',
    keyword: 'custom software development company',
    title: 'Custom Software Development Company | Flare',
    desc: 'Web apps, mobile apps, MVPs, ERP and AI automation, built by a team with 7 years of experience and 19 products shipped across industries.',
    h1: 'Custom software development company.',
    lead: 'Custom Development is Flare\'s product engineering team. We build web apps, mobile apps, MVPs, ERP systems and AI automation around how your business actually runs, with design and engineering working together from the first sketch to launch.',
    includes: ['Custom software and web apps', 'Mobile apps for Android and iOS', 'MVPs for founders', 'ERP implementation', 'AI automation and agents', 'Cloud and DevOps'],
    sections: [
      ['What we build', `| Service | What it is | Typical client |
| [Web & e-commerce development](/custom-development/web-development/) | Websites, portals, web apps and online stores | B2B companies and D2C brands |
| [Mobile app development](/custom-development/mobile-app-development/) | Android and iOS apps | Consumer brands, field teams |
| [MVP development](/custom-development/mvp-development/) | A first working version of a new product | Founders raising or validating |
| [UI/UX design](/custom-development/ui-ux-design/) | Research, flows and interface design | Any product team |
| [AI automation & agents](/custom-development/ai-automation/) | Chatbots, AI agents, CRM and workflow automation | Teams drowning in manual work |
| [ERP implementation](/custom-development/erp-implementation/) | ERP set-up, customisation and custom ERP | Growing operations |
| [Cloud & DevOps](/custom-development/cloud-devops/) | Hosting, migration, CI/CD and security | Products that need to stay up |`],
      ['Proof', `Our team has 7 years of experience and has shipped 19 products across fintech, marketplaces, consumer apps, enterprise systems and AI & EdTech, including a B2B beverage ordering app for Coca-Cola. [See all 19 projects](/custom-development/work/).`],
      ['How we work', 'BUILD_STEPS'],
      ['Why build with Flare', `Most software agencies stop at launch. Because Flare also runs marketing and sales, we build products that are ready to be sold: fast, findable on Google and AI search, and measured from the first user.`],
      ['Industries we build for', `| Area | Example products |
| Fintech | KatanaPay, GrowFX Pro |
| Marketplaces | TronWeb Rentals, Housejoy, A4U / Architect 4 You |
| Enterprise systems | Coca-Cola B2B Beverage App, Growthmind Realty, Construction Managers, Interior Managers, CyberPower Technician App |
| Consumer apps | Hungry Owl, Aishu's Kitchen, HOH108, Interior Plus, Ifitmash, Mox Mind Interactive, Behind the Curtain |
| AI & EdTech | Palmo, Classmate AI |`],
      ['What you get at the end', `- Source code in your repository
- Design files and a design system
- Documentation for developers and admins
- Hosting set up in your cloud account
- A support plan for fixes and new features`],
    ],
    faqs: [
      ['Who owns the code?', 'You do. On final payment, the source code, designs and accounts are transferred to your business.'],
      ['Do you work fixed price or hourly?', 'Fixed price for clearly scoped projects such as MVPs, and monthly retainers for ongoing product work. We recommend the model in the proposal.'],
      ['How long does a build take?', 'An MVP usually takes six to twelve weeks. Larger platforms are planned in phases, with a working release every two weeks.'],
      ['What support do you give after launch?', 'A support plan covering monitoring, bug fixes, updates and new features, agreed before launch.'],
      ['Which technologies do you use?', 'We choose the stack for the project. Common choices are React and Next.js for web, React Native or Flutter for mobile, Node.js and Python on the server, and AWS or Google Cloud for hosting.'],
    ],
    related: ['custom-development/mvp-development', 'custom-development/ai-automation', 'custom-development/erp-implementation', 'dubai/software-development-company'],
  },
  {
    slug: 'custom-development/web-development',
    nav_group: 'Custom Development',
    kind: 'build',
    keyword: 'b2b web development',
    title: 'B2B Web Development & E-commerce | Flare Technologies',
    desc: 'Fast, search-ready websites, portals and online stores built to generate leads and sales, with SEO and tracking built in from day one.',
    h1: 'B2B web development and e-commerce.',
    lead: 'A B2B website has one job: turn the right visitors into conversations. We build fast websites, client portals and online stores that Google and AI assistants can read, that load quickly on phones, and that track every enquiry.',
    includes: ['Marketing websites', 'Client portals and web apps', 'E-commerce stores', 'API and CRM integration', 'SEO-ready builds', 'Hosting and care plans'],
    sections: [
      ['What makes B2B websites different', `B2B buyers visit several times before they get in touch, often with colleagues. Your site needs clear service pages, proof, pricing guidance, and a simple way to book a call, plus integration with your CRM so sales knows who visited.`],
      ['Built to be found', `Every site we build sends search engines fully written pages, with unique titles, schema markup and fast load times. That is the foundation our [SEO, AEO and GEO](/seo-aeo-geo/) team relies on.`],
      ['How we work', 'BUILD_STEPS'],
    ],
    faqs: [
      ['Which platforms do you build on?', 'Next.js and React for custom sites and web apps, Webflow when your team wants to edit pages easily, and Shopify or custom stacks for e-commerce.'],
      ['Will my website be SEO-friendly?', 'Yes. Pages are pre-rendered, fast and structured with schema, titles and headings planned around search phrases.'],
      ['Can you connect the site to our CRM?', 'Yes. Forms, chat and bookings can flow straight into HubSpot, Zoho, Salesforce or your own CRM.'],
      ['How long does a website take?', 'A marketing website usually takes four to eight weeks. Portals and stores depend on scope.'],
    ],
    related: ['custom-development', 'seo-aeo-geo', 'custom-development/ui-ux-design', 'paid-ads'],
  },
  {
    slug: 'custom-development/mobile-app-development',
    nav_group: 'Custom Development',
    kind: 'build',
    keyword: 'mobile app development company',
    title: 'Mobile App Development Company | Android & iOS | Flare',
    desc: 'Android and iOS apps for consumer brands and business teams, designed, built, tested and launched by one team, with marketing ready on day one.',
    h1: 'Mobile app development for Android and iOS.',
    lead: 'We design and build mobile apps that people keep using, from consumer apps to tools for field and sales teams. One team handles design, development, testing and store launch, and our marketing team can drive installs once you are live.',
    includes: ['Android and iOS apps', 'Cross-platform builds', 'Backend and admin panels', 'Payments and integrations', 'App store launch', 'Install campaigns'],
    sections: [
      ['Apps we have built', `Consumer apps such as Hungry Owl, Aishu's Kitchen and Ifitmash, and business apps such as the CyberPower Technician App and a B2B beverage ordering app for Coca-Cola. [See all projects](/custom-development/work/).`],
      ['How we work', 'BUILD_STEPS'],
      ['After launch', `An app is not finished at launch. We monitor crashes, ship updates and, through our [app install campaigns](/paid-ads/app-install-campaigns/), help you find users who stay.`],
    ],
    faqs: [
      ['Do you build native or cross-platform apps?', 'Usually cross-platform with React Native or Flutter, which gives one codebase for Android and iOS. We recommend native where performance demands it.'],
      ['Do you publish the app to the stores?', 'Yes. We prepare the listings and handle submission to Google Play and the App Store.'],
      ['Can you build the admin panel too?', 'Yes. Most apps need a web admin panel and backend, which we build alongside the app.'],
    ],
    related: ['custom-development', 'custom-development/mvp-development', 'paid-ads/app-install-campaigns', 'custom-development/ui-ux-design'],
  },
  {
    slug: 'custom-development/mvp-development',
    nav_group: 'Custom Development',
    kind: 'build',
    keyword: 'mvp development company',
    title: 'MVP Development Company for Founders | Flare',
    desc: 'Turn your idea into a working first product in weeks. Fixed-scope MVPs for founders validating an idea or raising investment.',
    h1: 'MVP development company for founders.',
    lead: 'An MVP is the smallest version of your product that real users can use and pay for. We help you decide what goes in it, build it in weeks, and get it in front of users, so you learn before you spend more.',
    includes: ['Scoping workshop', 'Clickable prototype', 'Fixed-scope build', 'Analytics from day one', 'Investor demo support', 'Launch marketing'],
    sections: [
      ['Deciding what goes into the MVP', `Most first products are too big. In the scoping workshop we list every feature, then keep only what is needed to prove one thing: that users want this enough to use it or pay for it. Everything else goes on a later list.`],
      ['How an MVP build runs', `1. **Week 1:** scoping workshop and feature list.
2. **Weeks 2–3:** clickable prototype tested with five to ten target users.
3. **Weeks 3–10:** build in two-week sprints with a working demo each time.
4. **Launch:** store or web launch with analytics in place.
5. **Learn:** review usage with you and plan version two.`],
      ['Built by the team that markets it', `Because Flare also runs growth, your MVP launches with a plan to reach its first users, not just a link.`],
      ['What goes into a typical MVP', `| Usually in the MVP | Usually later |
| Sign-up and login | Social logins and SSO |
| The one core feature users come for | Secondary features and settings |
| Simple admin panel | Full analytics dashboards |
| Payments if you charge from day one | Multiple plans and coupons |
| Basic analytics | Integrations with other tools |`],
      ['Validating the idea before the build', `Before any code, we test the clickable prototype with five to ten people from your target audience. Watching them use it reveals confusing steps and missing pieces early, when changes cost hours instead of weeks.`],
    ],
    faqs: [
      ['How long does an MVP take?', 'Usually six to twelve weeks, depending on scope. We fix the scope before the build starts.'],
      ['How much does an MVP cost?', 'It depends on the features and platforms. After the scoping workshop we give a fixed price for the agreed scope.'],
      ['Can you help with investor demos?', 'Yes. We can prepare a demo build and product walkthrough for investor meetings.'],
      ['What happens after the MVP?', 'We review real usage with you and plan the next version, or hand over the code to your own team.'],
    ],
    related: ['custom-development', 'custom-development/ui-ux-design', 'growth-consulting', 'industries/b2b-saas'],
  },
  {
    slug: 'custom-development/ui-ux-design',
    nav_group: 'Custom Development',
    kind: 'build',
    keyword: 'ui ux design agency',
    title: 'UI/UX Design Agency for Apps & Websites | Flare',
    desc: 'User research, flows and interface design for apps and websites, tested with real users before development starts.',
    h1: 'UI/UX design for apps and websites.',
    lead: 'Good design is what makes people finish signing up, find the button and come back tomorrow. We research your users, map the flows and design interfaces that are clear, accessible and ready for developers.',
    includes: ['User research', 'User flows and wireframes', 'Interface design', 'Design systems', 'Clickable prototypes', 'Usability testing'],
    sections: [
      ['What we deliver', `- Research notes on who your users are and what they need
- User flows for every key task
- Wireframes, then high-fidelity screens
- A design system with colours, type and components
- A clickable prototype tested with real users`],
      ['Design that ships', `Our designers and engineers work in one team, so designs are built as drawn, not reinterpreted.`],
    ],
    faqs: [
      ['Do you only design, or build as well?', 'Both. You can hire us for design only, or for design and development together.'],
      ['Which tools do you use?', 'Figma for design and prototypes, with design tokens handed over for development.'],
      ['Do you redesign existing products?', 'Yes. We start with an audit of your current product and user feedback.'],
    ],
    related: ['custom-development/web-development', 'custom-development/mobile-app-development', 'custom-development/mvp-development', 'custom-development'],
  },
  {
    slug: 'custom-development/ai-automation',
    nav_group: 'Custom Development',
    kind: 'build',
    keyword: 'ai automation services for business',
    title: 'AI Automation Services | Agents & Chatbots | Flare',
    desc: 'AI agents, chatbots, CRM and workflow automation that remove manual work from sales, support and operations.',
    h1: 'AI automation services for business.',
    lead: 'If your team copies data between tools, answers the same questions every day or chases follow-ups by hand, that work can be automated. We build AI agents, chatbots and workflow automation that connect your tools and do the repetitive work for you.',
    includes: ['Process automation', 'AI chatbots and agents', 'Workflow automation across apps', 'CRM automation', 'AI strategy and readiness', 'AI features inside existing products'],
    sections: [
      ['What we automate', `| Area | Example automation |
| Sales | Leads from forms, ads and LinkedIn enriched and added to your CRM, with follow-up tasks created automatically |
| Support | A chatbot that answers common questions from your documents and hands complex cases to a person |
| Operations | Invoices, orders or reports moved between systems without copy-paste |
| Marketing | Content drafts, lead scoring and personalised email sequences |
| Internal tools | AI assistants that search your company knowledge |`],
      ['How we build it', `1. **Map:** we sit with your team and list the tasks that eat the most hours.
2. **Prioritise:** we pick the automations with the biggest time saving for the least effort.
3. **Build:** using tools like n8n, Zapier or custom code, with AI models where they add value.
4. **Test:** with real data, with a person checking results at first.
5. **Hand over:** documentation, training and monitoring.`],
      ['We use it ourselves', `Flare runs its own lead generation on automations we built, including an n8n lead-research workflow and a large-scale email system. Clients get the same tools.`],
      ['Where to start with AI automation', `Start with work that is repetitive, rule-based and high-volume: moving data between tools, sending follow-ups, answering the same questions, creating standard reports. These give quick, measurable time savings. Judgment-heavy work comes later, with a person reviewing the AI's output.`],
      ['How we keep automations reliable', `- A person checks results during the first weeks
- Errors alert the right person instead of failing silently
- Each automation is documented so your team understands it
- We review performance monthly and adjust`],
    ],
    faqs: [
      ['What is AI automation?', 'Using software and AI models to do repetitive tasks such as data entry, follow-ups, answering common questions or creating reports, so your team can spend time on work that needs people.'],
      ['Which tools do you use?', 'n8n, Zapier and Make for workflows, AI models from OpenAI, Anthropic and Google, and custom code where off-the-shelf tools are not enough.'],
      ['Is my data safe?', 'We design automations with access controls, keep data in your accounts where possible, and agree data handling rules before we start.'],
      ['Can you add AI to our existing product?', 'Yes. We can add AI features such as search, summaries or assistants to software you already have.'],
    ],
    related: ['custom-development', 'custom-development/erp-implementation', 'b2b-lead-generation-agency', 'custom-development/cloud-devops'],
  },
  {
    slug: 'custom-development/erp-implementation',
    nav_group: 'Custom Development',
    kind: 'build',
    keyword: 'erp implementation partner',
    title: 'ERP Implementation Partner for Growing Businesses | Flare',
    desc: 'ERP selection, implementation, customisation and custom ERP builds for growing businesses, with training and support after go-live.',
    h1: 'ERP implementation partner.',
    lead: 'An ERP system should make your operations simpler, not add another tool your team avoids. We help you choose the right ERP, set it up around your real processes, customise what needs customising, and train your team to use it.',
    includes: ['ERP selection', 'Process mapping', 'Implementation and data migration', 'Customisation and integrations', 'Custom ERP builds', 'Training and support'],
    sections: [
      ['Our implementation method', `1. **Plan:** map your current processes and decide what the ERP must do.
2. **Design:** configure modules and plan customisations and integrations.
3. **Build:** set up, customise, integrate and migrate data.
4. **Test:** run real scenarios with your team before go-live.
5. **Go live and train:** launch, train users and support the first months.`],
      ['Off-the-shelf or custom?', `Most businesses are best served by an established ERP platform, customised where needed. When your processes are unusual, a custom ERP built by our development team can fit better. We recommend one or the other after the planning stage, not before.`],
      ['Industries', `We have built enterprise systems for construction and interior design businesses, real estate and field service teams.`],
      ['Signs you need an ERP', `- Stock, orders and invoices live in separate spreadsheets
- Month-end reporting takes days of copying and checking
- Teams in different locations work from different numbers
- You cannot see project or job profitability until it is too late
- Growth means hiring people just to move data around`],
      ['Why ERP projects fail, and how we avoid it', `Most failed ERP projects fail on people and process, not software. We map processes before configuring anything, involve the people who will use the system in testing, migrate clean data, and stay on after go-live to support adoption.`],
    ],
    faqs: [
      ['How long does an ERP implementation take?', 'Smaller implementations take two to four months. Multi-department rollouts are phased over longer periods.'],
      ['Do you migrate our existing data?', 'Yes. We clean and migrate data from spreadsheets and existing systems as part of the project.'],
      ['Do you train our team?', 'Yes. Training and early support are included, because adoption decides whether an ERP succeeds.'],
      ['Do you work in the UAE and India?', 'Yes. We implement ERP for businesses in India and the UAE.'],
    ],
    related: ['custom-development', 'custom-development/ai-automation', 'industries/construction', 'industries/manufacturing'],
  },
  {
    slug: 'custom-development/cloud-devops',
    nav_group: 'Custom Development',
    kind: 'build',
    keyword: 'cloud and devops services',
    title: 'Cloud & DevOps Services | Migration, CI/CD, Security | Flare',
    desc: 'Cloud setup and migration, CI/CD pipelines, cost optimisation, security and managed support that keep your product fast and online.',
    h1: 'Cloud and DevOps services.',
    lead: 'We set up and run the infrastructure behind your product: cloud hosting, automated deployments, security and monitoring, so releases are safe and your systems stay up as you grow.',
    includes: ['Cloud setup and migration', 'CI/CD pipelines', 'Cost optimisation', 'Security and compliance', 'Monitoring', 'Managed support'],
    sections: [
      ['What we do', `- Move systems to AWS, Google Cloud or Azure with planned cut-overs
- Automate testing and deployment so releases are routine
- Review cloud bills and remove waste
- Set up access controls, encryption and backups
- Monitor uptime and performance, with alerts to the right people`],
    ],
    faqs: [
      ['Which cloud providers do you work with?', 'AWS, Google Cloud and Azure, plus Vercel and Netlify for websites.'],
      ['Can you reduce our cloud costs?', 'Often, yes. We audit usage and resize or remove resources you are paying for but not using.'],
      ['Do you offer ongoing support?', 'Yes, through managed support plans with agreed response times.'],
    ],
    related: ['custom-development', 'custom-development/web-development', 'custom-development/ai-automation', 'partnerships'],
  },
  {
    slug: 'custom-development/work',
    nav_group: 'Custom Development',
    kind: 'work',
    keyword: 'custom development portfolio',
    title: 'Custom Development Portfolio | 19 Products | Flare',
    desc: '19 products built by Flare\'s Custom Development team across fintech, marketplaces, consumer apps, enterprise systems and AI & EdTech.',
    h1: '19 products, built for the real world.',
    lead: 'A selection of the products our Custom Development team has designed and built, from fintech platforms and marketplaces to enterprise systems and AI learning tools.',
    faqs: [
      ['Can we see a demo of past work?', 'Yes. On a call we can walk you through relevant projects, subject to each client\'s confidentiality.'],
      ['Do you work in our industry?', 'Our work spans fintech, marketplaces, consumer apps, enterprise systems and AI & EdTech. Tell us about your project and we will share the closest examples.'],
    ],
    related: ['custom-development', 'case-studies', 'custom-development/mvp-development', 'contact'],
  },
)

// ---- Industries ----
PAGES.push(
  {
    slug: 'industries/b2b-saas',
    nav_group: 'Industries',
    kind: 'service',
    keyword: 'b2b saas marketing agency',
    title: 'B2B SaaS Marketing Agency | Pipeline, Not Vanity | Flare',
    desc: 'Lead generation, LinkedIn, SEO and AI search for B2B SaaS and AI companies, run as one system with a sales team that books demos.',
    h1: 'B2B SaaS marketing agency.',
    lead: 'SaaS buyers research quietly, compare on G2 and ChatGPT, and ignore generic outreach. We run the full growth system for B2B SaaS and AI companies: ICP research, outbound to the right accounts, content that ranks and gets cited by AI, and a sales team that books demos.',
    includes: ['ICP and positioning', 'Outbound to target accounts', 'SEO, AEO and GEO', 'LinkedIn and founder brand', 'Paid ads', 'Demo booking'],
    sections: [
      ['Proof', `For SlashLLM, an AI security SaaS company, Flare built an outbound system from zero that went live in week one and produced 260+ qualified CISO-level leads in 45 days. [Read the case study](/case-studies/).`],
      ['What SaaS companies get', `- An ICP built from your best current customers, not guesses
- Account lists by tech stack, funding stage, headcount and region
- Outreach that leads with the buyer's problem, not your features
- Comparison and alternative pages that rank on Google and appear in AI answers
- Demos booked by our sales team, with notes for your account executives`],
    ],
    faqs: [
      ['Do you work with early-stage SaaS?', 'Yes, from first customers to scale-up. Early-stage companies usually start with the Outreach Engine plan.'],
      ['Can you help with product-led SaaS?', 'Yes. For product-led companies we focus on search, AI visibility and paid acquisition into free trials, with outreach to high-value accounts.'],
      ['Do you handle G2 and review sites?', 'Yes. We help you collect reviews on G2 and similar sites, which also improves how AI assistants describe you.'],
    ],
    related: ['b2b-lead-generation-agency', 'seo-aeo-geo', 'demand-generation-agency', 'custom-development/mvp-development'],
  },
  {
    slug: 'industries/fintech',
    nav_group: 'Industries',
    kind: 'service',
    keyword: 'fintech marketing agency',
    title: 'Fintech Marketing Agency | B2B & App Growth | Flare',
    desc: 'Lead generation, app install campaigns and compliant content for fintech, lending, payments and remittance companies.',
    h1: 'Fintech marketing agency.',
    lead: 'Fintech companies sell trust. We help lending, payments, investing and remittance businesses reach the right buyers and users, with messaging that respects regulation and campaigns measured on real sign-ups and revenue.',
    includes: ['ICP research for your sector', 'Decision-maker lists', 'LinkedIn and email outreach', 'Website and SEO fixes', 'Paid ads where they fit', 'Meetings booked by our sales team'],
    sections: [
      ['What we do for fintech', `- B2B outreach to banks, NBFCs, merchants and finance leaders
- App install campaigns measured on KYC completion and first transaction
- SEO and AI-search content that explains products clearly
- Custom fintech products: our Custom Development team has built fintech platforms including KatanaPay and GrowFX Pro`],
      ['Experience', `Flare has run Android and iOS app install acquisition for a fintech lending and investing app, and works with remittance and financial services companies across India and the UAE.`],
    ],
    faqs: [
      ['Do you understand financial advertising rules?', 'Yes. We review ad copy against platform financial-services policies and your compliance team\'s guidance before launch.'],
      ['Do you work with B2B and consumer fintech?', 'Both: B2B outreach for fintech infrastructure and app campaigns for consumer products.'],
    ],
    related: ['paid-ads/app-install-campaigns', 'b2b-lead-generation-agency', 'custom-development', 'industries/b2b-saas'],
  },
  {
    slug: 'industries/construction',
    nav_group: 'Industries',
    kind: 'service',
    keyword: 'construction marketing agency',
    title: 'Construction & Interior Design Marketing Agency | Flare',
    desc: 'Lead generation, social media, websites and project management software for construction, contracting and interior design businesses.',
    h1: 'Marketing for construction and interior design companies.',
    lead: 'Construction and interior design buyers judge you on past projects and trust. We help contractors, builders and design studios get found locally, show their work, reach developers and corporate clients, and run their projects on better software.',
    includes: ['ICP research for your sector', 'Decision-maker lists', 'LinkedIn and email outreach', 'Website and SEO fixes', 'Paid ads where they fit', 'Meetings booked by our sales team'],
    sections: [
      ['What we do', `- Websites and Google Business profiles that show finished projects
- Social media and short video of work in progress
- Outreach to developers, facility managers and corporate buyers
- Project and site management apps built by our Custom Development team, such as Construction Managers and Interior Managers`],
      ['Experience', `Flare works with integrated construction and interior design practices in Bengaluru and Mysuru, and with construction contractors.`],
    ],
    faqs: [
      ['Do you do local SEO for contractors?', 'Yes. Google Business Profile, local pages and reviews are usually the first step for construction and interiors.'],
      ['Can you build project management software?', 'Yes. Our Custom Development team has built construction and interior management systems.'],
    ],
    related: ['social-media-management', 'seo-aeo-geo', 'custom-development/erp-implementation', 'dubai/b2b-marketing-agency'],
  },
  {
    slug: 'industries/real-estate',
    nav_group: 'Industries',
    kind: 'service',
    keyword: 'real estate marketing agency',
    title: 'Real Estate Marketing Agency | Leads & Content | Flare',
    desc: 'Lead generation, ads, content and CRM automation for real estate developers, brokers and property services.',
    h1: 'Real estate marketing that brings qualified buyers.',
    lead: 'Real estate leads are expensive and go cold fast. We run ads and content that attract serious buyers, follow up within minutes through automation and our sales team, and build the tools that keep every enquiry tracked.',
    includes: ['ICP research for your sector', 'Decision-maker lists', 'LinkedIn and email outreach', 'Website and SEO fixes', 'Paid ads where they fit', 'Meetings booked by our sales team'],
    sections: [
      ['What we do', `- Meta and Google campaigns for launches and inventory
- Content strategy for developers and builders
- Lead follow-up by our sales team and WhatsApp automation
- CRM and property management systems, such as Growthmind Realty, built by our Custom Development team`],
      ['Experience', `Flare runs ongoing content strategy for a real estate builder group in India and has built real estate systems through Custom Development.`],
    ],
    faqs: [
      ['How fast do you follow up leads?', 'Automation responds instantly and our sales team follows up during working hours, because speed decides most real estate leads.'],
      ['Do you run campaigns in the UAE?', 'Yes. We run campaigns in India and the UAE.'],
    ],
    related: ['paid-ads/meta-ads', 'appointment-setting', 'custom-development/ai-automation', 'dubai/lead-generation-company'],
  },
  {
    slug: 'industries/manufacturing',
    nav_group: 'Industries',
    kind: 'service',
    keyword: 'manufacturing marketing agency',
    title: 'Manufacturing Marketing & Lead Generation Agency | Flare',
    desc: 'LinkedIn lead generation, export outreach, websites and ERP for manufacturers selling to distributors, OEMs and global buyers.',
    h1: 'Lead generation for manufacturers.',
    lead: 'Manufacturers usually grow through relationships and trade shows. We add a steady channel: LinkedIn and email outreach to procurement heads, distributors and OEMs in your target markets, backed by a website and catalogue that buyers can find.',
    includes: ['ICP research for your sector', 'Decision-maker lists', 'LinkedIn and email outreach', 'Website and SEO fixes', 'Paid ads where they fit', 'Meetings booked by our sales team'],
    sections: [
      ['What we do', `- LinkedIn lead generation targeting procurement, engineering and plant heads
- Export outreach to distributors in the Middle East, US and Europe
- Technical websites and product catalogues that rank for what buyers search
- ERP implementation and custom systems for operations`],
      ['Experience', `Flare has run LinkedIn lead generation targeting Indian manufacturers for an AI company selling into the sector.`],
    ],
    faqs: [
      ['Does LinkedIn work for manufacturing?', 'Yes, for reaching procurement, engineering and plant leaders by job title and company, especially in export markets.'],
      ['Can you implement ERP for our plant?', 'Yes. Our Custom Development team handles ERP implementation and custom systems.'],
    ],
    related: ['linkedin-lead-generation', 'custom-development/erp-implementation', 'b2b-technical-marketing', 'b2b-lead-generation-agency'],
  },
)

// ---- Locations ----
PAGES.push(
  {
    slug: 'dubai/lead-generation-company',
    nav_group: 'Locations',
    kind: 'service',
    keyword: 'lead generation company dubai',
    title: 'B2B Lead Generation Company in Dubai & UAE | Flare',
    desc: 'B2B lead generation in Dubai and the UAE: verified decision-maker lists, LinkedIn and email outreach, and a sales team that books your meetings.',
    h1: 'B2B lead generation company in Dubai.',
    lead: 'The UAE is a relationship market: buyers want to know who you are before they take a call. We combine targeted LinkedIn and email outreach with credible profiles, local proof and a sales team that follows up, so meetings in Dubai, Abu Dhabi and across the GCC become a steady flow.',
    includes: ['ICP research', 'Decision-maker lists', 'LinkedIn, email and phone outreach', 'Ads where they fit', 'Website, SEO and AI-search fixes', 'Meetings booked by our team'],
    area: 'AE',
    sections: [
      ['How we generate leads in the UAE', `1. **ICP interview:** which UAE sectors, free zones and roles buy from you.
2. **Lists:** decision-makers in Dubai, Abu Dhabi and the wider GCC, verified before use.
3. **Profiles:** LinkedIn and website updated for UAE buyers.
4. **Outreach:** LinkedIn, email and phone follow-up in UAE working hours.
5. **Meetings:** booked in your calendar, in person or online.`],
      ['UAE experience', `Flare works with UAE companies in construction, fintech, financial services and technology.`],
      ['What works with UAE buyers', `- **Credibility first:** a complete LinkedIn profile, a UAE-relevant website and local proof before outreach starts
- **Personal follow-up:** UAE buyers often prefer a call or WhatsApp after the first message
- **Patience with timing:** we plan around Ramadan, summer and major events such as GITEX when decision-makers are busy
- **Clear next steps:** a specific meeting time, online or in person, rather than an open-ended "let's connect"`],
      ['Who we help in the UAE', `- Companies in Dubai and Abu Dhabi that need a steady flow of B2B meetings
- Indian, US and European companies entering the UAE and GCC
- Free zone businesses selling across the region`],
    ],
    faqs: [
      ['Do you work with companies outside the UAE that want UAE clients?', 'Yes. Many clients are based in India, the US or Europe and use us to open the UAE market.'],
      ['Which sectors do you target in the UAE?', 'Construction, real estate, energy, fintech, logistics, technology and professional services are the most common.'],
      ['Do you follow UAE working days?', 'Yes. Outreach and follow-up run on UAE working days and hours.'],
    ],
    related: ['b2b-lead-generation-agency', 'dubai/b2b-marketing-agency', 'dubai/seo-agency', 'appointment-setting'],
  },
  {
    slug: 'dubai/b2b-marketing-agency',
    nav_group: 'Locations',
    kind: 'service',
    keyword: 'b2b marketing agency dubai',
    title: 'B2B Marketing Agency in Dubai & UAE | Flare Technologies',
    desc: 'B2B marketing in Dubai: LinkedIn, SEO, ads, content and outreach run as one growth system for UAE companies and those entering the UAE.',
    h1: 'B2B marketing agency in Dubai.',
    lead: 'We run B2B marketing for companies in Dubai and the UAE, and for companies entering the region. One team handles LinkedIn, SEO and AI search, ads, content and outreach, with a sales team that turns interest into meetings.',
    includes: ['ICP research', 'Decision-maker lists', 'LinkedIn, email and phone outreach', 'Ads where they fit', 'Website, SEO and AI-search fixes', 'Meetings booked by our team'],
    area: 'AE',
    sections: [
      ['What we run for UAE companies', `- LinkedIn company pages, founder branding and LinkedIn ads
- SEO, AEO and GEO for UAE search and AI assistants
- Google and Meta campaigns for the UAE market
- Lead generation and appointment setting
- Websites and apps from our Custom Development team`],
    ],
    faqs: [
      ['Do you have experience in the UAE?', 'Yes. We work with UAE clients in construction, fintech, financial services and technology.'],
      ['Can you market in Arabic?', 'We create English-first B2B campaigns and work with Arabic translators where campaigns need it.'],
    ],
    related: ['dubai/lead-generation-company', 'linkedin-marketing-agency', 'seo-aeo-geo', 'growth-system'],
  },
  {
    slug: 'dubai/seo-agency',
    nav_group: 'Locations',
    kind: 'service',
    keyword: 'seo agency dubai',
    title: 'SEO Agency in Dubai | SEO, AEO & GEO for UAE | Flare',
    desc: 'SEO in Dubai for B2B companies: technical fixes, content and AI-search optimisation so Google and ChatGPT recommend you in the UAE.',
    h1: 'SEO agency in Dubai.',
    lead: 'We help UAE businesses get found on Google and in AI assistants like ChatGPT. That means fixing how your site is built, planning one search phrase per page, and publishing content that answers what UAE buyers ask.',
    includes: ['ICP research', 'Decision-maker lists', 'LinkedIn, email and phone outreach', 'Ads where they fit', 'Website, SEO and AI-search fixes', 'Meetings booked by our team'],
    area: 'AE',
    sections: [
      ['What Dubai SEO covers', `- Technical audit and fixes so every page is readable by Google and AI crawlers
- UAE keyword plan by service and emirate
- Google Business Profile and local citations
- Content and FAQs written for UAE buyers
- Monthly ranking and AI-visibility reporting`],
    ],
    faqs: [
      ['How long does SEO take in Dubai?', 'Technical fixes help within weeks. New pages usually take three to six months to reach steady rankings.'],
      ['Do you do local SEO for Google Maps?', 'Yes. Google Business Profile and local citations are part of every UAE SEO plan.'],
    ],
    related: ['seo-aeo-geo', 'dubai/b2b-marketing-agency', 'custom-development/web-development', 'dubai/lead-generation-company'],
  },
  {
    slug: 'dubai/software-development-company',
    nav_group: 'Locations',
    kind: 'service',
    keyword: 'software development company dubai',
    title: 'Software Development Company in Dubai & UAE | Flare',
    desc: 'Custom software, mobile apps, MVPs, ERP and AI automation for UAE businesses, built by a team with 7 years of experience and 19 products shipped.',
    h1: 'Software development company for Dubai and the UAE.',
    lead: 'Flare\'s Custom Development team builds web apps, mobile apps, MVPs, ERP systems and AI automation for UAE businesses. Our engineering team is based in Bengaluru, with project management in UAE working hours.',
    includes: ['ICP research', 'Decision-maker lists', 'LinkedIn, email and phone outreach', 'Ads where they fit', 'Website, SEO and AI-search fixes', 'Meetings booked by our team'],
    area: 'AE',
    sections: [
      ['What we build for UAE clients', `- Custom web platforms and portals
- Android and iOS apps
- MVPs for UAE founders
- ERP implementation and custom ERP
- AI chatbots and workflow automation`],
      ['Proof', `Our team has 7 years of experience and has shipped 19 products, including a B2B beverage ordering app for Coca-Cola. [See the work](/custom-development/work/).`],
    ],
    faqs: [
      ['Are you based in Dubai?', 'Our engineering team is in Bengaluru, India. We work with UAE clients remotely, during UAE working hours.'],
      ['Who owns the code?', 'You do, on final payment.'],
    ],
    related: ['custom-development', 'custom-development/erp-implementation', 'custom-development/mobile-app-development', 'dubai/b2b-marketing-agency'],
  },
  {
    slug: 'india/b2b-lead-generation-company',
    nav_group: 'Locations',
    kind: 'service',
    keyword: 'b2b lead generation company in india',
    title: 'B2B Lead Generation Company in India | Bengaluru | Flare',
    desc: 'B2B lead generation from Bengaluru: ICP research, LinkedIn and email outreach, and an in-house sales team that books qualified meetings.',
    h1: 'B2B lead generation company in India.',
    lead: 'Flare is a B2B lead generation company based in Bengaluru. We find decision-makers in India and abroad, start conversations on LinkedIn, email and phone, and our in-house sales team books qualified meetings for you.',
    includes: ['ICP research', 'Decision-maker lists', 'LinkedIn, email and phone outreach', 'Ads where they fit', 'Website, SEO and AI-search fixes', 'Meetings booked by our team'],
    area: 'IN',
    sections: [
      ['Why work with a Bengaluru team', `- An in-house sales team, not a call centre
- Experience with Indian and international buyers
- Coverage of Indian, Middle East and US time zones, agreed per client
- Marketing, sales and software under one roof`],
      ['Proof', `For SlashLLM we built an outbound system that produced 260+ qualified CISO-level leads in 45 days. [See case studies](/case-studies/).`],
    ],
    faqs: [
      ['Do you only target Indian buyers?', 'No. Many clients use our Bengaluru team to reach buyers in the UAE, US and UK.'],
      ['Can we meet in person?', 'Yes, in Bengaluru. We work with clients across India online.'],
    ],
    related: ['b2b-lead-generation-agency', 'outsourced-sales-team', 'linkedin-lead-generation', 'growth-system'],
  },
)

// ---- Resources & Company ----
PAGES.push(
  {
    slug: 'blog/b2b-lead-generation-guide',
    nav_group: 'Resources',
    kind: 'article',
    keyword: 'b2b lead generation',
    title: 'B2B Lead Generation: A Practical Guide for 2026 | Flare',
    desc: 'What B2B lead generation is, the channels that work in 2026, how to build an ICP, write outreach that gets replies and measure results.',
    h1: 'B2B lead generation: a practical guide for 2026.',
    lead: 'B2B lead generation is the work of finding businesses that could buy from you and starting a conversation with the right person inside them. This guide covers how to define who to target, which channels work, how to write messages that get replies, and how to measure what matters.',
    sections: [
      ['What is B2B lead generation?', `B2B lead generation means identifying companies and decision-makers who match your ideal customer, getting their attention, and turning that attention into a sales conversation. A lead is a person who could buy. A qualified lead is one who fits your criteria and has shown interest. A meeting is the goal.`],
      ['Step 1: define your ideal customer profile', `An ideal customer profile (ICP) describes the companies that get the most value from you. Start from your best three to five customers and write down:

- Industry and sub-sector
- Company size by revenue or headcount
- Country and region
- The job titles that decide and the ones that influence
- The problem that made them buy, in their own words

Everything that follows, from lists to messages, comes from this profile.`],
      ['Step 2: choose your channels', `| Channel | Works best for | Speed |
| LinkedIn outreach | Reaching senior B2B buyers by job title | Replies in days |
| Cold email | Larger lists and buyers who rarely use LinkedIn | Replies in days |
| Phone | Following up warm leads and qualifying | Immediate |
| Paid ads | Getting known before outreach, retargeting | Weeks |
| SEO and AI search | Buyers who research before they talk to anyone | Months |
| Referrals and partners | High-trust introductions | Varies |

Most companies get the best results from two or three channels working together.`],
      ['Step 3: write outreach that gets replies', `- Lead with something specific about them: a new office, a hire, a launch
- State one problem you solve, in their words
- Keep the first message under 60 words
- Ask for a small next step, such as a 15-minute call
- Follow up two or three times, adding something useful each time`],
      ['Step 4: follow up fast', `Most meetings are lost after the first reply. Answer within hours, answer the question asked, and offer specific times. This is where an [appointment setting](/appointment-setting/) team pays for itself.`],
      ['Step 5: measure what matters', `Track these numbers every week:

- Acceptance rate on LinkedIn
- Reply rate and positive reply rate
- Meetings booked and meetings held
- Cost per meeting
- Pipeline value created

Clicks and impressions are signals. Meetings and pipeline are results.`],
      ['Doing it in-house or with an agency', `You can run this yourself with Sales Navigator, an email tool and discipline. An agency makes sense when you need results faster than you can hire, or when the founder is still doing all the selling. See how Flare's [B2B lead generation](/b2b-lead-generation-agency/) service runs the whole process.`],
    ],
    faqs: [
      ['What is the difference between a lead and a qualified lead?', 'A lead is anyone who could buy. A qualified lead matches your ideal customer profile and has shown interest, such as replying positively or requesting information.'],
      ['Which B2B lead generation channel works best?', 'For most B2B companies, LinkedIn outreach and email together, supported by a strong LinkedIn profile and website. The best mix depends on your buyers.'],
      ['How many follow-ups should I send?', 'Usually two to three after the first message, spaced a few days apart, each adding something new.'],
      ['How long does B2B lead generation take to work?', 'Outreach can bring replies in the first week. A reliable flow of meetings usually takes one to two months of testing and refinement.'],
      ['Is cold outreach legal?', 'Rules differ by country. B2B outreach is generally allowed in many markets when it is relevant to the recipient\'s role and includes an easy way to opt out, but you should check the rules for each country you target.'],
    ],
    related: ['b2b-lead-generation-agency', 'linkedin-lead-generation', 'appointment-setting', 'growth-system'],
  },
  {
    slug: 'b2b-technical-marketing',
    nav_group: 'Resources',
    kind: 'article',
    keyword: 'b2b technical marketing',
    title: 'What Is B2B Technical Marketing? A Plain Guide | Flare',
    desc: 'B2B technical marketing explained: how marketing technical products differs, who it is for, and how it combines content, web, sales and AI search.',
    h1: 'What is B2B technical marketing?',
    lead: 'B2B technical marketing is marketing for products that are hard to explain: software, AI, engineering, fintech and industrial products. It needs people who understand the product as well as the buyer, and it connects content, website, outreach and sales into one system.',
    sections: [
      ['How it differs from regular marketing', `| | Regular B2B marketing | Technical marketing |
| Buyer | Often one decision-maker | A committee: users, technical evaluators, budget holders |
| Message | Benefits and brand | Benefits backed by how it works |
| Content | Campaigns and posts | Explainers, comparisons, documentation, case studies |
| Sales cycle | Weeks | Months, with technical review |
| Team | Marketers | Marketers who understand the product, plus engineers |`],
      ['The five parts of technical marketing', `1. **Positioning:** what your product does, for whom, compared to the alternatives.
2. **Technical content:** explainers, comparisons and case studies technical buyers trust.
3. **A website built as a sales tool:** fast, findable and clear for each buyer role.
4. **Outreach to every member of the buying committee.**
5. **Sales enablement:** decks, demos and answers to technical objections.`],
      ['How Flare approaches it', `Flare was built by an engineering founder and has a software team in-house, so the people writing your marketing can read your product documentation. That is why we run [lead generation](/b2b-lead-generation-agency/), [SEO and AI search](/seo-aeo-geo/) and [custom development](/custom-development/) as one system.`],
    ],
    faqs: [
      ['Who needs technical marketing?', 'Companies selling software, AI, cybersecurity, fintech infrastructure, engineering or industrial products, where buyers need to understand how something works before they buy.'],
      ['Is technical marketing the same as product marketing?', 'They overlap. Product marketing defines positioning and launches. Technical marketing also creates the detailed content and enablement technical buyers need.'],
      ['Does technical marketing include SEO?', 'Yes. Technical buyers research online and in AI assistants first, so clear, well-structured content is central.'],
    ],
    related: ['b2b-lead-generation-agency', 'seo-aeo-geo', 'industries/b2b-saas', 'about'],
  },
  {
    slug: 'case-studies',
    nav_group: 'Company',
    kind: 'cases',
    keyword: 'flare technologies case studies',
    title: 'Case Studies | Flare Technologies Results',
    desc: 'How Flare has generated leads, built brands and shipped products for SaaS, trade, consumer and enterprise clients.',
    h1: 'Work we can show you.',
    lead: 'A selection of Flare\'s client work across lead generation, brand and growth, content and custom development.',
    faqs: [
      ['Can I speak to a client?', 'Yes. For serious enquiries we can arrange a reference call with a client in a similar business, with their permission.'],
      ['Do you have case studies in my industry?', 'Book a call and we will share the closest examples, including work we cannot publish.'],
    ],
    related: ['b2b-lead-generation-agency', 'custom-development/work', 'growth-system', 'contact'],
  },
  {
    slug: 'about',
    nav_group: 'Company',
    kind: 'about',
    keyword: 'about flare technologies',
    title: 'About Flare Technologies | B2B Growth Team, Bengaluru',
    desc: 'Flare Technologies is a Bengaluru team running sales, marketing and custom software for B2B companies across India, the UAE and the US.',
    h1: 'We build the systems that keep businesses growing.',
    lead: 'Flare Technologies started with a simple observation: good companies stall because sales, marketing and technology are run by different people who never talk. We put them in one team.',
    sections: [
      ['Our story', `Flare was founded by Adity Singh, a computer science engineer who taught herself sales and saw how much growth was lost between vendors. Today Flare runs lead generation, marketing and sales for clients across India, the UAE and the US, and builds custom software through its Custom Development team.`],
      ['What we believe', `- **Systems over campaigns.** A campaign ends. A system keeps your pipeline full.
- **Proof over promises.** We report meetings and revenue, not impressions.
- **Plain language.** If you cannot understand what we are doing, we are explaining it badly.
- **One team.** Marketing, sales and technology work best when they sit together.`],
      ['The company', `Flare Technologies is the brand of MS Digitflare IT Solutions (OPC) Private Limited, registered in New Delhi, with its team based in Bengaluru.`],
    ],
    faqs: [
      ['Where is Flare Technologies based?', 'Our team is in Bengaluru, India. We work with clients across India, the UAE and the US.'],
      ['Who founded Flare?', 'Adity Singh, Founder and CEO.'],
      ['Is Custom Development part of Flare?', 'Yes. Custom Development is Flare\'s product engineering team.'],
    ],
    related: ['growth-system', 'case-studies', 'careers', 'contact'],
  },
  {
    slug: 'careers',
    nav_group: 'Company',
    kind: 'simple',
    keyword: 'flare technologies careers',
    title: 'Careers at Flare Technologies | Fresher to Finisher',
    desc: 'Join Flare Technologies in Bengaluru. Fresher to Finisher: a zero-cost programme with real client work across 7 tracks.',
    h1: 'Learn by doing real work.',
    lead: 'Fresher to Finisher is Flare\'s programme for people starting their careers: zero cost, real client work and seven tracks to choose from. We also hire for growth, sales, design and engineering roles.',
    sections: [
      ['Fresher to Finisher', `- Zero cost to join
- Real work on live client projects
- Seven tracks across growth, sales, content, design and engineering
- Mentoring from the people doing the work`],
      ['Open roles', `We hire for growth, outreach, sales, design and engineering. Send your CV and a short note on what you want to learn to marketing@flaretechnologies.in.`],
    ],
    faqs: [
      ['Do I need experience to apply?', 'No. Fresher to Finisher is designed for people starting out. Show us what you are curious about.'],
      ['Is the work remote or in office?', 'Our team is based in Bengaluru. Ask us about the arrangement for the role you apply for.'],
    ],
    related: ['about', 'contact'],
  },
  {
    slug: 'contact',
    nav_group: 'Company',
    kind: 'contact',
    keyword: 'contact flare technologies',
    title: 'Book a Strategy Call | Contact Flare Technologies',
    desc: 'Book a 30-minute strategy call with Flare. We review your pipeline, recommend a plan and send a written proposal within two working days.',
    h1: 'Book a strategy call.',
    lead: 'Tell us about your business and what you want to grow. In 30 minutes we will look at your current pipeline, tell you which plan fits, and send a written proposal within two working days.',
    faqs: [
      ['What happens on the call?', 'We ask about your offer, customers, targets and what you have tried. You leave with a clear recommendation, even if we are not the right fit.'],
      ['Is the call free?', 'Yes. The strategy call is free and there is no obligation.'],
    ],
    related: ['growth-system', 'services', 'case-studies'],
  },
)

export { PAGES }
export const BY_SLUG: Record<string, PageData> = Object.fromEntries(PAGES.map(p => [p.slug, p]))
