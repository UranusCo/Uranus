import { useThemeStore } from "../store/useThemeStore";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <button
      onClick={toggleTheme}
      className="btn btn-ghost btn-circle btn-sm"
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? (
        <Sun size={20} className="text-warning" />
      ) : (
        <Moon size={20} className="text-primary" />
      )}
    </button>
  );
};

export default ThemeToggle;
