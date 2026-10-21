import { useTheme } from "../context/ThemeContext.jsx";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const next = theme === "dark" ? "light" : "dark";
  return (
    <button
      className="gs-tog"
      onClick={toggle}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
      aria-pressed={theme === "light"}
    >
      {theme === "dark" ? (
        <svg className="gs-theme-mark gs-theme-mark-bat" viewBox="0 0 40 28" aria-hidden="true">
          <path d="M20 4c-3.2 3.2-6.3 4.2-10.2 2.1L2 2l2.1 9.1L1 9.8l3.1 9 6.1-2 4.9 4.3 4.9-4.3 4.9 4.3 4.9-4.3 6.1 2 3.1-9-3.1 1.3L38 2l-7.8 4.1C26.3 8.2 23.2 7.2 20 4Z" />
          <path className="gs-bat-eye" d="m15 13 3 1-2 2zm10 0-3 1 2 2z" />
        </svg>
      ) : (
        <svg className="gs-theme-mark gs-theme-mark-armor" viewBox="0 0 40 34" aria-hidden="true">
          <path className="gs-armor-shell" d="M20 2 34 7l-1.4 16.3L20 32 7.4 23.3 6 7z" />
          <path className="gs-armor-face" d="m12 10 8-3 8 3-1.2 8-6.8 7-6.8-7z" />
          <path className="gs-armor-eye" d="m12.2 13.2 5.2 1.4-1.1 1.7-5.2-1.2zm15.6 0-5.2 1.4 1.1 1.7 5.2-1.2z" />
        </svg>
      )}
    </button>
  );
}
