import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import StatsBand from "@/components/home/StatsBand";
import EventsCarousel from "@/components/home/EventsCarousel";
import PolicyIssuesGrid from "@/components/home/PolicyIssuesGrid";
import FeaturedPublications from "@/components/home/FeaturedPublications";
import ProgramsSection from "@/components/home/ProgramsSection";
import GetInvolvedSection from "@/components/home/GetInvolvedSection";
import NewsletterSection from "@/components/home/NewsletterSection";
import { getPublications } from "@/lib/payload/queries";
import { ogMeta } from "@/lib/seo";

export const metadata: Metadata = {
  // Use `default` title from root layout (NAPI – North Africa Policy Initiative)
  ...ogMeta({
    title: "North Africa Policy Initiative",
    description:
      "Independent think tank empowering young North Africans through evidence-based policy research, dialogue, and leadership.",
    path: "",
  }),
};

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
