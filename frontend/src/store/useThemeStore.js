import { create } from "zustand";

const DEFAULT_THEME = "light";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("chat-theme") || DEFAULT_THEME,
  setTheme: (theme) => {
    localStorage.setItem("chat-theme", theme);
    set({ theme });
  },
  toggleTheme: () => {
    set((state) => {
      const nextTheme = state.theme === "dark" ? "light" : "dark";
      localStorage.setItem("chat-theme", nextTheme);
      return { theme: nextTheme };
    });
  },
}));
