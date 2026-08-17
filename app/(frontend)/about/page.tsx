import AboutHero from "@/components/about/AboutHero";
import MissionVision from "@/components/about/MissionVision";
import CoreValues from "@/components/about/CoreValues";
import OurStory from "@/components/about/OurStory";
import ExecutiveTeam from "@/components/about/ExecutiveTeam";
import BoardOfAdvisors from "@/components/about/BoardOfAdvisors";
import CTABand from "@/components/about/CTABand";
import NewsletterSection from "@/components/home/NewsletterSection";
import { getTeamMembers } from "@/lib/payload/queries";

// See app/(frontend)/page.tsx for why this is set — same reasoning applies
// here (team/board data changes rarely, so a 5-minute cache is a good
// tradeoff between freshness and not hitting the database on every visit).
export const revalidate = 300;

export default async function AboutPage() {
  const { executive, board, source } = await getTeamMembers();

  return (
    <>
      <AboutHero />
      <MissionVision />
      <CoreValues />
      <OurStory />
      {process.env.NODE_ENV !== "production" && source === "static-fallback" && (
        <div style={{ background: "#fff3eb", borderTop: "1px dashed var(--orange)", padding: "8px 14px", fontSize: "0.78rem", color: "var(--gray-mid)", textAlign: "center" }}>
          Dev note: serving team members from the static dataset - connect DATABASE_URI to query MongoDB via Payload instead.
        </div>
      )}
      <ExecutiveTeam members={executive} />
      <BoardOfAdvisors members={board} />
      <CTABand />
      <NewsletterSection />
    </>
  );
}
