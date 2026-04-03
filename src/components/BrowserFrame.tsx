import React from "react";

/**
 * Browser chrome wrapper — renders children inside a macOS-style browser window
 * with 3D perspective tilt. The frame is decorative so viewers see it as an image,
 * not something to read.
 */
export const BrowserFrame: React.FC<{
  children: React.ReactNode;
  url?: string;
  tiltDeg?: number;
  appName?: string;
  navItems?: string[];
  accentColor?: string;
  headerBg?: string;
}> = ({
  children,
  url = "app.example.com",
  tiltDeg = 6,
  appName = "Platform",
  navItems = ["Dashboard", "Documents", "Reports"],
  accentColor = "#ee4723",
  headerBg = "#032633",
}) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        perspective: 1200,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "95%",
          height: "95%",
          transform: `rotateY(-${tiltDeg}deg) rotateX(2deg)`,
          transformStyle: "preserve-3d",
          borderRadius: 16,
          overflow: "hidden",
          boxShadow: "0 24px 80px rgba(0,0,0,0.25), 0 8px 24px rgba(0,0,0,0.15)",
          display: "flex",
          flexDirection: "column",
          background: "#fff",
        }}
      >
        {/* Browser top bar */}
        <div
          style={{
            height: 32,
            background: "linear-gradient(180deg, #f0f0f0 0%, #e8e8e8 100%)",
            borderBottom: "1px solid #d0d0d0",
            display: "flex",
            alignItems: "center",
            padding: "0 16px",
            gap: 8,
            flexShrink: 0,
          }}
        >
          <div style={{ width: 12, height: 12, borderRadius: 6, background: "#ff5f57" }} />
          <div style={{ width: 12, height: 12, borderRadius: 6, background: "#febc2e" }} />
          <div style={{ width: 12, height: 12, borderRadius: 6, background: "#28c840" }} />
          <div
            style={{
              flex: 1,
              marginLeft: 12,
              height: 24,
              background: "#fff",
              borderRadius: 6,
              border: "1px solid #d4d4d4",
              display: "flex",
              alignItems: "center",
              padding: "0 12px",
              fontSize: 12,
              color: "#888",
              fontFamily: "system-ui, sans-serif",
            }}
          >
            <span style={{ color: "#22c55e", marginRight: 6 }}>🔒</span>
            {url}
          </div>
        </div>

        {/* App header */}
        <div
          style={{
            height: 36,
            background: headerBg,
            display: "flex",
            alignItems: "center",
            padding: "0 20px",
            gap: 16,
            flexShrink: 0,
          }}
        >
          <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", letterSpacing: -0.3 }}>{appName}</div>
          <div style={{ width: 1, height: 18, background: "rgba(255,255,255,0.15)" }} />
          {navItems.map((item, i) => (
            <span key={i} style={{ fontSize: 12, color: i === 0 ? accentColor : "rgba(255,255,255,0.5)" }}>{item}</span>
          ))}
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflow: "hidden", background: "#f8f9fa" }}>
          {children}
        </div>

        {/* App footer */}
        <div
          style={{
            height: 22,
            background: "#f0f1f3",
            borderTop: "1px solid #e0e0e0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 16px",
            fontSize: 10,
            color: "#999",
            flexShrink: 0,
          }}
        >
          <span>© {appName}</span>
          <span>v2.4.1</span>
        </div>
      </div>
    </div>
  );
};
