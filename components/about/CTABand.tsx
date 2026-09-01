import { ArrowRight } from "lucide-react";
import { InteractiveHoverButton } from "@/components/ui/InteractiveHoverButton";

export default function CTABand() {
  return (
    <section
      style={{
        background: "#fff",
        borderTop: "3px solid var(--orange)",
        padding: "60px var(--section-px)",
        textAlign: "center",
      }}
    >
      <h2 style={{ fontSize: "2rem", fontWeight: 800, color: "#000", marginBottom: "0.75rem", letterSpacing: "-0.02em" }}>
        Want to Collaborate?
      </h2>
      <p style={{ color: "var(--gray-mid)", fontSize: "1rem", marginBottom: "2rem", maxWidth: 480, margin: "0 auto 2rem" }}>
        Whether you&apos;re a researcher, institution, or funder, there are many ways to work with NAPI.
      </p>
      <InteractiveHoverButton href="/contact" variant="navy">
        Get in Touch <ArrowRight size={16} />
      </InteractiveHoverButton>
    </section>
  );
}
