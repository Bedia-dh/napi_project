import type { Metadata } from "next";
import Link from "next/link";
import { Users, Handshake, Mail, Rss, MessageSquare } from "lucide-react";
import { InteractiveHoverButton } from "@/components/ui/InteractiveHoverButton";
import { ogMeta } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Get Involved",
  description:
    "Join NAPI and help shape society and public policy. Whether you are a young person or a partner, there are many ways to engage with our work.",
  ...ogMeta({
    title: "Get Involved",
    description:
      "Join NAPI — whether you are a young person or a partner, there are many ways to engage.",
    path: "/get-involved",
  }),
};

const youthPoints = [
  "Join policy dialogues, roundtables, Chill-Chats, and community activities.",
  "Share your perspectives on issues affecting young people and your community.",
  "Contribute to research, policy discussions, publications, and consultations.",
  "Develop your skills through training, mentorship, facilitation, and peer learning.",
  "Connect with young leaders, researchers, practitioners, and civil society actors across North Africa.",
  "Propose ideas, lead discussions, and help co-create future NAPI initiatives.",
  "Discover opportunities to grow your experience in policy, research, and civic engagement.",
];

const partnerPoints = [
  "Co-design and implement programs and initiatives.",
  "Support youth-led activities and emerging ideas.",
  "Collaborate on research, policy analysis, consultations, and publications.",
  "Host roundtables, Chill-Chats, workshops, trainings, and public discussions.",
  "Provide mentorship, expertise, facilitation, or technical support.",
  "Support programs through funding, resources, or in-kind contributions.",
  "Create learning, networking, and professional opportunities for young people.",
  "Connect NAPI and its community with new networks, institutions, and decision-makers.",
  "Strengthen regional and South-South cooperation.",
  "Bring forward a completely new idea that we can explore together.",
];

export default function GetInvolvedPage() {
  return (
    <>
      {/* Hero */}
      <section
        style={{
          background: "var(--navy-dark)",
          padding: "clamp(2.5rem, 5vw, 64px) var(--section-px) clamp(2rem, 4vw, 56px)",
        }}
      >
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
          Get Involved
        </p>
        <h1
          style={{
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 800,
            color: "#fff",
            letterSpacing: "-0.02em",
            marginBottom: "1.25rem",
            maxWidth: 700,
          }}
        >
          Join NAPI and Help Shape Society and Public Policy
        </h1>
        <p
          style={{
            fontSize: "1.05rem",
            color: "rgba(255,255,255,0.7)",
            lineHeight: 1.75,
            maxWidth: 680,
          }}
        >
          At NAPI, we believe young people should not only be included in conversations about the
          future of the Mediterranean — they should help shape, lead, and influence them. Whether
          you are a young person looking to learn and contribute, or an organization interested in
          collaborating, there are many ways to engage with our work.
        </p>
      </section>

      {/* For Young People */}
      <section style={{ background: "#fff", padding: "clamp(2.5rem, 5vw, 72px) var(--section-px)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
            <Users size={28} color="var(--orange)" />
            <h2 style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)", fontWeight: 800, color: "var(--navy)" }}>
              For Young People
            </h2>
          </div>
          <p style={{ color: "var(--gray-mid)", fontSize: "1rem", lineHeight: 1.7, marginBottom: "1.5rem" }}>
            Looking for a space to learn, contribute, connect, and make your voice count? Through
            NAPI, you can:
          </p>

          <ul style={{ margin: "0 0 2rem", paddingLeft: "1.25rem", listStyle: "disc" }}>
            {youthPoints.map((point) => (
              <li
                key={point}
                style={{
                  color: "var(--navy)",
                  fontSize: "0.95rem",
                  lineHeight: 1.8,
                  marginBottom: "0.5rem",
                }}
              >
                {point}
              </li>
            ))}
          </ul>

          <p style={{ color: "var(--gray-mid)", fontSize: "0.95rem", lineHeight: 1.7, marginBottom: "1.5rem" }}>
            Your knowledge, experience, and ideas can contribute to better policy conversations and
            stronger communities.
          </p>

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <InteractiveHoverButton
              href="https://www.facebook.com/groups/3328078120799524"
              variant="navy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Join the Community
            </InteractiveHoverButton>
            <InteractiveHoverButton
              href="https://docs.google.com/forms/d/e/1FAIpQLSebKkuRGzjsq5TJjqYwhPXh9XsOCgZQeJ4cFQojP-sBpPFxzw/viewform?pli=1"
              variant="orange"
              target="_blank"
              rel="noopener noreferrer"
            >
              Share Your Ideas
            </InteractiveHoverButton>
            <InteractiveHoverButton href="#newsletter" variant="navy">
              Subscribe to Updates
            </InteractiveHoverButton>
          </div>
        </div>
      </section>

      {/* For Partners */}
      <section style={{ background: "var(--cream)", padding: "clamp(2.5rem, 5vw, 72px) var(--section-px)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
            <Handshake size={28} color="var(--orange)" />
            <h2 style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)", fontWeight: 800, color: "var(--navy)" }}>
              For Partners
            </h2>
          </div>
          <p style={{ color: "var(--gray-mid)", fontSize: "1rem", lineHeight: 1.7, marginBottom: "0.75rem" }}>
            We welcome partnerships with everyone who shares an interest in youth engagement, policy,
            research, dialogue, learning, and positive change across the Mediterranean. This can
            include individuals, civil society organizations, universities, researchers, public
            institutions, international organizations, foundations, donors, companies, networks,
            community initiatives, cultural spaces, and youth-led groups.
          </p>
          <p style={{ color: "var(--gray-mid)", fontSize: "1rem", lineHeight: 1.7, marginBottom: "1.5rem" }}>
            There is no single way to partner with NAPI. We are open to collaborations that are
            creative, practical, and mutually beneficial. You can work with us to:
          </p>

          <ul style={{ margin: "0 0 2rem", paddingLeft: "1.25rem", listStyle: "disc" }}>
            {partnerPoints.map((point) => (
              <li
                key={point}
                style={{
                  color: "var(--navy)",
                  fontSize: "0.95rem",
                  lineHeight: 1.8,
                  marginBottom: "0.5rem",
                }}
              >
                {point}
              </li>
            ))}
          </ul>

          {/* Partner CTA */}
          <div
            style={{
              background: "var(--navy-dark)",
              borderRadius: 12,
              padding: "2rem",
              marginTop: "1rem",
            }}
          >
            <h3 style={{ color: "#fff", fontWeight: 800, fontSize: "1.25rem", marginBottom: "0.75rem" }}>
              Partner With NAPI
            </h3>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.95rem", lineHeight: 1.7, marginBottom: "1.25rem" }}>
              Have an idea, opportunity, program, event, resource, expertise, or partnership you
              would like to explore? We welcome partnerships in all forms and are always open to
              hearing new ideas. If you believe there is a way we can create value together, we
              would be happy to hear from you.
            </p>
            <InteractiveHoverButton href="mailto:info@napipolicy.org" variant="orangeOnDark">
              <Mail size={16} style={{ marginRight: 6 }} /> Email Us
            </InteractiveHoverButton>
          </div>
        </div>
      </section>

      {/* Stay Connected */}
      <section style={{ background: "#fff", padding: "clamp(2rem, 4vw, 56px) var(--section-px)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--navy)", marginBottom: "0.75rem" }}>
            Stay Connected
          </h2>
          <p style={{ color: "var(--gray-mid)", fontSize: "0.95rem", lineHeight: 1.7, marginBottom: "1.5rem", maxWidth: 600, margin: "0 auto 1.5rem" }}>
            Follow NAPI&apos;s programmes, opportunities, research, events, and community
            activities, and find the way of engaging that works best for you.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <a
              href="https://northafricanpolicyinitiative.substack.com/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                background: "var(--navy)",
                color: "#fff",
                padding: "10px 20px",
                borderRadius: 8,
                fontWeight: 600,
                fontSize: "0.88rem",
                textDecoration: "none",
              }}
            >
              <Rss size={16} /> Subscribe
            </a>
            <a
              href="https://www.facebook.com/groups/3328078120799524"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                background: "var(--orange)",
                color: "#fff",
                padding: "10px 20px",
                borderRadius: 8,
                fontWeight: 600,
                fontSize: "0.88rem",
                textDecoration: "none",
              }}
            >
              <Users size={16} /> Join the Community
            </a>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSebKkuRGzjsq5TJjqYwhPXh9XsOCgZQeJ4cFQojP-sBpPFxzw/viewform?pli=1"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                background: "var(--navy)",
                color: "#fff",
                padding: "10px 20px",
                borderRadius: 8,
                fontWeight: 600,
                fontSize: "0.88rem",
                textDecoration: "none",
              }}
            >
              <MessageSquare size={16} /> Share an Idea
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
