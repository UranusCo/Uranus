/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#00D4FF',
          dark: '#0080FF',
          foreground: '#ffffff',
        },
        surface: {
          DEFAULT: '#ffffff',
          dark: '#0f172a',
        },
        background: {
          DEFAULT: '#ffffff',
          dark: '#020617',
        },
        border: {
          DEFAULT: '#f1f5f9',
          dark: '#1e293b',
        },
        success: {
          DEFAULT: '#00FF88',
          foreground: '#ffffff',
        },
        warning: {
          DEFAULT: '#f59e0b',
          foreground: '#ffffff',
        },
        danger: {
          DEFAULT: '#ef4444',
          foreground: '#ffffff',
        },
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
        'elevated': '0 4px 12px rgba(0, 0, 0, 0.08)',
        'premium': '0 10px 15px -3px rgba(0, 212, 255, 0.2), 0 4px 6px -2px rgba(0, 128, 255, 0.1)',
      }
    },
  },
  plugins: [],
};
