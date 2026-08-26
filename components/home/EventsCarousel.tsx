"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

const typeColors: Record<string, string> = {
  "chill-chat": "var(--chill-color)",
  conference: "var(--navy)",
  workshop: "var(--labs-color)",
  webinar: "var(--voices-color)",
};

interface EventHighlight {
  id: string;
  title: string;
  type: string;
  summary: string;
  status: "past" | "next";
}

export default function EventsCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);
  const [eventHighlights, setEventHighlights] = useState<EventHighlight[]>([]);

  useEffect(() => {
    fetch("/api/events")
      .then((res) => res.json())
      .then((data: { docs: Array<{ id: string; status: "past" | "planned"; title: string; type: string; description: string }> }) => {
        const past = data.docs.filter((d) => d.status === "past").slice(-2);
        const planned = data.docs.filter((d) => d.status === "planned");
        setEventHighlights([
          ...past.map((e) => ({ id: e.id, title: e.title, type: e.type, summary: e.description, status: "past" as const })),
          ...planned.map((e) => ({ id: e.id, title: e.title, type: e.type, summary: e.description, status: "next" as const })),
        ]);
      })
      .catch(() => setEventHighlights([]));
  }, []);

  const updateArrows = () => {
    const c = carouselRef.current;
    if (!c) return;
    setCanLeft(c.scrollLeft > 4);
    setCanRight(c.scrollLeft < c.scrollWidth - c.clientWidth - 4);
  };

  useEffect(() => {
    updateArrows();
    const c = carouselRef.current;
    if (!c) return;
    const onScroll = () => updateArrows();
    c.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      c.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateArrows);
    };

  }, [eventHighlights.length]);

  const scroll = (dir: number) => {
    const c = carouselRef.current;
    if (!c) return;
    const card = c.querySelector<HTMLElement>("[data-card]");
    const step = card ? card.offsetWidth + 20 : 370;
    const max = c.scrollWidth - c.clientWidth;
    const next = c.scrollLeft + dir * step;
    c.scrollTo({ left: Math.max(0, Math.min(next, max)), behavior: "smooth" });
  };

  return (
    <section style={{ background: "var(--cream)", padding: `96px var(--section-px)` }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <p style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "var(--orange)", marginBottom: "0.75rem" }}>
            Events
          </p>
          <h2 style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)", fontWeight: 800, color: "#000000", letterSpacing: "-0.02em" }}>
            Where We&apos;ve Been, What&apos;s Next
          </h2>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Link
            href="/events"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.35rem",
              color: "var(--navy)",
              fontSize: "0.82rem",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Explore All Events <ArrowRight size={14} />
          </Link>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            {([-1, 1] as const).map((dir) => {
              const enabled = dir === -1 ? canLeft : canRight;
              return (
                <button
                  key={dir}
                  onClick={() => enabled && scroll(dir)}
                  disabled={!enabled}
                  aria-label={dir === -1 ? "Scroll left" : "Scroll right"}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    border: "1px solid rgba(33,77,144,0.2)",
                    background: "transparent",
                    color: "var(--navy)",
                    cursor: enabled ? "pointer" : "default",
                    opacity: enabled ? 1 : 0.3,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "opacity .15s",
                  }}
                >
                  {dir === -1 ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div
        ref={carouselRef}
        style={{
          display: "flex",
          gap: "1.25rem",
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          scrollbarWidth: "none",
          paddingBottom: "4px",
          width: "100%",
        }}
      >
        {eventHighlights.map((evt) => (
          <div
            key={evt.id}
            data-card
            style={{
              flexShrink: 0,
              width: "clamp(280px, 26vw, 370px)",
              scrollSnapAlign: "start",
              background: "#fff",
              borderRadius: 12,
              overflow: "hidden",
              boxShadow: "0 4px 18px rgba(33,77,144,0.1)",
              display: "flex",
              flexDirection: "column",
              minHeight: 380,
            }}
          >
            <div
              style={{
                height: 140,
                flexShrink: 0,
                background: "var(--navy-mid)",
                backgroundImage: "url(/media/map.png)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "space-between",
                padding: "0.9rem 1.1rem",
              }}
            >
              <span
                style={{
                  background: typeColors[evt.type] ?? "var(--navy)",
                  color: "#fff",
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  padding: "3px 8px",
                  borderRadius: 3,
                }}
              >
                {evt.type.replace("-", " ")}
              </span>
              <span
                style={{
                  color: "#fff",
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  opacity: 0.7,
                }}
              >
                {evt.status === "past" ? "Past" : "Next Up"}
              </span>
            </div>

            <div style={{ padding: "1.75rem", flex: 1, display: "flex", flexDirection: "column" }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#000", lineHeight: 1.4, marginBottom: "0.75rem" }}>
                {evt.title}
              </h3>
              <p style={{ fontSize: "0.9rem", color: "var(--gray-mid)", lineHeight: 1.7 }}>
                {evt.summary}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
