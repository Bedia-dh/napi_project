import type { Publication } from "@/lib/types/publication";

// Payload's `authors` field is an array of `{ name }` rows (so editors can
// reorder/add authors in the admin UI) and `pdf` may be an uploaded Media
// doc rather than a bare URL. Normalize both into the flat `Publication`
// shape the frontend components already expect, so PublicationCard/
// ResearchHub/FeaturedPublications don't need to know which data source
// served the request. Shared by app/api/publications and the server-side
// getPublications() helper so there's one source of truth.
export function normalizePayloadPublication(doc: Record<string, unknown>): Publication {
  const authors = Array.isArray(doc.authors)
    ? (doc.authors as Array<{ name?: string } | string>).map((a) =>
        typeof a === "string" ? a : a?.name ?? ""
      )
    : [];

  const pdf = doc.pdf as { url?: string } | string | null | undefined;
  const pdfUrl =
    (typeof pdf === "object" && pdf?.url) || (doc.pdfUrl as string | undefined) || "";

  return {
    id: String(doc.id),
    title: String(doc.title ?? ""),
    type: doc.type as Publication["type"],
    theme: doc.theme as Publication["theme"],
    program: (doc.program as string | null) ?? null,
    authors,
    year: Number(doc.year),
    pages: Number(doc.pages),
    languages: (doc.languages as Publication["languages"]) ?? [],
    abstract: String(doc.abstract ?? ""),
    pdfUrl,
    featured: Boolean(doc.featured),
    keywords: Array.isArray(doc.keywords) ? (doc.keywords as unknown[]).map(String) : [],
  };
}
