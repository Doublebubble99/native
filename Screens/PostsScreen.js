import React, { useState, useEffect } from "react";
import { useFonts } from "expo-font";
import { Feather, Ionicons } from "@expo/vector-icons";
import { Text, View, StyleSheet, Image, FlatList } from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config";
export default function PostsScreen({ route, navigation }) {
  const [posts, setPosts] = useState([]);
  const login = route.params?.login;
  const email = route.params?.email;
  const [fontsLoaded] = useFonts({
    "Roboto-Medium": require("../assets/fonts/Roboto-Medium.otf"),
    "Roboto-Regular": require("../assets/fonts/Roboto-Regular.otf"),
  });
  useEffect(() => {
    getAllposts();
    console.log(posts);
  }, []);
  const getAllposts = async () => {
    const snapshots = await getDocs(collection(db, "posts"));
    const allPosts = snapshots.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setPosts(allPosts);
  };

  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={{ flex: 1, alignItems: "center", marginTop: 32 }}>
      <View>
        <Text>{login}</Text>
        <Text>{email}</Text>
      </View>
      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View>
            <View style={{ width: 343, height: 240 }}>
              <Image
                borderRadius={8}
                height={240}
                source={{ uri: item.imgUri }}
              />
            </View>
            <Text style={styles.nameText}>{item.name}</Text>
            <View style={styles.iconsView}>
              <View style={styles.messageWrap}>
                <Feather
                  name="message-circle"
                  size={24}
                  color="#BDBDBD"
                  onPress={() =>
                    navigation.navigate("Comments", { postId: item.id })
                  }
                />
                <Text style={styles.messageText}>0</Text>
              </View>
              <View style={styles.locationWrap}>
                <Ionicons
                  name="location-outline"
                  size={24}
                  color="#BDBDBD"
                  onPress={() =>
                    navigation.navigate("Map", { location: item.location })
                  }
                />
                <Text style={styles.locationText}>{item.address}</Text>
              </View>
            </View>
          </View>
        )}
      />
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
