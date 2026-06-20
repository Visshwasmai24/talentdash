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
| `/` | Static | Homepage matching the full product mockup — hero headline with Explore Salaries / Compare Offers CTAs, trust stats, Career Intelligence Hub cards, top roles, category grid |
| `/salaries` | SSG + URL params | Filterable salary table (the F1–F7 core deliverable) plus an insights header — top paying companies, salary heatmap, top roles, salary by experience |
| `/companies/[slug]` | Static (generateStaticParams) | Per-company page with median TC, level bar |
| `/compare` | Client Component | Side-by-side comparison with delta column |
| `/reviews` | Static, derived from mock data | Top rated companies, latest reviews, review highlights — UI matches the mockup; review text/ratings are illustrative, not a real review dataset |
| `/interviews` | Static, derived from mock data | Recent questions by company, browse by role, trending topics — UI matches the mockup; question content is illustrative |
| `/workplace-index` | Static, derived from mock data | Ranking lists, industry breakdown, embedded Offers and Tools sections |
| `/offers` | Static, derived from mock data | Offer Score widget and breakdown — UI matches the mockup; scoring is illustrative, not a real model |
| `/tools` | Static | Calculator tiles linking back into existing pages — no calculator logic is implemented |
| `/community` | Static, derived from mock data | Trending discussions, popular communities, top contributors — UI matches the mockup; thread content is illustrative |
| `/jobs` | Static, derived from mock data | Role listings with median comp, sourced from the real salary dataset |
| `/login`, `/signup` | Static | Visual forms only — no auth wiring |
| `/contribute` | Static | Placeholder — no data-submission form yet |

## What changed in this pass

The brief originally scoped **Salaries, Company pages, Compare, and Auth** (F1–F7), and I built the rest of the nav as lightweight "coming soon" stubs. I was then asked to match the homepage and every other section (Reviews, Interviews, Workplace Index, Offers, Tools, Community) exactly to a separate, more expansive product mockup. I did that: every page below now has the full visual layout from the mockup — stats bars, cards, heatmaps, rankings, sparklines — built with inline SVG (no charting library was added).

**What's real vs. illustrative, to be upfront about during review:**
- Salary numbers, company names, role names, and the heatmap/role rankings on `/salaries`, `/jobs`, and the homepage are computed live from `lib/mock-data.ts` — same dataset as the original trial.
- Review text, interview questions, forum threads, and the Offer Score on `/reviews`, `/interviews`, `/community`, `/offers`, and `/workplace-index` are illustrative content written to match the mockup's layout — there's no underlying review/interview/forum/offer dataset behind them. Stat banners on those pages (e.g. "2.4M+ reviews," "280K+ offers analyzed") are the mockup's own placeholder figures, not derived from anything real.
- `/tools` calculator tiles link to existing pages; none of the five calculators have real logic.
- `/login` and `/signup` are static visual forms with disabled inputs — no auth.

## Known incomplete items (not finished yet)

- **No real backend** — everything reads from `lib/mock-data.ts`. No database, no live currency FX (INR↔USD uses a fixed mock conversion rate in `lib/config.ts`).
- **No search/typeahead** — no global typeahead search is implemented; a real implementation would need Typesense/Fuse.js. The homepage uses direct CTA links (Explore Salaries / Compare Offers) into `/salaries` and `/compare` instead of an inline search bar.
- **No calculators** — `/tools` tiles are visual only.
- **No auth** — `/login`/`/signup` are static forms, explicitly out of scope per the original brief.
- **No real review/interview/forum/offer datasets** — those pages render real-looking layouts over illustrative content; see above.

## Architecture Decisions

**Static vs ISR vs Dynamic**
- `/salaries` uses server components reading mock data at request time (in production: ISR revalidate:3600)
- `/companies/[slug]` uses `generateStaticParams()` — prebuilt for every known company at build time
- `/compare` is `'use client'` — justified because it requires interactive dropdowns and URL state management
- New pages (`/reviews`, `/interviews`, `/workplace-index`, `/offers`, `/community`, `/jobs`) are server components, static, no client JS
- No SSR pages — public data doesn't need auth or personalisation

**Pagination**
Page-based (not cursor-based) because: (a) users need to jump to page N, (b) salary tables are sorted not streamed, (c) cursor pagination adds complexity with no benefit for this use case.

**Charts**
All sparklines, bars, and the salary heatmap on `/salaries` and the homepage are hand-built inline SVG/CSS — no charting library was added, to keep the dependency footprint at zero, matching the existing trial constraint.

**What I would build with more time**
- Typeahead autocomplete on company search (Typesense or Fuse.js)
- Salary submission form with client-side validation
- Real review/interview/forum datasets and submission flows
- A real Offer Score model instead of a static illustrative number
- Working calculators on `/tools`
- ISR revalidation webhooks when new records are ingested
- Working `/login` and `/signup` with real auth

**What I deliberately cut**
- Auth (explicitly out of scope per the brief)
- Real database connection (frontend trial uses mock data)

## Stack

- Next.js 15 App Router + TypeScript strict
- Tailwind CSS (no component libraries — all custom)
- Zero client JS on server components
- JSON-LD structured data on all salary pages
