module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "400px",
        sm: "450px",
        bp6: "520px",
        md: "600px",
        bp5: "700px",
        bp3: "900px",
        bp2: "1000px",
        bp1: "1200px",
        xl: "1300px",
      },
      colors: {
        primary: "#e23e3e",
      },
    },
  },
  plugins: [],
};
