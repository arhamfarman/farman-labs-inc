import type { Config } from "tailwindcss";

// Colours replace Tailwind's palette entirely: there is no `blue`, so `bg-blue-600` generates no CSS.
export default {
  content: ["./app/**/*.{ts,tsx,mdx}", "./components/**/*.{ts,tsx}", "./content/**/*.mdx"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#FFFFFF",
      orange: { DEFAULT: "#F58634", hover: "#E0741F", ink: "#C2410C" },
      purple: { DEFAULT: "#6666CC", ink: "#4F4FB8" },
      green: { DEFAULT: "#99CC99", ink: "#3F7D3F" },
      navy: { DEFAULT: "#111827", grid: "#1B2230", cell: "#2A3344" },
      mist: "#D1D5DB",
      slate: "#9CA3AF",
      steel: "#6B7280",
      hairline: "#E5E7EB",
      paper: "#F9FAFB",
      error: "#B91C1C",
    },
    fontFamily: {
      sans: ["var(--font-jakarta)", "Segoe UI", "Arial", "sans-serif"],
      mono: ["var(--font-jetbrains)", "Consolas", "monospace"],
    },
    extend: {
      fontSize: {
        h1: ["4rem", { lineHeight: "1.02", letterSpacing: "-0.01em", fontWeight: "800" }],
        h2: ["2.5rem", { lineHeight: "1.05", letterSpacing: "-0.01em", fontWeight: "800" }],
        h3: ["1.5rem", { lineHeight: "1.2", fontWeight: "700" }],
        lead: ["1.25rem", { lineHeight: "1.6" }],
        body: ["1.0625rem", { lineHeight: "1.6" }],
        label: ["0.75rem", { lineHeight: "1.3", letterSpacing: "0.08em" }],
      },
      borderRadius: { cell: "10px", btn: "8px" },
      maxWidth: { content: "1200px", prose: "68ch" },
      backgroundImage: {
        "navy-grid":
          "linear-gradient(#1B2230 1px, transparent 1px), linear-gradient(90deg, #1B2230 1px, transparent 1px)",
      },
      backgroundSize: { grid: "28px 28px" },
      keyframes: {
        "fade-up": { from: { opacity: "0", transform: "translateY(12px)" }, to: { opacity: "1", transform: "none" } },
        "rail-draw": { from: { transform: "scaleY(0)" }, to: { transform: "scaleY(1)" } },
        dash: { to: { strokeDashoffset: "-16" } },
      },
      animation: {
        "fade-up": "fade-up 500ms ease-out both",
        "rail-draw": "rail-draw 400ms ease-out both",
        dash: "dash 1.2s linear infinite",
      },
    },
  },
} satisfies Config;
