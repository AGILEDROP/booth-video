import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";

export const CertificateMock: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const row = (delay: number) => {
    const s = spring({ frame, fps, config: { damping: 200 }, delay });
    return { opacity: s, transform: `translateY(${interpolate(s, [0, 1], [8, 0])}px)` };
  };

  const statusPulse = interpolate(frame % 60, [0, 30, 60], [0.6, 1, 0.6]);

  return (
    <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Header bar */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, ...row(15) }}>
        <div style={{ display: "flex", gap: 8, fontSize: 13, color: "#4a5568" }}>
          <span>ECTN</span>
          <span style={{ color: "#a0aec0" }}>/</span>
          <span style={{ color: "#005f6a", fontWeight: 600 }}>NT26000010</span>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              padding: "4px 14px",
              background: "rgba(251,191,36,0.15)",
              border: "1px solid rgba(251,191,36,0.3)",
              borderRadius: 6,
              fontSize: 12,
              fontWeight: 600,
              color: "#b45309",
              opacity: statusPulse,
            }}
          >
            Validate
          </div>
          <div
            style={{
              padding: "4px 14px",
              background: "rgba(34,197,94,0.12)",
              borderRadius: 6,
              fontSize: 12,
              fontWeight: 600,
              color: "#16a34a",
            }}
          >
            Grant
          </div>
          <div
            style={{
              padding: "4px 14px",
              background: "rgba(238,71,35,0.1)",
              borderRadius: 6,
              fontSize: 12,
              fontWeight: 600,
              color: "#ee4723",
            }}
          >
            Refuse
          </div>
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: "rgba(3,38,51,0.08)" }} />

      {/* Certificate details */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 24, ...row(22) }}>
        {[
          { label: "Created By", value: "forwarder" },
          { label: "Agent", value: "agent" },
          { label: "Created On", value: "31/03/2026 10:55" },
          { label: "Import/Export", value: "Import" },
          { label: "ECTN Cost", value: "EUR 40,00" },
        ].map((item, i) => (
          <div key={i} style={{ minWidth: 120 }}>
            <div style={{ fontSize: 11, color: "#718096", textTransform: "uppercase", letterSpacing: 0.5 }}>
              {item.label}
            </div>
            <div style={{ fontSize: 14, color: "#032633", fontWeight: 600, marginTop: 2 }}>
              {item.value}
            </div>
          </div>
        ))}
      </div>

      <div style={{ height: 1, background: "rgba(3,38,51,0.08)" }} />

      {/* Shipment details */}
      <div style={row(30)}>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#005f6a", marginBottom: 12 }}>
          Shipment Details
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {[
            { label: "Vessel", value: "MSC FANTASIA" },
            { label: "Voyage", value: "VY2603" },
            { label: "Port of Loading", value: "Antwerp, Belgium" },
            { label: "Port of Discharge", value: "Ouagadougou" },
            { label: "B/L Number", value: "BL260310001" },
            { label: "Container", value: "MSCU1234567" },
          ].map((item, i) => (
            <div key={i}>
              <div style={{ fontSize: 11, color: "#718096" }}>{item.label}</div>
              <div style={{ fontSize: 13, color: "#032633", marginTop: 1 }}>{item.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Documents */}
      <div style={row(38)}>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#005f6a", marginBottom: 8 }}>
          Documents
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          {["Bill of Lading.pdf", "Invoice.pdf", "Packing List.pdf"].map((doc, i) => (
            <div
              key={i}
              style={{
                padding: "6px 12px",
                background: "rgba(0,95,106,0.08)",
                border: "1px solid rgba(0,95,106,0.15)",
                borderRadius: 6,
                fontSize: 12,
                color: "#005f6a",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <span style={{ color: "#ee4723" }}>&#128196;</span>
              {doc}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
