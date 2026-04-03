import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";

const TRANSACTIONS = [
  { type: "Purchase", credits: "+100", balance: "340", org: "Global Freight Co.", date: "30/03/2026" },
  { type: "Issuance", credits: "-1", balance: "240", org: "NT26000010", date: "31/03/2026" },
  { type: "Issuance", credits: "-1", balance: "241", org: "NT26000009", date: "29/03/2026" },
  { type: "Purchase", credits: "+50", balance: "242", org: "Alpha Shipping", date: "27/03/2026" },
  { type: "Issuance", credits: "-1", balance: "192", org: "NT26000008", date: "26/03/2026" },
];

export const CreditsMock: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Balance header */}
      <div
        style={{
          padding: 20,
          borderBottom: "1px solid rgba(3,38,51,0.08)",
          display: "flex",
          alignItems: "center",
          gap: 24,
        }}
      >
        <div style={{ opacity: spring({ frame, fps, config: { damping: 200 }, delay: 15 }) }}>
          <div style={{ fontSize: 11, color: "#718096", textTransform: "uppercase", letterSpacing: 0.5 }}>
            Current Balance
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginTop: 4 }}>
            <span style={{ fontSize: 36, fontWeight: 700, color: "#005f6a" }}>
              {Math.round(
                interpolate(
                  spring({ frame, fps, config: { damping: 200 }, delay: 15 }),
                  [0, 1],
                  [0, 340],
                ),
              )}
            </span>
            <span style={{ fontSize: 16, color: "#718096" }}>credits</span>
          </div>
        </div>

        <div style={{ width: 1, height: 40, background: "rgba(3,38,51,0.08)" }} />

        <div style={{ opacity: spring({ frame, fps, config: { damping: 200 }, delay: 22 }) }}>
          <div style={{ fontSize: 11, color: "#718096", textTransform: "uppercase", letterSpacing: 0.5 }}>
            This Month
          </div>
          <div style={{ display: "flex", gap: 16, marginTop: 4 }}>
            <span style={{ fontSize: 16, color: "#16a34a", fontWeight: 600 }}>+150 purchased</span>
            <span style={{ fontSize: 16, color: "#b45309", fontWeight: 600 }}>-3 issued</span>
          </div>
        </div>

        <div
          style={{
            marginLeft: "auto",
            padding: "8px 20px",
            background: "#ee4723",
            borderRadius: 8,
            fontSize: 13,
            fontWeight: 600,
            color: "#fff",
            opacity: spring({ frame, fps, config: { damping: 15 }, delay: 28 }),
          }}
        >
          Purchase Credits
        </div>
      </div>

      {/* Transaction table */}
      <div style={{ flex: 1 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1.5fr 1fr",
            padding: "10px 20px",
            borderBottom: "1px solid rgba(3,38,51,0.08)",
            opacity: spring({ frame, fps, config: { damping: 200 }, delay: 32 }),
          }}
        >
          {["Type", "Credits", "Balance", "Reference", "Date"].map((col) => (
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

        {TRANSACTIONS.map((tx, i) => {
          const rowSpring = spring({ frame, fps, config: { damping: 200 }, delay: 36 + i * 5 });
          const isPositive = tx.credits.startsWith("+");

          return (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr 1.5fr 1fr",
                padding: "10px 20px",
                borderBottom: "1px solid rgba(3,38,51,0.04)",
                opacity: rowSpring,
                transform: `translateY(${interpolate(rowSpring, [0, 1], [8, 0])}px)`,
              }}
            >
              <div style={{ fontSize: 13, color: "#032633" }}>{tx.type}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: isPositive ? "#16a34a" : "#b45309" }}>
                {tx.credits}
              </div>
              <div style={{ fontSize: 13, color: "#005f6a" }}>{tx.balance}</div>
              <div style={{ fontSize: 13, color: "#4a5568" }}>{tx.org}</div>
              <div style={{ fontSize: 13, color: "#718096" }}>{tx.date}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
