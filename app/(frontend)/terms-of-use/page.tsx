import type { CSSProperties } from "react";

export const metadata = {
  title: "Terms of Use - NAPI",
};

// DRAFT — see the list of bracketed placeholders below before publishing.
// Mirrors what the site actually does today (open-access publications,
// program applications, the contact form, and the external Youth Voices
// Google Form). Anything requiring a legal/policy decision — governing law,
// content license type, liability caps — is left blank for NAPI and counsel
// to fill in. Search this file for "[" to find every placeholder.

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

export default function TermsOfUsePage() {
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
          Terms of Use
        </h1>
        <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.75, maxWidth: 620 }}>
          Effective date: <span style={placeholder}>[effective date]</span>. Please read these terms before
          using napipolicy.org. By using this site, you agree to them.
        </p>
      </section>

      {/* Body */}
      <section style={{ background: "var(--cream)", padding: "64px 80px 96px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <h2 style={sectionTitle}>1. About NAPI</h2>
          <p style={body}>
            This website (&quot;the Site&quot;) is operated by the North Africa Policy Institute
            (&quot;NAPI,&quot; &quot;we,&quot; &quot;us&quot;),{" "}
            <span style={placeholder}>[legal entity name and registration/jurisdiction]</span>, with a
            registered address at <span style={placeholder}>[registered address]</span>.
          </p>

          <h2 style={sectionTitle}>2. Acceptance of Terms</h2>
          <p style={body}>
            By accessing or using napipolicy.org, you agree to be bound by these Terms of Use and our{" "}
            <a href="/privacy-policy" style={{ color: "var(--orange)", fontWeight: 600 }}>
              Privacy Policy
            </a>
            . If you do not agree, please do not use the Site.
          </p>

          <h2 style={sectionTitle}>3. What This Site Offers</h2>
          <p style={body}>
            The Site provides information about NAPI, its research publications, and its youth programs
            (Youth Policy Lab, Chill-Chat, NAPI-MEI Roundtables, and Youth Voices), along with a contact
            form, a newsletter signup, and links to apply to or submit work for these programs.
          </p>

          <h2 style={sectionTitle}>4. Intellectual Property &amp; Use of Content</h2>
          <p style={body}>
            Unless otherwise noted, the text, design, logo, and branding of the Site are owned by NAPI and
            protected by copyright and other intellectual property laws. You may not reproduce, distribute,
            or create derivative works from Site branding without our prior written permission.
          </p>
          <p style={body}>
            NAPI publishes its research as open access, freely available in English, French, and Arabic.{" "}
            <span style={placeholder}>
              [Specify the exact license publications are released under — e.g. Creative Commons
              Attribution (CC BY), Attribution-NonCommercial (CC BY-NC), or "available for personal and
              educational use, with attribution to NAPI required" — so readers know precisely what reuse is
              permitted.]
            </span>
          </p>

          <h2 style={sectionTitle}>5. User Submissions</h2>
          <p style={body}>
            <strong style={{ color: "var(--navy)" }}>Youth Voices.</strong> If you submit writing through
            the Youth Voices program, accepting and publishing your work does not imply that NAPI endorses
            the opinions or arguments it contains — our support centers on the writing and publishing
            process itself, and publication does not reflect NAPI&apos;s own perspective on the content.{" "}
            <span style={placeholder}>
              [Specify what rights NAPI needs from contributors to publish their work — e.g. a
              non-exclusive license to publish and distribute, while the author keeps ownership/copyright —
              and whether contributors can request removal after publication.]
            </span>
          </p>
          <p style={body}>
            <strong style={{ color: "var(--navy)" }}>Contact form and program applications.</strong> Any
            information or messages you submit through the Site must be accurate and must not
            impersonate another person, infringe on anyone&apos;s rights, or contain unlawful content.
          </p>

          <h2 style={sectionTitle}>6. Prohibited Uses</h2>
          <p style={body}>
            When using the Site, you agree not to: violate any applicable law; attempt to gain unauthorized
            access to the Site, its admin systems, or its underlying data; interfere with or disrupt the
            Site&apos;s operation (including through malware, excessive automated requests, or similar
            means); or use the Site to transmit harassing, defamatory, or unlawful content.
          </p>

          <h2 style={sectionTitle}>7. Third-Party Links and Services</h2>
          <p style={body}>
            The Site links to third-party services we do not control, including YouTube (for program
            videos) and an external Google Form (for Youth Voices submissions). Your use of those services
            is governed by their own terms and privacy policies, not this one. NAPI is not responsible for
            the content, availability, or practices of third-party sites we link to.
          </p>

          <h2 style={sectionTitle}>8. Disclaimer of Warranties</h2>
          <p style={body}>
            The Site and its content are provided &quot;as is&quot; and &quot;as available,&quot; without
            warranties of any kind, whether express or implied, including but not limited to accuracy,
            completeness, or fitness for a particular purpose. While NAPI aims for rigorous, evidence-based
            research, our publications reflect the views and methodology of their authors at the time of
            publication and should not be treated as professional, legal, or financial advice.
          </p>

          <h2 style={sectionTitle}>9. Limitation of Liability</h2>
          <p style={body}>
            <span style={placeholder}>
              [Add a liability limitation clause appropriate to NAPI&apos;s jurisdiction and legal structure
              — e.g. "To the fullest extent permitted by law, NAPI shall not be liable for any indirect,
              incidental, or consequential damages arising from your use of the Site." This should be
              reviewed by counsel, since enforceability varies significantly by country.]
            </span>
          </p>

          <h2 style={sectionTitle}>10. Governing Law</h2>
          <p style={body}>
            <span style={placeholder}>
              [State which country/region&apos;s law governs these Terms and where any disputes would be
              resolved — typically the jurisdiction where NAPI is legally registered.]
            </span>
          </p>

          <h2 style={sectionTitle}>11. Changes to These Terms</h2>
          <p style={body}>
            We may update these Terms of Use from time to time. The &quot;Effective date&quot; at the top of
            this page reflects the date of the latest revision. Continuing to use the Site after changes are
            posted means you accept the updated Terms.
          </p>

          <h2 style={sectionTitle}>12. Contact Us</h2>
          <p style={body}>
            Questions about these Terms of Use can be sent to{" "}
            <a href="mailto:contact@napipolicy.org" style={{ color: "var(--orange)", fontWeight: 600 }}>
              contact@napipolicy.org
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
