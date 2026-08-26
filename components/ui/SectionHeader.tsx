interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  light?: boolean; // true = white text (for navy backgrounds)
  center?: boolean;
}

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  light = false,
  center = false,
}: SectionHeaderProps) {
  return (
    <div style={{ textAlign: center ? "center" : "left", marginBottom: "2.5rem" }}>
      <p
        style={{
          fontSize: "0.7rem",
          fontWeight: 700,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "var(--orange)",
          marginBottom: "0.6rem",
        }}
      >
        {eyebrow}
      </p>
      <h2
        style={{
          fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
          fontWeight: 700,
          color: light ? "#fff" : "var(--navy)",
          lineHeight: 1.2,
          marginBottom: subtitle ? "0.75rem" : 0,
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          style={{
            fontSize: "1rem",
            color: light ? "rgba(255,255,255,0.7)" : "var(--gray-mid)",
            lineHeight: 1.7,
            maxWidth: 560,
            margin: center ? "0 auto" : undefined,
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
