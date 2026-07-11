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
          red: "#B80F2C",
          ink: "#15191D",
          graphite: "#5F6B72",
          line: "#DEDCD4",
          soft: "#F7F7F5"
        }
      },
      boxShadow: {
        subtle: "0 1px 2px rgba(16, 24, 40, 0.04)",
        premium: "0 14px 34px rgba(16, 24, 40, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
