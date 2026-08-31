import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";
import { rateLimit } from "@/lib/rate-limit";
import { verifyTurnstileToken } from "@/lib/turnstile";

export const dynamic = "force-dynamic";

interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const VALID_SUBJECTS = new Set(["general", "partnership", "press", "program", "other"]);
const MAX_MESSAGE_LENGTH = 5000;

function validate(body: Partial<ContactPayload>): string | null {
  if (!body.name || !body.name.trim()) return "Name is required.";
  if (body.name.trim().length > 200) return "Name is too long.";
  if (!body.email || !EMAIL_RE.test(body.email.trim())) return "A valid email is required.";
  if (body.email.trim().length > 320) return "Email is too long.";
  if (!body.message || !body.message.trim()) return "Message is required.";
  if (body.message.trim().length > MAX_MESSAGE_LENGTH) return "Message is too long.";
  return null;
}

function getClientIp(req: NextRequest): string {
  // Vercel sets x-forwarded-for; fall back to a generic key for local dev
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

export async function POST(req: NextRequest) {
  // Rate limit: 5 submissions per minute per IP
  const ip = getClientIp(req);
  const { limited, retryAfterMs } = rateLimit(ip, { max: 5, windowMs: 60_000 });
  if (limited) {
    return NextResponse.json(
      { error: "Too many submissions. Please wait a moment and try again." },
      {
        status: 429,
        headers: { "Retry-After": String(Math.ceil(retryAfterMs / 1000)) },
      }
    );
  }

  let body: Partial<ContactPayload>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const validationError = validate(body);
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  // Verify Cloudflare Turnstile token (skipped if TURNSTILE_SECRET_KEY not set)
  const turnstileResult = await verifyTurnstileToken(
    (body as Record<string, unknown>).turnstileToken as string | undefined,
    ip
  );
  if (!turnstileResult.success) {
    return NextResponse.json(
      { error: turnstileResult.error || "Bot verification failed." },
      { status: 403 }
    );
  }

  const name = body.name!.trim();
  const email = body.email!.trim();
  const message = body.message!.trim();
  const subject = body.subject && VALID_SUBJECTS.has(body.subject) ? body.subject : "general";

  try {
    const payload = await getPayload({ config });
    await payload.create({
      collection: "contact-submissions",
      data: { name, email, subject, message, status: "new" },
    });
  } catch (err) {
    console.error("[/api/contact] Failed to save submission:", err);
    return NextResponse.json(
      { error: "Something went wrong saving your message. Please try again, or email us directly." },
      { status: 503 }
    );
  }

  // Optional email notification via Resend
  notifyByEmail({ name, email, subject, message }).catch((err) => {
    console.error("[/api/contact] Email notification failed (submission was still saved):", err);
  });

  return NextResponse.json({ ok: true });
}

async function notifyByEmail(data: ContactPayload) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;

  const to = process.env.CONTACT_NOTIFY_EMAIL || "contact@napipolicy.org";
  const from = process.env.CONTACT_FROM_EMAIL || "NAPI Website <onboarding@resend.dev>";

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      reply_to: data.email,
      subject: `[NAPI Contact] ${data.subject} - ${data.name}`,
      text: `From: ${data.name} <${data.email}>\nSubject: ${data.subject}\n\n${data.message}`,
    }),
  });

  if (!res.ok) {
    throw new Error(`Resend API returned ${res.status}: ${await res.text()}`);
  }
}
