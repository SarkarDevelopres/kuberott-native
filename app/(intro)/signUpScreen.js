import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Dimensions, Alert } from "react-native";

const { width, height } = Dimensions.get("window"); // Get screen dimensions
const isTablet = width > 768; // Check if the device is a tablet

const DEFAULT_EMAIL = "admin@kuber.com";
const DEFAULT_PASSWORD = "kuber@123";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import BASE_URL from "../../config";


const SignUpScreen = () => {
    const router = useRouter();
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [visible, setVisible] = useState(false);
    const signUp = async () => {

        if (phone.length < 10 || phone.length > 10) {

            Alert.alert(
                "Invalid Number",
                "Enter 10 digit no.",
                [{ text: "OK" }]
            );

            return;

        }

        let req = await fetch(`${BASE_URL}/api/auth/userSignUp`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, phone, password })
        });

        let res = await req.json();

        if (res.ok) {
            await AsyncStorage.setItem("isSignedUp", "true")
            router.replace('/loginScreen');
        }
        else {
            Alert.alert(
                "Error Signing up",
                `${res.message}`,
                [{ text: "OK" }]
            );

            return;
        }

    };
    return (
        <View style={styles.container}>
            <View style={styles.loginContainer}>
                {/* Left Side - Image */}
                <View style={styles.imageContainer}>
                    <Image source={require("../../assets/logo.png")} style={styles.image} />
                </View>

                {/* Right Side - Login Form */}
                <View style={styles.formContainer}>
                    <Text style={styles.title}>WELCOME TO MY KUBER</Text>

                    <TextInput placeholder="Name" style={styles.input} placeholderTextColor="#ccc" value={name} onChangeText={setName} />
                    <TextInput placeholder="Phone" style={styles.input} placeholderTextColor="#ccc" keyboardType="numeric" value={phone} onChangeText={setPhone} />
                    <TextInput placeholder="Email" style={styles.input} placeholderTextColor="#ccc" value={email} onChangeText={setEmail} />
                    <View style={styles.passwordContainer}>
                        <TextInput
                            placeholder="Password"
                            style={[styles.input, { marginBottom: 0 }]}
                            secureTextEntry={!visible} placeholderTextColor="#ccc"
                            value={password}
                            onChangeText={setPassword}
                        />
                        <TouchableOpacity
                            onPress={() => setVisible(!visible)}
                            style={styles.icon}
                        >
                            <MaterialCommunityIcons
                                name={visible ? "eye-off-outline" : "eye-outline"}
                                size={22}
                                color="#555"
                            />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.button} onPress={signUp}>
                        <Text style={styles.buttonText}>Sign-Up</Text>
                    </TouchableOpacity>
                    <View style={{ flexDirection: "row", paddingTop: 10 }}>
                        <Text style={{ color: "white", paddingRight: 10 }} >Already Signed Up ?</Text>
                        <Text
                            style={{
                                color: "white",
                                textDecorationStyle: "solid",
                                textDecorationColor: "white",
                                textDecorationLine: "underline"
                            }}
                            onPress={() => router.push('/loginScreen')}>Log-In</Text>
                    </View>
                    {error ? <Text style={styles.errorText}>{error}</Text> : null}
                </View>
            </View>
        </View>
    );
};

export default SignUpScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#010023ff",
    },
    loginContainer: {
        flexDirection: "row",
        backgroundColor: "#2524389b",
        borderRadius: 15,
        padding: isTablet ? 40 : 20,
        alignItems: "center",
        width: isTablet ? width * 0.7 : width * 0.9,
    },
    imageContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        width: isTablet ? 250 : 180,
        height: isTablet ? 250 : 180,
        resizeMode: "contain",
    },
    formContainer: {
        flex: 1,
        justifyContent: "center",
    },
    title: {
        color: "white",
        fontSize: isTablet ? 28 : 24,
        marginBottom: 25,
        fontFamily: "Poppins-Bold",
    },
    passwordContainer: {
        flexDirection: "row",
        backgroundColor: "#333",
        alignItems: "center",
        justifyContent: "space-between",
        width: "90%",
        paddingRight: 14,
        marginBottom: 12,
        borderRadius: 8,
    },
    input: {
        fontFamily: "Poppins-Regular",
        width: "90%",
        padding: 14,
        backgroundColor: "#333",
        color: "white",
        marginBottom: 12,
        borderRadius: 8,
        fontSize: isTablet ? 18 : 16,
    },
    button: {
        backgroundColor: "#FF8400",
        padding: 14,
        width: "90%",
        alignItems: "center",
        borderRadius: 8,
    },
    buttonText: {
        fontFamily: "Poppins-Regular",
        color: "white",
        fontSize: isTablet ? 20 : 18,
    },
    errorText: {
        color: "red",
        fontSize: isTablet ? 18 : 16,
        marginBottom: 10,
        fontFamily: "Poppins-Regular",
    },
});