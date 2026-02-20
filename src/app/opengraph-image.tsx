import { ImageResponse } from "next/og";

export const alt = "Modulr — Robot Operation, at Scale.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const SITE_ORIGIN = process.env.NEXT_PUBLIC_SITE_ORIGIN ?? "https://www.modulr.cloud";
const ACCENT = "#f2b400";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#050506",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Dark background with subtle yellow/gold glow (circuit-board feel) */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 80% 50% at 50% 20%, rgba(242, 180, 0, 0.18), transparent 55%), radial-gradient(ellipse 60% 40% at 80% 70%, rgba(255, 255, 255, 0.06), transparent 50%), linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.6), rgba(0,0,0,0.92))",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 48,
          }}
        >
          {/* Logo */}
          <img
            src={`${SITE_ORIGIN}/Modulr_logo.png`}
            alt=""
            width={96}
            height={96}
            style={{ objectFit: "contain", marginBottom: 32 }}
          />
          {/* Headline: "Robot Operation, at Scale." — Scale. in yellow */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              marginBottom: 20,
            }}
          >
            <span
              style={{
                fontSize: 52,
                fontWeight: 600,
                color: "white",
                letterSpacing: "-0.02em",
                lineHeight: 1.05,
              }}
            >
              Robot Operation,{" "}
              <span style={{ color: ACCENT }}>at Scale.</span>
            </span>
          </div>
          {/* Subtitle */}
          <p
            style={{
              fontSize: 20,
              color: "rgba(255, 255, 255, 0.65)",
              maxWidth: 560,
              textAlign: "center",
              lineHeight: 1.5,
              marginBottom: 36,
            }}
          >
            A real-time robot operation platform built for enterprise performance
            and an open network economy—connecting robots, AI, data, and
            compute.
          </p>
          {/* Buttons: Launch App (solid yellow), Book a Demo (outlined) */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 16,
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                paddingLeft: 24,
                paddingRight: 24,
                paddingTop: 12,
                paddingBottom: 12,
                borderRadius: 9999,
                backgroundColor: ACCENT,
                color: "#130b00",
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              Launch App
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                paddingLeft: 24,
                paddingRight: 24,
                paddingTop: 12,
                paddingBottom: 12,
                borderRadius: 9999,
                border: `2px solid ${ACCENT}`,
                backgroundColor: "rgba(0, 0, 0, 0.3)",
                color: "white",
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              Book a Demo
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
