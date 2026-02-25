/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#6366f1",
        accent: "#f43f5e",
        dark: "#0f172a",
      },
    },
  },
  plugins: [],
};