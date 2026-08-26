"use client";

import { useEffect, useState } from "react";
import { Calendar, MapPin, ExternalLink } from "lucide-react";

interface EventDoc {
  id: string;
  status: "past" | "planned";
  title: string;
  type: string;
  date?: string;
  program?: string;
  description: string;
  location?: string;
  registrationUrl?: string;
  sourceUrl?: string;
}

const typeColors: Record<string, string> = {
  "chill-chat": "var(--chill-color)",
  conference: "var(--navy)",
  workshop: "var(--labs-color)",
  webinar: "var(--voices-color)",
};

export default function EventsList() {
  const [events, setEvents] = useState<EventDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/events")
      .then((res) => res.json())
      .then((data: { docs: EventDoc[]; source: string }) => {
        setEvents(data.docs);
        setSource(data.source);
      })
      .catch(() => setEvents([]))
      .finally(() => setLoading(false));
  }, []);

  const past = events.filter((e) => e.status === "past");
  const planned = events.filter((e) => e.status === "planned");

  return (
    <div style={{ background: "var(--cream)", padding: "0 0 96px" }}>
      {/* Header */}
      <div style={{ background: "var(--navy-dark)", padding: `72px var(--section-px) 56px`, color: "#fff" }}>
        <p style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "var(--orange)", marginBottom: "0.75rem" }}>
          Events
        </p>
        <h1 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.75rem)", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: "0.75rem" }}>
          Where We&apos;ve Been, What&apos;s Next
        </h1>
        <p style={{ fontSize: "1rem", color: "rgba(255,255,255,.7)", maxWidth: 620, lineHeight: 1.6 }}>
          A record of NAPI&apos;s workshops, webinars, and conferences, alongside the programs currently open for participation.
        </p>
      </div>

      {process.env.NODE_ENV !== "production" && source === "static-fallback" && (
        <div style={{ margin: `24px var(--section-px) 0`, background: "#fff3eb", border: "1px dashed var(--orange)", borderRadius: 8, padding: "8px 14px", fontSize: "0.78rem", color: "var(--gray-mid)" }}>
          Dev note: serving events from the static dataset - connect DATABASE_URI to query MongoDB via Payload instead.
        </div>
      )}

      <div style={{ padding: `56px var(--section-px) 0` }}>
        {/* Planned activities */}
        <section style={{ marginBottom: 56 }}>
          <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--navy)", marginBottom: 24 }}>
            Ongoing &amp; Upcoming
          </h2>
          {loading ? (
            <p style={{ color: "var(--gray-mid)" }}>Loading&hellip;</p>
          ) : planned.length === 0 ? (
            <p style={{ color: "var(--gray-mid)" }}>Nothing currently open - check back soon.</p>
          ) : (
            <div className="events-planned-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
              {planned.map((e) => (
                <div
                  key={e.id}
                  style={{
                    background: "#fff",
                    borderRadius: 12,
                    padding: 26,
                    boxShadow: "0 2px 12px rgba(0,0,0,.08)",
                    borderTop: `3px solid ${typeColors[e.type] ?? "var(--navy)"}`,
                  }}
                >
                  {e.program && (
                    <div style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--orange)", marginBottom: 10 }}>
                      {e.program}
                    </div>
                  )}
                  <h3 style={{ fontSize: "1.02rem", fontWeight: 700, color: "var(--navy)", marginBottom: 10, lineHeight: 1.4 }}>
                    {e.title}
                  </h3>
                  <p style={{ fontSize: "0.88rem", color: "var(--gray-mid)", lineHeight: 1.65 }}>{e.description}</p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Past events */}
        <section>
          <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--navy)", marginBottom: 24 }}>
            Past Events
          </h2>
          {loading ? (
            <p style={{ color: "var(--gray-mid)" }}>Loading&hellip;</p>
          ) : past.length === 0 ? (
            <p style={{ color: "var(--gray-mid)" }}>No past events recorded yet.</p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {past.map((e) => (
                <div
                  key={e.id}
                  style={{
                    background: "#fff",
                    borderRadius: 12,
                    padding: "22px 26px",
                    boxShadow: "0 2px 12px rgba(0,0,0,.08)",
                    display: "flex",
                    gap: 20,
                    alignItems: "flex-start",
                    flexWrap: "wrap",
                  }}
                >
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8, flexWrap: "wrap" }}>
                      <span
                        style={{
                          fontSize: "0.68rem",
                          fontWeight: 700,
                          padding: "3px 9px",
                          borderRadius: 3,
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                          background: typeColors[e.type] ?? "var(--navy)",
                          color: "#fff",
                        }}
                      >
                        {e.type.replace("-", " ")}
                      </span>
                      {e.date && (
                        <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: "0.78rem", color: "var(--gray-mid)" }}>
                          <Calendar size={13} /> {e.date}
                        </span>
                      )}
                      {e.location && (
                        <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: "0.78rem", color: "var(--gray-mid)" }}>
                          <MapPin size={13} /> {e.location}
                        </span>
                      )}
                    </div>
                    <h3 style={{ fontSize: "0.98rem", fontWeight: 700, color: "var(--navy)", marginBottom: 6 }}>{e.title}</h3>
                    <p style={{ fontSize: "0.85rem", color: "var(--gray-mid)", lineHeight: 1.6 }}>{e.description}</p>
                    {e.sourceUrl && (
                      <a
                        href={e.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: "0.8rem", color: "var(--orange)", fontWeight: 600, marginTop: 10, textDecoration: "none" }}
                      >
                        Learn more <ExternalLink size={12} />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
