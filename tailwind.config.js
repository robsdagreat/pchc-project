/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'custom-bg': '#252525',
        'nav-txt': '#1E6B46',
        'active': '#E48617',
        'active2': '#DA763F'
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}