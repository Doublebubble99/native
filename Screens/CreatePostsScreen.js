import React, { useState, useEffect } from "react";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
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
  const [address, setAddress] = useState(null);
  const [name, setName] = useState(null);
  const [location, setLocation] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
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
                      await MediaLibrary.createAssetAsync(uri);
                    }
                  }}
                >
                  <View style={styles.takePhotoOut}>
                    <FontAwesome name="camera" size={24} color="#FFFFFF" />
                  </View>
                </TouchableOpacity>
                {/* <TouchableOpacity
            style={styles.flipContainer}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          >
            <Text style={{ fontSize: 18, marginBottom: 10, color: "white" }}>
              {" "}
              Flip{" "}
            </Text>
          </TouchableOpacity> */}
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
                  onChange={setName}
                  value={name}
                  textAlign="left"
                  placeholderTextColor="#BDBDBD"
                />
              </View>
              <View style={styles.InputWrap}>
                <Ionicons name="location-outline" size={24} color="#BDBDBD" />
                <TextInput
                  placeholder="location..."
                  onChange={setAddress}
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
              onPress={async () => {
                const { status } =
                  await Location.requestForegroundPermissionsAsync();
                if (status !== "granted") {
                  Alert.alert("Location resolve was denied");
                  return;
                }
                let location = await Location.getCurrentPositionAsync({});
                const coords = {
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                };
                setLocation(coords);
                navigation.navigate("Home", {
                  screen: "Posts",
                  params: { name, address, location },
                });
              }}
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
    marginTop: 32,
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
