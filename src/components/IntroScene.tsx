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
import { CertiFlowLogo } from "./CertiFlowLogo";

const { fontFamily: headlineFont } = loadMontserrat("normal", {
  weights: ["600", "700", "800"],
  subsets: ["latin"],
});
const { fontFamily: bodyFont } = loadNunito("normal", {
  weights: ["400", "600", "700"],
  subsets: ["latin"],
});

export const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 200 }, delay: 15 });
  const subtitleSpring = spring({ frame, fps, config: { damping: 200 }, delay: 25 });
  const badgeSpring = spring({ frame, fps, config: { damping: 15 }, delay: 35 });

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
          gap: 16,
          paddingTop: 76, paddingBottom: 64,
        }}
      >
        <CertiFlowLogo size={80} />

        <h1
          style={{
            fontFamily: headlineFont,
            fontSize: 76,
            fontWeight: 800,
            color: "#fff",
            letterSpacing: -1,
            opacity: titleSpring,
            transform: `translateY(${interpolate(titleSpring, [0, 1], [30, 0])}px)`,
            margin: 0,
          }}
        >
          Certi<span style={{ color: "#ee4723" }}>Flow</span>
        </h1>

        <p
          style={{
            fontFamily: bodyFont,
            fontSize: 24,
            color: "rgba(255,255,255,0.6)",
            opacity: subtitleSpring,
            transform: `translateY(${interpolate(subtitleSpring, [0, 1], [20, 0])}px)`,
            margin: 0,
          }}
        >
          Electronic Trade Certificate Management
        </p>

        <div
          style={{
            marginTop: 16,
            padding: "10px 28px",
            background: "rgba(238,71,35,0.12)",
            border: "1px solid rgba(238,71,35,0.25)",
            borderRadius: 24,
            fontFamily: bodyFont,
            fontSize: 15,
            color: "rgba(255,255,255,0.75)",
            fontWeight: 600,
            letterSpacing: 1,
            textTransform: "uppercase" as const,
            opacity: badgeSpring,
            transform: `scale(${badgeSpring})`,
          }}
        >
          Built by Agiledrop
        </div>
      </div>
    </AbsoluteFill>
  );
};
