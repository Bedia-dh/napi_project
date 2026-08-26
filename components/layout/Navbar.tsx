"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { navLinks, languages } from "@/lib/constants/navigation";
import { Search, ChevronDown, Globe, Menu, X } from "lucide-react";

interface NavbarProps {
  onSearchOpen: () => void;
}

export default function Navbar({ onSearchOpen }: NavbarProps) {
  const [activeLang, setActiveLang] = useState("en");
  const [langOpen, setLangOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  // Close the language dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Close mobile menu on route change (resize past breakpoint)
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 900) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const activeLangObj = languages.find((l) => l.code === activeLang) ?? languages[0];

  return (
    <>
      <nav
        style={{
          background: "var(--navy-dark)",
          borderBottom: "1px solid rgba(255,255,255,.07)",
          position: "sticky",
          top: 0,
          zIndex: 200,
          height: 76,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
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
            <li key={link.href}>
              <Link
                href={link.href}
                style={{
                  color: "rgba(255,255,255,0.7)",
                  textDecoration: "none",
                  fontSize: "1rem",
                  fontWeight: 600,
                  transition: "color .2s",
                }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#fff")}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.7)")}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop right: language dropdown + search + Get Involved */}
        <div className="nav-right-desktop">
          {/* Language dropdown */}
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
              <ChevronDown
                size={16}
                style={{ transform: langOpen ? "rotate(180deg)" : "none", transition: "transform .15s" }}
              />
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
                    onClick={() => {
                      setActiveLang(lang.code);
                      setLangOpen(false);
                    }}
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

          {/* Search button */}
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

          <Link
            href="/contact"
            style={{
              color: "#fff",
              fontWeight: 700,
              textDecoration: "none",
              fontSize: "0.95rem",
              padding: "11px 22px",
              border: "1.5px solid rgba(255,255,255,.3)",
              borderRadius: 6,
              transition: "all .2s",
              marginLeft: 6,
            }}
          >
            Get Involved
          </Link>
        </div>

        {/* Mobile: search + hamburger */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button
            onClick={onSearchOpen}
            aria-label="Search"
            className="nav-hamburger"
            style={{ color: "#fff" }}
          >
            <Search size={22} />
          </button>
          <button
            className="nav-hamburger"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </nav>

      {/* Mobile slide-down menu */}
      {mobileOpen && (
        <div className="nav-mobile-menu">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)}>
              {link.label}
            </Link>
          ))}
          <Link href="/contact" onClick={() => setMobileOpen(false)}>
            Get Involved
          </Link>
        </div>
      )}
    </>
  );
}
