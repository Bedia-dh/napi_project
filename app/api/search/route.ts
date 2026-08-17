import { NextRequest, NextResponse } from "next/server";
import { getPayload, type Where } from "payload";
import config from "@payload-config";
import { publications as staticPublications } from "@/lib/data/publications";
import { pastEvents, plannedActivities } from "@/lib/data/events";
import { normalizePayloadPublication } from "@/lib/payload/normalizePublication";
import { getPrograms } from "@/lib/payload/queries";
import type { Publication } from "@/lib/types/publication";
import type { SearchResult } from "@/lib/types/search";

export const dynamic = "force-dynamic";

// See app/api/publications/route.ts for why this is set — same reasoning:
// short-lived caching for the search overlay so repeated identical queries
// (e.g. re-opening the overlay) don't always re-hit the database.
const CACHE_HEADERS = { "Cache-Control": "public, max-age=30, stale-while-revalidate=120" };

// Powers the navbar's search overlay (components/layout/SearchOverlay.tsx).
// Aggregates a handful of matches across publications, events, programs, and
// a short static list of top-level pages, so the search bar can actually
// take someone to a publication, an event, a program, or a page — not just
// filter one list. Publications get the richest matching (title, abstract,
// authors, and the CMS "keywords" field); everything else matches on
// title/description only, which is plenty for a handful of static records.

const STATIC_PAGES: { title: string; description: string; href: string }[] = [
  { title: "About NAPI", description: "Our mission, vision, story, and team.", href: "/about" },
  { title: "Research Hub", description: "Browse publications, policy briefs, and reports.", href: "/research" },
  { title: "Programs", description: "Youth Policy Lab, Chill-Chat, Youth Voices, NAPI-MEI Roundtables.", href: "/programs" },
  { title: "Events", description: "Past events and ongoing activities.", href: "/events" },
  { title: "Get Involved", description: "Apply, partner, or support NAPI's work.", href: "/get-involved" },
  { title: "Contact", description: "Get in touch with the NAPI team.", href: "/contact" },
];

const RESULTS_PER_TYPE = 4;

function queryWords(q: string): string[] {
  return q.toLowerCase().split(/\s+/).filter(Boolean);
}

function matchesAll(haystack: string, words: string[]): boolean {
  const h = haystack.toLowerCase();
  return words.every((w) => h.includes(w));
}

function publicationToResult(p: Publication): SearchResult {
  return {
    id: `publication-${p.id}`,
    type: "publication",
    title: p.title,
    subtitle: `${p.authors.join(", ")} · ${p.year}`,
    // No per-publication detail route exists yet — send searchers to the
    // Research Hub with the title pre-filled into its own search box.
    href: `/research?q=${encodeURIComponent(p.title)}`,
  };
}

export async function GET(req: NextRequest) {
  const q = (req.nextUrl.searchParams.get("q") ?? "").trim();
  const words = queryWords(q);

  if (!words.length) {
    return NextResponse.json({ query: q, results: [] satisfies SearchResult[] }, { headers: CACHE_HEADERS });
  }

  const results: SearchResult[] = [];

  // ---- Publications ----
  try {
    const payload = await getPayload({ config });
    // `keywords` is a hasMany text field (stored as an array) — Payload's
    // `contains` operator is what matches values inside an array field;
    // `like` is only for single-value text/textarea/richText and throws here,
    // which was silently sending every request into the static fallback.
    // The explicit `: Where` return type on the map callback matters here —
    // without it, TS infers each `{ title: {...} }` / `{ abstract: {...} }`
    // literal as its own narrow type instead of widening to `Where`, and the
    // resulting union fails to satisfy `Where`'s index signature at build time.
    const where: Where = {
      and: words.map((word): Where => ({
        or: [
          { title: { like: word } },
          { abstract: { like: word } },
          { "authors.name": { like: word } },
          { keywords: { contains: word } },
        ],
      })),
    };
    const result = await payload.find({ collection: "publications", where, sort: "-year", limit: RESULTS_PER_TYPE });
    const docs = (result.docs as Record<string, unknown>[]).map(normalizePayloadPublication);
    results.push(...docs.map(publicationToResult));
  } catch (err) {
    console.error("[/api/search] Publications query failed, serving static fallback:", err);
    const matches = staticPublications.filter((p) =>
      matchesAll(`${p.title} ${p.authors.join(" ")} ${p.abstract} ${(p.keywords ?? []).join(" ")}`, words)
    );
    results.push(...matches.slice(0, RESULTS_PER_TYPE).map(publicationToResult));
  }

  // ---- Events ----
  try {
    const payload = await getPayload({ config });
    const where: Where = {
      and: words.map((word): Where => ({
        or: [{ title: { like: word } }, { description: { like: word } }],
      })),
    };
    const result = await payload.find({ collection: "events", where, limit: RESULTS_PER_TYPE, sort: "-createdAt" });
    const docs = result.docs as Record<string, unknown>[];
    results.push(
      ...docs.map((d) => ({
        id: `event-${String(d.id)}`,
        type: "event" as const,
        title: String(d.title ?? ""),
        subtitle: (d.date as string | undefined) || ((d.status as string) === "planned" ? "Ongoing / upcoming" : "Past event"),
        href: "/events",
      }))
    );
  } catch (err) {
    console.error("[/api/search] Events query failed, serving static fallback:", err);
    const allEvents = [
      ...pastEvents.map((e) => ({ title: e.title, description: e.description, subtitle: e.date })),
      ...plannedActivities.map((a) => ({ title: a.title, description: a.description, subtitle: a.program })),
    ];
    const matches = allEvents.filter((e) => matchesAll(`${e.title} ${e.description}`, words));
    results.push(
      ...matches.slice(0, RESULTS_PER_TYPE).map((e, i) => ({
        id: `event-static-${i}-${e.title}`,
        type: "event" as const,
        title: e.title,
        subtitle: e.subtitle ?? "",
        href: "/events",
      }))
    );
  }

  // ---- Programs ----
  const { programs } = await getPrograms();
  const programMatches = programs.filter((p) => matchesAll(`${p.name} ${p.tagline} ${p.description}`, words));
  results.push(
    ...programMatches.slice(0, RESULTS_PER_TYPE).map((p) => ({
      id: `program-${p.id}`,
      type: "program" as const,
      title: p.name,
      subtitle: p.tagline,
      href: p.href,
    }))
  );

  // ---- Pages ----
  const pageMatches = STATIC_PAGES.filter((p) => matchesAll(`${p.title} ${p.description}`, words));
  results.push(
    ...pageMatches.map((p) => ({
      id: `page-${p.href}`,
      type: "page" as const,
      title: p.title,
      subtitle: p.description,
      href: p.href,
    }))
  );

  return NextResponse.json({ query: q, results }, { headers: CACHE_HEADERS });
}
