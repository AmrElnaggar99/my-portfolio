import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./utils/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        merriweather: "var(--font-merriweather)",
        monasans: "var(--font-monasans)",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        gray: {
          50: "#F1F2F3",
          100: "#E4E5E7",
          200: "#C9CBCF",
          300: "#AEB1B7",
          400: "#9297A0",
          500: "#777D88",
          600: "#5D616A",
          700: "#45484F",
          800: "#2D2F34",
          900: "#161719",
          950: "#0C0C0E",
        },
        purple: {
          50: "#F1F1FE",
          100: "#E7E7FD",
          200: "#CBCBFB",
          300: "#B4B4F9",
          400: "#9797F6",
          500: "#8080F4",
          600: "#6464F2",
          700: "#1414EB",
          800: "#0D0DA0",
          900: "#070750",
          950: "#030326",
        },
      },
      animation: {
        loopText: "loopText 10s linear infinite",
      },
      keyframes: {
        loopText: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-100%)" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
