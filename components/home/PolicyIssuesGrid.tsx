"use client";

const issues: {
  title: string;
  count: number;
  slug: string;
  image: string;
}[] = [
  {
    title: "Health Equity",
    count: 14,
    slug: "health-equity",
    image: "https://images.unsplash.com/photo-1778077156435-a3556b4a746f?auto=format&fit=crop&w=800&q=75",
  },
  {
    title: "Governance & Democracy",
    count: 22,
    slug: "governance",
    image: "https://images.unsplash.com/photo-1726428977819-680b9e803392?auto=format&fit=crop&w=800&q=75",
  },
  {
    title: "Climate & Environment",
    count: 11,
    slug: "climate",
    image: "https://images.unsplash.com/photo-1753881110611-00755160afd2?auto=format&fit=crop&w=800&q=75",
  },
  {
    title: "Education & Youth",
    count: 18,
    slug: "education",
    image: "https://images.unsplash.com/photo-1637531114994-ef00c3f54387?auto=format&fit=crop&w=800&q=75",
  },
  {
    title: "Gender & Inclusion",
    count: 9,
    slug: "gender",
    image: "https://images.unsplash.com/photo-1612365245810-0d73ad771b2d?auto=format&fit=crop&w=800&q=75",
  },
  {
    title: "Economy & Labour",
    count: 11,
    slug: "economy",
    image: "https://images.unsplash.com/photo-1778503175536-cef0fcf2888e?auto=format&fit=crop&w=800&q=75",
  },
];

export default function PolicyIssuesGrid() {
  return (
    <section style={{ background: "var(--navy-dark)", padding: `96px var(--section-px)` }}>
      <div style={{ marginBottom: "3rem", maxWidth: 640 }}>
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
          Policy Issues
        </p>
        <h2
          style={{
            fontSize: "clamp(1.75rem, 3vw, 2.75rem)",
            fontWeight: 800,
            color: "#fff",
            letterSpacing: "-0.02em",
            marginBottom: "0.75rem",
          }}
        >
          The Issues We Work On
        </h2>
        <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.7 }}>
          Six themes anchor our research and youth programming across the Maghreb and Arab world.
        </p>
      </div>

      <div
        className="issues-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1.5rem",
        }}
      >
        {issues.map(({ title, count, slug, image }) => (
          <a
            key={slug}
            href={`/research?theme=${slug}`}
            className="issue-card"
            style={{
              backgroundImage: `linear-gradient(180deg, rgba(21,51,97,0.2) 0%, rgba(21,51,97,0.55) 55%, rgba(21,51,97,0.9) 100%), url(${image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: 14,
              padding: "1.5rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              position: "relative",
              overflow: "hidden",
              cursor: "pointer",
              textDecoration: "none",
              aspectRatio: "4 / 3",
              isolation: "isolate",
            }}
          >
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
              <strong
                style={{
                  fontSize: "2.5rem",
                  fontWeight: 800,
                  color: "#fff",
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                  textShadow: "0 2px 12px rgba(0,0,0,0.35)",
                }}
              >
                {count}
              </strong>
              <span
                className="issue-arrow"
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.18)",
                  backdropFilter: "blur(4px)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  transition: "background .2s, transform .2s",
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17 17 7M7 7h10v10" />
                </svg>
              </span>
            </div>

            <div>
              <h3
                style={{
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "1.15rem",
                  lineHeight: 1.3,
                  marginBottom: "0.35rem",
                }}
              >
                {title}
              </h3>
              <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.8rem" }}>
                {count} publications
              </p>
            </div>
          </a>
        ))}
      </div>

      <style>{`
        .issue-card {
          transition: transform .25s ease, box-shadow .25s ease;
        }
        .issue-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 40px rgba(33,77,144,0.25);
        }
        .issue-card:hover .issue-arrow {
          background: var(--orange);
          transform: rotate(45deg);
        }
      `}</style>
    </section>
  );
}
