import React from "react";
import { useFonts } from "expo-font";
import { useRoute } from "@react-navigation/native";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

export default function PostsScreen() {
  const [fontsLoaded] = useFonts({
    "Roboto-Medium": require("../assets/fonts/Roboto-Medium.otf"),
    "Roboto-Regular": require("../assets/fonts/Roboto-Regular.otf"),
  });
  if (!fontsLoaded) {
    return null;
  }
  const {
    params: { location },
  } = useRoute();
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>{location}</Text>
    </View>
  );
}
