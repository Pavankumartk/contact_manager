'use client';

interface Props {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

export default function ThemeToggle({
  darkMode,
  setDarkMode,
}: Props) {
  return (
    <div className="theme-toggle">
      <button
        className="neu-button"
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>
    </div>
  );
}