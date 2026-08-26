import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getYplFellows, getPrograms } from "@/lib/payload/queries";
import { InteractiveHoverButton } from "@/components/ui/InteractiveHoverButton";

export const metadata = {
  title: "Young Policy Leaders - NAPI",
};

// See app/(frontend)/page.tsx for why this is set.
export const revalidate = 300;

export default async function YPLPage() {
  const [{ fellows, source: fellowsSource }, { programs }] = await Promise.all([
    getYplFellows(),
    getPrograms(),
  ]);

  const program = programs.find((p) => p.id === "ypl");
  const stats = program?.stats?.length
    ? program.stats
    : [
        { label: "Fellows - 2021 cohort", value: "9" },
        { label: "Policy papers", value: "9" },
        { label: "Program length", value: "9 mo." },
      ];

  return (
    <>
      {/* Header */}
      <section style={{ background: "var(--navy-dark)", padding: "64px 80px 56px" }}>
        <Link
          href="/programs"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            color: "rgba(255,255,255,0.6)",
            fontSize: "0.82rem",
            fontWeight: 600,
            marginBottom: "1.75rem",
          }}
        >
          <ArrowLeft size={14} /> All Programs
        </Link>

        <p style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "var(--orange)", marginBottom: "0.75rem" }}>
          Fellowship Program
        </p>
        <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", marginBottom: "1.25rem", maxWidth: 720 }}>
          Young Policy Leaders
        </h1>
        <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.75, maxWidth: 640, marginBottom: "2.5rem" }}>
          {program?.description ??
            "A 9-month program that builds the research, writing, and advocacy capacity of youth passionate about tackling a public issue. NAPI provides training, tailored mentorship, and cross-national networks to help fellows become policy leaders who carry out rigorous research and convey evidence-based policy advice effectively."}
        </p>

        <div style={{ display: "flex", gap: "3rem" }}>
          {stats.map((s) => (
            <div key={s.label}>
              <strong style={{ display: "block", fontSize: "2rem", fontWeight: 800, color: "#fff" }}>{s.value}</strong>
              <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.55)" }}>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Cohort grid */}
      <section style={{ background: "var(--cream)", padding: "72px 80px" }}>
        <div style={{ marginBottom: "2.5rem" }}>
          <p style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "var(--orange)", marginBottom: "0.75rem" }}>
            Cohort 2021
          </p>
          <h2 style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)", fontWeight: 800, color: "var(--navy)", letterSpacing: "-0.02em" }}>
            Nine Fellows, Nine Policy Papers
          </h2>
        </div>

        {process.env.NODE_ENV !== "production" && fellowsSource === "static-fallback" && (
          <div style={{ marginBottom: "1.5rem", background: "#fff", border: "1px dashed var(--orange)", borderRadius: 8, padding: "8px 14px", fontSize: "0.78rem", color: "var(--gray-mid)" }}>
            Dev note: serving fellows from the static dataset - connect DATABASE_URI to query MongoDB via Payload instead.
          </div>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}>
          {fellows.map((fellow) => (
            <div
              key={fellow.id}
              className="program-card"
              style={{
                background: "#fff",
                borderRadius: 12,
                overflow: "hidden",
                boxShadow: "0 2px 12px rgba(0,0,0,.08)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                padding: "2.25rem 1.5rem 1.75rem",
              }}
            >
              {/* Round profile picture — the full photo is shown (object-fit: cover
                  on a square source, centered) rather than a wide cropped banner. */}
              <div
                style={{
                  width: 128,
                  height: 128,
                  borderRadius: "50%",
                  overflow: "hidden",
                  flexShrink: 0,
                  marginBottom: "1.1rem",
                  boxShadow: "0 0 0 4px var(--cream), 0 6px 16px rgba(13,30,61,.14)",
                  background: "var(--navy-mid)",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    background: `center / cover no-repeat url(${fellow.photoUrl})`,
                  }}
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", flex: 1, width: "100%" }}>
                <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--navy)" }}>{fellow.name}</h3>
                <p style={{ fontSize: "0.82rem", color: "var(--gray-mid)", lineHeight: 1.6 }}>{fellow.bio}</p>
                <p style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--navy)", lineHeight: 1.5, marginTop: "0.25rem" }}>
                  {fellow.policyIssue}
                </p>
                {fellow.paperUrl && (
                  <a
                    href={fellow.paperUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      marginTop: "auto",
                      paddingTop: "0.75rem",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.3rem",
                      color: "var(--orange)",
                      fontWeight: 700,
                      fontSize: "0.8rem",
                    }}
                  >
                    Download Policy Paper <ArrowUpRight size={13} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "#fff", borderTop: "3px solid var(--orange)", padding: "56px 80px", textAlign: "center" }}>
        <h2 style={{ fontSize: "1.6rem", fontWeight: 800, color: "var(--navy)", marginBottom: "0.75rem" }}>
          Want to become a Young Policy Leader?
        </h2>
        <p style={{ color: "var(--gray-mid)", fontSize: "0.95rem", marginBottom: "1.75rem", maxWidth: 560, marginLeft: "auto", marginRight: "auto" }}>
          Applications open ahead of each new cohort. Follow NAPI&apos;s announcements or get in
          touch to hear when the next call for applications goes live.
        </p>
        <InteractiveHoverButton href="/contact" variant="orange">
          Contact us <ArrowUpRight size={16} />
        </InteractiveHoverButton>
      </section>
    </>
  );
}
