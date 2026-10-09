/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx}", "./components/**/*.{js,jsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        paper: "#EDE7DA",
        card: "#F6F2E7",
        ink: "#17181C",
        muted: "#4B4C50",
        line: "#D8D0BC",
        cobalt: "#2F4CFF",
        coral: "#FF6B4A",
      },
    },
  },
  plugins: [],
};
