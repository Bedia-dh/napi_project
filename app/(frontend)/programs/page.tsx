import Link from "next/link";
import { GraduationCap, Coffee, Users, PenLine, type LucideIcon } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import { getPrograms } from "@/lib/payload/queries";

// Small accent icon per program — paired with a light tint of the program's
// existing accent color instead of filling the whole card with it.
const PROGRAM_ICONS: Record<string, LucideIcon> = {
  ypl: GraduationCap,
  "chill-chat": Coffee,
  "mei-roundtables": Users,
  "youth-voices": PenLine,
};

// See app/(frontend)/page.tsx for why this is set.
export const revalidate = 300;

export default async function ProgramsPage() {
  const { programs, source } = await getPrograms();

  return (
    <section style={{ padding: "5rem 2rem" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionHeader
          eyebrow="Our Programs"
          title="What We Do"
          subtitle="Four programs building the next generation of North African policy leaders."
        />

        {process.env.NODE_ENV !== "production" && source === "static-fallback" && (
          <div style={{ marginBottom: "1.5rem", background: "#fff3eb", border: "1px dashed var(--orange)", borderRadius: 8, padding: "8px 14px", fontSize: "0.78rem", color: "var(--gray-mid)" }}>
            Dev note: serving programs from the static dataset - connect DATABASE_URI to query MongoDB via Payload instead.
          </div>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1.5rem" }}>
          {programs.map((prog) => {
            const Icon = PROGRAM_ICONS[prog.id] ?? Users;
            return (
              <Link
                key={prog.id}
                href={prog.href}
                className="program-card"
                style={{
                  background: "#fff",
                  border: "1px solid rgba(33,77,144,0.08)",
                  borderTop: `4px solid ${prog.color}`,
                  borderRadius: 12,
                  padding: "2.25rem",
                  textDecoration: "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                  boxShadow: "0 2px 12px rgba(13,30,61,.06)",
                }}
              >
                <span
                  style={{
                    width: 46,
                    height: 46,
                    borderRadius: 10,
                    background: `color-mix(in srgb, ${prog.color} 14%, white)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "0.35rem",
                  }}
                >
                  <Icon size={22} color={prog.color} />
                </span>
                <p style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--orange)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  {prog.tagline}
                </p>
                <h3 style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--navy)" }}>{prog.name}</h3>
                <p style={{ fontSize: "0.85rem", color: "var(--gray-mid)", lineHeight: 1.7 }}>{prog.description}</p>
                <div style={{ display: "flex", gap: "1.5rem", marginTop: "auto" }}>
                  {prog.stats.map((s) => (
                    <div key={s.label}>
                      <strong style={{ display: "block", fontSize: "1.1rem", color: "var(--navy)", fontWeight: 800 }}>{s.value}</strong>
                      <span style={{ fontSize: "0.7rem", color: "var(--gray-mid)" }}>{s.label}</span>
                    </div>
                  ))}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
