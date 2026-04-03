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

/** Rich customs declaration dashboard */
const CustomsContent: React.FC = () => (
  <div style={{ height: "100%", display: "flex", background: "#f5f7fa" }}>
    {/* Sidebar */}
    <div style={{ width: 46, background: "#1e3a5f", display: "flex", flexDirection: "column", alignItems: "center", padding: "10px 0", gap: 8 }}>
      {["📋", "🔍", "📊", "🌍", "📦", "⚙"].map((icon, i) => (
        <div key={i} style={{ width: 30, height: 30, borderRadius: 7, background: i === 0 ? "rgba(255,255,255,0.15)" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13 }}>
          {icon}
        </div>
      ))}
    </div>
    {/* Main */}
    <div style={{ flex: 1, padding: 8, display: "flex", flexDirection: "column", gap: 5, minHeight: 0 }}>
      {/* Top stats row */}
      <div style={{ display: "flex", gap: 5 }}>
        {[
          { l: "Total", v: "4,891", sub: "declarations", c: "#1e3a5f", bg: "#e8f0fe" },
          { l: "Approved", v: "4,612", sub: "94.3%", c: "#16a34a", bg: "#f0fdf4" },
          { l: "Pending", v: "241", sub: "review", c: "#f59e0b", bg: "#fffbeb" },
          { l: "Rejected", v: "38", sub: "0.8%", c: "#dc2626", bg: "#fef2f2" },
        ].map((s, i) => (
          <div key={i} style={{ flex: 1, padding: "5px 7px", background: s.bg, borderRadius: 5, border: `1px solid ${s.c}15` }}>
            <div style={{ fontSize: 7, color: "#64748b", textTransform: "uppercase" }}>{s.l}</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: s.c }}>{s.v}</div>
            <div style={{ fontSize: 7, color: "#94a3b8" }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Middle row: chart + country breakdown + top commodities */}
      <div style={{ display: "flex", gap: 5 }}>
        {/* Mini bar chart */}
        <div style={{ flex: 1, background: "#fff", borderRadius: 5, border: "1px solid #e2e8f0", padding: "6px 8px" }}>
          <div style={{ fontSize: 8, fontWeight: 700, color: "#1e3a5f", marginBottom: 4 }}>Monthly Volume</div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 35 }}>
            {[28, 35, 42, 38, 55, 48, 62, 58, 70, 65, 72, 80].map((h, i) => (
              <div key={i} style={{ flex: 1, height: `${h}%`, background: i === 11 ? "#1e3a5f" : "#cbd5e1", borderRadius: 2 }} />
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 2, fontSize: 6, color: "#94a3b8" }}>
            <span>Jan</span><span>Jun</span><span>Dec</span>
          </div>
        </div>
        {/* Country breakdown */}
        <div style={{ flex: 1, background: "#fff", borderRadius: 5, border: "1px solid #e2e8f0", padding: "6px 8px" }}>
          <div style={{ fontSize: 8, fontWeight: 700, color: "#1e3a5f", marginBottom: 4 }}>By Route</div>
          {[
            { route: "IE → UK", pct: 64, c: "#1e3a5f" },
            { route: "UK → IE", pct: 28, c: "#3b82f6" },
            { route: "IE → EU", pct: 8, c: "#93c5fd" },
          ].map((r, i) => (
            <div key={i} style={{ marginBottom: 3 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 7, color: "#475569" }}>
                <span>{r.route}</span><span style={{ fontWeight: 600 }}>{r.pct}%</span>
              </div>
              <div style={{ height: 3, background: "#f1f5f9", borderRadius: 2, marginTop: 1 }}>
                <div style={{ height: "100%", width: `${r.pct}%`, background: r.c, borderRadius: 2 }} />
              </div>
            </div>
          ))}
        </div>
        {/* Top commodities */}
        <div style={{ flex: 1, background: "#fff", borderRadius: 5, border: "1px solid #e2e8f0", padding: "6px 8px" }}>
          <div style={{ fontSize: 8, fontWeight: 700, color: "#1e3a5f", marginBottom: 4 }}>Top Commodities</div>
          {[
            { name: "Electronics", pct: 32 },
            { name: "Pharmaceuticals", pct: 24 },
            { name: "Motor vehicles", pct: 18 },
            { name: "Textiles", pct: 14 },
          ].map((c, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 2, fontSize: 7 }}>
              <div style={{ width: 6, height: 6, borderRadius: 3, background: ["#1e3a5f", "#3b82f6", "#60a5fa", "#93c5fd"][i] }} />
              <span style={{ color: "#475569", flex: 1 }}>{c.name}</span>
              <span style={{ color: "#1e3a5f", fontWeight: 600 }}>{c.pct}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Declarations table — fills remaining space */}
      <div style={{ background: "#fff", borderRadius: 5, border: "1px solid #e2e8f0", overflow: "hidden", flex: 1 }}>
        <div style={{ display: "flex", padding: "4px 7px", background: "#f8fafc", fontSize: 7, color: "#64748b", fontWeight: 600, borderBottom: "1px solid #f1f5f9" }}>
          <span style={{ width: 60 }}>REF</span>
          <span style={{ width: 40 }}>ROUTE</span>
          <span style={{ width: 50 }}>HS CODE</span>
          <span style={{ flex: 1 }}>GOODS</span>
          <span style={{ width: 40 }}>VALUE</span>
          <span style={{ width: 45 }}>STATUS</span>
        </div>
        {[
          { ref: "DCL-4210", route: "IE→UK", hs: "8471.30", goods: "Electronics", val: "€42k", s: "Approved", c: "#16a34a" },
          { ref: "DCL-4211", route: "IE→UK", hs: "6204.43", goods: "Textiles", val: "€18k", s: "Pending", c: "#f59e0b" },
          { ref: "DCL-4209", route: "UK→IE", hs: "8517.12", goods: "Telecom equip.", val: "€95k", s: "Approved", c: "#16a34a" },
          { ref: "DCL-4208", route: "IE→UK", hs: "3004.90", goods: "Pharmaceuticals", val: "€67k", s: "Approved", c: "#16a34a" },
          { ref: "DCL-4207", route: "UK→IE", hs: "2204.21", goods: "Beverages", val: "€31k", s: "Approved", c: "#16a34a" },
          { ref: "DCL-4206", route: "IE→EU", hs: "8703.23", goods: "Motor vehicles", val: "€180k", s: "Pending", c: "#f59e0b" },
          { ref: "DCL-4205", route: "IE→UK", hs: "0402.10", goods: "Dairy products", val: "€24k", s: "Approved", c: "#16a34a" },
          { ref: "DCL-4204", route: "UK→IE", hs: "7308.90", goods: "Steel structures", val: "€112k", s: "Rejected", c: "#dc2626" },
          { ref: "DCL-4203", route: "IE→UK", hs: "8544.49", goods: "Electric cables", val: "€56k", s: "Approved", c: "#16a34a" },
          { ref: "DCL-4202", route: "IE→EU", hs: "0303.89", goods: "Frozen fish", val: "€19k", s: "Approved", c: "#16a34a" },
          { ref: "DCL-4201", route: "UK→IE", hs: "9403.60", goods: "Wood furniture", val: "€38k", s: "Pending", c: "#f59e0b" },
          { ref: "DCL-4200", route: "IE→UK", hs: "2106.90", goods: "Food preparations", val: "€27k", s: "Approved", c: "#16a34a" },
          { ref: "DCL-4199", route: "UK→IE", hs: "8481.80", goods: "Valves & taps", val: "€83k", s: "Approved", c: "#16a34a" },
          { ref: "DCL-4198", route: "IE→EU", hs: "3923.30", goods: "Plastic containers", val: "€15k", s: "Approved", c: "#16a34a" },
          { ref: "DCL-4197", route: "IE→UK", hs: "7210.49", goods: "Coated steel", val: "€147k", s: "Pending", c: "#f59e0b" },
          { ref: "DCL-4196", route: "UK→IE", hs: "6109.10", goods: "Cotton clothing", val: "€22k", s: "Approved", c: "#16a34a" },
        ].map((r, i) => (
          <div key={i} style={{ display: "flex", padding: "3px 7px", fontSize: 8, borderTop: "1px solid #f8fafc", alignItems: "center" }}>
            <span style={{ width: 60, fontWeight: 600, color: "#1e3a5f" }}>{r.ref}</span>
            <span style={{ width: 40, color: "#64748b" }}>{r.route}</span>
            <span style={{ width: 50, color: "#475569", fontFamily: "monospace", fontSize: 7 }}>{r.hs}</span>
            <span style={{ flex: 1, color: "#475569" }}>{r.goods}</span>
            <span style={{ width: 40, color: "#1e3a5f", fontWeight: 600 }}>{r.val}</span>
            <span style={{ width: 45, fontSize: 7, fontWeight: 600, color: r.c, padding: "1px 4px", background: `${r.c}12`, borderRadius: 3, textAlign: "center" }}>{r.s}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export const Scene6RefCustoms: React.FC = () => {
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
              Customs declaration
              <br />
              platform
            </h2>
            <div style={{ fontFamily: bodyFont, fontSize: 26, color: "rgba(255,255,255,0.5)", marginTop: 12 }}>
              Ireland / UK — Government / Shipping
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {[
              "Integration with legacy customs systems (10+ years old)",
              "Multi-country standards parsing and compliance",
              "Enterprise contract data mapping",
            ].map((item, i) => {
              const s = spring({ frame, fps, config: { damping: 200 }, delay: 18 + i * 8 });
              return (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 14, opacity: s }}>
                  <div style={{ width: 10, height: 10, borderRadius: 5, background: "#005f6a", marginTop: 10, flexShrink: 0 }} />
                  <span style={{ fontFamily: bodyFont, fontSize: 26, color: "rgba(255,255,255,0.7)", lineHeight: 1.4 }}>{item}</span>
                </div>
              );
            })}
          </div>

          {(() => {
            const heroSpring = spring({ frame, fps, config: { damping: 200 }, delay: 50 });
            return (
              <div style={{ padding: "24px 32px", background: "rgba(0,95,106,0.1)", border: "1px solid rgba(0,95,106,0.2)", borderRadius: 16, opacity: heroSpring }}>
                <div style={{ fontFamily: headlineFont, fontSize: 32, fontWeight: 800, color: "#008999" }}>100% accurate declarations</div>
                <div style={{ fontFamily: bodyFont, fontSize: 22, color: "rgba(255,255,255,0.5)", marginTop: 6 }}>Zero port delays</div>
              </div>
            );
          })()}

          <div style={{ fontFamily: bodyFont, fontSize: 22, color: "rgba(255,255,255,0.4)" }}>1+ year · 3 developers</div>
        </div>

        <div style={{ flex: 52, opacity: mockSpring, transform: `translateX(${interpolate(mockSpring, [0, 1], [30, 0])}px)` }}>
          <BrowserFrame
            url="cdp.customs.ie/dashboard"
            appName="CDP"
            navItems={["Dashboard", "Declarations", "HS Codes", "Reports"]}
            accentColor="#3b82f6"
            headerBg="#1e3a5f"
          >
            <CustomsContent />
          </BrowserFrame>
        </div>
      </div>
    </AbsoluteFill>
  );
};
