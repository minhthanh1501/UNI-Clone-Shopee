/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#EE4D2D",
      },
      backgroundColor: {
        primary: "#EE4D2D",
      },
      backgroundImage: {
        cart: "url('./Asset/images/cart.jpg')",
      },
      scale: {
        1.03: "1.03",
      },
    },
  },
  plugins: [],
};
