/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        rubik: ["Rubik"],
      },
      colors: {
        "primary-color": "hsl(238, 40%, 52%)",
        "soft-red": "hsl(358, 79%, 66%)",
        "light-grayish-color": "hsl(239, 57%, 85%)",
        "pale-red": "hsl(357, 100%, 86%)",
        "dark-blue": "hsl(212, 24%, 26%)",
        "grayish-blue": "hsl(211, 10%, 45%)",
        "light-grey": "hsl(223, 19%, 93%)",
        "ultra-light-grey": "hsl(228, 33%, 97%)",
      },
    },
  },
  plugins: [],
};
