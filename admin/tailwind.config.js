/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        "custom-black": "#373D41", // 自定义的蓝色
        "custom-red": "#ff5733", // 自定义的红色
      },
    },
  },
  plugins: [],
};
