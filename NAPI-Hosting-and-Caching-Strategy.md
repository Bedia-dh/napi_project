# NAPI Website — Hosting & Caching Strategy

**Prepared for:** NAPI leadership
**Context:** The new napipolicy.org site is built on Next.js + Payload CMS + MongoDB — a completely different stack from the old WordPress site. WordPress-style hosting (like the SiteGround plan currently in use) cannot run this stack: SiteGround's shared/GoGeek plans only run PHP applications and have no Node.js runtime. This document recommends where to host the new site, what it costs per month, and how to keep the existing domain, napipolicy.org.

---

## 1. Recommendation, in one paragraph

Keep **napipolicy.org registered where it is (SiteGround)** — there's no need to move the registration — but point its DNS to a new host built for this stack: **Vercel** (the company that makes Next.js) for the website itself, **MongoDB Atlas** for the database, and **Cloudflare R2** for storing uploaded images and PDFs. Combined, this runs **approximately $28-40/month**, scales automatically as traffic grows, and can be live within a day of DNS being updated. The old SiteGround WordPress hosting plan can be cancelled once the new site is confirmed working, which should offset some or all of the new cost.

---

## 2. Why not keep everything at SiteGround?

SiteGround's hosting plans (StartUp, GrowBig, GoGeek) are built to run PHP/WordPress sites via Apache/LiteSpeed. They do not offer a Node.js application runtime, so the Next.js server and the Payload CMS admin panel cannot run there at all, regardless of plan tier. The domain registration and DNS management are unrelated to this limitation and can stay exactly where they are — only the *hosting* needs to move.

---

## 3. Hosting components needed, and what they cost

This stack has three separate pieces, each hosted independently — this is normal for modern Next.js apps and is not a sign of unnecessary complexity:

| Component | What it does | Recommended provider | Est. monthly cost |
|---|---|---|---|
| **Website / app hosting** | Runs the Next.js frontend and the Payload admin panel | **Vercel — Pro plan** | $20 (1 seat) |
| **Database** | Stores publications, programs, events, team, contact form submissions | **MongoDB Atlas — Flex tier** | $8-30 (usage-capped) |
| **File storage** | Stores uploaded photos and PDF files | **Cloudflare R2** | $0-5 (likely free at current scale) |
| **Domain + DNS** | napipolicy.org registration and DNS records | **SiteGround (unchanged)** | Whatever is already being paid for the domain only |
| **Total (new hosting only)** | | | **≈ $28-40/month** |

### Why Vercel Pro, not the free Hobby plan
Vercel's free "Hobby" tier explicitly prohibits commercial use in its Terms of Service — defined as any deployment used for financial gain, which includes "any method of requesting or processing payment from visitors," which covers the donation flow planned for the Get Involved page. Vercel can disable a Hobby deployment at any time for violating this. The Pro plan ($20/month, one seat is enough for a small team) removes this restriction, includes 1TB of bandwidth and a $20 usage credit, and is built specifically to run Next.js efficiently (unsurprising, since Vercel created Next.js).

### Why MongoDB Atlas Flex, not a bigger tier
The Flex tier (MongoDB's replacement for the old free/shared tiers) is billed hourly with a hard cap at $30/month, so there's no risk of a surprise bill from a traffic spike — it simply won't scale past what's needed for a site at NAPI's current size. If traffic grows substantially (multiple publications indexed, high daily visitor counts), Atlas allows upgrading later to a dedicated tier without any code changes.

### Why Cloudflare R2 for files, and why this one matters most
This is the one piece that isn't optional — it's a required fix, not a nice-to-have. Explained in Section 4 below.

### Alternatives considered
- **Railway** ($5-20/month, usage-based) — cheaper, and could run the whole app plus a self-hosted MongoDB in one place, but is less specialized for Next.js (no built-in ISR edge caching, ImageOptimization, etc. — see Section 5) and would need more manual configuration to match Vercel's out-of-the-box performance.
- **Render** — similar tradeoffs to Railway; recently reduced free/included bandwidth allowances (April 2026), and free web services "spin down" after 15 minutes idle, adding a slow "cold start" for the first visitor after a quiet period — not ideal for a public-facing site.
- **DigitalOcean App Platform** — solid option, $5/month per service plus $15/month for a managed database, but again lacks Vercel's Next.js-specific optimizations (automatic image resizing, edge caching for ISR pages) without extra setup work.

Vercel + Atlas is the recommendation because it requires the least custom configuration to get right, which matters given there's no dedicated DevOps person maintaining this day to day.

---

## 4. Required code change: move file storage off the server disk

Right now, the Payload CMS "Media" collection (which stores every uploaded photo and PDF — team photos, fellow photos, event images, publication PDFs) saves files to a folder on the server's local disk (`media-uploads/`). This works fine on a traditional always-on server, but **serverless platforms like Vercel don't have a persistent local disk** — anything saved to disk during one request can vanish before the next request arrives, and uploaded files would be lost.

This needs to be fixed before launch by switching Payload's Media collection to use **Cloudflare R2** (an S3-compatible cloud storage service) instead of local disk. R2 was chosen over Amazon S3 specifically because it charges nothing for bandwidth ("egress") — every other major provider (AWS S3, Google Cloud Storage, Azure Blob) charges per gigabyte every time a file is downloaded, which adds up for image-heavy pages. R2's storage cost is also slightly cheaper ($0.015/GB/month), and NAPI's media library (a few hundred photos and PDFs) is small enough to likely stay within R2's permanent free monthly allowance (10GB storage, 1 million write operations, 10 million read operations) — meaning this piece may cost $0.

This is a one-time backend change (swapping a storage adapter in the Payload config) plus creating a free Cloudflare account and an R2 "bucket." It does not require re-uploading existing content by hand — Payload's storage adapters can migrate existing files.

---

## 5. Caching, performance & SEO strategy

Three techniques cover most of what improves speed, uptime, and search ranking for this kind of site — publications, programs, and event pages that update occasionally but aren't fast-changing minute to minute.

### 5.1 Incremental Static Regeneration (ISR)
Right now, pages like the Research library, Programs pages, and Events page query MongoDB fresh on every single visitor request. Next.js supports **ISR**: generating a page once, serving that cached version to everyone, and automatically regenerating it in the background every N seconds/minutes. For NAPI's content (publications added occasionally, not every second), this means:
- Visitors get near-instant page loads (served from Vercel's global edge cache, not a live database query).
- MongoDB Atlas gets far fewer queries, which matters directly for cost — the Flex tier bills by usage, so fewer database hits keeps the bill toward the $8 end rather than the $30 cap.
- If a publication or event is edited in the CMS, the change appears within the configured revalidation window (e.g., 5-15 minutes) rather than instantly — an acceptable tradeoff for a content site like this one.

### 5.2 Image optimization
Next.js's built-in Image component automatically converts uploaded images to modern formats (WebP/AVIF), resizes them to the exact dimensions needed per device, and lazy-loads offscreen images. Once Media moves to R2 (Section 4), this can be enabled site-wide, which typically cuts image payload size significantly — a major factor in both load speed and Google's Core Web Vitals ranking signal.

### 5.3 CDN / edge caching
Vercel's Pro plan serves every static asset (CSS, JS, cached ISR pages, optimized images) from edge servers positioned close to the visitor worldwide, rather than a single origin server. This is included automatically with Vercel hosting — no separate CDN purchase or configuration needed, unlike a traditional VPS setup where a CDN would be a fourth thing to buy and configure.

### 5.4 SEO fundamentals
A few items that directly affect Google search visibility and are inexpensive to implement correctly:
- **Sitemap and robots.txt** — an auto-generated `sitemap.xml` listing every page/publication, and a `robots.txt` telling search engines what to crawl.
- **Metadata per page** — page titles and descriptions (already partly in place across the site) should be completed for every page, including publication and program pages.
- **Structured data (JSON-LD)** — marking up NAPI as an Organization and publications as Articles/Reports helps Google display richer search results.
- **Fast Core Web Vitals** — ISR + image optimization (above) are the two biggest levers here, since page speed is itself a ranking factor.

---

## 6. Domain / DNS migration steps

No domain transfer is required. The steps to go live are:

1. Deploy the Next.js site to Vercel and connect the MongoDB Atlas database (technical step, no domain changes yet).
2. Add `napipolicy.org` as a custom domain inside the Vercel project — Vercel will provide the exact DNS records needed (typically an A record and/or CNAME).
3. Log into the SiteGround account, go to DNS management for napipolicy.org, and update those records to point to Vercel instead of the current WordPress hosting.
4. DNS changes typically take effect within a few hours (sometimes up to 24-48 hours depending on caching).
5. Once the new site is confirmed live and working at napipolicy.org, cancel or downgrade the old SiteGround WordPress hosting plan (keeping only domain registration, if NAPI wants to continue registering the domain through SiteGround).

This means there is no downtime risk from a registrar transfer — DNS changes can be tested and verified before fully cutting over, and rolled back quickly if anything looks wrong.

---

## 7. Summary checklist

1. Create a Vercel account, deploy the site, upgrade to the Pro plan ($20/mo).
2. Create a MongoDB Atlas account, provision a Flex-tier cluster ($8-30/mo), migrate/point the app at it.
3. Create a Cloudflare account, set up an R2 bucket, migrate the Payload Media collection to use it (required code change — see Section 4).
4. Add `napipolicy.org` as a custom domain in Vercel; update DNS records at SiteGround to point to Vercel.
5. Enable ISR (revalidation) on content pages, enable Next.js Image optimization, add sitemap/robots/structured data (Section 5) — these are code changes that can be made as a follow-up implementation pass.
6. Once verified live, cancel/downgrade the old SiteGround WordPress hosting plan.

**Estimated new recurring cost: ≈ $28-40/month**, replacing whatever is currently paid for SiteGround WordPress hosting (SiteGround's higher-tier GoGeek plan renews around $45/month, for reference — so this is likely cost-neutral or a modest savings, while running on infrastructure actually built for this stack).
