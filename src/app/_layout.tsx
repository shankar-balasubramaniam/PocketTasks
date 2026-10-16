import * as SplashScreen from "expo-splash-screen";

import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from "expo-router";
import { TaskContext, TaskProvider } from "@/contexts/TaskContext";
import { useContext, useEffect } from "react";

import { useColorScheme } from "react-native";

SplashScreen.preventAutoHideAsync();

const AppNavigator = () => {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="task/[id]" options={{ title: "Task Details" }} />
    </Stack>
  );
};

const SplashController = () => {
  const { isLoaded } = useContext(TaskContext);

  useEffect(() => {
    if (isLoaded) {
      SplashScreen.hideAsync();
    }
  }, [isLoaded]);

  return null;
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <TaskProvider>
        <SplashController />
        <AppNavigator />
      </TaskProvider>
    </ThemeProvider>
  );
}
