
import React, { useState, useEffect } from "react";
import { View, Text, Button, Image, ActivityIndicator } from "react-native";
import * as NavigationBar from "expo-navigation-bar";
import { useRouter } from "expo-router";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function IndexPage() {
    const router = useRouter();

    useEffect(() => {

        NavigationBar.setVisibilityAsync("hidden").catch(() => { });
        const check = async () => {

            const signedIn = await AsyncStorage.getItem("isSignedUp");

            if (signedIn === "true") {
                router.replace("/loginScreen");
            }
            else {

                const loggedIn = await AsyncStorage.getItem("isloggedIn");

                if (loggedIn) {
                    router.replace("/homeScreen");
                }
                else {
                    router.replace("/loginScreen");
                }
            }
        };
        check();
    }, []);

    return (
        <Animated.View
            entering={FadeIn.duration(300)}
            exiting={FadeOut.duration(200)}
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#111" }}>
                <ActivityIndicator size="large" color="#0A84FF" />
            </View>
        </Animated.View>
    )
}