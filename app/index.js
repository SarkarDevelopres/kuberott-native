
import React, { useState, useEffect } from "react";
import { View, Text, Button, Image, ActivityIndicator } from "react-native";
import { router } from "expo-router";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function indexPage() {
    useEffect(() => {
        console.log("All go0d !!");

        const check = async () => {

            const signedIn = await AsyncStorage.getItem("isSignedUp");

            if (signedIn) {
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