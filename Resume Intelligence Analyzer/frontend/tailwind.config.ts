import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0f172a",
        slateblue: "#1d4ed8",
        cyanflash: "#06b6d4",
        sand: "#f8fafc",
        glow: "#dbeafe",
      },
      boxShadow: {
        panel: "0 24px 80px rgba(15, 23, 42, 0.14)",
      },
      backgroundImage: {
        "hero-grid":
          "radial-gradient(circle at top left, rgba(56, 189, 248, 0.24), transparent 28%), radial-gradient(circle at bottom right, rgba(59, 130, 246, 0.18), transparent 26%)",
      },
      fontFamily: {
        sans: ["Segoe UI", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
