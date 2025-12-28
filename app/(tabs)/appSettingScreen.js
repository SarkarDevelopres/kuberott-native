import React, { useState } from "react";
import { View, Text, Switch, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get("window");

const AppSettingsScreen = () => {
    const router = useRouter();
  const [notifications, setNotifications] = useState(false);

  return (
    <View style={styles.container}>
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.title}>App Settings</Text>
      </View>

      <View style={styles.settingCard}>
        <Text style={styles.settingText}>Push Notifications</Text>
        <Switch value={notifications} onValueChange={() => setNotifications(!notifications)} thumbColor="#0A84FF" />
      </View>

      <View style={styles.settingCard}>
        <Text style={styles.settingText}>Language</Text>
        <TouchableOpacity style={styles.languageButton}>
          <Text style={styles.languageText}>English</Text>
          <Ionicons name="chevron-forward" size={22} color="#999" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
    paddingHorizontal: width * 0.1, // Adjust for tablet landscape
    justifyContent: "start",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
    marginTop: 30,
  },
  backButton: {
    padding: 10,
    marginRight: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFF",
  },
  settingCard: {
    flexDirection: "row",
    backgroundColor: "#222",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  settingText: {
    fontSize: 20,
    color: "#FFF",
  },
  languageButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  languageText: {
    fontSize: 18,
    color: "#0A84FF",
    marginRight: 10,
  },
});

export default AppSettingsScreen;
