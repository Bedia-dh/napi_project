import type { CollectionConfig } from "payload";
import { anyone, isAdmin, isLoggedIn } from "@/lib/payload/access";
import { stripEmDash } from "@/lib/payload/sanitizeText";

// The Young Policy Leaders cohort roster, shown on /programs/ypl.
export const YplFellows: CollectionConfig = {
  slug: "ypl-fellows",
  labels: {
    singular: "YPL Fellow",
    plural: "YPL Fellows",
  },
  admin: {
    group: "Programs",
    useAsTitle: "name",
    defaultColumns: ["name", "cohort", "policyIssue"],
    description:
      "Fellows of the Young Policy Leaders program, shown in the cohort grid on /programs/ypl. Add a new fellow here whenever a new cohort is announced.",
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
    { name: "name", type: "text", required: true, label: "Full name" },
    {
      name: "bio",
      type: "textarea",
      required: true,
      label: "Short bio",
      admin: { description: "1-2 sentences on their background - shown on their fellow card." },
    },
    {
      name: "policyIssue",
      type: "text",
      required: true,
      label: "Policy paper title",
      admin: { description: "The title of the policy paper they wrote during the fellowship." },
    },
    {
      name: "cohort",
      type: "number",
      required: true,
      label: "Cohort year",
      admin: { position: "sidebar", description: "e.g. 2021. Used to group fellows by year." },
    },
    {
      name: "photo",
      type: "upload",
      relationTo: "media",
      label: "Photo",
      admin: { description: "Upload here, or use \"Photo URL\" below if it's hosted elsewhere." },
    },
    {
      name: "photoUrl",
      type: "text",
      label: "Photo URL (if not uploaded above)",
    },
    {
      name: "paper",
      type: "upload",
      relationTo: "media",
      label: "Policy paper (PDF)",
      admin: { description: "Upload here, or use \"PDF URL\" below if it's hosted elsewhere." },
    },
    {
      name: "paperUrl",
      type: "text",
      label: "PDF URL (if not uploaded above)",
    },
    {
      name: "linkedin",
      type: "text",
      label: "LinkedIn URL",
    },
  ],
};
