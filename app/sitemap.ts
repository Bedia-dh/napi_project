import type { MetadataRoute } from "next";
import { getPrograms } from "@/lib/payload/queries";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://napipolicy.org";

/**
 * Priority tiers:
 * 1.0  — homepage
 * 0.9  — core sections (about, programs, research)
 * 0.8  — individual programs
 * 0.7  — secondary pages (events, contact)
 * 0.5  — legal pages
 */
const STATIC_ROUTES: {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}[] = [
  { path: "",           changeFrequency: "daily",   priority: 1.0 },
  { path: "/about",     changeFrequency: "monthly", priority: 0.9 },
  { path: "/programs",  changeFrequency: "monthly", priority: 0.9 },
  { path: "/research",  changeFrequency: "weekly",  priority: 0.9 },
  { path: "/events",    changeFrequency: "weekly",  priority: 0.7 },
  { path: "/contact",   changeFrequency: "yearly",  priority: 0.7 },
];

// /get-involved is a redirect to /contact — no need to index it.

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static routes
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  // Dynamic program pages — fetched from CMS (or static fallback)
  let programEntries: MetadataRoute.Sitemap = [];
  try {
    const { programs } = await getPrograms();
    programEntries = programs.map((p) => ({
      url: `${SITE_URL}/programs/${p.id}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));
  } catch {
    // If the CMS is unreachable during build, fall back to known slugs
    const fallbackSlugs = ["ypl", "chill-chat", "mei-roundtables", "youth-voices"];
    programEntries = fallbackSlugs.map((slug) => ({
      url: `${SITE_URL}/programs/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));
  }

  return [...staticEntries, ...programEntries];
}
