import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        petrol: "#0F3D44",
        orange: "#E87722",
        turquoise: "#6BBFB5",
        soft: "#F7F7F6",
      },
      fontFamily: {
        arabic: ["var(--font-arabic)", "Arial", "sans-serif"],
        latin: ["var(--font-latin)", "Arial", "sans-serif"],
      },
    },
  },
};

export default config;
