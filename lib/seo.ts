/**
 * Shared SEO constants used across metadata exports and structured data.
 *
 * Keep all canonical strings here so a rebrand or domain change
 * only touches one file.
 */

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://napipolicy.org";
export const SITE_NAME = "NAPI – North Africa Policy Initiative";
export const SITE_DESCRIPTION =
  "Independent think tank empowering young North Africans through evidence-based policy research, dialogue, and leadership.";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/media/napi_hero.png`;

/** Reusable twitter card defaults (summary_large_image everywhere). */
export const twitterDefaults = {
  card: "summary_large_image" as const,
  // Uncomment once NAPI has an X/Twitter account:
  // site: "@napipolicy",
};

/**
 * Helper to build a page-level metadata title using the template.
 * The root layout sets `title.template: "%s | NAPI"`, so page exports
 * only need the page-specific part (e.g. "About").
 */
export function ogMeta({
  title,
  description,
  path = "",
  image,
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
}) {
  const url = `${SITE_URL}${path}`;
  return {
    openGraph: {
      title: `${title} | NAPI`,
      description,
      url,
      siteName: SITE_NAME,
      locale: "en_US",
      type: "website" as const,
      ...(image ? { images: [{ url: image, width: 1200, height: 630, alt: title }] } : {}),
    },
    twitter: {
      ...twitterDefaults,
      title: `${title} | NAPI`,
      description,
      ...(image ? { images: [image] } : {}),
    },
    alternates: { canonical: url },
  };
}
