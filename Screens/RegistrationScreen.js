import React, { useState } from "react";
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";
import {
  Text,
  View,
  TextInput,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
export default function RegistrationScreen() {
  const navigation = useNavigation();
  const [login, setLogin] = useState("".trim());
  const [email, setEmail] = useState("".trim());
  const [password, setPassword] = useState("".trim());
  const [fontsLoaded] = useFonts({
    "Roboto-Medium": require("../assets/fonts/Roboto-Medium.otf"),
    "Roboto-Regular": require("../assets/fonts/Roboto-Regular.otf"),
  });
  if (!fontsLoaded) {
    return null;
  }
  const outputData = () => {
    if (!login || !password || !email) {
      Alert.alert("Please fill all necessary field to process your data");
      return;
    }
    navigation.navigate("Home", { screen: "Posts" });
    console.log(`Your login: ${login}`);
    console.log(`Your email: ${email}`);
    console.log(`Your password: ${password}`);
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View>
          <ImageBackground imageStyle source={require("./bg-photo.png")}>
            <View style={styles.container}>
              <Image source={require("./photo.png")} style={styles.image} />
              <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : "height"}
              >
                <Text style={styles.title}>Registration</Text>

                <TextInput
                  placeholder="Login"
                  value={login}
                  style={styles.input}
                  onChangeText={setLogin}
                />
                <TextInput
                  placeholder="Email address"
                  value={email}
                  style={styles.input}
                  onChangeText={setEmail}
                />
                <TextInput
                  placeholder="Password"
                  value={password}
                  style={styles.input}
                  onChangeText={setPassword}
                />
              </KeyboardAvoidingView>
              <TouchableOpacity style={styles.button} onPress={outputData}>
                <Text style={styles.buttonText}>Sign up</Text>
              </TouchableOpacity>
              <Text style={styles.refText}>
                Already have account?
                <Text
                  style={styles.link}
                  onPress={() => navigation.navigate("Login")}
                >
                  {" "}
                  Sign in
                </Text>
              </Text>
            </View>
          </ImageBackground>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    position: "relative",
    marginTop: 219,
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    alignItems: "center",
  },
  title: {
    color: "#212121",
    textAlign: "center",
    fontSize: 30,
    fontFamily: "Roboto-Medium",
    letterSpacing: 0.3,
    paddingTop: 92,
    paddingBottom: 33,
  },
  input: {
    color: "#BDBDBD",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    marginBottom: 16,
    width: 343,
    height: 50,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderStyle: "solid",
    borderRadius: 10,
    padding: 16,
  },
  button: {
    marginTop: 27,
    marginBottom: 16,
    display: "flex",
    width: 343,
    height: 51,
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    gap: 12,
    borderRadius: 100,
    backgroundColor: "#FF6C00",
  },
  buttonText: {
    color: "#FFF",
    textAlign: "center",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
  },
  link: {
    color: "#1B4371",
    textAlign: "center",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    fontStyle: "normal",
    textDecorationLine: "underline",
  },
  refText: {
    color: "#1B4371",
    textAlign: "center",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    fontStyle: "normal",
  },
  image: {
    position: "absolute",
    top: -60,
  },
});
