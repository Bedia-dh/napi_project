import type { CollectionBeforeChangeHook } from "payload";

// Recursively replaces the em-dash character with a plain hyphen in every
// string value of the document being saved — including nested arrays/objects
// (e.g. Publications' `authors` rows, `keywords` array, or a richText tree).
// Keeps editors from having to remember not to paste one in from a word
// processor; the CMS just normalizes it on save.
function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value) && value.constructor === Object;
}

function sanitize(value: unknown): unknown {
  if (typeof value === "string") return value.replace(/—/g, "-");
  if (Array.isArray(value)) return value.map(sanitize);
  if (isPlainObject(value)) {
    const out: Record<string, unknown> = {};
    for (const [key, v] of Object.entries(value)) out[key] = sanitize(v);
    return out;
  }
  // Dates, ObjectIds, numbers, booleans, null, etc. pass through untouched.
  return value;
}

export const stripEmDash: CollectionBeforeChangeHook = ({ data }) => {
  return sanitize(data) as typeof data;
};
