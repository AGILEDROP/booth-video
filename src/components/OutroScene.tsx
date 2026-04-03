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

const FEATURES = [
  "\uD83D\uDCC4 Certificates",
  "\uD83D\uDC65 Actors",
  "\uD83D\uDCB3 Billing",
  "\uD83D\uDCB0 Credits",
  "\uD83D\uDCCA Reports",
];

export const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 200 }, delay: 5 });
  const ctaSpring = spring({ frame, fps, config: { damping: 15 }, delay: 35 });

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
        <svg viewBox="0 0 48 48" fill="none" style={{ width: 48, height: 48 }}>
          <path d="M24 44C24 34.06 32.06 26 42 26" stroke="#008999" strokeWidth="3" strokeLinecap="round" />
          <path d="M12 44C12 26.33 26.33 12 44 12" stroke="#008999" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
          <circle cx="42" cy="44" r="5" fill="#008999" />
        </svg>

        <h2
          style={{
            fontFamily: headlineFont,
            fontSize: 46,
            fontWeight: 800,
            color: "#fff",
            textAlign: "center",
            margin: 0,
            opacity: titleSpring,
            transform: `translateY(${interpolate(titleSpring, [0, 1], [20, 0])}px)`,
            lineHeight: 1.2,
          }}
        >
          CertiFlow — all-in-one
          <br />
          <span style={{ color: "#ee4723" }}>trade certificate platform</span>
        </h2>

        {/* Feature pills in a row */}
        <div style={{ display: "flex", gap: 14, justifyContent: "center" }}>
          {FEATURES.map((f, i) => {
            const s = spring({ frame, fps, config: { damping: 200 }, delay: 18 + i * 5 });
            return (
              <div
                key={i}
                style={{
                  padding: "12px 22px",
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: 10,
                  fontFamily: bodyFont,
                  fontSize: 17,
                  color: "rgba(255,255,255,0.85)",
                  fontWeight: 600,
                  opacity: s,
                  transform: `scale(${interpolate(s, [0, 1], [0.9, 1])})`,
                }}
              >
                {f}
              </div>
            );
          })}
        </div>

        <div
          style={{
            marginTop: 8,
            padding: "16px 44px",
            background: "#ee4723",
            borderRadius: 14,
            fontFamily: headlineFont,
            fontSize: 20,
            fontWeight: 700,
            color: "#fff",
            opacity: ctaSpring,
            transform: `scale(${ctaSpring})`,
          }}
        >
          Built by Agiledrop
        </div>
      </div>
    </AbsoluteFill>
  );
};
