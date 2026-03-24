import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title =
    searchParams.get("title") ??
    "PetBorder — Australia Pet Travel Planner";
  const description =
    searchParams.get("description") ??
    "Personalised DAFF compliance timelines for bringing your pet to Australia.";

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "#0E2D42",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top bar: logo + tagline */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          {/* Paw icon — simple SVG inline */}
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <ellipse cx="20" cy="26" rx="10" ry="8" fill="#E67E22" />
            <circle cx="8" cy="18" r="4.5" fill="#E67E22" />
            <circle cx="15" cy="13" r="4" fill="#E67E22" />
            <circle cx="25" cy="13" r="4" fill="#E67E22" />
            <circle cx="32" cy="18" r="4.5" fill="#E67E22" />
          </svg>
          <span
            style={{
              color: "#FFFFFF",
              fontSize: "28px",
              fontWeight: 800,
              letterSpacing: "-0.5px",
            }}
          >
            PetBorder
          </span>
          <span
            style={{
              color: "rgba(255,255,255,0.4)",
              fontSize: "18px",
              marginLeft: "8px",
            }}
          >
            Pet Travel Compliance for Australia
          </span>
        </div>

        {/* Main content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          {/* Accent bar */}
          <div
            style={{
              width: "64px",
              height: "6px",
              borderRadius: "3px",
              background: "#E67E22",
            }}
          />

          {/* Title */}
          <div
            style={{
              color: "#FFFFFF",
              fontSize: title.length > 50 ? "44px" : "52px",
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: "-1px",
              maxWidth: "900px",
            }}
          >
            {title}
          </div>

          {/* Description */}
          <div
            style={{
              color: "rgba(255,255,255,0.65)",
              fontSize: "24px",
              lineHeight: 1.5,
              maxWidth: "820px",
            }}
          >
            {description}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(255,255,255,0.08)",
              borderRadius: "100px",
              padding: "10px 20px",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#E67E22",
              }}
            />
            <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "18px" }}>
              petborder.com
            </span>
          </div>

          <div
            style={{
              display: "flex",
              gap: "12px",
            }}
          >
            {["Free", "DAFF-verified", "2026"].map((tag) => (
              <div
                key={tag}
                style={{
                  background: "rgba(230,126,34,0.15)",
                  border: "1px solid rgba(230,126,34,0.3)",
                  borderRadius: "100px",
                  padding: "8px 16px",
                  color: "#E67E22",
                  fontSize: "16px",
                  fontWeight: 600,
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
