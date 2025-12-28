import React, { useState } from "react";
import { View, ScrollView, StyleSheet, Text, Switch, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

const HomeScreen = () => {
  const router = useRouter();
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((prev) => !prev);

  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <Text style={styles.textHead}>MY KUBER</Text>
      </View>
      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        <View style={styles.bodySecond}>
          <View style={styles.displayFlexrow}>
            <Image source={require("../../assets/profile-icon.png")} style={{ height: 25, width: 25 }} />
            <Text style={styles.text}>Hii Pratap</Text>
          </View>
          <View style={styles.displayFlexrow}>
            <Text style={styles.text}>Banner Ads</Text>
            <Switch trackColor={{ false: 'white', true: 'white' }} thumbColor={isEnabled ? '#00D600' : '#f4f3f4'} ios_backgroundColor="#3e3e3e" onValueChange={toggleSwitch} value={isEnabled} />
          </View>
        </View>

        <View style={styles.displayFlexcolumn}>
          <View style={{ padding: 10 }}>
            <Text style={styles.myKuber}>Kuber Apps</Text>
          </View>
          <TouchableOpacity onPress={() => router.push('/ottScreen')}>
          <Image source={require("../../assets/Ott-logo.png")} style={{ height: 80, width: 80, borderRadius: 10, marginTop: 10, marginLeft: 10, marginBottom: 10 }}  />
          </TouchableOpacity>
        </View>

        <View style={styles.displayFlexcolumn}>
          <View style={{ padding: 10 }}>
            <Text style={styles.myKuber}>Wallet</Text>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginLeft: 10, marginRight: 10 }}>
            <View style={styles.walletCard}>
              <Text style={[styles.walletText, { paddingTop: 20, paddingLeft: 20, letterSpacing: 2 }]}>Total Earning</Text>
              <Text style={[styles.walletText, { paddingLeft: 20, color: "#00D600", fontSize: 45, fontFamily: "Poppins-Regular" }]}>₹500</Text>
            </View>
            <View style={styles.walletCard}>
              <Text style={[styles.walletText, { paddingTop: 20, paddingLeft: 20, letterSpacing: 2 }]}>Total Withdrawal</Text>
              <Text style={[styles.walletText, { paddingLeft: 20, color: "#D62000", fontSize: 45, fontFamily: "Poppins-Regular" }]}>₹500</Text>
            </View>
            <View style={styles.walletCard}>
              <Text style={[styles.walletText, { paddingTop: 20, paddingLeft: 20, letterSpacing: 2 }]}>Wallet Savings</Text>
              <Text style={[styles.walletText, { paddingLeft: 20, color: "#00D600", fontSize: 45, fontFamily: "Poppins-Regular" }]}>₹500</Text>
            </View>
          </View>
        </View>


        <View style={[styles.displayFlexcolumn, {paddingTop: 20, paddingBottom: 30,}]}>
          <View style={{ padding: 10 }}>
            <Text style={styles.myKuber}>Settings</Text>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginLeft: 10, marginRight: 10 }}>
            <TouchableOpacity onPress={() => router.push('./accountSettingScreen')}>
            <View style={[styles.walletCard, {justifyContent: "center", alignItems: "center"}]}>
              <Image source={require("../../assets/profile-icon.png")} style={{ height: 50, width: 50 }} />
              <Text style={[styles.walletText, { paddingTop: 20, letterSpacing: 2 }]}>Account Setting</Text>
            </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/walletSettingScreen')}>
            <View style={[styles.walletCard, {justifyContent: "center", alignItems: "center"}]}>
              <Image source={require("../../assets/wallet.png")} style={{ height: 50, width: 50 }} />
              <Text style={[styles.walletText, { paddingTop: 20, letterSpacing: 2 }]}>Wallet Setting</Text>
            </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/appSettingScreen')}>
              <View style={[styles.walletCard, { justifyContent: "center", alignItems: "center" }]}>
                <Image source={require("../../assets/setting.png")} style={{ height: 50, width: 50 }} />
                <Text style={[styles.walletText, { paddingTop: 20, letterSpacing: 2 }]}>App Setting</Text>
              </View>
            </TouchableOpacity>

          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: "#FF8400"
  },
  body: {
    flex: 1,
    width: "100%",
    backgroundColor: "#010023ff",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 10,
    paddingTop: 20,
    paddingHorizontal: 50
  },
  walletText: {
    fontFamily: "Poppins-Regular",
    fontSize: 20,
    color: "white"
  },
  bodySecond: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  displayFlexrow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  displayFlexcolumn: {
    flexDirection: "column",
  },
  head: {
    flex: 0.15,
    justifyContent: "center",
    alignItems: "center"
  },
  textHead: {
    color: "#010023ff",
    fontFamily: "Poppins-Regular",
    fontSize: 40,
    fontWeight: "bold",
    letterSpacing: 4,
    // color: "white",
  },
  text: {
    fontFamily: "Poppins-Regular",
    color: "white",
  },
  myKuber: {
    fontFamily: "Poppins-Regular",
    fontSize: 20,
    color: "white"
  },
  walletCard: {
    backgroundColor: "#32313b5f",
    height: 140,
    width: 320,
    borderRadius: 10
  }
});

export default HomeScreen;
