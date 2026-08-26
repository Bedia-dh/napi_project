import type { CollectionConfig } from "payload";
import { anyone, isAdmin, isLoggedIn } from "@/lib/payload/access";
import { stripEmDash } from "@/lib/payload/sanitizeText";

// Standard upload collection — backs photos for team members, YPL fellows,
// events, publication covers, etc. Any "Upload" field across the other
// collections (Publications' pdf, TeamMembers' photo, YplFellows' photo,
// Events' image) points here.
export const Media: CollectionConfig = {
  slug: "media",
  labels: {
    singular: "Media File",
    plural: "Media Library",
  },
  admin: {
    group: "Content",
    useAsTitle: "alt",
    description:
      "Upload photos, PDFs, and other files here, then attach them from any other section (Team, Fellows, Events, Publications) using its 'Photo' or 'PDF' field. Images are automatically resized into smaller preview versions so pages load quickly.",
  },
  access: {
    // Public site visitors can read; any logged-in user (admin or editor)
    // can create and edit; only admins can delete.
    read: anyone,
    create: isLoggedIn,
    update: isLoggedIn,
    delete: isAdmin,
  },
  hooks: {
    beforeChange: [stripEmDash],
  },
  upload: {
    staticDir: "media-uploads",
    // Accepts images (for photos/covers) and PDFs (for policy papers).
    // Keeping this explicit avoids editors accidentally uploading video
    // files or other large formats the site isn't set up to serve.
    mimeTypes: ["image/*", "application/pdf"],
    imageSizes: [
      { name: "thumbnail", width: 300, height: 300, position: "centre" },
      { name: "card", width: 600, height: 600, position: "centre" },
    ],
    adminThumbnail: "thumbnail",
  },
  fields: [
    {
      name: "alt",
      type: "text",
      label: "Description (for accessibility)",
      admin: {
        description:
          "A short, plain description of what's in the file, e.g. \"Aisha Elrayani headshot\" or \"Chill-Chat session photo, Tripoli 2023\". Read aloud by screen readers - leave blank for PDFs.",
      },
    },
  ],
};
