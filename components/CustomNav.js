import { Image, StyleSheet, Pressable, View, Text } from 'react-native'
import React from 'react'
import { useRouter } from "expo-router";
import { BlurView } from "expo-blur";

const CustomNav = ({ page }) => {
  const router = useRouter();
  return (
    <View style={{ position: "absolute", bottom: 10, zIndex: 10, borderRadius: 40, width: "40%", alignSelf: "center", alignItems: "center", elevation: 5, overflow: "hidden", backgroundColor: "rgba(0,0,0,0)" }}>
      <BlurView intensity={50} tint='dark' style={StyleSheet.absoluteFill} />
      <View style={{ flexDirection: "row", justifyContent: "space-between", flex: 1, backgroundColor: "rgba(229, 9, 20, 0.77)", paddingHorizontal: 30, paddingVertical: 15, width: "100%", borderRadius: 40, alignItems: "center" }}>
        <Pressable onPress={() => router.push("/ottScreen")}>
          <Image
            source={require("../assets/home-icon.png")}
            style={{ width: 40, height: 40, sizeMode: "contain", opacity: page == "home" ? 1 : 0.5 }}
          />
        </Pressable>
        <Pressable onPress={() => router.push("/searchScreen")}>
          <Image
            source={require("../assets/search-icon.png")}
            style={{ width: 40, height: 40, opacity: page == "search" ? 1 : 0.5 }}
          />
        </Pressable>
        <Pressable onPress={() => router.push("/watchHistory")}>
          <Image
            source={require("../assets/play-icon.png")}
            style={{ width: 40, height: 40, opacity: page == "history" ? 1 : 0.5 }}
          />
        </Pressable>
        <Pressable onPress={() => router.push("/homeScreen")} >
          <View style={{ width: 40, height: 40, borderRadius: 60, backgroundColor: "white", alignItems: 'center', justifyContent: 'center', opacity: 0.5 }}>
            <Text style={{ fontSize: 22, fontWeight: 700, color: "rgba(229, 9, 20, 1)" }}>K</Text>
          </View>
        </Pressable>
      </View>
    </View>
  )
}

export default CustomNav