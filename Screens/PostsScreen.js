import React from "react";
import { useFonts } from "expo-font";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
export default function PostsScreen() {
  const [fontsLoaded] = useFonts({
    "Roboto-Medium": require("../assets/fonts/Roboto-Medium.otf"),
    "Roboto-Regular": require("../assets/fonts/Roboto-Regular.otf"),
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <View>
      <Text>Publications</Text>
    </View>
  );
}
