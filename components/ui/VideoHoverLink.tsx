"use client";

import { useEffect, useRef, useState } from "react";
import { Play, X } from "lucide-react";
import { getYouTubeThumbnail } from "@/lib/utils/youtube";

interface VideoHoverLinkProps {
  title: string;
  youtubeId: string;
}

// A link-styled trigger that, on hover, pops up a small muted preview of the
// YouTube video, and on click opens a full lightbox with sound. Used for
// roundtable/session links that point at an actual YouTube video — plain
// links (e.g. mei.edu event pages) should keep using a normal <a>.
export default function VideoHoverLink({ title, youtubeId }: VideoHoverLinkProps) {
  const [showPreview, setShowPreview] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Start/stop the preview directly from the mouse events (instead of a
  // hovering-state + effect combo) so no setState happens inside an effect.
  const startHover = () => {
    hoverTimer.current = setTimeout(() => setShowPreview(true), 300);
  };
  const endHover = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    setShowPreview(false);
  };

  // Clear any pending preview timer on unmount.
  useEffect(() => {
    return () => {
      if (hoverTimer.current) clearTimeout(hoverTimer.current);
    };
  }, []);

  useEffect(() => {
    if (!modalOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [modalOpen]);

  return (
    <>
      <div
        onMouseEnter={startHover}
        onMouseLeave={endHover}
        onClick={() => setModalOpen(true)}
        style={{ position: "relative" }}
      >
        <div
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && setModalOpen(true)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
            background: "#fff",
            borderRadius: 8,
            padding: "0.95rem 1.25rem",
            border: "1px solid rgba(33,77,144,0.1)",
            color: "var(--navy)",
            cursor: "pointer",
          }}
        >
          <span style={{ fontSize: "0.9rem", fontWeight: 600, lineHeight: 1.4 }}>{title}</span>

          {/* Video thumbnail frame — visible from the start, not just on hover */}
          <span
            style={{
              position: "relative",
              width: 96,
              height: 56,
              borderRadius: 6,
              overflow: "hidden",
              flexShrink: 0,
              background: `var(--navy-dark) center / cover no-repeat url(${getYouTubeThumbnail(youtubeId)})`,
            }}
          >
            <span
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(13,20,35,0.22)",
              }}
            >
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 26,
                  height: 26,
                  borderRadius: "50%",
                  background: "var(--orange)",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.35)",
                  flexShrink: 0,
                }}
              >
                <Play size={11} color="#fff" fill="#fff" />
              </span>
            </span>
          </span>
        </div>

        {/* Hover preview */}
        {showPreview && (
          <div
            style={{
              position: "absolute",
              top: "calc(100% + 8px)",
              right: 0,
              zIndex: 50,
              width: 280,
              borderRadius: 10,
              overflow: "hidden",
              boxShadow: "0 16px 36px rgba(0,0,0,0.28)",
              border: "1px solid rgba(0,0,0,0.08)",
            }}
          >
            <div style={{ position: "relative", aspectRatio: "16/9", background: "#000" }}>
              <iframe
                src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&controls=0&modestbranding=1&playsinline=1`}
                title={title}
                allow="autoplay; encrypted-media"
                style={{ width: "100%", height: "100%", border: "none", pointerEvents: "none" }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(13,20,35,0.15)",
                }}
              >
                <span style={{ fontSize: "0.68rem", fontWeight: 700, color: "#fff", background: "rgba(0,0,0,0.55)", padding: "4px 10px", borderRadius: 20, letterSpacing: "0.03em" }}>
                  Click to watch with sound
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Lightbox modal */}
      {modalOpen && (
        <div
          onClick={() => setModalOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,.8)",
            zIndex: 999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ width: "100%", maxWidth: 860 }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
              <h3 style={{ color: "#fff", fontSize: "0.95rem", fontWeight: 700, maxWidth: 700 }}>{title}</h3>
              <button
                onClick={() => setModalOpen(false)}
                aria-label="Close"
                style={{ background: "none", border: "none", color: "rgba(255,255,255,.7)", cursor: "pointer" }}
              >
                <X size={22} />
              </button>
            </div>
            <div style={{ aspectRatio: "16/9", borderRadius: 10, overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,.4)" }}>
              <iframe
                src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
                title={title}
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
                style={{ width: "100%", height: "100%", border: "none" }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
