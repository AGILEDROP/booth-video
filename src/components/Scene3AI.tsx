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

const USE_CASES = [
  { title: "Document processing", desc: "97-99% accuracy, 80% less manual entry" },
  { title: "Event detection & action", desc: "Detects delays, alerts dispatchers, acts autonomously" },
  { title: "System bridging", desc: "Resolves discrepancies across SAP, TMS, WMS" },
];

/** AI dashboard showing document processing + chatbot */
const AIDashboardContent: React.FC = () => (
  <div style={{ height: "100%", display: "flex", background: "#f8f9fa" }}>
    {/* Left: Document + AI processing */}
    <div style={{ flex: 1, padding: 12, display: "flex", flexDirection: "column", gap: 8, borderRight: "1px solid #e5e7eb" }}>
      {/* Document input */}
      <div style={{ fontSize: 9, fontWeight: 700, color: "#005f6a", textTransform: "uppercase", letterSpacing: 0.5 }}>Incoming Document</div>
      <div style={{ padding: 8, background: "#fff", borderRadius: 6, border: "1px solid #e5e7eb" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
          <div style={{ fontSize: 14 }}>📄</div>
          <div>
            <div style={{ fontSize: 10, fontWeight: 600, color: "#032633" }}>CMR-2026-4821.pdf</div>
            <div style={{ fontSize: 8, color: "#94a3b8" }}>Uploaded 2 min ago · 3 pages</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 4 }}>
          {["Sender", "Receiver", "Goods", "Route"].map((f, i) => (
            <div key={i} style={{ padding: "2px 6px", background: "#f0fdf4", borderRadius: 3, fontSize: 7, color: "#16a34a", fontWeight: 600, border: "1px solid #bbf7d0" }}>
              ✓ {f}
            </div>
          ))}
        </div>
      </div>

      {/* AI Actions */}
      <div style={{ fontSize: 9, fontWeight: 700, color: "#005f6a", textTransform: "uppercase", letterSpacing: 0.5 }}>AI Actions</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {[
          { icon: "🔍", action: "Extracted 12 fields", confidence: "99.2%", c: "#16a34a" },
          { icon: "✅", action: "Created shipment SR-4821", confidence: "Auto", c: "#2563eb" },
          { icon: "🔗", action: "Matched to order PO-9102", confidence: "97.8%", c: "#16a34a" },
          { icon: "⚠️", action: "Weight mismatch flagged", confidence: "Review", c: "#f59e0b" },
        ].map((a, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, padding: "4px 8px", background: "#fff", borderRadius: 4, border: "1px solid #f1f5f9", fontSize: 9 }}>
            <span>{a.icon}</span>
            <span style={{ color: "#334155", flex: 1 }}>{a.action}</span>
            <span style={{ fontSize: 8, fontWeight: 600, color: a.c, padding: "1px 5px", background: `${a.c}12`, borderRadius: 3 }}>{a.confidence}</span>
          </div>
        ))}
      </div>
    </div>

    {/* Right: AI Chatbot */}
    <div style={{ width: "45%", display: "flex", flexDirection: "column", background: "#fff" }}>
      <div style={{ padding: "8px 12px", borderBottom: "1px solid #e5e7eb", display: "flex", alignItems: "center", gap: 6 }}>
        <div style={{ width: 8, height: 8, borderRadius: 4, background: "#22c55e" }} />
        <span style={{ fontSize: 10, fontWeight: 700, color: "#032633" }}>AI Assistant</span>
      </div>
      <div style={{ flex: 1, padding: "8px 10px", display: "flex", flexDirection: "column", gap: 6, fontSize: 9 }}>
        {/* AI message */}
        <div style={{ background: "#f0f9ff", borderRadius: "8px 8px 8px 2px", padding: "6px 10px", color: "#0369a1", maxWidth: "90%", lineHeight: 1.4 }}>
          I processed CMR-4821 and extracted all 12 fields with 99.2% confidence. I created shipment SR-4821 automatically.
        </div>
        {/* AI message */}
        <div style={{ background: "#fefce8", borderRadius: "8px 8px 8px 2px", padding: "6px 10px", color: "#854d0e", maxWidth: "90%", lineHeight: 1.4 }}>
          ⚠️ Weight mismatch: CMR says 12.4t but PO-9102 shows 11.8t. Flagged for your review.
        </div>
        {/* User message */}
        <div style={{ background: "#032633", borderRadius: "8px 8px 2px 8px", padding: "6px 10px", color: "#fff", maxWidth: "80%", alignSelf: "flex-end", lineHeight: 1.4 }}>
          Accept the CMR weight, update the PO.
        </div>
        {/* AI reply */}
        <div style={{ background: "#f0fdf4", borderRadius: "8px 8px 8px 2px", padding: "6px 10px", color: "#166534", maxWidth: "90%", lineHeight: 1.4 }}>
          ✅ Done. PO-9102 updated to 12.4t. Shipment SR-4821 is now complete.
        </div>
      </div>
      {/* Input */}
      <div style={{ padding: "6px 10px", borderTop: "1px solid #e5e7eb" }}>
        <div style={{ padding: "5px 8px", background: "#f8f9fa", borderRadius: 6, border: "1px solid #e5e7eb", fontSize: 8, color: "#94a3b8" }}>
          Ask about this document...
        </div>
      </div>
    </div>
  </div>
);

export const Scene3AI: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerSpring = spring({ frame, fps, config: { damping: 200 }, delay: 3 });
  const mockSpring = spring({ frame, fps, config: { damping: 200 }, delay: 15 });
  const bottomSpring = spring({ frame, fps, config: { damping: 200 }, delay: 70 });

  return (
    <AbsoluteFill>
      <AgiledropNoiseBg variant="dark" />

      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "70px 90px 130px",
        }}
      >
        <div
          style={{
            opacity: headerSpring,
            transform: `translateY(${interpolate(headerSpring, [0, 1], [15, 0])}px)`,
            marginBottom: 28,
          }}
        >
          <h2 style={{ fontFamily: headlineFont, fontSize: 60, fontWeight: 800, color: "#fff", margin: 0 }}>
            AI that actually <span style={{ color: "#008999" }}>works</span>
          </h2>
        </div>

        <div style={{ display: "flex", gap: 44, flex: 1 }}>
          {/* Left: Use cases (text first) */}
          <div style={{ flex: 48, display: "flex", flexDirection: "column", gap: 24, justifyContent: "center" }}>
            {USE_CASES.map((uc, i) => {
              const s = spring({ frame, fps, config: { damping: 200 }, delay: 10 + i * 12 });
              return (
                <div
                  key={i}
                  style={{
                    padding: "28px 32px",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: 18,
                    opacity: s,
                    transform: `translateX(${interpolate(s, [0, 1], [-15, 0])}px)`,
                  }}
                >
                  <div style={{ fontFamily: headlineFont, fontSize: 30, fontWeight: 700, color: "#008999", marginBottom: 10 }}>
                    {uc.title}
                  </div>
                  <div style={{ fontFamily: bodyFont, fontSize: 26, color: "rgba(255,255,255,0.6)", lineHeight: 1.4 }}>
                    {uc.desc}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Tilted browser with AI dashboard */}
          <div
            style={{
              flex: 52,
              opacity: mockSpring,
              transform: `translateX(${interpolate(mockSpring, [0, 1], [30, 0])}px)`,
            }}
          >
            <BrowserFrame
              url="ai.platform/documents/CMR-4821"
              appName="AI Platform"
              navItems={["Documents", "Agents", "Audit Log"]}
              accentColor="#008999"
              tiltDeg={6}
            >
              <AIDashboardContent />
            </BrowserFrame>
          </div>
        </div>

        <div
          style={{
            marginTop: 16,
            fontFamily: bodyFont,
            fontSize: 24,
            color: "rgba(255,255,255,0.45)",
            textAlign: "center",
            opacity: bottomSpring,
            fontStyle: "italic",
          }}
        >
          Every AI action is logged. Every decision is reviewable. Pull the plug — the system still works.
        </div>
      </div>
    </AbsoluteFill>
  );
};
