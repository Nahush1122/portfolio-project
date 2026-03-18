import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0f172a",
        mist: "#f8fafc",
        panel: "#ffffff",
        accent: "#0f766e",
        accentSoft: "#ccfbf1",
        gold: "#f59e0b"
      },
      boxShadow: {
        panel: "0 18px 60px rgba(15, 23, 42, 0.12)"
      },
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui", "sans-serif"]
      },
      backgroundImage: {
        mesh:
          "radial-gradient(circle at top left, rgba(20,184,166,0.16), transparent 35%), radial-gradient(circle at top right, rgba(245,158,11,0.14), transparent 28%), linear-gradient(135deg, #f8fafc 0%, #ecfeff 45%, #fff7ed 100%)"
      }
    }
  },
  plugins: []
};

export default config;
