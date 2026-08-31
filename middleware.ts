// Wire the security proxy into Next.js middleware.
// proxy.ts contains the actual logic (rate limiting, API protection,
// security headers); this file just re-exports it as the default
// middleware entry point that Next.js expects.
export { proxy as middleware, config } from "./proxy";
