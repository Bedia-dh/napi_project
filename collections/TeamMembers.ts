import type { CollectionConfig } from "payload";
import { anyone, isAdmin, isLoggedIn } from "@/lib/payload/access";
import { stripEmDash } from "@/lib/payload/sanitizeText";

// Covers both the Executive Team and Board of Advisors shown on /about,
// distinguished by the "Group" field.
export const TeamMembers: CollectionConfig = {
  slug: "team-members",
  labels: {
    singular: "Team Member",
    plural: "Team Members",
  },
  admin: {
    group: "People",
    useAsTitle: "name",
    defaultColumns: ["name", "role", "group"],
    description:
      "Everyone shown on the About page: NAPI's Executive Team and Board of Advisors. Set \"Group\" first - it decides which section of /about this person appears in, and which other fields you'll need.",
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
    { name: "role", type: "text", required: true, label: "Title / role" },
    {
      name: "group",
      type: "select",
      required: true,
      label: "Group",
      admin: {
        position: "sidebar",
        description: "\"Executive Team\" = staff running NAPI day-to-day. \"Board of Advisors\" = external advisors.",
      },
      options: [
        { label: "Executive Team", value: "executive" },
        { label: "Board of Advisors", value: "board" },
      ],
    },
    {
      name: "bio",
      type: "textarea",
      label: "Bio",
      admin: {
        description: "Executive Team only - shown when hovering over their photo card on /about.",
        condition: (_, siblingData) => siblingData?.group !== "board",
      },
    },
    {
      name: "organization",
      type: "text",
      label: "Organization",
      admin: {
        description: "Board of Advisors only - their outside affiliation, e.g. \"University of Rabat\".",
        condition: (_, siblingData) => siblingData?.group !== "executive",
      },
    },
    {
      name: "photo",
      type: "upload",
      relationTo: "media",
      label: "Photo",
      admin: { description: "Upload here, or use \"Photo URL\" below if it's hosted elsewhere. If left blank, a placeholder icon is shown instead." },
    },
    {
      name: "photoUrl",
      type: "text",
      label: "Photo URL (if not uploaded above)",
    },
    {
      name: "linkedin",
      type: "text",
      label: "LinkedIn URL",
      admin: {
        condition: (_, siblingData) => siblingData?.group !== "board",
      },
    },
    {
      name: "twitter",
      type: "text",
      label: "Twitter / X URL",
      admin: {
        condition: (_, siblingData) => siblingData?.group !== "board",
      },
    },
    {
      name: "email",
      type: "text",
      label: "Email",
      admin: {
        condition: (_, siblingData) => siblingData?.group !== "board",
      },
    },
  ],
};
