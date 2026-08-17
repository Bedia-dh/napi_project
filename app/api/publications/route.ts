import { NextRequest, NextResponse } from "next/server";
import { getPayload, type Where } from "payload";
import config from "@payload-config";
import { publications as staticPublications } from "@/lib/data/publications";
import type { Publication } from "@/lib/types/publication";
import { normalizePayloadPublication as normalizePayloadDoc } from "@/lib/payload/normalizePublication";

export const dynamic = "force-dynamic";

// Lets browsers and any CDN in front of the app (e.g. Vercel's edge network)
// reuse an identical query's response for a short window instead of hitting
// MongoDB every time — a short window because this endpoint also serves
// live search-as-you-type, so it shouldn't feel stale, but repeated
// requests for the exact same query string (e.g. re-rendering, back/forward
// navigation) don't need a fresh database round trip every time.
const CACHE_HEADERS = { "Cache-Control": "public, max-age=30, stale-while-revalidate=120" };

interface QueryParams {
  q: string;
  theme: string[];
  type: string[];
  program: string[];
  lang: string[];
  year: string[];
  sort: "recent" | "az" | "za" | "oldest";
  page: number;
  limit: number;
}

function parseParams(searchParams: URLSearchParams): QueryParams {
  const multi = (key: string) =>
    searchParams.getAll(key).flatMap((v) => v.split(",")).filter(Boolean);

  return {
    q: searchParams.get("q")?.trim() ?? "",
    theme: multi("theme"),
    type: multi("type"),
    program: multi("program"),
    lang: multi("lang"),
    year: multi("year"),
    sort: (searchParams.get("sort") as QueryParams["sort"]) ?? "recent",
    page: Number(searchParams.get("page") ?? "1") || 1,
    limit: Number(searchParams.get("limit") ?? "20") || 20,
  };
}

/**
 * Filters + sorts an in-memory publication list. Used both as the fallback
 * (Payload/MongoDB not reachable yet — e.g. local dev before `npm install`
 * + seeding has been run) and to keep the matching logic identical to what
 * the Payload-backed branch does, so behavior doesn't change once the CMS
 * is live.
 */
// Splits "youth climate policy" into ["youth","climate","policy"] and
// requires every word to appear somewhere in the searchable text (title,
// authors, abstract, keywords) — order-independent, so word order in the
// query doesn't have to match the title, and a search matches a keyword
// even when that term never appears in the title/abstract itself.
function queryWords(q: string): string[] {
  return q.toLowerCase().split(/\s+/).filter(Boolean);
}

function filterAndSort(pubs: Publication[], params: QueryParams): Publication[] {
  const words = queryWords(params.q);

  let result = pubs.filter((p) => {
    if (words.length) {
      const haystack = `${p.title} ${p.authors.join(" ")} ${p.abstract} ${(p.keywords ?? []).join(" ")}`.toLowerCase();
      if (!words.every((w) => haystack.includes(w))) return false;
    }
    if (params.theme.length && !params.theme.includes(p.theme)) return false;
    if (params.type.length && !params.type.includes(p.type)) return false;
    if (params.program.length && !(p.program && params.program.includes(p.program))) return false;
    if (params.lang.length && !params.lang.some((l) => p.languages.includes(l as Publication["languages"][number]))) return false;
    if (params.year.length && !params.year.includes(String(p.year))) return false;
    return true;
  });

  switch (params.sort) {
    case "az":
      result = [...result].sort((a, b) => a.title.localeCompare(b.title));
      break;
    case "za":
      result = [...result].sort((a, b) => b.title.localeCompare(a.title));
      break;
    case "oldest":
      result = [...result].sort((a, b) => a.year - b.year);
      break;
    case "recent":
    default:
      result = [...result].sort((a, b) => b.year - a.year);
      break;
  }

  return result;
}

export async function GET(req: NextRequest) {
  const params = parseParams(req.nextUrl.searchParams);

  // Facet counts are always computed off the *unfiltered* pool matching
  // only the search text, so sidebar counts reflect "results if you also
  // picked this filter" rather than shrinking to 0 once any filter is active.
  const computeFacets = (pool: Publication[]) => {
    const count = (key: keyof Publication, value: string) =>
      pool.filter((p) => {
        const v = p[key];
        if (Array.isArray(v)) return (v as string[]).includes(value);
        return v === value;
      }).length;

    const themes = ["health-equity", "governance", "climate", "education", "gender", "economy"];
    const types = ["brief", "paper", "report", "proceedings"];
    const programs = ["ypl", "chill-chat", "youth-voices", "mei-roundtables"];
    const years = Array.from(new Set(pool.map((p) => String(p.year)))).sort((a, b) => Number(b) - Number(a));
    const langs = ["en", "fr", "ar"];

    return {
      theme: themes.map((v) => ({ value: v, count: count("theme", v) })),
      type: types.map((v) => ({ value: v, count: count("type", v) })),
      program: programs.map((v) => ({ value: v, count: count("program", v) })),
      lang: langs.map((v) => ({ value: v, count: count("languages", v) })),
      year: years.map((v) => ({ value: v, count: count("year", v) })),
    };
  };

  try {
    const payload = await getPayload({ config });
    const where: Where = {};
    const and: Where[] = [];

    if (params.q) {
      // AND across words, OR across fields per word — so "youth climate" only
      // matches docs containing both words (in any field, any order), while a
      // single word can hit the title, abstract, an author name, or a keyword.
      // Each word's OR clause is pushed as its own sibling into `and` (rather
      // than nested inside a second `and`) — flatter and matches the pattern
      // the other filters below already use.
      // `keywords` is a hasMany text field (stored as an array), so it needs
      // Payload's `contains` operator — `like` is only for single-value
      // text/textarea/richText fields and throws on array fields, which was
      // silently sending every search here into the static-data fallback.
      const words = queryWords(params.q);
      words.forEach((word) => {
        and.push({
          or: [
            { title: { like: word } },
            { abstract: { like: word } },
            { "authors.name": { like: word } },
            { keywords: { contains: word } },
          ],
        });
      });
    }
    if (params.theme.length) and.push({ theme: { in: params.theme } });
    if (params.type.length) and.push({ type: { in: params.type } });
    if (params.program.length) and.push({ program: { in: params.program } });
    if (params.year.length) and.push({ year: { in: params.year.map(Number) } });
    if (params.lang.length) and.push({ languages: { in: params.lang } });

    if (and.length) where.and = and;

    const sortMap: Record<QueryParams["sort"], string> = {
      recent: "-year",
      oldest: "year",
      az: "title",
      za: "-title",
    };

    const result = await payload.find({
      collection: "publications",
      where,
      sort: sortMap[params.sort],
      page: params.page,
      limit: params.limit,
    });

    const allForFacets = await payload.find({ collection: "publications", limit: 0 });
    const normalizedAll = (allForFacets.docs as Record<string, unknown>[]).map(normalizePayloadDoc);

    return NextResponse.json(
      {
        source: "payload",
        docs: (result.docs as Record<string, unknown>[]).map(normalizePayloadDoc),
        totalDocs: result.totalDocs,
        page: result.page,
        totalPages: result.totalPages,
        facets: computeFacets(normalizedAll),
      },
      { headers: CACHE_HEADERS }
    );
  } catch (err) {
    // Payload/MongoDB isn't reachable in this environment yet (no DATABASE_URI,
    // or the dev server hasn't been restarted since setup) — OR the query
    // itself threw (e.g. a malformed `where` clause). Either way we still
    // want the page to render, so we fall back to the static dataset, but we
    // log the real error so a genuine query bug doesn't masquerade as "DB not
    // connected" — check this server-side log if search results look wrong
    // even though /admin clearly has data (source will read "static-fallback"
    // in the API response whenever this branch runs).
    console.error("[/api/publications] Payload query failed, serving static fallback:", err);
    const filtered = filterAndSort(staticPublications, params);
    const start = (params.page - 1) * params.limit;
    const docs = filtered.slice(start, start + params.limit);

    return NextResponse.json(
      {
        source: "static-fallback",
        docs,
        totalDocs: filtered.length,
        page: params.page,
        totalPages: Math.max(1, Math.ceil(filtered.length / params.limit)),
        facets: computeFacets(staticPublications),
      },
      { headers: CACHE_HEADERS }
    );
  }
}
