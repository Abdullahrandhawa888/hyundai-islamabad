# Hyundai Islamabad

The website for Hyundai Islamabad, a Hyundai dealership operated by Ittehad Automotive. Built with Next.js (App Router), TypeScript, and Tailwind CSS v4. Deployed on Vercel, auto-deploying on every push to `main`.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Other scripts:

```bash
npm run build   # production build
npm run start   # run the production build locally
npm run lint    # eslint
```

## Where things live

**`lib/data.ts`** is the single source of truth for almost everything on the site: vehicle models and pricing, the nav menu, team members, offers, news articles, service info, FAQ-style content, and the `site` object (phone number, address, hours, social links, etc.). Most day-to-day edits — a new price, a new team member, a new offer — happen in this one file. `lib/types.ts` defines the shapes that file's data must match.

**`app/`** is the Next.js App Router tree — one folder per route. Dynamic routes (`app/models/[slug]`, `app/news/[slug]`, `app/team/[slug]`) render from the data arrays in `lib/data.ts` via `generateStaticParams`, so adding a new vehicle, news article, or team member to that file is usually enough to get a new page without touching any route code.

**`components/`** is organized by the area of the site that uses it:
- `layout/` — header, footer, the sticky timings bar, the site shell that wraps every page, the WhatsApp button
- `home/` — homepage-only sections (hero slider, model range, dealer intro, etc.)
- `models/`, `team/`, `emi/` — components specific to those sections
- `shared/` — reused across multiple pages (buttons, form fields, breadcrumbs, the generic page hero banner)

**`public/images/`** holds every image, grouped by use: `vehicles/`, `team/`, `news/`, `hero/`, plus a couple of top-level shared images (logo, dealer photo). Each vehicle typically has a `-card.png` (used in list/grid views) and a full-size image (used on its detail page).

## Conventions worth knowing

- Tailwind v4 is configured via CSS in `app/globals.css` (`@theme inline`), not a `tailwind.config.js`. Brand colors (`--accent`, `--navy`, etc.) are defined there.
- Banner/hero images that must never crop awkwardly use the aspect-ratio-lock technique: `aspect-[W/H]` matching the image's exact pixel dimensions, with no fixed height. See `components/team/TeamHeroBanner.tsx` or `components/shared/PageHero.tsx` for examples.
- After changing an image file in `public/images/`, clear `.next/cache/images` and restart the dev/prod server — Next's image optimizer can otherwise serve a stale cached version.
