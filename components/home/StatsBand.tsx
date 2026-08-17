"use client";

import { NumberTicker } from "@/components/ui/number-ticker";

const stats = [
  { value: 85, suffix: "+", label: "Publications" },
  { value: 200, suffix: "+", label: "Young Leaders Trained" },
  { value: 12, suffix: "", label: "Countries Reached" },
  { value: 6, suffix: "", label: "Policy Issues" },
];

export default function StatsBand() {
  return (
    <section style={{ background: "var(--navy-dark)" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 1,
          background: "rgba(255,255,255,0.08)",
        }}
      >
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className="stat-cell"
            style={{
              background: "var(--navy-dark)",
              padding: "2.5rem 80px",
              textAlign: "center",
              animationDelay: `${i * 0.12}s`,
            }}
          >
            <NumberTicker
              value={stat.value}
              suffix={stat.suffix}
              style={{
                display: "block",
                fontSize: "2.75rem",
                fontWeight: 800,
                color: "#fff",
                lineHeight: 1,
                marginBottom: "0.4rem",
              }}
            />
            <span
              style={{
                fontSize: "0.78rem",
                color: "rgba(255,255,255,0.55)",
                fontWeight: 500,
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes statFadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .stat-cell {
          animation: statFadeUp .6s ease both;
          transition: background .2s ease;
        }
        .stat-cell:hover {
          background: var(--navy-mid) !important;
        }
      `}</style>
    </section>
  );
}
