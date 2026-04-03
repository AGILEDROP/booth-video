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

const CLIENTS = ["T-Systems", "WPP", "Capgemini", "UNESCO", "EU Publications Office"];

const STATS = [
  { number: "75+", label: "Team members" },
  { number: "12+", label: "Years in business" },
  { number: "100+", label: "Projects delivered" },
];

export const AgiledropClients: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerSpring = spring({ frame, fps, config: { damping: 200 }, delay: 5 });

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
          padding: "86px 60px 68px",
        }}
      >
        <div
          style={{
            opacity: headerSpring,
            transform: `translateY(${interpolate(headerSpring, [0, 1], [20, 0])}px)`,
            marginBottom: 32,
          }}
        >
          <h2
            style={{
              fontFamily: headlineFont,
              fontSize: 44,
              fontWeight: 800,
              color: "#fff",
              margin: 0,
            }}
          >
            Trusted by <span style={{ color: "#ee4723" }}>global leaders</span>
          </h2>
        </div>

        {/* Client logos */}
        <div style={{ display: "flex", gap: 18, marginBottom: 32 }}>
          {CLIENTS.map((client, i) => {
            const s = spring({ frame, fps, config: { damping: 200 }, delay: 15 + i * 5 });
            return (
              <div
                key={i}
                style={{
                  flex: 1,
                  padding: "22px 16px",
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 14,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: headlineFont,
                  fontSize: i === 4 ? 14 : 18,
                  fontWeight: 700,
                  color: "rgba(255,255,255,0.8)",
                  opacity: s,
                  transform: `scale(${interpolate(s, [0, 1], [0.9, 1])})`,
                }}
              >
                {client}
              </div>
            );
          })}
        </div>

        {/* Stats */}
        <div style={{ display: "flex", gap: 24, flex: 1, alignItems: "center" }}>
          {STATS.map((stat, i) => {
            const s = spring({ frame, fps, config: { damping: 200 }, delay: 40 + i * 8 });
            return (
              <div
                key={i}
                style={{
                  flex: 1,
                  padding: "36px 28px",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 16,
                  textAlign: "center",
                  opacity: s,
                  transform: `translateY(${interpolate(s, [0, 1], [15, 0])}px)`,
                }}
              >
                <div
                  style={{
                    fontFamily: headlineFont,
                    fontSize: 56,
                    fontWeight: 800,
                    color: "#ee4723",
                  }}
                >
                  {stat.number}
                </div>
                <div
                  style={{
                    fontFamily: bodyFont,
                    fontSize: 20,
                    color: "rgba(255,255,255,0.6)",
                    marginTop: 4,
                  }}
                >
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
