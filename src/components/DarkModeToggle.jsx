import React from "react";
import { useResume } from "../contexts/ResumeContext";

export const DarkModeToggle = () => {
  const { darkMode, toggleDarkMode } = useResume();

  return (
    <button
      onClick={toggleDarkMode}
      className="dark-mode-toggle"
      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {darkMode ? "☀️" : "🌙"}
    </button>
  );
};
