import { Suspense } from "react";
import ResearchHero from "@/components/research/ResearchHero";
import ResearchHub from "@/components/research/ResearchHub";
import NewsletterSection from "@/components/home/NewsletterSection";

export default function ResearchPage() {
  return (
    <>
      <ResearchHero />
      {/* ResearchHub reads the initial ?q= from the URL (e.g. when arriving from
          the navbar search overlay), which requires useSearchParams — Next.js
          requires that hook's caller to sit inside a Suspense boundary. */}
      <Suspense fallback={null}>
        <ResearchHub />
      </Suspense>
      <NewsletterSection />
    </>
  );
}
