import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";

export const CertiFlowLogo: React.FC<{ size?: number }> = ({
  size = 64,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const arc1 = spring({ frame, fps, config: { damping: 200 }, delay: 5 });
  const arc2 = spring({ frame, fps, config: { damping: 200 }, delay: 10 });
  const arc3 = spring({ frame, fps, config: { damping: 200 }, delay: 15 });
  const dot = spring({ frame, fps, config: { damping: 15 }, delay: 20 });

  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      style={{ width: size, height: size }}
    >
      <path
        d="M24 44C24 34.06 32.06 26 42 26"
        stroke="#8b5cf6"
        strokeWidth="3"
        strokeLinecap="round"
        style={{
          opacity: arc1,
          strokeDasharray: 30,
          strokeDashoffset: interpolate(arc1, [0, 1], [30, 0]),
        }}
      />
      <path
        d="M12 44C12 26.33 26.33 12 44 12"
        stroke="#8b5cf6"
        strokeWidth="3"
        strokeLinecap="round"
        style={{
          opacity: interpolate(arc2, [0, 1], [0, 0.6]),
          strokeDasharray: 55,
          strokeDashoffset: interpolate(arc2, [0, 1], [55, 0]),
        }}
      />
      <path
        d="M0 44C0 24.15 16.15 8 36 8"
        stroke="#8b5cf6"
        strokeWidth="3"
        strokeLinecap="round"
        style={{
          opacity: interpolate(arc3, [0, 1], [0, 0.3]),
          strokeDasharray: 60,
          strokeDashoffset: interpolate(arc3, [0, 1], [60, 0]),
        }}
      />
      <circle
        cx="42"
        cy="44"
        r="5"
        fill="#8b5cf6"
        style={{
          transform: `scale(${dot})`,
          transformOrigin: "42px 44px",
        }}
      />
    </svg>
  );
};
