import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import {
  Text,
  View,
  TextInput,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  Alert,
  TouchableWithoutFeedback,
} from "react-native";
export default function LoginScreen() {
  const navigation = useNavigation();
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
    if (!email || !password) {
      Alert.alert("Please fill all necessary field to process your data");
      return;
    }
    navigation.navigate("Home", { screen: "Posts" });
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
              <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : "height"}
              >
                <Text style={styles.title}>Log in</Text>

                <TextInput
                  placeholder="Email address"
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                />

                <TextInput
                  placeholder="Password"
                  style={styles.input}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={true}
                />
              </KeyboardAvoidingView>
              <TouchableOpacity style={styles.button} onPress={outputData}>
                <Text style={styles.buttonText}>Log in</Text>
              </TouchableOpacity>
              <Text style={styles.refText}>
                Don't have account?{" "}
                <Text
                  style={styles.link}
                  onPress={() => navigation.navigate("Register")}
                >
                  Sign up
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
    marginTop: 323,
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "#212121",
    textAlign: "center",
    fontSize: 30,
    fontFamily: "Roboto-Medium",
    letterSpacing: 0.3,
    paddingTop: 32,
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
  refText: {
    color: "#1B4371",
    textAlign: "center",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    fontStyle: "normal",
  },
  link: {
    color: "#1B4371",
    textAlign: "center",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    fontStyle: "normal",
    textDecorationLine: "underline",
  },
});
