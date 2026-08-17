import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Users, Share2, PenLine, EyeOff } from "lucide-react";
import { getPrograms } from "@/lib/payload/queries";
import { InteractiveHoverButton } from "@/components/ui/InteractiveHoverButton";

export const metadata = {
  title: "Youth Voices - NAPI",
};

// See app/(frontend)/page.tsx for why this is set.
export const revalidate = 300;

const FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSezSIAGC5By2EQjvjcokmU_E9xGiBBELtSy6X8WYsQjk-9hIg/viewform";

const fallbackEligibility = [
  "Age between 15 and 35.",
  "Resident of North Africa, or a citizen of a North African country.",
  "Writing is published under your name - a pseudonym may be considered case-by-case.",
  "Submissions accepted in Arabic, English, or French.",
  "The writing must address a policy issue relevant to the region.",
  "The writing must be original, evidence-driven, and include links to sources quoted.",
];

const offerings = [
  { Icon: PenLine, text: "Mentorship and guidance on research and writing in English, French, or Arabic" },
  { Icon: Share2, text: "Expand your network of contacts" },
  { Icon: Users, text: "Support to publish your writing" },
  { Icon: EyeOff, text: "Option to publish anonymously on a relevant policy issue" },
];

export default async function YouthVoicesPage() {
  const { programs, source } = await getPrograms();
  const program = programs.find((p) => p.id === "youth-voices");

  // Deep content — editable in the CMS (Programs → Youth Voices), falling
  // back to the copy built into this page if the CMS fields are empty.
  const eligibility = program?.eligibility?.length ? program.eligibility : fallbackEligibility;
  const objectives = program?.objectives?.length
    ? program.objectives
    : [
        "Build the capacity of youth to write and publish.",
        "Share youth perspectives with a broader audience.",
        "Foster youth participation in public life.",
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
          Rolling Publishing Platform
        </p>
        <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", marginBottom: "1.25rem" }}>
          Youth Voices
        </h1>
        <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.75, maxWidth: 660, marginBottom: "2rem" }}>
          {program?.description ??
            "A project designed to support young people who want to write and publish on anything policy-relevant in the Mediterranean and North Africa. Submit an idea any time, with no obligation of a complete draft, and receive tailored support until it's published as a blogpost, op-ed, article, report, or academic piece."}
        </p>

        {process.env.NODE_ENV !== "production" && source === "static-fallback" && (
          <div style={{ marginBottom: "1.5rem", background: "rgba(255,255,255,.08)", border: "1px dashed rgba(255,255,255,.25)", borderRadius: 8, padding: "8px 14px", fontSize: "0.75rem", color: "rgba(255,255,255,.6)", maxWidth: 660 }}>
            Dev note: serving program description from the static dataset - connect DATABASE_URI to query MongoDB via Payload instead.
          </div>
        )}

        <InteractiveHoverButton href={FORM_URL} target="_blank" rel="noopener noreferrer" variant="orange">
          Submit Your Work <ArrowUpRight size={16} />
        </InteractiveHoverButton>
      </section>

      {/* Offerings */}
      <section style={{ background: "var(--cream)", padding: "72px 80px" }}>
        <div style={{ marginBottom: "2.5rem" }}>
          <p style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "var(--orange)", marginBottom: "0.75rem" }}>
            What the Program Offers
          </p>
          <h2 style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)", fontWeight: 800, color: "var(--navy)", letterSpacing: "-0.02em" }}>
            Support from Idea to Publication
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.25rem", marginBottom: "3.5rem" }}>
          {offerings.map(({ Icon, text }) => (
            <div key={text} style={{ background: "#fff", borderRadius: 10, padding: "1.75rem 1.5rem", borderTop: "3px solid var(--orange)" }}>
              <Icon size={24} color="var(--navy)" style={{ marginBottom: "0.9rem" }} />
              <p style={{ fontSize: "0.88rem", color: "var(--navy)", lineHeight: 1.6, fontWeight: 600 }}>{text}</p>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem" }}>
          <div>
            <p style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "var(--orange)", marginBottom: "0.75rem" }}>
              Eligibility
            </p>
            <ul style={{ display: "flex", flexDirection: "column", gap: "0.85rem", listStyle: "none" }}>
              {eligibility.map((e) => (
                <li key={e} style={{ display: "flex", gap: "0.75rem", fontSize: "0.9rem", color: "var(--navy)", lineHeight: 1.6 }}>
                  <span style={{ color: "var(--orange)", fontWeight: 800 }}>•</span>
                  {e}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "var(--orange)", marginBottom: "0.75rem" }}>
              Our Objectives
            </p>
            <ul style={{ display: "flex", flexDirection: "column", gap: "0.85rem", listStyle: "none", marginBottom: "1.75rem" }}>
              {objectives.map((o) => (
                <li key={o} style={{ display: "flex", gap: "0.75rem", fontSize: "0.9rem", color: "var(--navy)", lineHeight: 1.6 }}>
                  <span style={{ color: "var(--orange)", fontWeight: 800 }}>•</span>
                  {o}
                </li>
              ))}
            </ul>
            <p style={{ fontSize: "0.78rem", color: "var(--gray-mid)", lineHeight: 1.7, fontStyle: "italic" }}>
              Please note: accepting and sharing your work does not imply that NAPI endorses your
              opinion or argument. Our support centers on the writing and publishing process itself.
              Publication does not reflect NAPI&apos;s perspective on the content.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "#fff", borderTop: "3px solid var(--orange)", padding: "56px 80px", textAlign: "center" }}>
        <h2 style={{ fontSize: "1.6rem", fontWeight: 800, color: "var(--navy)", marginBottom: "0.75rem" }}>
          Have something to say?
        </h2>
        <p style={{ color: "var(--gray-mid)", fontSize: "0.95rem", marginBottom: "1.75rem", maxWidth: 560, marginLeft: "auto", marginRight: "auto" }}>
          Youth Voices accepts submissions on a rolling basis in Arabic, English, or French. Share
          your perspective on a policy issue that matters to North Africa.
        </p>
        <InteractiveHoverButton href={FORM_URL} target="_blank" rel="noopener noreferrer" variant="orange">
          Submit your writing <ArrowUpRight size={16} />
        </InteractiveHoverButton>
      </section>
    </>
  );
}
