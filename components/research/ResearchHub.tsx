"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import type { Publication } from "@/lib/types/publication";
import FilterSidebar, { Facets } from "./FilterSidebar";
import PublicationCard from "./PublicationCard";
import PDFModal from "./PDFModal";
import { Search, SlidersHorizontal, Download, Eye, FileText, ChevronDown, X } from "lucide-react";

type SortOption = "recent" | "az" | "za" | "oldest";

const typeStylesFeat: Record<string, { bg: string; label: string }> = {
  brief: { bg: "var(--orange)", label: "Featured - Policy Brief" },
  paper: { bg: "var(--orange)", label: "Featured - Research Paper" },
  report: { bg: "var(--orange)", label: "Featured - Report" },
  proceedings: { bg: "var(--orange)", label: "Featured - Proceedings" },
};

const PAGE_SIZE = 20;

export default function ResearchHub() {
  // Pre-fill the search box from ?q= — lets the navbar search overlay (or any
  // other link) deep-link straight into a filtered Research Hub.
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") ?? "";

  const [searchInput, setSearchInput] = useState(initialQuery);
  const [query, setQuery] = useState(initialQuery); // debounced value actually sent to the API
  const [sort, setSort] = useState<SortOption>("recent");
  const [activeThemes, setActiveThemes] = useState<string[]>([]);
  const [activeTypes, setActiveTypes] = useState<string[]>([]);
  const [activeLangs, setActiveLangs] = useState<string[]>([]);
  const [activePrograms, setActivePrograms] = useState<string[]>([]);
  const [activeYears, setActiveYears] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [previewPub, setPreviewPub] = useState<Publication | null>(null);

  const [docs, setDocs] = useState<Publication[]>([]);
  const [totalDocs, setTotalDocs] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [facets, setFacets] = useState<Facets | null>(null);
  const [source, setSource] = useState<"payload" | "static-fallback" | null>(null);

  // Debounce the search box so we don't fire a request on every keystroke.
  useEffect(() => {
    const t = setTimeout(() => setQuery(searchInput.trim()), 300);
    return () => clearTimeout(t);
  }, [searchInput]);

  // Any filter/sort/search change resets pagination back to page 1. Done as a
  // render-time adjustment (per react.dev "adjusting state when props change")
  // instead of an effect, so we never call setState inside an effect body.
  const filterKey = JSON.stringify([query, sort, activeThemes, activeTypes, activeLangs, activePrograms, activeYears]);
  const [prevFilterKey, setPrevFilterKey] = useState(filterKey);
  if (prevFilterKey !== filterKey) {
    setPrevFilterKey(filterKey);
    if (page !== 1) setPage(1);
  }

  // "Loading" is derived: we're loading whenever the last completed request
  // doesn't match the current filters+page, so no setLoading(true) is needed
  // inside the fetch effect.
  const requestKey = `${filterKey}|page:${page}`;
  const [settledKey, setSettledKey] = useState<string | null>(null);
  const loading = settledKey !== requestKey;

  const toggle = (arr: string[], setArr: (v: string[]) => void, value: string) => {
    setArr(arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value]);
  };

  const buildParams = useCallback(
    (targetPage: number) => {
      const params = new URLSearchParams();
      if (query) params.set("q", query);
      if (sort !== "recent") params.set("sort", sort);
      activeThemes.forEach((v) => params.append("theme", v));
      activeTypes.forEach((v) => params.append("type", v));
      activeLangs.forEach((v) => params.append("lang", v));
      activePrograms.forEach((v) => params.append("program", v));
      activeYears.forEach((v) => params.append("year", v));
      params.set("page", String(targetPage));
      params.set("limit", String(PAGE_SIZE));
      return params;
    },
    [query, sort, activeThemes, activeTypes, activeLangs, activePrograms, activeYears]
  );

  useEffect(() => {
    let cancelled = false;

    const params = buildParams(page);

    fetch(`/api/publications?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        setDocs((prev) => (page === 1 ? data.docs : [...prev, ...data.docs]));
        setTotalDocs(data.totalDocs);
        setTotalPages(data.totalPages);
        setFacets(data.facets);
        setSource(data.source);
      })
      .catch(() => {
        if (!cancelled) {
          setDocs([]);
          setTotalDocs(0);
          setTotalPages(1);
        }
      })
      .finally(() => {
        if (!cancelled) setSettledKey(requestKey);
      });

    return () => {
      cancelled = true;
    };
  }, [page, buildParams, requestKey]);

  const featured = useMemo(() => docs.find((p) => p.featured) ?? null, [docs]);
  const rest = useMemo(() => docs.filter((p) => !p.featured), [docs]);

  const clearAll = () => {
    setActiveThemes([]);
    setActiveTypes([]);
    setActiveLangs([]);
    setActivePrograms([]);
    setActiveYears([]);
  };

  const activeFilterCount =
    activeThemes.length + activeTypes.length + activeLangs.length + activePrograms.length + activeYears.length;

  return (
    <>
      {/* Sticky search bar — white, sits right below nav+ticker */}
      <div
        style={{
          position: "sticky",
          top: 104,
          zIndex: 150,
          background: "#fff",
          borderBottom: "1px solid #e8e8e8",
          padding: "14px var(--section-px)",
          display: "flex",
          alignItems: "center",
          gap: 14,
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: "var(--cream)",
            border: "1.5px solid #ddd",
            borderRadius: 8,
            padding: "10px 16px",
          }}
        >
          <Search size={17} color="var(--gray-mid)" />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search publications by title, author, or keyword…"
            style={{
              border: "none",
              background: "transparent",
              fontSize: "0.95rem",
              width: "100%",
              outline: "none",
              color: "var(--navy)",
            }}
          />
          {searchInput && (
            <X
              size={15}
              color="var(--gray-mid)"
              style={{ cursor: "pointer" }}
              onClick={() => setSearchInput("")}
            />
          )}
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortOption)}
          style={{
            border: "1.5px solid #ddd",
            background: "#fff",
            padding: "10px 14px",
            borderRadius: 8,
            fontSize: "0.85rem",
            color: "var(--navy)",
            cursor: "pointer",
          }}
        >
          <option value="recent">Most Recent</option>
          <option value="oldest">Oldest First</option>
          <option value="az">A → Z</option>
          <option value="za">Z → A</option>
        </select>
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            background: "var(--navy)",
            color: "#ffff",
            border: "none",
            padding: "10px 18px",
            borderRadius: 8,
            cursor: "pointer",
            fontSize: "0.85rem",
            fontWeight: 600,
          }}
        >
          <SlidersHorizontal size={15} /> Filters{activeFilterCount > 0 ? ` (${activeFilterCount})` : ""}
        </button>
      </div>

      {/* Navy body */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "260px 1fr",
          gap: 32,
          padding: "40px var(--section-px)",
          alignItems: "start",
          background: "var(--navy)",
        }}
      >
        <FilterSidebar
          facets={facets}
          activeThemes={activeThemes}
          activeTypes={activeTypes}
          activeLangs={activeLangs}
          activePrograms={activePrograms}
          activeYears={activeYears}
          onToggleTheme={(v) => toggle(activeThemes, setActiveThemes, v)}
          onToggleType={(v) => toggle(activeTypes, setActiveTypes, v)}
          onToggleLang={(v) => toggle(activeLangs, setActiveLangs, v)}
          onToggleProgram={(v) => toggle(activePrograms, setActivePrograms, v)}
          onToggleYear={(v) => toggle(activeYears, setActiveYears, v)}
          onClear={clearAll}
        />

        <main>
          {process.env.NODE_ENV !== "production" && source === "static-fallback" && (
            <div
              style={{
                background: "rgba(255,255,255,.08)",
                border: "1px dashed rgba(255,255,255,.25)",
                borderRadius: 8,
                padding: "8px 14px",
                fontSize: "0.75rem",
                color: "rgba(255,255,255,.6)",
                marginBottom: 16,
              }}
            >
              Dev note: serving results from the static dataset - connect DATABASE_URI to query MongoDB via Payload instead.
            </div>
          )}

          {/* Featured publication */}
          {featured && (
            <div
              style={{
                background: "rgba(255,255,255,.06)",
                border: "1px solid rgba(255,255,255,.1)",
                borderRadius: 14,
                padding: 36,
                color: "#fff",
                display: "grid",
                gridTemplateColumns: "1fr 180px",
                gap: 28,
                alignItems: "center",
                marginBottom: 32,
              }}
            >
              <div>
                <div
                  style={{
                    display: "inline-block",
                    background: "var(--orange)",
                    color: "#fff",
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    padding: "4px 10px",
                    borderRadius: 3,
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                    marginBottom: 14,
                  }}
                >
                  {typeStylesFeat[featured.type]?.label ?? "Featured"}
                </div>
                <h2 style={{ fontSize: "1.5rem", fontWeight: 800, lineHeight: 1.3, marginBottom: 10 }}>
                  {featured.title}
                </h2>
                <div style={{ color: "rgba(255,255,255,.5)", fontSize: "0.82rem", marginBottom: 18 }}>
                  {featured.authors.join(", ")} · {featured.year} · {featured.pages} pages
                </div>
                <div style={{ display: "flex", gap: 6, marginBottom: 20 }}>
                  {(["en", "fr", "ar"] as const).map((lang) => (
                    <span
                      key={lang}
                      style={{
                        border: "1px solid rgba(255,255,255,.25)",
                        borderRadius: 4,
                        padding: "3px 8px",
                        fontSize: "0.72rem",
                        color: "rgba(255,255,255,.7)",
                        textTransform: "uppercase",
                      }}
                    >
                      {lang}
                    </span>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  <a
                    href={featured.pdfUrl}
                    style={{
                      background: "var(--orange)",
                      color: "#fff",
                      border: "none",
                      padding: "10px 20px",
                      borderRadius: 6,
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: 7,
                      textDecoration: "none",
                    }}
                  >
                    <Download size={14} /> Download PDF
                  </a>
                  <button
                    onClick={() => setPreviewPub(featured)}
                    style={{
                      background: "rgba(255,255,255,.1)",
                      color: "#fff",
                      border: "1px solid rgba(255,255,255,.2)",
                      padding: "10px 20px",
                      borderRadius: 6,
                      fontSize: "0.85rem",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: 7,
                    }}
                  >
                    <Eye size={14} /> Preview
                  </button>
                </div>
              </div>

              {/* Cover placeholder */}
              <div
                style={{
                  background: "rgba(255,255,255,.06)",
                  borderRadius: 8,
                  aspectRatio: "3/4",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "rgba(255,255,255,.2)",
                }}
              >
                <FileText size={48} />
              </div>
            </div>
          )}

          {/* Results bar */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <span style={{ fontSize: "0.85rem", color: "rgba(255,255,255,.5)" }}>
              {loading && page === 1 ? (
                "Searching…"
              ) : (
                <>
                  Showing <strong style={{ color: "#fff" }}>{rest.length + (featured ? 1 : 0)}</strong> of{" "}
                  <strong style={{ color: "#fff" }}>{totalDocs}</strong> results
                  {query ? <> for “{query}”</> : null}
                </>
              )}
            </span>
          </div>

          {/* Publication list */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 32 }}>
            {!loading && rest.length === 0 && !featured && (
              <div style={{ color: "rgba(255,255,255,.5)", fontSize: "0.9rem", padding: "24px 0" }}>
                No publications match your search and filters.
              </div>
            )}
            {rest.map((pub) => (
              <PublicationCard key={pub.id} pub={pub} onPreview={setPreviewPub} />
            ))}
          </div>

          {/* Load more */}
          {page < totalPages && (
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <button
                onClick={() => setPage((p) => p + 1)}
                disabled={loading}
                style={{
                  background: "transparent",
                  border: "2px solid rgba(255,255,255,.25)",
                  color: "rgba(255,255,255,.7)",
                  padding: "12px 36px",
                  borderRadius: 8,
                  fontSize: "0.9rem",
                  fontWeight: 700,
                  cursor: loading ? "default" : "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  opacity: loading ? 0.6 : 1,
                }}
              >
                {loading ? "Loading…" : "Load More Publications"} <ChevronDown size={16} />
              </button>
            </div>
          )}
        </main>
      </div>

      <PDFModal pub={previewPub} onClose={() => setPreviewPub(null)} />
    </>
  );
}
