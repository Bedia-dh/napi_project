import type { NextConfig } from "next";
import path from "path";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  // Remove the X-Powered-By header (reveals Next.js version)
  poweredByHeader: false,

  // ── Security headers (second layer — middleware is the primary) ──────────
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
        ],
      },
      {
        // Prevent search engines from indexing admin pages
        source: "/admin/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
  turbopack: {
    // Pin the workspace root to this project. Without this, Next.js finds a
    // stray package-lock.json higher up (C:\Users\Bedie\package-lock.json)
    // and infers that as the root instead, which can break file watching
    // and HMR for edits made in this project.
    root: path.join(__dirname),
  },
  images: {
    // Registers the external hosts the site currently pulls images from
    // (policy-issue stock photos, YouTube thumbnails, and the old WordPress
    // media library referenced by a couple of fallback URLs) so next/image
    // is able to optimize them once components are migrated from plain
    // <img>/background-image to <Image>. Harmless to have configured ahead
    // of that migration — it has no effect until a component opts in.
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "img.youtube.com" },
      { protocol: "https", hostname: "i.ytimg.com" },
      { protocol: "https", hostname: "napipolicy.org" },
      // Cloudflare R2 media storage (public bucket URL)
      ...(process.env.R2_PUBLIC_URL
        ? [{ protocol: "https" as const, hostname: new URL(process.env.R2_PUBLIC_URL).hostname }]
        : []),
    ],
  },
};

export default withPayload(nextConfig, { devBundleServerPackages: false });
