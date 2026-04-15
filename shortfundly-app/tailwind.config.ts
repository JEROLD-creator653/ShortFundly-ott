import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FB5A32",
        ink: "#070707",
        ember: "#FF8A3D",
        steel: "#88909E"
      },
      boxShadow: {
        glow: "0 0 40px rgba(251, 90, 50, 0.35)"
      },
      keyframes: {
        rise: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        pop: {
          "0%": { opacity: "0", transform: "scale(0.95) translateY(-10px)" },
          "100%": { opacity: "1", transform: "scale(1) translateY(0)" }
        }
      },
      animation: {
        rise: "rise 700ms ease-out both",
        pop: "pop 300ms cubic-bezier(0.34, 1.56, 0.64, 1) both"
      }
    }
  },
  plugins: []
};

export default config;
