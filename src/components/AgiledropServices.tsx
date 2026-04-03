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

const SERVICES = [
  { icon: "</>", title: "Web Development", desc: "Laravel, PHP, APIs, scalable architectures", color: "#ee4723" },
  { icon: "\u{1F310}", title: "Frontend Engineering", desc: "React & Vue, performance-focused", color: "#008999" },
  { icon: "\u{1F3A8}", title: "UI/UX Design", desc: "Product design & design systems", color: "#bfc3ea" },
  { icon: "\u2601", title: "DevOps & Cloud", desc: "CI/CD, Docker, cloud infra", color: "#005f6a" },
];

const TECH = ["PHP", "Laravel", "JavaScript", "TypeScript", "React", "Vue"];

export const AgiledropServices: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerSpring = spring({ frame, fps, config: { damping: 200 }, delay: 5 });

  return (
    <AbsoluteFill>
      <AgiledropNoiseBg variant="light" />

      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "86px 60px 68px",
        }}
      >
        <div
          style={{
            opacity: headerSpring,
            transform: `translateY(${interpolate(headerSpring, [0, 1], [20, 0])}px)`,
            marginBottom: 28,
          }}
        >
          <h2
            style={{
              fontFamily: headlineFont,
              fontSize: 44,
              fontWeight: 800,
              color: "#032633",
              margin: 0,
            }}
          >
            What we <span style={{ color: "#ee4723" }}>build</span>
          </h2>
        </div>

        {/* Services grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, flex: 1 }}>
          {SERVICES.map((service, i) => {
            const s = spring({ frame, fps, config: { damping: 200 }, delay: 15 + i * 8 });
            return (
              <div
                key={i}
                style={{
                  background: "rgba(255,255,255,0.7)",
                  borderRadius: 16,
                  border: "1px solid rgba(3,38,51,0.08)",
                  padding: "28px 28px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  opacity: s,
                  transform: `translateY(${interpolate(s, [0, 1], [15, 0])}px)`,
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    background: `${service.color}12`,
                    border: `1px solid ${service.color}25`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: service.icon === "</>" ? 18 : 24,
                    fontFamily: service.icon === "</>" ? "monospace" : bodyFont,
                    fontWeight: 700,
                    color: service.color,
                  }}
                >
                  {service.icon}
                </div>
                <div style={{ fontFamily: headlineFont, fontSize: 24, fontWeight: 700, color: "#032633" }}>
                  {service.title}
                </div>
                <div style={{ fontFamily: bodyFont, fontSize: 16, color: "#4a5568", lineHeight: 1.4 }}>
                  {service.desc}
                </div>
              </div>
            );
          })}
        </div>

        {/* Tech stack */}
        <div style={{ display: "flex", gap: 14, marginTop: 18, justifyContent: "center" }}>
          {TECH.map((tech, i) => {
            const s = spring({ frame, fps, config: { damping: 200 }, delay: 50 + i * 4 });
            return (
              <div
                key={i}
                style={{
                  padding: "8px 22px",
                  borderRadius: 8,
                  background: "#032633",
                  fontFamily: bodyFont,
                  fontSize: 15,
                  fontWeight: 600,
                  color: "#fff",
                  opacity: s,
                  transform: `scale(${interpolate(s, [0, 1], [0.9, 1])})`,
                }}
              >
                {tech}
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
