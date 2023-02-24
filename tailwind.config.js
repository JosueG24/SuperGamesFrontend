/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height:{
        "1/7": "14.2857%",
        "6/7": "85.7142%"
      },
      colors:{
        c_DarckBlue : "#0F1020",
        c_GrayBlue :  "#1F2137",
        c_LightGrayBlue :  "#273043",
        c_Pink :      "#FF7394",
        c_LightBlue : "#1C64F2",
        c_White :     "#ffffff"
      }
    },
  },
  plugins: [],
}