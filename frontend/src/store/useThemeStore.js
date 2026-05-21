import { create } from "zustand";

const DEFAULT_THEME = "system";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("chat-theme") || DEFAULT_THEME,
  setTheme: (theme) => {
    localStorage.setItem("chat-theme", theme);
    set({ theme });
  },
  toggleTheme: () => {
    set((state) => {
      let nextTheme;
      if (state.theme === "system") {
        nextTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "light" : "dark";
      } else {
        nextTheme = state.theme === "dark" ? "light" : "dark";
      }
      localStorage.setItem("chat-theme", nextTheme);
      return { theme: nextTheme };
    });
  },
}));
