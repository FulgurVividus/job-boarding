import type { Config } from "tailwindcss";
const { nextui } = require("@nextui-org/react");

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mainBlack: "#000000",
        mainWhite: "#FFFFFF",
        mainBlue: "#87CEEB",
        mainSalmon: "#FA8072",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
} satisfies Config;
