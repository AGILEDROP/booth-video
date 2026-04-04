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
import { AgiledropNoiseBg } from "./AgiledropNoiseBg";

const { fontFamily: headlineFont } = loadMontserrat("normal", {
  weights: ["600", "700", "800"],
  subsets: ["latin"],
});
const { fontFamily: bodyFont } = loadNunito("normal", {
  weights: ["400", "600", "700"],
  subsets: ["latin"],
});

/** Toll admin dashboard mock — rich, fills entire frame */
const TollAdminContent: React.FC = () => (
  <div style={{ height: "100%", display: "flex", flexDirection: "column", background: "#fffbeb" }}>
    <div style={{ height: 30, background: "#f97316", display: "flex", alignItems: "center", padding: "0 12px", gap: 8, flexShrink: 0 }}>
      <span style={{ fontSize: 10, fontWeight: 700, color: "#fff" }}>24toll Admin</span>
      <div style={{ width: 1, height: 14, background: "rgba(255,255,255,0.3)" }} />
      {["Dashboard", "Passes", "Invoices", "Lanes"].map((t, i) => (
        <span key={i} style={{ fontSize: 8, color: i === 0 ? "#fff" : "rgba(255,255,255,0.7)" }}>{t}</span>
      ))}
      <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 3 }}>
        <div style={{ width: 5, height: 5, borderRadius: 3, background: "#22c55e" }} />
        <span style={{ fontSize: 7, color: "#fff" }}>LIVE</span>
      </div>
    </div>
    <div style={{ flex: 1, padding: 8, display: "flex", flexDirection: "column", gap: 6 }}>
      {/* Stats row */}
      <div style={{ display: "flex", gap: 5 }}>
        {[
          { l: "Passes Today", v: "12,847", c: "#ea580c", bg: "#fff7ed" },
          { l: "Revenue", v: "€53.9k", c: "#16a34a", bg: "#f0fdf4" },
          { l: "Avg Speed", v: "62 km/h", c: "#2563eb", bg: "#eff6ff" },
          { l: "Active Lanes", v: "4/4", c: "#7c3aed", bg: "#faf5ff" },
        ].map((c, i) => (
          <div key={i} style={{ flex: 1, padding: "4px 7px", background: c.bg, borderRadius: 5, border: `1px solid ${c.c}15` }}>
            <div style={{ fontSize: 6, color: "#78716c", textTransform: "uppercase" }}>{c.l}</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: c.c }}>{c.v}</div>
          </div>
        ))}
      </div>
      {/* Chart + lane status */}
      <div style={{ display: "flex", gap: 5 }}>
        <div style={{ flex: 1, background: "#fff", borderRadius: 5, border: "1px solid #fde68a40", padding: "5px 7px" }}>
          <div style={{ fontSize: 7, fontWeight: 700, color: "#92400e", marginBottom: 3 }}>Hourly Volume</div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 2, height: 30 }}>
            {[15, 10, 8, 12, 25, 45, 65, 80, 72, 68, 55, 48, 52, 60, 58].map((h, i) => (
              <div key={i} style={{ flex: 1, height: `${h}%`, background: i === 7 ? "#f97316" : "#fed7aa", borderRadius: 1.5 }} />
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 5, color: "#a8a29e", marginTop: 1 }}>
            <span>00:00</span><span>07:00</span><span>14:00</span>
          </div>
        </div>
        <div style={{ flex: 1, background: "#fff", borderRadius: 5, border: "1px solid #fde68a40", padding: "5px 7px" }}>
          <div style={{ fontSize: 7, fontWeight: 700, color: "#92400e", marginBottom: 3 }}>Lane Status</div>
          {["A1 — Northbound", "A2 — Northbound", "B1 — Southbound", "B2 — Southbound"].map((lane, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 7, marginBottom: 2 }}>
              <div style={{ width: 5, height: 5, borderRadius: 3, background: "#22c55e" }} />
              <span style={{ color: "#44403c" }}>{lane}</span>
              <span style={{ marginLeft: "auto", fontSize: 6, color: "#78716c" }}>{[32, 28, 18, 22][i]}/min</span>
            </div>
          ))}
        </div>
      </div>
      {/* Passes table */}
      <div style={{ background: "#fff", borderRadius: 5, border: "1px solid #fde68a40", flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ display: "flex", padding: "3px 7px", background: "#fffbeb", fontSize: 6, color: "#78716c", fontWeight: 600, borderBottom: "1px solid #fef3c740" }}>
          <span style={{ width: 55 }}>PLATE</span>
          <span style={{ width: 20 }}>LANE</span>
          <span style={{ width: 35 }}>TIME</span>
          <span style={{ flex: 1 }}>TYPE</span>
          <span style={{ width: 30 }}>FEE</span>
          <span style={{ width: 30 }}>STATUS</span>
        </div>
        {[
          { plate: "NL-84-XBG", lane: "A1", time: "14:32:01", type: "Passenger", fee: "€4.20", s: "Paid" },
          { plate: "BE-1-ABC", lane: "A2", time: "14:31:58", type: "Passenger", fee: "€4.20", s: "Paid" },
          { plate: "DE-HH-59", lane: "B1", time: "14:31:55", type: "Commercial", fee: "€6.80", s: "Invoiced" },
          { plate: "NL-92-VDR", lane: "A1", time: "14:31:52", type: "Passenger", fee: "€4.20", s: "Paid" },
          { plate: "FR-AB-123", lane: "B2", time: "14:31:48", type: "Commercial", fee: "€6.80", s: "Invoiced" },
          { plate: "NL-33-KLP", lane: "A1", time: "14:31:44", type: "Passenger", fee: "€4.20", s: "Paid" },
          { plate: "DE-M-882", lane: "B1", time: "14:31:40", type: "Commercial", fee: "€6.80", s: "Paid" },
          { plate: "BE-2-XYZ", lane: "A2", time: "14:31:36", type: "Passenger", fee: "€4.20", s: "Paid" },
          { plate: "NL-55-RTG", lane: "A1", time: "14:31:32", type: "Passenger", fee: "€4.20", s: "Paid" },
          { plate: "DE-K-4410", lane: "B2", time: "14:31:28", type: "Commercial", fee: "€6.80", s: "Invoiced" },
          { plate: "FR-CD-456", lane: "A1", time: "14:31:24", type: "Passenger", fee: "€4.20", s: "Paid" },
          { plate: "NL-71-HJK", lane: "B1", time: "14:31:20", type: "Passenger", fee: "€4.20", s: "Paid" },
        ].map((p, i) => (
          <div key={i} style={{ display: "flex", padding: "2px 7px", fontSize: 7, borderTop: "1px solid #fef9ee", alignItems: "center" }}>
            <span style={{ width: 55, fontFamily: "monospace", fontWeight: 600, color: "#1c1917" }}>{p.plate}</span>
            <span style={{ width: 20, color: "#78716c" }}>{p.lane}</span>
            <span style={{ width: 35, color: "#a8a29e", fontSize: 6 }}>{p.time}</span>
            <span style={{ flex: 1, color: "#44403c" }}>{p.type}</span>
            <span style={{ width: 30, color: "#ea580c", fontWeight: 600 }}>{p.fee}</span>
            <span style={{ width: 30, fontSize: 6, fontWeight: 600, color: p.s === "Paid" ? "#16a34a" : "#2563eb" }}>{p.s}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export const Scene7RefToll: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardSpring = spring({ frame, fps, config: { damping: 200 }, delay: 5 });
  const mockSpring = spring({ frame, fps, config: { damping: 200 }, delay: 15 });
  const desktopSpring = spring({ frame, fps, config: { damping: 200 }, delay: 30 });
  const mobileSpring = spring({ frame, fps, config: { damping: 200 }, delay: 40 });

  return (
    <AbsoluteFill>
      <AgiledropNoiseBg variant="dark" />

      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          gap: 40,
          padding: "70px 90px 130px",
        }}
      >
        {/* Left: Text */}
        <div
          style={{
            flex: 48,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 32,
            opacity: cardSpring,
            transform: `translateX(${interpolate(cardSpring, [0, 1], [-20, 0])}px)`,
          }}
        >
          <div>
            <h2 style={{ fontFamily: headlineFont, fontSize: 52, fontWeight: 800, color: "#fff", margin: 0, lineHeight: 1.15 }}>
              24toll — real-time
              <br />
              toll processing
            </h2>
            <div style={{ fontFamily: bodyFont, fontSize: 26, color: "rgba(255,255,255,0.5)", marginTop: 12 }}>
              Netherlands — Transportation / Government
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {[
              "Major Rotterdam tunnel infrastructure",
              "Zero error tolerance payment processing",
              "Multilingual platform, international crossings",
              "Automated B2B invoicing system",
            ].map((item, i) => {
              const s = spring({ frame, fps, config: { damping: 200 }, delay: 18 + i * 8 });
              return (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 14, opacity: s }}>
                  <div style={{ width: 10, height: 10, borderRadius: 5, background: "#f97316", marginTop: 10, flexShrink: 0 }} />
                  <span style={{ fontFamily: bodyFont, fontSize: 26, color: "rgba(255,255,255,0.7)", lineHeight: 1.4 }}>{item}</span>
                </div>
              );
            })}
          </div>

          <div style={{ fontFamily: bodyFont, fontSize: 22, color: "rgba(255,255,255,0.4)" }}>6 months · 3 developers</div>
        </div>

        {/* Right: Layered screenshots */}
        <div
          style={{
            flex: 52,
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Admin dashboard (back, tilted) */}
          <div
            style={{
              position: "absolute",
              top: 10,
              right: 20,
              width: "88%",
              height: "70%",
              perspective: 1200,
              opacity: mockSpring,
              transform: `translateX(${interpolate(mockSpring, [0, 1], [30, 0])}px)`,
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                transform: `rotateY(-${6 + Math.sin(frame * 0.02) * 0.8}deg) rotateX(2deg) translateY(${Math.sin(frame * 0.025) * 3}px)`,
                borderRadius: 12,
                overflow: "hidden",
                boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
                display: "flex",
                flexDirection: "column",
                background: "#fff",
              }}
            >
              {/* Browser chrome */}
              <div style={{ height: 28, background: "#f0f0f0", borderBottom: "1px solid #d0d0d0", display: "flex", alignItems: "center", padding: "0 10px", gap: 5 }}>
                <div style={{ width: 8, height: 8, borderRadius: 4, background: "#ff5f57" }} />
                <div style={{ width: 8, height: 8, borderRadius: 4, background: "#febc2e" }} />
                <div style={{ width: 8, height: 8, borderRadius: 4, background: "#28c840" }} />
                <div style={{ flex: 1, marginLeft: 8, height: 16, background: "#fff", borderRadius: 4, border: "1px solid #d4d4d4", fontSize: 8, color: "#888", padding: "0 8px", display: "flex", alignItems: "center" }}>
                  24toll.nl/admin
                </div>
              </div>
              <div style={{ flex: 1, overflow: "hidden" }}>
                <TollAdminContent />
              </div>
            </div>
          </div>

          {/* Desktop public page (overlaying bottom-left) */}
          <div
            style={{
              position: "absolute",
              bottom: 30,
              left: 0,
              width: "65%",
              perspective: 1200,
              opacity: desktopSpring,
              transform: `translateY(${interpolate(desktopSpring, [0, 1], [20, 0]) + Math.sin(frame * 0.02 + 1) * 3}px)`,
              zIndex: 2,
            }}
          >
            <div
              style={{
                transform: `rotateY(-4deg) rotateX(3deg)`,
                borderRadius: 10,
                overflow: "hidden",
                boxShadow: "0 16px 48px rgba(0,0,0,0.3)",
                border: "2px solid rgba(255,255,255,0.1)",
              }}
            >
              <Img
                src={staticFile("Screenshot 2025-08-12 at 00.50.37.png")}
                style={{ width: "100%", display: "block" }}
              />
            </div>
          </div>

          {/* Mobile registration (overlaying bottom-right) */}
          <div
            style={{
              position: "absolute",
              bottom: 20,
              right: 30,
              width: "22%",
              perspective: 1200,
              opacity: mobileSpring,
              transform: `translateY(${interpolate(mobileSpring, [0, 1], [20, 0]) + Math.sin(frame * 0.03 + 2) * 4}px)`,
              zIndex: 3,
            }}
          >
            <div
              style={{
                transform: "rotateY(-3deg)",
                borderRadius: 14,
                overflow: "hidden",
                boxShadow: "0 16px 48px rgba(0,0,0,0.35)",
                border: "3px solid rgba(255,255,255,0.15)",
              }}
            >
              <Img
                src={staticFile("Screenshot 2025-08-12 at 00.55.14.png")}
                style={{ width: "100%", display: "block" }}
              />
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
