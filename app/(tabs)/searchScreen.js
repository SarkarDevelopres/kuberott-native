import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Alert
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import CustomNav from "../../components/CustomNav";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BASE_URL from "../../config";

const numColumns = 5;

const SearchScreen = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [movieData, setMovieData] = useState([])
  const [filteredMovies, setFilteredMovies] = useState([]);

  const fetchMoviesAll = async () => {

    console.log("I was called: ", token);
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

    let req = await fetch(`${BASE_URL}/api/movie/getAllMovies`);
    let res = await req.json();

    if (res.ok) {
      setMovieData([...res.movieList]);
      setFilteredMovies([...res.movieList]);
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
    fetchMoviesAll()
  }, [])


  const handleSearch = (text) => {
    setQuery(text);
    const results = movieData.filter((movie) =>
      movie.title.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredMovies(results);
  };

  return (
    <SafeAreaView style={styles.container}>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          placeholder="Search Movies..."
          placeholderTextColor="#aaa"
          value={query}
          onChangeText={handleSearch}
          autoCapitalize="none"
        />
      </View>

      {/* Movie List */}
      <FlatList
        data={filteredMovies}
        keyExtractor={(item) => item._id.toString()}
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
      <CustomNav page={"search"} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#010023ff",
    padding: 10,
  },
  backButton: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 1,
    padding: 10,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1e1e1ea2",
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 45,
    marginTop: 0,
    marginBottom: 15,
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#fff",
  },
  listContainer: {
    alignItems: "flex-start",
  },
  card: {
    height: 320,
    width: Dimensions.get("window").width / numColumns - 20,
    backgroundColor: "#1e1e1ea2",
    margin: 5,
    borderRadius: 8,
    overflow: "hidden",
    alignItems: "center",
    padding: 10,
    alignSelf: "flex-start",
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

export default SearchScreen;
