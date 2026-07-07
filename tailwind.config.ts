import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        aurora: {
          red: "#C8102E",
          ink: "#202124",
          graphite: "#4B5563",
          line: "#E5E7EB",
          soft: "#F7F7F8"
        }
      },
      boxShadow: {
        subtle: "0 18px 45px rgba(32, 33, 36, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
