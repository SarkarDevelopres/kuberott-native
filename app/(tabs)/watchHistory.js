import { ImageBackground, StyleSheet, Text, View, ScrollView, Pressable, Alert } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import { LinearGradient } from "expo-linear-gradient";
import CustomNav from '../../components/CustomNav';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BASE_URL from "../../config";

const watchHistory = () => {
    const router = useRouter();
    const [watchedMovies, setWatchedMovies] = useState([]);

    const fetchWatchHistory = async () => {
        try {

            let token = await AsyncStorage.getItem("isloggedIn");
            if (!token) {
                Alert.alert(
                    "Invalid Access",
                    "You are not authorized to access this page",
                    [
                        { text: "OK", onPress: () => router.replace('/loginScreen') }
                    ]
                );

                return;
            }
            let req = await fetch(
                `${BASE_URL}/api/user/getWatchHistory`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            let res = await req.json();
            console.log(res);

            if (res.ok) {
                setWatchedMovies([...res.data]);
            }
            else {
                if (res.status == 403 || res.status == 401) {
                    Alert.alert(
                        "Token Expired!",
                        "Log-In token Expired, re-login",
                        [
                            { text: "Ok", onPress: () => router.replace('/loginScreen') }
                        ]
                    )
                }
                else {
                    Alert.alert(
                        "Failed to fetch Watch history",
                        `${res.message}`,
                        [
                            { text: "Ok", onPress: () => router.back() }
                        ]
                    )
                }
            }


        } catch (error) {
            console.log(error);
            
            Alert.alert(
                "Connection Error",
                "Reloading page....",
                [
                    { text: "OK", onPress: () => fetchWatchHistory() },
                ]
            );
        }
    }

    useEffect(() => {
        fetchWatchHistory();
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Watch History</Text>
            <ScrollView
                contentContainerStyle={{
                    paddingVertical: 20,
                    flexDirection: "row",
                    flexWrap: "wrap",
                }}
            >
                {watchedMovies.map((movie, i) => {

                    return (
                        <Pressable
                            key={i}
                            style={styles.card}
                            onPress={() => router.push({
                                pathname: "/detailedScreen",
                                params: { movies: JSON.stringify(movie) }
                            })}
                        >
                            <ImageBackground
                                source={{ uri: movie.image }}
                                style={styles.image}
                                imageStyle={{ resizeMode: "cover", borderRadius: 10 }}
                            >
                                <LinearGradient
                                    colors={["transparent", "#0100235f", "#010023cd"]}
                                    style={StyleSheet.absoluteFillObject}
                                />
                            </ImageBackground>
                            <View style={styles.details}>
                                <Text style={styles.movieName}>{movie.title}</Text>
                                <View style={[styles.progress, { width: `${(movie.watchedDuration/movie.duration)*100}%` }]}></View>
                            </View>
                        </Pressable>
                    )
                })
                }
            </ScrollView>
            <CustomNav page="history" />
        </View>
    )
}

export default watchHistory

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#010023ff",
        padding: 20,
        paddingRight: 5
    },
    heading: {
        fontSize: 22,
        color: "#fff",
        paddingBottom: 15
    },
    card: {
        borderRadius: 10,
        marginRight: 15,
        aspectRatio: 3 / 2,
        width: 400,
        marginBottom: 20,
        position: "relative",
    },
    overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "#01002316" },
    image: {
        flex: 1,
        position: "relative",
        borderRadius: 10,
    },
    details: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        flexDirection: "column",
    },
    movieName: {
        color: "white",
        fontSize: 20,
        paddingBottom: 10,
        marginHorizontal: 10
    },
    progress: {
        height: 5,
        width: "30%",
        borderBottomLeftRadius: 80,
        borderBottomRightRadius: 80,
        backgroundColor: "#c20000ff",
    }
})