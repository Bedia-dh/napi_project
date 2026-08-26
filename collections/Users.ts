import type { CollectionConfig } from "payload";
import { isAdmin, isAdminOrSelf } from "@/lib/payload/access";

// Admin/editor accounts for the dashboard. Auth-enabled collection —
// Payload handles login, sessions, and password hashing automatically
// (passwords are never stored in plain text).
export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  labels: {
    singular: "User",
    plural: "Users",
  },
  admin: {
    group: "People",
    useAsTitle: "email",
    description:
      "People who can log into this dashboard. Add a new user here to give a teammate their own login. Admins can manage users and delete content; Editors can create and edit content but not delete it.",
  },
  access: {
    // Admins see and manage everyone; editors can only see and edit
    // their own account (e.g. to change their password).
    read: isAdminOrSelf,
    create: isAdmin,
    update: isAdminOrSelf,
    delete: isAdmin,
  },
  fields: [
    {
      name: "name",
      type: "text",
      label: "Full name",
    },
    {
      name: "role",
      type: "select",
      required: true,
      defaultValue: "editor",
      label: "Role",
      // Only admins can change roles — otherwise an editor could
      // promote themselves.
      access: {
        update: ({ req }) => (req.user as { role?: string } | null)?.role === "admin",
      },
      admin: {
        description:
          "Admin: full access, including deleting content and managing users. Editor: can create and edit all content, but can't delete content or manage users.",
      },
      options: [
        { label: "Admin", value: "admin" },
        { label: "Editor", value: "editor" },
      ],
    },
  ],
};
