import React, { useState, useRef, useEffect } from 'react';
import { View, BackHandler, StyleSheet, TouchableOpacity, Text, Dimensions, Animated, Alert } from 'react-native';
import { Video } from 'expo-av';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useLocalSearchParams, useRouter } from "expo-router";
import BASE_URL from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ModernVideoPlayer = () => {
  const router = useRouter();
  const { videoUrl, movieId } = useLocalSearchParams();
  const videoRef = useRef(null);
  const durationRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1.0);
  const [isControlsVisible, setIsControlsVisible] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showSubtitles, setShowSubtitles] = useState(false);
  const controlsOpacity = useRef(new Animated.Value(1)).current;


  const subtitles = [
    { start: 2290, end: 4839, text: '[Music]' },
    { start: 4839, end: 6680, text: 'My name is Jordan Belfort. The year I' },
    { start: 6680, end: 10160, text: 'turned 26, I made $49 million, which' },
    { start: 10160, end: 11559, text: 'really pissed me off because it was' },
    { start: 11559, end: 14240, text: 'three shy of a million a week.' },
    { start: 14240, end: 18080, text: 'I\'m making a name for' },
    { start: 19240, end: 22160, text: 'ourselves. Nobody knows if a stock is' },
    { start: 22160, end: 24160, text: 'going to go up, down, sideways, or in' },
    { start: 24160, end: 27080, text: 'circles. You know what fugazi is? Fugazi' },
    { start: 27080, end: 30160, text: 'It\'s a fake. Hey, fugazi, fugazi, it\'s a' },
    { start: 30160, end: 33320, text: 'it\'s a woozy, it\'s a fairy' },
    { start: 33320, end: 36719, text: 'dust. Was all this legal? Absolutely not.' },
    { start: 36719, end: 38079, text: 'We were making more money than we knew' },
    { start: 38079, end: 39879, text: 'what to do with. Don\'t work for you' },
    { start: 39879, end: 41600, text: 'man. Yeah, my money taped to your boobs.' },
    { start: 41600, end: 44200, text: 'Technically, you did work for me. What\'s' },
    { start: 44200, end: 45239, text: 'wrong?' },
    { start: 45239, end: 48559, text: 'Daddy, you bring home... Oh my' },
    { start: 48559, end: 51800, text: 'God. FBI. Any kind of booze you might want?' },
    { start: 51800, end: 55719, text: 'No, the bureau forbids us from drinking.' },
    { start: 55719, end: 58719, text: 'Duh.' },
    { start: 58920, end: 62680, text: 'Me, I\'m doing 500, I\'m out of control, but' },
    { start: 62680, end: 64959, text: 'there\'s nowhere to go, and there\'s no way' },
    { start: 64959, end: 67640, text: 'to slow. If I knew what I knew in the P, I' },
    { start: 67640, end: 70400, text: 'would have...' },
    { start: 70400, end: 72640, text: 'How does this actually work? There\'s a' },
    { start: 72640, end: 74360, text: 'big money sign. They get launched at the' },
    { start: 74360, end: 76320, text: 'time they stick. This is their gift, okay?' },
    { start: 76320, end: 78520, text: 'They\'re built to be thrown like a lawn' },
    { start: 78520, end: 80439, text: 'dart.' },
    { start: 80439, end: 84000, text: 'Stop. Safety first. Safety is, safety is' },
    { start: 84000, end: 85759, text: 'first. We don\'t want to get a bad' },
    { start: 85759, end: 88600, text: 'reputation. And I think I\'m possessed.' },
    { start: 88600, end: 91200, text: 'I keep it like the' },
    { start: 91200, end: 94360, text: 'Romans. Where the CH, baby? We live in the' },
    { start: 94360, end: 99240, text: 'moment. Been a...' },
    { start: 101640, end: 104079, text: 'Know...' },
    { start: 104079, end: 105580, text: 'Mmm.' },
    { start: 105580, end: 108670, text: '[Music]' },
    { start: 108920, end: 114040, text: 'Mhm. Come on.' },
    { start: 114640, end: 119279, text: '[Music]' }
  ];
  const updateDUration = async () => {
    try {
      let token = await AsyncStorage.getItem("isloggedIn")
      let req = await fetch(`${BASE_URL}/api/user/updateMovieWatched`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ duration: durationRef.current, token, movieId })
      })

      let res = await req.json();

      if (res.ok) {
        router.back();
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
            "Failed to add to Watch history",
            `${res.message}`,
            [
              { text: "Ok", onPress: () => router.back() }
            ]
          )
        }
      }
    } catch (error) {
      Alert.alert(
        "Connection Error",
        "Going back...",
        [
          { text: "OK", onPress: () => router.back() },
        ]
      );
    }
  }

  useEffect(() => {
    const backAction = () => {
      // Custom behavior
      Alert.alert(
        "Hold on!",
        "Do you really want to go back?",
        [
          { text: "Cancel", onPress: () => null, style: "cancel" },
          {
            text: "YES", onPress: () => {
              updateDUration()
            }
          }
        ]
      );
      return true; // Return true to prevent default back action
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove(); // Cleanup
  }, []);



  const currentSubtitle = subtitles.find(
    (sub) => currentTime >= sub.start && currentTime <= sub.end
  )?.text;

  // Toggle play/pause
  const togglePlayPause = async () => {
    if (videoRef.current) {
      if (isPlaying) {
        await videoRef.current.pauseAsync();
      } else {
        await videoRef.current.playAsync();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Handle volume change
  const handleVolumeChange = (value) => {
    setVolume(value);
    if (videoRef.current) {
      videoRef.current.setVolumeAsync(value);
    }
  };

  // Handle seek
  const handleSeek = (value) => {
    if (videoRef.current) {
      videoRef.current.setPositionAsync(value * duration);
    }
  };

  // Toggle controls visibility with animation
  const toggleControls = () => {
    Animated.timing(controlsOpacity, {
      toValue: isControlsVisible ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setIsControlsVisible(!isControlsVisible);
  };

  // Toggle subtitles visibility
  const toggleSubtitles = () => {
    setShowSubtitles(!showSubtitles);
  };

  // Handle video progress
  const onProgress = (status) => {
    console.log(status.positionMillis);

    durationRef.current = status.positionMillis
    setCurrentTime(status.positionMillis);
    setDuration(status.durationMillis);
  };

  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        source={{ uri: videoUrl }} // Remote video URL
        style={styles.video}
        useNativeControls={false}
        resizeMode="contain"
        isLooping
        volume={volume}
        onPlaybackStatusUpdate={onProgress}
      />
      {/* Subtitles Overlay
      {showSubtitles && currentSubtitle && (
        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitleText}>{currentSubtitle}</Text>
        </View>
      )} */}
      <Animated.View style={[styles.controls, { opacity: controlsOpacity }]}>
        <TouchableOpacity onPress={togglePlayPause} style={styles.controlButton}>
          <MaterialIcons
            name={isPlaying ? 'pause' : 'play-arrow'}
            size={40}
            color="#fff"
          />
        </TouchableOpacity>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={1}
          value={currentTime / duration || 0}
          onSlidingComplete={handleSeek}
          minimumTrackTintColor="#00ffcc"
          maximumTrackTintColor="#888"
          thumbTintColor="#00ffcc"
        />
        <Text style={styles.timeText}>
          {formatTime(currentTime)} / {formatTime(duration)}
        </Text>
        <Slider
          style={styles.volumeSlider}
          minimumValue={0}
          maximumValue={1}
          value={volume}
          onValueChange={handleVolumeChange}
          minimumTrackTintColor="#00ffcc"
          maximumTrackTintColor="#888"
          thumbTintColor="#00ffcc"
        />
        <TouchableOpacity onPress={toggleSubtitles} style={styles.controlButton}>
          <Feather
            name={showSubtitles ? 'book-open' : 'book'}
            size={30}
            color="#fff"
          />
        </TouchableOpacity>
      </Animated.View>
      <TouchableOpacity style={styles.fullscreenButton} onPress={toggleControls}>
        <Feather
          name={isControlsVisible ? 'eye-off' : 'eye'}
          size={30}
          color="#fff"
        />
      </TouchableOpacity>
    </View>
  );
};

// Helper function to format time
const formatTime = (millis) => {
  if (!millis) return '0:00';
  const totalSeconds = Math.floor(millis / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  video: {
    width: '100%',
    height: Dimensions.get('window').height,
  },
  controls: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  controlButton: {
    padding: 10,
  },
  slider: {
    flex: 1,
    marginHorizontal: 10,
  },
  volumeSlider: {
    width: 100,
  },
  timeText: {
    color: '#fff',
    fontSize: 14,
    marginHorizontal: 10,
  },
  fullscreenButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 5,
  },
  subtitleContainer: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    padding: 10,
  },
  subtitleText: {
    fontSize: 18,
    color: 'white',  // Text color
    textShadowColor: 'black', // Outline color
    textShadowOffset: { width: -2, height: 2 }, // Adjust thickness
    textShadowRadius: 3,
    textAlign: 'center',
  },
});

export default ModernVideoPlayer;