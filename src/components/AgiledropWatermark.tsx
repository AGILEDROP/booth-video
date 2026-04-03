import React from "react";
import { Img, staticFile } from "remotion";

/**
 * Small Agiledrop square logo in the top-right corner of every scene.
 */
export const AgiledropWatermark: React.FC = () => {
  return (
    <div
      style={{
        position: "absolute",
        top: 20,
        right: 24,
        zIndex: 10,
      }}
    >
      <Img
        src={staticFile("agiledrop_logo.svg")}
        style={{ width: 36, height: 36 }}
      />
    </div>
  );
};
