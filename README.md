# Flare Technologies website

Marketing site for [Flare Technologies](https://www.flaretechnologies.in), a B2B lead-generation and growth team that also builds custom software.

Built with Next.js (App Router), React and TypeScript. Styling is a single hand-written stylesheet; there is no UI library.

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in the values (see Environment variables)
npm run dev                  # http://localhost:3000
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |

## Project structure

```
src/
  app/
    page.tsx              Home page (hand-built)
    layout.tsx            Root layout: header, footer, Google tag, fonts, metadata
    globals.css           All site styles
    sitemap.ts            Sitemap generated from PAGES
    <route>/page.tsx      Inner pages (services, industries, locations, etc.)
    admin/page.tsx        Case-study admin UI
    api/
      contact/            Contact form -> email (Resend)
      cases/              Case studies CRUD (writes require admin login)
      admin/              login / logout / check
  components/             Header, Footer, ContactForm, hero, sections, etc.
  lib/
    content.ts            Copy for every inner page, menus, projects, cases
    caseStore.ts          Reads/writes data/case-studies.json
    types.ts              PageData and related types
data/case-studies.json    Case studies managed through /admin
public/assets/            Images, logos, favicon, OG image
```

## Editing content

Most inner pages are data-driven. Each route file under `src/app/` looks up its page in [`src/lib/content.ts`](src/lib/content.ts) by slug and renders it with the shared `InnerPage` component. To change a page's copy, FAQs, sections or related links, edit its entry in the `PAGES` array there.

To add a page:
1. Add a `PageData` entry to `PAGES` in `content.ts` (the sitemap picks it up automatically).
2. Create `src/app/<slug>/page.tsx` that renders it, copying an existing route file such as `src/app/services/page.tsx`.
3. Add it to `MENU_LABEL` and the relevant menu in `content.ts` if it should appear in the navigation.

The home page copy lives directly in `src/app/page.tsx`.

## Case studies and the admin panel

Case studies are stored in `data/case-studies.json` and managed at `/admin`. Logging in sets a cookie that allows creating, editing and deleting entries through `/api/cases`. Reading is public.

Things to know:
- Set `ADMIN_PASSWORD` in every deployed environment. If it is unset, the code falls back to a default password.
- The store writes to the local filesystem, so it only persists on hosts with a writable, persistent disk. On serverless hosts such as Vercel, edits made through `/admin` will not persist.
- The admin cookie is a plain flag rather than a signed session, so treat the admin as low-security until that is hardened.

## Contact form

The "Book a strategy call" form posts JSON to `/api/contact`, which validates it and emails the submission through the [Resend](https://resend.com) API. The visitor's address is set as reply-to. A hidden honeypot field silently drops bot submissions.

For emails to deliver in production:
1. Create a Resend API key.
2. Verify your sending domain in Resend (add the SPF and DKIM records it gives you).
3. Set the environment variables below on your host and redeploy.

Until the domain is verified, Resend only allows the `onboarding@resend.dev` sender and only delivers to your own Resend account email.

## Analytics

The Google tag (Tag Manager container `GTM-TCNXKNRH`) is loaded once from `src/app/layout.tsx`. A successful contact form submission pushes a `generate_lead` event to the `dataLayer` (service only, no personal data). To use it as a conversion, create a Custom Event trigger named `generate_lead` in Tag Manager and attach it to your GA4 or Google Ads tag.

There is no cookie-consent banner yet; add one before relying on advertising or analytics tags for EU or UK traffic.

## Environment variables

See [`.env.example`](.env.example).

| Variable | Required | Purpose |
| --- | --- | --- |
| `RESEND_API_KEY` | Yes, for the contact form | Resend API key |
| `CONTACT_FROM` | Recommended | Sender, e.g. `Flare Technologies <marketing@flaretechnologies.in>`; must be on a domain verified in Resend |
| `CONTACT_TO` | No | Where submissions are sent; defaults to `marketing@flaretechnologies.in` |
| `ADMIN_PASSWORD` | Yes, in production | Password for `/admin` |
| `NEXT_PUBLIC_GTM_ID` | No | Overrides the default Google Tag Manager container ID |

Never commit `.env` or `.env.local`; both are git-ignored.

## Notes

- `next.config.ts` sets `trailingSlash: true` and `images.unoptimized`, so internal links end with `/`.
- The 3D hero (`HeroStage` / `Hero3D`, built on `three`) is currently not rendered on the home page. The components and styles are kept so it can be re-enabled by adding `<HeroStage />` back into the hero section of `src/app/page.tsx`.
