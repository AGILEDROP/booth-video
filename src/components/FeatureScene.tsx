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

type FeatureSceneProps = {
  icon: string;
  title: string;
  subtitle: string;
  features: string[];
  accentColor?: string;
  mockContent: React.ReactNode;
};

export const FeatureScene: React.FC<FeatureSceneProps> = ({
  icon,
  title,
  subtitle,
  features,
  accentColor = "#ee4723",
  mockContent,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerSpring = spring({
    frame,
    fps,
    config: { damping: 200 },
    delay: 5,
  });
  const contentSpring = spring({
    frame,
    fps,
    config: { damping: 200 },
    delay: 15,
  });

  const headerY = interpolate(headerSpring, [0, 1], [20, 0]);
  const contentY = interpolate(contentSpring, [0, 1], [30, 0]);

  return (
    <AbsoluteFill>
      <AgiledropNoiseBg variant="light" />

      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          padding: "80px 50px 68px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Top bar accent */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 3,
            background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
            opacity: headerSpring,
          }}
        />

        {/* Context line: CertiFlow badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 12,
            opacity: headerSpring,
          }}
        >
          <svg viewBox="0 0 48 48" fill="none" style={{ width: 22, height: 22 }}>
            <path d="M24 44C24 34.06 32.06 26 42 26" stroke="#005f6a" strokeWidth="3" strokeLinecap="round" />
            <circle cx="42" cy="44" r="5" fill="#005f6a" />
          </svg>
          <span
            style={{
              fontFamily: headlineFont,
              fontSize: 15,
              fontWeight: 700,
              color: "#005f6a",
            }}
          >
            CertiFlow
          </span>
          <span
            style={{
              fontFamily: bodyFont,
              fontSize: 13,
              color: "#718096",
            }}
          >
            Electronic Trade Certificate Platform
          </span>
        </div>

        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            marginBottom: 24,
            opacity: headerSpring,
            transform: `translateY(${headerY}px)`,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: `${accentColor}12`,
              border: `1px solid ${accentColor}25`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
            }}
          >
            {icon}
          </div>
          <div>
            <h2
              style={{
                fontFamily: headlineFont,
                fontSize: 42,
                fontWeight: 800,
                color: "#032633",
                margin: 0,
              }}
            >
              {title}
            </h2>
            <p
              style={{
                fontFamily: bodyFont,
                fontSize: 18,
                color: "#4a5568",
                margin: 0,
                marginTop: 2,
              }}
            >
              {subtitle}
            </p>
          </div>
        </div>

        {/* Content area */}
        <div
          style={{
            flex: 1,
            display: "flex",
            gap: 28,
            opacity: contentSpring,
            transform: `translateY(${contentY}px)`,
          }}
        >
          {/* Mock UI */}
          <div
            style={{
              flex: 2,
              background: "rgba(255,255,255,0.75)",
              border: "1px solid rgba(3,38,51,0.08)",
              borderRadius: 14,
              overflow: "hidden",
            }}
          >
            {mockContent}
          </div>

          {/* Feature list */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: 18,
              justifyContent: "center",
            }}
          >
            {features.map((feature, i) => {
              const featureSpring = spring({
                frame,
                fps,
                config: { damping: 200 },
                delay: 25 + i * 10,
              });
              const featureX = interpolate(featureSpring, [0, 1], [20, 0]);

              return (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 14,
                    opacity: featureSpring,
                    transform: `translateX(${featureX}px)`,
                  }}
                >
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: 4,
                      background: accentColor,
                      marginTop: 9,
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: bodyFont,
                      fontSize: 19,
                      color: "#1a202c",
                      lineHeight: 1.45,
                      fontWeight: 600,
                    }}
                  >
                    {feature}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
