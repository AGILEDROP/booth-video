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

export const AgiledropIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({ frame, fps, config: { damping: 15 }, delay: 5 });
  const taglineSpring = spring({ frame, fps, config: { damping: 200 }, delay: 18 });
  const descSpring = spring({ frame, fps, config: { damping: 200 }, delay: 28 });
  const pillsSpring = spring({ frame, fps, config: { damping: 200 }, delay: 38 });

  const taglineY = interpolate(taglineSpring, [0, 1], [25, 0]);
  const descY = interpolate(descSpring, [0, 1], [20, 0]);

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
          gap: 20,
          paddingTop: 76, paddingBottom: 64,
        }}
      >
        {/* Agiledrop full logo */}
        <div
          style={{
            opacity: logoScale,
            transform: `scale(${logoScale})`,
          }}
        >
          <Img
            src={staticFile("agiledrop_logo_dark_bg.svg")}
            style={{ width: 340, height: "auto" }}
          />
        </div>

        <h1
          style={{
            fontFamily: headlineFont,
            fontSize: 56,
            fontWeight: 800,
            color: "#fff",
            textAlign: "center",
            margin: 0,
            marginTop: 12,
            opacity: taglineSpring,
            transform: `translateY(${taglineY}px)`,
            lineHeight: 1.15,
          }}
        >
          Your software,{" "}
          <span style={{ color: "#ee4723" }}>our teamware.</span>
        </h1>

        <p
          style={{
            fontFamily: bodyFont,
            fontSize: 22,
            color: "rgba(255,255,255,0.7)",
            textAlign: "center",
            maxWidth: 600,
            margin: 0,
            lineHeight: 1.5,
            opacity: descSpring,
            transform: `translateY(${descY}px)`,
          }}
        >
          Reliable PHP & JavaScript developers
          <br />
          for your team or project.
        </p>

        <div
          style={{
            display: "flex",
            gap: 16,
            marginTop: 12,
            opacity: pillsSpring,
          }}
        >
          {["Culture", "Community", "Commitment"].map((value, i) => {
            const s = spring({ frame, fps, config: { damping: 200 }, delay: 42 + i * 6 });
            return (
              <div
                key={i}
                style={{
                  padding: "10px 28px",
                  borderRadius: 24,
                  border: "1px solid rgba(255,255,255,0.15)",
                  background: "rgba(255,255,255,0.05)",
                  fontFamily: bodyFont,
                  fontSize: 16,
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.85)",
                  letterSpacing: 0.5,
                  opacity: s,
                  transform: `scale(${interpolate(s, [0, 1], [0.9, 1])})`,
                }}
              >
                {value}
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
