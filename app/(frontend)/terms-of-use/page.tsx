import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { ogMeta } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Terms and conditions governing your use of the NAPI website at napipolicy.org.",
  ...ogMeta({
    title: "Terms of Use",
    description:
      "Terms and conditions governing your use of the NAPI website at napipolicy.org.",
    path: "/terms-of-use",
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

export default function TermsOfUsePage() {
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
          Terms of Use
        </h1>
        <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.75, maxWidth: 620 }}>
          Please read these terms before using napipolicy.org. By using this site, you agree to them.
        </p>
      </section>

      {/* Body */}
      <section style={{ background: "var(--cream)", padding: "clamp(2.5rem, 5vw, 64px) var(--section-px) clamp(3rem, 6vw, 96px)" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <h2 style={sectionTitle}>1. About NAPI</h2>
          <p style={body}>
            This website (&quot;the Site&quot;) is operated by the North Africa Policy Institute
            (&quot;NAPI,&quot; &quot;we,&quot; &quot;us&quot;), an independent, non-partisan and non-profit
            organization registered in Italy, with a registered address at Via Gustavo Giovannoni, 92,
            Rome, Italy.
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
            The Site provides information about NAPI and its work, including its research publications
            and its youth programs (Youth Policy Lab, Chill-Chat, NAPI-MEI Roundtables, and Youth Voices),
            along with a Contact Us form, a newsletter signup, and links to apply to or submit work for
            relevant programs and activities. The Site may also contain links to NAPI&apos;s official social
            media pages and other third-party websites or services.
          </p>

          <h2 style={sectionTitle}>4. Intellectual Property &amp; Use of Content</h2>
          <p style={body}>
            Unless otherwise noted, all content and materials made available through the Site, including
            NAPI&apos;s name, trademarks, logos, and branding, research, publications, reports, policy
            papers, methodologies, training materials, presentations, photographs, videos, graphics,
            designs and other materials developed by or for NAPI, are owned by NAPI or are used by NAPI
            with permission of the relevant rights holder and are protected by applicable copyright and
            other intellectual property laws.
          </p>
          <p style={body}>
            You may access and view materials available on the Site solely for personal, educational and
            research purposes. Except where NAPI expressly states otherwise in relation to particular
            material, you may not, without NAPI&apos;s prior written authorization, reproduce, copy,
            modify, adapt, translate, republish, distribute, publicly display, publicly communicate,
            create derivative works from, or commercially exploit any NAPI material or intellectual
            property, whether in whole or in part or in any format or medium.
          </p>
          <p style={body}>
            NAPI&apos;s name, logos, trademarks and other branding may not be reproduced, altered,
            incorporated into another mark or design, or used in any manner that suggests or implies
            NAPI&apos;s sponsorship, endorsement, affiliation, partnership or authorization without
            NAPI&apos;s prior written permission.
          </p>
          <p style={body}>
            Where NAPI expressly authorizes the use of any material, such use must comply with the terms
            of that authorization and must appropriately acknowledge NAPI as the source.
          </p>
          <p style={body}>
            The availability of materials on the Site does not transfer ownership of, or grant any licence
            or any other intellectual property rights in, those materials. All rights not expressly granted
            are reserved by NAPI and/or the relevant rights holder.
          </p>

          <h2 style={sectionTitle}>5. User Submissions</h2>
          <p style={body}>
            <strong style={{ color: "var(--navy)" }}>Youth Voices.</strong> If you submit writing through
            the Youth Voices program, accepting and publishing your work does not imply that NAPI endorses
            the opinions or arguments it contains — our support centers on the writing and publishing
            process itself, and publication does not reflect NAPI&apos;s own perspective on the content.
          </p>
          <p style={body}>
            By submitting your work to Youth Voices, you confirm that you are the author or otherwise have
            the necessary rights and permissions to submit the work and grant NAPI the exclusive right to
            review, edit, reproduce, publish, communicate to the public, distribute, disseminate, translate
            and adapt the submitted work, in whole or in part, through NAPI&apos;s website, publications,
            social media and other official communication or dissemination channels. This exclusive grant
            covers the rights necessary for NAPI to edit, publish and disseminate the work through its own
            channels. It does not affect any moral rights that cannot be transferred or waived under
            applicable law.
          </p>
          <p style={body}>
            NAPI&apos;s publication and dissemination of the work through its own channels does not grant
            NAPI an automatic right to commercially exploit the work. Any proposed commercial use or other
            use that may generate revenue for NAPI or a third party will be subject to a separate agreement
            with the author concerning the terms of such use and, where applicable, the allocation of any
            resulting revenue.
          </p>
          <p style={body}>
            NAPI may edit, adapt or otherwise modify submissions for editorial, linguistic, formatting or
            publication purposes. NAPI may determine whether, when, where and in what form a submission is
            published or disseminated and may decide not to publish or to discontinue publication of a
            submission.
          </p>
          <p style={body}>
            Authors may request the removal of their published work by contacting NAPI at{" "}
            <a href="mailto:contact@napipolicy.org" style={{ color: "var(--orange)", fontWeight: 600 }}>
              contact@napipolicy.org
            </a>
            . NAPI will consider such requests and, where appropriate, remove the work from the NAPI
            website and/or other NAPI-controlled publication channels, subject to any applicable legal,
            contractual, archival or other considerations.
          </p>
          <p style={body}>
            You may not submit material that infringes the copyright, privacy, confidentiality, reputation
            or other rights of another person or entity.
          </p>
          <p style={body}>
            <strong style={{ color: "var(--navy)" }}>Contact form and program applications.</strong> Any
            information or messages you submit through the Site must be accurate and must not impersonate
            another person, infringe on anyone&apos;s rights, or contain unlawful content.
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
            The Site links to third-party websites, platforms and services that NAPI does not control,
            including YouTube (for program videos), an external Google Form (for Youth Voices submissions),
            and NAPI&apos;s official pages on Facebook, Instagram and LinkedIn. Your use of those services
            is governed by their own terms and privacy policies, not these Terms of Use or NAPI&apos;s
            Privacy Policy. NAPI is not responsible for the content, availability, security, or privacy
            practices of third-party sites.
          </p>

          <h2 style={sectionTitle}>8. Disclaimer of Warranties</h2>
          <p style={body}>
            The Site and its content are provided &quot;as is&quot; and &quot;as available,&quot; to the
            extent permitted by applicable law, without warranties of any kind, whether express or implied,
            including but not limited to accuracy, completeness, or fitness for a particular purpose. While
            NAPI aims for rigorous, evidence-based research, its publications reflect the views, analysis
            and methodology of their authors at the time of publication and are provided for informational
            and research purposes. They should not be treated as professional, legal, or financial advice.
          </p>

          <h2 style={sectionTitle}>9. Limitation of Liability</h2>
          <p style={body}>
            To the fullest extent permitted by applicable law, NAPI shall not be liable for any indirect,
            incidental, special or consequential loss or damage arising out of or in connection with your
            use of, or inability to use, the Site or its content. Nothing in these Terms excludes or limits
            any liability that cannot lawfully be excluded or limited under applicable law.
          </p>

          <h2 style={sectionTitle}>10. Governing Law</h2>
          <p style={body}>
            These Terms of Use are governed by the laws of Italy, without prejudice to any mandatory
            provisions of applicable law. The courts of Rome shall have jurisdiction over disputes arising
            out of or in connection with these Terms, subject to any mandatory rules on jurisdiction that
            may apply.
          </p>

          <h2 style={sectionTitle}>11. Changes to These Terms</h2>
          <p style={body}>
            We may update these Terms of Use from time to time. The &quot;Effective date&quot; at the top
            of this page reflects the date of the latest revision. Where appropriate, material changes will
            be noted on this page. Continuing to use the Site after revised Terms are posted constitutes
            acceptance of the updated Terms, to the extent permitted by applicable law.
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
