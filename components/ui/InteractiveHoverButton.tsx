"use client";

import Link from "next/link";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  CSSProperties,
  ReactNode,
} from "react";

type Variant = "orange" | "navy" | "orangeOnDark";

const VARIANTS: Record<Variant, { fill: string; border: string; idleText: string; revealText: string }> = {
  // Filled orange on hover — for CTAs on light/white/cream backgrounds.
  orange: {
    fill: "var(--orange)",
    border: "rgba(240,112,48,0.45)",
    idleText: "var(--navy)",
    revealText: "#fff",
  },
  // Filled navy on hover — for CTAs on light backgrounds that want a navy accent.
  navy: {
    fill: "var(--navy)",
    border: "rgba(33,77,144,0.4)",
    idleText: "var(--navy)",
    revealText: "#fff",
  },
  // Filled orange on hover, white idle text/border — for CTAs sitting on dark navy cards.
  orangeOnDark: {
    fill: "var(--orange)",
    border: "rgba(255,255,255,0.45)",
    idleText: "#fff",
    revealText: "#fff",
  },
};

interface BaseProps {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  style?: CSSProperties;
}

interface AsLink extends BaseProps, Pick<AnchorHTMLAttributes<HTMLAnchorElement>, "target" | "rel"> {
  href: string;
  onClick?: () => void;
}

interface AsButton extends BaseProps, Pick<ButtonHTMLAttributes<HTMLButtonElement>, "type" | "disabled"> {
  href?: undefined;
  onClick?: () => void;
}

type InteractiveHoverButtonProps = AsLink | AsButton;

// Adapted from Magic UI's Interactive Hover Button
// (https://magicui.design/docs/components/interactive-hover-button): a small
// dot sweeps out to fill the pill on hover while the label slides out and a
// duplicate label slides in on top of the fill. Reimplemented with plain CSS
// classes (see .ihb rules in globals.css) instead of Tailwind's `group`
// utilities + shadcn tokens, since this project uses inline styles and
// CSS variables for its design tokens.
export function InteractiveHoverButton(props: InteractiveHoverButtonProps) {
  const { children, variant = "orange", className, style } = props;
  const v = VARIANTS[variant];

  const cssVars = {
    "--ihb-fill": v.fill,
    "--ihb-border": v.border,
    "--ihb-idle-text": v.idleText,
    "--ihb-reveal-text": v.revealText,
  } as CSSProperties;

  const inner = (
    <span className={`ihb${className ? ` ${className}` : ""}`} style={{ ...cssVars, ...style }}>
      <span className="ihb__dot" aria-hidden="true" />
      <span className="ihb__label">{children}</span>
      <span className="ihb__reveal" aria-hidden="true">
        {children}
      </span>
    </span>
  );

  if (props.href) {
    const { href, onClick, target, rel } = props as AsLink;
    return (
      <Link href={href} onClick={onClick} target={target} rel={rel} className="ihb-link">
        {inner}
      </Link>
    );
  }

  const { onClick, type, disabled } = props as AsButton;
  return (
    <button
      type={type ?? "button"}
      onClick={onClick}
      disabled={disabled}
      className="ihb-link"
      style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
    >
      {inner}
    </button>
  );
}
