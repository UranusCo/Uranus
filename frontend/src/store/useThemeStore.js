import { create } from "zustand";

const DEFAULT_THEME = "system";
const DEFAULT_WALLPAPER = "default";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("chat-theme") || DEFAULT_THEME,
  wallpaper: localStorage.getItem("chat-wallpaper") || DEFAULT_WALLPAPER,
  setTheme: (theme) => {
    localStorage.setItem("chat-theme", theme);
    set({ theme });
  },
  setWallpaper: (wallpaper) => {
    localStorage.setItem("chat-wallpaper", wallpaper);
    set({ wallpaper });
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
