import { Heart, Users, Target, Award, Leaf, Shield, Microscope, Globe, Handshake, Settings, Layers, Unlock } from "lucide-react";
import type { FC } from "react";

const values: {
  Icon: FC<{ size?: number; color?: string }>;
  title: string;
  bullets: string[];
}[] = [
  {
    Icon: Heart,
    title: "Local Ownership",
    bullets: [
      "Participatory approach in internal governance and programs",
      "Beneficiaries determine their policy focus, working language, and training needs",
    ],
  },
  {
    Icon: Users,
    title: "Diversity",
    bullets: [
      "Equal participation of women, and transnational cohorts of participants",
      "Promote diversity of perspectives, dialogue, cooperation, and peer-to-peer learning",
    ],
  },
  {
    Icon: Target,
    title: "Impact",
    bullets: [
      "Foster active youth engagement in civic and policy life",
      "Empower youth to tackle real-world challenges through concrete action",
    ],
  },
  {
    Icon: Award,
    title: "Excellence",
    bullets: [
      "Strive for excellence in processes, besides and beyond results",
      "Focus on attitude and momentum rather than status",
    ],
  },
  {
    Icon: Leaf,
    title: "Sustainability",
    bullets: [
      "Mentor and support youth beyond training",
      "Empower youth and help them be successful on their own",
    ],
  },
];

const methods: {
  Icon: FC<{ size?: number; color?: string }>;
  title: string;
  desc: string;
}[] = [
  {
    Icon: Shield,
    title: "Independence",
    desc: "We accept no editorial direction from governments, donors, or political parties.",
  },
  {
    Icon: Microscope,
    title: "Evidence-Based",
    desc: "Ground every opinion and analysis on data, research, and rigorous methodology.",
  },
  {
    Icon: Globe,
    title: "Multi-culturalism",
    desc: "We build bridges among peoples and enrich perspectives through transnational dialogue and cooperation.",
  },
  {
    Icon: Handshake,
    title: "Collaboration",
    desc: "We work with partners and donors, not for them. We co-design every program with local stakeholders.",
  },
  {
    Icon: Settings,
    title: "Flexibility",
    desc: "Pace activities to accommodate work and/or study, and provide flexible timelines.",
  },
  {
    Icon: Layers,
    title: "Multi-disciplinarity & Intersectionality",
    desc: "Expose youth to multiple policy dimensions, fields of inquiry, and modes of civic action.",
  },
  {
    Icon: Unlock,
    title: "Open Access",
    desc: "All publications are freely available in English, French, and Arabic.",
  },
];

export default function CoreValues() {
  return (
    <>
      {/* Core Values */}
      <section style={{ background: "var(--navy)", padding: "72px var(--section-px)" }}>
        <div style={{ marginBottom: "2.5rem", textAlign: "center" }}>
          <p style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "var(--orange)", marginBottom: "0.75rem" }}>
            What We Stand For
          </p>
          <h2 style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)", fontWeight: 800, color: "#fff", letterSpacing: "-0.02em" }}>
            Our Core Values
          </h2>
        </div>

        <div className="values-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem" }}>
          {values.map(({ Icon, title, bullets }) => (
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
                <Icon size={26} color="var(--orange)" />
              </div>
              <h3 style={{ color: "var(--navy)", fontWeight: 700, marginBottom: "0.75rem", fontSize: "1rem" }}>
                {title}
              </h3>
              <ul style={{ margin: 0, paddingLeft: "1.1rem", listStyle: "disc" }}>
                {bullets.map((b) => (
                  <li key={b} style={{ color: "var(--gray-mid)", fontSize: "0.85rem", lineHeight: 1.7, marginBottom: "0.35rem" }}>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Our Method */}
      <section style={{ background: "var(--cream)", padding: "72px var(--section-px)" }}>
        <div style={{ marginBottom: "2.5rem", textAlign: "center" }}>
          <p style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "var(--orange)", marginBottom: "0.75rem" }}>
            How We Work
          </p>
          <h2 style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)", fontWeight: 800, color: "var(--navy)", letterSpacing: "-0.02em" }}>
            Our Method
          </h2>
        </div>

        <div className="method-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.25rem" }}>
          {methods.map(({ Icon, title, desc }) => (
            <div
              key={title}
              style={{
                background: "#fff",
                borderRadius: 10,
                padding: "1.5rem",
                borderLeft: "3px solid var(--orange)",
              }}
            >
              <div style={{ marginBottom: "0.6rem" }}>
                <Icon size={22} color="var(--navy)" />
              </div>
              <h3 style={{ color: "var(--navy)", fontWeight: 700, marginBottom: "0.4rem", fontSize: "0.92rem" }}>
                {title}
              </h3>
              <p style={{ color: "var(--gray-mid)", fontSize: "0.82rem", lineHeight: 1.7 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .values-grid { grid-template-columns: 1fr !important; }
          .method-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .method-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
