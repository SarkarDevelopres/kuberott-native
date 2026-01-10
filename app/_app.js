import { useEffect, useState } from "react";
import { View } from "react-native";
import * as Font from "expo-font";

export default function App({ children }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function loadFonts() {
      try {
        await Font.loadAsync({
          "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
          "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
          "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
          "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
        });

        if (mounted) setReady(true);
      } catch (e) {
        console.warn("Font loading failed:", e);
        if (mounted) setReady(true); // never block app
      }
    }

    loadFonts();

    return () => {
      mounted = false;
    };
  }, []);

  if (!ready) {
    return <View style={{ flex: 1, backgroundColor: "#000" }} />;
  }

  return children;
}
