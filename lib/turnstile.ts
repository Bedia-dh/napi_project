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

  // If Turnstile isn't configured, skip verification (dev/staging).
  // In production, set TURNSTILE_SECRET_KEY to enforce bot protection.
  if (!secret) {
    console.warn("[turnstile] TURNSTILE_SECRET_KEY not set — skipping verification.");
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
