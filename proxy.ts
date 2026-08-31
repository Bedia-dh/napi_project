import { NextRequest, NextResponse } from "next/server";

// ──────────────────────────────────────────────────────────────────────────────
// Security Middleware
// ──────────────────────────────────────────────────────────────────────────────
// 1. Adds security headers to every response.
// 2. Rate-limits Payload auth endpoints (login, forgot-password, reset-password).
// 3. Blocks public access to sensitive Payload REST API routes (users,
//    contact-submissions, media) unless the request carries a valid session.
// ──────────────────────────────────────────────────────────────────────────────

// ── In-memory rate limiter (same approach as lib/rate-limit.ts) ──────────────
interface RLEntry {
  timestamps: number[];
}
const rlStore = new Map<string, RLEntry>();
let lastCleanup = Date.now();

function rateLimitCheck(
  key: string,
  max: number,
  windowMs: number
): { limited: boolean; retryAfterMs: number } {
  const now = Date.now();

  // Periodic cleanup
  if (now - lastCleanup > 5 * 60_000) {
    lastCleanup = now;
    for (const [k, e] of rlStore) {
      e.timestamps = e.timestamps.filter((t) => t > now - windowMs);
      if (e.timestamps.length === 0) rlStore.delete(k);
    }
  }

  let entry = rlStore.get(key);
  if (!entry) {
    entry = { timestamps: [] };
    rlStore.set(key, entry);
  }
  entry.timestamps = entry.timestamps.filter((t) => t > now - windowMs);

  if (entry.timestamps.length >= max) {
    const retryAfterMs = entry.timestamps[0] + windowMs - now;
    return { limited: true, retryAfterMs };
  }

  entry.timestamps.push(now);
  return { limited: false, retryAfterMs: 0 };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function getClientIp(req: NextRequest): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

/** Security headers applied to every response. */
function applySecurityHeaders(res: NextResponse): NextResponse {
  // Prevent clickjacking
  res.headers.set("X-Frame-Options", "DENY");
  // Prevent MIME-type sniffing
  res.headers.set("X-Content-Type-Options", "nosniff");
  // Referrer policy — send origin only to cross-origin requests
  res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  // Restrict browser features
  res.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), payment=()"
  );
  // HSTS — tell browsers to always use HTTPS (1 year, include subdomains)
  res.headers.set(
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains"
  );
  // Prevent search engines from indexing admin pages
  if (res.headers.get("x-middleware-admin")) {
    res.headers.set("X-Robots-Tag", "noindex, nofollow");
    res.headers.delete("x-middleware-admin");
  }
  return res;
}

// ── Sensitive Payload REST paths ─────────────────────────────────────────────
// These are the collection slugs that should NOT be publicly accessible via
// Payload's auto-generated REST API. Public-facing data is served through our
// own custom API routes (/api/events, /api/publications, /api/search).
const PROTECTED_API_SLUGS = [
  "users",
  "contact-submissions",
  "media",
  "team-members",
  "ypl-fellows",
  "roundtable-series",
];

/** Auth-related Payload REST paths that get rate-limited. */
const AUTH_PATHS = [
  "/api/users/login",
  "/api/users/forgot-password",
  "/api/users/reset-password",
  "/api/users/first-register",
];

// ── Main middleware ─────────────────────────────────────────────────────────

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const ip = getClientIp(req);

  // ── 1. Rate-limit auth endpoints (10 attempts per 15 minutes per IP) ───
  if (AUTH_PATHS.some((p) => pathname.startsWith(p))) {
    const { limited, retryAfterMs } = rateLimitCheck(
      `auth:${ip}`,
      10, // max attempts
      15 * 60_000 // 15-minute window
    );
    if (limited) {
      return applySecurityHeaders(
        NextResponse.json(
          { error: "Too many attempts. Please try again later." },
          {
            status: 429,
            headers: { "Retry-After": String(Math.ceil(retryAfterMs / 1000)) },
          }
        )
      );
    }
  }

  // ── 2. Rate-limit public read APIs (60 req/min per IP — anti-scraping) ──
  const PUBLIC_API_PATHS = ["/api/publications", "/api/search", "/api/events"];
  if (PUBLIC_API_PATHS.some((p) => pathname.startsWith(p))) {
    const { limited, retryAfterMs } = rateLimitCheck(
      `api:${ip}`,
      60, // max requests
      60_000 // 1-minute window
    );
    if (limited) {
      return applySecurityHeaders(
        NextResponse.json(
          { error: "Rate limit exceeded. Please slow down." },
          {
            status: 429,
            headers: { "Retry-After": String(Math.ceil(retryAfterMs / 1000)) },
          }
        )
      );
    }
  }

  // ── 3. Rate-limit contact form submissions (5 per minute per IP) ──────
  if (pathname === "/api/contact" && req.method === "POST") {
    const { limited, retryAfterMs } = rateLimitCheck(
      `contact:${ip}`,
      5,
      60_000
    );
    if (limited) {
      return applySecurityHeaders(
        NextResponse.json(
          { error: "Too many submissions. Please wait a moment and try again." },
          {
            status: 429,
            headers: { "Retry-After": String(Math.ceil(retryAfterMs / 1000)) },
          }
        )
      );
    }
  }

  // ── 4. Protect sensitive Payload REST API routes ───────────────────────
  // Allow requests that carry a valid Payload session cookie (logged-in
  // admin/editor). Block everyone else from browsing these endpoints.
  if (pathname.startsWith("/api/")) {
    const isProtected = PROTECTED_API_SLUGS.some((slug) => {
      const apiPath = `/api/${slug}`;
      return pathname === apiPath || pathname.startsWith(`${apiPath}/`);
    });

    if (isProtected) {
      // Payload stores its session in a cookie named `payload-token`.
      const hasSession = req.cookies.has("payload-token");

      // Allow login/auth endpoints through (they're already rate-limited above)
      const isAuthPath = AUTH_PATHS.some((p) => pathname.startsWith(p));
      const isSessionCheck = pathname === "/api/users/me";

      if (!hasSession && !isAuthPath && !isSessionCheck) {
        return applySecurityHeaders(
          NextResponse.json(
            { error: "Not authorized." },
            { status: 401 }
          )
        );
      }
    }
  }

  // ── 5. Mark admin pages so security headers can add noindex ────────────
  const res = NextResponse.next();
  if (pathname.startsWith("/admin")) {
    res.headers.set("x-middleware-admin", "1");
  }

  // ── 6. Apply security headers to all responses ────────────────────────
  return applySecurityHeaders(res);
}

// Only run middleware on relevant paths — skip static assets, images, etc.
export const config = {
  matcher: [
    // Match all paths except Next.js internals and static files
    "/((?!_next/static|_next/image|favicon\\.ico|icon-.*\\.png|apple-icon\\.png|manifest\\.json|media/).*)",
  ],
};
