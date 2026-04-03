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

const COLUMNS = [
  {
    icon: "⇌",
    title: "Integration middleware",
    desc: "Connect SAP, Infor, WMS, and TMS into one real-time data flow",
    color: "#ee4723",
  },
  {
    icon: "📄✓",
    title: "eFTI & e-CMR platforms",
    desc: "Certified electronic freight documents — replacing 500M paper CMRs",
    color: "#008999",
  },
  {
    icon: "⚙",
    title: "Custom logistics modules",
    desc: "TMS, WMS, fleet tools, emissions tracking — built for you",
    color: "#005f6a",
  },
];

export const Scene2Solution: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerSpring = spring({ frame, fps, config: { damping: 200 }, delay: 5 });
  const ownershipSpring = spring({ frame, fps, config: { damping: 200 }, delay: 55 });

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
          justifyContent: "center",
          padding: "80px 100px 130px",
        }}
      >
        <div
          style={{
            opacity: headerSpring,
            transform: `translateY(${interpolate(headerSpring, [0, 1], [20, 0])}px)`,
            marginBottom: 44,
            alignSelf: "flex-start",
          }}
        >
          <h2 style={{ fontFamily: headlineFont, fontSize: 68, fontWeight: 800, color: "#fff", margin: 0 }}>
            What we <span style={{ color: "#ee4723" }}>build</span>
          </h2>
        </div>

        <div style={{ display: "flex", gap: 32, width: "100%" }}>
          {COLUMNS.map((col, i) => {
            const s = spring({ frame, fps, config: { damping: 200 }, delay: 15 + i * 12 });
            return (
              <div
                key={i}
                style={{
                  flex: 1,
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 22,
                  padding: "36px 34px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 18,
                  opacity: s,
                  transform: `translateY(${interpolate(s, [0, 1], [20, 0])}px)`,
                }}
              >
                <div
                  style={{
                    width: 68,
                    height: 68,
                    borderRadius: 16,
                    background: `${col.color}18`,
                    border: `1px solid ${col.color}30`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 32,
                    color: col.color,
                  }}
                >
                  {col.icon}
                </div>
                <div style={{ fontFamily: headlineFont, fontSize: 32, fontWeight: 700, color: "#fff", lineHeight: 1.2 }}>
                  {col.title}
                </div>
                <div style={{ fontFamily: bodyFont, fontSize: 24, color: "rgba(255,255,255,0.6)", lineHeight: 1.45 }}>
                  {col.desc}
                </div>
              </div>
            );
          })}
        </div>

        <div
          style={{
            marginTop: 40,
            textAlign: "center",
            opacity: ownershipSpring,
            transform: `translateY(${interpolate(ownershipSpring, [0, 1], [15, 0])}px)`,
          }}
        >
          <div
            style={{
              display: "inline-block",
              padding: "20px 48px",
              background: "rgba(238,71,35,0.08)",
              border: "1px solid rgba(238,71,35,0.2)",
              borderRadius: 16,
              fontFamily: bodyFont,
              fontSize: 26,
              fontWeight: 600,
              color: "rgba(255,255,255,0.85)",
            }}
          >
            You own the code. You own the data. No per-seat fees. No vendor lock-in.
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
