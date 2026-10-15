import type { Publication } from "@/lib/types/publication";
import { publications as staticPublications } from "@/lib/data/publications";

// Build a lookup once so we can cheaply resolve static pdfUrls by title.
const staticPdfByTitle = new Map(
  staticPublications.map((p) => [p.title.toLowerCase().trim(), p.pdfUrl])
);

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

  // Payload's `pdf` upload field resolves to an object with a `url` when
  // the relation is populated (e.g. { url: "/api/media/file/pub-001.pdf" }).
  // Prefer the uploaded file URL; fall back to the `pdfUrl` text field; then
  // to the static dataset's URL matched by title.
  const pdf = doc.pdf as { url?: string } | string | null | undefined;
  let pdfUrl = "";

  if (typeof pdf === "object" && pdf?.url) {
    // Uploaded PDF in Payload Media — served via /api/media/file/...
    pdfUrl = pdf.url;
  } else if (typeof pdf === "string" && pdf) {
    // Relationship stored as bare ID (not populated) — can't resolve URL
    // here, so fall through to pdfUrl text field.
    pdfUrl = (doc.pdfUrl as string | undefined) || "";
  } else {
    pdfUrl = (doc.pdfUrl as string | undefined) || "";
  }

  // If the resolved URL is a non-API local path (e.g. /media/publications/pub-002.pdf)
  // it won't resolve on disk — fall back to the static dataset's working URL
  // (usually a journal link) matched by title.
  if (pdfUrl.startsWith("/") && !pdfUrl.startsWith("/api/")) {
    const title = String(doc.title ?? "").toLowerCase().trim();
    const staticUrl = staticPdfByTitle.get(title);
    if (staticUrl) pdfUrl = staticUrl;
  }

  return {
    id: String(doc.id),
    title: String(doc.title ?? ""),
    type: doc.type as Publication["type"],
    theme: doc.theme as Publication["theme"],
    program: (doc.program as string | null) ?? null,
    authors,
    year: Number(doc.year),
    pages: doc.pages ? Number(doc.pages) : undefined,
    languages: (doc.languages as Publication["languages"]) ?? [],
    abstract: String(doc.abstract ?? ""),
    pdfUrl,
    featured: Boolean(doc.featured),
    keywords: Array.isArray(doc.keywords) ? (doc.keywords as unknown[]).map(String) : [],
  };
}
