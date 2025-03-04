import { Stack } from "expo-router";
import "../global.css";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { ActivityIndicator } from "react-native";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "questrial": require("../assets/fonts/Questrial-Regular.ttf"),
    "anonymousPro": require("../assets/fonts/AnonymousPro-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator />;
  }
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="auth" />
      </Stack>
      <StatusBar style="dark" />
    </>

  );
}
