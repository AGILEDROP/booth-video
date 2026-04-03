import React from "react";
import { loadFont as loadNunito } from "@remotion/google-fonts/Nunito";

const { fontFamily: bodyFont } = loadNunito("normal", {
  weights: ["400", "600", "700"],
  subsets: ["latin"],
});

/**
 * Static glass-morphism header — pill shape, blur, bright border, inner glow.
 * Styled after the Figma "Glass box" spec, scaled to 1280x720.
 */
export const StaticHeader: React.FC = () => {
  return (
    <div
      style={{
        position: "absolute",
        top: 12,
        left: 20,
        right: 20,
        zIndex: 50,
        boxSizing: "border-box",
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.08) 100%)",
        border: "1.5px solid rgba(235,228,227,0.6)",
        boxShadow:
          "0px 10px 32px rgba(0,0,0,0.18), inset 0px 0px 8px 1px rgba(255,255,255,0.35)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderRadius: 16,
        padding: "14px 32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <p
        style={{
          fontFamily: bodyFont,
          fontSize: 17,
          fontWeight: 600,
          color: "rgba(255,255,255,0.92)",
          margin: 0,
          lineHeight: 1.55,
          textAlign: "center",
          letterSpacing: -0.3,
        }}
      >
        Večina logistične programske opreme je narejena za nekoga drugega. Mi jo
        naredimo za vas — z vgrajeno umetno inteligenco in brez kompromisov.{" "}
        <span style={{ color: "#ee4723", fontWeight: 700 }}>
          Koda in podatki ostanejo vaši.
        </span>
      </p>
    </div>
  );
};
