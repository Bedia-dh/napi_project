export default function AboutHero() {
  const stats = [
    { value: "2017", label: "Founded" },
    { value: "12", label: "Countries" },
    { value: "200+", label: "Leaders" },
    { value: "85+", label: "Publications" },
  ];

  return (
    <section
      style={{
        background: "linear-gradient(140deg,#f0f5ff 0%,#e8f0fd 55%,#f5f7ff 100%)",
        padding: "72px var(--section-px) 56px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url(/media/map.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.05,
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
            marginBottom: 18,
            textTransform: "uppercase",
          }}
        >
          About NAPI
        </div>
        <h1
          style={{
            fontSize: "clamp(2rem, 3.5vw, 3rem)",
            fontWeight: 800,
            color: "var(--navy)",
            lineHeight: 1.1,
            maxWidth: 700,
            marginBottom: 16,
            letterSpacing: "-0.02em",
          }}
        >
          Building the Next Generation of{" "}
          <span style={{ color: "var(--orange)" }}>Policy Leaders</span>
        </h1>
        <p
          style={{
            color: "var(--gray-mid)",
            fontSize: "1rem",
            maxWidth: 520,
            lineHeight: 1.7,
            marginBottom: 40,
          }}
        >
          NAPI is an independent think tank dedicated to empowering young North Africans through
          evidence-based research, policy dialogue, and hands-on training.
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
