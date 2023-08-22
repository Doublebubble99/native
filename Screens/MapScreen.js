import React, { useEffect } from "react";
import { useFonts } from "expo-font";
import MapView, { Marker } from "react-native-maps";
import { Text, View, StyleSheet } from "react-native";

export default function MapScreen({ route }) {
  const [fontsLoaded] = useFonts({
    "Roboto-Medium": require("../assets/fonts/Roboto-Medium.otf"),
    "Roboto-Regular": require("../assets/fonts/Roboto-Regular.otf"),
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <View>
      <MapView mapType="standard">
        <Marker />
      </MapView>
    </View>
  );
}
