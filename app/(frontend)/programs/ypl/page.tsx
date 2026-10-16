import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Play, FileText, Download } from "lucide-react";
import { getYplFellows, getPrograms } from "@/lib/payload/queries";
import { InteractiveHoverButton } from "@/components/ui/InteractiveHoverButton";

export const metadata = {
  title: "Young Policy Leaders - NAPI",
  description:
    "A nine-month capacity-building and mentorship program for young people passionate about understanding and addressing public policy challenges.",
};

export const revalidate = 300;

const COHORT_PUBLICATION_PREVIEW =
  "https://drive.google.com/file/d/1JfaMtWmwiyb12GGof5V0sNtdt_GTFQiv/view?usp=drive_link";

export default async function YPLPage() {
  const [{ fellows, source: fellowsSource }, { programs }] = await Promise.all([
    getYplFellows(),
    getPrograms(),
  ]);

  const program = programs.find((p) => p.id === "ypl");
  const stats = program?.stats?.length
    ? program.stats
    : [
        { label: "Policy papers", value: "35" },
        { label: "Cohort size", value: "12–25" },
        { label: "Program length", value: "9 mo." },
      ];

  const libyaFellows = fellows.filter((f) => f.cohort === 2021);
  const tunisiaFellows = fellows.filter((f) => f.cohort === 2025);

  return (
    <>
      {/* Header */}
      <section style={{ background: "var(--navy-dark)", padding: "64px var(--section-px) 56px" }}>
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
          Leadership
        </p>
        <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", marginBottom: "1.25rem", maxWidth: 720 }}>
          Young Policy Leaders
        </h1>
        <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.75, maxWidth: 720, marginBottom: "1rem" }}>
          {program?.description ??
            "The Young Policy Leaders (YPL) is a nine-month capacity-building and mentorship program designed for young people who are passionate about understanding and addressing public policy challenges in their community and beyond."}
        </p>

        <div style={{ display: "flex", gap: "3rem", marginTop: "2rem", flexWrap: "wrap" }}>
          {stats.map((s) => (
            <div key={s.label}>
              <strong style={{ display: "block", fontSize: "2rem", fontWeight: 800, color: "#fff" }}>{s.value}</strong>
              <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.55)" }}>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Program description */}
      <section style={{ background: "#fff", padding: "56px var(--section-px)" }}>
        <div style={{ maxWidth: 800 }}>
          <p style={{ fontSize: "0.95rem", color: "var(--navy)", lineHeight: 1.8, marginBottom: "1.25rem" }}>
            Through a combination of training, research, tailored mentorship, peer learning, and writing,
            participants strengthen their ability to identify policy problems, conduct rigorous research,
            develop evidence-based recommendations, and communicate their ideas effectively.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--navy)", lineHeight: 1.8, marginBottom: "1.25rem" }}>
            YPL aims to contribute to a new generation of North African policy leaders who can bring youth
            perspectives, local knowledge, and evidence-based solutions into public policy conversations.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--navy)", lineHeight: 1.8, marginBottom: "1.25rem" }}>
            Throughout the program, fellows develop their own policy research around an issue they care about,
            culminating in a Policy Briefing Paper presenting their analysis and recommendations.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--navy)", lineHeight: 1.8 }}>
            Where most youth capacity-building programs stop at skills and knowledge, YPL goes further —
            equipping young people to translate ideas into concrete action and real-world impact. In turn,
            the success of young leaders becomes an invitation: the proof to other young people that meaningful
            civic and policy engagement is achievable.
          </p>
        </div>
      </section>

      {/* Explore the YPL Cohorts intro */}
      <section style={{ background: "var(--cream)", padding: "56px var(--section-px) 0" }}>
        <div style={{ textAlign: "center", maxWidth: 720, margin: "0 auto", paddingBottom: "2.5rem" }}>
          <p style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "var(--orange)", marginBottom: "0.75rem" }}>
            Explore the YPL Cohorts
          </p>
          <h2 style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)", fontWeight: 800, color: "var(--navy)", letterSpacing: "-0.02em", marginBottom: "1rem" }}>
            Emerging Researchers, Local Challenges, Policy Solutions
          </h2>
          <p style={{ fontSize: "0.95rem", color: "var(--gray-mid)", lineHeight: 1.7 }}>
            The Young Policy Leaders program has brought together emerging researchers, practitioners, civil
            society actors, and young professionals addressing public policy challenges in their respective countries.
          </p>
        </div>
      </section>

      {/* ──── Libya Cohort 2021 ──── */}
      <section style={{ background: "var(--cream)", padding: "0 var(--section-px) 56px" }}>
        <div style={{ marginBottom: "2rem" }}>
          <h2 style={{ fontSize: "1.6rem", fontWeight: 800, color: "var(--navy)", marginBottom: "0.25rem" }}>
            Libya Cohort · 2021
          </h2>
        </div>

        {/* YouTube Video */}
        <div style={{ marginBottom: "2.5rem", maxWidth: 960 }}>
          <div
            style={{
              position: "relative",
              paddingBottom: "56.25%",
              height: 0,
              borderRadius: 12,
              overflow: "hidden",
              boxShadow: "0 4px 24px rgba(0,0,0,.12)",
            }}
          >
            <iframe
              src="https://www.youtube.com/embed/hkGtuDgYox8"
              title="YPL Libya Cohort 2021"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                border: "none",
              }}
            />
          </div>
        </div>

        <div style={{ marginBottom: "2rem" }}>
          <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--navy)", marginBottom: "0.75rem" }}>
            Nine Fellows, Nine Policy Perspectives
          </h3>
          <p style={{ fontSize: "0.92rem", color: "var(--gray-mid)", lineHeight: 1.7, maxWidth: 720, marginBottom: "0.5rem" }}>
            The 2021 Young Policy Leaders cohort in Libya brought together nine young professionals,
            researchers, and civil society actors working across a diverse range of fields.
          </p>
          <p style={{ fontSize: "0.92rem", color: "var(--gray-mid)", lineHeight: 1.7, maxWidth: 720 }}>
            Over the course of the program, fellows explored policy challenges connected to health,
            migration, education, social cohesion, economic development, agriculture, cultural heritage,
            environmental education, security, and governance.
          </p>
        </div>

        {process.env.NODE_ENV !== "production" && fellowsSource === "static-fallback" && (
          <div style={{ marginBottom: "1.5rem", background: "#fff", border: "1px dashed var(--orange)", borderRadius: 8, padding: "8px 14px", fontSize: "0.78rem", color: "var(--gray-mid)" }}>
            Dev note: serving fellows from the static dataset.
          </div>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}>
          {libyaFellows.map((fellow) => (
            <FellowCard key={fellow.id} fellow={fellow} />
          ))}
        </div>
      </section>

      {/* ──── Tunisia Cohort 2025 ──── */}
      <section style={{ background: "#fff", padding: "56px var(--section-px)" }}>
        <div style={{ marginBottom: "2rem" }}>
          <h2 style={{ fontSize: "1.6rem", fontWeight: 800, color: "var(--navy)", marginBottom: "0.25rem" }}>
            Tunisia Cohort · 2025
          </h2>
        </div>

        <div style={{ marginBottom: "2.5rem" }}>
          <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--navy)", marginBottom: "0.75rem" }}>
            Young Researchers, Local Challenges, Policy Solutions
          </h3>
          <p style={{ fontSize: "0.92rem", color: "var(--gray-mid)", lineHeight: 1.7, maxWidth: 720, marginBottom: "0.5rem" }}>
            The 2025 Young Policy Leaders cohort in Tunisia brought together young researchers, practitioners,
            activists, and emerging policy professionals working on some of the country&apos;s most pressing
            social, economic, environmental, educational, health, and governance challenges.
          </p>
          <p style={{ fontSize: "0.92rem", color: "var(--gray-mid)", lineHeight: 1.7, maxWidth: 720 }}>
            From labour rights and mental health to water governance, civic education, environmental education,
            cultural industries, school violence, social protection, and youth health — the cohort reflects
            the diversity of challenges facing Tunisia while placing youth expertise, local knowledge, and
            solution-oriented thinking at the heart of policy conversations.
          </p>
        </div>

        {/* Cohort Publication */}
        <div
          style={{
            background: "var(--cream)",
            borderRadius: 12,
            padding: "2rem",
            display: "flex",
            gap: "1.5rem",
            alignItems: "center",
            marginBottom: "2.5rem",
            border: "1px solid rgba(33,77,144,0.1)",
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 12,
              background: "color-mix(in srgb, var(--orange) 12%, white)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <FileText size={28} color="var(--orange)" />
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "var(--orange)", marginBottom: "0.35rem" }}>
              Cohort Publication
            </p>
            <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--navy)", marginBottom: "0.5rem" }}>
              Tunisia 2025 — Policy Briefing Papers
            </h4>
            <p style={{ fontSize: "0.85rem", color: "var(--gray-mid)", lineHeight: 1.6, marginBottom: "1rem" }}>
              The policy papers developed by the Tunisia cohort are brought together in a single multilingual
              publication available in English, French, and Arabic.
            </p>
            <a
              href={COHORT_PUBLICATION_PREVIEW}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                color: "var(--orange)",
                fontWeight: 700,
                fontSize: "0.85rem",
              }}
            >
              <Download size={14} /> Preview Publication
            </a>
          </div>
        </div>

        <p style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "var(--orange)", marginBottom: "1.5rem" }}>
          Meet the 2025 Fellows
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}>
          {tunisiaFellows.map((fellow) => (
            <FellowCard key={fellow.id} fellow={fellow} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "var(--cream)", borderTop: "3px solid var(--orange)", padding: "56px var(--section-px)", textAlign: "center" }}>
        <h2 style={{ fontSize: "1.6rem", fontWeight: 800, color: "var(--navy)", marginBottom: "0.75rem" }}>
          Want to Become a Young Policy Leader?
        </h2>
        <p style={{ color: "var(--gray-mid)", fontSize: "0.95rem", marginBottom: "0.75rem", maxWidth: 620, marginLeft: "auto", marginRight: "auto" }}>
          Interested in research, public policy, and developing solutions to challenges affecting your community?
        </p>
        <p style={{ color: "var(--gray-mid)", fontSize: "0.95rem", marginBottom: "1.75rem", maxWidth: 620, marginLeft: "auto", marginRight: "auto" }}>
          Calls for future Young Policy Leaders cohorts are announced through NAPI&apos;s communication channels.
          Follow NAPI for future applications, opportunities, and program updates.
        </p>
        <InteractiveHoverButton href="/contact" variant="orange">
          Contact us <ArrowUpRight size={16} />
        </InteractiveHoverButton>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .ypl-fellows-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 560px) {
          .ypl-fellows-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}

function FellowCard({ fellow }: { fellow: { id: string; name: string; bio: string; policyIssue: string; photoUrl?: string; paperUrl?: string; keywords?: string[] } }) {
  return (
    <div
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
        border: "1px solid rgba(33,77,144,0.06)",
      }}
    >
      {fellow.photoUrl && (
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
      )}
      {!fellow.photoUrl && (
        <div
          style={{
            width: 128,
            height: 128,
            borderRadius: "50%",
            overflow: "hidden",
            flexShrink: 0,
            marginBottom: "1.1rem",
            background: "color-mix(in srgb, var(--navy) 8%, white)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "2.5rem",
            fontWeight: 800,
            color: "var(--navy)",
            boxShadow: "0 0 0 4px var(--cream), 0 6px 16px rgba(13,30,61,.14)",
          }}
        >
          {fellow.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", flex: 1, width: "100%" }}>
        <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--navy)" }}>{fellow.name}</h3>
        <p style={{ fontSize: "0.82rem", color: "var(--gray-mid)", lineHeight: 1.6 }}>{fellow.bio}</p>
        <p style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--navy)", lineHeight: 1.5, marginTop: "0.25rem" }}>
          {fellow.policyIssue}
        </p>
        {fellow.keywords && fellow.keywords.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem", justifyContent: "center", marginTop: "0.5rem" }}>
            {fellow.keywords.slice(0, 4).map((kw) => (
              <span key={kw} style={{ fontSize: "0.68rem", color: "var(--gray-mid)", background: "var(--cream)", padding: "2px 8px", borderRadius: 10 }}>
                {kw}
              </span>
            ))}
          </div>
        )}
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
            Download Policy Brief <ArrowUpRight size={13} />
          </a>
        )}
      </div>
    </div>
  );
}
