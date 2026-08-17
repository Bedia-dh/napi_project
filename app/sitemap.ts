import type { MetadataRoute } from "next";

// Site URL used to build absolute links in the sitemap. Set
// NEXT_PUBLIC_SITE_URL in the hosting provider's environment variables once
// the site is deployed (e.g. https://napipolicy.org) — this falls back to
// the production domain so the sitemap is still correct without it.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://napipolicy.org";

const STATIC_ROUTES = [
  "",
  "/about",
  "/research",
  "/programs",
  "/programs/ypl",
  "/programs/chill-chat",
  "/programs/mei-roundtables",
  "/programs/youth-voices",
  "/events",
  "/get-involved",
  "/contact",
];

// Publications don't have individual detail pages yet (search results link
// back to /research?q=...), so there's nothing per-publication to add here
// until that changes. Once individual publication pages exist, fetch them
// from Payload and append one sitemap entry per publication the same way
// the static routes are built below.
export default function sitemap(): MetadataRoute.Sitemap {
  return STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1 : 0.7,
  }));
}
