import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFonts } from "expo-font";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { collection, getDocs, onSnapshot, where } from "firebase/firestore";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { db } from "../config";
import { userSignOut } from "../redux/auth/authOperations";
export default function ProfileScreen() {
  const [profilePosts, setProfilePosts] = useState([]);
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state.users);
  const [fontsLoaded] = useFonts({
    "Roboto-Medium": require("../assets/fonts/Roboto-Medium.otf"),
    "Roboto-Regular": require("../assets/fonts/Roboto-Regular.otf"),
  });
  useEffect(() => {
    getUserPosts();
  }, []);
  const getUserPosts = async () => {
    const snapshots = await getDocs(
      collection(db, "posts"),
      where("userId", "==", userId)
    );
    const filteredPosts = snapshots.docs.map((doc) => ({
      ...doc.data(),
    }));
    setProfilePosts(filteredPosts);
  };
  const signOut = () => {
    dispatch(userSignOut());
  };
  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <MaterialCommunityIcons
        name="logout"
        size={24}
        color={color}
        onPress={signOut}
      />
      <Text>Profile</Text>
    </View>
  );
}
