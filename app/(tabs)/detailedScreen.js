import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  Alert,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BASE_URL from "../../config";
const { height } = Dimensions.get("window");

const toTitleCase = (name) => {
  if (!name) return "";
  return name
    .toLowerCase()
    .split(" ")
    .filter(Boolean)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};


const DetailScreen = () => {
  const { movies } = useLocalSearchParams();
  const router = useRouter();
  const [movieData, setMovieData] = useState(JSON.parse(movies));

  const fetchMovieDetials = async () => {
    try {
      let token = await AsyncStorage.getItem("isloggedIn");
      if (!token) {
        Alert.alert(
          "Invalid Access",
          "You are not authorized to access this page",
          [
            { text: "OK" }
          ]
        );
        router.replace('/loginScreen')
        return;
      }
      let req = await fetch(
        `${BASE_URL}/api/movie/fetchMovieDataClient?movieId=${encodeURIComponent(movieData._id)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      let res = await req.json();
      console.log(res);

      if (res.ok) {
        setMovieData({ ...res.data })
      }

    } catch (error) {
      Alert.alert(
        "Connection Error",
        "Reloading page....",
        [
          { text: "OK", onPress: () => fetchMovieDetials() },
        ]
      );

    }
  }

  useEffect(() => {

    fetchMovieDetials();

  }, [movies])



  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        <ImageBackground
          source={{ uri: movieData.image }}
          style={styles.poster}
          imageStyle={{ resizeMode: "cover" }}
        >
          <LinearGradient
            colors={["transparent", "#0100235f", "#010023ff"]}
            style={StyleSheet.absoluteFillObject}
          />

          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={28} color="white" />
          </TouchableOpacity>
        </ImageBackground>

        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{movieData.title}</Text>
          <Text style={styles.info}>
            {movieData.year} • {movieData.genre} • ⭐ {movieData.rating}/10
          </Text>
          <Text style={styles.bio}>{movieData.bio}</Text>

          {movieData?.cast?.length > 0 && (
            <View style={{ flexDirection: "row", alignItems: "baseline", paddingTop: 10 }}>
              <Text style={{ color: "white", fontSize: 18, paddingRight: 10 }}>Cast:</Text>
              <View style={{ width: "90%" }}>
                <FlatList
                  data={movieData.cast}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item, index) => `${item}-${index}`}
                  renderItem={({ item }) => (
                    <Text style={{ paddingRight: 10, color: "white", fontSize: 18 }}>
                      {`${toTitleCase(item)},`}
                    </Text>
                  )}
                />
              </View>
            </View>
          )}

          <TouchableOpacity
            style={styles.watchButton}
            onPress={() =>
              router.push({
                pathname: "/videoPlayer",
                params: {
                  videoUrl: movieData.videoUrl,
                  movieId: movieData._id
                },
              })
            }
          >
            <Text style={styles.watchText}>▶ Watch Now</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#010023ff" },

  posterContainer: {
    width: "100%",
    height: height,
  },
  poster: {
    flex: 1,
    width: "100%",
    height: height,
  },

  // poster: { width: "100%", height: "100%", resizeMode: "cover", alignSelf:"flex-start" },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "#01002316" },
  backButton: { position: "absolute", top: 50, left: 20, padding: 10, zIndex: 1 },

  watchButton: {
    backgroundColor: "red",
    paddingVertical: 14,
    alignSelf: "center",
    width: "50%",
    marginHorizontal: 20,
    borderRadius: 25,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    elevation: 5,
  },
  watchText: { color: "white", fontSize: 24, fontFamily: "Poppins-Bold" },

  detailsContainer: {
    padding: 20,
    marginTop: -300,   // pulls content over the image naturally
  },
  title: { fontSize: 28, color: "white", fontFamily: "Poppins-Bold" },
  info: { fontSize: 16, color: "#BBBBBB", marginBottom: 10, fontFamily: "Poppins-Regular" },
  bio: { fontSize: 16, color: "#DDD", lineHeight: 24, fontFamily: "Poppins-Regular" },

  moreLikeThis: { fontSize: 22, fontWeight: "bold", color: "white", marginLeft: 20, marginTop: 20 },
  relatedItem: { width: 120, marginRight: 15, alignItems: "center" },
  relatedImage: { width: 120, height: 160, borderRadius: 8 },
  relatedTitle: { fontSize: 14, color: "white", marginTop: 5, textAlign: "center" },
});

export default DetailScreen;
