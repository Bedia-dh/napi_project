"use client";

import { useEffect, useMemo, useState } from "react";
import { X, Download, ExternalLink, FileText, Loader2 } from "lucide-react";
import type { Publication } from "@/lib/types/publication";

interface PDFModalProps {
  pub: Publication | null;
  onClose: () => void;
}

export default function PDFModal({ pub, onClose }: PDFModalProps) {
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  // Classify the PDF URL:
  // - Payload media URL (/api/media/file/...) → fetch as blob to bypass X-Frame-Options
  // - Google Drive share links → use Drive's native /preview embed via iframe
  // - External journal pages (tandfonline, brill, erudit) → not embeddable
  const { isPayloadMedia, driveSrc, isExternal } = useMemo(() => {
    const url = pub?.pdfUrl;
    if (!url) return { isPayloadMedia: false, driveSrc: null, isExternal: false };

    if (url.startsWith("/api/media/file/")) {
      return { isPayloadMedia: true, driveSrc: null, isExternal: false };
    }

    const driveMatch = url.match(/drive\.google\.com\/file\/d\/([^/]+)/);
    if (driveMatch) {
      return { isPayloadMedia: false, driveSrc: `https://drive.google.com/file/d/${driveMatch[1]}/preview`, isExternal: false };
    }

    if (url.includes("tandfonline.com") || url.includes("brill.com") || url.includes("erudit.org")) {
      return { isPayloadMedia: false, driveSrc: null, isExternal: true };
    }

    // Other direct PDF URL — try Google Docs viewer
    return { isPayloadMedia: false, driveSrc: `https://docs.google.com/gview?url=${encodeURIComponent(url)}&embedded=true`, isExternal: false };
  }, [pub?.pdfUrl]);

  // For Payload media PDFs: fetch as blob → create blob URL for iframe.
  // Blob URLs bypass X-Frame-Options entirely since they have no origin headers.
  useEffect(() => {
    if (!isPayloadMedia || !pub?.pdfUrl) return;

    let revoked = false;
    setLoading(true);
    setError(false);

    fetch(pub.pdfUrl)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.blob();
      })
      .then((blob) => {
        if (revoked) return;
        const url = URL.createObjectURL(blob);
        setBlobUrl(url);
        setLoading(false);
      })
      .catch(() => {
        if (revoked) return;
        setError(true);
        setLoading(false);
      });

    return () => {
      revoked = true;
      setBlobUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return null;
      });
    };
  }, [isPayloadMedia, pub?.pdfUrl]);

  // Download URL
  const downloadUrl = useMemo(() => {
    const url = pub?.pdfUrl;
    if (!url) return "#";
    if (url.startsWith("/api/media/file/")) return url;
    const driveMatch = url.match(/drive\.google\.com\/file\/d\/([^/]+)/);
    if (driveMatch) {
      return `https://drive.google.com/uc?export=download&id=${driveMatch[1]}`;
    }
    return url;
  }, [pub?.pdfUrl]);

  if (!pub) return null;

  // Determine the iframe src
  const iframeSrc = isPayloadMedia ? blobUrl : driveSrc;
  const showViewer = Boolean(iframeSrc) && !loading && !error;
  const showLoading = isPayloadMedia && loading;
  const showError = isPayloadMedia && error;

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
          <h3 style={{ color: "#fff", fontSize: "0.95rem", fontWeight: 700, maxWidth: 520 }}>
            {pub.title}
          </h3>
          <button
            onClick={onClose}
            style={{ background: "none", border: "none", color: "rgba(255,255,255,.6)", fontSize: "1.4rem", cursor: "pointer" }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Viewer */}
        {showLoading ? (
          <div
            style={{
              background: "#f8f9fa",
              height: 420,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#666",
              flexDirection: "column",
              gap: 14,
            }}
          >
            <Loader2 size={36} color="var(--navy)" style={{ animation: "spin 1s linear infinite" }} />
            <span style={{ fontSize: "0.9rem", color: "var(--navy)" }}>Loading PDF…</span>
            <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
          </div>
        ) : showViewer ? (
          <iframe
            src={iframeSrc!}
            title={`Preview of ${pub.title}`}
            allow="autoplay"
            style={{
              width: "100%",
              height: 420,
              border: "none",
              background: "#555",
            }}
          />
        ) : (
          <div
            style={{
              background: "#f8f9fa",
              height: 420,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#666",
              flexDirection: "column",
              gap: 14,
              padding: "2rem",
              textAlign: "center",
            }}
          >
            <FileText size={48} color="#999" />
            {isExternal ? (
              <>
                <span style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--navy)" }}>
                  This publication is hosted on an external journal
                </span>
                <span style={{ fontSize: "0.85rem", color: "#888", maxWidth: 400 }}>
                  Preview is not available for journal-hosted articles. Click below to read it on the publisher&apos;s website.
                </span>
              </>
            ) : showError ? (
              <span style={{ fontSize: "0.95rem", color: "#666" }}>
                Could not load PDF preview. Click below to download instead.
              </span>
            ) : (
              <span>No PDF available for preview</span>
            )}
          </div>
        )}

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
            {pub.pages ? `${pub.pages} pages · ` : ""}{pub.languages.join(" · ").toUpperCase()} · {pub.year}
          </span>
          <a
            href={isExternal ? pub.pdfUrl : downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
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
            {isExternal ? <><ExternalLink size={13} /> Read on Publisher Site</> : <><Download size={13} /> Download Full PDF</>}
          </a>
        </div>
      </div>
    </div>
  );
}
