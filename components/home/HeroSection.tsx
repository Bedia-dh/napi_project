"use client";

import { useEffect, useState } from "react";
import { Play, ArrowRight, X } from "lucide-react";
import { getYouTubeId } from "@/lib/utils/youtube";
import { Safari } from "@/components/ui/Safari";
import { InteractiveHoverButton } from "@/components/ui/InteractiveHoverButton";

const HERO_VIDEO_ID = getYouTubeId("https://www.youtube.com/watch?v=z9Emrap6c3k&t=1s");

export default function HeroSection() {
  const [videoOpen, setVideoOpen] = useState(false);

  useEffect(() => {
    if (!videoOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setVideoOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [videoOpen]);

  return (
    <section
      style={{
        background: "linear-gradient(140deg,#f0f5ff 0%,#e8f0fd 55%,#f5f7ff 100%)",
        padding: "72px 80px 56px",
        position: "relative",
        overflow: "hidden",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "64px",
        alignItems: "center",
      }}
    >
      {/* Map texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url(/media/map.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.05,
          pointerEvents: "none",
        }}
      />

      {/* LEFT — Text */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            background: "var(--orange)",
            color: "#fff",
            borderRadius: 2,
            padding: "5px 12px",
            marginBottom: "1.5rem",
          }}
        >
          <span
            style={{
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "2px",
              textTransform: "uppercase",
            }}
          >
            Independent Think Tank · North Africa
          </span>
        </div>

        <h1
          style={{
            fontSize: "clamp(2rem, 3.5vw, 3rem)",
            fontWeight: 800,
            color: "#000000",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            marginBottom: "1.25rem",
            textWrap: "balance",
          }}
        >
          Where{" "}
          <em style={{ fontStyle: "normal", color: "var(--orange)" }}>Evidence</em>
          <br />
          Meets Youth
          <br />
          Leadership
        </h1>

        <p
          style={{
            fontSize: "1rem",
            color: "var(--gray-mid)",
            lineHeight: 1.75,
            marginBottom: "2.25rem",
            maxWidth: "480px",
          }}
        >
          NAPI is an independent think tank empowering young North Africans to shape
          evidence-based policy across the Maghreb and Arab world.
        </p>

        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <InteractiveHoverButton href="/research" variant="navy">
            Explore the Research <ArrowRight size={15} />
          </InteractiveHoverButton>
        </div>
      </div>

      {/* RIGHT — Video player, framed in a Safari browser mockup */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <Safari url="napipolicy.org">
          <div
            onClick={() => setVideoOpen(true)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && setVideoOpen(true)}
            style={{
              background: "#fff",
              aspectRatio: "16/10",
              position: "relative",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            {/* Layer 2 — NAPI logo, primary visual, low opacity so the map shows through */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "10%",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/media/napi_hero_placeholder.png"
                alt=""
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  opacity: 1,
                }}
              />
            </div>

            {/* Layer 3 — play button, fully opaque on top */}
            <div
              style={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <div
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: "50%",
                  background: "var(--orange)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 0 0 16px rgba(240,112,48,0.14)",
                }}
              >
                <Play size={28} color="#fff" fill="#fff" />
              </div>
            </div>
          </div>
        </Safari>
      </div>

      {/* Video lightbox */}
      {videoOpen && HERO_VIDEO_ID && (
        <div
          onClick={() => setVideoOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,.85)",
            zIndex: 999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
          }}
        >
          <div onClick={(e) => e.stopPropagation()} style={{ width: "100%", maxWidth: 960 }}>
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "0.75rem" }}>
              <button
                onClick={() => setVideoOpen(false)}
                aria-label="Close"
                style={{ background: "none", border: "none", color: "rgba(255,255,255,.7)", cursor: "pointer" }}
              >
                <X size={24} />
              </button>
            </div>
            <div style={{ aspectRatio: "16/9", borderRadius: 12, overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,.5)" }}>
              <iframe
                src={`https://www.youtube.com/embed/${HERO_VIDEO_ID}?autoplay=1`}
                title="NAPI Introduction"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
                style={{ width: "100%", height: "100%", border: "none" }}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
