import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, DEFAULT_OG_IMAGE } from "@/lib/seo";

/**
 * Schema.org Organization + WebSite structured data.
 *
 * Renders a <script type="application/ld+json"> tag in the body.
 * Google uses this for the knowledge panel and sitelinks search box.
 */
export function OrganizationJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "North Africa Policy Initiative",
        alternateName: "NAPI",
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/media/logo_napi.png`,
          width: 512,
          height: 512,
        },
        image: DEFAULT_OG_IMAGE,
        description: SITE_DESCRIPTION,
        email: "contact@napipolicy.org",
        areaServed: [
          { "@type": "Place", name: "Libya" },
          { "@type": "Place", name: "Tunisia" },
          { "@type": "Place", name: "Morocco" },
          { "@type": "Place", name: "Algeria" },
        ],
        knowsAbout: [
          "Public policy",
          "Youth leadership",
          "North Africa",
          "Policy research",
          "Civic engagement",
        ],
        // Uncomment when social accounts are confirmed:
        // sameAs: [
        //   "https://twitter.com/napipolicy",
        //   "https://linkedin.com/company/napipolicy",
        //   "https://instagram.com/napipolicy",
        // ],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        publisher: { "@id": `${SITE_URL}/#organization` },
        // Enables the Google sitelinks search box when eligible
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${SITE_URL}/research?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
