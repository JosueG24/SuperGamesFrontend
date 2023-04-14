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
        "2/7": "28.5714%",
        "3/7":"42.8571%",
        "4/7":"57.1428%",
        "5/7": "71.4285%",
        "6/7": "85.7142%",
        "1/10":"10%",
        "1/12":"08.3333%",
        "10/12":"83.3333%",
        "11/12":"91.6666%",
      },
      width:{
        "1/7": "14.2857%",
        "2/7": "28.5714%",
        "3/7":"42.8571%",
        "4/7":"57.1428%",
        "5/7": "71.4285%",
        "6/7": "85.7142%",
        "1/10":"10%",
        "1/12":"08.3333%",
        "10/12":"83.3333%",
        "11/12":"91.6666%",
      },
      colors:{
        c_DarckBlue : "#0F1020",
        c_GrayBlue :  "#1F2137",
        c_LightGrayBlue :  "#273043",
        c_Pink :      "#FF7394",
        c_LightBlue : "#1C64F2",
        c_White :     "#ffffff",
        c_Opaque: "rgba(0, 0, 0, 0.5)"
      }
    },
  },
  plugins: [],
}