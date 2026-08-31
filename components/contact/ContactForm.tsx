"use client";

import { useState, useCallback, type CSSProperties, type FormEvent } from "react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { InteractiveHoverButton } from "@/components/ui/InteractiveHoverButton";
import TurnstileWidget from "@/components/ui/TurnstileWidget";

const SUBJECTS = [
  { value: "general", label: "General Inquiry" },
  { value: "partnership", label: "Partnership" },
  { value: "press", label: "Press / Media" },
  { value: "program", label: "Program Application" },
  { value: "other", label: "Other" },
];

type Status = "idle" | "submitting" | "success" | "error";

const inputStyle: CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: 8,
  border: "1.5px solid #ddd",
  fontSize: "0.92rem",
  color: "var(--navy)",
  outline: "none",
  fontFamily: "inherit",
};

const labelStyle: CSSProperties = { display: "flex", flexDirection: "column", gap: "0.4rem" };
const labelTextStyle: CSSProperties = { fontSize: "0.8rem", fontWeight: 700, color: "var(--navy)" };

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("general");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string>("");

  const handleTurnstileVerify = useCallback((token: string) => {
    setTurnstileToken(token);
  }, []);

  const handleTurnstileExpire = useCallback(() => {
    setTurnstileToken("");
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus("error");
      setErrorMsg("Please fill in your name, email, and message.");
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message, turnstileToken }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus("error");
        setErrorMsg(data.error || "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      setName("");
      setEmail("");
      setSubject("general");
      setMessage("");
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please check your connection and try again.");
    }
  };

  if (status === "success") {
    return (
      <div
        style={{
          background: "#fff",
          borderRadius: 12,
          padding: "3rem 2rem",
          textAlign: "center",
          boxShadow: "0 2px 12px rgba(0,0,0,.08)",
        }}
      >
        <CheckCircle2 size={40} color="var(--orange)" style={{ marginBottom: "1rem" }} />
        <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--navy)", marginBottom: "0.5rem" }}>
          Message sent
        </h3>
        <p style={{ color: "var(--gray-mid)", fontSize: "0.9rem", marginBottom: "1.5rem" }}>
          Thanks for reaching out, we&apos;ll get back to you soon.
        </p>
        <button
          onClick={() => setStatus("idle")}
          style={{ background: "none", border: "none", color: "var(--orange)", fontWeight: 700, fontSize: "0.85rem", cursor: "pointer" }}
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: "#fff",
        borderRadius: 12,
        padding: "clamp(1.25rem, 4vw, 2.5rem)",
        boxShadow: "0 2px 12px rgba(0,0,0,.08)",
        display: "flex",
        flexDirection: "column",
        gap: "1.25rem",
      }}
    >
      <div className="contact-form-inner" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
        <label style={labelStyle}>
          <span style={labelTextStyle}>Name *</span>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={inputStyle}
            placeholder="Your full name"
          />
        </label>
        <label style={labelStyle}>
          <span style={labelTextStyle}>Email *</span>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
            placeholder="you@example.com"
          />
        </label>
      </div>

      <label style={labelStyle}>
        <span style={labelTextStyle}>Subject</span>
        <select value={subject} onChange={(e) => setSubject(e.target.value)} style={{ ...inputStyle, cursor: "pointer" }}>
          {SUBJECTS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </label>

      <label style={labelStyle}>
        <span style={labelTextStyle}>Message *</span>
        <textarea
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={6}
          style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }}
          placeholder="How can we help?"
        />
      </label>

      {status === "error" && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            color: "#c0392b",
            fontSize: "0.85rem",
            background: "#fdecea",
            padding: "10px 14px",
            borderRadius: 8,
          }}
        >
          <AlertCircle size={16} /> {errorMsg}
        </div>
      )}

      <TurnstileWidget
        onVerify={handleTurnstileVerify}
        onExpire={handleTurnstileExpire}
        onError={handleTurnstileExpire}
      />

      <div>
        <InteractiveHoverButton variant="navy" type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? (
            "Sending..."
          ) : (
            <>
              Send Message <Send size={15} />
            </>
          )}
        </InteractiveHoverButton>
      </div>
    </form>
  );
}
