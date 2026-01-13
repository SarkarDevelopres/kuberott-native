import React, { useState, useEffect } from "react";
import { View, Text, Switch, TouchableOpacity, StyleSheet, Dimensions, Image, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
const { width } = Dimensions.get("window");

const AccountSettingScreen = () => {

    const router = useRouter();
    const [loading, isLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");

    const fetchUserData = async() => {
        let userEmail = await AsyncStorage.getItem("user_email");
        let userPhone = await AsyncStorage.getItem("user_phone");

        setEmail(userEmail);
        setPhone(userPhone);
    }

    useEffect(() => {
      fetchUserData();
    }, [])
    

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
                <Text style={styles.title}>Account Settings</Text>
            </View>

            {/* Settings */}
            <View style={styles.formCard}>
                <View style={{ width: "100%", justifyContent: "space-between", flexDirection: "row", marginBottom: 25 }}>
                    <View style={styles.formElement}>
                        <Text style={styles.settingText}>Email</Text>
                        <TextInput style={styles.input} placeholder="Email..." value={email} onChangeText={setEmail} />
                    </View>
                    <View style={styles.formElement}>
                        <Text style={styles.settingText}>Phone</Text>
                        <TextInput style={styles.input} placeholder="Phone..." value={phone} onChangeText={setPhone} />
                    </View>
                    <View style={styles.formElement}>
                        <View style={styles.formElement}>
                            <Text style={styles.settingText}>Password</Text>
                            <TextInput style={styles.input} placeholder="Password..." value={password} onChangeText={setPassword} />
                        </View>
                    </View>
                </View>
                <View style={{ width: "100%", justifyContent: "flex-end", flexDirection: "row" }}>
                    <View style={{ width: 300, flexDirection:"row", alignItems: "center", justifyContent: "flex-start" }}>
                        <TouchableOpacity style={styles.changBtn}>
                            <Text style={{color:"white", fontSize: 20, fontWeight: 600}}>Change</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <TouchableOpacity style={styles.settingCard} onPress={() => router.push("PaymentMethodScreen")}>
                <Text style={styles.settingText}>Help</Text>
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
    formElement: {
        width: 320,
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
    formCard: {
        flexDirection: "column",
        backgroundColor: "#222",
        paddingVertical: 20,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 12,
        marginBottom: 15,
    },
    settingText: {
        fontSize: 20,
        color: "#FFF",
    },
    input: {
        fontSize: 20,
        color: "#FFF",
        padding: 10,
        backgroundColor: "rgba(200,200,200,0.5)",
        borderRadius: 10,
        marginTop: 10,
        width: "100%"
    },
    changBtn: {
        paddingHorizontal: 15,
        borderRadius: 10,
        fontSize: 20,
        color: "white",
        width: 300,
        height: 50,
        backgroundColor: "#072ecdff",
        alignItems: "center",
        justifyContent:"center",
    },
});

export default AccountSettingScreen;
