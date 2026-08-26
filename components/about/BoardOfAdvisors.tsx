import { User } from "lucide-react";
import type { BoardMember } from "@/lib/types/team";

interface BoardOfAdvisorsProps {
  members: BoardMember[];
}

export default function BoardOfAdvisors({ members }: BoardOfAdvisorsProps) {
  if (members.length === 0) return null;

  return (
    <section style={{ background: "var(--cream)", padding: "72px 80px" }}>
      <div style={{ marginBottom: "2rem" }}>
        <p style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "var(--orange)", marginBottom: "0.75rem" }}>
          Governance
        </p>
        <h2 style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)", fontWeight: 800, color: "#000", letterSpacing: "-0.02em" }}>
          Board of Advisors
        </h2>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem" }}>
        {members.map((member) => (
          <div key={member.id} style={{ background: "var(--navy)", borderRadius: 10, padding: "1.5rem" }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                background: member.photoUrl
                  ? `var(--navy-mid) center / cover no-repeat url(${member.photoUrl})`
                  : "var(--navy-mid)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1rem",
              }}
            >
              {!member.photoUrl && <User size={22} color="rgba(255,255,255,0.3)" />}
            </div>
            <h3 style={{ color: "#fff", fontWeight: 700, fontSize: "0.95rem", marginBottom: "0.25rem" }}>
              {member.name}
            </h3>
            <p style={{ color: "var(--orange)", fontSize: "0.78rem", fontWeight: 600, marginBottom: "0.25rem" }}>
              {member.role}
            </p>
            <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.75rem", lineHeight: 1.5 }}>
              {member.organization}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
