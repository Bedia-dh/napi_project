import type { CollectionConfig } from "payload";
import { anyone, isAdmin, isLoggedIn } from "@/lib/payload/access";
import { stripEmDash } from "@/lib/payload/sanitizeText";

// Unifies past events + planned/ongoing activities into one editable
// collection. The homepage carousel and the /events page both pull from
// here: the 2 most recent "Past" entries plus every "Planned" entry.
export const Events: CollectionConfig = {
  slug: "events",
  labels: {
    singular: "Event",
    plural: "Events",
  },
  admin: {
    group: "Content",
    useAsTitle: "title",
    defaultColumns: ["title", "status", "type", "date"],
    description:
      "Past events (workshops, webinars, conferences) and currently-open activities, shown on the homepage carousel and the /events page. Set \"Status\" first - it changes which other fields you need to fill in.",
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
      name: "title",
      type: "text",
      required: true,
      label: "Title",
    },
    {
      name: "status",
      type: "select",
      required: true,
      label: "Status",
      admin: {
        position: "sidebar",
        description: "\"Past\" = something that already happened. \"Planned\" = an ongoing program or opportunity people can join now.",
      },
      options: [
        { label: "Past event", value: "past" },
        { label: "Planned / ongoing activity", value: "planned" },
      ],
    },
    {
      name: "type",
      type: "select",
      required: true,
      label: "Event type",
      admin: { description: "Controls the colored label shown on the event card." },
      options: [
        { label: "Webinar", value: "webinar" },
        { label: "Workshop", value: "workshop" },
        { label: "Conference", value: "conference" },
        { label: "Chill-Chat", value: "chill-chat" },
      ],
    },
    {
      name: "date",
      type: "text",
      label: "Date",
      admin: {
        description: "For past events only, as free text, e.g. \"June 14–16, 2022\". Leave blank for planned activities.",
        condition: (_, siblingData) => siblingData?.status !== "planned",
      },
    },
    {
      name: "program",
      type: "text",
      label: "Related program",
      admin: {
        description: "For planned activities, e.g. \"Youth Policy Lab\". Shown as a small tag above the title.",
        condition: (_, siblingData) => siblingData?.status !== "past",
      },
    },
    {
      name: "description",
      type: "textarea",
      required: true,
      label: "Description",
      admin: { description: "1–3 sentences. This is the main text shown on the event card." },
    },
    {
      name: "location",
      type: "text",
      label: "Location",
      admin: {
        condition: (_, siblingData) => siblingData?.status !== "planned",
      },
    },
    {
      name: "registrationUrl",
      type: "text",
      label: "Registration link",
      admin: {
        description: "Only needed if people can still sign up.",
        condition: (_, siblingData) => siblingData?.status !== "past",
      },
    },
    {
      name: "sourceUrl",
      type: "text",
      label: "\"Learn more\" link",
      admin: {
        description: "Optional link to a recap, article, or photo album about this event.",
        condition: (_, siblingData) => siblingData?.status !== "planned",
      },
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      label: "Photo",
    },
  ],
};
