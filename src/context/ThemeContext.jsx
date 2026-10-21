import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const ThemeContext = createContext(null);

const read = () => {
  try {
    return localStorage.getItem("gs-theme") || "dark";
  } catch {
    return "dark";
  }
};

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(read);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = theme;
    root.dataset.bsTheme = theme; // lets Bootstrap components follow the theme
    try {
      localStorage.setItem("gs-theme", theme);
    } catch {
      alert("Try Again")
    }
  }, [theme]);

  const toggle = useCallback(
    () => setTheme((t) => (t === "dark" ? "light" : "dark")),
    [],
  );
  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
