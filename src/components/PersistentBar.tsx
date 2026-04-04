import React from "react";
import { Img, staticFile, useCurrentFrame } from "remotion";
import { loadFont as loadNunito } from "@remotion/google-fonts/Nunito";
import { SCENES, getSceneStarts, getTotalDuration } from "../sceneConfig";

const { fontFamily: bodyFont } = loadNunito("normal", {
  weights: ["400", "600", "700"],
  subsets: ["latin"],
});

const SCENE_TITLES = [
  "The problem",
  "What we build",
  "AI agents",
  "Deadlines",
  "AI use cases",
  "Customs",
  "Toll processing",
  "Cargo",
  "Platform",
  "Team",
];

export const PersistentBar: React.FC = () => {
  const frame = useCurrentFrame();
  const sceneStarts = getSceneStarts();
  const totalDuration = getTotalDuration();

  let activeScene = 0;
  for (let i = sceneStarts.length - 1; i >= 0; i--) {
    if (frame >= sceneStarts[i]) {
      activeScene = i;
      break;
    }
  }

  const overallProgress = Math.min(frame / totalDuration, 1);

  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 110,
        background: "rgba(3,38,51,0.94)",
        backdropFilter: "blur(12px)",
        display: "flex",
        flexDirection: "column",
        zIndex: 50,
      }}
    >
      {/* Full-width progress line at top */}
      <div
        style={{
          width: "100%",
          height: 4,
          background: "rgba(255,255,255,0.06)",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${overallProgress * 100}%`,
            background: "#ee4723",
            borderRadius: "0 2px 2px 0",
          }}
        />
      </div>

      {/* Main bar content */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          padding: "0 48px",
        }}
      >
        {/* Left: Tagline */}
        <div style={{ minWidth: 240, flexShrink: 0 }}>
          <span
            style={{
              fontFamily: bodyFont,
              fontSize: 26,
              fontWeight: 700,
              color: "rgba(255,255,255,0.75)",
              lineHeight: 1.3,
            }}
          >
            Your logistics. Your software.
          </span>
        </div>

        {/* Center: Timeline dots with titles */}
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 16px",
          }}
        >
          {SCENES.map((_scene, i) => {
            const isActive = i === activeScene;
            const isPast = i < activeScene;

            return (
              <React.Fragment key={i}>
                {/* Dot + label */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 7,
                    flexShrink: 0,
                  }}
                >
                  {/* Dot */}
                  <div
                    style={{
                      width: isActive ? 14 : 8,
                      height: isActive ? 14 : 8,
                      borderRadius: "50%",
                      background: isPast || isActive ? "#ee4723" : "rgba(255,255,255,0.15)",
                      boxShadow: isActive ? "0 0 12px rgba(238,71,35,0.4)" : "none",
                      flexShrink: 0,
                    }}
                  />
                  {/* Title */}
                  <span
                    style={{
                      fontFamily: bodyFont,
                      fontSize: 16,
                      color: isActive
                        ? "rgba(255,255,255,0.95)"
                        : isPast
                        ? "rgba(255,255,255,0.5)"
                        : "rgba(255,255,255,0.3)",
                      fontWeight: isActive ? 700 : 500,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {SCENE_TITLES[i]}
                  </span>
                </div>

                {/* Connecting line between dots (not after last) */}
                {i < SCENES.length - 1 && (
                  <div
                    style={{
                      height: 2,
                      flex: 1,
                      minWidth: 8,
                      maxWidth: 28,
                      background: isPast ? "#ee4723" : "rgba(255,255,255,0.08)",
                      marginTop: -22,
                      flexShrink: 1,
                    }}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Right: Agiledrop logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            minWidth: 240,
            flexShrink: 0,
          }}
        >
          <Img
            src={staticFile("agiledrop_logo_dark_bg.svg")}
            style={{ height: 36, width: "auto" }}
          />
        </div>
      </div>
    </div>
  );
};
