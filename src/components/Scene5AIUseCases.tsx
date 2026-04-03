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

const CARDS = [
  { icon: "📑", title: "Invoice & CMR processing", metric: "3× volume, same headcount", color: "#ee4723" },
  { icon: "🗺", title: "Route optimization", metric: "15–25% cost reduction", color: "#008999" },
  { icon: "⏱", title: "Predictive ETA", metric: "Filters false alarms, real exceptions", color: "#f59e0b" },
  { icon: "📦", title: "Warehouse slotting", metric: "25–30% more throughput", color: "#ee4723" },
  { icon: "🔧", title: "Fleet maintenance", metric: "50% less downtime", color: "#008999" },
  { icon: "🌿", title: "Emissions calculation", metric: "ISO 14083, per-shipment CO₂", color: "#22c55e" },
];

export const Scene5AIUseCases: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerSpring = spring({ frame, fps, config: { damping: 200 }, delay: 3 });
  const bottomSpring = spring({ frame, fps, config: { damping: 200 }, delay: 65 });

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
          alignItems: "center",
          padding: "75px 110px 130px",
        }}
      >
        <div
          style={{
            opacity: headerSpring,
            transform: `translateY(${interpolate(headerSpring, [0, 1], [15, 0])}px)`,
            marginBottom: 48,
            alignSelf: "flex-start",
          }}
        >
          <h2 style={{ fontFamily: headlineFont, fontSize: 60, fontWeight: 800, color: "#fff", margin: 0 }}>
            AI in logistics — <span style={{ color: "#008999" }}>concretely</span>
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gridTemplateRows: "auto auto",
            gap: 28,
            width: "100%",
          }}
        >
          {CARDS.map((card, i) => {
            const row = Math.floor(i / 3);
            const col = i % 3;
            const delay = 12 + (row * 3 + col) * 8;
            const s = spring({ frame, fps, config: { damping: 200 }, delay });
            return (
              <div
                key={i}
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 20,
                  padding: "30px 30px 28px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  opacity: s,
                  transform: `translateY(${interpolate(s, [0, 1], [12, 0])}px)`,
                }}
              >
                <div style={{ fontSize: 40 }}>{card.icon}</div>
                <div style={{ fontFamily: headlineFont, fontSize: 26, fontWeight: 700, color: "#fff", lineHeight: 1.2 }}>
                  {card.title}
                </div>
                <div style={{ fontFamily: headlineFont, fontSize: 24, color: card.color, fontWeight: 700, lineHeight: 1.35 }}>
                  {card.metric}
                </div>
              </div>
            );
          })}
        </div>

        <div
          style={{
            marginTop: 40,
            textAlign: "center",
            opacity: bottomSpring,
            transform: `translateY(${interpolate(bottomSpring, [0, 1], [10, 0])}px)`,
            fontFamily: bodyFont,
            fontSize: 28,
            fontWeight: 600,
            color: "rgba(255,255,255,0.6)",
          }}
        >
          We build AI into your existing systems —{" "}
          <span style={{ color: "#ee4723" }}>no rip-and-replace.</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
