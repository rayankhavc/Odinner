import { ImageResponse } from "next/og";
import { rating } from "@/lib/data";

export const runtime = "edge";
export const alt =
  "O'dinner · Kebab, burger et tacos halal à Mareuil-sur-Lay-Dissais (85320)";
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
          padding: "68px 72px",
          backgroundColor: "#0B0B0D",
          color: "#F5F3F0",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 99,
              backgroundColor: "#F40000",
              display: "flex",
            }}
          />
          <div
            style={{
              fontSize: 22,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#9A9A9E",
            }}
          >
            Mareuil-sur-Lay-Dissais · Vendée
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 116,
              fontWeight: 800,
              letterSpacing: -5,
              lineHeight: 1,
              display: "flex",
            }}
          >
            O&apos;dinner
          </div>
          <div
            style={{
              marginTop: 18,
              fontSize: 46,
              fontWeight: 700,
              letterSpacing: -1.5,
              color: "#F40000",
              display: "flex",
            }}
          >
            Kebab · Burger · Tacos
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 28,
            fontSize: 26,
            color: "#9A9A9E",
          }}
        >
          <span style={{ display: "flex" }}>Halal</span>
          <span style={{ display: "flex", color: "#3A3A3E" }}>/</span>
          <span style={{ display: "flex" }}>Ouvert 7j/7</span>
          <span style={{ display: "flex", color: "#3A3A3E" }}>/</span>
          <span style={{ display: "flex" }}>
            {rating.value}/5 · {rating.count} avis Google
          </span>
        </div>
      </div>
    ),
    size
  );
}
