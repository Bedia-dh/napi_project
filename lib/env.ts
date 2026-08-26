/**
 * Validates required environment variables at build/startup time.
 * Import this in payload.config.ts or next.config.ts so misconfiguration
 * surfaces as a clear error instead of silent runtime failures.
 */

const required = ["PAYLOAD_SECRET", "DATABASE_URI"] as const;

export function validateEnv() {
  const missing: string[] = [];

  for (const key of required) {
    if (!process.env[key]?.trim()) {
      missing.push(key);
    }
  }

  if (missing.length > 0 && process.env.NODE_ENV === "production") {
    throw new Error(
      `Missing required environment variables for production:\n  ${missing.join("\n  ")}\n\n` +
        "Set these in your Vercel project settings or .env.local file."
    );
  }

  if (missing.length > 0) {
    console.warn(
      `[env] Warning: missing env vars (${missing.join(", ")}). ` +
        "This is fine for local dev with static fallback, but will fail in production."
    );
  }
}
