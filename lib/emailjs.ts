/**
 * EmailJS client-side email sending utility.
 *
 * EmailJS sends emails directly from the browser — no server-side API route
 * required. This is ideal for the newsletter subscription form and can serve
 * as a backup delivery channel for the contact form.
 *
 * Setup:
 * 1. Create a free account at https://www.emailjs.com
 * 2. Add an email service (Gmail, Outlook, custom SMTP, etc.)
 * 3. Create email templates for:
 *    - Newsletter subscription (template receives: subscriber_email)
 *    - Contact form (template receives: from_name, from_email, subject, message)
 * 4. Set these env vars in .env.local (and Vercel project settings):
 *    NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
 *    NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
 *    NEXT_PUBLIC_EMAILJS_NEWSLETTER_TEMPLATE_ID=your_newsletter_template_id
 *    NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID=your_contact_template_id
 *
 * All NEXT_PUBLIC_ vars are embedded at build time and visible to the browser.
 */

const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "";
const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "";
const NEWSLETTER_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_NEWSLETTER_TEMPLATE_ID ?? "";
const CONTACT_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID ?? "";

/** True when the required env vars are configured. */
export function isEmailJSConfigured(): boolean {
  return Boolean(PUBLIC_KEY && SERVICE_ID);
}

interface SendParams {
  serviceId?: string;
  templateId: string;
  templateParams: Record<string, string>;
}

/**
 * Sends an email via the EmailJS REST API (no SDK dependency).
 * Returns { ok: true } on success or { ok: false, error: string } on failure.
 */
async function send({ serviceId, templateId, templateParams }: SendParams): Promise<{ ok: boolean; error?: string }> {
  if (!PUBLIC_KEY) {
    return { ok: false, error: "EmailJS is not configured (missing public key)." };
  }

  try {
    const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service_id: serviceId || SERVICE_ID,
        template_id: templateId,
        user_id: PUBLIC_KEY,
        template_params: templateParams,
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("[EmailJS] Send failed:", res.status, text);
      return { ok: false, error: "Failed to send email. Please try again." };
    }

    return { ok: true };
  } catch (err) {
    console.error("[EmailJS] Network error:", err);
    return { ok: false, error: "Network error. Please check your connection." };
  }
}

/**
 * Sends a newsletter subscription notification email.
 * The EmailJS template should be configured to:
 * - Send to your NAPI team inbox
 * - Include the subscriber's email in the body
 */
export async function sendNewsletterSubscription(email: string) {
  return send({
    templateId: NEWSLETTER_TEMPLATE_ID,
    templateParams: {
      subscriber_email: email,
      to_email: "contact@napipolicy.org",
    },
  });
}

/**
 * Sends a contact form submission via EmailJS.
 * This can complement the server-side Payload + Resend flow as a fallback,
 * or be the primary delivery method if Resend isn't configured.
 */
export async function sendContactEmail(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  return send({
    templateId: CONTACT_TEMPLATE_ID,
    templateParams: {
      from_name: data.name,
      from_email: data.email,
      subject: data.subject,
      message: data.message,
      to_email: "contact@napipolicy.org",
    },
  });
}
