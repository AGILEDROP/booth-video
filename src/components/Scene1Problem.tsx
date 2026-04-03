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

const CountUp: React.FC<{ target: number; suffix?: string; frame: number; fps: number; delay: number }> = ({
  target, suffix = "", frame, fps, delay,
}) => {
  const progress = spring({ frame, fps, config: { damping: 80, mass: 0.6 }, delay });
  return <>{Math.round(target * progress)}{suffix}</>;
};

const PaperRain: React.FC<{ frame: number }> = ({ frame }) => {
  const shapes = Array.from({ length: 12 }, (_, i) => {
    const x = 10 + (i * 7.5) % 90;
    const speed = 0.15 + (i % 4) * 0.08;
    const startY = -10 - (i * 15) % 40;
    const y = (startY + frame * speed) % 110;
    const rotation = (frame * (0.3 + i * 0.1)) % 360;
    const opacity = 0.04 + (i % 3) * 0.02;
    const size = 28 + (i % 3) * 14;
    return (
      <div
        key={i}
        style={{
          position: "absolute",
          left: `${x}%`,
          top: `${y}%`,
          width: size,
          height: size * 1.3,
          border: `1px solid rgba(255,255,255,${opacity})`,
          borderRadius: 3,
          transform: `rotate(${rotation}deg)`,
          opacity,
        }}
      />
    );
  });
  return <>{shapes}</>;
};

export const Scene1Problem: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const heroSpring = spring({ frame, fps, config: { damping: 200 }, delay: 5 });
  const supportSpring = spring({ frame, fps, config: { damping: 200 }, delay: 20 });
  const secondStatSpring = spring({ frame, fps, config: { damping: 200 }, delay: 35 });
  const deadlineSpring = spring({ frame, fps, config: { damping: 200 }, delay: 50 });
  const deadlinePulse = interpolate(frame % 90, [0, 45, 90], [0.7, 1, 0.7]);

  return (
    <AbsoluteFill>
      <AgiledropNoiseBg variant="dark" />
      <PaperRain frame={frame} />

      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px 120px 130px",
          gap: 50,
        }}
      >
        {/* Left: Hero stat */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            opacity: heroSpring,
            transform: `translateY(${interpolate(heroSpring, [0, 1], [30, 0])}px)`,
          }}
        >
          <div
            style={{
              fontFamily: headlineFont,
              fontSize: 180,
              fontWeight: 800,
              color: "#fff",
              lineHeight: 1,
              marginBottom: 16,
            }}
          >
            <CountUp target={99} suffix="%" frame={frame} fps={fps} delay={8} />
          </div>
          <div
            style={{
              fontFamily: bodyFont,
              fontSize: 40,
              color: "rgba(255,255,255,0.8)",
              lineHeight: 1.3,
            }}
          >
            of transport documents in Europe
            <br />
            are still on <span style={{ color: "#ee4723", fontWeight: 700 }}>paper</span>
          </div>
        </div>

        {/* Vertical separator */}
        <div style={{ width: 2, height: 340, background: "rgba(255,255,255,0.06)", borderRadius: 1, flexShrink: 0 }} />

        {/* Right: Supporting stats */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 40,
          }}
        >
          <div
            style={{
              opacity: supportSpring,
              transform: `translateX(${interpolate(supportSpring, [0, 1], [20, 0])}px)`,
            }}
          >
            <div style={{ fontFamily: headlineFont, fontSize: 56, fontWeight: 700, color: "#008999" }}>
              500M+
            </div>
            <div style={{ fontFamily: bodyFont, fontSize: 28, color: "rgba(255,255,255,0.6)", marginTop: 6 }}>
              paper CMR notes printed every year
            </div>
          </div>

          <div
            style={{
              opacity: secondStatSpring,
              transform: `translateX(${interpolate(secondStatSpring, [0, 1], [20, 0])}px)`,
            }}
          >
            <div style={{ fontFamily: headlineFont, fontSize: 56, fontWeight: 700, color: "#ee4723" }}>
              <CountUp target={72} suffix="%" frame={frame} fps={fps} delay={38} />
            </div>
            <div style={{ fontFamily: bodyFont, fontSize: 28, color: "rgba(255,255,255,0.6)", marginTop: 6 }}>
              of logistics companies still dispatch
              <br />
              with spreadsheets
            </div>
          </div>

          <div
            style={{
              opacity: deadlineSpring,
              transform: `translateX(${interpolate(deadlineSpring, [0, 1], [20, 0])}px)`,
              padding: "22px 28px",
              background: "rgba(238,71,35,0.08)",
              border: "1px solid rgba(238,71,35,0.2)",
              borderRadius: 16,
            }}
          >
            <div style={{ fontFamily: headlineFont, fontSize: 28, fontWeight: 700, color: "#ee4723", opacity: deadlinePulse }}>
              EU deadline: July 2027
            </div>
            <div style={{ fontFamily: bodyFont, fontSize: 22, color: "rgba(255,255,255,0.5)", marginTop: 6 }}>
              Electronic freight documents mandatory
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
