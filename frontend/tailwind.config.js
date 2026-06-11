export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        forest: {
          50: "#ecfdf3",
          100: "#d1fae1",
          500: "#16a34a",
          600: "#15803d",
          700: "#166534",
          900: "#052e16"
        },
        ink: "#102015"
      },
      boxShadow: {
        glow: "0 16px 40px rgba(22, 163, 74, 0.18)"
      }
    }
  },
  plugins: []
};
