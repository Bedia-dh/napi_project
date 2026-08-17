import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getYouTubeId } from "@/lib/utils/youtube";
import VideoHoverLink from "@/components/ui/VideoHoverLink";
import { getRoundtableSeries, getPrograms } from "@/lib/payload/queries";
import { InteractiveHoverButton } from "@/components/ui/InteractiveHoverButton";

export const metadata = {
  title: "NAPI-MEI Roundtables - NAPI",
};

// See app/(frontend)/page.tsx for why this is set.
export const revalidate = 300;

export default async function MeiRoundtablesPage() {
  const [{ series: roundtableSeries, source }, { programs }] = await Promise.all([
    getRoundtableSeries(),
    getPrograms(),
  ]);

  const program = programs.find((p) => p.id === "mei-roundtables");
  const stats = program?.stats?.length
    ? program.stats
    : [
        { label: "Countries", value: "3" },
        { label: "Roundtables", value: "14+" },
        { label: "Since", value: "2021" },
      ];

  return (
    <>
      {/* Header */}
      <section style={{ background: "var(--navy-dark)", padding: "64px 80px 56px" }}>
        <Link
          href="/programs"
          style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", color: "rgba(255,255,255,0.6)", fontSize: "0.82rem", fontWeight: 600, marginBottom: "1.75rem" }}
        >
          <ArrowLeft size={14} /> All Programs
        </Link>

        <p style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "var(--orange)", marginBottom: "0.75rem" }}>
          In Partnership with the Middle East Institute
        </p>
        <h1 style={{ fontSize: "clamp(1.8rem, 3.6vw, 2.75rem)", fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", marginBottom: "1.25rem", maxWidth: 760 }}>
          NAPI-MEI Roundtables: North African Youth Perspectives
        </h1>
        <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.75, maxWidth: 660, marginBottom: "2.5rem" }}>
          {program?.description ??
            "With the Middle East Institute, NAPI has run roundtable series in Libya, Tunisia, and Morocco, an inclusive, participatory space for youth leaders to share their perspectives, insights, and recommendations on the policy issues facing their countries, from migration and social cohesion to the environment, gender, and education."}
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

      {/* Series by country */}
      <section style={{ background: "var(--cream)", padding: "72px 80px" }}>
        {process.env.NODE_ENV !== "production" && source === "static-fallback" && (
          <div style={{ marginBottom: "2rem", background: "#fff", border: "1px dashed var(--orange)", borderRadius: 8, padding: "8px 14px", fontSize: "0.78rem", color: "var(--gray-mid)" }}>
            Dev note: serving roundtables from the static dataset - connect DATABASE_URI to query MongoDB via Payload instead.
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
          {roundtableSeries.map((series) => (
            <div key={series.country}>
              <div style={{ display: "flex", alignItems: "baseline", gap: "0.9rem", marginBottom: "0.75rem" }}>
                <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--navy)" }}>{series.country}</h2>
                <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--orange)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  {series.period}
                </span>
              </div>
              <p style={{ fontSize: "0.92rem", color: "var(--gray-mid)", lineHeight: 1.7, maxWidth: 720, marginBottom: "1.5rem" }}>
                {series.intro}
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {series.roundtables.map((rt) => {
                  const youtubeId = getYouTubeId(rt.url);
                  if (youtubeId) {
                    return <VideoHoverLink key={rt.title} title={rt.title} youtubeId={youtubeId} />;
                  }
                  return (
                    <a
                      key={rt.title}
                      href={rt.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "1rem",
                        background: "#fff",
                        borderRadius: 8,
                        padding: "0.95rem 1.25rem",
                        border: "1px solid rgba(33,77,144,0.1)",
                        color: "var(--navy)",
                      }}
                    >
                      <span style={{ fontSize: "0.9rem", fontWeight: 600, lineHeight: 1.4 }}>{rt.title}</span>
                      <ArrowUpRight size={16} color="var(--orange)" style={{ flexShrink: 0 }} />
                    </a>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "#fff", borderTop: "3px solid var(--orange)", padding: "56px 80px", textAlign: "center" }}>
        <h2 style={{ fontSize: "1.6rem", fontWeight: 800, color: "var(--navy)", marginBottom: "0.75rem" }}>
          Follow the conversation
        </h2>
        <p style={{ color: "var(--gray-mid)", fontSize: "0.95rem", marginBottom: "1.75rem", maxWidth: 560, marginLeft: "auto", marginRight: "auto" }}>
          New NAPI-MEI Roundtables are announced throughout the year. Watch past sessions on
          YouTube or reach out to suggest a topic for a future roundtable.
        </p>
        <InteractiveHoverButton href="/contact" variant="orange">
          Contact us <ArrowUpRight size={16} />
        </InteractiveHoverButton>
      </section>
    </>
  );
}
