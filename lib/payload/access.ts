import type { Access } from "payload";

/**
 * Shared role-based access rules for all collections.
 *
 * Roles (set on each user in the Users collection):
 * - "admin"  — full access: manage users and delete any content.
 * - "editor" — can create and edit content in every content collection,
 *              but cannot delete content or manage user accounts.
 *
 * Public site visitors (not logged in) can only read content — that's what
 * keeps the website itself working.
 */

type UserWithRole = { id?: string | number; role?: string } | null | undefined;

const roleOf = (user: UserWithRole) => (user && typeof user === "object" ? user.role : undefined);

/** Only admins. Used for deleting content and managing users. */
export const isAdmin: Access = ({ req }) => roleOf(req.user as UserWithRole) === "admin";

/** Any logged-in dashboard user (admin or editor). Used for creating/editing content. */
export const isLoggedIn: Access = ({ req }) => Boolean(req.user);

/** Admins can act on any user; everyone else only on their own account.
 * Returns a query constraint (rather than a plain boolean) for non-admins so
 * list views are filtered down to just their own account. */
export const isAdminOrSelf: Access = ({ req }) => {
  const user = req.user as UserWithRole;
  if (!user) return false;
  if (roleOf(user) === "admin") return true;
  return { id: { equals: user.id } };
};

/** Everyone — including logged-out visitors on the public site. */
export const anyone: Access = () => true;
