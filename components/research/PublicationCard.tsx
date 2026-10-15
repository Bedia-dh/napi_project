import { Download, Eye, ExternalLink } from "lucide-react";
import type { Publication } from "@/lib/types/publication";

// One consistent, minimalist style for every publication type — kept
// professional by differentiating through the label text, not a rainbow
// of colors. Program tags (orange) remain the only accent color.
const NEUTRAL_BADGE = { bg: "rgba(33,77,144,0.06)", color: "var(--navy)" };

const typeLabels: Record<string, string> = {
  "edited-volume": "Edited Volume",
  "book-chapter": "Book Chapter",
  "research-brief": "Research Brief",
  "policy-briefing": "Policy Briefing",
  "journal-article": "Journal Article",
  "policy-paper": "Policy Paper",
  "research-report": "Research Report",
};

interface PublicationCardProps {
  pub: Publication;
  onPreview: (pub: Publication) => void;
}

function isExternalLink(url: string): boolean {
  return url.startsWith("https://") && !url.includes("drive.google.com");
}

/** Resolve the best download URL for a publication. */
function resolveDownloadUrl(url: string): string {
  // Payload-served media — already a direct download URL
  if (url.startsWith("/api/media/file/")) return url;
  // Google Drive sharing link → direct download
  const m = url.match(/drive\.google\.com\/file\/d\/([^/]+)/);
  if (m) return `https://drive.google.com/uc?export=download&id=${m[1]}`;
  return url;
}

export default function PublicationCard({ pub, onPreview }: PublicationCardProps) {
  const label = typeLabels[pub.type] ?? pub.type;
  const external = isExternalLink(pub.pdfUrl);
  const href = external ? pub.pdfUrl : resolveDownloadUrl(pub.pdfUrl);

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 12,
        padding: "22px 26px",
        boxShadow: "0 2px 12px rgba(0,0,0,.2)",
        display: "flex",
        alignItems: "flex-start",
        gap: 20,
        transition: "transform .2s, box-shadow .2s",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 24px rgba(0,0,0,.28)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 12px rgba(0,0,0,.2)";
      }}
    >
      {/* Left content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 10, flexWrap: "wrap" }}>
          <span
            style={{
              fontSize: "0.68rem",
              fontWeight: 700,
              padding: "4px 9px",
              borderRadius: 3,
              letterSpacing: "0.5px",
              textTransform: "uppercase",
              background: NEUTRAL_BADGE.bg,
              color: NEUTRAL_BADGE.color,
              border: "1px solid rgba(33,77,144,0.12)",
            }}
          >
            {label}
          </span>
          {pub.program && (
            <span
              style={{
                fontSize: "0.68rem",
                fontWeight: 600,
                padding: "4px 9px",
                borderRadius: 3,
                background: "#fff3eb",
                color: "var(--orange)",
              }}
            >
              {pub.program.toUpperCase()}
            </span>
          )}
        </div>

        <h3 style={{ fontSize: "0.97rem", fontWeight: 700, color: "var(--navy)", lineHeight: 1.45, marginBottom: 6 }}>
          {pub.title}
        </h3>
        <div style={{ fontSize: "0.78rem", color: "var(--gray-mid)", marginBottom: 10 }}>
          {pub.authors.join(", ")} · {pub.year}{pub.pages ? ` · ${pub.pages} pages` : ""}
        </div>

        {/* Language chips */}
        <div style={{ display: "flex", gap: 5 }}>
          {(["en", "fr", "ar", "it"] as const).map((lang) => {
            const avail = pub.languages.includes(lang);
            if (!avail) return null;
            return (
              <span
                key={lang}
                style={{
                  fontSize: "0.7rem",
                  border: "1px solid var(--orange)",
                  borderRadius: 3,
                  padding: "2px 7px",
                  color: "var(--orange)",
                  background: "#fff8f5",
                  textTransform: "uppercase",
                }}
              >
                {lang}
              </span>
            );
          })}
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8, flexShrink: 0, marginTop: 4 }}>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            background: "var(--navy)",
            color: "#fff",
            border: "none",
            padding: "9px 16px",
            borderRadius: 6,
            fontSize: "0.78rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 5,
            fontWeight: 600,
            whiteSpace: "nowrap",
            textDecoration: "none",
          }}
        >
          {external ? <><ExternalLink size={13} /> Read</> : <><Download size={13} /> Download</>}
        </a>
        <button
          onClick={() => onPreview(pub)}
          style={{
            background: "#fff",
            color: "var(--navy)",
            border: "1.5px solid #ddd",
            padding: "9px 16px",
            borderRadius: 6,
            fontSize: "0.78rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 5,
            whiteSpace: "nowrap",
          }}
        >
          <Eye size={13} /> Preview
        </button>
      </div>
    </div>
  );
}
