/**
 * Server-side data fetchers used by Server Components (program pages, the
 * homepage Programs/Team sections, /about). Each one queries Payload's Local
 * API directly — no HTTP round-trip needed since these run on the server
 * already — and falls back to the static lib/data/*.ts dataset only if
 * Payload/MongoDB itself is unreachable (a genuinely-empty collection is
 * shown as empty, not silently replaced with static content, so deleting
 * the last item in /admin behaves the way an editor would expect).
 *
 * This mirrors the pattern used by app/api/publications and app/api/events,
 * just called directly instead of over HTTP, since Programs/Team don't need
 * a client-side API route (no search/filter/pagination on top of them).
 */
import { getPayload } from "payload";
import config from "@payload-config";
import type { Program } from "@/lib/types/program";
import type { YplParticipant } from "@/lib/types/program";
import type { RoundtableSeries } from "@/lib/data/mei-roundtables";
import type { TeamMember, BoardMember } from "@/lib/types/team";
import type { Publication } from "@/lib/types/publication";

import { programs as staticPrograms } from "@/lib/data/programs";
import { yplCohort2021 as staticYplCohort } from "@/lib/data/ypl";
import { roundtableSeries as staticRoundtableSeries } from "@/lib/data/mei-roundtables";
import { teamMembers as staticTeamMembers, boardMembers as staticBoardMembers } from "@/lib/data/team";
import { publications as staticPublications } from "@/lib/data/publications";
import { normalizePayloadPublication } from "@/lib/payload/normalizePublication";

export type DataSource = "payload" | "static-fallback";

function uploadUrl(field: unknown): string {
  if (field && typeof field === "object" && "url" in field) {
    return String((field as { url?: string }).url ?? "");
  }
  return "";
}

// Homepage teaser only (no search/filter/pagination) — /research uses the
// client-side /api/publications route instead, since it needs interactive
// search state that a Server Component fetch can't provide.
export async function getPublications(): Promise<{ publications: Publication[]; source: DataSource }> {
  try {
    const payload = await getPayload({ config });
    const result = await payload.find({ collection: "publications", limit: 100, sort: "-year" });
    const publications = (result.docs as Record<string, unknown>[]).map(normalizePayloadPublication);
    return { publications, source: "payload" };
  } catch {
    return { publications: staticPublications, source: "static-fallback" };
  }
}

export async function getPrograms(): Promise<{ programs: Program[]; source: DataSource }> {
  try {
    const payload = await getPayload({ config });
    const result = await payload.find({ collection: "programs", limit: 100, sort: "name" });
    const programs: Program[] = (result.docs as Record<string, unknown>[]).map((d) => ({
      id: d.slug as Program["id"],
      name: String(d.name ?? ""),
      tagline: String(d.tagline ?? ""),
      description: String(d.description ?? ""),
      stats: (d.stats as { label: string; value: string }[] | undefined) ?? [],
      color: String(d.color ?? "var(--navy)"),
      href: `/programs/${d.slug}`,
      imageUrl: uploadUrl(d.image) || (d.imageUrl as string | undefined) || undefined,
      objectives: ((d.objectives as { text?: string }[] | undefined) ?? [])
        .map((o) => String(o.text ?? ""))
        .filter(Boolean),
      topics: ((d.topics as { label?: string }[] | undefined) ?? [])
        .map((t) => String(t.label ?? ""))
        .filter(Boolean),
      eligibility: ((d.eligibility as { text?: string }[] | undefined) ?? [])
        .map((e) => String(e.text ?? ""))
        .filter(Boolean),
      galleryPhotos: ((d.galleryPhotos as { photo?: unknown; photoUrl?: string }[] | undefined) ?? [])
        .map((g) => uploadUrl(g.photo) || String(g.photoUrl ?? ""))
        .filter(Boolean),
    }));
    return { programs, source: "payload" };
  } catch {
    return { programs: staticPrograms, source: "static-fallback" };
  }
}

export async function getYplFellows(): Promise<{ fellows: YplParticipant[]; source: DataSource }> {
  try {
    const payload = await getPayload({ config });
    const result = await payload.find({ collection: "ypl-fellows", limit: 100, sort: "name" });
    const fellows: YplParticipant[] = (result.docs as Record<string, unknown>[]).map((d) => ({
      id: String(d.id),
      name: String(d.name ?? ""),
      bio: String(d.bio ?? ""),
      policyIssue: String(d.policyIssue ?? ""),
      cohort: Number(d.cohort ?? 0),
      photoUrl: uploadUrl(d.photo) || (d.photoUrl as string | undefined) || "",
      paperUrl: uploadUrl(d.paper) || (d.paperUrl as string | undefined) || "",
    }));
    return { fellows, source: "payload" };
  } catch {
    return { fellows: staticYplCohort, source: "static-fallback" };
  }
}

export async function getRoundtableSeries(): Promise<{ series: RoundtableSeries[]; source: DataSource }> {
  try {
    const payload = await getPayload({ config });
    const result = await payload.find({ collection: "roundtable-series", limit: 100, sort: "country" });
    const series: RoundtableSeries[] = (result.docs as Record<string, unknown>[]).map((d) => ({
      country: String(d.country ?? ""),
      period: String(d.period ?? ""),
      intro: String(d.intro ?? ""),
      roundtables: (d.roundtables as { title: string; url: string }[] | undefined) ?? [],
    }));
    return { series, source: "payload" };
  } catch {
    return { series: staticRoundtableSeries, source: "static-fallback" };
  }
}

export async function getTeamMembers(): Promise<{
  executive: TeamMember[];
  board: BoardMember[];
  source: DataSource;
}> {
  try {
    const payload = await getPayload({ config });
    const result = await payload.find({ collection: "team-members", limit: 100, sort: "name" });
    const docs = result.docs as Record<string, unknown>[];

    const executive: TeamMember[] = docs
      .filter((d) => d.group === "executive")
      .map((d) => ({
        id: String(d.id),
        name: String(d.name ?? ""),
        role: String(d.role ?? ""),
        bio: String(d.bio ?? ""),
        photoUrl: uploadUrl(d.photo) || (d.photoUrl as string | undefined) || "",
        linkedin: (d.linkedin as string | undefined) || undefined,
        twitter: (d.twitter as string | undefined) || undefined,
        email: (d.email as string | undefined) || undefined,
      }));

    const board: BoardMember[] = docs
      .filter((d) => d.group === "board")
      .map((d) => ({
        id: String(d.id),
        name: String(d.name ?? ""),
        role: String(d.role ?? ""),
        organization: String(d.organization ?? ""),
        photoUrl: uploadUrl(d.photo) || (d.photoUrl as string | undefined) || "",
      }));

    return { executive, board, source: "payload" };
  } catch {
    return { executive: staticTeamMembers, board: staticBoardMembers, source: "static-fallback" };
  }
}
