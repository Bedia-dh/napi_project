"use client";

import { useEffect } from "react";
import { X, Download, FileText } from "lucide-react";
import type { Publication } from "@/lib/types/publication";

interface PDFModalProps {
  pub: Publication | null;
  onClose: () => void;
}

export default function PDFModal({ pub, onClose }: PDFModalProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  if (!pub) return null;

  return (
    <div
      onClick={onClose}
      style={{
        display: "flex",
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.7)",
        zIndex: 999,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff",
          borderRadius: 14,
          width: 680,
          maxWidth: "95vw",
          overflow: "hidden",
          boxShadow: "0 20px 60px rgba(0,0,0,.4)",
        }}
      >
        {/* Header */}
        <div
          style={{
            background: "var(--navy)",
            padding: "18px 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h3 style={{ color: "#000", fontSize: "0.95rem", fontWeight: 700, maxWidth: 520 }}>
            {pub.title}
          </h3>
          <button
            onClick={onClose}
            style={{ background: "none", border: "none", color: "rgba(0,0,0,.6)", fontSize: "1.4rem", cursor: "pointer" }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Viewer */}
        <div
          style={{
            background: "#555",
            height: 420,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#aaa",
            flexDirection: "column",
            gap: 10,
          }}
        >
          <FileText size={48} color="#888" />
          <span>PDF preview would load here</span>
          <span style={{ fontSize: "0.78rem", color: "#aaa" }}>Page 1 of {pub.pages}</span>
        </div>

        {/* Footer */}
        <div
          style={{
            padding: "16px 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #eee",
          }}
        >
          <span style={{ fontSize: "0.82rem", color: "var(--gray-mid)" }}>
            {pub.pages} pages · {pub.languages.join(" · ").toUpperCase()} · {pub.year}
          </span>
          <a
            href={pub.pdfUrl}
            style={{
              background: "var(--orange)",
              color: "#fff",
              border: "none",
              padding: "9px 16px",
              borderRadius: 6,
              fontSize: "0.78rem",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: 5,
              textDecoration: "none",
            }}
          >
            <Download size={13} /> Download Full PDF
          </a>
        </div>
      </div>
    </div>
  );
}
