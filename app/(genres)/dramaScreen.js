import React, { useEffect, useState } from "react";
import { View, Text, Image, FlatList, StyleSheet, SafeAreaView, Alert } from "react-native";
import { Dimensions } from "react-native";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import BASE_URL from "../../config";

const numColumns = 5;

const DramaMovieScreen = () => {
    const router = useRouter();
    const [comedyMovies, setComedyMovies] = useState([]);

    const fetchComedyMovies = async () => {
        try {

            let req = await fetch(`${BASE_URL}/api/movie/getMovieListByGenre?genre=drama`);
            let res = await req.json();

            if (res.ok) {
                setComedyMovies([...res.data]);
            }
            else {
                Alert.alert(
                    "Failed to romantic movies",
                    `${res.message}`,
                    [
                        { text: "Ok", onPress: () => router.back() }
                    ]
                )
            }

        } catch (error) {
            Alert.alert(
                "Connection Error",
                "Reloading page....",
                [
                    { text: "OK", onPress: () => fetchMovies() },
                ]
            );

        }
    }

    useEffect(() => {
        fetchComedyMovies();
    }, [])


    return (
        <SafeAreaView style={styles.container}>
            {/* Back Button */}
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                <Image
                    style={{ width: 30, height: 30 }}
                    source={require("../../assets/back-icon.png")}
                />
            </TouchableOpacity>

            <Text style={styles.title}>Drama Movies</Text>
            <FlatList
                data={comedyMovies}
                keyExtractor={(item) => item.id}
                numColumns={numColumns}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => router.push({
                        pathname: "/detailedScreen",
                        params: { movies: JSON.stringify(item) }
                    })}>
                        <View style={styles.card}>
                            <Image source={{ uri: item.image }} style={styles.image} />
                            <Text style={styles.movieTitle}>{item.title}</Text>
                            <Text style={styles.movieDetails}>⭐ {item.rating} | {item.year}</Text>
                            <Text style={styles.genre}>{item.genre}</Text>
                        </View>
                    </TouchableOpacity>
                )}
                contentContainerStyle={styles.listContainer}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#121212",
        padding: 10,
    },
    backButton: {
        position: "absolute",
        top: 10,
        left: 10,
        zIndex: 1,
        padding: 10,
    },
    title: {
        fontSize: 24,
        fontFamily: "Poppins-Bold",
        color: "#fff",
        textAlign: "center",
        marginVertical: 15,
    },
    listContainer: {
        alignItems: "flex-start", // Ensures last row items align left
    },
    card: {
        height: 320,
        width: Dimensions.get("window").width / numColumns - 20,
        backgroundColor: "#1e1e1e",
        margin: 5,
        borderRadius: 8,
        overflow: "hidden",
        alignItems: "center",
        padding: 10,
        alignSelf: "flex-start", // Ensures no empty space in the last row
    },
    image: {
        width: "100%",
        height: 200,
        borderRadius: 8,
    },
    movieTitle: {
        fontSize: 16,
        fontFamily: "Poppins-Bold",
        color: "#fff",
        marginTop: 5,
        textAlign: "center",

    },
    movieDetails: {
        fontSize: 14,
        color: "#aaa",
        fontFamily: "Poppins-Regular",
        marginTop: 2,
    },
    genre: {
        fontSize: 12,
        color: "#ccc",
        marginTop: 2,
        fontFamily: "Poppins-Regular",
    },
});
export default DramaMovieScreen;
