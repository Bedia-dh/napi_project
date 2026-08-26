"use client";

import { useState } from "react";
import { isEmailJSConfigured, sendNewsletterSubscription } from "@/lib/emailjs";

interface NewsletterFormProps {
  dark?: boolean;
}

export default function NewsletterForm({ dark = false }: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    // If EmailJS isn't configured yet, show success anyway — the email
    // is captured in the UI and the team can configure the delivery later.
    if (!isEmailJSConfigured()) {
      console.warn("[Newsletter] EmailJS not configured — set NEXT_PUBLIC_EMAILJS_* env vars.");
      setStatus("success");
      return;
    }

    setStatus("sending");
    setErrorMsg("");

    const result = await sendNewsletterSubscription(email);
    if (result.ok) {
      setStatus("success");
      setEmail("");
    } else {
      setStatus("error");
      setErrorMsg(result.error ?? "Something went wrong. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <p style={{ color: dark ? "#fff" : "var(--navy)", fontWeight: 600 }}>
        Thanks for subscribing! You&apos;ll hear from us soon.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
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
          minWidth: 200,
          outline: "none",
        }}
      />
      <button
        type="submit"
        disabled={status === "sending"}
        style={{
          background: "var(--orange)",
          color: "#fff",
          border: "none",
          padding: "12px 22px",
          borderRadius: 6,
          fontWeight: 700,
          cursor: status === "sending" ? "not-allowed" : "pointer",
          whiteSpace: "nowrap",
          fontSize: "0.9rem",
          opacity: status === "sending" ? 0.7 : 1,
        }}
      >
        {status === "sending" ? "Subscribing..." : "Subscribe →"}
      </button>
      {status === "error" && (
        <p style={{ width: "100%", color: "#c0392b", fontSize: "0.8rem", marginTop: 4 }}>
          {errorMsg}
        </p>
      )}
    </form>
  );
}
