import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";
import { rateLimit } from "@/lib/rate-limit";
import nodemailer from "nodemailer";
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

  // Send email notification via SMTP (SiteGround)
  notifyByEmail({ name, email, subject, message }).catch((err) => {
    console.error("[/api/contact] Email notification failed (submission was still saved):", err);
  });

  return NextResponse.json({ ok: true });
}

async function notifyByEmail(data: ContactPayload) {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || "465");
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  // Skip email notification if SMTP is not configured
  if (!host || !user || !pass) {
    if (process.env.NODE_ENV === "production") {
      console.warn("[/api/contact] SMTP not configured — skipping email notification.");
    }
    return;
  }

  const to = process.env.CONTACT_NOTIFY_EMAIL || "info@napipolicy.org";

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  const subjectLabel: Record<string, string> = {
    general: "General Inquiry",
    partnership: "Partnership",
    press: "Press / Media",
    program: "Program Application",
    other: "Other",
  };
  const label = subjectLabel[data.subject] || data.subject;

  await transporter.sendMail({
    from: `"NAPI Website" <${user}>`,
    to,
    replyTo: data.email,
    subject: `[NAPI Contact] ${label} — ${data.name}`,
    text: [
      "New contact form submission",
      "",
      `Name:    ${data.name}`,
      `Email:   ${data.email}`,
      `Subject: ${label}`,
      "",
      "Message:",
      data.message,
    ].join("\n"),
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px;">
        <h2 style="color: #1a2a3a; border-bottom: 2px solid #e8772e; padding-bottom: 8px;">
          New Contact Form Submission
        </h2>
        <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
          <tr><td style="padding: 6px 12px 6px 0; color: #666; font-weight: 600;">Name</td><td style="padding: 6px 0;">${data.name}</td></tr>
          <tr><td style="padding: 6px 12px 6px 0; color: #666; font-weight: 600;">Email</td><td style="padding: 6px 0;"><a href="mailto:${data.email}">${data.email}</a></td></tr>
          <tr><td style="padding: 6px 12px 6px 0; color: #666; font-weight: 600;">Subject</td><td style="padding: 6px 0;">${label}</td></tr>
        </table>
        <div style="background: #f7f7f7; padding: 16px; border-radius: 8px; margin-top: 12px; white-space: pre-wrap;">${data.message}</div>
        <p style="color: #999; font-size: 12px; margin-top: 24px;">Sent from the NAPI website contact form</p>
      </div>
    `,
  });
}
