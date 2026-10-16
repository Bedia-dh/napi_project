import NewsletterForm from "@/components/ui/NewsletterForm";

export default function NewsletterSection() {
  return (
    <section
      id="newsletter"
      className="newsletter-band"
      style={{
        background: "#fff",
        borderTop: "3px solid var(--orange)",
        padding: `60px var(--section-px)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "40px",
      }}
    >
      <div>
        <h2 style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)", fontWeight: 800, color: "#000000" }}>
          Stay Connected and Informed
        </h2>
        <p style={{ color: "var(--gray-mid)", marginTop: "8px", fontSize: "0.9rem" }}>
          Get a regular news digest, relevant publications, policy insights, events, and opportunities to engage with NAPI delivered to your inbox.
        </p>
      </div>
      <div style={{ flexShrink: 0 }}>
        <NewsletterForm />
      </div>
    </section>
  );
}
