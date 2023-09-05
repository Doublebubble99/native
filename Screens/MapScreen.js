import React, { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import MapView, { Marker } from "react-native-maps";
import { Text, View, StyleSheet, Dimensions } from "react-native";

export default function MapScreen({ route }) {
  const {
    coords: { longitude, latitude },
  } = route.params?.location;
  const [fontsLoaded] = useFonts({
    "Roboto-Medium": require("../assets/fonts/Roboto-Medium.otf"),
    "Roboto-Regular": require("../assets/fonts/Roboto-Regular.otf"),
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <View>
      <MapView
        mapType="standard"
        region={{
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
          latitude: latitude,
          longitude: longitude,
        }}
        style={styles.mapStyle}
      >
        <Marker
          title="You are here"
          coordinate={{
            latitude: latitude,
            longitude: longitude,
          }}
        />
      </MapView>
    </View>
  );
}
const styles = StyleSheet.create({
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
