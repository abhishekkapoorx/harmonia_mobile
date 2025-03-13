import { SessionProvider } from "@/providers/SessionCtx";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { ActivityIndicator, SafeAreaView, useColorScheme } from "react-native";
import "../global.css";

SplashScreen.preventAutoHideAsync();


export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "questrial": require("../assets/fonts/Questrial-Regular.ttf"),
    "anonymousPro": require("../assets/fonts/AnonymousPro-Regular.ttf"),
  });
  const colorScheme = useColorScheme();

  if (!fontsLoaded) {
    return <ActivityIndicator />;
  } else {
    SplashScreen.hideAsync();
  }
  return (
    <SessionProvider>
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="auth" />
        </Stack>
    </SessionProvider>
  );
}
