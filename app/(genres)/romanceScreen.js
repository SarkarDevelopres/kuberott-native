import React, { useEffect, useState } from "react";
import { View, Text, Image, FlatList, StyleSheet, SafeAreaView, Alert } from "react-native";
import { Dimensions } from "react-native";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import BASE_URL from "../../config";

const romanticMovies = [
    {
        id: 1,
        title: "The Notebook",
        image: "https://a.ltrbxd.com/resized/film-poster/4/5/6/6/7/45667-the-notebook-0-1000-0-1500-crop.jpg?v=d867e84f30",
        bio: "A young couple falls in love but is separated by fate and class differences.",
        year: 2004,
        genre: "Drama, Romance",
        rating: 7.8,
        duration: "123 min",
        language: "English"
    },
    {
        id: 2,
        title: "Pride & Prejudice",
        image: "https://a.ltrbxd.com/resized/sm/upload/nq/jo/26/tn/dAC0hkYmz5ZOCHURZCyj9isPMPd-0-1000-0-1500-crop.jpg?v=b3dac3ffd7",
        bio: "Elizabeth Bennet navigates love and societal expectations in 19th-century England.",
        year: 2005,
        genre: "Drama, Romance",
        rating: 8.1,
        duration: "129 min",
        language: "English"
    },
    {
        id: 3,
        title: "La La Land",
        image: "https://a.ltrbxd.com/resized/film-poster/2/4/0/3/4/4/240344-la-la-land-0-1000-0-1500-crop.jpg?v=053670ff84",
        bio: "An aspiring actress and a jazz musician fall in love while chasing their dreams.",
        year: 2016,
        genre: "Drama, Romance, Musical",
        rating: 8.0,
        duration: "128 min",
        language: "English"
    },
    {
        id: 4,
        title: "Titanic",
        image: "https://a.ltrbxd.com/resized/film-poster/5/1/5/2/4/51524-titanic-0-1000-0-1500-crop.jpg?v=7517ea94ce",
        bio: "A love story unfolds aboard the doomed Titanic ship.",
        year: 1997,
        genre: "Drama, Romance",
        rating: 7.9,
        duration: "195 min",
        language: "English, French, German, Swedish"
    },
    {
        id: 5,
        title: "Me Before You",
        image: "https://a.ltrbxd.com/resized/film-poster/2/2/3/3/9/3/223393-me-before-you-0-2000-0-3000-crop.jpg?v=710c5c01aa",
        bio: "A small-town girl becomes the caregiver of a paralyzed man and changes his life.",
        year: 2016,
        genre: "Drama, Romance",
        rating: 7.4,
        duration: "110 min",
        language: "English"
    },
    {
        id: 6,
        title: "Call Me by Your Name",
        image: "https://a.ltrbxd.com/resized/sm/upload/g9/9t/cc/7u/tcNniniS4rfqrLH0oORikJfnIwY-0-1000-0-1500-crop.jpg?v=f0c073f2b4",
        bio: "A summer romance blossoms between a teenager and a graduate student in Italy.",
        year: 2017,
        genre: "Drama, Romance",
        rating: 8.3,
        duration: "132 min",
        language: "English, Italian, French"
    },
    {
        id: 7,
        title: "500 Days of Summer",
        image: "https://a.ltrbxd.com/resized/film-poster/3/9/3/5/0/39350--500-days-of-summer-0-1000-0-1500-crop.jpg?v=05995ae0b3",
        bio: "A man reflects on his failed relationship with a woman who doesn't believe in love.",
        year: 2009,
        genre: "Comedy, Drama, Romance",
        rating: 7.7,
        duration: "95 min",
        language: "English"
    },
    {
        id: 8,
        title: "Before Sunrise",
        image: "https://a.ltrbxd.com/resized/film-poster/5/1/9/7/4/51974-before-sunrise-0-1000-0-1500-crop.jpg?v=006e8fedea",
        bio: "Two strangers meet on a train and spend a magical night walking through Vienna.",
        year: 1995,
        genre: "Drama, Romance",
        rating: 8.1,
        duration: "101 min",
        language: "English, German, French"
    },
    {
        id: 9,
        title: "A Walk to Remember",
        image: "https://a.ltrbxd.com/resized/film-poster/4/6/4/2/2/46422-a-walk-to-remember-0-1000-0-1500-crop.jpg?v=f2d95ce967",
        bio: "A rebellious teen falls for a preacher's daughter in an unexpected love story.",
        year: 2002,
        genre: "Drama, Romance",
        rating: 7.3,
        duration: "101 min",
        language: "English"
    },
    {
        id: 10,
        title: "The Fault in Our Stars",
        image: "https://a.ltrbxd.com/resized/sm/upload/py/4z/au/w9/yV44oLprmiMlJBIZzwGUyyPRT8H-0-1000-0-1500-crop.jpg?v=c3e2633ccc",
        bio: "Two teenagers with cancer embark on a heartwarming journey together.",
        year: 2014,
        genre: "Drama, Romance",
        rating: 7.7,
        duration: "126 min",
        language: "English"
    },
    {
        id: 11,
        title: "Notting Hill",
        image: "https://a.ltrbxd.com/resized/sm/upload/pa/ej/k3/ft/notting-hill-0-1000-0-1500-crop.jpg?v=a589bf6ce2",
        bio: "A bookshop owner falls in love with a famous actress.",
        year: 1999,
        genre: "Comedy, Drama, Romance",
        rating: 7.2,
        duration: "124 min",
        language: "English"
    },
    {
        id: 12,
        title: "Crazy Rich Asians",
        image: "https://a.ltrbxd.com/resized/film-poster/3/8/7/2/3/8/387238-crazy-rich-asians-0-2000-0-3000-crop.jpg?v=21695f4b1f",
        bio: "A woman discovers her boyfriend is from one of Asia's wealthiest families.",
        year: 2018,
        genre: "Comedy, Drama, Romance",
        rating: 6.9,
        duration: "120 min",
        language: "English, Mandarin, Cantonese"
    }
];

const numColumns = 5;

const RomanticMoviesScreen = () => {
    const router = useRouter();
    const [romanticMovies, setRomanticMovies] = useState([]);

    const fetchRomanticMovies = async () => {
        try {

            let req = await fetch(`${BASE_URL}/api/movie/getMovieListByGenre?genre=romance`);
            let res = await req.json();

            if (res.ok) {
                setRomanticMovies([...res.data]);
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
        fetchRomanticMovies();
    }, [])


    return (
        <SafeAreaView style={styles.container}>
            {/* Back Button */}
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>

            <Text style={styles.title}>Romantic Movies</Text>
            <FlatList
                data={romanticMovies}
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
export default RomanticMoviesScreen;
