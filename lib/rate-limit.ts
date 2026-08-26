/**
 * Simple in-memory sliding-window rate limiter for API routes.
 *
 * Each key (usually a client IP) gets a window of `windowMs` milliseconds.
 * Within that window, up to `max` requests are allowed. Once exceeded, the
 * limiter returns { limited: true } so the route can return 429.
 *
 * This is an in-memory store — it resets on cold starts (serverless deploys).
 * For a production-grade distributed limiter, swap in Redis (e.g. Upstash).
 * The in-memory version still catches burst spam and automated form abuse
 * within a single instance, which covers the typical Vercel deployment.
 */

interface RateLimitEntry {
  timestamps: number[];
}

const store = new Map<string, RateLimitEntry>();

// Clean up stale entries every 5 minutes to prevent unbounded memory growth
const CLEANUP_INTERVAL = 5 * 60 * 1000;
let lastCleanup = Date.now();

function cleanup(windowMs: number) {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL) return;
  lastCleanup = now;
  const cutoff = now - windowMs;
  for (const [key, entry] of store) {
    entry.timestamps = entry.timestamps.filter((t) => t > cutoff);
    if (entry.timestamps.length === 0) store.delete(key);
  }
}

interface RateLimitOptions {
  /** Maximum number of requests per window. Default: 5 */
  max?: number;
  /** Window size in milliseconds. Default: 60_000 (1 minute) */
  windowMs?: number;
}

interface RateLimitResult {
  limited: boolean;
  remaining: number;
  retryAfterMs: number;
}

export function rateLimit(key: string, options: RateLimitOptions = {}): RateLimitResult {
  const { max = 5, windowMs = 60_000 } = options;
  const now = Date.now();

  cleanup(windowMs);

  let entry = store.get(key);
  if (!entry) {
    entry = { timestamps: [] };
    store.set(key, entry);
  }

  // Remove timestamps outside the current window
  entry.timestamps = entry.timestamps.filter((t) => t > now - windowMs);

  if (entry.timestamps.length >= max) {
    const oldestInWindow = entry.timestamps[0];
    const retryAfterMs = oldestInWindow + windowMs - now;
    return { limited: true, remaining: 0, retryAfterMs };
  }

  entry.timestamps.push(now);
  return { limited: false, remaining: max - entry.timestamps.length, retryAfterMs: 0 };
}
