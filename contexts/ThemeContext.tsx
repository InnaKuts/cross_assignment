import { createContext, useContext, useState, ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import { ds } from '~/constants';

export type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextType {
  mode: ThemeMode;
  colors: typeof ds.theme.light.colors | typeof ds.theme.dark.colors;
  setMode: (mode: ThemeMode) => void;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  defaultMode?: ThemeMode;
}

export function ThemeProvider({ children, defaultMode = 'system' }: ThemeProviderProps) {
  const systemColorScheme = useColorScheme();
  const [themeMode, setThemeMode] = useState<ThemeMode>(defaultMode);

  // Determine the actual color scheme to use
  const actualColorScheme = themeMode === 'system' ? systemColorScheme : themeMode;
  const isDark = actualColorScheme === 'dark';

  const toggle = () => {
    setThemeMode((prev) => {
      if (prev === 'light') return 'dark';
      if (prev === 'dark') return 'system';
      return 'light';
    });
  };

  const contextValue: ThemeContextType = {
    mode: themeMode,
    colors: isDark ? ds.theme.dark.colors : ds.theme.light.colors,
    setMode: setThemeMode,
    toggle,
  };

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

// Convenience hook for just the colors
export function useThemeColors() {
  const { colors } = useTheme();
  return colors;
}

// Convenience hook for theme mode controls
export function useThemeMode() {
  const { mode, setMode, toggle } = useTheme();
  return { mode, setMode, toggle };
}
