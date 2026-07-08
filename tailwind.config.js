/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // 霞鶩文楷 TC：水墨溫潤手寫楷體（全站主字型）
        sans: ['"LXGW WenKai TC"', '"Zen Maru Gothic"', '"Noto Sans TC"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
