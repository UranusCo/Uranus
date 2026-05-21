/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        'chat-bg': '#e5ded8',
        'chat-bg-dark': '#0b1520',
        'bubble-self': '#3b82f6',
        'bubble-self-dark': '#2563eb',
        'bubble-other': '#ffffff',
        'bubble-other-dark': '#1e293b',
      },
      spacing: {
        'safe-bottom': 'max(1rem, env(safe-area-inset-bottom, 1rem))',
      }
    },
  },
  plugins: [],
};
