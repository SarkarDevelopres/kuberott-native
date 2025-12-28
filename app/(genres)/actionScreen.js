import React, { useEffect, useState } from "react";
import { View, Text, Image, FlatList, StyleSheet, SafeAreaView } from "react-native";
import { Dimensions } from "react-native";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import BASE_URL from "../../config";
const actionMovies = [
  {
    id: 1,
    title: "Mad Max: Fury Road",
    image: "https://a.ltrbxd.com/resized/film-poster/6/2/7/8/0/62780-mad-max-fury-road-0-1000-0-1500-crop.jpg?v=37c5424b1f",
    bio: "In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler with the help of a drifter.",
    year: 2015,
    genre: "Action, Adventure, Sci-Fi",
    rating: 8.1,
    duration: "120 min",
    language: "English"
  },
  {
    id: 2,
    title: "John Wick",
    image: "https://a.ltrbxd.com/resized/film-poster/1/7/2/0/7/6/172076-john-wick-0-1000-0-1500-crop.jpg?v=e3c8c69b11",
    bio: "A retired hitman seeks vengeance after his dog is killed and his car is stolen.",
    year: 2014,
    genre: "Action, Thriller, Crime",
    rating: 7.4,
    duration: "101 min",
    language: "English, Russian"
  },
  {
    id: 3,
    title: "The Dark Knight",
    image: "https://a.ltrbxd.com/resized/sm/upload/78/y5/zg/ej/oefdD26aey8GPdx7Rm45PNncJdU-0-1000-0-1500-crop.jpg?v=2d0ce4be25",
    bio: "Batman faces the Joker, a criminal mastermind wreaking havoc on Gotham City.",
    year: 2008,
    genre: "Action, Crime, Drama",
    rating: 9.0,
    duration: "152 min",
    language: "English"
  },
  {
    id: 4,
    title: "Gladiator",
    image: "https://a.ltrbxd.com/resized/film-poster/5/1/9/5/2/51952-gladiator-2000-0-1000-0-1500-crop.jpg?v=0071a74571",
    bio: "A betrayed Roman general seeks vengeance as a gladiator in the Colosseum.",
    year: 2000,
    genre: "Action, Drama",
    rating: 8.5,
    duration: "155 min",
    language: "English"
  },
  {
    id: 5,
    title: "Die Hard",
    image: "https://a.ltrbxd.com/resized/film-poster/5/1/5/5/6/51556-die-hard-0-1000-0-1500-crop.jpg?v=e24e92754d",
    bio: "A cop fights terrorists who have taken hostages in a skyscraper.",
    year: 1988,
    genre: "Action, Thriller",
    rating: 8.2,
    duration: "132 min",
    language: "English, German"
  },
  {
    id: 6,
    title: "Terminator 2: Judgment Day",
    image: "https://a.ltrbxd.com/resized/sm/upload/03/67/3s/tc/terminator-2-judgment-day-original-0-1000-0-1500-crop.jpg?v=12f5752b5c",
    bio: "A cyborg is sent back in time to protect John Connor from an advanced assassin.",
    year: 1991,
    genre: "Action, Sci-Fi",
    rating: 8.6,
    duration: "137 min",
    language: "English, Spanish"
  },
  {
    id: 7,
    title: "The Matrix",
    image: "https://a.ltrbxd.com/resized/film-poster/5/1/5/1/8/51518-the-matrix-0-1000-0-1500-crop.jpg?v=fc7c366afe",
    bio: "A hacker discovers the reality he lives in is a simulated world controlled by machines.",
    year: 1999,
    genre: "Action, Sci-Fi",
    rating: 8.7,
    duration: "136 min",
    language: "English"
  },
  {
    id: 8,
    title: "Inception",
    image: "https://a.ltrbxd.com/resized/sm/upload/sv/95/s9/4j/inception-0-1000-0-1500-crop.jpg?v=30d7224316",
    bio: "A thief who enters people's dreams to steal secrets is given a chance to have his past erased.",
    year: 2010,
    genre: "Action, Adventure, Sci-Fi",
    rating: 8.8,
    duration: "148 min",
    language: "English, Japanese, French"
  },
  {
    id: 9,
    title: "The Avengers",
    image: "https://a.ltrbxd.com/resized/sm/upload/10/u6/42/pa/cezWGskPY5x7GaglTTRN4Fugfb8-0-1000-0-1500-crop.jpg?v=9ec74891d9",
    bio: "Earth's mightiest heroes must unite to stop an alien invasion.",
    year: 2012,
    genre: "Action, Adventure, Sci-Fi",
    rating: 8.0,
    duration: "143 min",
    language: "English, Russian"
  },
];


const numColumns = 5;

const ActionMoviesScreen = () => {
  const router = useRouter();
  const [actionMovies, setActionMovies] = useState([]);

  const fetchActionMovies = async () => {
    try {

      let req = await fetch(`${BASE_URL}/api/movie/getMovieListByGenre?genre=action`);
      let res = await req.json();

      if (res.ok) {
        setActionMovies([...res.data]);
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
    fetchActionMovies();
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>

      <Text style={styles.title}>Action Movies</Text>
      <FlatList
        data={actionMovies}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => router.push("DetailScreen", { movies: item })}>
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

export default ActionMoviesScreen;
