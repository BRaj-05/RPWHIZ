/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
       animation: {
           marquee: "marquee 20s linear infinite",
  },
  keyframes: {
      marquee: {
      "0%": { transform: "translateX(0%)" },
      "100%": { transform: "translateX(-50%)" },
    },
  },
      colors: {
        primary: "#6366f1",
        accent: "#f43f5e",
        dark: "#0f172a",
      },
    },
  },
  plugins: [],
};