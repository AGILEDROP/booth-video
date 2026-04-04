import React from "react";
import { Img, staticFile, useCurrentFrame } from "remotion";
import { loadFont as loadNunito } from "@remotion/google-fonts/Nunito";

const { fontFamily: bodyFont } = loadNunito("normal", {
  weights: ["600", "700"],
  subsets: ["latin"],
});

export const LinkedInBar: React.FC<{
  totalFrames: number;
}> = ({ totalFrames }) => {
  const frame = useCurrentFrame();
  const progress = Math.min(frame / totalFrames, 1);

  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 100,
        background: "rgba(3,38,51,0.96)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Progress bar */}
      <div style={{ height: 3, background: "rgba(255,255,255,0.08)", width: "100%" }}>
        <div
          style={{
            height: "100%",
            width: `${progress * 100}%`,
            background: "#ee4723",
            borderRadius: 2,
          }}
        />
      </div>

      {/* Content */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 40px",
        }}
      >
        <div
          style={{
            fontFamily: bodyFont,
            fontSize: 24,
            color: "rgba(255,255,255,0.5)",
            fontWeight: 600,
          }}
        >
          Your logistics. Your software.
        </div>

        <Img
          src={staticFile("agiledrop_logo_dark_bg.svg")}
          style={{ height: 32, opacity: 0.8 }}
        />
      </div>
    </div>
  );
};
