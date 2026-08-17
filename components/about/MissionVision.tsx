export default function MissionVision() {
  return (
    <section style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
      {/* Mission — navy */}
      <div style={{ background: "var(--navy)", padding: "56px 80px" }}>
        <p style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "var(--orange)", marginBottom: "1rem" }}>
          Our Mission
        </p>
        <h2 style={{ color: "#ffff", fontSize: "1.75rem", fontWeight: 700, lineHeight: 1.3, marginBottom: "1.25rem", letterSpacing: "-0.02em" }}>
          Equipping Young Minds with Policy Tools
        </h2>
        <p style={{ color: "#ffff", lineHeight: 1.8, fontSize: "0.95rem" }}>
          To produce rigorous, independent policy research and build the analytical and advocacy
          skills of young North Africans so they can effectively participate in shaping the
          region&apos;s future.
        </p>
      </div>

      {/* Vision — cream */}
      <div style={{ background: "var(--cream)", padding: "56px 80px" }}>
        <p style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "var(--orange)", marginBottom: "1rem" }}>
          Our Vision
        </p>
        <h2 style={{ color: "var(--navy)", fontSize: "1.75rem", fontWeight: 700, lineHeight: 1.3, marginBottom: "1.25rem", letterSpacing: "-0.02em" }}>
          A North Africa Shaped by Youth Leadership
        </h2>
        <p style={{ color: "var(--gray-mid)", lineHeight: 1.8, fontSize: "0.95rem" }}>
          A region where every young person has the knowledge, platform, and opportunity to
          contribute evidence-based solutions to the challenges that define their generation.
        </p>
      </div>
    </section>
  );
}
