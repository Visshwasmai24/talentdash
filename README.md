# TalentDash — Frontend

Career intelligence platform for Indian tech salaries.

## Live URL
> Deploy to Vercel with `npx vercel --prod`

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
| `/` | Static | Homepage with company cards and top records |
| `/salaries` | SSG + URL params | Filterable salary table, 25/page, URL-encoded filters |
| `/companies/[slug]` | Static (generateStaticParams) | Per-company page with median TC, level bar |
| `/compare` | Client Component | Side-by-side comparison with delta column |

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

**What I deliberately cut**
- Auth (explicitly out of scope per the brief)
- Interview/Reviews pages (not in the frontend brief)
- Real database connection (frontend trial uses mock data)

## Stack

- Next.js 15 App Router + TypeScript strict
- Tailwind CSS (no component libraries — all custom)
- Zero client JS on server components
- JSON-LD structured data on all salary pages
