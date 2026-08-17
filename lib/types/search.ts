// Shared between app/api/search/route.ts (produces these) and
// components/layout/SearchOverlay.tsx (consumes these).
export interface SearchResult {
  id: string;
  type: "publication" | "event" | "program" | "page";
  title: string;
  subtitle: string;
  href: string;
}
