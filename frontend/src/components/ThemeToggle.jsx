import { useThemeStore } from "../store/useThemeStore";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <button
      onClick={toggleTheme}
      className="size-9 flex items-center justify-center rounded-xl bg-slate-200/50 hover:bg-slate-200 dark:bg-slate-700/50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-all duration-200 active:scale-95"
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? (
        <Sun size={18} className="text-amber-500" />
      ) : (
        <Moon size={18} className="text-blue-500" />
      )}
    </button>
  );
};

export default ThemeToggle;
