import React from "react";
import { useFonts } from "expo-font";
import { Feather, Ionicons } from "@expo/vector-icons";
import { Text, View, StyleSheet, Image } from "react-native";

export default function PostsScreen({ route, navigation }) {
  const name = route.params?.name;
  const address = route.params?.address;
  const location = route.params?.location;
  const imgUri = route.params?.imgUri;
  const [fontsLoaded] = useFonts({
    "Roboto-Medium": require("../assets/fonts/Roboto-Medium.otf"),
    "Roboto-Regular": require("../assets/fonts/Roboto-Regular.otf"),
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={{ flex: 1, alignItems: "center", marginTop: 32 }}>
      <View style={{ width: 343, height: 240 }}>
        {imgUri && (
          <Image borderRadius={8} height={240} source={{ uri: imgUri }} />
        )}
      </View>
      {name && <Text style={styles.nameText}>{name}</Text>}
      <View style={styles.iconsView}>
        {name && (
          <View style={styles.messageWrap}>
            <Feather
              name="message-circle"
              size={24}
              color="#BDBDBD"
              onPress={() => navigation.navigate("Comments")}
            />
            <Text style={styles.messageText}>0</Text>
          </View>
        )}
        {address && (
          <View style={styles.locationWrap}>
            <Ionicons
              name="location-outline"
              size={24}
              color="#BDBDBD"
              onPress={() => navigation.navigate("Map", { location })}
            />
            <Text style={styles.locationText}>{address}</Text>
          </View>
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  nameText: {
    color: "#212121",
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    width: 343,
    paddingTop: 8,
    paddingBottom: 8,
    textAlign: "left",
  },
  iconsView: {
    width: 343,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  messageWrap: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  locationWrap: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  messageText: {
    color: "#BDBDBD",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
  },
  locationText: {
    color: "#212121",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    textDecorationLine: "underline",
  },
});
