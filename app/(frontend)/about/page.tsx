import type { Metadata } from "next";
import AboutHero from "@/components/about/AboutHero";
import MissionVision from "@/components/about/MissionVision";
import CoreValues from "@/components/about/CoreValues";
import OurStory from "@/components/about/OurStory";
import ExecutiveTeam from "@/components/about/ExecutiveTeam";
import BoardOfAdvisors from "@/components/about/BoardOfAdvisors";
import CTABand from "@/components/about/CTABand";
import NewsletterSection from "@/components/home/NewsletterSection";
import { getTeamMembers } from "@/lib/payload/queries";
import { ogMeta } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about the North Africa Policy Initiative — our mission, values, story, and the team driving youth-led policy research across the Maghreb.",
  ...ogMeta({
    title: "About",
    description:
      "Learn about the North Africa Policy Initiative — our mission, values, story, and the team driving youth-led policy research across the Maghreb.",
    path: "/about",
  }),
};

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
