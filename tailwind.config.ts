import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        navy: "#0f2438",
        ink: "#1d2d44",
        teal: "#0f766e",
        mint: "#dff7ef",
        panel: "#f4f7fa"
      },
      boxShadow: {
        panel: "0 14px 30px rgba(15, 36, 56, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
