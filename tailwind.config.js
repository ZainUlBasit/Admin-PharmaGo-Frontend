/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      max1530: { max: "1530px" },
      max1400: { max: "1400px" },
      max1300: { max: "1300px" },
      max1240: { max: "1240px" },
      max1200: { max: "1200px" },
      max1120: { max: "1120px" },
      max1050: { max: "1050px" },
      max990: { max: "990px" },
      max950: { max: "950px" },
      max900: { max: "900px" },
      max820: { max: "820px" },
      max800: { max: "800px" },
      max780: { max: "780px" },
      max718: { max: "718px" },
      max750: { max: "750px" },
      max670: { max: "670px" },
      max600: { max: "600px" },
      max570: { max: "570px" },
      max540: { max: "540px" },
      max530: { max: "530px" },
      max500: { max: "500px" },
      max480: { max: "480px" },
      max420: { max: "420px" },
      max400: { max: "400px" },
      max365: { max: "365px" },
      max330: { max: "330px" },
      max300: { max: "300px" },
      max220: { max: "220px" },
      min990: { min: "990px" },
    },
    extend: {
      backgroundImage: {
        "custom-gradient": "linear-gradient(to right, #7a2949, #6e2a50)", // Add your gradient here
      },
      colors: {
        main: "#465462",
        sec: "#96ADC5",
        // sec: "#E82790",
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"], // Define the font family
        inter: ["Inter", "sans-serif"], // Add the Inter font
        quicksand: ["Quicksand", "sans-serif"], // Add the Inter font
      },
    },
  },
  plugins: [],
};
