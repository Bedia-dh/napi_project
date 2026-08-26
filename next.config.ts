import type { NextConfig } from "next";
import path from "path";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
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
    ],
  },
};

export default withPayload(nextConfig, { devBundleServerPackages: false });
