"use client";

/**
 * Root-level error boundary — catches errors in the root layout itself.
 * Must provide its own <html>/<body> since the root layout may have failed.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          fontFamily: '"Segoe UI", Arial, sans-serif',
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#faf9f7",
          color: "#214d90",
          padding: "2rem",
        }}
      >
        <div style={{ textAlign: "center", maxWidth: 480 }}>
          <p style={{ fontSize: "3rem", fontWeight: 800, color: "#f07030", marginBottom: "0.75rem" }}>
            Oops
          </p>
          <h1 style={{ fontSize: "1.6rem", fontWeight: 800, marginBottom: "0.75rem" }}>
            Something went wrong
          </h1>
          <p style={{ color: "#8a8f9a", fontSize: "1rem", lineHeight: 1.6, marginBottom: "2rem" }}>
            The site encountered an unexpected error. Please try refreshing the page.
          </p>
          <button
            onClick={reset}
            style={{
              background: "#f07030",
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
        </div>
      </body>
    </html>
  );
}
