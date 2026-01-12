import React, { useEffect, useState, useRef } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, ScrollView, StyleSheet, Alert } from "react-native";
// import Image from "react-native-fast-image";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from "expo-router";
import CustomNav from "../../components/CustomNav";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BASE_URL from "../../config";


// const topMovies = [
//     {
//         id: 1,
//         title: "Fantastic Mr. Fox",
//         image: "https://a.ltrbxd.com/resized/film-poster/4/6/3/4/4/46344-fantastic-mr-fox-0-1000-0-1500-crop.jpg?v=3a2a858065",
//         bio: "A stop-motion animated film by Wes Anderson about a clever fox who must outwit three mean farmers.",
//         year: 2009,
//         genre: "Animation, Adventure, Comedy",
//         rating: 7.9,
//         duration: "87 min",
//         language: "English",
//     },
//     {
//         id: 2,
//         title: "About Time",
//         image: "https://a.ltrbxd.com/resized/sm/upload/uo/th/yf/uz/zSuh8dGwqpsWR7ccvYbfxbSZ37o-0-1000-0-1500-crop.jpg?v=7276b6e978",
//         bio: "A romantic drama where a man discovers he can time travel and tries to improve his life and relationships.",
//         year: 2013,
//         genre: "Drama, Romance, Fantasy",
//         rating: 7.8,
//         duration: "123 min",
//         language: "English",
//     },
//     {
//         id: 3,
//         title: "Minari",
//         image: "https://a.ltrbxd.com/resized/film-poster/5/4/2/4/4/9/542449-minari-0-1000-0-1500-crop.jpg?v=29fbd9f379",
//         bio: "A heartfelt story of a Korean-American family starting a farm in rural Arkansas during the 1980s.",
//         year: 2020,
//         genre: "Drama",
//         rating: 7.4,
//         duration: "115 min",
//         language: "Korean, English",
//     },
//     {
//         id: 4,
//         title: "Call Me By Your Name",
//         image: "https://a.ltrbxd.com/resized/sm/upload/g9/9t/cc/7u/tcNniniS4rfqrLH0oORikJfnIwY-0-1000-0-1500-crop.jpg?v=f0c073f2b4",
//         bio: "A coming-of-age romance set in Italy about first love and self-discovery.",
//         year: 2017,
//         genre: "Drama, Romance",
//         rating: 7.9,
//         duration: "132 min",
//         language: "English, Italian, French",
//     },
//     {
//         id: 5,
//         title: "Babyteeth",
//         image: "https://a.ltrbxd.com/resized/film-poster/4/5/1/5/3/3/451533-babyteeth-0-1000-0-1500-crop.jpg?v=600cb86e0b",
//         bio: "A powerful drama about a teenage girl battling cancer and falling in love for the first time.",
//         year: 2019,
//         genre: "Drama",
//         rating: 7.1,
//         duration: "118 min",
//         language: "English",
//     },
//     {
//         id: 6,
//         title: "La La Land",
//         image: "https://a.ltrbxd.com/resized/film-poster/2/4/0/3/4/4/240344-la-la-land-0-1000-0-1500-crop.jpg?v=053670ff84",
//         bio: "A musical romance following an aspiring actress and a jazz musician as they chase their dreams in LA.",
//         year: 2016,
//         genre: "Musical, Romance, Drama",
//         rating: 8.0,
//         duration: "128 min",
//         language: "English",
//     },
//     {
//         id: 7,
//         title: "Her",
//         image: "https://a.ltrbxd.com/resized/sm/upload/au/nb/i6/lq/fsoTLnUXEUTNuVCBxAJMY0HPPd-0-1000-0-1500-crop.jpg?v=16789732be",
//         bio: "A lonely man develops a deep emotional connection with an advanced AI operating system.",
//         year: 2013,
//         genre: "Sci-Fi, Romance, Drama",
//         rating: 8.0,
//         duration: "126 min",
//         language: "English",
//     },
//     {
//         id: 8,
//         title: "Ratatouille",
//         image: "https://a.ltrbxd.com/resized/sm/upload/n8/rl/pc/se/jEiEU8viSb8CIIHcfprVr2V6XDz-0-1000-0-1500-crop.jpg?v=25e13045f0",
//         bio: "A heartwarming Pixar film about a rat who dreams of becoming a great chef in Paris.",
//         year: 2007,
//         genre: "Animation, Comedy, Family",
//         rating: 8.1,
//         duration: "111 min",
//         language: "English, French",
//     },
//     {
//         id: 9,
//         title: "Fantastic Mr. Fox",
//         image: "https://a.ltrbxd.com/resized/film-poster/4/6/3/4/4/46344-fantastic-mr-fox-0-1000-0-1500-crop.jpg?v=3a2a858065",
//         bio: "A stop-motion animated film by Wes Anderson about a clever fox who must outwit three mean farmers.",
//         year: 2009,
//         genre: "Animation, Adventure, Comedy",
//         rating: 7.9,
//         duration: "87 min",
//         language: "English",
//     },
//     {
//         id: 10,
//         title: "About Time",
//         image: "https://a.ltrbxd.com/resized/sm/upload/uo/th/yf/uz/zSuh8dGwqpsWR7ccvYbfxbSZ37o-0-1000-0-1500-crop.jpg?v=7276b6e978",
//         bio: "A romantic drama where a man discovers he can time travel and tries to improve his life and relationships.",
//         year: 2013,
//         genre: "Drama, Romance, Fantasy",
//         rating: 7.8,
//         duration: "123 min",
//         language: "English",
//     },
//     {
//         id: 11,
//         title: "Minari",
//         image: "https://a.ltrbxd.com/resized/film-poster/5/4/2/4/4/9/542449-minari-0-1000-0-1500-crop.jpg?v=29fbd9f379",
//         bio: "A heartfelt story of a Korean-American family starting a farm in rural Arkansas during the 1980s.",
//         year: 2020,
//         genre: "Drama",
//         rating: 7.4,
//         duration: "115 min",
//         language: "Korean, English",
//     },
//     {
//         id: 12,
//         title: "Call Me By Your Name",
//         image: "https://a.ltrbxd.com/resized/sm/upload/g9/9t/cc/7u/tcNniniS4rfqrLH0oORikJfnIwY-0-1000-0-1500-crop.jpg?v=f0c073f2b4",
//         bio: "A coming-of-age romance set in Italy about first love and self-discovery.",
//         year: 2017,
//         genre: "Drama, Romance",
//         rating: 7.9,
//         duration: "132 min",
//         language: "English, Italian, French",
//     },
// ];

// const bestMovies = [
//     {
//         id: 1,
//         title: "Titanic",
//         image: "https://a.ltrbxd.com/resized/film-poster/5/1/5/2/4/51524-titanic-0-1000-0-1500-crop.jpg?v=7517ea94ce",
//         bio: "A timeless romance set against the ill-fated maiden voyage of the Titanic.",
//         year: 1997,
//         genre: "Drama, Romance",
//         rating: 7.9,
//         duration: "195 min",
//         language: "English, French, German, Swedish"
//     },
//     {
//         id: 2,
//         title: "American Beauty",
//         image: "https://a.ltrbxd.com/resized/film-poster/2/7/0/3/2703-american-beauty-0-1000-0-1500-crop.jpg?v=30329dd752",
//         bio: "A middle-aged man experiences a midlife crisis and falls for his daughter's best friend.",
//         year: 1999,
//         genre: "Drama",
//         rating: 8.3,
//         duration: "122 min",
//         language: "English"
//     },
//     {
//         id: 3,
//         title: "Everything Everywhere All at Once",
//         image: "https://a.ltrbxd.com/resized/film-poster/4/7/4/4/7/4/474474-everything-everywhere-all-at-once-0-1000-0-1500-crop.jpg?v=281f1a041e",
//         bio: "A laundromat owner discovers she is the key to saving the multiverse.",
//         year: 2022,
//         genre: "Action, Comedy, Drama",
//         rating: 8.1,
//         duration: "139 min",
//         language: "English, Mandarin, Cantonese"
//     },
//     {
//         id: 4,
//         title: "Room",
//         image: "https://a.ltrbxd.com/resized/sm/upload/19/uq/1o/de/eqFckcHuFCT1FrzLOAvXBb4jHwq-0-1000-0-1500-crop.jpg?v=04679b709c",
//         bio: "A mother and her son escape captivity, discovering the outside world for the first time.",
//         year: 2015,
//         genre: "Drama, Thriller",
//         rating: 8.1,
//         duration: "118 min",
//         language: "English"
//     },
//     {
//         id: 5,
//         title: "Her",
//         image: "https://a.ltrbxd.com/resized/sm/upload/au/nb/i6/lq/fsoTLnUXEUTNuVCBxAJMY0HPPd-0-1000-0-1500-crop.jpg?v=16789732be",
//         bio: "A lonely writer develops an emotional relationship with an AI operating system.",
//         year: 2013,
//         genre: "Drama, Romance, Sci-Fi",
//         rating: 8.0,
//         duration: "126 min",
//         language: "English"
//     },
//     {
//         id: 6,
//         title: "Kill Bill",
//         image: "https://a.ltrbxd.com/resized/sm/upload/sw/w2/ep/v4/9O50TVszkz0dcP5g6Ej33UhR7vw-0-1000-0-1500-crop.jpg?v=5a65f5202f",
//         bio: "A former assassin seeks revenge on her ex-lover and his deadly squad.",
//         year: 2003,
//         genre: "Action, Crime, Thriller",
//         rating: 8.2,
//         duration: "111 min",
//         language: "English, Japanese, French"
//     },
//     {
//         id: 7,
//         title: "Fall",
//         image: "https://a.ltrbxd.com/resized/film-poster/8/8/7/6/2/1/887621-fall-0-1000-0-1500-crop.jpg?v=6bf31e9474",
//         bio: "Two friends climb an abandoned radio tower and find themselves stranded at the top.",
//         year: 2022,
//         genre: "Thriller, Adventure, Drama",
//         rating: 6.4,
//         duration: "107 min",
//         language: "English"
//     },
//     {
//         id: 8,
//         title: "Ratatouille",
//         image: "https://a.ltrbxd.com/resized/sm/upload/n8/rl/pc/se/jEiEU8viSb8CIIHcfprVr2V6XDz-0-1000-0-1500-crop.jpg?v=25e13045f0",
//         bio: "A heartwarming Pixar film about a rat who dreams of becoming a great chef in Paris.",
//         year: 2007,
//         genre: "Animation, Comedy, Family",
//         rating: 8.1,
//         duration: "111 min",
//         language: "English, French"
//     },
//     {
//         id: 9,
//         title: "The Martian",
//         image: "https://a.ltrbxd.com/resized/film-poster/2/1/1/5/1/1/211511-the-martian-0-1000-0-1500-crop.jpg?v=71ca0c832e",
//         bio: "A stranded astronaut fights to survive on Mars while awaiting rescue.",
//         year: 2015,
//         genre: "Sci-Fi, Adventure, Drama",
//         rating: 8.0,
//         duration: "144 min",
//         language: "English, Mandarin"
//     }
// ];



// const topSeries = [
//     {
//         id: 1, title: "Sex Education",
//         image: "https://serializd-tmdb-images.b-cdn.net/t/p/w500/bc3bmTdnoKcRuO9xdQKgAbB7Y9Z.jpg",
//         bio: "A coming-of-age comedy-drama about a socially awkward teenager and his sex therapist mother."
//     },
//     {
//         id: 2, title: "The Queens Gambit",
//         image: "https://serializd-tmdb-images.b-cdn.net/t/p/w500/zU0htwkhNvBQdVSIKB9s6hgVeFK.jpg",
//         bio: "A young chess prodigy rises to stardom while battling addiction in the 1960s."
//     },
//     {
//         id: 3, title: "The End of the F***ing World",
//         image: "https://serializd-tmdb-images.b-cdn.net/t/p/w500/vZQKQcB5n91c6tBofAVXq88Uuti.jpg",
//         bio: "A dark comedy about two teenage outsiders who embark on a road trip with violent consequences."
//     },
//     {
//         id: 4, title: "Loki",
//         image: "https://serializd-tmdb-images.b-cdn.net/t/p/w500/oJdVHUYrjdS2IqiNztVIP4GPB1p.jpg",
//         bio: "The God of Mischief embarks on a journey that alters the fate of the Marvel Universe."
//     },
//     {
//         id: 5, title: "You",
//         image: "https://serializd-tmdb-images.b-cdn.net/t/p/w500/vzgsobZmNxJyJ64ejTOUXvJ9UBn.jpg",
//         bio: "A dangerously charming bookstore manager obsesses over the women he falls for."
//     },
//     {
//         id: 6, title: "Succession",
//         image: "https://serializd-tmdb-images.b-cdn.net/t/p/w500/z0XiwdrCQ9yVIr4O0pxzaAYRxdW.jpg",
//         bio: "A media mogul's dysfunctional family fights for control of his business empire."
//     }
// ];

const genres = [
    {
        id: 1, title: "ROMANCE", screen: "romanceScreen"
    },
    {
        id: 2, title: "ACTION", screen: "actionScreen"
    },
    {
        id: 3, title: "DRAMA", screen: "dramaScreen"
    },
    {
        id: 4, title: "COMEDY", screen: "comedyScreen"
    },
    {
        id: 5, title: "HORROR", screen: "horrorScreen"
    },
];
const langs = [
    {
        id: 1, title: "Hindi", screen: "hindiScreen"
    },
    {
        id: 2, title: "English", screen: "englishScreen"
    },
    {
        id: 3, title: "Bengali", screen: "bengaliScreen"
    },
    {
        id: 4, title: "Telegu", screen: "teleguScreen"
    },
    {
        id: 5, title: "Tamil", screen: "tamilScreen"
    },
];

const OttScreen = () => {
    const router = useRouter();
    const [topMovies, setTopMovies] = useState([]);
    const [bestMovies, setBestMovies] = useState([]);
    const [topSeries, setTopSeries] = useState([]);
    const fetchMovies = async () => {

        let token = await AsyncStorage.getItem("isloggedIn");
        console.log("Token: ", token);
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

        let req = await fetch(`${BASE_URL}/api/movie/getMovieList`);
        let res = await req.json();

        if (res.ok) {
            setBestMovies([...res.bestMovieList]);
            setTopMovies([...res.newMovieList]);
            setTopSeries([...res.bestSeriesList]);
            return;
        }
        else {
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
        fetchMovies()
    }, [])

    return (
        <View style={{ flex: 1, position: "relative", backgroundColor: "#000" }}>
            <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 90 }}>
                {/* Header */}
                {/* Hero Section */}
                <View style={styles.hero}>
                    <Image
                        style={styles.heroImage}
                        source={{ uri: bestMovies?.[0]?.image }}
                    />


                    {/* Search Icon Positioned Absolutely */}
                    {/* Overlay Effect */}
                    <LinearGradient
                        colors={["transparent", "rgba(0, 0, 0, 0.7)", "rgba(0, 0, 0, 1)"]}
                        style={styles.overlay}
                    />

                    <View style={styles.heroText}>
                        <Text style={styles.movieTitle}>{bestMovies?.[0]?.title}</Text>
                        <Text style={styles.movieDesc}>{
                            bestMovies?.[0]?.bio
                        }</Text>
                        <TouchableOpacity style={styles.watchButton} onPress={() => router.push({
                            pathname: "/detailedScreen",
                            params: { movies: JSON.stringify(bestMovies?.[0]) }
                        })}>
                            <Text style={styles.watchText}>WATCH</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Movie Section */}
                <Text style={styles.sectionTitle}>New Releases</Text>
                {topMovies?.length > 0 && (
                    <FlatList
                        data={topMovies}
                        horizontal
                        keyExtractor={(item) => item._id.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => router.push({
                                pathname: "/detailedScreen",
                                params: { movies: JSON.stringify(item) }
                            })}>
                                <View style={styles.card}>
                                    <Image source={{ uri: item.image }} style={styles.image} />
                                    <Image style={styles.moviePoster} source={{ uri: item.image }} />
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                )}

                {/* Genre Section */}
                <Text style={styles.sectionTitle}>Genres</Text>
                <FlatList
                    data={genres}
                    style={{ width: "100%" }}
                    contentContainerStyle={{ flexDirection: "row", justifyContent: "space-between" }}
                    horizontal
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.genreButton} onPress={() => {
                            console.log(item.screen);
                            router.push(`/${item.screen}`);
                        }}>
                            <Text style={styles.genreText}>{item.title}</Text>
                        </TouchableOpacity>
                    )}
                />

                <Text style={styles.sectionTitle}>Best Movies</Text>
                {bestMovies?.length > 0 && (
                    <FlatList
                        data={bestMovies}
                        horizontal
                        keyExtractor={(item) => item._id.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => router.push({
                                pathname: "/detailedScreen",
                                params: { movies: JSON.stringify(item) }
                            })}>
                                <View style={styles.card}>
                                    <Image source={{ uri: item.image }} style={styles.image} />
                                    <Image style={styles.moviePoster} source={{ uri: item.image }} />
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                )}

                <Text style={styles.sectionTitle}>Languages</Text>
                <FlatList
                    data={langs}
                    style={{ width: "100%" }}
                    contentContainerStyle={{ flexDirection: "row", justifyContent: "space-between" }}
                    horizontal
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.genreButton} onPress={() => {
                            console.log(item.screen);
                            router.push(`/${item.screen}`);
                        }}>
                            <Text style={styles.genreText}>{item.title}</Text>
                        </TouchableOpacity>
                    )}
                />

                {/* Series Section */}
                {/* <Text style={styles.sectionTitle}>Top Series</Text>
                {
                    topSeries?.length > 0 && (
                        <FlatList
                            data={topSeries}
                            horizontal
                            keyExtractor={(item) => item._id.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => router.push({
                                    pathname: "/detailedScreen",
                                    params: { movies: JSON.stringify(item) }
                                })}>
                                    <View style={styles.card}>
                                        <Image source={{ uri: item.image }} style={styles.image} />
                                        <Image style={styles.moviePoster} source={{ uri: item.image }} />
                                    </View>
                                </TouchableOpacity>
                            )}
                        />
                    )
                } */}
            </ScrollView>
            <CustomNav page={"home"} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#010023ff"
    },
    header: {
        padding: 20,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    hero: {
        position: "relative",
        height: 500
    },
    heroImage: {
        width: "100%",
        height: "100%"
    },
    heroText: {
        position: "absolute",
        bottom: 20, left: 20,
        fontFamily: "Poppins-Regular"
    },
    movieTitle: {
        fontSize: 16,
        color: "#fff",
        fontFamily: "Poppins-Bold"
    },
    movieDesc: {
        fontSize: 14,
        color: "#bbb",
        marginTop: 5,
        marginBottom: 10,
        fontFamily: "Poppins-Regular",
        width: 400
    },
    watchButton: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#e50914",
        padding: 10,
        borderRadius: 10,
        width: 400
    },
    watchText: {
        color: "#fff",
        fontFamily: "Poppins-Bold"
    },
    sectionTitle: {
        color: "#fff",
        fontSize: 18,
        fontFamily: "Poppins-Bold",
        marginTop: 20,
        marginLeft: 10,
        width: "100%"
    },
    moviePoster: {
        width: 120,
        height: 180,
        borderRadius: 10,
        margin: 10
    },
    genreButton: {
        backgroundColor: "#e50914",
        padding: 5,
        borderRadius: 15,
        margin: 5,
        marginHorizontal: 15,
        height: 70,
        width: 220,
        justifyContent: "center",
        alignItems: "center"
    },
    genreText: {
        color: "#fff",
        fontFamily: "Poppins-Regular",
        letterSpacing: -1,
        fontSize: 20

    },
    searchIcon: {
        position: "absolute",
        top: 20, // Adjust top spacing
        right: 20, // Adjust right spacing
        backgroundColor: "rgba(0,0,0,0.5)", // Optional background for visibility
        padding: 8,
        borderRadius: 20,
        zIndex: 100,
    },
    overlay: {
        position: "absolute",
        width: "100%",
        height: "100%", // Only cover the bottom half
        bottom: 0, // Position at the bottom
    }


});

export default OttScreen;
