import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#d4af37",
          foreground: "#1a1300"
        },
        secondary: {
          DEFAULT: "#b8860b",
          foreground: "#140c00"
        }
      },
      backgroundImage: {
        "hero-gradient": "linear-gradient(135deg, #fff7d6 0%, #ffffff 50%, #f5f5f5 100%)"
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "\"Segoe UI\"",
          "\"Malgun Gothic\"",
          "sans-serif"
        ]
      },
      boxShadow: {
        soft: "0 20px 45px -25px rgba(212, 175, 55, 0.65)"
      }
    }
  },
  plugins: []
};

export default config;
