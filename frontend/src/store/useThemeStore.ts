import { create } from "zustand";

const DEFAULT_THEME = "system";

interface ThemeState {
  theme: string;
  setTheme: (theme: string) => void;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  theme: localStorage.getItem("chat-theme") || DEFAULT_THEME,
  setTheme: (theme) => {
    localStorage.setItem("chat-theme", theme);
    set({ theme });
  },
  toggleTheme: () => {
    set((state) => {
      let nextTheme: string;
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
