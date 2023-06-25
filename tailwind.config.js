import formsPlugin from "@tailwindcss/forms";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#9dd81c",
        primaryHover: "#ebfffe",
        primaryText: "#0b1a21",
        secondary: "#dc124c",
        secondaryHover: "#880b30",
        text: "#ebfffe",
        bgfront: "#1D283A",
        bgback: "#0F1729",
      },
    },
  },
  plugins: [formsPlugin(),],
};
