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

const { fontFamily: headlineFont } = loadMontserrat("normal", {
  weights: ["600", "700", "800"],
  subsets: ["latin"],
});
const { fontFamily: bodyFont } = loadNunito("normal", {
  weights: ["400", "600", "700"],
  subsets: ["latin"],
});

const LAYERS = [
  {
    label: "Built for you",
    modules: ["Your TMS", "Your integrations", "Your workflows"],
    color: "#ee4723",
    bg: "rgba(238,71,35,0.08)",
    border: "rgba(238,71,35,0.2)",
  },
  {
    label: "Head start",
    modules: ["CRM", "Document management", "eHRM"],
    color: "#008999",
    bg: "rgba(0,137,153,0.08)",
    border: "rgba(0,137,153,0.2)",
  },
  {
    label: "Open source foundation",
    modules: ["Laravel + PostgreSQL"],
    color: "#005f6a",
    bg: "rgba(0,95,106,0.08)",
    border: "rgba(0,95,106,0.2)",
  },
];

const POINTS = [
  { title: "You own everything", desc: "Code, data, no per-seat fees" },
  { title: "Deploy on your infra", desc: "Your servers, EU data sovereignty" },
  { title: "Open source foundation", desc: "No vendor lock-in, ever" },
  { title: "Weeks to production", desc: "Pre-built modules + custom logic" },
];

export const Scene9Platform: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerSpring = spring({ frame, fps, config: { damping: 200 }, delay: 3 });

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
          padding: "75px 90px 130px",
        }}
      >
        <div
          style={{
            opacity: headerSpring,
            transform: `translateY(${interpolate(headerSpring, [0, 1], [15, 0])}px)`,
            marginBottom: 32,
            textAlign: "center",
          }}
        >
          <h2 style={{ fontFamily: headlineFont, fontSize: 60, fontWeight: 800, color: "#fff", margin: 0 }}>
            The <span style={{ color: "#ee4723" }}>platform</span>
          </h2>
        </div>

        {/* Platform layers - center */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18, marginBottom: 28 }}>
          {LAYERS.map((layer, i) => {
            const layerSpring = spring({ frame, fps, config: { damping: 200 }, delay: 12 + (LAYERS.length - 1 - i) * 10 });
            return (
              <div
                key={i}
                style={{
                  background: layer.bg,
                  border: `1px solid ${layer.border}`,
                  borderRadius: 18,
                  padding: "26px 36px",
                  opacity: layerSpring,
                  transform: `translateY(${interpolate(layerSpring, [0, 1], [15, 0])}px)`,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                    {layer.modules.map((mod, j) => (
                      <div
                        key={j}
                        style={{
                          padding: "12px 26px",
                          background: "rgba(255,255,255,0.06)",
                          border: "1px solid rgba(255,255,255,0.08)",
                          borderRadius: 12,
                          fontFamily: bodyFont,
                          fontSize: 22,
                          fontWeight: 600,
                          color: "#fff",
                        }}
                      >
                        {mod}
                      </div>
                    ))}
                  </div>
                  <span style={{ fontFamily: headlineFont, fontSize: 18, color: layer.color, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, flexShrink: 0, marginLeft: 24 }}>
                    {layer.label}
                  </span>
                </div>
              </div>
            );
          })}

          {/* AI agents connector */}
          {(() => {
            const aiSpring = spring({ frame, fps, config: { damping: 200 }, delay: 42 });
            return (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginTop: 8, opacity: aiSpring }}>
                <div style={{ height: 1, flex: 1, background: "rgba(0,137,153,0.3)" }} />
                <div
                  style={{
                    padding: "14px 32px",
                    background: "rgba(0,137,153,0.12)",
                    border: "1px solid rgba(0,137,153,0.25)",
                    borderRadius: 24,
                    fontFamily: headlineFont,
                    fontSize: 20,
                    fontWeight: 700,
                    color: "#008999",
                  }}
                >
                  🤖 AI agents — access every module's toolkit
                </div>
                <div style={{ height: 1, flex: 1, background: "rgba(0,137,153,0.3)" }} />
              </div>
            );
          })()}
        </div>

        {/* 4 key points — horizontal row at bottom */}
        <div style={{ display: "flex", gap: 24, marginTop: "auto" }}>
          {POINTS.map((point, i) => {
            const s = spring({ frame, fps, config: { damping: 200 }, delay: 50 + i * 8 });
            return (
              <div
                key={i}
                style={{
                  flex: 1,
                  padding: "22px 24px",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 16,
                  opacity: s,
                  transform: `translateY(${interpolate(s, [0, 1], [12, 0])}px)`,
                }}
              >
                <div style={{ fontFamily: headlineFont, fontSize: 22, fontWeight: 700, color: "#fff", marginBottom: 8 }}>
                  {point.title}
                </div>
                <div style={{ fontFamily: bodyFont, fontSize: 20, color: "rgba(255,255,255,0.5)", lineHeight: 1.4 }}>
                  {point.desc}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
