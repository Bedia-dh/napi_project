import type { PublicationType } from "@/lib/types/publication";

const typeLabels: Record<PublicationType, string> = {
  brief: "Policy Brief",
  paper: "Research Paper",
  report: "Report",
  proceedings: "Proceedings",
};

interface BadgeProps {
  type: PublicationType;
}

// Single, minimalist style for every publication type — differentiated by
// label text only, not color, to keep the palette professional and on-brand.
export default function Badge({ type }: BadgeProps) {
  return (
    <span
      style={{
        display: "inline-block",
        background: "#FEF4EF",
        color: "var(--navy)",
        border: "1px solid rgba(33,77,144,0.12)",
        fontSize: "0.65rem",
        fontWeight: 700,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        padding: "0.2rem 0.6rem",
        borderRadius: 3,
      }}
    >
      {typeLabels[type]}
    </span>
  );
}
