/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        // Cloud moves right and comes back
        floatRight: {
          "0%, 100%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(50px)" }, // moves 50px right
        },
        // Gentle up & down floating
        floatUpDown: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" }, // moves up 20px
        },
      },
      animation: {
        floatRight: "floatRight 12s ease-in-out infinite",
        floatUpDown: "floatUpDown 10s ease-in-out infinite",
      },
    },
  },
  plugins: [],
}
