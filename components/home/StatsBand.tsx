"use client";

import { NumberTicker } from "@/components/ui/number-ticker";

const stats = [
  { value: 60, suffix: "+", label: "Policy Discussions" },
  { value: 35, suffix: "+", label: "Policy Papers" },
  { value: 1000, suffix: "+", label: "Young Leaders Trained" },
  { value: 40, suffix: "+", label: "Training Topics" },
  { value: 14, suffix: "", label: "Countries of Operation" },
  { value: 30, suffix: "+", label: "Partnerships" },
  { value: 100, suffix: "+", label: "CSOs Evaluated" },
];

export default function StatsBand() {
  return (
    <section style={{ background: "var(--navy-dark)" }}>
      <div
        className="stats-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
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
              padding: `2.5rem var(--section-px)`,
              textAlign: "center",
              animationDelay: `${i * 0.12}s`,
            }}
          >
            <NumberTicker
              value={stat.value}
              suffix={stat.suffix}
              style={{
                display: "block",
                fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
                fontWeight: 800,
                color: "#fff",
                lineHeight: 1,
                marginBottom: "0.4rem",
              }}
            />
            <span
              style={{
                fontSize: "0.72rem",
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
        @media (max-width: 900px) {
          .stats-grid {
            grid-template-columns: repeat(4, 1fr) !important;
          }
        }
        @media (max-width: 560px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}
