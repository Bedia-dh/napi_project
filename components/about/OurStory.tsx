export default function OurStory() {
  return (
    <>
      {/* Story text — navy */}
      <section id="our-story" style={{ background: "var(--navy)", padding: "72px var(--section-px)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
          <div>
            <p style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "var(--orange)", marginBottom: "1rem" }}>
              Our Story
            </p>
            <h2 style={{ color: "#fff", fontSize: "clamp(1.5rem, 2.5vw, 2rem)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.2, marginBottom: "1.5rem" }}>
              Founded in 2019 Out of Necessity
            </h2>
            <p style={{ color: "#fff", lineHeight: 1.8, marginBottom: "1.25rem", fontSize: "0.95rem" }}>
              NAPI was born from a simple observation: Youth across the Mediterranean want to shape
              their world—but many lack the knowledge or confidence to engage in civic and policy
              spaces. We set out to bridge these gaps.
            </p>
            <p style={{ color: "#fff", lineHeight: 1.8, fontSize: "0.95rem" }}>
              What started as a small initiative to mentor young researchers has grown into a regional
              network spanning Morocco, Tunisia, Libya, Italy, and beyond, with contributors worldwide,
              and more than 30 partners across academia, public policy, and civil society.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {[
              { value: "7", label: "Years of impact" },
              { value: "35+", label: "Policy Leaders" },
              { value: "4", label: "Languages" },
            ].map((s) => (
              <div
                key={s.label}
                className="story-stat-box"
                style={{
                  background: "#fff",
                  borderRadius: 8,
                  padding: "1.5rem 2rem",
                  borderLeft: "3px solid var(--orange)",
                }}
              >
                <strong className="story-stat-value" style={{ display: "block", fontSize: "2.5rem", fontWeight: 800, color: "var(--navy)" }}>
                  {s.value}
                </strong>
                <span style={{ color: "var(--navy)", fontSize: "0.875rem" }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        <style>{`
          .story-stat-box {
            transition: transform .35s ease, box-shadow .35s ease, background .35s ease, border-left-color .35s ease;
            box-shadow: 0 2px 10px rgba(0,0,0,0.05);
            will-change: transform;
          }
          .story-stat-box:hover {
            transform: translateY(-8px) scale(1.02);
            box-shadow: 0 18px 36px rgba(0,0,0,0.18);
            background: linear-gradient(135deg, #ffffff 0%, #fff3ea 60%, #ffe8d9 100%);
            border-left-color: var(--navy);
          }
          .story-stat-value {
            display: inline-block;
            transition: color .35s ease, transform .35s ease;
          }
          .story-stat-box:hover .story-stat-value {
            color: var(--orange);
            transform: translateX(4px);
          }
        `}</style>
      </section>

      {/* Stats — cream */}
      <section style={{ background: "var(--cream)", padding: "3rem var(--section-px)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "2rem", textAlign: "center" }}>
          {[
            { value: "60+", label: "Policy Discussions" },
            { value: "1000+", label: "Young Leaders Trained" },
            { value: "40+", label: "Training Topics" },
            { value: "14", label: "Countries" },
            { value: "30+", label: "Partnerships" },
            { value: "100+", label: "NGOs Evaluated" },
          ].map((s) => (
            <div key={s.label}>
              <strong style={{ display: "block", fontSize: "2.5rem", fontWeight: 800, color: "var(--orange)" }}>
                {s.value}
              </strong>
              <span style={{ color: "var(--navy)", fontWeight: 600, fontSize: "0.875rem" }}>{s.label}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
