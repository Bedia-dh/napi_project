"use client";

import { useEffect, useRef, useCallback } from "react";

/**
 * Cloudflare Turnstile widget — invisible or managed mode.
 *
 * Renders the Turnstile challenge and passes the resulting token back
 * to the parent form via `onVerify`. The parent includes the token in
 * its API request body so the server can validate it.
 *
 * Requires NEXT_PUBLIC_TURNSTILE_SITE_KEY in the environment.
 * If the key isn't set, the component renders nothing (dev/staging).
 */

interface TurnstileWidgetProps {
  onVerify: (token: string) => void;
  onExpire?: () => void;
  onError?: () => void;
}

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: Record<string, unknown>
      ) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
    onTurnstileLoad?: () => void;
  }
}

export default function TurnstileWidget({
  onVerify,
  onExpire,
  onError,
}: TurnstileWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  const renderWidget = useCallback(() => {
    if (
      !containerRef.current ||
      !window.turnstile ||
      !siteKey ||
      widgetIdRef.current
    )
      return;

    widgetIdRef.current = window.turnstile.render(containerRef.current, {
      sitekey: siteKey,
      callback: onVerify,
      "expired-callback": onExpire,
      "error-callback": onError,
      theme: "light",
      size: "flexible",
    });
  }, [siteKey, onVerify, onExpire, onError]);

  useEffect(() => {
    if (!siteKey) return;

    // If the script is already loaded, render immediately
    if (window.turnstile) {
      renderWidget();
      return;
    }

    // Load the Turnstile script
    const existing = document.querySelector(
      'script[src*="challenges.cloudflare.com/turnstile"]'
    );
    if (!existing) {
      window.onTurnstileLoad = renderWidget;
      const script = document.createElement("script");
      script.src =
        "https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onTurnstileLoad";
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    } else {
      // Script tag exists but hasn't loaded yet — poll briefly
      const interval = setInterval(() => {
        if (window.turnstile) {
          clearInterval(interval);
          renderWidget();
        }
      }, 100);
      return () => clearInterval(interval);
    }

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [siteKey, renderWidget]);

  // If Turnstile isn't configured, render nothing
  if (!siteKey) return null;

  return (
    <div
      ref={containerRef}
      style={{ marginTop: "0.25rem" }}
    />
  );
}
