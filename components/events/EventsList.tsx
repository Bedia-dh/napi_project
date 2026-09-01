"use client";

import Link from "next/link";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { pastEvents, plannedActivities } from "@/lib/data/events";

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

export default function EventsList() {
  return (
    <div style={{ background: "var(--cream)", padding: "0 0 96px" }}>
      {/* Header */}
      <div style={{ background: "var(--navy-dark)", padding: "72px var(--section-px) 56px", color: "#fff" }}>
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
          Events
        </p>
        <h1
          style={{
            fontSize: "clamp(1.8rem, 3.5vw, 2.75rem)",
            fontWeight: 800,
            letterSpacing: "-0.02em",
            marginBottom: "0.75rem",
          }}
        >
          Where We&apos;ve Been, What&apos;s Next
        </h1>
        <p
          style={{
            fontSize: "1rem",
            color: "rgba(255,255,255,.7)",
            maxWidth: 620,
            lineHeight: 1.6,
          }}
        >
          A record of NAPI&apos;s workshops, webinars, and conferences, alongside
          the programs currently open for participation.
        </p>
      </div>

      <div style={{ padding: "56px var(--section-px) 0" }}>
        {/* Ongoing & Upcoming */}
        {/* <section style={{ marginBottom: 56 }}>
          <h2
            style={{
              fontSize: "1.4rem",
              fontWeight: 800,
              color: "var(--navy)",
              marginBottom: 24,
            }}
          >
            Ongoing &amp; Upcoming
          </h2>
          {plannedActivities.length === 0 ? (
            <p style={{ color: "var(--gray-mid)" }}>
              Nothing currently open - check back soon.
            </p>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: 20,
              }}
            >
              {plannedActivities.map((e) => (
                <div
                  key={e.id}
                  style={{
                    background: "#fff",
                    borderRadius: 12,
                    padding: 26,
                    boxShadow: "0 2px 12px rgba(0,0,0,.08)",
                    borderTop: `3px solid ${e.color ?? "var(--navy)"}`,
                  }}
                >
                  {e.program && (
                    <div
                      style={{
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        color: "var(--orange)",
                        marginBottom: 10,
                      }}
                    >
                      {e.program}
                    </div>
                  )}
                  <h3
                    style={{
                      fontSize: "1.02rem",
                      fontWeight: 700,
                      color: "var(--navy)",
                      marginBottom: 10,
                      lineHeight: 1.4,
                    }}
                  >
                    {e.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.88rem",
                      color: "var(--gray-mid)",
                      lineHeight: 1.65,
                    }}
                  >
                    {e.description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section> */}

        {/* Past Events */}
        <section>
          <h2
            style={{
              fontSize: "1.4rem",
              fontWeight: 800,
              color: "var(--navy)",
              marginBottom: 24,
            }}
          >
            Past Events
          </h2>
          {pastEvents.length === 0 ? (
            <p style={{ color: "var(--gray-mid)" }}>
              No past events recorded yet.
            </p>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))",
                gap: 24,
              }}
            >
              {pastEvents.map((e) => (
                <Link
                  key={e.id}
                  href={`/events/${e.slug}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div
                    style={{
                      background: "#fff",
                      borderRadius: 12,
                      overflow: "hidden",
                      boxShadow: "0 2px 12px rgba(0,0,0,.08)",
                      transition: "transform 0.2s, box-shadow 0.2s",
                      cursor: "pointer",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                    onMouseEnter={(ev) => {
                      ev.currentTarget.style.transform = "translateY(-3px)";
                      ev.currentTarget.style.boxShadow =
                        "0 8px 24px rgba(0,0,0,.12)";
                    }}
                    onMouseLeave={(ev) => {
                      ev.currentTarget.style.transform = "none";
                      ev.currentTarget.style.boxShadow =
                        "0 2px 12px rgba(0,0,0,.08)";
                    }}
                  >
                    {/* Event image */}
                    {e.imageUrl && (
                      <div
                        style={{
                          width: "100%",
                          height: 200,
                          overflow: "hidden",
                        }}
                      >
                        <img
                          src={e.imageUrl}
                          alt={e.title}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            transition: "transform 0.3s",
                          }}
                          onMouseEnter={(ev) => {
                            ev.currentTarget.style.transform = "scale(1.05)";
                          }}
                          onMouseLeave={(ev) => {
                            ev.currentTarget.style.transform = "scale(1)";
                          }}
                        />
                      </div>
                    )}

                    <div
                      style={{
                        padding: "20px 24px 24px",
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      {/* Type badge + date + location */}
                      <div
                        style={{
                          display: "flex",
                          gap: 8,
                          alignItems: "center",
                          marginBottom: 10,
                          flexWrap: "wrap",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "0.65rem",
                            fontWeight: 700,
                            padding: "3px 9px",
                            borderRadius: 3,
                            textTransform: "uppercase",
                            letterSpacing: "0.05em",
                            background:
                              typeColors[e.type] ?? "var(--navy)",
                            color: "#fff",
                          }}
                        >
                          {typeLabels[e.type] ?? e.type}
                        </span>
                        {e.date && (
                          <span
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 4,
                              fontSize: "0.75rem",
                              color: "var(--gray-mid)",
                            }}
                          >
                            <Calendar size={12} /> {e.date}
                          </span>
                        )}
                        {e.location && (
                          <span
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 4,
                              fontSize: "0.75rem",
                              color: "var(--gray-mid)",
                            }}
                          >
                            <MapPin size={12} /> {e.location}
                          </span>
                        )}
                      </div>

                      <h3
                        style={{
                          fontSize: "1rem",
                          fontWeight: 700,
                          color: "var(--navy)",
                          marginBottom: 8,
                          lineHeight: 1.4,
                        }}
                      >
                        {e.title}
                      </h3>
                      <p
                        style={{
                          fontSize: "0.85rem",
                          color: "var(--gray-mid)",
                          lineHeight: 1.6,
                          marginBottom: 14,
                          flex: 1,
                        }}
                      >
                        {e.description}
                      </p>

                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 5,
                          fontSize: "0.82rem",
                          color: "var(--orange)",
                          fontWeight: 600,
                        }}
                      >
                        Read more <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
