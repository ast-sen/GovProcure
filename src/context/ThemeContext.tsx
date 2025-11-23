// src/context/ThemeContext.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface ThemeColors {
  primary: string;
  primaryHover: string;
  primaryLight: string;
  primaryText: string;
  primaryBorder: string;
}

export const themeColorMap: Record<string, ThemeColors> = {
  blue: {
    primary: 'bg-blue-600',
    primaryHover: 'hover:bg-blue-700',
    primaryLight: 'bg-blue-100',
    primaryText: 'text-blue-600',
    primaryBorder: 'border-blue-600'
  },
  purple: {
    primary: 'bg-purple-600',
    primaryHover: 'hover:bg-purple-700',
    primaryLight: 'bg-purple-100',
    primaryText: 'text-purple-600',
    primaryBorder: 'border-purple-600'
  },
  green: {
    primary: 'bg-green-600',
    primaryHover: 'hover:bg-green-700',
    primaryLight: 'bg-green-100',
    primaryText: 'text-green-600',
    primaryBorder: 'border-green-600'
  },
  red: {
    primary: 'bg-red-600',
    primaryHover: 'hover:bg-red-700',
    primaryLight: 'bg-red-100',
    primaryText: 'text-red-600',
    primaryBorder: 'border-red-600'
  },
  orange: {
    primary: 'bg-orange-600',
    primaryHover: 'hover:bg-orange-700',
    primaryLight: 'bg-orange-100',
    primaryText: 'text-orange-600',
    primaryBorder: 'border-orange-600'
  },
  teal: {
    primary: 'bg-teal-600',
    primaryHover: 'hover:bg-teal-700',
    primaryLight: 'bg-teal-100',
    primaryText: 'text-teal-600',
    primaryBorder: 'border-teal-600'
  }
};

interface ThemeContextType {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  theme: string;
  setTheme: (value: string) => void;
  themeColors: ThemeColors;
  // Common style classes
  styles: {
    bgMain: string;
    bgCard: string;
    bgSidebar: string;
    bgHeader: string;
    bgInput: string;
    textPrimary: string;
    textSecondary: string;
    textMuted: string;
    border: string;
    hoverBg: string;
  };
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [darkMode, setDarkMode] = useState(() => {
    try {
      const saved = localStorage.getItem('app_darkMode');
      return saved ? JSON.parse(saved) : false;
    } catch {
      return false;
    }
  });

  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('app_theme') || 'blue';
    } catch {
      return 'blue';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('app_darkMode', JSON.stringify(darkMode));
    } catch {}
  }, [darkMode]);

  useEffect(() => {
    try {
      localStorage.setItem('app_theme', theme);
    } catch {}
  }, [theme]);

  const themeColors = themeColorMap[theme] || themeColorMap.blue;

  // Common style classes based on dark mode
  const styles = {
    bgMain: darkMode ? 'bg-gray-950' : 'bg-gray-100',
    bgCard: darkMode ? 'bg-gray-800' : 'bg-white',
    bgSidebar: darkMode ? 'bg-gray-900' : 'bg-gray-900', // Sidebar stays dark
    bgHeader: darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200',
    bgInput: darkMode ? 'bg-gray-800 border-gray-600 text-gray-100' : 'bg-white border-gray-300 text-gray-800',
    textPrimary: darkMode ? 'text-gray-100' : 'text-gray-800',
    textSecondary: darkMode ? 'text-gray-400' : 'text-gray-600',
    textMuted: darkMode ? 'text-gray-500' : 'text-gray-400',
    border: darkMode ? 'border-gray-700' : 'border-gray-200',
    hoverBg: darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100',
  };

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode, theme, setTheme, themeColors, styles }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}