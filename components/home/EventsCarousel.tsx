"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { pastEvents, plannedActivities } from "@/lib/data/events";

const typeColors: Record<string, string> = {
  "chill-chat": "var(--chill-color)",
  conference: "var(--navy)",
  workshop: "var(--labs-color)",
  webinar: "var(--voices-color)",
};

interface CarouselEvent {
  id: string;
  title: string;
  type: string;
  summary: string;
  status: "past" | "next";
  slug?: string;
  imageUrl?: string;
}

// Build highlights from static data: last 3 past events + all planned
const eventHighlights: CarouselEvent[] = [
  ...pastEvents.slice(-8).map((e) => ({
    id: e.id,
    title: e.title,
    type: e.type,
    summary: e.description,
    status: "past" as const,
    slug: e.slug,
    imageUrl: e.imageUrl,
  })),
  ...plannedActivities.map((a) => ({
    id: a.id,
    title: a.title,
    type: "workshop" as const,
    summary: a.description,
    status: "next" as const,
  })),
];

export default function EventsCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

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
  }, []);

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
    <section style={{ background: "var(--cream)", padding: "96px 80px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginBottom: "2rem",
        }}
      >
        <div>
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
          <h2
            style={{
              fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)",
              fontWeight: 800,
              color: "#000000",
              letterSpacing: "-0.02em",
            }}
          >
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
                  {dir === -1 ? (
                    <ChevronLeft size={18} />
                  ) : (
                    <ChevronRight size={18} />
                  )}
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
        {eventHighlights.map((evt) => {
          const card = (
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
                transition: "transform 0.2s, box-shadow 0.2s",
                cursor: evt.slug ? "pointer" : "default",
              }}
              onMouseEnter={(ev) => {
                if (evt.slug) {
                  ev.currentTarget.style.transform = "translateY(-3px)";
                  ev.currentTarget.style.boxShadow =
                    "0 8px 28px rgba(33,77,144,0.18)";
                }
              }}
              onMouseLeave={(ev) => {
                ev.currentTarget.style.transform = "none";
                ev.currentTarget.style.boxShadow =
                  "0 4px 18px rgba(33,77,144,0.1)";
              }}
            >
              {/* Card top: event image or gradient fallback */}
              <div
                style={{
                  height: 160,
                  flexShrink: 0,
                  background: evt.imageUrl
                    ? `url(${evt.imageUrl}) center/cover no-repeat`
                    : "linear-gradient(135deg, var(--navy-dark) 0%, var(--navy) 100%)",
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "space-between",
                  padding: "0.9rem 1.1rem",
                  position: "relative",
                }}
              >
                {/* Dark overlay for text readability on images */}
                {evt.imageUrl && (
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.1) 100%)",
                    }}
                  />
                )}
                <span
                  style={{
                    position: "relative",
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
                    position: "relative",
                    color: "#fff",
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    opacity: 0.85,
                  }}
                >
                  {evt.status === "past" ? "Past" : "Next Up"}
                </span>
              </div>

              {/* Card body */}
              <div
                style={{
                  padding: "1.75rem",
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <h3
                  style={{
                    fontSize: "1.05rem",
                    fontWeight: 700,
                    color: "var(--navy)",
                    lineHeight: 1.4,
                    marginBottom: "0.75rem",
                  }}
                >
                  {evt.title}
                </h3>
                <p
                  style={{
                    fontSize: "0.88rem",
                    color: "var(--gray-mid)",
                    lineHeight: 1.7,
                    flex: 1,
                  }}
                >
                  {evt.summary}
                </p>
                {evt.slug && (
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 5,
                      fontSize: "0.82rem",
                      color: "var(--orange)",
                      fontWeight: 600,
                      marginTop: 12,
                    }}
                  >
                    Read more <ArrowRight size={14} />
                  </span>
                )}
              </div>
            </div>
          );

          if (evt.slug) {
            return (
              <Link
                key={evt.id}
                href={`/events/${evt.slug}`}
                style={{ textDecoration: "none", color: "inherit", flexShrink: 0 }}
              >
                {card}
              </Link>
            );
          }
          return card;
        })}
      </div>
    </section>
  );
}
