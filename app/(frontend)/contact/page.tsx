import type { Metadata } from "next";
import { Mail, MapPin, Clock } from "lucide-react";
import ContactForm from "@/components/contact/ContactForm";
import { ogMeta } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with the NAPI team — ask about our work, research, programmes, or opportunities. Interested in partnering, collaborating, or getting involved?",
  ...ogMeta({
    title: "Contact",
    description:
      "Get in touch with the NAPI team — ask about our work, research, programmes, or opportunities.",
    path: "/contact",
  }),
};

const details = [
  {
    Icon: Mail,
    label: "Email",
    value: "info@napipolicy.org",
    href: "mailto:info@napipolicy.org",
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

const socials = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/north-african-policy-initiative/",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/NAPI-North-African-Policy-Initiative-100150241733526",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/napi_policy/",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 11-2.882 0 1.441 1.441 0 012.882 0z" />
      </svg>
    ),
  },
];

export default function ContactPage() {
  return (
    <>
      {/* Header */}
      <section style={{ background: "var(--navy-dark)", padding: "clamp(2.5rem, 5vw, 64px) var(--section-px) clamp(2rem, 4vw, 56px)" }}>
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
          Get in Touch with Us
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
          Have a question about our work, research, programmes, or opportunities? Interested in
          partnering, collaborating, or getting involved? We&apos;d be happy to hear from you.
        </p>
      </section>

      {/* Body */}
      <section style={{ background: "var(--cream)", padding: "clamp(2.5rem, 5vw, 72px) var(--section-px)" }}>
        <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: "3rem", alignItems: "start", maxWidth: 1100, margin: "0 auto" }}>
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

            {/* Social links */}
            <div style={{ marginTop: "0.5rem" }}>
              <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--gray-mid)", marginBottom: "0.75rem" }}>
                Connect With Us
              </p>
              <div style={{ display: "flex", gap: "0.75rem" }}>
                {socials.map(({ label, href, icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 8,
                      background: "var(--navy)",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "background 0.2s",
                    }}
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <ContactForm />
        </div>
      </section>
    </>
  );
}
