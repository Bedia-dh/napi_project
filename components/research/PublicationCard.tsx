import { Download, Eye } from "lucide-react";
import type { Publication } from "@/lib/types/publication";

// One consistent, minimalist style for every publication type — kept
// professional by differentiating through the label text, not a rainbow
// of colors. Program tags (orange) remain the only accent color.
const NEUTRAL_BADGE = { bg: "rgba(33,77,144,0.06)", color: "var(--navy)" };

const typeStyles: Record<string, { bg: string; color: string; label: string }> = {
  brief:       { ...NEUTRAL_BADGE, label: "Policy Brief" },
  paper:       { ...NEUTRAL_BADGE, label: "Research Paper" },
  report:      { ...NEUTRAL_BADGE, label: "Report" },
  proceedings: { ...NEUTRAL_BADGE, label: "Proceedings" },
};

interface PublicationCardProps {
  pub: Publication;
  onPreview: (pub: Publication) => void;
}

export default function PublicationCard({ pub, onPreview }: PublicationCardProps) {
  const ts = typeStyles[pub.type];

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
              background: ts.bg,
              color: ts.color,
              border: "1px solid rgba(33,77,144,0.12)",
            }}
          >
            {ts.label}
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
          {pub.authors.join(", ")} · {pub.year} · {pub.pages} pages
        </div>

        {/* Language chips */}
        <div style={{ display: "flex", gap: 5 }}>
          {(["en", "fr", "ar"] as const).map((lang) => {
            const avail = pub.languages.includes(lang);
            return (
              <span
                key={lang}
                style={{
                  fontSize: "0.7rem",
                  border: `1px solid ${avail ? "var(--orange)" : "#ddd"}`,
                  borderRadius: 3,
                  padding: "2px 7px",
                  color: avail ? "var(--orange)" : "var(--gray-mid)",
                  background: avail ? "#fff8f5" : "transparent",
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
          href={pub.pdfUrl}
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
          <Download size={13} /> Download
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
