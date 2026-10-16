/**
 * Cloudflare Turnstile server-side verification.
 *
 * Validates a Turnstile token against Cloudflare's siteverify endpoint.
 * Used by API routes (e.g. /api/contact) to confirm the request came
 * from a real human, not a bot.
 *
 * Required env var:
 *   TURNSTILE_SECRET_KEY — your Turnstile widget's secret key (from the
 *   Cloudflare dashboard). Never expose this on the client side.
 *
 * The client-side widget needs:
 *   NEXT_PUBLIC_TURNSTILE_SITE_KEY — the public site key, safe for the browser.
 */

interface TurnstileVerifyResponse {
  success: boolean;
  "error-codes"?: string[];
  challenge_ts?: string;
  hostname?: string;
  action?: string;
  cdata?: string;
}

interface VerifyResult {
  success: boolean;
  error?: string;
}

const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export async function verifyTurnstileToken(
  token: string | null | undefined,
  clientIp?: string
): Promise<VerifyResult> {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  // Not configured: skip in dev/staging, but refuse in production so a
  // missing env var can never silently leave the form open to bots.
  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      console.error("[turnstile] TURNSTILE_SECRET_KEY is not set in production — rejecting submission.");
      return { success: false, error: "Bot verification is not configured. Please email us directly." };
    }
    console.warn("[turnstile] TURNSTILE_SECRET_KEY not set — skipping verification (non-production).");
    return { success: true };
  }

  if (!token) {
    return { success: false, error: "Bot verification is required. Please complete the challenge." };
  }

  try {
    const body: Record<string, string> = {
      secret,
      response: token,
    };
    if (clientIp) {
      body.remoteip = clientIp;
    }

    const res = await fetch(VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      console.error(`[turnstile] Cloudflare API returned ${res.status}`);
      // Don't block the user if Cloudflare itself is down
      return { success: true };
    }

    const data: TurnstileVerifyResponse = await res.json();

    if (!data.success) {
      const codes = data["error-codes"]?.join(", ") || "unknown";
      console.warn(`[turnstile] Verification failed: ${codes}`);
      return {
        success: false,
        error: "Bot verification failed. Please refresh the page and try again.",
      };
    }

    return { success: true };
  } catch (err) {
    console.error("[turnstile] Verification request failed:", err);
    // Fail open — don't block real users if the check itself errors
    return { success: true };
  }
}
