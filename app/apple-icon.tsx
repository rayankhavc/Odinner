import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0B0B0D",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 104,
            fontWeight: 800,
            letterSpacing: -6,
            color: "#F5F3F0",
            display: "flex",
          }}
        >
          O<span style={{ color: "#F40000" }}>&apos;</span>
        </div>
      </div>
    ),
    size
  );
}
