import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://napipolicy.org";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // The Payload admin panel and its API are for NAPI staff, not search
        // engines — keep them out of the crawl and out of search results.
        disallow: ["/admin", "/api/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
