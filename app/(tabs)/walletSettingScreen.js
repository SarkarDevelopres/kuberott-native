import React, { useState } from "react";
import { View, Text, Switch, TouchableOpacity, StyleSheet, Dimensions, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
const { width } = Dimensions.get("window");

const WalletSettingsScreen = () => {

  const router = useRouter();
  const [autoTopUp, setAutoTopUp] = useState(false);
  const [transactionAlerts, setTransactionAlerts] = useState(true);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Image
            style={{ width: 30, height: 30 }}
            source={require("../../assets/back-icon.png")}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Wallet Settings</Text>
      </View>

      {/* Settings */}
      <View style={styles.settingCard}>
        <Text style={styles.settingText}>Auto Top-Up</Text>
        <Switch value={autoTopUp} onValueChange={() => setAutoTopUp(!autoTopUp)} thumbColor="#0A84FF" />
      </View>

      <View style={styles.settingCard}>
        <Text style={styles.settingText}>Transaction Alerts</Text>
        <Switch value={transactionAlerts} onValueChange={() => setTransactionAlerts(!transactionAlerts)} thumbColor="#0A84FF" />
      </View>

      <TouchableOpacity style={styles.settingCard} onPress={() => router.push("homeScreen")}>
        <Text style={styles.settingText}>Payment Methods</Text>
        <Ionicons name="chevron-forward" size={22} color="#999" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.settingCard}>
        <Text style={styles.settingText}>View Transaction History</Text>
        <Ionicons name="chevron-forward" size={22} color="#999" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
    paddingHorizontal: width * 0.1,
    justifyContent: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
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
});

export default WalletSettingsScreen;
