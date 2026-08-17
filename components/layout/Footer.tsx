import Link from "next/link";
import Image from "next/image";

const footerLinks = {
  Navigate: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Research Hub", href: "/research" },
    { label: "Programs", href: "/programs" },
    { label: "Get Involved", href: "/get-involved" },
  ],
  Programs: [
    { label: "Youth Policy Lab", href: "/programs/ypl" },
    { label: "Chill Chat", href: "/programs/chill-chat" },
    { label: "NAPI-MEI Roundtables", href: "/programs/mei-roundtables" },
    { label: "Youth Voices", href: "/programs/youth-voices" },
  ],
  Connect: [
    { label: "Twitter / X", href: "#" },
    { label: "LinkedIn", href: "#" },
    { label: "YouTube", href: "#" },
    { label: "Newsletter", href: "#newsletter" },
    { label: "Contact", href: "/contact" },
  ],
};

export default function Footer() {
  return (
    <footer style={{ background: "#fff", borderTop: "1px solid #e5e8ee", padding: "48px 80px 24px" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr 1fr 1fr",
          gap: 40,
          marginBottom: 40,
        }}
      >
        {/* Brand column */}
        <div>
          <Link href="/" style={{ display: "block", marginBottom: 12 }}>
            <Image
              src="/media/logo_napi.png"
              alt="NAPI"
              width={120}
              height={36}
              style={{ objectFit: "contain", height: "auto", width: "auto", maxHeight: 36 }}
            />
          </Link>
          <p style={{ color: "var(--gray-mid)", fontSize: "0.82rem", lineHeight: 1.6 }}>
            North Africa Policy Institute - bridging research, advocacy, and youth leadership for a more equitable region.
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
        style={{
          borderTop: "1px solid #e5e8ee",
          paddingTop: 20,
          display: "flex",
          justifyContent: "space-between",
          color: "#bbb",
          fontSize: "0.8rem",
        }}
      >
        <span suppressHydrationWarning>© {new Date().getFullYear()} NAPI - North Africa Policy Institute</span>
        <span style={{ display: "flex", gap: 6 }}>
          <Link href="/privacy-policy" style={{ color: "#bbb", textDecoration: "none" }}>
            Privacy Policy
          </Link>
          ·
          <Link href="/terms-of-use" style={{ color: "#bbb", textDecoration: "none" }}>
            Terms of Use
          </Link>
        </span>
      </div>
    </footer>
  );
}
