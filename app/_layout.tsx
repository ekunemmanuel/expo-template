import { authClient } from "@/lib/auth-client";
import { ConvexBetterAuthProvider } from "@convex-dev/better-auth/react";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import '../global.css';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL as string, {
  unsavedChangesWarning: false,
});

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'Urbanist-Thin': require('../assets/fonts/Urbanist-Thin.ttf'),
    'Urbanist-ThinItalic': require('../assets/fonts/Urbanist-ThinItalic.ttf'),
    'Urbanist-ExtraLight': require('../assets/fonts/Urbanist-ExtraLight.ttf'),
    'Urbanist-ExtraLightItalic': require('../assets/fonts/Urbanist-ExtraLightItalic.ttf'),
    'Urbanist-Light': require('../assets/fonts/Urbanist-Light.ttf'),
    'Urbanist-LightItalic': require('../assets/fonts/Urbanist-LightItalic.ttf'),
    'Urbanist-Regular': require('../assets/fonts/Urbanist-Regular.ttf'),
    'Urbanist-Italic': require('../assets/fonts/Urbanist-Italic.ttf'),
    'Urbanist-Medium': require('../assets/fonts/Urbanist-Medium.ttf'),
    'Urbanist-MediumItalic': require('../assets/fonts/Urbanist-MediumItalic.ttf'),
    'Urbanist-SemiBold': require('../assets/fonts/Urbanist-SemiBold.ttf'),
    'Urbanist-SemiBoldItalic': require('../assets/fonts/Urbanist-SemiBoldItalic.ttf'),
    'Urbanist-Bold': require('../assets/fonts/Urbanist-Bold.ttf'),
    'Urbanist-BoldItalic': require('../assets/fonts/Urbanist-BoldItalic.ttf'),
    'Urbanist-ExtraBold': require('../assets/fonts/Urbanist-ExtraBold.ttf'),
    'Urbanist-ExtraBoldItalic': require('../assets/fonts/Urbanist-ExtraBoldItalic.ttf'),
    'Urbanist-Black': require('../assets/fonts/Urbanist-Black.ttf'),
    'Urbanist-BlackItalic': require('../assets/fonts/Urbanist-BlackItalic.ttf'),
  })

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null; // Or a loading component
  }

  return (
    <ConvexProvider client={convex}>
      <ConvexBetterAuthProvider client={convex} authClient={authClient}>
        <Stack screenOptions={{ headerShown: false }} />
        <StatusBar style="auto" />
      </ConvexBetterAuthProvider>
    </ConvexProvider>
  );
}
