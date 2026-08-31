/**
 * Validates that critical environment variables are set.
 * Called early in payload.config.ts before anything touches process.env.
 *
 * - Production: throws if PAYLOAD_SECRET or DATABASE_URI are missing.
 * - Development: warns to the console so the app still starts for local work.
 */
export function validateEnv(): void {
  const required = ["PAYLOAD_SECRET", "DATABASE_URI"];
  const missing = required.filter((key) => !process.env[key]);

  if (missing.length === 0) return;

  const message = `Missing environment variable(s): ${missing.join(", ")}`;

  if (process.env.NODE_ENV === "production") {
    throw new Error(message);
  }

  console.warn(`⚠️  ${message} — the app may not work correctly.`);
}
