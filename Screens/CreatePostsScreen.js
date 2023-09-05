import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import { nanoid } from "nanoid";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { storage, db } from "../config";
import { useFonts } from "expo-font";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
export default function CreatePostsScreen({ navigation }) {
  const [address, setAddress] = useState("".trim());
  const [name, setName] = useState("".trim());
  const [location, setLocation] = useState(null);
  const [imgUri, setImgUri] = useState("");
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const { userId, login } = useSelector((state) => state.users);
  const [fontsLoaded] = useFonts({
    "Roboto-Medium": require("../assets/fonts/Roboto-Medium.otf"),
    "Roboto-Regular": require("../assets/fonts/Roboto-Regular.otf"),
  });
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");
    })();
  }, []);
  const uploadPost = async () => {
    try {
      const uniquePostId = nanoid();
      const imageRef = await ref(storage, `postsImage/${uniquePostId}`);
      const response = await fetch(imgUri);
      const blob = await response.blob();
      await uploadBytes(imageRef, blob);
      await addDoc(collection(db, "posts"), {
        address,
        name,
        userId,
        login,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  const handlePostsData = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Location resolve was denied");
      return null;
    }
    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
    if (!name && !address) {
      Alert.alert("Please enter all necessary fields");
      return;
    }
    await uploadPost();
    navigation.navigate("Home", {
      screen: "Posts",
      params: { name, address, imgUri, location },
    });
  };

  if (!fontsLoaded) {
    return null;
  }

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text style={styles.cameraText}>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View>
          <View style={styles.cameraView}>
            <Camera style={styles.camera} type={type} ref={setCameraRef}>
              <View style={styles.photoView}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={async () => {
                    if (cameraRef) {
                      const { uri } = await cameraRef.takePictureAsync();
                      console.log(uri);
                      setImgUri(uri);
                      await MediaLibrary.createAssetAsync(uri);
                    }
                  }}
                >
                  <View style={styles.takePhotoOut}>
                    <FontAwesome name="camera" size={24} color="#FFFFFF" />
                  </View>
                </TouchableOpacity>
              </View>
            </Camera>
            <Text style={styles.cameraText}>Upload photo</Text>
          </View>
          <View style={styles.inputView}>
            <KeyboardAvoidingView>
              <View style={styles.InputWrap}>
                <TextInput
                  placeholder="name..."
                  style={{
                    color: "#212121",
                    fontSize: 16,
                    fontFamily: "Roboto-Regular",
                    width: "100%",
                  }}
                  onChangeText={setName}
                  value={name}
                  textAlign="left"
                  placeholderTextColor="#BDBDBD"
                />
              </View>
              <View style={styles.InputWrap}>
                <Ionicons name="location-outline" size={24} color="#BDBDBD" />
                <TextInput
                  placeholder="location..."
                  onChangeText={setAddress}
                  textAlign="left"
                  placeholderTextColor="#BDBDBD"
                  value={address}
                  style={{
                    color: "#212121",
                    fontSize: 16,
                    fontFamily: "Roboto-Regular",
                    width: "100%",
                  }}
                />
              </View>
            </KeyboardAvoidingView>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handlePostsData}
            >
              <Text style={styles.submitText}>Publicate</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    top: 0,
    position: "relative",
  },
  cameraView: {
    marginBottom: 32,
    width: 343,
    height: 240,
  },
  camera: {
    width: "100%",
    height: "100%",
  },
  cameraText: {
    marginTop: 8,
    color: "#BDBDBD",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
  },
  photoView: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
  },

  flipContainer: {
    flex: 0.1,
    alignSelf: "flex-end",
  },

  button: { alignSelf: "center" },

  takePhotoOut: {
    height: 60,
    width: 60,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    backgroundColor: "rgba(255, 255, 255, 0.30)",
  },
  inputView: {
    display: "flex",
    marginTop: 32,
  },
  InputWrap: {
    width: 343,
    height: 50,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  submitButton: {
    marginTop: 20,
    width: 343,
    height: 51,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  submitText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
  },
});
