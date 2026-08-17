# CMS setup — Payload + MongoDB

This adds a self-hosted CMS (Payload) at `/admin` so NAPI staff can edit
Publications, Events, Programs, YPL Fellows, Roundtable Series, and Team
Members without touching code. This document is the one-time setup you need
to run locally (it can't be finished automatically in the dev sandbox this
was built in — see "Why a manual step is needed" below).

## 1. Install dependencies

```
npm install
```

`payload`, `@payloadcms/db-mongodb`, `@payloadcms/next`, `@payloadcms/richtext-lexical`,
and `graphql` are already declared in `package.json`.

**Do not run `npm audit fix --force`.** npm's audit tool doesn't understand
Payload's peer-dependency structure and will "fix" `@payloadcms/richtext-lexical`
down to a `0.x` release built for Payload v2, which silently breaks the v3
install you just did (it did this the first time this was tried). The
moderate/high advisories it flags (dompurify inside the admin's Monaco editor,
lodash inside lexical, postcss inside Next's own bundling) are all transitive
dev/admin-UI dependencies with no exploit path in this app; it's safe to leave
them and dismiss the `npm audit` warnings.

If you already ran `--force` and things look broken (peer dependency errors
mentioning `payload@2.x` when installing `@payloadcms/richtext-lexical`), reset
with:

```
rmdir /s /q node_modules
del package-lock.json
npm install
```

## 2. Run the one-time restructuring script

Payload's admin dashboard needs its own independent page layout, separate
from the public site's. Next.js only allows that if every route lives in a
route group with no top-level `app/layout.tsx`. Run:

```
powershell -ExecutionPolicy Bypass -File scripts/migrate-frontend-group.ps1
```

This moves the existing site pages (`page.tsx`, `about/`, `contact/`,
`events/`, `get-involved/`, `programs/`, `research/`, `layout.tsx`,
`globals.css`, `favicon.ico`) into `app/(frontend)/`. The Payload admin
files already live in `app/(payload)/` and `app/api/publications` stays
where it is. After running it, `app/` should contain only `api/`,
`(frontend)/`, and `(payload)/`.

## 3. Environment variables

Copy `.env.example` to `.env.local` and fill in:

- `DATABASE_URI` — a MongoDB connection string. Easiest options: install
  MongoDB Community Server locally, or create a free cluster at
  mongodb.com/atlas and paste its connection string.
- `PAYLOAD_SECRET` — any long random string (e.g. `openssl rand -base64 32`).

## 4. Start the dev server and create your admin account

```
npm run dev
```

Visit `http://localhost:3000/admin` — Payload will prompt you to create the
first admin user (name, email, password). This is separate from any site
content; it's just your CMS login.

## 5. Seed the database with the real NAPI content

```
npm run seed
```

This pushes everything currently hardcoded in `lib/data/*.ts` (6 real
publications, 6 past events + 3 planned activities, 4 programs, the 9-fellow
2021 YPL cohort, the 3 MEI Roundtable series, 4 executive team + 6 board
members) into MongoDB via Payload, so the CMS starts populated instead of
empty. It's safe to re-run — it skips any collection that already has
documents.

## 6. Media uploads (photos, PDFs)

`sharp` is now installed and wired into `payload.config.ts`, so the Media
collection auto-generates resized preview images (`thumbnail`, `card`) for
anything you upload. To attach a photo or PDF to something: open the Media
Library in `/admin`, upload the file first, then go to the record you want
(e.g. a Team Member or YPL Fellow) and pick it from that record's "Photo" or
"PDF" field. Every upload field also has a plain-text fallback ("Photo URL" /
"PDF URL") in case you'd rather link an externally-hosted file instead.

## What's wired up

Every collection now has a live, CMS-to-website connection:

- **Publications** → `/research` (search/filter/sort/pagination via
  `GET /api/publications`) and the homepage "Latest Research" carousel.
- **Events** → the homepage "Where We've Been, What's Next" carousel and the
  full `/events` page (via `GET /api/events`).
- **Programs** → the homepage "How We Work" grid, `/programs`, and the
  stats/description text at the top of each individual program page.
- **YPL Fellows** → the cohort grid on `/programs/ypl`.
- **Roundtable Series** → the country-by-country listings on
  `/programs/mei-roundtables`.
- **Team Members** → the Executive Team and Board of Advisors sections on
  `/about`, including photos if you upload one.

All of these fall back to the static `lib/data/*.ts` files automatically if
MongoDB is unreachable, so the site never goes blank during local dev — but
once MongoDB is connected and seeded, everything above reads live from
whatever's in `/admin`.

Still static (not yet CMS-editable): the detailed body content on
`/programs/chill-chat` and `/programs/youth-voices` — objectives, topic
tags, eligibility criteria, and gallery photos. Only their header
stats/description pull from the CMS today; making the rest editable would
mean adding new fields to the Programs collection, which hasn't been
scoped yet.

## Why a manual step is needed

The dev environment this was built in mounts your project folder in a way
that can create and edit files but cannot delete or rename them (a
Windows-file-lock-through-Linux-mount quirk specific to that sandbox). Moving
the existing site pages into `app/(frontend)/` requires deleting the old
`app/layout.tsx`, which that environment could not do — so it's packaged as
a script for you to run once, locally, where deleting files works normally.
