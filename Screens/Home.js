import React from "react";
import { useDispatch } from "react-redux";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { StyleSheet } from "react-native";
import { Ionicons, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import PostsScreen from "./PostsScreen";
import CreatePostsScreen from "./CreatePostsScreen";
import ProfileScreen from "./ProfileScreen";
import { userSignOut } from "../redux/auth/authOperations";
const BottomTabs = createBottomTabNavigator();
export default function Home() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [fontsLoaded] = useFonts({
    "Roboto-Medium": require("../assets/fonts/Roboto-Medium.otf"),
    "Roboto-Regular": require("../assets/fonts/Roboto-Regular.otf"),
  });
  if (!fontsLoaded) {
    return null;
  }
  const signOut = () => {
    dispatch(userSignOut());
    navigation.navigate("Register");
  };
  return (
    <BottomTabs.Navigator
      initialRouteName="Posts"
      screenOptions={{
        headerTitleAlign: "center",
        headerTitleStyle: styles.title,
        headerLeftContainerStyle: { paddingLeft: 16 },
        headerRightContainerStyle: { paddingRight: 16 },
        tabBarActiveTintColor: "blue",
        tabBarInactiveTintColor: "#212121",
      }}
    >
      <BottomTabs.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="grid" color={color} size={40} />;
          },
          tabBarShowLabel: false,
          headerRight: ({ color, size }) => {
            return (
              <MaterialCommunityIcons
                name="logout"
                size={24}
                color={color}
                onPress={signOut}
              />
            );
          },
        }}
      />
      <BottomTabs.Screen
        name="Create Posts"
        component={CreatePostsScreen}
        options={{
          tabBarIcon: ({ color, size }) => {
            return (
              <Ionicons
                name="add"
                style={styles.btnIcon}
                color={color}
                size={40}
              />
            );
          },
          headerLeft: ({ size, color }) => {
            return (
              <Ionicons
                name="arrow-back"
                size={24}
                color={color}
                onPress={() => navigation.navigate("Login")}
              />
            );
          },
          tabBarShowLabel: false,
        }}
      />
      <BottomTabs.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Feather name="user" color={color} size={40} />;
          },
          tabBarShowLabel: false,
        }}
      />
    </BottomTabs.Navigator>
  );
}
const styles = StyleSheet.create({
  btnIcon: {
    backgroundColor: "#FF6C00",
    width: 70,
    borderRadius: 20,
    textAlign: "center",
  },
  title: {
    color: "#212121",
    fontFamily: "Roboto-Medium",
    fontSize: 17,
    fontStyle: "normal",
    lineHeight: 22,
    letterSpacing: -0.408,
  },
});
