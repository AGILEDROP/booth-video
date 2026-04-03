import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";

const INVOICES = [
  { id: "INV-2026-0042", org: "Global Freight Co.", amount: "EUR 320,00", status: "paid", date: "28/03/2026" },
  { id: "INV-2026-0041", org: "TransOcean Ltd.", amount: "EUR 160,00", status: "paid", date: "25/03/2026" },
  { id: "INV-2026-0040", org: "Alpha Shipping", amount: "EUR 480,00", status: "pending", date: "22/03/2026" },
  { id: "INV-2026-0039", org: "MedTrade SARL", amount: "EUR 200,00", status: "paid", date: "19/03/2026" },
  { id: "INV-2026-0038", org: "CargoPrime Inc.", amount: "EUR 120,00", status: "overdue", date: "15/03/2026" },
];

export const BillingMock: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Summary cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 12,
          padding: 20,
          borderBottom: "1px solid rgba(3,38,51,0.08)",
        }}
      >
        {[
          { label: "Total Revenue", value: "EUR 12,480", color: "#16a34a" },
          { label: "Pending", value: "EUR 480", color: "#b45309" },
          { label: "Overdue", value: "EUR 120", color: "#ee4723" },
        ].map((card, i) => {
          const s = spring({ frame, fps, config: { damping: 200 }, delay: 15 + i * 5 });
          return (
            <div
              key={i}
              style={{
                padding: "14px 16px",
                background: "rgba(3,38,51,0.03)",
                borderRadius: 8,
                border: "1px solid rgba(3,38,51,0.06)",
                opacity: s,
                transform: `scale(${interpolate(s, [0, 1], [0.95, 1])})`,
              }}
            >
              <div style={{ fontSize: 11, color: "#718096", textTransform: "uppercase", letterSpacing: 0.5 }}>
                {card.label}
              </div>
              <div style={{ fontSize: 22, fontWeight: 700, color: card.color, marginTop: 4 }}>
                {card.value}
              </div>
            </div>
          );
        })}
      </div>

      {/* Invoice table */}
      <div style={{ flex: 1 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.5fr 2fr 1.2fr 1fr 1fr",
            padding: "10px 20px",
            borderBottom: "1px solid rgba(3,38,51,0.08)",
            opacity: spring({ frame, fps, config: { damping: 200 }, delay: 30 }),
          }}
        >
          {["Invoice", "Organisation", "Amount", "Status", "Date"].map((col) => (
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

        {INVOICES.map((inv, i) => {
          const rowSpring = spring({ frame, fps, config: { damping: 200 }, delay: 35 + i * 6 });
          const statusColor =
            inv.status === "paid" ? "#16a34a" : inv.status === "pending" ? "#b45309" : "#ee4723";
          const statusBg =
            inv.status === "paid"
              ? "rgba(22,163,74,0.1)"
              : inv.status === "pending"
              ? "rgba(180,83,9,0.1)"
              : "rgba(238,71,35,0.1)";

          return (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "1.5fr 2fr 1.2fr 1fr 1fr",
                padding: "10px 20px",
                borderBottom: "1px solid rgba(3,38,51,0.04)",
                opacity: rowSpring,
                transform: `translateY(${interpolate(rowSpring, [0, 1], [8, 0])}px)`,
              }}
            >
              <div style={{ fontSize: 13, color: "#005f6a", fontWeight: 600 }}>{inv.id}</div>
              <div style={{ fontSize: 13, color: "#032633" }}>{inv.org}</div>
              <div style={{ fontSize: 13, color: "#032633", fontWeight: 600 }}>{inv.amount}</div>
              <div>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: statusColor,
                    background: statusBg,
                    padding: "2px 8px",
                    borderRadius: 4,
                    textTransform: "capitalize",
                  }}
                >
                  {inv.status}
                </span>
              </div>
              <div style={{ fontSize: 13, color: "#718096" }}>{inv.date}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
