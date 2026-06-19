# TalentDash — Frontend

Career intelligence platform.

## Live URL
https://talentdash-lilac.vercel.app/

## Run locally (under 5 minutes)

```bash
npm install
npm run dev
# Open http://localhost:3000
```

No environment variables required for the frontend trial (mock data only).

## Pages

| Route | Type | Description |
|---|---|---|
| `/` | Static | Homepage with hero, company cards, and top records |
| `/salaries` | SSG + URL params | Filterable salary table, 25/page, URL-encoded filters |
| `/companies/[slug]` | Static (generateStaticParams) | Per-company page with median TC, level bar |
| `/compare` | Client Component | Side-by-side comparison with delta column |
| `/tools`, `/reviews`, `/interviews`, `/jobs`, `/community`, `/offers`, `/contribute` | Static | "Coming soon" pages — see **Scope: what's beyond the brief** below |

## Scope: what's beyond the brief

The original brief only called for **Salaries, Company pages, Compare, and Auth**. While building, I mirrored that core flow exactly, but I also stubbed out the rest of the product surface (`/tools`, `/reviews`, `/interviews`, `/jobs`, `/community`, `/offers`, `/contribute`) and linked them from the nav and footer. I did this so the site feels like a real, navigable product rather than a 3-page demo — but every one of those pages is intentionally a lightweight "coming soon" placeholder, not a feature I'm claiming to have finished. None of them have real data, forms, or backend wiring.

## Known incomplete items (not finished yet)

- **`/tools`, `/reviews`, `/interviews`, `/jobs`, `/community`, `/offers`** — placeholder "coming soon" screens only. No calculators, no review submission, no job listings, no forum threads.
- **`/contribute`** — placeholder page; there's no actual data-submission form yet.
- **No real backend** — everything reads from `lib/mock-data.ts`. No database, no live currency FX (INR↔USD uses a fixed mock conversion rate in `lib/config.ts`).
- **No search/typeahead** — removed the homepage search bar (see below); a real implementation would need Typesense/Fuse.js.
- **No charts** — company pages show a median figure but no TC-over-time trend visualization yet.

## Buttons / links that don't work yet

These are visible and lead somewhere, but only to a "coming soon" placeholder rather than a working feature:
- Nav/footer: **Tools**, **Reviews**, **Interviews**, **Jobs**, **Forum (Community)**, **Offers**, **Contribute**

## Architecture Decisions

**Static vs ISR vs Dynamic**
- `/salaries` uses server components reading mock data at request time (in production: ISR revalidate:3600)
- `/companies/[slug]` uses `generateStaticParams()` — prebuilt for every known company at build time
- `/compare` is `'use client'` — justified because it requires interactive dropdowns and URL state management
- No SSR pages — public data doesn't need auth or personalisation

**Pagination**
Page-based (not cursor-based) because: (a) users need to jump to page N, (b) salary tables are sorted not streamed, (c) cursor pagination adds complexity with no benefit for this use case.

**What I would build with more time**
- Typeahead autocomplete on company search (Typesense or Fuse.js)
- Salary submission form with client-side validation
- Charts on company pages (TC trend over time)
- ISR revalidation webhooks when new records are ingested
- Real implementations behind the `/tools`, `/reviews`, `/interviews`, `/jobs`, `/community`, `/offers`, `/contribute` placeholders
- Working `/login` and `/signup` pages

**What I deliberately cut**
- Auth (explicitly out of scope per the brief)
- Real database connection (frontend trial uses mock data)

## Stack

- Next.js 15 App Router + TypeScript strict
- Tailwind CSS (no component libraries — all custom)
- Zero client JS on server components
- JSON-LD structured data on all salary pages
