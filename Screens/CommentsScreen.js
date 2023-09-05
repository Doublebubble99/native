import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useFonts } from "expo-font";
import { db } from "../config";
import {
  collection,
  addDoc,
  doc,
  onSnapshot,
  getDocs,
} from "firebase/firestore";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  FlatList,
} from "react-native";
export default function CommentsScreen({ route }) {
  const postId = route.params?.postId;
  const [comment, setComment] = useState("");
  const [allComents, setAllComments] = useState([]);
  const { login } = useSelector((state) => state.users);
  const [fontsLoaded] = useFonts({
    "Roboto-Medium": require("../assets/fonts/Roboto-Medium.otf"),
    "Roboto-Regular": require("../assets/fonts/Roboto-Regular.otf"),
  });
  useEffect(() => {
    getAllPosts();
  }, []);
  const createPost = async () => {
    const newDoc = await doc(db, "posts", postId);
    await addDoc(collection(newDoc, "comments"), {
      login,
      comment,
    });
  };
  const getAllPosts = async () => {
    const querySnapshot = await getDocs(
      collection(db, "posts", postId, "comments")
    );
    // await onSnapshot((data) =>
    //   setAllComments(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    // );
    querySnapshot.forEach((docs) =>
      setAllComments({ ...docs.data(), id: docs.id })
    );
  };
  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <SafeAreaView>
        <FlatList
          data={allComents}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View>
              <Text>{item.login}</Text>
              <Text>{item.comment}</Text>
            </View>
          )}
        />
      </SafeAreaView>
      <View>
        <TextInput onChangeText={setComment} />
      </View>
      <TouchableOpacity onPress={createPost}>
        <Text>Send message</Text>
      </TouchableOpacity>
    </View>
  );
}
