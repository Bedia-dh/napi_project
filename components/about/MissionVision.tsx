export default function MissionVision() {
  return (
    <section style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
      {/* Mission — navy */}
      <div style={{ background: "var(--navy)", padding: "56px var(--section-px)" }}>
        <p style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "var(--orange)", marginBottom: "1rem" }}>
          Our Mission
        </p>
        <h2 style={{ color: "#fff", fontSize: "1.75rem", fontWeight: 700, lineHeight: 1.3, marginBottom: "1.25rem", letterSpacing: "-0.02em" }}>
          Empower Youth to Shape Society and Governance
        </h2>
        <p style={{ color: "#fff", lineHeight: 1.8, fontSize: "0.95rem" }}>
          Strengthen participatory governance in the Mediterranean by empowering youth to drive
          civic and policy change.
        </p>
      </div>

      {/* Vision — cream */}
      <div style={{ background: "var(--cream)", padding: "56px var(--section-px)" }}>
        <p style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "var(--orange)", marginBottom: "1rem" }}>
          Our Vision
        </p>
        <h2 style={{ color: "var(--navy)", fontSize: "1.75rem", fontWeight: 700, lineHeight: 1.3, marginBottom: "1.25rem", letterSpacing: "-0.02em" }}>
          A Mediterranean Region Shaped by Youth Leadership
        </h2>
        <p style={{ color: "var(--gray-mid)", lineHeight: 1.8, fontSize: "0.95rem" }}>
          A strong local, national, and regional participatory and democratic governance through
          the active engagement of youth in public life.
        </p>
      </div>
    </section>
  );
}
