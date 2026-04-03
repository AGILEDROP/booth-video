import React from "react";
import {
  AbsoluteFill,
  Img,
  staticFile,
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

export const AgiledropOutro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoSpring = spring({ frame, fps, config: { damping: 15 }, delay: 5 });
  const textSpring = spring({ frame, fps, config: { damping: 200 }, delay: 15 });
  const ctaSpring = spring({ frame, fps, config: { damping: 15 }, delay: 30 });

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
          gap: 24,
          paddingTop: 76, paddingBottom: 64,
        }}
      >
        <div style={{ opacity: logoSpring, transform: `scale(${logoSpring})` }}>
          <Img
            src={staticFile("agiledrop_logo_dark_bg.svg")}
            style={{ width: 300, height: "auto" }}
          />
        </div>

        <h2
          style={{
            fontFamily: headlineFont,
            fontSize: 46,
            fontWeight: 800,
            color: "#fff",
            textAlign: "center",
            margin: 0,
            lineHeight: 1.2,
            opacity: textSpring,
            transform: `translateY(${interpolate(textSpring, [0, 1], [20, 0])}px)`,
          }}
        >
          Need reliable
          <br />
          <span style={{ color: "#ee4723" }}>developers?</span>
        </h2>

        <p
          style={{
            fontFamily: bodyFont,
            fontSize: 20,
            color: "rgba(255,255,255,0.6)",
            textAlign: "center",
            maxWidth: 500,
            margin: 0,
            lineHeight: 1.5,
            opacity: textSpring,
          }}
        >
          PHP, JavaScript, Laravel, React, Vue
          <br />
          Available immediately.
        </p>

        <div
          style={{
            marginTop: 8,
            padding: "16px 48px",
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
          Let's talk
        </div>

        <div
          style={{
            fontFamily: bodyFont,
            fontSize: 18,
            color: "rgba(255,255,255,0.5)",
            opacity: ctaSpring,
          }}
        >
          hello@agiledrop.com
        </div>
      </div>
    </AbsoluteFill>
  );
};
