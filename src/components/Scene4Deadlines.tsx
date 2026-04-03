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

const MILESTONES = [
  {
    date: "Jul 2026",
    title: "Smart tachograph mandate",
    desc: "All vehicles >2.5t must have DTCO 4.1",
    color: "#f59e0b",
    position: 20,
  },
  {
    date: "Jul 2027",
    title: "eFTI regulation",
    desc: "EU must accept electronic freight documents",
    color: "#ee4723",
    position: 50,
  },
  {
    date: "Jan 2028",
    title: "ETS2 carbon trading",
    desc: "Diesel +10-12¢/L, emissions data required",
    color: "#008999",
    position: 80,
  },
];

export const Scene4Deadlines: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerSpring = spring({ frame, fps, config: { damping: 200 }, delay: 3 });
  const lineProgress = spring({ frame, fps, config: { damping: 80, mass: 0.8 }, delay: 10 });
  const todayPulse = interpolate(frame % 60, [0, 30, 60], [0.6, 1, 0.6]);
  const taglineSpring = spring({ frame, fps, config: { damping: 200 }, delay: 65 });

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
          padding: "80px 120px 130px",
        }}
      >
        <div
          style={{
            opacity: headerSpring,
            transform: `translateY(${interpolate(headerSpring, [0, 1], [15, 0])}px)`,
            marginBottom: 60,
          }}
        >
          <h2 style={{ fontFamily: headlineFont, fontSize: 64, fontWeight: 800, color: "#fff", margin: 0 }}>
            The regulatory <span style={{ color: "#ee4723" }}>wave</span>
          </h2>
        </div>

        <div style={{ flex: 1, position: "relative", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          {/* Timeline line */}
          <div
            style={{
              position: "relative",
              height: 6,
              background: "rgba(255,255,255,0.06)",
              borderRadius: 3,
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                height: "100%",
                width: `${lineProgress * 100}%`,
                background: "linear-gradient(90deg, #ee4723, #008999)",
                borderRadius: 3,
              }}
            />

            {/* TODAY marker */}
            <div style={{ position: "absolute", left: "8%", top: -48, opacity: lineProgress > 0.1 ? 1 : 0 }}>
              <div style={{ fontFamily: headlineFont, fontSize: 20, fontWeight: 700, color: "#22c55e", textAlign: "center", opacity: todayPulse, letterSpacing: 1.5 }}>
                TODAY
              </div>
              <div style={{ width: 3, height: 24, background: "#22c55e", margin: "6px auto 0", borderRadius: 1.5, opacity: todayPulse }} />
              <div style={{ width: 16, height: 16, borderRadius: 8, background: "#22c55e", margin: "-4px auto 0", boxShadow: `0 0 18px rgba(34,197,94,${todayPulse * 0.5})` }} />
            </div>
          </div>

          {/* Milestones */}
          <div style={{ position: "relative", marginTop: 60 }}>
            {MILESTONES.map((ms, i) => {
              const msSpring = spring({ frame, fps, config: { damping: 200 }, delay: 20 + i * 14 });
              return (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    left: `${ms.position}%`,
                    transform: `translateX(-50%) translateY(${interpolate(msSpring, [0, 1], [20, 0])}px)`,
                    opacity: msSpring,
                    width: 400,
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 10,
                      background: ms.color,
                      margin: "-80px auto 16px",
                      border: "4px solid #032633",
                      boxShadow: `0 0 14px ${ms.color}40`,
                    }}
                  />
                  <div style={{ fontFamily: headlineFont, fontSize: 42, fontWeight: 800, color: ms.color, marginBottom: 10 }}>
                    {ms.date}
                  </div>
                  <div style={{ fontFamily: headlineFont, fontSize: 28, fontWeight: 700, color: "#fff", marginBottom: 10 }}>
                    {ms.title}
                  </div>
                  <div style={{ fontFamily: bodyFont, fontSize: 24, color: "rgba(255,255,255,0.6)", lineHeight: 1.4 }}>
                    {ms.desc}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div
          style={{
            textAlign: "center",
            opacity: taglineSpring,
            transform: `translateY(${interpolate(taglineSpring, [0, 1], [10, 0])}px)`,
          }}
        >
          <span style={{ fontFamily: bodyFont, fontSize: 32, fontWeight: 600, color: "rgba(255,255,255,0.7)" }}>
            One platform can cover all three.{" "}
            <span style={{ color: "#ee4723" }}>That's what we build.</span>
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
