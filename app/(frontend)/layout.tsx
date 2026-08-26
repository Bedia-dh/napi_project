import type { Metadata } from "next";
import "./globals.css";
import LayoutShell from "@/components/layout/LayoutShell";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, DEFAULT_OG_IMAGE, twitterDefaults } from "@/lib/seo";
import { OrganizationJsonLd } from "@/components/layout/JsonLd";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: "%s | NAPI",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "North Africa",
    "policy",
    "think tank",
    "youth",
    "leadership",
    "research",
    "Libya",
    "Tunisia",
    "Morocco",
    "Algeria",
    "Maghreb",
    "NAPI",
  ],
  authors: [{ name: "North Africa Policy Initiative" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "North Africa Policy Initiative",
      },
    ],
  },
  twitter: {
    ...twitterDefaults,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
        suppressHydrationWarning
      >
        <OrganizationJsonLd />
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
