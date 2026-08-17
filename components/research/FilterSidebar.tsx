"use client";

import type { CSSProperties } from "react";

export interface FacetOption {
  value: string;
  count: number;
}

export interface Facets {
  theme: FacetOption[];
  type: FacetOption[];
  program: FacetOption[];
  lang: FacetOption[];
  year: FacetOption[];
}

interface FilterSidebarProps {
  facets: Facets | null;
  activeThemes: string[];
  activeTypes: string[];
  activeLangs: string[];
  activePrograms: string[];
  activeYears: string[];
  onToggleTheme: (v: string) => void;
  onToggleType: (v: string) => void;
  onToggleLang: (v: string) => void;
  onToggleProgram: (v: string) => void;
  onToggleYear: (v: string) => void;
  onClear: () => void;
}

const themeLabels: Record<string, string> = {
  "health-equity": "Health",
  governance: "Governance",
  climate: "Climate",
  education: "Education",
  gender: "Gender",
  economy: "Economy",
};

const typeLabels: Record<string, string> = {
  brief: "Policy Brief",
  paper: "Research Paper",
  report: "Report",
  proceedings: "Proceedings",
};

const programLabels: Record<string, string> = {
  ypl: "YPL",
  "chill-chat": "Chill Chat",
  "youth-voices": "Youth Voices",
  "mei-roundtables": "MEI Roundtables",
};

function chipStyle(active: boolean): CSSProperties {
  return {
    border: active ? "1.5px solid var(--orange)" : "1.5px solid rgba(255,255,255,.2)",
    borderRadius: 20,
    padding: "5px 12px",
    fontSize: "0.78rem",
    cursor: "pointer",
    color: active ? "var(--orange)" : "rgba(255,255,255,.7)",
    background: active ? "rgba(240,112,48,.12)" : "transparent",
    fontWeight: active ? 700 : 400,
  };
}

export default function FilterSidebar({
  facets,
  activeThemes,
  activeTypes,
  activeLangs,
  activePrograms,
  activeYears,
  onToggleTheme,
  onToggleType,
  onToggleLang,
  onToggleProgram,
  onToggleYear,
  onClear,
}: FilterSidebarProps) {
  const anyActive =
    activeThemes.length || activeTypes.length || activeLangs.length || activePrograms.length || activeYears.length;

  return (
    <aside
      style={{
        background: "rgba(255,255,255,.06)",
        border: "1px solid rgba(255,255,255,.1)",
        borderRadius: 12,
        padding: 24,
        position: "sticky",
        top: 158,
        alignSelf: "flex-start",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#fff" }}>Filter By</h3>
        {!!anyActive && (
          <button
            onClick={onClear}
            style={{ fontSize: "0.78rem", color: "var(--orange)", cursor: "pointer", background: "none", border: "none", fontWeight: 600 }}
          >
            Clear all
          </button>
        )}
      </div>

      {/* Language */}
      <div style={{ marginBottom: 22 }}>
        <h4 style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.5px", color: "rgba(255,255,255,.4)", marginBottom: 12 }}>
          Language
        </h4>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
          {(facets?.lang ?? []).map(({ value, count }) => (
            <span
              key={value}
              onClick={() => onToggleLang(value)}
              style={chipStyle(activeLangs.includes(value))}
            >
              {value.toUpperCase()} ({count})
            </span>
          ))}
        </div>
      </div>

      {/* Type */}
      <div style={{ marginBottom: 22 }}>
        <h4 style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.5px", color: "rgba(255,255,255,.4)", marginBottom: 12 }}>
          Type
        </h4>
        <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
          {(facets?.type ?? []).map(({ value, count }) => (
            <label key={value} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={activeTypes.includes(value)}
                onChange={() => onToggleType(value)}
                style={{ accentColor: "var(--orange)", width: 15, height: 15 }}
              />
              <span style={{ fontSize: "0.83rem", color: "rgba(255,255,255,.7)", flex: 1 }}>{typeLabels[value] ?? value}</span>
              <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,.35)", background: "rgba(255,255,255,.08)", padding: "2px 7px", borderRadius: 10 }}>
                {count}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Policy Issue */}
      <div style={{ marginBottom: 22 }}>
        <h4 style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.5px", color: "rgba(255,255,255,.4)", marginBottom: 12 }}>
          Policy Issue
        </h4>
        <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
          {(facets?.theme ?? []).map(({ value, count }) => (
            <label key={value} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={activeThemes.includes(value)}
                onChange={() => onToggleTheme(value)}
                style={{ accentColor: "var(--orange)", width: 15, height: 15 }}
              />
              <span style={{ fontSize: "0.83rem", color: "rgba(255,255,255,.7)", flex: 1 }}>{themeLabels[value] ?? value}</span>
              <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,.35)", background: "rgba(255,255,255,.08)", padding: "2px 7px", borderRadius: 10 }}>
                {count}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Program */}
      <div style={{ marginBottom: 22 }}>
        <h4 style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.5px", color: "rgba(255,255,255,.4)", marginBottom: 12 }}>
          Program
        </h4>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
          {(facets?.program ?? []).map(({ value, count }) => (
            <span
              key={value}
              onClick={() => onToggleProgram(value)}
              style={chipStyle(activePrograms.includes(value))}
            >
              {programLabels[value] ?? value} ({count})
            </span>
          ))}
        </div>
      </div>

      {/* Year */}
      <div>
        <h4 style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.5px", color: "rgba(255,255,255,.4)", marginBottom: 12 }}>
          Year
        </h4>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
          {(facets?.year ?? []).map(({ value, count }) => (
            <span
              key={value}
              onClick={() => onToggleYear(value)}
              style={chipStyle(activeYears.includes(value))}
            >
              {value} ({count})
            </span>
          ))}
        </div>
      </div>
    </aside>
  );
}
