module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: { 
      colors: {
        bg: "#191510",
        text: "#F7F4F3",
        accent: "#8C9B56"
      }, 
      fontFamily :{ 
        sans: ["Work Sans","sans-serif"]
      } 
    }, 
  },
  plugins: [],
};
