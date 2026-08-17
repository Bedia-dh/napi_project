"use client";

const announcements = [
  "YPL 2024 applications are now open - Apply before August 31",
  "New publication: Youth Representation in North African Climate Policy",
  "Chill Chat #12 - July 15 · Register now",
  "Policy Labs 2024 report available for download",
  "NAPI at COP30 - Follow our coverage",
];

export default function Ticker() {
  const text = announcements.join("   ·   ");

  return (
    <div
      style={{
        background: "var(--cream)",
        borderBottom: "1px solid var(--gray-light)",
        display: "flex",
        alignItems: "center",
        height: 40,
        overflow: "hidden",
      }}
    >
      {/* Scrolling text */}
      <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>
        <div
          style={{
            display: "inline-block",
            whiteSpace: "nowrap",
            animation: "ticker 40s linear infinite",
            fontSize: "0.78rem",
            color: "var(--navy)",
            fontWeight: 500,
            paddingLeft: "100%",
          }}
        >
          {text}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{text}
        </div>
      </div>
    </div>
  );
}
