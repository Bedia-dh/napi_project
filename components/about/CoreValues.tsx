import { Microscope, Globe, Users, Unlock, Shield, Handshake } from "lucide-react";
import type { FC } from "react";

const values: {
  Icon: FC<{ size?: number; color?: string }>;
  title: string;
  desc: string;
}[] = [
  {
    Icon: Microscope,
    title: "Evidence-Based",
    desc: "Every claim we make is grounded in data, research, and rigorous methodology.",
  },
  {
    Icon: Globe,
    title: "Regional Perspective",
    desc: "We center North African voices, contexts, and priorities in all our work.",
  },
  {
    Icon: Users,
    title: "Youth-Led",
    desc: "Young people are not our audience - they are our researchers, leaders, and authors.",
  },
  {
    Icon: Unlock,
    title: "Open Access",
    desc: "All publications are freely available in English, French, and Arabic.",
  },
  {
    Icon: Shield,
    title: "Independence",
    desc: "We accept no editorial direction from governments, donors, or political parties.",
  },
  {
    Icon: Handshake,
    title: "Collaboration",
    desc: "We build with partners, not for them - co-designing every program with local stakeholders.",
  },
];

export default function CoreValues() {
  return (
    <section style={{ background: "var(--navy)", padding: "72px 80px" }}>
      <div style={{ marginBottom: "2.5rem", textAlign: "center" }}>
        <p style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "var(--orange)", marginBottom: "0.75rem" }}>
          What We Stand For
        </p>
        <h2 style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)", fontWeight: 800, color: "#FFFF", letterSpacing: "-0.02em" }}>
          Our Core Values
        </h2>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem" }}>
        {values.map(({ Icon, title, desc }) => (
          <div
            key={title}
            style={{
              background: "#fff",
              borderRadius: 10,
              padding: "1.75rem",
              borderTop: "3px solid var(--orange)",
            }}
          >
            <div style={{ marginBottom: "0.75rem" }}>
              <Icon size={26} color="#000" />
            </div>
            <h3 style={{ color: "#000", fontWeight: 700, marginBottom: "0.5rem", fontSize: "1rem" }}>
              {title}
            </h3>
            <p style={{ color: "var(--gray-mid)", fontSize: "0.875rem", lineHeight: 1.7 }}>{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
