"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { navLinks, languages } from "@/lib/constants/navigation";
import { Search, ChevronDown, Globe, Menu, X } from "lucide-react";
import { InteractiveHoverButton } from "@/components/ui/InteractiveHoverButton";

interface NavbarProps {
  onSearchOpen: () => void;
}

export default function Navbar({ onSearchOpen }: NavbarProps) {
  const [activeLang, setActiveLang] = useState("en");
  const [langOpen, setLangOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const langRef = useRef<HTMLDivElement>(null);
  const dropdownTimeout = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 900) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const activeLangObj = languages.find((l) => l.code === activeLang) ?? languages[0];

  const handleDropdownEnter = (label: string) => {
    clearTimeout(dropdownTimeout.current);
    setOpenDropdown(label);
  };

  const handleDropdownLeave = () => {
    dropdownTimeout.current = setTimeout(() => setOpenDropdown(null), 150);
  };

  return (
    <>
      <nav
        className="nav-bar"
        style={{
          background: "var(--navy-dark)",
          borderBottom: "1px solid rgba(255,255,255,.07)",
          position: "sticky",
          top: 0,
          zIndex: 200,
          height: 76,
          display: "grid",
          gridTemplateColumns: "auto 1fr auto",
          alignItems: "center",
          padding: "0 var(--section-px)",
          boxShadow: "0 2px 16px rgba(0,0,0,.2)",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          className="nav-logo"
          style={{ display: "flex", alignItems: "center", textDecoration: "none", flexShrink: 0 }}
          onClick={() => setMobileOpen(false)}
        >
          <Image
            src="/media/logo_napi.png"
            alt="NAPI"
            width={200}
            height={60}
            style={{ objectFit: "contain", height: "auto", width: "auto", maxHeight: 60 }}
            priority
          />
        </Link>

        {/* Desktop nav links */}
        <ul className="nav-links-desktop">
          {navLinks.map((link) => (
            <li
              key={link.href}
              style={{ position: "relative" }}
              onMouseEnter={() => link.children && handleDropdownEnter(link.label)}
              onMouseLeave={() => link.children && handleDropdownLeave()}
            >
              <Link
                href={link.href}
                style={{
                  color: "rgba(255,255,255,0.7)",
                  textDecoration: "none",
                  fontSize: "1rem",
                  fontWeight: 600,
                  transition: "color .2s",
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#fff")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.7)")}
              >
                {link.label}
                {link.children && <ChevronDown size={14} style={{ opacity: 0.6 }} />}
              </Link>

              {/* Dropdown */}
              {link.children && openDropdown === link.label && (
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    paddingTop: 8,
                    zIndex: 300,
                  }}
                >
                  <div
                    style={{
                      background: "var(--navy-mid)",
                      border: "1px solid rgba(255,255,255,.12)",
                      borderRadius: 8,
                      overflow: "hidden",
                      minWidth: 260,
                      boxShadow: "0 8px 24px rgba(0,0,0,.4)",
                    }}
                  >
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setOpenDropdown(null)}
                        style={{
                          display: "block",
                          padding: "10px 16px",
                          color: "rgba(255,255,255,.8)",
                          fontSize: "0.88rem",
                          fontWeight: 500,
                          textDecoration: "none",
                          transition: "background .15s, color .15s",
                          borderBottom: "1px solid rgba(255,255,255,.06)",
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,.08)";
                          (e.currentTarget as HTMLElement).style.color = "#fff";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.background = "transparent";
                          (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,.8)";
                        }}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* Desktop right */}
        <div className="nav-right-desktop">
          <div ref={langRef} style={{ position: "relative" }}>
            <button
              onClick={() => setLangOpen((v) => !v)}
              aria-haspopup="listbox"
              aria-expanded={langOpen}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 7,
                background: langOpen ? "rgba(255,255,255,.08)" : "transparent",
                color: "#fff",
                border: "1px solid rgba(255,255,255,.25)",
                borderRadius: 6,
                padding: "9px 14px",
                fontSize: "0.9rem",
                fontWeight: 600,
                cursor: "pointer",
                transition: "background .15s",
              }}
            >
              <Globe size={17} />
              {activeLangObj.label}
              <ChevronDown size={16} style={{ transform: langOpen ? "rotate(180deg)" : "none", transition: "transform .15s" }} />
            </button>

            {langOpen && (
              <div
                role="listbox"
                style={{
                  position: "absolute",
                  top: "calc(100% + 8px)",
                  right: 0,
                  background: "var(--navy-mid)",
                  border: "1px solid rgba(255,255,255,.15)",
                  borderRadius: 8,
                  overflow: "hidden",
                  minWidth: 125,
                  boxShadow: "0 8px 24px rgba(0,0,0,.4)",
                  zIndex: 300,
                }}
              >
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    role="option"
                    aria-selected={activeLang === lang.code}
                    onClick={() => { setActiveLang(lang.code); setLangOpen(false); }}
                    style={{
                      display: "block",
                      width: "100%",
                      textAlign: "left",
                      background: activeLang === lang.code ? "var(--orange)" : "transparent",
                      color: "#fff",
                      border: "none",
                      padding: "10px 16px",
                      fontSize: "0.88rem",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={onSearchOpen}
            aria-label="Search"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 42,
              height: 42,
              flexShrink: 0,
              background: "transparent",
              color: "#fff",
              border: "1px solid rgba(255,255,255,.25)",
              borderRadius: 6,
              cursor: "pointer",
            }}
          >
            <Search size={19} />
          </button>

          <InteractiveHoverButton href="/get-involved" variant="orangeOnDark">
            Get Involved
          </InteractiveHoverButton>
        </div>

        {/* Mobile: search + hamburger */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button onClick={onSearchOpen} aria-label="Search" className="nav-hamburger" style={{ color: "#fff" }}>
            <Search size={22} />
          </button>
          <button className="nav-hamburger" onClick={() => setMobileOpen((v) => !v)} aria-label={mobileOpen ? "Close menu" : "Open menu"}>
            {mobileOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </nav>

      {/* Mobile slide-down menu */}
      {mobileOpen && (
        <div className="nav-mobile-menu">
          {navLinks.map((link) => (
            <div key={link.href}>
              <Link href={link.href} onClick={() => setMobileOpen(false)}>
                {link.label}
              </Link>
              {link.children && (
                <div style={{ paddingLeft: "1rem", display: "flex", flexDirection: "column", gap: 4 }}>
                  {link.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      onClick={() => setMobileOpen(false)}
                      style={{ fontSize: "0.85rem", opacity: 0.8 }}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Link href="/get-involved" onClick={() => setMobileOpen(false)}>
            Get Involved
          </Link>
        </div>
      )}
    </>
  );
}
