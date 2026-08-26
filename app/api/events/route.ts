import { NextRequest, NextResponse } from "next/server";
import { getPayload, type Where } from "payload";
import config from "@payload-config";
import { pastEvents, plannedActivities } from "@/lib/data/events";
import type { NapiEvent, PlannedActivity, EventType } from "@/lib/types/event";

export const dynamic = "force-dynamic";

// Lets browsers and any CDN in front of the app (e.g. Vercel's edge network)
// reuse the same response for a short window instead of hitting MongoDB on
// every request — events change occasionally, not every second, so a 60s
// cache with a 5-minute stale-while-revalidate window is a safe tradeoff.
const CACHE_HEADERS = { "Cache-Control": "public, max-age=60, stale-while-revalidate=300" };

interface NormalizedEvent {
  id: string;
  status: "past" | "planned";
  title: string;
  type: EventType;
  date?: string;
  program?: string;
  description: string;
  location?: string;
  registrationUrl?: string;
  sourceUrl?: string;
}

function normalizePayloadDoc(doc: Record<string, unknown>): NormalizedEvent {
  return {
    id: String(doc.id),
    status: (doc.status as "past" | "planned") ?? "past",
    title: String(doc.title ?? ""),
    type: (doc.type as EventType) ?? "workshop",
    date: (doc.date as string | undefined) ?? undefined,
    program: (doc.program as string | undefined) ?? undefined,
    description: String(doc.description ?? ""),
    location: (doc.location as string | undefined) ?? undefined,
    registrationUrl: (doc.registrationUrl as string | undefined) ?? undefined,
    sourceUrl: (doc.sourceUrl as string | undefined) ?? undefined,
  };
}

function staticFallback(): NormalizedEvent[] {
  return [
    ...pastEvents.map(
      (e: NapiEvent): NormalizedEvent => ({
        id: e.id,
        status: "past",
        title: e.title,
        type: e.type,
        date: e.date,
        description: e.description,
        location: e.location,
        registrationUrl: e.registrationUrl,
        sourceUrl: e.sourceUrl,
      })
    ),
    ...plannedActivities.map(
      (a: PlannedActivity): NormalizedEvent => ({
        id: a.id,
        status: "planned",
        title: a.title,
        type: "workshop",
        program: a.program,
        description: a.description,
      })
    ),
  ];
}

export async function GET(req: NextRequest) {
  const status = req.nextUrl.searchParams.get("status"); // "past" | "planned" | null (both)

  try {
    const payload = await getPayload({ config });
    const where: Where = status ? { status: { equals: status } } : {};

    const result = await payload.find({
      collection: "events",
      where,
      sort: "-createdAt",
      limit: 100,
    });

    const docs = (result.docs as Record<string, unknown>[]).map(normalizePayloadDoc);

    return NextResponse.json({ source: "payload", docs }, { headers: CACHE_HEADERS });
  } catch {
    // Payload/MongoDB isn't reachable yet — fall back to the static dataset
    // so the homepage/events page still render during local development.
    let docs = staticFallback();
    if (status) docs = docs.filter((d) => d.status === status);
    return NextResponse.json({ source: "static-fallback", docs }, { headers: CACHE_HEADERS });
  }
}
