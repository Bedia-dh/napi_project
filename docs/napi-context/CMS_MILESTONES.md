# NAPI Website + CMS — Milestones & Roadmap

_Last updated: 2026-07-05_

This is the running record of what's been built for the NAPI (North Africa Policy Institute) website and its CMS, what's verified working, and what's still ahead. It lives in `docs/napi-context/` alongside other NAPI project-context files so it's easy to find without digging through chat history.

---

## 1. Where things stand, in one paragraph

The public website (Next.js 16 + React 19) has all four real NAPI programs built from verified napipolicy.org content, a redesigned color system, and a working Research Hub. Behind it now sits a self-hosted CMS (Payload, on MongoDB) with 8 collections covering every major content type. Publications, Events, Programs, YPL Fellows, Roundtable Series, and Team Members are all live-wired: editing content in `/admin` updates the public site immediately, with an automatic fallback to static data if MongoDB is ever unreachable. Media uploads (photos, PDFs) work with automatic image resizing. The admin dashboard carries NAPI's own logo and a first color pass. What's left is mostly depth (translation, finer CMS permissions, a couple of program pages' deeper content) rather than foundational work.

---

## 2. Milestone: Public website content & design

- All 4 real NAPI programs built from verified source content (napipolicy.org): Young Policy Leaders, Chill-Chat, Youth Voices, NAPI-MEI Roundtables.
- A fabricated 5th program ("Policy Labs") that existed in the original codebase was identified as not real and removed site-wide — data, types, routes (now redirects to `/programs/mei-roundtables`), nav, and footer links.
- Corrected several fabricated/overstated stats caught during content verification (YPL cohort size, MEI Roundtable count) to match what's actually documented on the real site.
- Homepage carousels (Events, Publications) made properly responsive — dynamic scroll-arrow state instead of fixed breakpoints, so new CMS content doesn't visually break the layout.
- Full color system pass: migrated to `#214D90` as primary brand navy, then demoted large full-bleed sections to a deeper `--navy-dark` per a design critique (avoids an oversaturated homepage), reserving vivid navy for accents.
- Hero section carries the real NAPI intro video (hover-preview + click-to-open lightbox) and a logo/map watermark treatment.
- Reusable `VideoHoverLink` component for YouTube links (hover preview, click for full lightbox with sound) applied only to genuine YouTube URLs, verified via URL parsing rather than assumption.

**Known intentional deviation:** at the user's explicit request, text on `#214D90` navy backgrounds was flipped to black across ~10 components — this measurably hurts contrast (~2.5:1, below WCAG AA) and was flagged as such before implementing. It's live as requested; worth revisiting if accessibility becomes a priority.

---

## 3. Milestone: CMS backend (Payload + MongoDB)

**Architecture:**
- Payload CMS v3, self-hosted, integrated directly into the existing Next.js app (no separate service to run).
- MongoDB via `@payloadcms/db-mongodb`, connected through `DATABASE_URI`.
- `app/` restructured into `(frontend)` and `(payload)` route groups so the admin dashboard has its own independent layout, separate from the public site's — completed via a one-time migration script (`scripts/migrate-frontend-group.ps1`) since deleting/moving files wasn't possible in the dev sandbox this was built in.

**8 collections**, each with plain-language admin descriptions and field-level help text aimed at non-technical editors:

| Collection | Powers | Notes |
|---|---|---|
| Publications | `/research`, homepage "Latest Research" | Search/filter/sort backed by this collection |
| Events | Homepage carousel, `/events` | Unified past + planned via a "Status" field with conditional fields |
| Programs | Homepage grid, `/programs`, program page headers | Stats as repeatable label/value pairs |
| YPL Fellows | `/programs/ypl` cohort grid | Photo + policy paper upload fields |
| Roundtable Series | `/programs/mei-roundtables` | One doc per country, sessions as a repeatable array |
| Team Members | `/about` (Executive + Board) | Unified via a "Group" field with conditional fields (bio vs. organization) |
| Media | Backs every photo/PDF upload field above | Auto-generates thumbnail + card-sized image previews via `sharp` |
| Users | Admin/editor logins | Auth handled by Payload — passwords are bcrypt-hashed + salted in MongoDB, never stored in plain text |

**Media/uploads:** `sharp` is installed and wired in, so uploaded images get automatically resized preview versions (faster admin browsing, smaller page payloads). Upload fields accept images and PDFs; every upload field also has a plain-URL fallback for content still hosted externally (e.g. old napipolicy.org asset URLs).

**Admin dashboard branding:** custom NAPI logo (reusing the site's own logo asset) in the nav and login screen, custom browser tab title ("NAPI CMS"), and a best-effort accent-color override (Payload's primary button color → NAPI orange). The color override is flagged as best-effort in code comments since it couldn't be visually verified in the build environment — worth a quick look after your next `/admin` visit to confirm it rendered as intended.

**Seed script** (`npm run seed`): migrates everything that was previously hardcoded in `lib/data/*.ts` into MongoDB via Payload's Local API — 6 publications, 6 past events + 3 planned activities, 4 programs, the 9-fellow 2021 YPL cohort, 3 MEI Roundtable country series, 4 executive + 6 board members. Safe to re-run; skips any collection that already has documents.

---

## 4. Milestone: CMS ↔ website wiring

Every collection now has a real, live connection to the public site, not just a database sitting unused behind an admin panel:

| Section | Live path | Fallback behavior |
|---|---|---|
| Publications | `/research` (search/filter/sort/pagination via `GET /api/publications`) + homepage teaser | Falls back to static dataset only if MongoDB is unreachable; a genuinely-empty collection shows as empty (not silently replaced) |
| Events | Homepage carousel + `/events` (via `GET /api/events`) | Same fallback pattern |
| Programs | Homepage grid, `/programs`, and the stats/description header on every program page | Same fallback pattern |
| YPL Fellows | `/programs/ypl` cohort grid | Same fallback pattern |
| Roundtable Series | `/programs/mei-roundtables` | Same fallback pattern |
| Team Members | `/about` (photos now render if uploaded, instead of always showing a placeholder icon) | Same fallback pattern |

Two different technical patterns were used deliberately:
- **Publications and Events** go through dedicated `/api/*` routes because their pages need client-side interactivity (search-as-you-type, filter toggles, "load more" pagination).
- **Programs, YPL Fellows, Roundtable Series, and Team Members** are fetched directly inside Server Components (no extra HTTP hop), since those pages don't need that interactivity — this is the more efficient, more idiomatic Next.js approach for content that just needs to render.

### What's verified vs. what needs your confirmation

I verified every new/changed file compiles and reads correctly (re-inspected each one directly; ruled out a recurring stale-file-view issue in the dev sandbox that briefly looked like real syntax errors but wasn't). What I could **not** verify myself: the actual live MongoDB round-trip (create something in `/admin`, see it on the site) — that requires your real `DATABASE_URI`, which I don't have access to, and the dev sandbox this was built in has no general internet access to stand up a throwaway MongoDB of its own to test against.

**Please run this test loop and confirm each line:**

1. `npm run dev`, confirm it starts clean.
2. In `/admin`, edit an existing Publication's title → reload `/research` → does the new title show up? Try searching for a word from the new title too.
3. In `/admin`, add a new Event with Status = "Planned" → reload the homepage → does it appear in the Events carousel?
4. In `/admin`, edit a Program's description → reload its dedicated page (e.g. `/programs/ypl`) → does the header text update?
5. In `/admin`, upload a photo to a Team Member → reload `/about` → does their photo replace the placeholder icon?
6. Open the Media Library in `/admin` → confirm the uploaded photo shows a resized thumbnail, not just the raw original.

If any of these don't work as described, that's the next thing to fix — let me know exactly which step failed and what you saw instead.

---

## 5. Not done yet / explicitly deferred

- **Full EN/FR/AR translation** — deferred at your request ("save the translation task for later"). Still needs `next-intl`, real human-reviewed translations (not machine-translated), and RTL layout handling for Arabic.
- **Chill-Chat and Youth Voices deep content** — only the header stats/description on these two pages pull from the CMS. Their objectives lists, topic tags, eligibility criteria, and gallery photos are still hardcoded in the page files. Making those editable would mean adding new array fields to the Programs collection — a scoped follow-up, not done.
- **Role-based permissions** — the Users collection has an Admin/Editor `role` field, but nothing currently checks it. Every logged-in user can read and write every collection today.
- **Password reset flow** — not configured (Payload supports it, but needs an email transport wired up, e.g. SMTP or an email API).
- **Contrast/accessibility** — the black-text-on-navy experiment mentioned above is live as explicitly requested, despite falling below WCAG AA contrast.

---

## 6. Suggested next steps, roughly in priority order

1. Run the test loop in Section 4 and report back — this closes the loop on "does the CMS actually work end-to-end."
2. Decide whether to scope out Chill-Chat/Youth Voices' deeper content into CMS-editable fields, or leave them as developer-maintained page copy.
3. Decide on role permissions before handing `/admin` access to more than one person — right now everyone with a login has full access to everything.
4. Revisit the translation project once the above feels solid.
5. Consider the contrast/accessibility question for the black-on-navy sections if the site will be used by a broad public audience.
