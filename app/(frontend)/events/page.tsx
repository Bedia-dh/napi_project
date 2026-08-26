import type { Metadata } from "next";
import EventsList from "@/components/events/EventsList";
import NewsletterSection from "@/components/home/NewsletterSection";
import { ogMeta } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Browse upcoming and past NAPI events — roundtables, Chill-Chat sessions, workshops, and youth policy forums across North Africa.",
  ...ogMeta({
    title: "Events",
    description:
      "Browse upcoming and past NAPI events — roundtables, Chill-Chat sessions, workshops, and youth policy forums across North Africa.",
    path: "/events",
  }),
};

export default function EventsPage() {
  return (
    <>
      <EventsList />
      <NewsletterSection />
    </>
  );
}
