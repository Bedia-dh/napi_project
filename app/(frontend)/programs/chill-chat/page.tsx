import Link from "next/link";
import { ArrowLeft, Mail } from "lucide-react";
import VideoHoverLink from "@/components/ui/VideoHoverLink";
import { getPrograms } from "@/lib/payload/queries";
import { InteractiveHoverButton } from "@/components/ui/InteractiveHoverButton";

export const metadata = {
  title: "Chill-Chat - NAPI",
};

// See app/(frontend)/page.tsx for why this is set.
export const revalidate = 300;

const fallbackObjectives = [
  "Change representations and break the stigma and stereotypes.",
  "Evolve people in a democratic debate, by exchanging experiences and creating connections between different actors.",
  "Promote tolerance, openness, and pluralism.",
  "Enhance critical thought and freedom, promoting vigilance and lucidity.",
  "Develop the principles of listening and mutual respect that a debate requires.",
  "Promote citizenship and reduce dogmatism.",
];

const fallbackTopics = [
  "Youth and culture",
  "Youth and artivism",
  "Youth and migration",
  "Youth and education",
  "Youth and environment",
  "Youth and employment",
  "Youth and social justice",
  "Youth and climate action",
  "Youth and digital activism",
  "Youth and local governance",
  "Youth and civic engagement",
];

const fallbackGalleryPhotos = [
  "https://napipolicy.org/wp-content/uploads/2024/02/379465073_640617284868838_1147682275153398996_n.jpg",
  "https://napipolicy.org/wp-content/uploads/2024/02/387759223_651166563813910_4584524682583189327_n.jpg",
];

export default async function ChillChatPage() {
  const { programs, source } = await getPrograms();
  const program = programs.find((p) => p.id === "chill-chat");
  const stats = program?.stats?.length
    ? program.stats
    : [
        { label: "Sessions convened", value: "20+" },
        { label: "Planned with FES Libya (2023–24)", value: "15" },
        { label: "Launched", value: "2022" },
      ];

  // Deep content — editable in the CMS (Programs → Chill-Chat), falling back
  // to the copy built into this page if the CMS fields are empty.
  const objectives = program?.objectives?.length ? program.objectives : fallbackObjectives;
  const topics = program?.topics?.length ? program.topics : fallbackTopics;
  const galleryPhotos = program?.galleryPhotos?.length ? program.galleryPhotos : fallbackGalleryPhotos;

  return (
    <>
      {/* Header */}
      <section style={{ background: "var(--navy-dark)", padding: "64px var(--section-px) 56px" }}>
        <Link
          href="/programs"
          style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", color: "rgba(255,255,255,0.6)", fontSize: "0.82rem", fontWeight: 600, marginBottom: "1.75rem" }}
        >
          <ArrowLeft size={14} /> All Programs
        </Link>

        <p style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "var(--orange)", marginBottom: "0.75rem" }}>
          Ongoing Dialogue Series · Since 2022
        </p>
        <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", marginBottom: "1.25rem" }}>
          Chill-Chat
        </h1>
        <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.75, maxWidth: 660, marginBottom: "2.5rem" }}>
          {program?.description ??
            "An ongoing series launched in September 2022 that invites open discussions and coffee talks. Open to the public, with a particular focus on young people, each session creates a space where participants can freely share ideas and debate relevant topics, facilitated by young moderators, with a participatory approach that puts youth voices at the center."}
        </p>

        {process.env.NODE_ENV !== "production" && source === "static-fallback" && (
          <div style={{ marginBottom: "1.5rem", background: "rgba(255,255,255,.08)", border: "1px dashed rgba(255,255,255,.25)", borderRadius: 8, padding: "8px 14px", fontSize: "0.75rem", color: "rgba(255,255,255,.6)", maxWidth: 660 }}>
            Dev note: serving program stats from the static dataset - connect DATABASE_URI to query MongoDB via Payload instead.
          </div>
        )}

        <div style={{ display: "flex", gap: "3rem" }}>
          {stats.map((s) => (
            <div key={s.label}>
              <strong style={{ display: "block", fontSize: "2rem", fontWeight: 800, color: "#fff" }}>{s.value}</strong>
              <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.55)" }}>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Objectives + Topics */}
      <section style={{ background: "var(--cream)", padding: "72px var(--section-px)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem" }}>
          <div>
            <p style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "var(--orange)", marginBottom: "0.75rem" }}>
              Objectives
            </p>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--navy)", marginBottom: "1.5rem" }}>
              What Each Session Aims For
            </h2>
            <ul style={{ display: "flex", flexDirection: "column", gap: "0.9rem", listStyle: "none" }}>
              {objectives.map((o) => (
                <li key={o} style={{ display: "flex", gap: "0.75rem", fontSize: "0.9rem", color: "var(--navy)", lineHeight: 1.6 }}>
                  <span style={{ color: "var(--orange)", fontWeight: 800 }}>•</span>
                  {o}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "var(--orange)", marginBottom: "0.75rem" }}>
              Topics Covered
            </p>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--navy)", marginBottom: "1.5rem" }}>
              20+ Sessions So Far
            </h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem", marginBottom: "2rem" }}>
              {topics.map((t) => (
                <span
                  key={t}
                  style={{
                    background: "#fff",
                    border: "1px solid rgba(33,77,144,0.15)",
                    color: "var(--navy)",
                    fontSize: "0.82rem",
                    fontWeight: 600,
                    padding: "6px 14px",
                    borderRadius: 20,
                  }}
                >
                  {t}
                </span>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
              {galleryPhotos.map((src) => (
                <div
                  key={src}
                  style={{
                    aspectRatio: "4/3",
                    borderRadius: 10,
                    background: `var(--navy-mid) center / cover no-repeat url(${src})`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related — a real NAPI-MEI Roundtable, not a Chill-Chat recording itself */}
      <section style={{ background: "#fff", padding: "56px var(--section-px)" }}>
        <p style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "var(--orange)", marginBottom: "0.75rem" }}>
          Related Youth Dialogue
        </p>
        <h2 style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--navy)", marginBottom: "1.25rem", maxWidth: 520 }}>
          Watch a NAPI-MEI Roundtable on Youth Participation in Public Life
        </h2>
        <div style={{ maxWidth: 480 }}>
          <VideoHoverLink title="Youth Participation in Public Life in Morocco" youtubeId="9vu8nB73sGA" />
        </div>
        <p style={{ fontSize: "0.78rem", color: "var(--gray-mid)", marginTop: "0.9rem", maxWidth: 480 }}>
          Recorded as part of the NAPI-MEI Roundtables series, not a Chill-Chat session, shared here
          for its closely related theme.
        </p>
      </section>

      {/* CTA — lead a session */}
      <section style={{ background: "var(--cream)", borderTop: "3px solid var(--orange)", padding: "56px var(--section-px)", textAlign: "center" }}>
        <h2 style={{ fontSize: "1.6rem", fontWeight: 800, color: "var(--navy)", marginBottom: "0.75rem" }}>
          Want to lead a session?
        </h2>
        <p style={{ color: "var(--gray-mid)", fontSize: "0.95rem", marginBottom: "1.75rem", maxWidth: 560, marginLeft: "auto", marginRight: "auto" }}>
          Chill-Chat sessions are led by young people, for young people. If you have a topic you
          care about and want to host a conversation, reach out and we&apos;ll help you set it up.
        </p>
        <InteractiveHoverButton href="mailto:contact@napipolicy.org" variant="orange">
          <Mail size={16} /> Get in touch
        </InteractiveHoverButton>
      </section>
    </>
  );
}
