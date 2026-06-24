import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef6ff", 100: "#d9eaff", 200: "#bcdcff", 300: "#8ec5ff",
          400: "#58a4ff", 500: "#2f7fff", 600: "#175fed", 700: "#124bc0",
          800: "#143f97", 900: "#16387a",
        },
      },
      borderRadius: { xl: "1rem", "2xl": "1.5rem" },
      keyframes: {
        fadeUp: { "0%": { opacity: "0", transform: "translateY(12px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
      },
      animation: { fadeUp: "fadeUp .5s ease-out forwards" },
    },
  },
  plugins: [],
};
export default config;
