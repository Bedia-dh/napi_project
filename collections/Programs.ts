import type { CollectionConfig } from "payload";
import { anyone, isAdmin, isLoggedIn } from "@/lib/payload/access";
import { stripEmDash } from "@/lib/payload/sanitizeText";

// Turns any text into a URL-safe slug: "Testç_Name" -> "testc-name".
function slugify(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// The 4 real NAPI programs shown on the homepage grid, /programs, and the
// stats/description text at the top of each program's own page.
export const Programs: CollectionConfig = {
  slug: "programs",
  labels: {
    singular: "Program",
    plural: "Programs",
  },
  admin: {
    group: "Programs",
    useAsTitle: "name",
    description:
      "The 4 NAPI programs (Young Policy Leaders, Chill-Chat, Youth Voices, NAPI-MEI Roundtables). Editing a program here updates its homepage card and the header of its dedicated page immediately.",
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
    {
      name: "name",
      type: "text",
      required: true,
      label: "Program name",
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      label: "URL slug",
      admin: {
        position: "sidebar",
        readOnly: true,
        description:
          "Generated automatically from the program name when the program is created - the page lives at /programs/<slug>. It stays the same if the program is later renamed, so links keep working.",
      },
      hooks: {
        beforeValidate: [
          ({ value, data, operation }) => {
            // New program (or missing slug): derive it from the name.
            if (operation === "create" || !value || typeof value !== "string") {
              return slugify(String(data?.name ?? ""));
            }
            // Existing program: keep the slug stable, just ensure it's URL-safe.
            return slugify(value);
          },
        ],
      },
    },
    {
      name: "tagline",
      type: "text",
      required: true,
      label: "Short tagline",
      admin: { description: "One line, shown in small caps above the program name on the homepage card." },
    },
    {
      name: "description",
      type: "textarea",
      required: true,
      label: "Description",
      admin: { description: "1–3 sentences. Shown on the homepage card and at the top of the program's own page." },
    },
    {
      name: "stats",
      type: "array",
      label: "Key numbers",
      labels: { singular: "Stat", plural: "Key numbers" },
      admin: { description: "The small number + label pairs shown under the description, e.g. \"9 - Fellows (2021 cohort)\". Add up to 3 for the best layout." },
      fields: [
        { name: "value", type: "text", required: true, label: "Number", admin: { description: "e.g. \"9\", \"20+\", \"2022\"" } },
        { name: "label", type: "text", required: true, label: "Label", admin: { description: "e.g. \"Fellows (2021 cohort)\"" } },
      ],
    },
    {
      name: "objectives",
      type: "array",
      label: "Objectives",
      labels: { singular: "Objective", plural: "Objectives" },
      admin: {
        description:
          "The program's bulleted objectives list, shown on its dedicated page (used by Chill-Chat and Youth Voices). Leave empty to keep the text currently built into the page.",
      },
      fields: [
        { name: "text", type: "text", required: true, label: "Objective" },
      ],
    },
    {
      name: "topics",
      type: "array",
      label: "Discussion topics",
      labels: { singular: "Topic", plural: "Discussion topics" },
      admin: {
        description:
          "Short topic tags shown as chips on the program page (used by Chill-Chat, e.g. \"Youth and culture\"). Leave empty to keep the tags currently built into the page.",
      },
      fields: [
        { name: "label", type: "text", required: true, label: "Topic" },
      ],
    },
    {
      name: "eligibility",
      type: "array",
      label: "Eligibility criteria",
      labels: { singular: "Criterion", plural: "Eligibility criteria" },
      admin: {
        description:
          "Who can take part, one criterion per row (used by Youth Voices). Leave empty to keep the criteria currently built into the page.",
      },
      fields: [
        { name: "text", type: "text", required: true, label: "Criterion" },
      ],
    },
    {
      name: "galleryPhotos",
      type: "array",
      label: "Gallery photos",
      labels: { singular: "Photo", plural: "Gallery photos" },
      admin: {
        description:
          "Photos shown in the small gallery on the program page (used by Chill-Chat). Upload a photo, or paste a URL if it's already hosted somewhere (e.g. napipolicy.org).",
      },
      fields: [
        { name: "photo", type: "upload", relationTo: "media", label: "Photo" },
        {
          name: "photoUrl",
          type: "text",
          label: "Photo URL (if not uploaded above)",
          admin: { description: "Only used when no photo is uploaded in the field above." },
        },
      ],
    },
    {
      name: "color",
      type: "text",
      label: "Accent color",
      admin: {
        position: "sidebar",
        description: "A CSS color value, e.g. \"var(--ypl-color)\" or \"#214d90\". Ask a developer before changing this.",
      },
    },
  ],
};
