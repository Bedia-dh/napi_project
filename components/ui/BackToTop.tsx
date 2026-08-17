"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

// Floating back-to-top button with a conic-gradient ring that fills in as
// the user scrolls down the page, and empties again near the top. Appears
// once there's been some scrolling, click smooth-scrolls back to top.
export default function BackToTop() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop;
      const scrollHeight = doc.scrollHeight - window.innerHeight;

      if (scrollHeight <= 0) {
        setProgress(0);
        return;
      }
      const raw = scrollTop / scrollHeight;
      setProgress(Math.min(Math.max(raw, 0), 1));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => window.scrollTo({ top: 0, behavior: "smooth" });

  if (progress < 0.03) return null;

  const angle = progress * 360;

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Back to top"
      className="back-to-top-btn"
      style={{
        position: "fixed",
        bottom: 28,
        right: 24,
        zIndex: 400,
        border: "none",
        background: "none",
        padding: 0,
        cursor: "pointer",
      }}
    >
      <span
        className="back-to-top__ring"
        style={{
          position: "relative",
          display: "flex",
          width: 52,
          height: 52,
          borderRadius: "50%",
          boxShadow: "0 10px 26px rgba(13,30,61,0.28)",
          background: `conic-gradient(var(--orange) ${angle}deg, rgba(33,77,144,0.14) ${angle}deg)`,
        }}
      >
        <span
          style={{
            position: "absolute",
            inset: 3,
            borderRadius: "50%",
            background: "var(--navy)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ArrowUp size={18} color="#fff" />
        </span>
      </span>
    </button>
  );
}
