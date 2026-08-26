"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { Publication } from "@/lib/types/publication";
import Badge from "@/components/ui/Badge";
import LanguageChips from "@/components/ui/LanguageChips";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface FeaturedPublicationsProps {
  publications: Publication[];
}

export default function FeaturedPublications({ publications }: FeaturedPublicationsProps) {
  const featured = publications;
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

  }, [featured.length]);

  const scroll = (dir: number) => {
    const c = carouselRef.current;
    if (!c) return;
    const card = c.querySelector<HTMLElement>("[data-card]");
    const step = card ? card.offsetWidth + 20 : 340;
    const max = c.scrollWidth - c.clientWidth;
    const next = c.scrollLeft + dir * step;
    c.scrollTo({ left: Math.max(0, Math.min(next, max)), behavior: "smooth" });
  };

  return (
    <section style={{ background: "var(--cream)", padding: `45px var(--section-px)` }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <p style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "var(--orange)", marginBottom: "0.75rem" }}>
            Publications
          </p>
          <h2 style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)", fontWeight: 800, color: "#000000", letterSpacing: "-0.02em" }}>
            Latest Research
          </h2>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Link href="/research" style={{ color: "var(--orange)", fontWeight: 700, fontSize: "0.875rem", whiteSpace: "nowrap" }}>
            View all &rarr;
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
        {featured.map((pub) => (
          <div
            key={pub.id}
            data-card
            style={{
              flexShrink: 0,
              width: "clamp(260px, 24vw, 340px)",
              scrollSnapAlign: "start",
              background: "#fff",
              borderRadius: 12,
              padding: "24px 24px",
              minHeight: 300,
              display: "flex",
              flexDirection: "column",
              gap: "0.85rem",
              boxShadow: "0 2px 12px rgba(0,0,0,.2)",
            }}
          >
            <Badge type={pub.type} />
            <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#000", lineHeight: 1.45 }}>
              {pub.title}
            </h3>
            <p style={{ fontSize: "0.8rem", color: "var(--gray-mid)" }}>
              {pub.authors.join(", ")} &middot; {pub.year}
            </p>
            <LanguageChips available={pub.languages} />
            <a
              href={pub.pdfUrl}
              style={{
                marginTop: "auto",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.3rem",
                color: "var(--orange)",
                fontWeight: 700,
                fontSize: "0.8rem",
                textDecoration: "none",
              }}
            >
              Read PDF <ChevronRight size={14} />
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
