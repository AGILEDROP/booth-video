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

const { fontFamily: headlineFont } = loadMontserrat("normal", {
  weights: ["600", "700", "800"],
  subsets: ["latin"],
});
const { fontFamily: bodyFont } = loadNunito("normal", {
  weights: ["400", "600", "700"],
  subsets: ["latin"],
});

const STATS = [
  { value: 80, label: "full-time employees" },
  { value: 65, label: "engineers" },
  { value: 500, suffix: "+", label: "projects delivered" },
];

const CLIENTS = [
  [
    { name: "Deutsche Telekom", logo: "logos/deutsche-telekom.png", zoom: 1.2 },
    { name: "Capgemini", logo: "logos/capgemini.svg" },
    { name: "UNESCO", logo: "logos/unesco.svg" },
  ],
  [
    { name: "European Commission", logo: "logos/european-commission.svg" },
    { name: "Univerza v Ljubljani", logo: "UL_logo-RGB_barv.png", zoom: 1.3 },
    { name: "T-Systems", logo: "logos/t-systems.svg" },
  ],
  [
    { name: "SAGE Publishing", logo: "logos/sage-publishing.svg" },
    { name: "Hubert Burda Media", logo: "logos/hubert-burda-media.svg" },
    { name: "Acquia", logo: "logos/acquia.svg", zoom: 1.25 },
  ],
];

const CountUp: React.FC<{ target: number; suffix?: string; frame: number; fps: number; delay: number }> = ({
  target, suffix = "", frame, fps, delay,
}) => {
  const progress = spring({ frame, fps, config: { damping: 80, mass: 0.6 }, delay });
  return <>{Math.round(target * progress)}{suffix}</>;
};

export const Scene10Team: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerSpring = spring({ frame, fps, config: { damping: 200 }, delay: 3 });
  const locationSpring = spring({ frame, fps, config: { damping: 200 }, delay: 65 });

  return (
    <AbsoluteFill>
      {/* Team photo background */}
      <Img
        src={staticFile("Agiledrop-AxlHub-Ljubljana-10-10-25-Studio-Zelezna-Helena-Balaz-3.jpg")}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: "scaleX(-1)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(135deg, rgba(3,38,51,0.92) 0%, rgba(3,38,51,0.85) 50%, rgba(3,38,51,0.75) 100%)",
        }}
      />

      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          padding: "75px 80px 140px",
          gap: 50,
        }}
      >
        {/* Left: Stats */}
        <div style={{ flex: 3.5, display: "flex", flexDirection: "column", justifyContent: "center", gap: 36 }}>
          <div
            style={{
              opacity: headerSpring,
              transform: `translateY(${interpolate(headerSpring, [0, 1], [15, 0])}px)`,
              marginBottom: 12,
            }}
          >
            <h2 style={{ fontFamily: headlineFont, fontSize: 60, fontWeight: 800, color: "#fff", margin: 0 }}>
              The <span style={{ color: "#ee4723" }}>team</span>
            </h2>
          </div>

          {STATS.map((stat, i) => {
            const s = spring({ frame, fps, config: { damping: 200 }, delay: 10 + i * 10 });
            return (
              <div key={i} style={{ opacity: s, transform: `translateX(${interpolate(s, [0, 1], [-15, 0])}px)` }}>
                <div style={{ fontFamily: headlineFont, fontSize: 88, fontWeight: 800, color: "#fff", lineHeight: 1 }}>
                  <CountUp target={stat.value} suffix={stat.suffix} frame={frame} fps={fps} delay={12 + i * 10} />
                </div>
                <div style={{ fontFamily: bodyFont, fontSize: 26, color: "rgba(255,255,255,0.55)", marginTop: 6 }}>
                  {stat.label}
                </div>
              </div>
            );
          })}

          <div style={{ display: "flex", gap: 36, marginTop: 8 }}>
            {[
              { label: "Since 2013", sub: "13 years of delivery" },
              { label: "AAA Gold", sub: "Bisnode creditworthiness" },
            ].map((item, i) => {
              const s = spring({ frame, fps, config: { damping: 200 }, delay: 42 + i * 8 });
              return (
                <div key={i} style={{ opacity: s }}>
                  <div style={{ fontFamily: headlineFont, fontSize: 28, fontWeight: 700, color: "#ee4723" }}>{item.label}</div>
                  <div style={{ fontFamily: bodyFont, fontSize: 20, color: "rgba(255,255,255,0.45)", marginTop: 4 }}>{item.sub}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Client logos on white cards */}
        <div style={{ flex: 6.5, display: "flex", flexDirection: "column", justifyContent: "center", gap: 18 }}>
          {CLIENTS.map((row, rowIndex) => (
            <div key={rowIndex} style={{ display: "flex", gap: 18 }}>
              {row.map((client, colIndex) => {
                const s = spring({ frame, fps, config: { damping: 200 }, delay: 18 + rowIndex * 8 + colIndex * 4 });
                return (
                  <div
                    key={colIndex}
                    style={{
                      flex: 1,
                      height: 115,
                      background: "#ffffff",
                      borderRadius: 16,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "12px 16px",
                      opacity: s,
                      transform: `scale(${interpolate(s, [0, 1], [0.92, 1])})`,
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                    }}
                  >
                    <Img
                      src={staticFile(client.logo)}
                      style={{
                        maxHeight: "100%",
                        maxWidth: "100%",
                        objectFit: "contain",
                        transform: client.zoom ? `scale(${client.zoom})` : undefined,
                      }}
                    />
                  </div>
                );
              })}
            </div>
          ))}

          <div
            style={{
              textAlign: "center",
              marginTop: 12,
              opacity: locationSpring,
              transform: `translateY(${interpolate(locationSpring, [0, 1], [10, 0])}px)`,
            }}
          >
            <span style={{ fontFamily: bodyFont, fontSize: 26, fontWeight: 600, color: "rgba(255,255,255,0.55)" }}>
              Ljubljana, Slovenia —{" "}
              <span style={{ color: "rgba(255,255,255,0.75)" }}>building software for Europe</span>
            </span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
