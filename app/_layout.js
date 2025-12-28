import React, { useEffect } from "react";
import { Slot } from "expo-router";
import { Platform, Text, View } from "react-native";
import * as NavigationBar from "expo-navigation-bar";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from "expo-font";
import {
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
} from "@expo-google-fonts/poppins";

export default function Layout() {
    useEffect(() => {
        if (Platform.OS === "android") {
            NavigationBar.setVisibilityAsync("hidden").catch(console.warn);
        }
    }, []);
    const [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_500Medium,
        Poppins_600SemiBold,
        Poppins_700Bold,
    });

    if (!fontsLoaded) {
        return null;
    }
    if (!Text.defaultProps) Text.defaultProps = {};
    Text.defaultProps.style = {
        ...(Text.defaultProps.style || {}),
        fontFamily: "Poppins_400Regular",
    };
    return (
         <View style={{ flex:1, backgroundColor: "#111" }}>
                <SafeAreaView style={{ flex: 1 }}>
                    <Slot />
                </SafeAreaView>
            </View>
    );
}
