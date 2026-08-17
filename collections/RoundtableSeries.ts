import type { CollectionConfig } from "payload";
import { anyone, isAdmin, isLoggedIn } from "@/lib/payload/access";
import { stripEmDash } from "@/lib/payload/sanitizeText";

// The NAPI-MEI Roundtables — one document per country series (Libya,
// Tunisia, Morocco), each with a list of individual roundtable sessions.
// Shown on /programs/mei-roundtables.
export const RoundtableSeries: CollectionConfig = {
  slug: "roundtable-series",
  labels: {
    singular: "Roundtable Series",
    plural: "Roundtable Series",
  },
  admin: {
    group: "Programs",
    useAsTitle: "country",
    description:
      "One entry per country (Libya, Tunisia, Morocco). Each entry lists the individual roundtable sessions held in that country. Add a new country entry when the program expands somewhere new.",
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
  fields: [
    { name: "country", type: "text", required: true, label: "Country" },
    {
      name: "period",
      type: "text",
      required: true,
      label: "Time period",
      admin: { description: "e.g. \"April – December 2023\"" },
    },
    {
      name: "intro",
      type: "textarea",
      required: true,
      label: "Introduction",
      admin: { description: "1–2 sentences introducing this country's series." },
    },
    {
      name: "roundtables",
      type: "array",
      required: true,
      label: "Individual roundtable sessions",
      labels: { singular: "Session", plural: "Sessions" },
      admin: {
        description:
          "One row per session. If the URL is a YouTube link, the site automatically shows a hover-to-preview video card instead of a plain link.",
      },
      fields: [
        { name: "title", type: "text", required: true, label: "Session title" },
        { name: "url", type: "text", required: true, label: "Link (YouTube or article URL)" },
      ],
    },
  ],
};
