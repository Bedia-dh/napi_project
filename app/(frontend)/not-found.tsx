import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Page Not Found - NAPI",
};

export default function NotFound() {
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
          fontSize: "5rem",
          fontWeight: 800,
          color: "var(--orange)",
          lineHeight: 1,
          marginBottom: "0.5rem",
        }}
      >
        404
      </p>
      <h1
        style={{
          fontSize: "clamp(1.4rem, 3vw, 2rem)",
          fontWeight: 800,
          color: "var(--navy)",
          marginBottom: "0.75rem",
        }}
      >
        Page not found
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
        The page you&apos;re looking for doesn&apos;t exist or may have been moved.
      </p>
      <Link
        href="/"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          background: "var(--navy)",
          color: "#fff",
          padding: "12px 24px",
          borderRadius: 8,
          fontWeight: 700,
          fontSize: "0.9rem",
          textDecoration: "none",
          transition: "background 0.2s",
        }}
      >
        <ArrowLeft size={16} /> Back to Home
      </Link>
    </div>
  );
}
