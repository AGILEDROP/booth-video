import React from "react";
import { useCurrentFrame } from "remotion";

type Variant = "dark" | "light";

export const AgiledropNoiseBg: React.FC<{ variant?: Variant }> = ({
  variant = "dark",
}) => {
  const frame = useCurrentFrame();

  const noiseSvg = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.18'/%3E%3C/svg%3E")`;

  // Pronounced oscillation — clearly visible gradient drift
  const t = frame * 0.004;

  const p1x = 80 + Math.sin(t) * 25;
  const p1y = 10 + Math.cos(t * 0.7) * 15;
  const p2x = 15 + Math.sin(t * 0.6 + 1) * 18;
  const p2y = 10 + Math.cos(t * 0.8 + 2) * 15;
  const p3x = 30 + Math.sin(t * 0.5 + 3) * 30;
  const p3y = 85 + Math.cos(t * 0.9 + 1) * 15;
  const p4x = 70 + Math.sin(t * 0.7 + 2) * 25;
  const p4y = 80 + Math.cos(t * 0.6 + 3) * 18;

  const darkGradients = [
    `radial-gradient(ellipse at ${p1x}% ${p1y}%, rgba(238,71,35,0.45) 0%, rgba(238,71,35,0.12) 25%, transparent 50%)`,
    `radial-gradient(ellipse at ${p2x}% ${p2y}%, rgba(3,38,51,0.85) 0%, rgba(3,38,51,0.4) 25%, transparent 55%)`,
    `radial-gradient(ellipse at ${p3x}% ${p3y}%, rgba(238,71,35,0.38) 0%, rgba(238,71,35,0.08) 30%, transparent 55%)`,
    `radial-gradient(ellipse at ${p4x}% ${p4y}%, rgba(0,137,153,0.38) 0%, rgba(0,95,106,0.1) 28%, transparent 52%)`,
    "radial-gradient(at 50% 50%, rgba(3,38,51,0.88) 0%, rgba(3,38,51,0.65) 60%, rgba(3,38,51,0.45) 100%)",
  ];

  const lp1x = 80 + Math.sin(t * 0.8) * 20;
  const lp1y = 8 + Math.cos(t * 0.6) * 10;
  const lp2x = 12 + Math.sin(t * 0.5 + 1) * 14;
  const lp2y = 12 + Math.cos(t * 0.7 + 2) * 14;
  const lp3x = 18 + Math.sin(t * 0.6 + 3) * 20;
  const lp3y = 85 + Math.cos(t * 0.8 + 1) * 14;
  const lp4x = 78 + Math.sin(t * 0.7 + 2) * 18;
  const lp4y = 78 + Math.cos(t * 0.5 + 3) * 16;

  const lightGradients = [
    `radial-gradient(ellipse at ${lp1x}% ${lp1y}%, rgba(238,71,35,0.18) 0%, transparent 40%)`,
    `radial-gradient(ellipse at ${lp2x}% ${lp2y}%, rgba(0,95,106,0.12) 0%, transparent 45%)`,
    `radial-gradient(ellipse at ${lp3x}% ${lp3y}%, rgba(0,95,106,0.18) 0%, transparent 40%)`,
    `radial-gradient(ellipse at ${lp4x}% ${lp4y}%, rgba(0,137,153,0.18) 0%, transparent 40%)`,
    "radial-gradient(rgba(238,71,35,0.04) 0%, transparent 50%)",
  ];

  const gradients = variant === "dark" ? darkGradients : lightGradients;
  const bgColor = variant === "dark" ? "#032633" : "#fdfdfd";

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: bgColor,
        backgroundImage: [noiseSvg, ...gradients].join(", "),
        backgroundSize: "200px 200px, cover, cover, cover, cover, cover",
        backgroundRepeat: "repeat, no-repeat, no-repeat, no-repeat, no-repeat, no-repeat",
      }}
    />
  );
};
