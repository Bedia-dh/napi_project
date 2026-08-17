"use client";

import { useState } from "react";

interface NewsletterFormProps {
  dark?: boolean;
}

export default function NewsletterForm({ dark = false }: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  if (submitted) {
    return (
      <p style={{ color: dark ? "#fff" : "var(--navy)", fontWeight: 600 }}>
        Thanks for subscribing! You&apos;ll hear from us soon.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: "0.5rem" }}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
        style={{
          padding: "12px 18px",
          borderRadius: 6,
          border: "1.5px solid #ddd",
          background: dark ? "rgba(255,255,255,.1)" : "var(--cream)",
          color: dark ? "#fff" : "var(--navy)",
          fontSize: "0.9rem",
          width: 260,
          outline: "none",
        }}
      />
      <button
        type="submit"
        style={{
          background: "var(--orange)",
          color: "#fff",
          border: "none",
          padding: "12px 22px",
          borderRadius: 6,
          fontWeight: 700,
          cursor: "pointer",
          whiteSpace: "nowrap",
          fontSize: "0.9rem",
        }}
      >
        Subscribe →
      </button>
    </form>
  );
}
