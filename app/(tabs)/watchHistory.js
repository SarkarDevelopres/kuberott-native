import { ImageBackground, StyleSheet, Text, View, ScrollView, Pressable, Alert } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import { LinearGradient } from "expo-linear-gradient";
import CustomNav from '../../components/CustomNav';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BASE_URL from "../../config";
// const watchedMovies = [
//     {
//         id: 1,
//         title: "Titanic",
//         image: "https://a.ltrbxd.com/resized/film-poster/5/1/5/2/4/51524-titanic-0-1000-0-1500-crop.jpg?v=7517ea94ce",
//         bio: "A timeless romance set against the ill-fated maiden voyage of the Titanic.",
//         year: 1997,
//         genre: "Drama, Romance",
//         rating: 7.9,
//         duration: "195 min",
//         language: "English, French, German, Swedish",
//         watched: 10.2
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
//         language: "English",
//         watched: 45.00
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
//         language: "English, Mandarin, Cantonese",
//         watched: 32.21
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
//         watched: 55.98
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
//         watched: 85.48
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
//         watched: 90.65
//     },
//     {
//         id: 33,
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
//         id: 23,
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
//         id: 19,
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
//         id: 42,
//         title: "Call Me By Your Name",
//         image: "https://a.ltrbxd.com/resized/sm/upload/g9/9t/cc/7u/tcNniniS4rfqrLH0oORikJfnIwY-0-1000-0-1500-crop.jpg?v=f0c073f2b4",
//         bio: "A coming-of-age romance set in Italy about first love and self-discovery.",
//         year: 2017,
//         genre: "Drama, Romance",
//         rating: 7.9,
//         duration: "132 min",
//         language: "English, Italian, French",
//     },
// ]

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