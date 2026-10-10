import { useEffect, useMemo, useState } from "react";
import { ThemeContext } from "./ThemeContext";

const STORAGE_KEY = "hireflow-theme";
const getSystemTheme = () =>
  window.matchMedia?.("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";

const getInitialTheme = () => {
  try {
    const savedTheme = localStorage.getItem(STORAGE_KEY);
    if (savedTheme === "dark" || savedTheme === "light") return savedTheme;
  } catch {
    // Use the operating system preference when browser storage is blocked.
  }
  return getSystemTheme();
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    const isDark = theme === "dark";
    document.documentElement.classList.toggle("dark", isDark);
    document.documentElement.style.colorScheme = theme;

    const themeColor = document.querySelector('meta[name="theme-color"]');
    themeColor?.setAttribute("content", isDark ? "#0b1220" : "#f4f7fb");
  }, [theme]);

  useEffect(() => {
    const handleStorage = (event) => {
      if (event.key !== STORAGE_KEY) return;
      setTheme(
        event.newValue === "dark" || event.newValue === "light"
          ? event.newValue
          : getSystemTheme(),
      );
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY)) return undefined;
    } catch {
      return undefined;
    }

    const preference = window.matchMedia?.("(prefers-color-scheme: dark)");
    if (!preference) return undefined;
    const handlePreferenceChange = (event) =>
      setTheme(event.matches ? "dark" : "light");
    preference.addEventListener?.("change", handlePreferenceChange);
    return () =>
      preference.removeEventListener?.("change", handlePreferenceChange);
  }, []);

  const value = useMemo(
    () => ({
      theme,
      toggleTheme: () => {
        const next = theme === "dark" ? "light" : "dark";
        try {
          localStorage.setItem(STORAGE_KEY, next);
        } catch {
          // The theme still changes for the current page session.
        }
        setTheme(next);
      },
    }),
    [theme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;
