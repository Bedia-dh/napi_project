import Link from "next/link";
import Image from "next/image";

const footerLinks = {
  Navigate: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Knowledge Hub", href: "/research" },
    { label: "Programs", href: "/programs" },
    { label: "Get Involved", href: "/get-involved" },
  ],
  Programs: [
    { label: "Leadership", href: "/programs/ypl" },
    { label: "Knowledge", href: "/programs/training-workshops" },
    { label: "Awareness & Socialization", href: "/programs/chill-chat" },
    { label: "Publishing", href: "/programs/youth-voices" },
    { label: "Civic Values & Creativity", href: "/programs/art4civics" },
  ],
  Connect: [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/north-african-policy-initiative/" },
    { label: "Facebook", href: "https://www.facebook.com/NAPI-North-African-Policy-Initiative-100150241733526" },
    { label: "Instagram", href: "https://www.instagram.com/napi_policy/" },
    { label: "Newsletter", href: "#newsletter" },
    { label: "Contact", href: "/contact" },
  ],
};

export default function Footer() {
  return (
    <footer style={{ background: "#fff", borderTop: "1px solid #e5e8ee", padding: `48px var(--section-px) 24px` }}>
      <div
        className="footer-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr 1fr 1fr",
          gap: 40,
          marginBottom: 40,
        }}
      >
        {/* Brand column */}
        <div className="footer-brand">
          <Link href="/" style={{ display: "block", marginBottom: 12 }}>
            <Image
              src="/media/napi.png"
              alt="NAPI"
              width={130}
              height={40}
              style={{ objectFit: "contain", height: "auto", width: "auto"}}
            />
          </Link>
          <p style={{ color: "var(--gray-mid)", fontSize: "0.82rem", lineHeight: 1.6 }}>
            North African Policy Initiative — We strengthen participatory governance in the
            Mediterranean by promoting broad youth civic engagement, fostering societal and
            organizational leadership, and developing critical thinking, cross-cultural dialogue,
            and transnational cooperation.
          </p>
        </div>

        {/* Link columns */}
        {Object.entries(footerLinks).map(([title, links]) => (
          <div key={title}>
            <h4
              style={{
                color: "var(--navy)",
                fontSize: "0.82rem",
                fontWeight: 700,
                letterSpacing: "1px",
                textTransform: "uppercase",
                marginBottom: 14,
              }}
            >
              {title}
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  style={{ color: "var(--gray-mid)", fontSize: "0.82rem", textDecoration: "none", transition: "color .2s" }}
                  onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--orange)")}
                  onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "var(--gray-mid)")}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div
        className="footer-bottom"
        style={{
          borderTop: "1px solid #e5e8ee",
          paddingTop: 20,
          display: "flex",
          justifyContent: "space-between",
          color: "#bbb",
          fontSize: "0.8rem",
        }}
      >
        <span suppressHydrationWarning>&copy; {new Date().getFullYear()} NAPI - North African Policy Initiative</span>
        <span style={{ display: "flex", gap: 6 }}>
          <Link href="/privacy-policy" style={{ color: "#bbb", textDecoration: "none" }}>
            Privacy Policy
          </Link>
          &middot;
          <Link href="/terms-of-use" style={{ color: "#bbb", textDecoration: "none" }}>
            Terms of Use
          </Link>
        </span>
      </div>
    </footer>
  );
}
