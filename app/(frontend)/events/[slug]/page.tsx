import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, MapPin, ArrowLeft, Users } from "lucide-react";
import { pastEvents } from "@/lib/data/events";
import NewsletterSection from "@/components/home/NewsletterSection";

const typeLabels: Record<string, string> = {
  "chill-chat": "Chill Chat",
  conference: "Conference",
  workshop: "Workshop",
  webinar: "Webinar",
};

const typeColors: Record<string, string> = {
  "chill-chat": "var(--chill-color)",
  conference: "var(--navy)",
  workshop: "var(--labs-color)",
  webinar: "var(--voices-color)",
};

function getEvent(slug: string) {
  return pastEvents.find((e) => e.slug === slug) ?? null;
}

export function generateStaticParams() {
  return pastEvents.map((e) => ({ slug: e.slug }));
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = getEvent(slug);

  if (!event) notFound();

  const paragraphs = event.body
    ? event.body.split("\n\n").filter((p) => p.trim())
    : [event.description];

  const partnerList = event.partners
    ? event.partners.split(",").map((p) => p.trim())
    : [];

  return (
    <>
      <div style={{ background: "var(--cream)", minHeight: "100vh" }}>
        {/* Hero header with image */}
        <div
          style={{
            position: "relative",
            background: "var(--navy-dark)",
            overflow: "hidden",
          }}
        >
          {event.imageUrl && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: `url(${event.imageUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: 0.2,
              }}
            />
          )}
          <div
            style={{
              position: "relative",
              padding: "48px 80px 56px",
              maxWidth: 900,
            }}
          >
            {/* Back link */}
            <Link
              href="/events"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontSize: "0.82rem",
                color: "rgba(255,255,255,.7)",
                textDecoration: "none",
                marginBottom: 24,
                transition: "color 0.2s",
              }}
            >
              <ArrowLeft size={14} /> Back to Events
            </Link>

            {/* Type badge */}
            <div style={{ marginBottom: 16 }}>
              <span
                style={{
                  fontSize: "0.68rem",
                  fontWeight: 700,
                  padding: "4px 12px",
                  borderRadius: 4,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  background: typeColors[event.type] ?? "var(--navy)",
                  color: "#fff",
                }}
              >
                {typeLabels[event.type] ?? event.type}
              </span>
            </div>

            {/* Title */}
            <h1
              style={{
                fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
                fontWeight: 800,
                color: "#fff",
                letterSpacing: "-0.02em",
                lineHeight: 1.25,
                marginBottom: 20,
              }}
            >
              {event.title}
            </h1>

            {/* Meta row */}
            <div
              style={{
                display: "flex",
                gap: 20,
                flexWrap: "wrap",
                fontSize: "0.88rem",
                color: "rgba(255,255,255,.75)",
              }}
            >
              {event.date && (
                <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <Calendar size={15} /> {event.date}
                </span>
              )}
              {event.location && (
                <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <MapPin size={15} /> {event.location}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div
          style={{
            maxWidth: 820,
            margin: "0 auto",
            padding: "48px 80px 72px",
          }}
        >
          {/* Event image (full) */}
          {event.imageUrl && (
            <div
              style={{
                borderRadius: 12,
                overflow: "hidden",
                marginBottom: 40,
                boxShadow: "0 4px 20px rgba(0,0,0,.1)",
              }}
            >
              <img
                src={event.imageUrl}
                alt={event.title}
                style={{
                  width: "100%",
                  display: "block",
                  maxHeight: 450,
                  objectFit: "cover",
                }}
              />
            </div>
          )}

          {/* Body paragraphs */}
          <div style={{ marginBottom: 40 }}>
            {paragraphs.map((para, i) => {
              const isListItem = /^\d+\.\s/.test(para.trim());
              if (isListItem) {
                return (
                  <div
                    key={i}
                    style={{
                      background: "#fff",
                      borderLeft: "3px solid var(--orange)",
                      padding: "12px 18px",
                      marginBottom: 8,
                      borderRadius: "0 8px 8px 0",
                      fontSize: "0.95rem",
                      color: "var(--navy)",
                      lineHeight: 1.65,
                    }}
                  >
                    {para}
                  </div>
                );
              }
              return (
                <p
                  key={i}
                  style={{
                    fontSize: "1.02rem",
                    color: "#3a3f4b",
                    lineHeight: 1.8,
                    marginBottom: 20,
                  }}
                >
                  {para}
                </p>
              );
            })}
          </div>

          {/* Partners */}
          {partnerList.length > 0 && (
            <div
              style={{
                background: "#fff",
                borderRadius: 12,
                padding: "24px 28px",
                boxShadow: "0 2px 12px rgba(0,0,0,.06)",
                marginBottom: 32,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 14,
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "var(--orange)",
                }}
              >
                <Users size={15} /> Partners & Co-organizers
              </div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {partnerList.map((partner, i) => (
                  <span
                    key={i}
                    style={{
                      fontSize: "0.88rem",
                      color: "var(--navy)",
                      background: "var(--cream)",
                      padding: "6px 14px",
                      borderRadius: 6,
                      fontWeight: 500,
                    }}
                  >
                    {partner}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Original source link */}
          {event.sourceUrl && (
            <a
              href={event.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontSize: "0.88rem",
                color: "var(--orange)",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              View original article &rarr;
            </a>
          )}
        </div>
      </div>

      <NewsletterSection />
    </>
  );
}
