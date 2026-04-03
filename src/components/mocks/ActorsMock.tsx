import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";

const ACTORS = [
  { name: "Alfonso Corwin", type: "Carrier", phone: "813.609.3238", city: "Mooreport", country: "Sudan", enabled: true },
  { name: "Anabel Rice", type: "Consignee", phone: "(772) 858-7154", city: "Port Kamron", country: "Kenya", enabled: true },
  { name: "Ardella Stark", type: "Shipper", phone: "870-786-1544", city: "West Austynfort", country: "Guinea", enabled: true },
  { name: "Global Freight Co.", type: "Forwarder", phone: "+33 1 4567890", city: "Paris", country: "France", enabled: true },
  { name: "TransOcean Ltd.", type: "Carrier", phone: "+44 20 7946", city: "London", country: "UK", enabled: false },
];

const COLUMNS = ["Name", "Type", "Phone", "City", "Country", "Enabled"];

export const ActorsMock: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Toolbar */}
      <div
        style={{
          padding: "12px 20px",
          display: "flex",
          alignItems: "center",
          gap: 12,
          borderBottom: "1px solid rgba(3,38,51,0.08)",
          opacity: spring({ frame, fps, config: { damping: 200 }, delay: 15 }),
        }}
      >
        <div
          style={{
            flex: 1,
            padding: "8px 14px",
            background: "rgba(3,38,51,0.03)",
            borderRadius: 6,
            border: "1px solid rgba(3,38,51,0.08)",
            fontSize: 13,
            color: "#a0aec0",
          }}
        >
          Search + Enter
        </div>
        <div
          style={{
            padding: "8px 16px",
            background: "rgba(0,95,106,0.08)",
            borderRadius: 6,
            fontSize: 13,
            color: "#005f6a",
            fontWeight: 600,
          }}
        >
          Show Filter
        </div>
        <div
          style={{
            padding: "8px 16px",
            background: "#ee4723",
            borderRadius: 6,
            fontSize: 13,
            color: "#fff",
            fontWeight: 600,
          }}
        >
          + Add
        </div>
      </div>

      {/* Table */}
      <div style={{ flex: 1, overflow: "hidden" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1.5fr 1.2fr 1fr 0.8fr",
            padding: "10px 20px",
            borderBottom: "1px solid rgba(3,38,51,0.08)",
            opacity: spring({ frame, fps, config: { damping: 200 }, delay: 20 }),
          }}
        >
          {COLUMNS.map((col) => (
            <div
              key={col}
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: "#718096",
                textTransform: "uppercase",
                letterSpacing: 0.5,
              }}
            >
              {col}
            </div>
          ))}
        </div>

        {ACTORS.map((actor, i) => {
          const rowSpring = spring({ frame, fps, config: { damping: 200 }, delay: 25 + i * 6 });
          const rowY = interpolate(rowSpring, [0, 1], [10, 0]);
          const isHighlighted = i === 1;
          const highlightProgress = spring({ frame, fps, config: { damping: 200 }, delay: 55 });

          return (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "2fr 1fr 1.5fr 1.2fr 1fr 0.8fr",
                padding: "10px 20px",
                borderBottom: "1px solid rgba(3,38,51,0.04)",
                opacity: rowSpring,
                transform: `translateY(${rowY}px)`,
                background: isHighlighted
                  ? `rgba(0,95,106,${interpolate(highlightProgress, [0, 1], [0, 0.06])})`
                  : "transparent",
              }}
            >
              <div style={{ fontSize: 13, color: "#032633", fontWeight: 600 }}>{actor.name}</div>
              <div style={{ fontSize: 13, color: "#005f6a" }}>{actor.type}</div>
              <div style={{ fontSize: 13, color: "#4a5568" }}>{actor.phone}</div>
              <div style={{ fontSize: 13, color: "#4a5568" }}>{actor.city}</div>
              <div style={{ fontSize: 13, color: "#4a5568" }}>{actor.country}</div>
              <div style={{ fontSize: 12, color: actor.enabled ? "#16a34a" : "#ee4723", fontWeight: 600 }}>
                {actor.enabled ? "Yes" : "No"}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
