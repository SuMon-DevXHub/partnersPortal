import type { Config } from "tailwindcss";

export default <Partial<Config>>{
  darkMode: "class",
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "400px",
        lgx: "1200px",
        lgdx: "1280px",
        dx: "1366px",
        "2dx": "1440px",
        "3xl": "1920px",
      },
      backgroundImage: {
        "hero-pattern": "url('../images/Group 1000001625.png')",
      },
      fontSize: {
        "5.5xl": "56px",
      },
      colors: {
        heading: "#2F2F2F",
        // orange: "#FF7B00",
        primary: "#FDB21D",
        "light-white": "#F0F0F0",
        "black-1": "#374151",
        gray: {
          1100: "#C2C2C2",
        },
        ash: {
          default: "#393E46",
          1000: "#F1F2F6",
        },
        orange: {
          dark: "#E4801D",
        },
        green: {
          1100: "#8DB230",
        },
        purple: {
          midlight: "#7D80BD",
        },
      },
      spacing: {
        13: "3.125rem",
        17: "4.125rem",
        26: "6.25rem",
      },
    },
  },
  plugins: [],
};
