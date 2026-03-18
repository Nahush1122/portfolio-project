import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0f172a",
        mist: "#e2e8f0",
        aqua: "#06b6d4",
        coral: "#f97316",
        lime: "#65a30d"
      },
      boxShadow: {
        panel: "0 24px 80px rgba(15, 23, 42, 0.12)"
      },
      backgroundImage: {
        grid: "linear-gradient(rgba(15, 23, 42, 0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(15, 23, 42, 0.06) 1px, transparent 1px)"
      }
    }
  },
  plugins: []
};

export default config;
