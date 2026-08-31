import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getPrograms } from "@/lib/payload/queries";
import { ogMeta, SITE_URL } from "@/lib/seo";

/**
 * Generic detail page for programs created in the CMS.
 *
 * The four flagship programs (ypl, chill-chat, youth-voices,
 * mei-roundtables, policy-labs) each have their own hand-built page in
 * sibling folders — Next.js always prefers a static route over this
 * dynamic one, so those pages are unaffected. Any OTHER slug created in
 * the dashboard used to 404 because no page existed for it; now it lands
 * here and renders from the same CMS fields the flagship pages use
 * (tagline, description, stats, objectives, topics, eligibility, gallery).
 */

type Params = { slug: string };

// Route params can arrive percent-encoded (e.g. "test%C3%A7_name" for
// "testç_name"), so decode before matching against CMS slugs.
function findProgram<T extends { id: string }>(programs: T[], slug: string): T | undefined {
  let decoded = slug;
  try {
    decoded = decodeURIComponent(slug);
  } catch {
    // malformed encoding — fall back to the raw value
  }
  return programs.find((p) => p.id === decoded || p.id === slug);
}

/**
 * Pre-render all known program slugs at build time.
 * This means /programs/ypl, /programs/chill-chat etc. are generated as
 * static HTML during `next build`, giving faster TTFB and guaranteed
 * crawlability by search engines.
 */
export async function generateStaticParams(): Promise<Params[]> {
  const { programs } = await getPrograms();
  return programs.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const { programs } = await getPrograms();
  const program = findProgram(programs, slug);

  if (!program) {
    return { title: "Program Not Found" };
  }

  const title = program.name;
  const description = program.description
    ? `${program.description.slice(0, 155)}…`
    : `Learn about ${program.name} — a NAPI program empowering youth across North Africa.`;

  return {
    title,
    description,
    ...ogMeta({
      title,
      description,
      path: `/programs/${program.id}`,
    }),
  };
}

export default async function ProgramPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const { programs } = await getPrograms();
  const program = findProgram(programs, slug);

  if (!program) notFound();

  // These fields are optional on the Program type
  const objectives = program.objectives ?? [];
  const topics = program.topics ?? [];
  const eligibility = program.eligibility ?? [];
  const galleryPhotos = program.galleryPhotos ?? [];

  return (
    <>
      {/* Header — same layout as the flagship program pages */}
      <section style={{ background: "var(--navy-dark)", padding: "64px 80px 56px" }}>
        <Link
          href="/programs"
          style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", color: "rgba(255,255,255,0.6)", fontSize: "0.82rem", fontWeight: 600, marginBottom: "1.75rem" }}
        >
          <ArrowLeft size={14} /> All Programs
        </Link>

        {program.tagline && (
          <p style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "var(--orange)", marginBottom: "0.75rem" }}>
            {program.tagline}
          </p>
        )}
        <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", marginBottom: "1.25rem" }}>
          {program.name}
        </h1>
        {program.description && (
          <p style={{ maxWidth: 720, fontSize: "1rem", lineHeight: 1.8, color: "rgba(255,255,255,0.85)" }}>
            {program.description}
          </p>
        )}

        {program.stats.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "2.5rem", marginTop: "2rem" }}>
            {program.stats.map((s) => (
              <div key={s.label}>
                <strong style={{ display: "block", fontSize: "1.6rem", fontWeight: 800, color: "var(--orange)" }}>{s.value}</strong>
                <span style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.65)" }}>{s.label}</span>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Body — only renders the sections the editor filled in */}
      <section style={{ padding: "56px 80px", maxWidth: 960 }}>
        {objectives.length > 0 && (
          <div style={{ marginBottom: "3rem" }}>
            <h2 style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--navy-dark)", marginBottom: "1.25rem" }}>Objectives</h2>
            <ul style={{ display: "grid", gap: "0.85rem", paddingLeft: "1.2rem" }}>
              {objectives.map((o) => (
                <li key={o} style={{ fontSize: "0.95rem", lineHeight: 1.7, color: "var(--navy)" }}>{o}</li>
              ))}
            </ul>
          </div>
        )}

        {topics.length > 0 && (
          <div style={{ marginBottom: "3rem" }}>
            <h2 style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--navy-dark)", marginBottom: "1.25rem" }}>Topics</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
              {topics.map((t) => (
                <span key={t} style={{ background: "var(--gray-light)", color: "var(--navy)", borderRadius: 999, padding: "6px 14px", fontSize: "0.8rem", fontWeight: 600 }}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}

        {eligibility.length > 0 && (
          <div style={{ marginBottom: "3rem" }}>
            <h2 style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--navy-dark)", marginBottom: "1.25rem" }}>Who can take part</h2>
            <ul style={{ display: "grid", gap: "0.85rem", paddingLeft: "1.2rem" }}>
              {eligibility.map((e) => (
                <li key={e} style={{ fontSize: "0.95rem", lineHeight: 1.7, color: "var(--navy)" }}>{e}</li>
              ))}
            </ul>
          </div>
        )}

        {galleryPhotos.length > 0 && (
          <div>
            <h2 style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--navy-dark)", marginBottom: "1.25rem" }}>Gallery</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1rem" }}>
              {galleryPhotos.map((src) => (
                <Image key={src} src={src} alt={program.name} width={600} height={200} style={{ width: "100%", height: 200, objectFit: "cover", borderRadius: 10 }} />
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
}
