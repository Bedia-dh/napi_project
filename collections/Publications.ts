import type { CollectionConfig } from "payload";
import { anyone, isAdmin, isLoggedIn } from "@/lib/payload/access";
import { stripEmDash } from "@/lib/payload/sanitizeText";

// Powers /research (the Publications Hub search + filter) and the "Latest
// Research" carousel on the homepage.
export const Publications: CollectionConfig = {
  slug: "publications",
  labels: {
    singular: "Publication",
    plural: "Publications",
  },
  admin: {
    group: "Content",
    useAsTitle: "title",
    defaultColumns: ["title", "type", "theme", "year", "featured"],
    description:
      "Research papers, policy briefs, reports, and proceedings shown on the Research Hub (/research) and the homepage. Changes here appear on the live site immediately - no need to ask anyone to redeploy.",
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
    // Normalizes any em-dash pasted into a text field to a plain hyphen.
    beforeChange: [stripEmDash],
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      label: "Title",
      admin: { description: "The full title as it should appear on the site." },
    },
    {
      name: "type",
      type: "select",
      required: true,
      label: "Publication type",
      admin: { description: "Controls the small colored label shown on the publication card." },
      options: [
        { label: "Policy Brief", value: "brief" },
        { label: "Research Paper", value: "paper" },
        { label: "Report", value: "report" },
        { label: "Proceedings", value: "proceedings" },
      ],
    },
    {
      name: "theme",
      type: "select",
      required: true,
      label: "Policy issue",
      admin: { description: "The main topic area - used for the \"Policy Issue\" filter on /research." },
      options: [
        { label: "Health Equity", value: "health-equity" },
        { label: "Governance", value: "governance" },
        { label: "Climate", value: "climate" },
        { label: "Education", value: "education" },
        { label: "Gender", value: "gender" },
        { label: "Economy", value: "economy" },
      ],
    },
    {
      name: "program",
      type: "select",
      label: "Related program",
      admin: { description: "Which NAPI program this came out of, if any. Leave blank for independent research." },
      options: [
        { label: "Youth Policy Lab", value: "ypl" },
        { label: "Chill-Chat", value: "chill-chat" },
        { label: "Youth Voices", value: "youth-voices" },
        { label: "NAPI-MEI Roundtables", value: "mei-roundtables" },
      ],
    },
    {
      name: "authors",
      type: "array",
      required: true,
      label: "Authors",
      labels: { singular: "Author", plural: "Authors" },
      admin: { description: "Add one row per author, in the order they should be credited." },
      fields: [{ name: "name", type: "text", required: true, label: "Full name" }],
    },
    {
      name: "year",
      type: "number",
      required: true,
      label: "Publication year",
      admin: { description: "Used for sorting (Most Recent / Oldest First) and the Year filter." },
    },
    {
      name: "pages",
      type: "number",
      required: true,
      label: "Page count",
    },
    {
      name: "languages",
      type: "select",
      hasMany: true,
      required: true,
      label: "Available languages",
      admin: { description: "Every language this publication is available in. Shown as flags/tags and used for the Language filter." },
      options: [
        { label: "English", value: "en" },
        { label: "French", value: "fr" },
        { label: "Arabic", value: "ar" },
      ],
    },
    {
      name: "abstract",
      type: "textarea",
      required: true,
      label: "Abstract / summary",
      admin: { description: "A short paragraph summarizing the publication. Shown on the publication's preview card." },
    },
    {
      name: "keywords",
      type: "text",
      hasMany: true,
      label: "Keywords",
      admin: {
        description:
          "Search terms for this PDF - synonyms, acronyms, or topics that aren't already in the title (e.g. \"youth unemployment\", \"NEET\", \"informal economy\"). Used by site search on top of the title, abstract, and authors.",
      },
    },
    {
      name: "pdf",
      type: "upload",
      relationTo: "media",
      label: "PDF file",
      admin: {
        description: "Upload the PDF here. If you'd rather link to a file hosted elsewhere, leave this empty and use \"PDF URL\" below instead.",
      },
    },
    {
      name: "pdfUrl",
      type: "text",
      label: "PDF URL (if not uploaded above)",
      admin: { description: "Only used when no file is uploaded to \"PDF file\" above." },
    },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
      label: "Feature this publication",
      admin: {
        position: "sidebar",
        description: "Shows this publication in the large highlighted spot at the top of /research. Only feature one at a time.",
      },
    },
  ],
};
