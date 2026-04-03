import React from "react";

/**
 * Noise mesh gradient background matching Agiledrop's brand style.
 * Uses inline SVG feTurbulence for the grain texture, plus radial
 * gradients in petrol / orange-red (brand-dark variant).
 */

type Variant = "dark" | "light";

export const AgiledropNoiseBg: React.FC<{ variant?: Variant }> = ({
  variant = "dark",
}) => {
  const noiseSvg = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.18'/%3E%3C/svg%3E")`;

  const darkGradients = [
    "radial-gradient(at 90% 8%, rgba(238,71,35,0.42) 0%, rgba(238,71,35,0.12) 25%, transparent 45%)",
    "radial-gradient(at 8% 8%, rgba(3,38,51,0.8) 0%, rgba(3,38,51,0.4) 25%, transparent 50%)",
    "radial-gradient(at 25% 92%, rgba(238,71,35,0.35) 0%, rgba(238,71,35,0.08) 30%, transparent 50%)",
    "radial-gradient(at 75% 88%, rgba(0,137,153,0.32) 0%, rgba(0,95,106,0.1) 28%, transparent 48%)",
    "radial-gradient(at 50% 50%, rgba(3,38,51,0.9) 0%, rgba(3,38,51,0.7) 60%, rgba(3,38,51,0.5) 100%)",
  ];

  const lightGradients = [
    "radial-gradient(at 90% 5%, rgba(238,71,35,0.15) 0%, transparent 35%)",
    "radial-gradient(at 10% 10%, rgba(0,95,106,0.08) 0%, transparent 40%)",
    "radial-gradient(at 15% 90%, rgba(0,95,106,0.15) 0%, transparent 35%)",
    "radial-gradient(at 85% 85%, rgba(0,137,153,0.15) 0%, transparent 35%)",
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
