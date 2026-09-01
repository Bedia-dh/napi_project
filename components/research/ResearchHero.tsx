export default function ResearchHero() {
  const stats = [
    { value: "85+", label: "Publications" },
    { value: "6", label: "Policy Issues" },
    { value: "3", label: "Languages" },
    { value: "2017", label: "Since" },
  ];

  return (
    <section
      style={{
        background: "linear-gradient(140deg,#f0f5ff 0%,#e8f0fd 55%,#f5f7ff 100%)",
        color: "var(--navy)",
        padding: "72px var(--section-px) 56px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Map texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url(/media/map.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.05,
          pointerEvents: "none",
        }}
      />
      {/* Radial orange glow */}
      <div
        style={{
          position: "absolute",
          right: 0,
          bottom: 0,
          width: 420,
          height: 420,
          background: "radial-gradient(circle,rgba(240,112,48,.07),transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", zIndex: 1 }}>
        <div
          style={{
            display: "inline-block",
            background: "var(--orange)",
            color: "#fff",
            fontSize: "0.72rem",
            fontWeight: 700,
            letterSpacing: "2px",
            padding: "5px 12px",
            borderRadius: 2,
            marginBottom: "18px",
            textTransform: "uppercase",
          }}
        >
          Research & Publications
        </div>

        <h1
          style={{
            fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
            fontWeight: 800,
            lineHeight: 1.15,
            maxWidth: 620,
            marginBottom: 16,
            color: "var(--navy)",
            letterSpacing: "-0.02em",
          }}
        >
          Knowledge That Moves Policy Forward
        </h1>

        <p
          style={{
            color: "var(--gray-mid)",
            fontSize: "1rem",
            maxWidth: 520,
            lineHeight: 1.7,
            marginBottom: 36,
          }}
        >
          Browse our full library of policy briefs, research papers, reports, and conference
          proceedings, available in English, French, and Arabic.
        </p>

        <div style={{ display: "flex", gap: 40 }}>
          {stats.map((s) => (
            <div key={s.label}>
              <span style={{ display: "block", fontSize: "2rem", fontWeight: 800, color: "var(--orange)" }}>
                {s.value}
              </span>
              <small
                style={{
                  fontSize: "0.78rem",
                  color: "var(--gray-mid)",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}
              >
                {s.label}
              </small>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
