"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { FileText, Calendar, Layers, File as FileIcon, Loader2, Search } from "lucide-react";
import type { SearchResult } from "@/lib/types/search";

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
}

const TYPE_META: Record<SearchResult["type"], { label: string; Icon: typeof FileText }> = {
  publication: { label: "Publications", Icon: FileText },
  event: { label: "Events", Icon: Calendar },
  program: { label: "Programs", Icon: Layers },
  page: { label: "Pages", Icon: FileIcon },
};

const TYPE_ORDER: SearchResult["type"][] = ["publication", "event", "program", "page"];

export default function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const [input, setInput] = useState("");
  const [query, setQuery] = useState(""); // debounced value actually sent to the API
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  // Reset to a blank slate every time the overlay opens, and focus the input.
  useEffect(() => {
    if (!open) return;
    setInput("");
    setQuery("");
    setResults([]);
    setSearched(false);
    inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  // Debounce keystrokes before firing a request.
  useEffect(() => {
    const t = setTimeout(() => setQuery(input.trim()), 300);
    return () => clearTimeout(t);
  }, [input]);

  useEffect(() => {
    if (!query) {
      setResults([]);
      setLoading(false);
      setSearched(false);
      return;
    }

    let cancelled = false;
    setLoading(true);

    fetch(`/api/search?q=${encodeURIComponent(query)}`)
      .then((res) => res.json())
      .then((data: { results: SearchResult[] }) => {
        if (cancelled) return;
        setResults(data.results ?? []);
      })
      .catch(() => {
        if (!cancelled) setResults([]);
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
          setSearched(true);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [query]);

  if (!open) return null;

  const goTo = (href: string) => {
    router.push(href);
    onClose();
  };

  const grouped = TYPE_ORDER.map((type) => ({
    type,
    items: results.filter((r) => r.type === type),
  })).filter((g) => g.items.length > 0);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 500,
        background: "rgba(21,51,97,0.97)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflowY: "auto",
        padding: "2rem",
      }}
    >
      <div onClick={(e) => e.stopPropagation()} style={{ width: "100%", maxWidth: 640, margin: "auto 0" }}>
        <p style={{ color: "var(--orange)", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1rem" }}>
          Search NAPI
        </p>

        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", borderBottom: "2px solid rgba(255,255,255,0.3)" }}>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Publications, events, programs…"
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              color: "#fff",
              fontSize: "2rem",
              fontWeight: 300,
              padding: "0.5rem 0",
              outline: "none",
            }}
          />
          {loading && <Loader2 size={22} color="rgba(255,255,255,0.5)" className="animate-spin" />}
        </div>

        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8rem", marginTop: "1rem", marginBottom: "1.75rem" }}>
          Press Escape to close
        </p>

        {/* Results */}
        {query && !loading && searched && grouped.length === 0 && (
          <div style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.95rem", padding: "1.5rem 0", borderTop: "1px solid rgba(255,255,255,0.12)" }}>
            No results for “{query}”. Try a different word or keyword.
          </div>
        )}

        {grouped.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem", paddingBottom: "2rem" }}>
            {grouped.map(({ type, items }) => {
              const { label, Icon } = TYPE_META[type];
              return (
                <div key={type}>
                  <p
                    style={{
                      fontSize: "0.68rem",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.4)",
                      marginBottom: "0.6rem",
                    }}
                  >
                    {label}
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                    {items.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => goTo(item.href)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.85rem",
                          width: "100%",
                          textAlign: "left",
                          background: "rgba(255,255,255,0.05)",
                          border: "1px solid rgba(255,255,255,0.08)",
                          borderRadius: 8,
                          padding: "0.75rem 1rem",
                          cursor: "pointer",
                          transition: "background 0.15s ease",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.05)")}
                      >
                        <Icon size={17} color="var(--orange)" style={{ flexShrink: 0 }} />
                        <span style={{ minWidth: 0, flex: 1 }}>
                          <span style={{ display: "block", color: "#fff", fontSize: "0.92rem", fontWeight: 600, lineHeight: 1.4 }}>
                            {item.title}
                          </span>
                          {item.subtitle && (
                            <span style={{ display: "block", color: "rgba(255,255,255,0.5)", fontSize: "0.78rem", marginTop: "0.15rem" }}>
                              {item.subtitle}
                            </span>
                          )}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {!query && (
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", color: "rgba(255,255,255,0.35)", fontSize: "0.85rem" }}>
            <Search size={15} />
            Start typing to search publications, events, programs, and pages.
          </div>
        )}
      </div>
    </div>
  );
}
