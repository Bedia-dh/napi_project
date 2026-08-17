import type { CollectionConfig } from "payload";
import { anyone, isAdmin, isLoggedIn } from "@/lib/payload/access";
import { stripEmDash } from "@/lib/payload/sanitizeText";

// Stores messages sent through the public Contact form (/contact). Visitors
// can create entries (that's what powers the form) but can never read them
// back — only logged-in staff can see and triage submissions here in
// /admin. See app/api/contact/route.ts for the endpoint the form posts to.
export const ContactSubmissions: CollectionConfig = {
  slug: "contact-submissions",
  labels: {
    singular: "Contact Submission",
    plural: "Contact Submissions",
  },
  admin: {
    group: "Content",
    useAsTitle: "name",
    defaultColumns: ["name", "email", "subject", "status", "createdAt"],
    description:
      "Messages sent through the public Contact form. Mark items \"Read\" or \"Archived\" once you've followed up - new messages default to \"New\" so they're easy to spot.",
  },
  access: {
    // Anyone (including logged-out visitors) can create a submission — that's
    // the public contact form. Only logged-in staff can read, update
    // (triage status), or delete existing submissions.
    create: anyone,
    read: isLoggedIn,
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
      label: "Name",
    },
    {
      name: "email",
      type: "email",
      required: true,
      label: "Email",
    },
    {
      name: "subject",
      type: "select",
      required: true,
      defaultValue: "general",
      label: "Subject",
      options: [
        { label: "General Inquiry", value: "general" },
        { label: "Partnership", value: "partnership" },
        { label: "Press / Media", value: "press" },
        { label: "Program Application", value: "program" },
        { label: "Other", value: "other" },
      ],
    },
    {
      name: "message",
      type: "textarea",
      required: true,
      label: "Message",
    },
    {
      name: "status",
      type: "select",
      defaultValue: "new",
      label: "Status",
      admin: {
        position: "sidebar",
        description: "Triage state for staff - has no effect on the public site.",
      },
      options: [
        { label: "New", value: "new" },
        { label: "Read", value: "read" },
        { label: "Archived", value: "archived" },
      ],
    },
  ],
};
