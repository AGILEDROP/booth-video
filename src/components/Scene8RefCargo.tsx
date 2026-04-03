import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";
import { loadFont as loadMontserrat } from "@remotion/google-fonts/Montserrat";
import { loadFont as loadNunito } from "@remotion/google-fonts/Nunito";
import { AgiledropNoiseBg } from "./AgiledropNoiseBg";
import { BrowserFrame } from "./BrowserFrame";

const { fontFamily: headlineFont } = loadMontserrat("normal", {
  weights: ["600", "700", "800"],
  subsets: ["latin"],
});
const { fontFamily: bodyFont } = loadNunito("normal", {
  weights: ["400", "600", "700"],
  subsets: ["latin"],
});

/** CertiFlow — light theme, scanned doc left, extracted data right — FILLS entire frame */
const CertiFlowContent: React.FC = () => (
  <div style={{ height: "100%", display: "flex", flexDirection: "column", background: "#f8f9fb", minHeight: 0 }}>
    {/* Sub-header */}
    <div style={{ padding: "4px 10px", background: "#fff", borderBottom: "1px solid #e5e7eb", display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
      <span style={{ fontSize: 7, color: "#94a3b8" }}>ECTN /</span>
      <span style={{ fontSize: 7, color: "#7c3aed", fontWeight: 700 }}>NT26000010</span>
      <div style={{ padding: "1px 4px", background: "#fef3c7", border: "1px solid #fde68a", borderRadius: 3, fontSize: 6, fontWeight: 600, color: "#92400e" }}>Validate</div>
      <div style={{ marginLeft: "auto", display: "flex", gap: 3 }}>
        <div style={{ padding: "1px 5px", background: "#7c3aed", borderRadius: 3, fontSize: 6, fontWeight: 600, color: "#fff" }}>Grant</div>
        <div style={{ padding: "1px 5px", background: "#f59e0b18", border: "1px solid #f59e0b30", borderRadius: 3, fontSize: 6, fontWeight: 600, color: "#b45309" }}>Refuse</div>
      </div>
    </div>
    {/* Meta row */}
    <div style={{ padding: "3px 10px", display: "flex", gap: 8, fontSize: 6, background: "#fff", borderBottom: "1px solid #f1f5f9", flexShrink: 0 }}>
      {[{ l: "Created By", v: "forwarder" }, { l: "Agent", v: "agent" }, { l: "Created", v: "31/03/2026" }, { l: "Import", v: "Import" }, { l: "Cost", v: "EUR 40,00" }].map((m, i) => (
        <div key={i}><span style={{ color: "#94a3b8" }}>{m.l}: </span><span style={{ color: "#334155", fontWeight: 600 }}>{m.v}</span></div>
      ))}
    </div>
    {/* Step indicator */}
    <div style={{ padding: "2px 10px", display: "flex", alignItems: "center", gap: 4, fontSize: 6, background: "#faf5ff", borderBottom: "1px solid #e9d5ff", flexShrink: 0 }}>
      <span style={{ color: "#16a34a" }}>✓ Step 1: Upload Bill of Lading</span>
      <span style={{ color: "#94a3b8" }}>→</span>
      <span style={{ color: "#7c3aed", fontWeight: 600 }}>Step 2: Verify extracted data</span>
    </div>
    {/* Main split — MUST fill remaining space */}
    <div style={{ flex: 1, display: "flex", gap: 5, padding: "5px 8px", minHeight: 0 }}>
      {/* Left: Scanned document — fills full height */}
      <div style={{ flex: 1, background: "#fff", borderRadius: 5, border: "1px solid #e2e8f0", display: "flex", flexDirection: "column", minHeight: 0 }}>
        <div style={{ padding: "2px 6px", background: "#f8fafc", borderBottom: "1px solid #e2e8f0", display: "flex", alignItems: "center", gap: 3, fontSize: 6, color: "#64748b", flexShrink: 0 }}>
          <span>📄</span><span style={{ fontFamily: "monospace", fontSize: 5 }}>BL_HY920388.pdf</span><span style={{ marginLeft: "auto" }}>1/3</span>
        </div>
        <div style={{ flex: 1, background: "#faf8f3", padding: "6px 7px", display: "flex", flexDirection: "column", gap: 2, overflow: "hidden" }}>
          <div style={{ textAlign: "center", fontSize: 8, fontWeight: 700, color: "#1e293b", borderBottom: "1.5px solid #94a3b8", paddingBottom: 2 }}>
            CertiFlow — Electronic Trade Certificate
          </div>
          <div style={{ fontSize: 6, color: "#334155", lineHeight: 1.5 }}>
            <div><b>Order Number:</b> VO-32340</div>
            <div><b>Country of Destination:</b> NORTHLAND</div>
            <div><b>Freight Rate All Marine Details</b></div>
          </div>
          <div style={{ fontSize: 6.5, fontWeight: 700, color: "#1e293b", borderBottom: "1px solid #cbd5e1", paddingBottom: 1 }}>Shipping Details</div>
          <div style={{ fontSize: 5.5, color: "#334155", lineHeight: 1.5 }}>
            <div>Name of Vessel: <b>ATLANTIC VOYAGER</b></div>
            <div>B/L Date: 19-01-2026 &nbsp; Arrival: 08-02-2026</div>
            <div>B/L Number: <b>HY920388</b></div>
            <div>Port of Loading: European Port</div>
            <div>Port of Discharge: CertiPort, NORTHLAND</div>
          </div>
          <div style={{ fontSize: 6.5, fontWeight: 700, color: "#1e293b", borderBottom: "1px solid #cbd5e1", paddingBottom: 1 }}>Cargo Details</div>
          <div style={{ fontSize: 5.5, color: "#334155", lineHeight: 1.5 }}>
            <div>Description: Industrial Equipment</div>
            <div>Customs Type: <b>CODE 310</b></div>
            <div>Gross Weight: 42,600 kg</div>
            <div>No. of Packages: 6 units</div>
          </div>
          <div style={{ fontSize: 6.5, fontWeight: 700, color: "#1e293b", borderBottom: "1px solid #cbd5e1", paddingBottom: 1 }}>Freight Charges</div>
          <div style={{ fontSize: 5.5, color: "#334155" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}><span>Seafreight 40ft container</span><span>EUR 1,200.00</span></div>
            <div style={{ display: "flex", justifyContent: "space-between" }}><span>Total Surcharges incl. tax</span><span>EUR 380.00</span></div>
            <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, borderTop: "1px solid #cbd5e1", marginTop: 1, paddingTop: 1 }}><span>Total</span><span>EUR 1,580.00</span></div>
          </div>
          <div style={{ fontSize: 6.5, fontWeight: 700, color: "#1e293b", borderBottom: "1px solid #cbd5e1", paddingBottom: 1 }}>Seal & Container Numbers</div>
          <div style={{ fontSize: 5.5, color: "#334155", lineHeight: 1.5 }}>
            <div>Container No: GMMU 7816 7</div>
            <div>Seal No: SL-44829</div>
            <div>Container Type: 40ft High Cube</div>
            <div>Tare Weight: 3,800 kg</div>
          </div>
          <div style={{ fontSize: 6.5, fontWeight: 700, color: "#1e293b", borderBottom: "1px solid #cbd5e1", paddingBottom: 1 }}>Parties</div>
          <div style={{ fontSize: 5.5, color: "#334155", lineHeight: 1.5 }}>
            <div>Shipper: GPESYA Industrial Corp.</div>
            <div>Consignee: Northland Import Ltd.</div>
            <div>Notify: CertiPort Customs Agency</div>
          </div>
        </div>
      </div>
      {/* Right: Extracted data — fills full height */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4, minHeight: 0 }}>
        <div style={{ background: "#fff", borderRadius: 5, border: "1px solid #e2e8f0", padding: 6 }}>
          <div style={{ fontSize: 7, fontWeight: 700, color: "#7c3aed", marginBottom: 3 }}>General Shipping Details</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2px 6px", fontSize: 6 }}>
            {[{ l: "Shipper", v: "GPESYA" }, { l: "Country", v: "EUR" }, { l: "CIF", v: "MASOMRA" }, { l: "Notify", v: "BULK" }, { l: "Consignee", v: "NORTHLAND IMP." }, { l: "Incoterms", v: "CIF" }].map((f, i) => (
              <div key={i}><div style={{ fontSize: 5, color: "#94a3b8", textTransform: "uppercase" }}>{f.l}</div><div style={{ color: "#1e293b", fontWeight: 600 }}>{f.v}</div></div>
            ))}
          </div>
        </div>
        <div style={{ background: "#fff", borderRadius: 5, border: "1px solid #e2e8f0", padding: 6 }}>
          <div style={{ fontSize: 7, fontWeight: 700, color: "#7c3aed", marginBottom: 2 }}>Goods</div>
          <div style={{ display: "flex", fontSize: 5, color: "#94a3b8", fontWeight: 600, gap: 2, marginBottom: 1 }}>
            <span style={{ flex: 2 }}>HS CODE</span><span style={{ flex: 1 }}>GROSS KG</span><span style={{ flex: 1 }}>FOB VALUE</span><span style={{ flex: 1 }}>PKGS</span>
          </div>
          {[
            { hs: "8428.90", w: "18,400", val: "EUR 42k", pkg: "4", desc: "Industrial conveyors" },
            { hs: "8429.11", w: "24,200", val: "EUR 68k", pkg: "2", desc: "Bulldozer parts" },
          ].map((g, i) => (
            <div key={i} style={{ borderTop: "1px solid #f1f5f9", padding: "2px 0" }}>
              <div style={{ display: "flex", fontSize: 6, gap: 2, color: "#334155" }}>
                <span style={{ flex: 2, fontFamily: "monospace", color: "#7c3aed", fontWeight: 600 }}>{g.hs}</span>
                <span style={{ flex: 1 }}>{g.w}</span><span style={{ flex: 1 }}>{g.val}</span><span style={{ flex: 1 }}>{g.pkg}</span>
              </div>
              <div style={{ fontSize: 5, color: "#94a3b8" }}>{g.desc}</div>
            </div>
          ))}
          <div style={{ display: "flex", fontSize: 6, gap: 2, color: "#1e293b", fontWeight: 700, borderTop: "1px solid #e2e8f0", padding: "2px 0 0" }}>
            <span style={{ flex: 2 }}>TOTAL</span><span style={{ flex: 1 }}>42,600</span><span style={{ flex: 1 }}>EUR 110k</span><span style={{ flex: 1 }}>6</span>
          </div>
        </div>
        <div style={{ background: "#fff", borderRadius: 5, border: "1px solid #e2e8f0", padding: 6 }}>
          <div style={{ fontSize: 7, fontWeight: 700, color: "#7c3aed", marginBottom: 2 }}>Voyage Details</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2px 6px", fontSize: 6 }}>
            {[{ l: "Vessel", v: "ATLANTIC VOYAGER" }, { l: "Voyage No.", v: "VY2603" }, { l: "Port of Loading", v: "European Port" }, { l: "Port of Discharge", v: "CertiPort" }, { l: "ETD", v: "19-01-2026" }, { l: "ETA", v: "08-02-2026" }].map((f, i) => (
              <div key={i}><div style={{ fontSize: 5, color: "#94a3b8", textTransform: "uppercase" }}>{f.l}</div><div style={{ color: "#1e293b", fontWeight: 600 }}>{f.v}</div></div>
            ))}
          </div>
        </div>
        <div style={{ background: "#fff", borderRadius: 5, border: "1px solid #e2e8f0", padding: 6 }}>
          <div style={{ fontSize: 7, fontWeight: 700, color: "#7c3aed", marginBottom: 2 }}>Container & Seal</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "2px 6px", fontSize: 6 }}>
            {[{ l: "Container", v: "GMMU 7816 7" }, { l: "Seal", v: "SL-44829" }, { l: "Type", v: "40ft HC" }, { l: "Tare", v: "3,800 kg" }, { l: "Max Payload", v: "26,680 kg" }, { l: "Status", v: "Sealed ✓" }].map((f, i) => (
              <div key={i}><div style={{ fontSize: 5, color: "#94a3b8", textTransform: "uppercase" }}>{f.l}</div><div style={{ color: "#1e293b", fontWeight: 600 }}>{f.v}</div></div>
            ))}
          </div>
        </div>
        {/* Documents section to fill remaining space */}
        <div style={{ background: "#fff", borderRadius: 5, border: "1px solid #e2e8f0", padding: 6, flex: 1 }}>
          <div style={{ fontSize: 7, fontWeight: 700, color: "#7c3aed", marginBottom: 2 }}>Attached Documents</div>
          {[
            { name: "Bill of Lading.pdf", size: "1.2 MB", status: "✓ Verified" },
            { name: "Commercial Invoice.pdf", size: "840 KB", status: "✓ Verified" },
            { name: "Packing List.pdf", size: "520 KB", status: "✓ Verified" },
            { name: "Certificate of Origin.pdf", size: "310 KB", status: "⏳ Pending" },
          ].map((d, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 4, padding: "2px 0", borderTop: i > 0 ? "1px solid #f1f5f9" : "none", fontSize: 6 }}>
              <span style={{ color: "#7c3aed" }}>📄</span>
              <span style={{ color: "#334155", flex: 1 }}>{d.name}</span>
              <span style={{ color: "#94a3b8" }}>{d.size}</span>
              <span style={{ color: d.status.includes("✓") ? "#16a34a" : "#f59e0b", fontWeight: 600, fontSize: 5 }}>{d.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export const Scene8RefCargo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardSpring = spring({ frame, fps, config: { damping: 200 }, delay: 5 });
  const mockSpring = spring({ frame, fps, config: { damping: 200 }, delay: 15 });

  return (
    <AbsoluteFill>
      <AgiledropNoiseBg variant="dark" />

      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          gap: 40,
          padding: "70px 90px 130px",
        }}
      >
        <div
          style={{
            flex: 48,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 32,
            opacity: cardSpring,
            transform: `translateX(${interpolate(cardSpring, [0, 1], [-20, 0])}px)`,
          }}
        >
          <div>
            <h2 style={{ fontFamily: headlineFont, fontSize: 52, fontWeight: 800, color: "#fff", margin: 0, lineHeight: 1.15 }}>
              Cargo platform
              <br />
              transformation
            </h2>
            <div style={{ fontFamily: bodyFont, fontSize: 26, color: "rgba(255,255,255,0.5)", marginTop: 12 }}>
              Luxembourg — Government logistics
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {[
              "Complete legacy platform modernization",
              "100% uptime during gradual migration",
              "Multi-cloud infrastructure consolidation",
              "Online payments, 700+ automated tests",
            ].map((item, i) => {
              const s = spring({ frame, fps, config: { damping: 200 }, delay: 18 + i * 8 });
              return (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 14, opacity: s }}>
                  <div style={{ width: 10, height: 10, borderRadius: 5, background: "#8b5cf6", marginTop: 10, flexShrink: 0 }} />
                  <span style={{ fontFamily: bodyFont, fontSize: 26, color: "rgba(255,255,255,0.7)", lineHeight: 1.4 }}>{item}</span>
                </div>
              );
            })}
          </div>

          <div style={{ fontFamily: bodyFont, fontSize: 22, color: "rgba(255,255,255,0.4)" }}>1.5+ years · 5 developers</div>
        </div>

        <div style={{ flex: 52, opacity: mockSpring, transform: `translateX(${interpolate(mockSpring, [0, 1], [30, 0])}px)` }}>
          <BrowserFrame
            url="certiflow.app/ectn/NT26000010"
            appName="CertiFlow"
            navItems={["ECTNs", "Billing", "Actors", "Reports", "Credits"]}
            accentColor="#8b5cf6"
            headerBg="#1e1033"
            tiltDeg={7}
          >
            <CertiFlowContent />
          </BrowserFrame>
        </div>
      </div>
    </AbsoluteFill>
  );
};
