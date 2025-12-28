import React, { useEffect, useState } from "react";
import { Slot } from "expo-router";
import { Platform, Text, View } from "react-native";
import * as NavigationBar from "expo-navigation-bar";
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Font from "expo-font";

export default function Layout() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    if (Platform.OS === "android") {
      NavigationBar.setVisibilityAsync("hidden").catch(console.warn);
    }

    async function loadFonts() {
      await Font.loadAsync({
        Poppins_400Regular: require("../assets/fonts/Poppins-Regular.ttf"),
        Poppins_500Medium: require("../assets/fonts/Poppins-Medium.ttf"),
        Poppins_600SemiBold: require("../assets/fonts/Poppins-SemiBold.ttf"),
        Poppins_700Bold: require("../assets/fonts/Poppins-Bold.ttf"),
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return <View style={{ flex: 1, backgroundColor: "#000" }} />;
  }

  if (!Text.defaultProps) Text.defaultProps = {};
  Text.defaultProps.style = {
    ...(Text.defaultProps.style || {}),
    fontFamily: "Poppins_400Regular",
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#111" }}>
      <SafeAreaView style={{ flex: 1 }}>
        <Slot />
      </SafeAreaView>
    </View>
  );
}
