import type { Metadata } from "next";
import { Suspense } from "react";
import ResearchHero from "@/components/research/ResearchHero";
import ResearchHub from "@/components/research/ResearchHub";
import NewsletterSection from "@/components/home/NewsletterSection";
import { ogMeta } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Explore NAPI's evidence-based policy publications, briefs, and op-eds on governance, migration, education, and youth empowerment in North Africa.",
  ...ogMeta({
    title: "Research",
    description:
      "Explore NAPI's evidence-based policy publications, briefs, and op-eds on governance, migration, education, and youth empowerment in North Africa.",
    path: "/research",
  }),
};

export default function ResearchPage() {
  return (
    <>
      <ResearchHero />
      <Suspense fallback={null}>
        <ResearchHub />
      </Suspense>
      <NewsletterSection />
    </>
  );
}
