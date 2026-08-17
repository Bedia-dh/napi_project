import HeroSection from "@/components/home/HeroSection";
import StatsBand from "@/components/home/StatsBand";
import EventsCarousel from "@/components/home/EventsCarousel";
import PolicyIssuesGrid from "@/components/home/PolicyIssuesGrid";
import FeaturedPublications from "@/components/home/FeaturedPublications";
import ProgramsSection from "@/components/home/ProgramsSection";
import GetInvolvedSection from "@/components/home/GetInvolvedSection";
import NewsletterSection from "@/components/home/NewsletterSection";
import { getPublications } from "@/lib/payload/queries";

// Incremental Static Regeneration: the homepage is generated once and
// re-fetched from Payload/MongoDB in the background at most every 5
// minutes, instead of on every single visitor request. Publications don't
// change minute-to-minute, so this cuts database load and serves the page
// from Vercel's edge cache the rest of the time. Editing a publication in
// /admin will show up here within this window rather than instantly.
export const revalidate = 300;

export default async function HomePage() {
  const { publications } = await getPublications();

  return (
    <>
      <HeroSection />
      <StatsBand />
      <EventsCarousel />
      <PolicyIssuesGrid />
      <FeaturedPublications publications={publications} />
      <ProgramsSection />
      <GetInvolvedSection />
      <NewsletterSection />
    </>
  );
}
