import type { CSSProperties } from "react";

export const metadata = {
  title: "Privacy Policy - NAPI",
};

// DRAFT — see the list of bracketed placeholders below before publishing.
// This page describes only what the current codebase actually does (the
// contact form, the newsletter signup, and the external Youth Voices Google
// Form). It intentionally leaves blank anything that depends on a decision
// NAPI/its counsel needs to make: legal entity details, governing law, data
// retention periods, and which analytics/hosting vendors are finalized.
// Search this file for "[" to find every placeholder.

const sectionTitle: CSSProperties = {
  fontSize: "1.3rem",
  fontWeight: 800,
  color: "var(--navy)",
  marginTop: "2.5rem",
  marginBottom: "0.9rem",
  letterSpacing: "-0.01em",
};

const body: CSSProperties = {
  fontSize: "0.95rem",
  color: "var(--gray-mid)",
  lineHeight: 1.8,
  marginBottom: "1rem",
};

const placeholder: CSSProperties = {
  color: "var(--orange)",
  fontStyle: "italic",
  fontWeight: 600,
};

export default function PrivacyPolicyPage() {
  return (
    <>
      {/* Header */}
      <section style={{ background: "var(--navy-dark)", padding: "64px 80px 56px" }}>
        <p
          style={{
            fontSize: "0.72rem",
            fontWeight: 700,
            letterSpacing: "2px",
            textTransform: "uppercase",
            color: "var(--orange)",
            marginBottom: "0.75rem",
          }}
        >
          Legal
        </p>
        <h1
          style={{
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 800,
            color: "#fff",
            letterSpacing: "-0.02em",
            marginBottom: "1.25rem",
            maxWidth: 640,
          }}
        >
          Privacy Policy
        </h1>
        <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.75, maxWidth: 620 }}>
          Effective date: <span style={placeholder}>[effective date]</span>. This policy explains what
          information the North Africa Policy Institute (&quot;NAPI,&quot; &quot;we,&quot; &quot;us&quot;)
          collects through napipolicy.org, how we use it, and the choices available to you.
        </p>
      </section>

      {/* Body */}
      <section style={{ background: "var(--cream)", padding: "64px 80px 96px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <p style={body}>
            NAPI is <span style={placeholder}>[legal entity name and registration/jurisdiction, e.g. &quot;a nonprofit
            association registered in [country] under registration number [number]&quot;]</span>, with a
            registered address at <span style={placeholder}>[registered address]</span>.
          </p>

          <h2 style={sectionTitle}>1. Information We Collect</h2>
          <p style={body}>
            We collect information directly from you in the following ways:
          </p>
          <p style={body}>
            <strong style={{ color: "var(--navy)" }}>Contact form.</strong> When you use the contact form
            on our Contact page, we collect your name, email address, the subject category you select, and
            the message you write. This is stored so our team can respond to you and is visible only to
            authorized NAPI staff.
          </p>
          <p style={body}>
            <strong style={{ color: "var(--navy)" }}>Newsletter signup.</strong> If you subscribe to our
            newsletter, we collect your email address in order to send you publications, policy briefs, and
            event announcements. <span style={placeholder}>[Confirm the email service provider used to send
            the newsletter, e.g. Mailchimp/Resend/other — that provider&apos;s own privacy practices will also
            apply and should be named here.]</span>
          </p>
          <p style={body}>
            <strong style={{ color: "var(--navy)" }}>Youth Voices submissions.</strong> Submitting writing
            through the &quot;Submit Your Work&quot; button takes you to an external Google Form. Any
            information you provide there is collected by Google and by NAPI as the form&apos;s owner, and is
            governed in part by{" "}
            <span style={placeholder}>[link to Google&apos;s privacy policy, and confirm what NAPI does with
            submitted drafts/personal details]</span>.
          </p>
          <p style={body}>
            <strong style={{ color: "var(--navy)" }}>Automatically collected information.</strong> Like most
            websites, our hosting provider may automatically log standard technical information when you
            visit, such as IP address, browser type, device type, and pages viewed, for security and
            performance purposes. <span style={placeholder}>[Confirm hosting provider(s) once finalized — see
            the Hosting & Caching Strategy document — and whether any analytics tool, e.g. Google Analytics
            or Plausible, is added; none is currently installed on the site.]</span>
          </p>

          <h2 style={sectionTitle}>2. Cookies</h2>
          <p style={body}>
            The public site does not currently set any analytics, advertising, or marketing cookies. The
            only cookies in use are strictly necessary session cookies for staff logging into the content
            management admin panel — these are not set for ordinary visitors browsing the public pages.{" "}
            <span style={placeholder}>[Update this section if analytics or marketing cookies are added in
            the future, and add a cookie consent banner if required by law in the jurisdictions you serve.]</span>
          </p>

          <h2 style={sectionTitle}>3. How We Use Your Information</h2>
          <p style={body}>
            We use the information described above to: respond to inquiries submitted through the contact
            form; send newsletter communications to subscribers who opted in; consider and provide support
            for Youth Voices submissions; maintain the security and proper functioning of the website; and
            comply with our legal obligations.
          </p>
          <p style={body}>
            We do not sell your personal information, and we do not use it for advertising.
          </p>

          <h2 style={sectionTitle}>4. Legal Basis for Processing</h2>
          <p style={body}>
            <span style={placeholder}>
              [If NAPI or its visitors are subject to the EU/UK GDPR or a similar law, state the legal basis
              relied on for each type of processing above — typically consent for the newsletter, and
              legitimate interest or consent for the contact form. This should be confirmed with legal
              counsel based on where NAPI operates and where its visitors are located.]
            </span>
          </p>

          <h2 style={sectionTitle}>5. Sharing of Information</h2>
          <p style={body}>
            We do not sell or rent your personal information. We may share it with:
          </p>
          <p style={body}>
            <strong style={{ color: "var(--navy)" }}>Service providers</strong> who help us operate the
            site, such as our hosting provider, database provider, and email delivery provider —{" "}
            <span style={placeholder}>[list the finalized providers here, e.g. Vercel, MongoDB Atlas,
            Cloudflare, and the email provider used for the contact form/newsletter]</span>.
          </p>
          <p style={body}>
            <strong style={{ color: "var(--navy)" }}>Legal requirements,</strong> if we are required to
            disclose information to comply with a law, regulation, or valid legal process.
          </p>

          <h2 style={sectionTitle}>6. Data Retention</h2>
          <p style={body}>
            <span style={placeholder}>
              [State how long contact form submissions and newsletter email addresses are kept, and what
              happens to them after that — e.g. "contact form messages are retained for [X months/years]
              for record-keeping, after which they are deleted." This is a policy decision for NAPI to set.]
            </span>
          </p>

          <h2 style={sectionTitle}>7. Data Security</h2>
          <p style={body}>
            We take reasonable technical and organizational measures to protect the information you share
            with us. However, no method of transmission over the internet or electronic storage is
            completely secure, and we cannot guarantee absolute security.
          </p>

          <h2 style={sectionTitle}>8. Your Rights</h2>
          <p style={body}>
            <span style={placeholder}>
              [Depending on where you are located, you may have rights to access, correct, delete, or
              transfer your personal information, or to object to or restrict certain processing (for
              example, under the EU/UK GDPR or applicable regional data protection laws). List the specific
              rights that apply and how to exercise them, once confirmed with legal counsel.]
            </span>{" "}
            At minimum, you can unsubscribe from our newsletter at any time using the link in any email we
            send, and you can request that we delete a contact form submission by emailing us at the address
            below.
          </p>

          <h2 style={sectionTitle}>9. Children&apos;s Privacy</h2>
          <p style={body}>
            Our general website is not directed at children and we do not knowingly collect personal
            information from children under 13. Some NAPI programs (such as the Youth Policy Lab and Youth
            Voices) are open to participants as young as 15.{" "}
            <span style={placeholder}>
              [If participants under 18 may submit personal information through program applications or
              Youth Voices, confirm whether parental/guardian consent is required in the relevant
              jurisdictions and add that process here.]
            </span>
          </p>

          <h2 style={sectionTitle}>10. International Data Transfers</h2>
          <p style={body}>
            <span style={placeholder}>
              [If NAPI, its hosting providers, or its audience span multiple countries, describe how
              personal information may be transferred across borders and what safeguards apply. Depends on
              the final hosting provider locations.]
            </span>
          </p>

          <h2 style={sectionTitle}>11. Changes to This Policy</h2>
          <p style={body}>
            We may update this Privacy Policy from time to time. The &quot;Effective date&quot; at the top of
            this page will reflect the date of the latest revision. Material changes will be noted on this
            page.
          </p>

          <h2 style={sectionTitle}>12. Contact Us</h2>
          <p style={body}>
            If you have questions about this Privacy Policy or want to exercise any of the rights described
            above, contact us at{" "}
            <a href="mailto:contact@napipolicy.org" style={{ color: "var(--orange)", fontWeight: 600 }}>
              contact@napipolicy.org
            </a>
            . <span style={placeholder}>[Add a mailing address and, if applicable, a designated Data
            Protection Officer contact.]</span>
          </p>
        </div>
      </section>
    </>
  );
}
