import { ImageResponse } from "next/og";

export const alt = "Leadz Systems, AI-software & automatisering voor het MKB";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#111418",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Achtergrond gloed */}
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -120,
            width: 520,
            height: 520,
            borderRadius: "9999px",
            background: "radial-gradient(circle, rgba(249,115,22,0.45) 0%, rgba(249,115,22,0) 70%)",
            display: "flex",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "8px 18px",
              borderRadius: 9999,
              border: "1px solid rgba(249,115,22,0.4)",
              background: "rgba(249,115,22,0.12)",
              color: "#fdba74",
              fontSize: 24,
            }}
          >
            AI voor bouw &amp; installatietechniek
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 84, fontWeight: 800, color: "white", letterSpacing: -1 }}>
            Minder papierwerk,
          </div>
          <div style={{ display: "flex", fontSize: 84, fontWeight: 800, color: "#fb923c", letterSpacing: -1 }}>
            meer bouwen.
          </div>
          <div style={{ display: "flex", fontSize: 30, color: "rgba(255,255,255,0.7)", marginTop: 24, maxWidth: 820 }}>
            Slimme tools voor offertes, werkbonnen, planning en materiaal.
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", fontSize: 34, fontWeight: 700, color: "#fb923c" }}>Leadz Systems</div>
          <div style={{ display: "flex", fontSize: 26, color: "rgba(255,255,255,0.5)" }}>leadzsystems.nl</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
