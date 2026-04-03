import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";

const BAR_DATA = [
  { label: "Jan", value: 65 },
  { label: "Feb", value: 82 },
  { label: "Mar", value: 45 },
  { label: "Apr", value: 93 },
  { label: "May", value: 71 },
  { label: "Jun", value: 88 },
  { label: "Jul", value: 56 },
  { label: "Aug", value: 77 },
];

const REPORT_TYPES = ["Tonnage", "Carriers", "Freight", "Routes"];

export const ReportsMock: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Toolbar */}
      <div
        style={{
          padding: "12px 20px",
          borderBottom: "1px solid rgba(3,38,51,0.08)",
          display: "flex",
          alignItems: "center",
          gap: 12,
          opacity: spring({ frame, fps, config: { damping: 200 }, delay: 15 }),
        }}
      >
        {REPORT_TYPES.map((rt, i) => {
          const s = spring({ frame, fps, config: { damping: 200 }, delay: 18 + i * 4 });
          return (
            <div
              key={i}
              style={{
                padding: "6px 16px",
                borderRadius: 6,
                fontSize: 13,
                fontWeight: 600,
                color: i === 0 ? "#fff" : "#4a5568",
                background: i === 0 ? "#005f6a" : "rgba(3,38,51,0.04)",
                opacity: s,
              }}
            >
              {rt}
            </div>
          );
        })}
        <div
          style={{
            marginLeft: "auto",
            padding: "6px 14px",
            background: "rgba(3,38,51,0.03)",
            border: "1px solid rgba(3,38,51,0.08)",
            borderRadius: 6,
            fontSize: 12,
            color: "#718096",
          }}
        >
          Q1 2026
        </div>
      </div>

      {/* Chart area */}
      <div style={{ flex: 1, padding: 20, display: "flex", flexDirection: "column" }}>
        <div
          style={{
            fontSize: 15,
            fontWeight: 700,
            color: "#032633",
            marginBottom: 16,
            opacity: spring({ frame, fps, config: { damping: 200 }, delay: 25 }),
          }}
        >
          Tonnage by Port of Discharge (MT)
        </div>

        {/* Bar chart */}
        <div style={{ flex: 1, display: "flex", alignItems: "flex-end", gap: 16, paddingBottom: 24 }}>
          {BAR_DATA.map((bar, i) => {
            const barSpring = spring({
              frame,
              fps,
              config: { damping: 15, stiffness: 80 },
              delay: 30 + i * 4,
            });
            const height = interpolate(barSpring, [0, 1], [0, bar.value]);

            return (
              <div
                key={i}
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <div style={{ fontSize: 12, color: "#032633", fontWeight: 600, opacity: barSpring }}>
                  {Math.round(bar.value * 12.4)}
                </div>
                <div
                  style={{
                    width: "100%",
                    maxWidth: 48,
                    height: `${height}%`,
                    background: "linear-gradient(180deg, #008999, #005f6a)",
                    borderRadius: "4px 4px 0 0",
                    minHeight: 2,
                  }}
                />
                <div style={{ fontSize: 12, color: "#718096", opacity: barSpring }}>
                  {bar.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom stats */}
        <div
          style={{
            display: "flex",
            gap: 24,
            paddingTop: 12,
            borderTop: "1px solid rgba(3,38,51,0.08)",
            opacity: spring({ frame, fps, config: { damping: 200 }, delay: 65 }),
          }}
        >
          {[
            { label: "Total Tonnage", value: "5,924 MT" },
            { label: "Avg Monthly", value: "741 MT" },
            { label: "Certificates", value: "147" },
          ].map((stat, i) => (
            <div key={i}>
              <div style={{ fontSize: 11, color: "#718096", textTransform: "uppercase" }}>{stat.label}</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#005f6a", marginTop: 2 }}>{stat.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
