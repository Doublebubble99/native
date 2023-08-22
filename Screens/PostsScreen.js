import React from "react";
import { useFonts } from "expo-font";
import { Feather, Ionicons } from "@expo/vector-icons";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

export default function PostsScreen({ route, navigation }) {
  const { name, address, location } = route.params;
  const [fontsLoaded] = useFonts({
    "Roboto-Medium": require("../assets/fonts/Roboto-Medium.otf"),
    "Roboto-Regular": require("../assets/fonts/Roboto-Regular.otf"),
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {name && <Text>{name}</Text>}
      <View>
        <Feather name="message-circle" size={24} color="#BDBDBD" />
        <Text></Text>
      </View>
      {address && (
        <View>
          <Ionicons name="location-outline" size={24} color="#BDBDBD" />
          <Text>{address}</Text>{" "}
        </View>
      )}
    </View>
  );
}
