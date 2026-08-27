import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { ogMeta } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How NAPI collects, uses, and protects your personal information on napipolicy.org.",
  ...ogMeta({
    title: "Privacy Policy",
    description:
      "How NAPI collects, uses, and protects your personal information on napipolicy.org.",
    path: "/privacy-policy",
  }),
};

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

export default function PrivacyPolicyPage() {
  return (
    <>
      {/* Header */}
      <section style={{ background: "var(--navy-dark)", padding: "clamp(2.5rem, 5vw, 64px) var(--section-px) clamp(2rem, 4vw, 56px)" }}>
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
          This policy explains what information the North Africa Policy Institute
          (&quot;NAPI,&quot; &quot;we,&quot; &quot;us&quot;) collects through or in connection with
          napipolicy.org, how we use it, and the choices available to you.
        </p>
      </section>

      {/* Body */}
      <section style={{ background: "var(--cream)", padding: "clamp(2.5rem, 5vw, 64px) var(--section-px) clamp(3rem, 6vw, 96px)" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <p style={body}>
            NAPI is the North Africa Policy Institute, an independent, non-partisan and non-profit
            organization registered in Italy, with a registered address at Via Gustavo Giovannoni, 92,
            Rome, Italy.
          </p>

          <h2 style={sectionTitle}>1. Information We Collect</h2>
          <p style={body}>
            We collect information through the website and, where applicable, through third-party
            services or platforms linked to the website, in the following ways:
          </p>
          <p style={body}>
            <strong style={{ color: "var(--navy)" }}>Contact form.</strong> When you use the Contact Us
            form on our website, we collect the information you provide, which may include your name,
            email address, the subject of your enquiry and the content of your message. This information
            is stored so that our team can receive, review and respond to your enquiry.
          </p>
          <p style={body}>
            Providing information through the Contact Us form is voluntary; however, if you do not
            provide information necessary for us to respond, we may not be able to respond to your enquiry.
          </p>
          <p style={body}>
            <strong style={{ color: "var(--navy)" }}>Newsletter signup.</strong> If you subscribe to our
            newsletter through the website, we collect your email address in order to send you NAPI&apos;s
            newsletter, publications, policy briefs, event announcements and other communications.
            Providing your email address for newsletter subscription is voluntary. If you do not provide
            it, you will not be able to subscribe to the NAPI newsletter.
          </p>
          <p style={body}>
            <strong style={{ color: "var(--navy)" }}>Youth Voices submissions.</strong> Submitting writing
            through the &quot;Submit Your Work&quot; button takes you to an external Google Form. The
            information you provide is submitted through that external form and may be received and
            processed by NAPI for the purposes of administering the Youth Voices program and reviewing
            and, where applicable, publishing submissions. The collection and processing of information
            through the external form may also be subject to Google&apos;s applicable privacy practices.
          </p>
          <p style={body}>
            <strong style={{ color: "var(--navy)" }}>Photographs, videos and other visual material.</strong>{" "}
            NAPI may take photographs and/or make video or audio recordings during its events, activities,
            training sessions, workshops and other activities for purposes such as documenting and
            communicating its work, including through its website and NAPI&apos;s official social media
            channels. Where individuals are identifiable, NAPI will provide appropriate information about
            the intended use of such material and, where required, seek the relevant consent or rely on
            another applicable lawful basis before publication.
          </p>
          <p style={body}>
            Where photographs, videos or other visual material are submitted to NAPI by individuals or
            participants, NAPI may use them for the purposes for which they were submitted, subject to
            any applicable consent or other rights and permissions.
          </p>
          <p style={body}>
            If you have a concern about the publication of a photograph, video or other visual material
            on the website that identifies you, you may contact NAPI at{" "}
            <a href="mailto:contact@napipolicy.org" style={{ color: "var(--orange)", fontWeight: 600 }}>
              contact@napipolicy.org
            </a>.
          </p>
          <p style={body}>
            <strong style={{ color: "var(--navy)" }}>Social media and third-party links.</strong> The
            website may contain links to NAPI&apos;s official pages on third-party social media platforms,
            including Facebook, Instagram and LinkedIn. Clicking on these links will take you to the
            relevant third-party platform. NAPI does not control the privacy practices or data-processing
            activities of these platforms, which are subject to their respective terms and privacy policies.
          </p>
          <p style={body}>
            <strong style={{ color: "var(--navy)" }}>Automatically collected information.</strong> When
            you visit the website, certain technical information may be processed automatically by the
            website&apos;s hosting and technical infrastructure, such as your IP address, browser type,
            device type and pages viewed, for purposes including website security, technical administration
            and performance.
          </p>

          <h2 style={sectionTitle}>2. Cookies</h2>
          <p style={body}>
            The public site does not currently set any analytics, advertising, or marketing cookies. The
            only cookies in use are strictly necessary cookies associated with the technical operation of
            the website, including session cookies used for staff access to the content management system
            where applicable. These are not used to track ordinary visitors for advertising or marketing
            purposes.
          </p>

          <h2 style={sectionTitle}>3. How We Use Your Information</h2>
          <p style={body}>
            We use the information described above to: receive and respond to inquiries submitted through
            the Contact Us form; send newsletter communications to subscribers who opted in; administer
            and consider Youth Voices submissions where information is provided through the external form
            linked from the website; document and communicate NAPI&apos;s activities through photographs,
            videos and other visual material where applicable; maintain the security and proper functioning
            of the website; and comply with our legal obligations.
          </p>
          <p style={body}>
            We do not sell your personal information, and we do not use personal information collected
            through the website for advertising.
          </p>

          <h2 style={sectionTitle}>4. Legal Basis for Processing</h2>
          <p style={body}>
            NAPI processes personal information collected through the website in accordance with applicable
            data-protection laws. The legal basis for processing depends on the nature and purpose of the
            processing.
          </p>
          <p style={body}>
            Where processing is based on consent, you may withdraw your consent at any time, without
            affecting the lawfulness of processing carried out before withdrawal.
          </p>

          <h2 style={sectionTitle}>5. Sharing of Information</h2>
          <p style={body}>
            We do not sell or rent your personal information. We may share personal information collected
            through or in connection with the website with:
          </p>
          <p style={body}>
            <strong style={{ color: "var(--navy)" }}>Service providers</strong> who help us operate the
            site, such as our hosting provider, database provider, and newsletter/email delivery provider
            and other technical service providers used to maintain, secure or operate the website.
          </p>
          <p style={body}>
            <strong style={{ color: "var(--navy)" }}>Legal requirements,</strong> where disclosure is
            required or permitted under applicable law, regulation, or valid legal process.
          </p>

          <h2 style={sectionTitle}>6. Data Retention</h2>
          <p style={body}>
            NAPI retains personal information collected through the website only for as long as necessary
            for the purpose for which it was collected, subject to applicable legal or administrative
            requirements.
          </p>

          <h2 style={sectionTitle}>7. Data Security</h2>
          <p style={body}>
            We take reasonable technical and organizational measures to protect the personal information
            processed through the website. However, no method of transmission over the internet or
            electronic storage is completely secure, and we cannot guarantee absolute security.
          </p>

          <h2 style={sectionTitle}>8. Your Rights</h2>
          <p style={body}>
            You have the right, in accordance with applicable law, to access personal information
            concerning you that is processed by NAPI, to request the correction, completion, updating or
            modification of such information where applicable, to withdraw your consent to processing
            where processing is based on consent, and to object to the processing of your personal
            information in accordance with applicable law. You may also have other rights provided by
            applicable law.
          </p>
          <p style={body}>
            You may unsubscribe from our newsletter at any time using the link provided in any newsletter
            email. To exercise your rights or raise a question concerning the processing of your personal
            information through the website, you may contact us at{" "}
            <a href="mailto:contact@napipolicy.org" style={{ color: "var(--orange)", fontWeight: 600 }}>
              contact@napipolicy.org
            </a>.
          </p>

          <h2 style={sectionTitle}>9. Children&apos;s Privacy</h2>
          <p style={body}>
            Our general website is not directed at children and we do not knowingly seek to collect
            personal information from children through the public website. Some NAPI programs (such as
            the Youth Policy Lab and Youth Voices) are open to participants as young as 15. Where those
            programs involve the collection of personal information from young participants, the relevant
            application or participation process may be subject to additional privacy information and
            consent requirements.
          </p>

          <h2 style={sectionTitle}>10. International Data Transfers</h2>
          <p style={body}>
            Personal information collected through the website may be processed or stored in countries
            other than the country in which you are located, depending on the hosting, storage, newsletter
            and other third-party services used by NAPI. Where applicable, NAPI will take the measures
            required by the relevant data-protection laws governing such processing or transfers.
          </p>

          <h2 style={sectionTitle}>11. Changes to This Policy</h2>
          <p style={body}>
            We may update this Privacy Policy from time to time. The &quot;Effective date&quot; at the top
            of this page will reflect the date of the latest revision. Where appropriate, material changes
            will be noted on this page.
          </p>

          <h2 style={sectionTitle}>12. Contact Us</h2>
          <p style={body}>
            If you have questions about this Privacy Policy or want to exercise any of the rights available
            to you in relation to personal information processed through the website, contact us at{" "}
            <a href="mailto:contact@napipolicy.org" style={{ color: "var(--orange)", fontWeight: 600 }}>
              contact@napipolicy.org
            </a>. Our registered address is Via Gustavo Giovannoni, 92, Rome, Italy.
          </p>
        </div>
      </section>
    </>
  );
}
