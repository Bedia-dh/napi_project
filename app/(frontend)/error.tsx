"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[NAPI] Unhandled error:", error);
  }, [error]);

  return (
    <div
      style={{
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(2rem, 5vw, 5rem) clamp(1.25rem, 5vw, 5rem)",
        textAlign: "center",
        background: "var(--cream)",
      }}
    >
      <p
        style={{
          fontSize: "3rem",
          fontWeight: 800,
          color: "var(--orange)",
          lineHeight: 1,
          marginBottom: "0.75rem",
        }}
      >
        Oops
      </p>
      <h1
        style={{
          fontSize: "clamp(1.4rem, 3vw, 2rem)",
          fontWeight: 800,
          color: "var(--navy)",
          marginBottom: "0.75rem",
        }}
      >
        Something went wrong
      </h1>
      <p
        style={{
          color: "var(--gray-mid)",
          fontSize: "1rem",
          lineHeight: 1.6,
          maxWidth: 480,
          marginBottom: "2rem",
        }}
      >
        We hit an unexpected error. You can try again, or head back to the homepage.
      </p>
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
        <button
          onClick={reset}
          style={{
            background: "var(--orange)",
            color: "#fff",
            padding: "12px 24px",
            borderRadius: 8,
            border: "none",
            fontWeight: 700,
            fontSize: "0.9rem",
            cursor: "pointer",
          }}
        >
          Try again
        </button>
        <a
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            background: "var(--navy)",
            color: "#fff",
            padding: "12px 24px",
            borderRadius: 8,
            fontWeight: 700,
            fontSize: "0.9rem",
            textDecoration: "none",
          }}
        >
          Back to Home
        </a>
      </div>
    </div>
  );
}
