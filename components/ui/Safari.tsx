import type { CSSProperties, ReactNode } from "react";
import { Lock } from "lucide-react";

interface SafariProps {
  /** Text shown in the address bar (no need to include https://). */
  url?: string;
  className?: string;
  style?: CSSProperties;
  /** The page content rendered inside the browser "screen". */
  children: ReactNode;
}

// A hand-built Safari-style browser mockup (inspired by Magic UI's Safari
// component: https://magicui.design/docs/components/safari) used to frame
// preview media — e.g. the homepage hero video — inside a familiar browser
// chrome. Built with plain divs (rather than the upstream SVG frame) so it
// has no extra dependencies and matches this project's inline-style
// conventions.
export function Safari({ url = "napipolicy.org", className, style, children }: SafariProps) {
  return (
    <div
      className={className}
      style={{
        borderRadius: 14,
        overflow: "hidden",
        background: "#f6f6f7",
        border: "1px solid rgba(13,30,61,0.08)",
        boxShadow: "0 30px 60px -18px rgba(13,30,61,0.28), 0 4px 14px rgba(13,30,61,0.08)",
        ...style,
      }}
    >
      {/* Title bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "14px",
          padding: "10px 14px",
          background: "linear-gradient(#fbfbfc,#edeef0)",
          borderBottom: "1px solid rgba(13,30,61,0.07)",
        }}
      >
        <div style={{ display: "flex", gap: "6px", flexShrink: 0 }}>
          <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#ec6a5e" }} />
          <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#f4bf4f" }} />
          <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#61c454" }} />
        </div>

        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              background: "#fff",
              border: "1px solid rgba(13,30,61,0.08)",
              borderRadius: 6,
              padding: "5px 14px",
              maxWidth: 320,
            }}
          >
            <Lock size={10} color="#9199a6" />
            <span style={{ fontSize: "0.72rem", color: "#5b6270", fontWeight: 500, letterSpacing: "0.01em" }}>
              {url}
            </span>
          </div>
        </div>

        {/* Spacer so the address pill stays visually centered against the traffic lights */}
        <div style={{ width: 40, flexShrink: 0 }} aria-hidden="true" />
      </div>

      {/* Screen */}
      <div style={{ position: "relative", background: "#000" }}>{children}</div>
    </div>
  );
}
