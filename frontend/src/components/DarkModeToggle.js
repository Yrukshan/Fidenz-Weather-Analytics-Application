import React from "react";

export default function DarkModeToggle({ darkMode, setDarkMode }) {
  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className={`relative w-16 h-9 rounded-full p-1 flex items-center transition-all duration-500 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-400 dark:focus:ring-offset-gray-900 ${
        darkMode 
          ? "bg-gradient-to-r from-indigo-600 to-purple-700 justify-end shadow-lg shadow-purple-500/30" 
          : "bg-gradient-to-r from-amber-300 to-orange-400 justify-start shadow-lg shadow-amber-300/40"
      }`}
      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      <div
        className={`w-7 h-7 rounded-full bg-white flex items-center justify-center text-lg shadow-md transform transition-all duration-500 ease-in-out ${
          darkMode ? "rotate-12" : "-rotate-12"
        }`}
      >
        <span className="select-none transition-transform duration-300">
          {darkMode ? "🌙" : "☀️"}
        </span>
      </div>
      <div className={`absolute inset-0 rounded-full transition-opacity duration-500 ${
        darkMode ? "opacity-30 bg-purple-400 blur-md" : "opacity-40 bg-amber-200 blur-md"
      }`} />
    </button>
  );
}