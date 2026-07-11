import { ImageResponse } from "next/og";

export const alt = "Leadz Systems, AI-software & automatisering voor het MKB";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Social share image in the new light/amber house style.
export default function OpengraphImage() {
  const ink = "#14171F";
  const amber = "#F5A524";
  const amberText = "#B4740E";
  const muted = "#525869";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#F4F5F7",
          padding: "72px 76px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Ambient amber glow, top-right */}
        <div
          style={{
            position: "absolute",
            top: -160,
            right: -120,
            width: 560,
            height: 560,
            borderRadius: "9999px",
            background: "radial-gradient(circle, rgba(245,165,36,0.34) 0%, rgba(245,165,36,0) 68%)",
            display: "flex",
          }}
        />

        {/* Eyebrow */}
        <div style={{ display: "flex" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              padding: "12px 22px",
              borderRadius: 9999,
              border: "1px solid rgba(16,20,32,0.12)",
              background: "rgba(255,255,255,0.7)",
              color: muted,
              fontSize: 26,
              letterSpacing: 1,
            }}
          >
            <div style={{ display: "flex", width: 12, height: 12, background: amber, transform: "rotate(45deg)", borderRadius: 2 }} />
            AI-software &amp; automatisering voor het MKB
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 96, fontWeight: 800, color: ink, letterSpacing: -3, lineHeight: 1.02 }}>
            Software die werkt.
          </div>
          <div style={{ display: "flex", fontSize: 96, fontWeight: 800, color: amberText, letterSpacing: -3, lineHeight: 1.02 }}>
            Processen die lopen.
          </div>
          <div style={{ display: "flex", fontSize: 32, color: muted, marginTop: 28, maxWidth: 900, lineHeight: 1.4 }}>
            Slimme software en automatiseringen op maat, zodat jij je op de groei van je bedrijf kunt richten.
          </div>
        </div>

        {/* Footer */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ display: "flex", width: 16, height: 16, background: amber, transform: "rotate(45deg)", borderRadius: 3 }} />
            <div style={{ display: "flex", fontSize: 38, fontWeight: 800, color: ink, letterSpacing: -0.5 }}>Leadz Systems</div>
          </div>
          <div style={{ display: "flex", fontSize: 28, color: muted }}>leadzsystems.nl</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
