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
    modules: ["Your TMS", "Your integrations", "Your workflows", "Your dashboards"],
    color: "#ee4723",
    bg: "rgba(238,71,35,0.15)",
    border: "rgba(238,71,35,0.35)",
  },
  {
    label: "AI layer",
    modules: ["Agent builder", "Agent manager", "AI toolkit"],
    color: "#a78bfa",
    bg: "rgba(139,92,246,0.15)",
    border: "rgba(139,92,246,0.35)",
  },
  {
    label: "Head start",
    modules: ["CRM", "Document management", "eHRM"],
    color: "#22d3ee",
    bg: "rgba(0,137,153,0.15)",
    border: "rgba(0,137,153,0.35)",
  },
  {
    label: "Open source foundation",
    modules: ["Application framework", "Enterprise database"],
    color: "#34d399",
    bg: "rgba(52,211,153,0.12)",
    border: "rgba(52,211,153,0.3)",
  },
  {
    label: "Your infrastructure",
    modules: ["AWS", "Azure", "On-prem", "Private cloud"],
    color: "#94a3b8",
    bg: "rgba(148,163,184,0.1)",
    border: "rgba(148,163,184,0.25)",
  },
];

const POINTS = [
  { title: "You own everything", desc: "Code, data, no per-seat fees", icon: "🔑" },
  { title: "Deploy on your infra", desc: "Your servers, EU data sovereignty", icon: "🏢" },
  { title: "Open source foundation", desc: "No vendor lock-in, ever", icon: "🔓" },
  { title: "Weeks to production", desc: "Pre-built modules + custom logic", icon: "⚡" },
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
          padding: "70px 90px 130px",
        }}
      >
        <div
          style={{
            opacity: headerSpring,
            transform: `translateY(${interpolate(headerSpring, [0, 1], [15, 0])}px)`,
            marginBottom: 24,
            textAlign: "center",
          }}
        >
          <h2 style={{ fontFamily: headlineFont, fontSize: 60, fontWeight: 800, color: "#fff", margin: 0 }}>
            The <span style={{ color: "#ee4723" }}>ARP</span> platform
          </h2>
        </div>

        {/* Platform layers */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {LAYERS.map((layer, i) => {
            const layerSpring = spring({ frame, fps, config: { damping: 200 }, delay: 8 + (LAYERS.length - 1 - i) * 6 });
            return (
              <div
                key={i}
                style={{
                  background: layer.bg,
                  border: `1.5px solid ${layer.border}`,
                  borderRadius: 16,
                  padding: "24px 32px",
                  opacity: layerSpring,
                  transform: `translateY(${interpolate(layerSpring, [0, 1], [12, 0])}px)`,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                    {layer.modules.map((mod, j) => (
                      <div
                        key={j}
                        style={{
                          padding: "10px 22px",
                          background: "rgba(255,255,255,0.08)",
                          border: "1px solid rgba(255,255,255,0.12)",
                          borderRadius: 10,
                          fontFamily: bodyFont,
                          fontSize: 20,
                          fontWeight: 600,
                          color: "#fff",
                        }}
                      >
                        {mod}
                      </div>
                    ))}
                  </div>
                  <span style={{ fontFamily: headlineFont, fontSize: 16, color: layer.color, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, flexShrink: 0, marginLeft: 20 }}>
                    {layer.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Key points — visually separated from layers */}
        <div style={{ display: "flex", gap: 20, marginTop: 32 }}>
          {POINTS.map((point, i) => {
            const s = spring({ frame, fps, config: { damping: 200 }, delay: 45 + i * 7 });
            return (
              <div
                key={i}
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 14,
                  opacity: s,
                  transform: `translateY(${interpolate(s, [0, 1], [10, 0])}px)`,
                }}
              >
                <div style={{ fontSize: 24, flexShrink: 0, marginTop: 2 }}>{point.icon}</div>
                <div>
                  <div style={{ fontFamily: headlineFont, fontSize: 20, fontWeight: 700, color: "#ee4723" }}>
                    {point.title}
                  </div>
                  <div style={{ fontFamily: bodyFont, fontSize: 18, color: "rgba(255,255,255,0.5)", lineHeight: 1.4, marginTop: 4 }}>
                    {point.desc}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
