import { Mail, MapPin, Clock } from "lucide-react";
import ContactForm from "@/components/contact/ContactForm";

export const metadata = {
  title: "Contact - NAPI",
};

const details = [
  {
    Icon: Mail,
    label: "Email",
    value: "contact@napipolicy.org",
    href: "mailto:contact@napipolicy.org",
  },
  {
    Icon: MapPin,
    label: "Region",
    value: "North Africa / Maghreb - team members across Morocco, Tunisia, and Algeria",
  },
  {
    Icon: Clock,
    label: "Response time",
    value: "We typically reply within 3-5 business days",
  },
];

export default function ContactPage() {
  return (
    <>
      {/* Header */}
      <section style={{ background: "var(--navy-dark)", padding: "64px 80px 56px" }}>
        <p
          style={{
            fontSize: "0.72rem",
            fontWeight: 700,
            letterSpacing: "2px",
            textTransform: "uppercase",
            color: "var(--orange)",
            marginBottom: "0.75rem",
          }}
        >
          Get in Touch
        </p>
        <h1
          style={{
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 800,
            color: "#fff",
            letterSpacing: "-0.02em",
            marginBottom: "1.25rem",
            maxWidth: 640,
          }}
        >
          Contact NAPI
        </h1>
        <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.75, maxWidth: 600 }}>
          Questions about our research, interested in partnering, or want to get involved? Send us
          a message and a member of the team will get back to you.
        </p>
      </section>

      {/* Body */}
      <section style={{ background: "var(--cream)", padding: "72px 80px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: "3rem", alignItems: "start" }}>
          {/* Details */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
            {details.map(({ Icon, label, value, href }) => (
              <div key={label} style={{ display: "flex", gap: "0.9rem", alignItems: "flex-start" }}>
                <span
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 8,
                    background: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    boxShadow: "0 2px 8px rgba(0,0,0,.06)",
                  }}
                >
                  <Icon size={17} color="var(--orange)" />
                </span>
                <div>
                  <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--gray-mid)", marginBottom: "0.25rem" }}>
                    {label}
                  </p>
                  {href ? (
                    <a href={href} style={{ fontSize: "0.92rem", fontWeight: 600, color: "var(--navy)" }}>
                      {value}
                    </a>
                  ) : (
                    <p style={{ fontSize: "0.92rem", fontWeight: 600, color: "var(--navy)", lineHeight: 1.5 }}>{value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <ContactForm />
        </div>
      </section>
    </>
  );
}
