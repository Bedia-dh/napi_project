# NAPI Website Redesign — Project Context & Milestones

> Last updated: 2026-06-28
> Project: North Africa Policy Institute (NAPI) — Full website redesign
> Stack: Static HTML/CSS/JS prototypes → handoff to final CMS/framework

---

## 1. Client Overview

**Organization:** North Africa Policy Institute (NAPI)
**Nature:** Independent think tank — policy research, youth empowerment, advocacy
**Region:** North Africa / Maghreb (Morocco, Tunisia, Algeria) + Arab world
**Founded:** 2017
**Scale:** 200+ young leaders trained, 85+ publications, 12 countries reached

### Flagship Programs
| Program | Description |
|---|---|
| **Youth Policy Lab (YPL)** | Year-long fellowship — 25 young researchers paired with senior mentors to produce policy papers. Two cohorts: 2020 & 2024. |
| **Chill Chat** | Regular online dialogue series across borders. Co-organizable by partner organizations. |
| **Policy Labs** | Intensive co-design workshops — youth pitch policy solutions to governments and civil society. |
| **Youth Voices** | Open publishing platform for young writers across North Africa (blog-style articles). |

### Focus Themes
Health Equity · Governance & Democracy · Climate & Environment · Education & Youth · Gender & Inclusion · Economy & Labour

### Brand Identity
| Token | Value |
|---|---|
| `--navy` | `#0d1e3d` |
| `--navy-mid` | `#1a3260` |
| `--orange` | `#e05c12` |
| `--cream` | `#faf9f7` |
| `--gray-mid` | `#8a8f9a` |
| Font | Segoe UI / Arial (system stack) |
| Icons | Tabler Icons (outline webfont) |
| Design system | Tri-color — Navy + Orange + White |

---

## 2. Project Setup

### Tools & Access
- **Design source:** Stitch AI (Google) — project accessed via MCP integration
- **MCP transport:** HTTP · endpoint `https://stitch.googleapis.com/mcp`
- **API key scope:** Read-only (list/get screens works; edit requires OAuth 2.0)
- **Workaround:** Full redesigns built as standalone HTML files (self-contained, no server needed)
- **Icon CDN:** `https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css`

### Output Location
```
C:\Users\Bedie\Desktop\napi-designs\
├── homepage.html
├── about.html
├── research-hub.html
└── NAPI_PROJECT_CONTEXT.md   ← this file
```

---

## 3. Client Requirements (from Q&A Interview)

### Languages
- All public pages must support **EN / FR / AR** (language switcher in navbar and footer)
- Publication cards must show which languages each paper is actually available in

### Navigation Structure
```
Home
About
Research Hub (Publications)
Events & Programs
  ├── Overview
  ├── Upcoming Events
  ├── Program Activities
  │   ├── Youth Policy Lab (YPL)
  │   ├── Chill Chat
  │   ├── Youth Voices
  │   └── Policy Labs
  └── Past Events Archives
Get Involved
Contact
```

### Key Functional Requirements
- **PDF preview modal** on all publication cards (not just download)
- **Google Form embeds** for event registration
- **Publication filters:** Language, Type (Brief/Paper/Report/Proceedings), Theme, Program, Year
- **YPL sub-page:** Cohort visualization, participant cards (photo + bio + policy issue + paper PDF)
- **Chill Chat section:** Description, methodology, impact stats, photo gallery, co-organize contact
- **Youth Voices:** Blog-style article listing
- **Get Involved:** Multiple pathways with form links (Apply, Partner, Donate, Volunteer)
- **Impact stats** visible on homepage and get-involved page
- **Membership/contact form** on Get Involved
- **Newsletter subscription** in footer and dedicated section
- **Discord privacy gate** equivalent: private content not surfaced publicly
- **Mobile-first priority pages:** Homepage, Research Hub, Get Involved

---

## 4. Design Decisions

| Decision | Rationale |
|---|---|
| Tri-color system (Navy/Orange/White) | Client brand — established in Stitch designs, carried into HTML |
| Sticky navbar (64px height) | Persistent navigation across all long-scroll pages |
| Ticker / marquee bar below nav | Surface announcements without cluttering hero |
| Hero card stack visual (homepage) | Highlights featured publication dynamically without images |
| Hover-reveal overlay on team cards | Shows bio + social links on hover — clean default state |
| Color-coded publication type badges | Policy Brief (blue) · Research Paper (green) · Report (purple) · Proceedings (red) |
| Language chips on every pub card | EN · FR · AR — grayed out if unavailable, orange if available |
| PDF preview modal | Open full-screen overlay with page count + download CTA |
| Horizontal scroll carousel for events | JS scroll buttons (left/right), smooth scroll behavior |
| Sidebar filter panel (Research Hub) | Language tags + Type/Theme/Program/Year checkboxes with counts |
| Section eyebrow labels | Small uppercase orange text above every section title |
| Stats band after hero | 4 key numbers in white bar — immediate social proof |
| Focus area cards with publication count | Bottom orange underline on hover |
| Program cards — dual-zone layout | Color block left + body right (grid-template-columns: 140px 1fr) |
| Footer — 4-column grid | Brand description + 3 link columns + social icons |

---

## 5. Screens — Status

| # | Screen | Status | File |
|---|---|---|---|
| 1 | Homepage (Landing Page) | ✅ Complete | `homepage.html` |
| 2 | About Page | ✅ Complete | `about.html` |
| 3 | Research Hub | ✅ Complete | `research-hub.html` |
| 4 | Events & Programs | 🔲 Next | — |
| 5 | Get Involved | 🔲 Pending | — |
| 6 | Health Equity / Focus Areas | 🔲 Pending | — |
| 7 | CMS Dashboard | 🔲 Pending | — |

---

## 6. Completed Screens — Feature Inventory

### 6.1 Homepage (`homepage.html`)
- Sticky navbar with EN/FR/AR language switcher + "Join NAPI" CTA
- Orange ticker/marquee bar — rotating announcements
- Hero: headline, sub-copy, two CTAs, trust row (avatar stack + member count), floating publication card
- Stats band: 85+ Publications · 200+ Leaders · 12 Countries · 6 Themes
- Upcoming Events: horizontal scroll carousel with date badge, event type pill, meta info (time, location, audience), Register CTA
- Focus Areas: 6-card grid (navy background), icon, title, description, publication count badge, orange underline hover
- Featured Publications: 3-card grid, type label, EN/FR/AR chips, download link
- Programs: 4-card grid, color-coded left block per program (YPL navy, Chill Chat green, Policy Labs red-orange, Youth Voices blue)
- Get Involved: 3 pathways — Apply to YPL, Partner With Us, Support Our Work
- Newsletter section: orange background, email input + subscribe button
- Footer: 4-column, social icons, privacy/terms links

### 6.2 About Page (`about.html`)
- Hero: tag, headline, sub-copy, 4 founding stats (year, countries, leaders, publications)
- Mission / Vision: full-width two-column split — orange block (mission) + navy block (vision)
- Core Values: 6-card grid on cream background, icon + title + description, top orange border, hover lift
- Our Story: two-column — text (left) + dark navy stats panel (right) with 3 impact stats
- Executive Team: 4-card grid, photo placeholder, name/role, **hover-reveal overlay** with bio + LinkedIn/Twitter/email icons
- Board of Advisors: distinct section on navy background, 6-card grid, name + role + organization
- CTA Band: orange full-width — "Want to collaborate?" + "Get in Touch" white button
- Footer: consistent with homepage

### 6.3 Research Hub (`research-hub.html`)
- Sticky search bar (top: 64px — below nav), sort dropdown, filter toggle button
- Sidebar filter panel (260px): Language tags (EN/FR/AR), Type checkboxes with counts, Theme checkboxes, Program tags, Year tags, Clear All button
- Featured Publication hero: navy gradient card, type badge, title, author/year/page/program meta, EN/FR/AR language chips, Download + Preview buttons, document icon cover
- Results count bar + "Save this search" link
- Publication grid (2 columns): color-coded type badge + program badge, title, author/year/pages meta, EN/FR/AR availability chips, Download + Preview buttons
- 6 sample publication cards covering all 4 types and all 4 programs
- Load More button
- PDF Preview modal: overlay, header with title + close, viewer area with page indicator, footer with full download CTA
- Newsletter section: orange, email input
- Filter interactions: JS `toggleTag()`, `clearFilters()`, modal open/close with overlay click-to-close

---

## 7. Pending Screens — Requirements Detail

### 7.1 Events & Programs (Next)
**Tab navigation:** Overview · Upcoming Events · Program Activities · Policy Labs · Past Events Archives

**YPL Section:**
- Cohort sub-tabs: 2020 & 2024
- Participant cards: photo, name, bio, policy issue, paper PDF download
- Video embed for 2024 cohort

**Chill Chat Section:**
- Description + methodology
- Impact stats (episodes, viewers, countries)
- Photo gallery
- Contact form / CTA for co-organizing

**Youth Voices Section:**
- Blog-style article listing (title, author, date, excerpt, read more)

**Upcoming Events:**
- Carousel with Google Form registration embeds
- Filter by type (webinar / workshop / conference / chill chat)

**Past Events Archive:**
- Paginated list or grid
- Filterable by year and type

**CTA Band:** "Drive Change With NAPI"

---

### 7.2 Get Involved
- Multiple pathways: Apply to YPL, Become a Partner, Donate, Volunteer, Co-host Chill Chat
- Impact stats band (people trained, countries, events hosted)
- Membership / application form (embeds or native)
- Newsletter subscription
- Contact Us section (map optional, contact form required)

---

### 7.3 Health Equity / Focus Areas
- Clarify nav placement (standalone page vs. sub-section)
- Publications filter scoped to the theme
- Project cards with status indicators (ongoing / completed)
- Team members linked to this focus area

---

### 7.4 CMS Dashboard
- Sidebar: Dashboard, Publications, Events, Programs, Users/Team Management (to add)
- Publications table: language indicator column (EN/FR/AR availability)
- Scheduled publishing support (status: Draft / Scheduled / Published)
- Visibility toggle per item (public / private)

---

## 8. Shared Components (Used Across All Pages)

### Navbar
```html
<!-- sticky, z-index:200, height:64px, background:var(--navy) -->
<nav>
  Logo | Nav links | EN/FR/AR lang switcher | CTA button
</nav>
```

### Footer
```html
<!-- 4-col grid: brand+socials | Navigate | Programs | Resources/Connect -->
<footer>  background:#0a1829 or var(--navy)  </footer>
```

### Language Switcher
- Buttons: EN · FR · AR
- Active state: `background:var(--orange)`, JS `setLang(code, btn)`

### PDF Preview Modal
```js
function openModal(){ document.getElementById('pdfModal').classList.add('open') }
function closeModal(){ document.getElementById('pdfModal').classList.remove('open') }
// click overlay to close
document.getElementById('pdfModal').addEventListener('click', e => { if(e.target===this) closeModal() })
```

### Carousel (Events)
```js
function scroll(dir){
  document.getElementById('carousel').scrollBy({left: dir*340, behavior:'smooth'})
}
```

---

## 9. Notes for Handoff

- All files are self-contained HTML — open directly in any browser, no server needed
- Tabler Icons loaded from CDN — requires internet connection to display icons
- No framework dependencies — pure HTML/CSS/JS
- CSS custom properties (`--navy`, `--orange`, etc.) make retheming trivial
- All interactive elements (filters, modal, carousel, language toggle) are functional JS — not just visual
- Images: all placeholders use CSS gradients or Tabler icon glyphs — replace with real assets at handoff
- Forms: all form inputs are UI-only — wire to backend or Google Forms at integration phase
- Google Form embeds: will need `<iframe src="https://docs.google.com/forms/...">` at final integration

---

## 10. Next Session Checklist

- [ ] Build `events-programs.html` (Events & Programs — full page)
- [ ] Build `get-involved.html`
- [ ] Build `health-equity.html` (or focus areas page)
- [ ] Build `cms-dashboard.html`
- [ ] Mobile responsive pass — Homepage, Research Hub, Get Involved (client priority)
- [ ] YPL dedicated sub-page — cohort visualization, participant cards
- [ ] Final design review against Stitch originals
- [ ] Handoff spec sheet (spacing, tokens, component props)
