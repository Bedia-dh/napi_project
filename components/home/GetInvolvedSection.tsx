import { Handshake, Heart } from "lucide-react";
import type { FC } from "react";
import { InteractiveHoverButton } from "@/components/ui/InteractiveHoverButton";

const pathways: {
  Icon: FC<{ size?: number; color?: string }>;
  title: string;
  description: string;
  cta: string;
  href: string;
}[] = [
  {
    Icon: Handshake,
    title: "Partner With Us",
    description:
      "Co-host a Chill Chat, sponsor a Policy Lab, or embed NAPI research in your programs.",
    cta: "Become a Partner",
    href: "/contact",
  },
  {
    Icon: Heart,
    title: "Support Our Work",
    description:
      "Help fund the next generation of North African policy leaders with a financial contribution.",
    cta: "Donate",
    href: "/contact",
  },
];

export default function GetInvolvedSection() {
  return (
    <section style={{ background: "var(--cream)", padding: `72px var(--section-px)` }}>
      <div style={{ marginBottom: "2.5rem" }}>
        <p style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "var(--orange)", marginBottom: "0.75rem" }}>
          Get Involved
        </p>
        <h2 style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)", fontWeight: 800, color: "#000000", letterSpacing: "-0.02em" }}>
          Join the initiative
        </h2>
      </div>

      <div className="get-involved-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1.5rem" }}>
        {pathways.map(({ Icon, title, description, cta, href }) => (
          <div
            key={title}
            style={{
              background: "var(--navy-dark)",
              borderRadius: 10,
              padding: "2rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
            }}
          >
            <Icon size={28} color="var(--orange)" />
            <h3 style={{ color: "#fff", fontWeight: 700, fontSize: "1.05rem" }}>{title}</h3>
            <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.875rem", lineHeight: 1.7, flex: 1 }}>
              {description}
            </p>
            <InteractiveHoverButton href={href} variant="orangeOnDark">
              {cta} &rarr;
            </InteractiveHoverButton>
          </div>
        ))}
      </div>
    </section>
  );
}
