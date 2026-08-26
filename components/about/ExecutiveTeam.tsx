"use client";

import { useState } from "react";
import { User, Link2, MessageCircle, Mail } from "lucide-react";
import type { TeamMember } from "@/lib/types/team";

interface ExecutiveTeamProps {
  members: TeamMember[];
}

export default function ExecutiveTeam({ members }: ExecutiveTeamProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  if (members.length === 0) return null;

  return (
    <section style={{ background: "var(--navy)", padding: "72px 80px" }}>
      <div style={{ marginBottom: "2rem" }}>
        <p style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "var(--orange)", marginBottom: "0.75rem" }}>
          Leadership
        </p>
        <h2 style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)", fontWeight: 800, color: "#fff", letterSpacing: "-0.02em" }}>
          Executive Team
        </h2>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.25rem" }}>
        {members.map((member) => (
          <div
            key={member.id}
            onMouseEnter={() => setHoveredId(member.id)}
            onMouseLeave={() => setHoveredId(null)}
            style={{ position: "relative", borderRadius: 10, overflow: "hidden", cursor: "pointer" }}
          >
            {/* Photo (from CMS upload/URL) or placeholder icon if none set */}
            <div
              style={{
                background: member.photoUrl
                  ? `var(--navy-mid) center top / cover no-repeat url(${member.photoUrl})`
                  : "var(--navy-mid)",
                height: 260,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {!member.photoUrl && <User size={64} color="rgba(255,255,255,0.15)" />}
            </div>

            {/* Default name bar */}
            <div style={{ background: "rgba(255,255,255,.06)", padding: "1rem" }}>
              <h3 style={{ color: "#fff", fontWeight: 700, fontSize: "0.95rem" }}>{member.name}</h3>
              <p style={{ color: "var(--orange)", fontSize: "0.8rem", fontWeight: 600 }}>{member.role}</p>
            </div>

            {/* Hover overlay */}
            {hoveredId === member.id && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "rgba(33,77,144,0.96)",
                  padding: "1.5rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  gap: "0.6rem",
                }}
              >
                <h3 style={{ color: "#fff", fontWeight: 700, fontSize: "0.95rem" }}>{member.name}</h3>
                <p style={{ color: "var(--orange)", fontSize: "0.78rem", fontWeight: 600 }}>{member.role}</p>
                <p style={{ color: "rgba(0,0,0,.7)", fontSize: "0.78rem", lineHeight: 1.7 }}>{member.bio}</p>
                <div style={{ display: "flex", gap: "0.75rem", marginTop: "auto" }}>
                  {member.linkedin && (
                    <a href={member.linkedin} style={{ color: "rgba(0,0,0,.6)" }}>
                      <Link2 size={16} />
                    </a>
                  )}
                  {member.twitter && (
                    <a href={member.twitter} style={{ color: "rgba(0,0,0,.6)" }}>
                      <MessageCircle size={16} />
                    </a>
                  )}
                  {member.email && (
                    <a href={`mailto:${member.email}`} style={{ color: "rgba(0,0,0,.6)" }}>
                      <Mail size={16} />
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
