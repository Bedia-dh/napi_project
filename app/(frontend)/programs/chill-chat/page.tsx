import Link from "next/link";
import { ArrowLeft, Mail } from "lucide-react";
import VideoHoverLink from "@/components/ui/VideoHoverLink";
import { getPrograms } from "@/lib/payload/queries";
import { InteractiveHoverButton } from "@/components/ui/InteractiveHoverButton";

export const metadata = {
  title: "Chill-Chat - NAPI",
  description:
    "An informal, safe, and participatory space where young people exchange perspectives, challenge stereotypes, and engage in democratic dialogue.",
};

export const revalidate = 300;

const fallbackObjectives = [
  "Challenge representations, stigma, and stereotypes.",
  "Encourage democratic dialogue through the exchange of experiences and perspectives.",
  "Promote tolerance, openness, and pluralism.",
  "Strengthen critical thinking and freedom of thought.",
  "Develop listening, dialogue, and mutual respect.",
  "Build connections between young people from different backgrounds and sectors.",
  "Encourage active citizenship and reduce dogmatism.",
  "Create space for young people to propose solutions to challenges affecting their communities.",
];

const fallbackTopics = [
  "Youth & Culture",
  "Youth & Artivism",
  "Youth & Migration",
  "Youth & Education",
  "Youth & Environment",
  "Youth & Employment",
  "Youth & Social Justice",
  "Youth & Climate Action",
  "Youth & Digital Activism",
  "Youth & Local Governance",
  "Youth & Civic Engagement",
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
        { label: "Sessions hosted", value: "28" },
        { label: "Youth reached", value: "300+" },
        { label: "Since", value: "2022" },
      ];

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
          Series of Informal Policy Discussions by Youth, for Youth
        </p>
        <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", marginBottom: "1.25rem" }}>
          Chill-Chat
        </h1>
        <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.75, maxWidth: 720, marginBottom: "2.5rem" }}>
          {program?.description ??
            "Since 2022, Chill-Chat came to life with the objective of creating an informal, safe, and participatory space where young people can exchange perspectives, challenge stereotypes, engage in democratic dialogue, and collectively reflect on issues affecting their communities and countries."}
        </p>

        {process.env.NODE_ENV !== "production" && source === "static-fallback" && (
          <div style={{ marginBottom: "1.5rem", background: "rgba(255,255,255,.08)", border: "1px dashed rgba(255,255,255,.25)", borderRadius: 8, padding: "8px 14px", fontSize: "0.75rem", color: "rgba(255,255,255,.6)", maxWidth: 660 }}>
            Dev note: serving program stats from the static dataset.
          </div>
        )}

        <div style={{ display: "flex", gap: "3rem", flexWrap: "wrap" }}>
          {stats.map((s) => (
            <div key={s.label}>
              <strong style={{ display: "block", fontSize: "2rem", fontWeight: 800, color: "#fff" }}>{s.value}</strong>
              <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.55)" }}>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* About / Format */}
      <section style={{ background: "#fff", padding: "56px var(--section-px)" }}>
        <div style={{ maxWidth: 800 }}>
          <p style={{ fontSize: "0.95rem", color: "var(--navy)", lineHeight: 1.8, marginBottom: "1.25rem" }}>
            Developed during an internship at NAPI, Chill-Chat takes the form of regular informal coffee talks,
            usually held once or twice a month. Each session brings together around 15–20 young people from
            different disciplines, backgrounds, age groups, and countries of origin to discuss policy and social
            issues that matter to them.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--navy)", lineHeight: 1.8, marginBottom: "1.25rem" }}>
            Rather than following a traditional panel or conference format, Chill-Chat is designed around
            conversation, participation, and peer learning. Participants are encouraged to share experiences,
            question assumptions, listen to different perspectives, and move beyond identifying challenges by
            proposing ideas and practical solutions.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--navy)", lineHeight: 1.8 }}>
            At the heart of the initiative is its youth-led and peer-led approach. Young participants who
            demonstrate strong knowledge, engagement, or facilitation skills are often encouraged to lead future
            sessions themselves, allowing participants to gradually become facilitators and contributors to the
            growth of the community.
          </p>
        </div>
      </section>

      {/* Objectives + Topics */}
      <section style={{ background: "var(--cream)", padding: "72px var(--section-px)" }}>
        <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem" }}>
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
              Topics Explored
            </p>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--navy)", marginBottom: "1rem" }}>
              Across 28 Sessions
            </h2>
            <p style={{ fontSize: "0.88rem", color: "var(--gray-mid)", lineHeight: 1.7, marginBottom: "1.25rem" }}>
              The topics are shaped by the interests and concerns of young people themselves, allowing
              Chill-Chat to remain flexible, relevant, and responsive to its community.
            </p>
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

      {/* Community-Based Approach */}
      <section style={{ background: "#fff", padding: "56px var(--section-px)" }}>
        <div style={{ maxWidth: 800 }}>
          <p style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "var(--orange)", marginBottom: "0.75rem" }}>
            A Community-Based Approach
          </p>
          <h2 style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--navy)", marginBottom: "1.25rem" }}>
            More Than a Conversation
          </h2>
          <p style={{ fontSize: "0.95rem", color: "var(--navy)", lineHeight: 1.8, marginBottom: "1.25rem" }}>
            Over the years, Chill-Chat has collaborated with and been hosted by a variety of universities,
            cultural spaces, institutions, guesthouses, and civil society organizations, including Université
            Centrale, Espace Carmen, Theatro Piccolo, Friedrich-Ebert-Stiftung, Dar Ben Gacem, and Jamaity.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--navy)", lineHeight: 1.8, marginBottom: "1.25rem" }}>
            From 2023 to the end of 2024, NAPI also partnered with Friedrich-Ebert-Stiftung Libya around a
            programme of 15 Chill-Chat events, building on previous collaborations initiated in 2022.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--navy)", lineHeight: 1.8 }}>
            Chill-Chat is built around voluntary participation, flexibility, co-creation, and youth leadership.
            Young people are not simply invited to attend — they can propose topics, contribute to the development
            of sessions and workshops, share their expertise and experiences, and eventually take on facilitation
            roles themselves.
          </p>
        </div>
      </section>

      {/* Related — a real NAPI-MEI Roundtable */}
      <section style={{ background: "var(--cream)", padding: "56px var(--section-px)" }}>
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
          Recorded as part of the NAPI-MEI Roundtables series, shared here for its closely related theme.
        </p>
      </section>

      {/* CTA — lead a session */}
      <section style={{ background: "#fff", borderTop: "3px solid var(--orange)", padding: "56px var(--section-px)", textAlign: "center" }}>
        <h2 style={{ fontSize: "1.6rem", fontWeight: 800, color: "var(--navy)", marginBottom: "0.75rem" }}>
          Want to Lead a Chill-Chat?
        </h2>
        <p style={{ color: "var(--gray-mid)", fontSize: "0.95rem", marginBottom: "1.75rem", maxWidth: 620, marginLeft: "auto", marginRight: "auto" }}>
          Have a topic, policy issue, area of expertise, or lived experience that you would like to bring
          into a conversation? Chill-Chat welcomes young people interested in leading and co-creating future
          discussions. We provide the space and support to help turn your idea into an inclusive and
          participatory session.
        </p>
        <InteractiveHoverButton href="mailto:elrhdioui.rachida@gmail.com" variant="orange">
          <Mail size={16} /> Get in touch
        </InteractiveHoverButton>
      </section>
    </>
  );
}
