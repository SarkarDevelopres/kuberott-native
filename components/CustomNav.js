import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from "expo-router";
import { BlurView } from "expo-blur";

const CustomNav = ({ page }) => {
  const router = useRouter();
  return (
    <View style={{ position: "absolute", bottom: 10, zIndex: 10, borderRadius: 40, width: "35%", alignSelf: "center", alignItems: "center", elevation: 5, overflow: "hidden", backgroundColor: "rgba(0,0,0,0)" }}>
      <BlurView intensity={50} tint='dark' style={StyleSheet.absoluteFill} />
      <View style={{ flexDirection: "row", justifyContent: "space-between", flex: 1, backgroundColor: "rgba(229, 9, 20, 0.77)", paddingHorizontal: 50, paddingVertical: 15, width: "100%", borderRadius: 40, alignItems: "center" }}>
        <FontAwesome
          name="home"
          size={40}
          onPress={() => router.push("/ottScreen")}
          color={`${page == "home" ? "white" : "#6900068d"}`}
        />
        <Ionicons
          name="search"
          size={40}
          onPress={() => router.push("/searchScreen")}
          color={`${page == "search" ? "white" : "#6900068d"}`}
          style={{}}
        />
        <FontAwesome
          name="play-circle"
          size={40}
          onPress={() => router.push("/watchHistory")}
          color={`${page == "history" ? "white" : "#6900068d"}`} />
      </View>
    </View>
  )
}

export default CustomNav

const styles = StyleSheet.create({})