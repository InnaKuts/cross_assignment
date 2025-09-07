import { DefaultTheme, DarkTheme } from '@react-navigation/native';
import { useEffect, useMemo } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
} from '@expo-google-fonts/inter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import 'react-native-gesture-handler';

import Navigation from './navigation';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { ds } from './constants';

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

function AppContent() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
  });

  const { colors } = useTheme();
  const navigationTheme = useMemo(
    () => (colors === ds.theme.dark.colors ? DarkTheme : DefaultTheme),
    [colors]
  );

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return <Navigation theme={navigationTheme} />;
}
