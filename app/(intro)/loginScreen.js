import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Dimensions, Alert } from "react-native";
import BASE_URL from "../../config";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const { width, height } = Dimensions.get("window"); // Get screen dimensions
const isTablet = width > 768; // Check if the device is a tablet

const DEFAULT_EMAIL = "admin@kuber.com";
const DEFAULT_PASSWORD = "kuber@123";


const LoginScreen = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [visible, setVisible] = useState(false);

  const validate = async () => {

    let req = await fetch(`${BASE_URL}/api/auth/userLogin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password })
    });

    let res = await req.json();

    if (res.ok) {
      console.log("Token: ",res.token);
      
      await AsyncStorage.setItem("isloggedIn", res.token);
      await AsyncStorage.removeItem("isSignedUp");
      router.replace('/homeScreen');
    }
    else {
      Alert.alert(
        "Error logining in",
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
          <Text style={styles.title}>WELCOME BACK</Text>

          <TextInput
            placeholder="Email"
            style={styles.input}
            placeholderTextColor="#ccc"
            value={email}
            onChangeText={setEmail}
          />
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
          <TouchableOpacity style={styles.button} onPress={validate}>
            <Text style={styles.buttonText}>LOGIN</Text>
          </TouchableOpacity>
          <View style={{ flexDirection: "row", paddingTop: 10 }}>
            <Text style={{ color: "white", paddingRight:10 }}>Not Signed Up ?</Text>
            <Text
              style={{
                color: "white",
                textDecorationStyle: "solid",
                textDecorationColor: "white",
                textDecorationLine: "underline"
              }}
              onPress={() => router.push('/signUpScreen')}>
              Sign-Up
            </Text>
          </View>
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;

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