/**
 * One-time migration: pushes everything currently hardcoded in lib/data/*.ts
 * into MongoDB via Payload's Local API, so the CMS starts populated with the
 * real NAPI content instead of an empty admin dashboard.
 *
 * Usage (after `npm install` + MongoDB is reachable via DATABASE_URI):
 *   npm run seed
 *
 * Safe to re-run: it checks each collection's count first and skips seeding
 * it if it already has documents, so it won't create duplicates.
 */
import { loadEnvConfig } from "@next/env";
import path from "path";

import { publications } from "../lib/data/publications";
import { pastEvents, plannedActivities } from "../lib/data/events";
import { programs } from "../lib/data/programs";
import { yplCohort2021 } from "../lib/data/ypl";
import { roundtableSeries } from "../lib/data/mei-roundtables";
import { teamMembers, boardMembers } from "../lib/data/team";

async function seedIfEmpty<T>(
  payload: Awaited<ReturnType<typeof import("payload").getPayload>>,
  collection: string,
  items: T[],
  toDoc: (item: T) => Record<string, unknown>
) {
  const existing = await payload.count({ collection: collection as never });
  if (existing.totalDocs > 0) {
    console.log(`- ${collection}: already has ${existing.totalDocs} docs, skipping`);
    return;
  }
  for (const item of items) {
    await payload.create({ collection: collection as never, data: toDoc(item) as never });
  }
  console.log(`OK ${collection}: seeded ${items.length} docs`);
}

async function run() {
  // `next dev`/`next build` load .env.local automatically; a standalone tsx
  // script does not, so PAYLOAD_SECRET/DATABASE_URI would otherwise be
  // undefined. @next/env is already installed (Next uses it internally) and
  // loads .env, .env.local, etc. the same way Next.js itself does.
  //
  // This MUST run, and payload.config.ts MUST be imported, before anything
  // else touches process.env — static `import` statements are hoisted above
  // all other code in the module regardless of where they're written, so
  // `import config from "../payload.config"` at the top of this file would
  // evaluate (and read process.env.PAYLOAD_SECRET / DATABASE_URI) before a
  // top-of-file loadEnvConfig() call ever ran. Dynamic imports avoid that.
  loadEnvConfig(path.resolve(__dirname, ".."));

  const { getPayload } = await import("payload");
  const { default: config } = await import("../payload.config");

  const payload = await getPayload({ config });

  await seedIfEmpty(payload, "publications", publications, (p) => ({
    title: p.title,
    type: p.type,
    theme: p.theme,
    program: p.program,
    authors: p.authors.map((name) => ({ name })),
    year: p.year,
    pages: p.pages,
    languages: p.languages,
    abstract: p.abstract,
    pdfUrl: p.pdfUrl,
    featured: p.featured ?? false,
  }));

  await seedIfEmpty(
    payload,
    "events",
    [
      ...pastEvents.map((e) => ({ ...e, status: "past" as const })),
      ...plannedActivities.map((a) => ({ ...a, status: "planned" as const })),
    ],
    (e: ((typeof pastEvents)[number] | (typeof plannedActivities)[number]) & { status: "past" | "planned" }) => ({
      title: e.title,
      status: e.status,
      type: "type" in e ? e.type : "workshop",
      date: "date" in e ? e.date : undefined,
      program: "program" in e ? e.program : undefined,
      description: e.description,
      registrationUrl: "registrationUrl" in e ? e.registrationUrl : undefined,
      sourceUrl: "sourceUrl" in e ? e.sourceUrl : undefined,
    })
  );

  await seedIfEmpty(payload, "programs", programs, (p) => ({
    name: p.name,
    slug: p.id,
    tagline: p.tagline,
    description: p.description,
    stats: p.stats,
    color: p.color,
    objectives: (p.objectives ?? []).map((text) => ({ text })),
    topics: (p.topics ?? []).map((label) => ({ label })),
    eligibility: (p.eligibility ?? []).map((text) => ({ text })),
    galleryPhotos: (p.galleryPhotos ?? []).map((photoUrl) => ({ photoUrl })),
  }));

  await seedIfEmpty(payload, "ypl-fellows", yplCohort2021, (f) => ({
    name: f.name,
    bio: f.bio,
    policyIssue: f.policyIssue,
    cohort: f.cohort,
    photoUrl: f.photoUrl,
    paperUrl: f.paperUrl,
  }));

  await seedIfEmpty(payload, "roundtable-series", roundtableSeries, (s) => ({
    country: s.country,
    period: s.period,
    intro: s.intro,
    roundtables: s.roundtables,
  }));

  await seedIfEmpty(
    payload,
    "team-members",
    [
      ...teamMembers.map((m) => ({ ...m, group: "executive" as const })),
      ...boardMembers.map((m) => ({ ...m, group: "board" as const })),
    ],
    (m) => ({
      name: m.name,
      role: m.role,
      group: m.group,
      bio: "bio" in m ? m.bio : undefined,
      organization: "organization" in m ? m.organization : undefined,
      linkedin: "linkedin" in m ? m.linkedin : undefined,
      twitter: "twitter" in m ? m.twitter : undefined,
      email: "email" in m ? m.email : undefined,
    })
  );

  // Ensure an admin login exists so /admin shows the login page instead of
  // "create first user". Only runs when the users collection is empty, and
  // only when credentials are provided via env (never ships a hardcoded
  // password). Set SEED_ADMIN_EMAIL / SEED_ADMIN_PASSWORD in .env.local.
  const existingUsers = await payload.count({ collection: "users" as never });
  if (existingUsers.totalDocs > 0) {
    console.log(`- users: already has ${existingUsers.totalDocs} docs, skipping`);
  } else if (!process.env.SEED_ADMIN_EMAIL || !process.env.SEED_ADMIN_PASSWORD) {
    console.log(
      "- users: set SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD in .env.local to create the admin account"
    );
  } else {
    await payload.create({
      collection: "users" as never,
      data: {
        email: process.env.SEED_ADMIN_EMAIL,
        password: process.env.SEED_ADMIN_PASSWORD,
        name: "NAPI Admin",
        role: "admin",
      } as never,
    });
    console.log(`OK users: created admin ${process.env.SEED_ADMIN_EMAIL}`);
  }

  console.log("\nSeed complete.");
  process.exit(0);
}

run().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
