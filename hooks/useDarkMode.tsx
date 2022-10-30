import { useEffect, useState } from "react";

export type ThemeMode = "light" | "dark";

export const useDarkMode = () => {
  const [theme, setTheme] = useState<ThemeMode>("light");

  const setMode = (mode: ThemeMode) => {
    window.localStorage.setItem("theme", mode);
    setTheme(mode);
  };
  const toggle = () => {
    theme === "light" ? setMode("dark") : setMode("light");
  };
  useEffect(() => {
    const localTheme = window.localStorage.getItem("theme");
    localTheme && setTheme(localTheme as ThemeMode);
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(theme === "light" ? "dark" : "light");
    root.classList.add(theme);
  }, [theme]);

  return { theme, setMode, toggle };
};
