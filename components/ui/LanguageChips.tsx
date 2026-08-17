import type { LanguageCode } from "@/lib/types/publication";

const allLangs: LanguageCode[] = ["en", "fr", "ar"];

interface LanguageChipsProps {
  available: LanguageCode[];
}

export default function LanguageChips({ available }: LanguageChipsProps) {
  return (
    <div style={{ display: "flex", gap: "0.3rem" }}>
      {allLangs.map((lang) => {
        const active = available.includes(lang);
        return (
          <span
            key={lang}
            style={{
              fontSize: "0.65rem",
              fontWeight: 700,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              padding: "0.15rem 0.5rem",
              borderRadius: 3,
              border: `1px solid ${active ? "var(--orange)" : "var(--gray-light)"}`,
              color: active ? "var(--orange)" : "var(--gray-mid)",
              background: active ? "rgba(240,112,48,0.08)" : "transparent",
            }}
          >
            {lang}
          </span>
        );
      })}
    </div>
  );
}
