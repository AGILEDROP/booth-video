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

export const AgiledropCertiFlowBridge: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const s1 = spring({ frame, fps, config: { damping: 200 }, delay: 5 });
  const s2 = spring({ frame, fps, config: { damping: 200 }, delay: 18 });
  const s3 = spring({ frame, fps, config: { damping: 200 }, delay: 30 });
  const arrowSpring = spring({ frame, fps, config: { damping: 15 }, delay: 40 });

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
          gap: 28,
          paddingTop: 76, paddingBottom: 64,
        }}
      >
        <div
          style={{
            fontFamily: bodyFont,
            fontSize: 15,
            fontWeight: 600,
            color: "#ee4723",
            textTransform: "uppercase",
            letterSpacing: 2,
            opacity: s1,
          }}
        >
          Product Showcase
        </div>

        <h2
          style={{
            fontFamily: headlineFont,
            fontSize: 48,
            fontWeight: 800,
            color: "#fff",
            textAlign: "center",
            margin: 0,
            lineHeight: 1.2,
            opacity: s2,
            transform: `translateY(${interpolate(s2, [0, 1], [20, 0])}px)`,
          }}
        >
          Built by <span style={{ color: "#ee4723" }}>Agiledrop</span>
        </h2>

        {/* Logos side by side */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 32,
            opacity: s3,
            transform: `translateY(${interpolate(s3, [0, 1], [15, 0])}px)`,
          }}
        >
          <div
            style={{
              padding: "18px 32px",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 16,
            }}
          >
            <span style={{ fontFamily: headlineFont, fontSize: 32, fontWeight: 700, color: "#fff" }}>
              agiledrop
            </span>
          </div>

          <div
            style={{
              opacity: arrowSpring,
              transform: `translateX(${interpolate(arrowSpring, [0, 1], [-10, 0])}px)`,
            }}
          >
            <svg width="44" height="28" viewBox="0 0 44 28" fill="none">
              <path d="M0 14h36m0 0l-10-10m10 10l-10 10" stroke="#ee4723" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <div
            style={{
              padding: "18px 32px",
              background: "rgba(0,95,106,0.1)",
              border: "1px solid rgba(0,137,153,0.2)",
              borderRadius: 16,
              display: "flex",
              alignItems: "center",
              gap: 14,
            }}
          >
            <svg viewBox="0 0 48 48" fill="none" style={{ width: 34, height: 34 }}>
              <path d="M24 44C24 34.06 32.06 26 42 26" stroke="#008999" strokeWidth="3" strokeLinecap="round" />
              <path d="M12 44C12 26.33 26.33 12 44 12" stroke="#008999" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
              <circle cx="42" cy="44" r="5" fill="#008999" />
            </svg>
            <span style={{ fontFamily: headlineFont, fontSize: 32, fontWeight: 700, color: "#fff" }}>
              CertiFlow
            </span>
          </div>
        </div>

        <p
          style={{
            fontFamily: bodyFont,
            fontSize: 20,
            color: "rgba(255,255,255,0.55)",
            textAlign: "center",
            maxWidth: 500,
            margin: 0,
            lineHeight: 1.5,
            opacity: s3,
          }}
        >
          Electronic Trade Certificate Management Platform
        </p>
      </div>
    </AbsoluteFill>
  );
};
