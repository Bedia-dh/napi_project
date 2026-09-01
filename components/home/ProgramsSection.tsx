import Link from "next/link";
import { GraduationCap, Coffee, Users, PenLine, type LucideIcon } from "lucide-react";
import { getPrograms } from "@/lib/payload/queries";

const PROGRAM_ICONS: Record<string, LucideIcon> = {
  ypl: GraduationCap,
  "chill-chat": Coffee,
  "mei-roundtables": Users,
  "youth-voices": PenLine,
};

export default async function ProgramsSection() {
  const { programs } = await getPrograms();

  return (
    <section style={{ background: "var(--navy-dark)", padding: "72px var(--section-px)" }}>
      <div style={{ marginBottom: "2rem" }}>
        <p style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "var(--orange)", marginBottom: "0.75rem" }}>
          Our Programs
        </p>
        <h2 style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)", fontWeight: 800, color: "#fff", letterSpacing: "-0.02em" }}>
          How We Work
        </h2>
      </div>

      <div className="programs-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1.25rem" }}>
        {programs.map((prog) => {
          const Icon = PROGRAM_ICONS[prog.id] ?? Users;
          const hasImage = !!prog.imageUrl;

          return (
          <Link
            key={prog.id}
            href={prog.href}
            className="program-tile"
            style={{
              background: "#fff",
              borderRadius: 10,
              overflow: "hidden",
              display: "grid",
              gridTemplateColumns: hasImage ? "180px 1fr" : "140px 1fr",
              textDecoration: "none",
              boxShadow: "0 2px 12px rgba(0,0,0,.2)",
            }}
          >
            {/* Left panel: real image or icon fallback */}
            {hasImage ? (
              <div
                style={{
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={prog.imageUrl}
                  alt={prog.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                    display: "block",
                    minHeight: 160,
                  }}
                />
                {/* Name overlay at bottom */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: "linear-gradient(transparent, rgba(0,0,0,.7))",
                    padding: "24px 12px 10px",
                  }}
                >
                  <span
                    style={{
                      color: "#fff",
                      fontSize: "0.72rem",
                      fontWeight: 800,
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                      lineHeight: 1.3,
                    }}
                  >
                    {prog.name}
                  </span>
                </div>
              </div>
            ) : (
              <div
                style={{
                  background: `color-mix(in srgb, ${prog.color} 13%, white)`,
                  borderRight: `3px solid ${prog.color}`,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.6rem",
                  padding: "1.5rem 1rem",
                }}
              >
                <Icon size={26} color={prog.color} />
                <span
                  style={{
                    color: "var(--navy)",
                    fontSize: "0.75rem",
                    fontWeight: 800,
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    textAlign: "center",
                    lineHeight: 1.4,
                  }}
                >
                  {prog.name}
                </span>
              </div>
            )}

            {/* Body */}
            <div style={{ padding: "1.5rem" }}>
              <p style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--orange)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.35rem" }}>
                {prog.tagline}
              </p>
              <p style={{ fontSize: "0.83rem", color: "var(--gray-mid)", lineHeight: 1.6, marginBottom: "1rem" }}>
                {prog.description}
              </p>
              <div style={{ display: "flex", gap: "1.5rem" }}>
                {prog.stats.map((s) => (
                  <div key={s.label}>
                    <strong style={{ display: "block", fontSize: "1.05rem", color: "var(--navy)", fontWeight: 800 }}>
                      {s.value}
                    </strong>
                    <span style={{ fontSize: "0.68rem", color: "var(--gray-mid)" }}>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </Link>
          );
        })}
      </div>
    </section>
  );
}
