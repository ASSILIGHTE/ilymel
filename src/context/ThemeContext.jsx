import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isNightMode, setIsNightMode] = useState(() => {
    const saved = localStorage.getItem('theme_mode');
    return saved === 'night';
  });

  useEffect(() => {
    if (isNightMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme_mode', 'night');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme_mode', 'day');
    }
  }, [isNightMode]);

  const toggleTheme = () => {
    setIsNightMode(prev => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isNightMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
