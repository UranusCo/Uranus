/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3b82f6',
          dark: '#2563eb',
        },
        surface: {
          DEFAULT: '#ffffff',
          dark: '#0f172a',
        },
        background: {
          DEFAULT: '#f8fafc',
          dark: '#020617',
        },
        border: {
          DEFAULT: '#e2e8f0',
          dark: '#1e293b',
        },
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
      }
    },
  },
  plugins: [],
};
