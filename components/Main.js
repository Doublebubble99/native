import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import RegistrationScreen from "../Screens/RegistrationScreen";
import LoginScreen from "../Screens/LoginScreen";
import Home from "../Screens/Home";
import CommentsScreen from "../Screens/CommentsScreen";
import MapScreen from "../Screens/MapScreen";
import { stateChangeUser } from "../redux/auth/authOperations";
const MainStack = createStackNavigator();
function Main() {
  const dispatch = useDispatch();
  const { stateChange } = useSelector((state) => state.users);
  useEffect(() => {
    dispatch(stateChangeUser());
  }, []);
  return (
    <NavigationContainer>
      <MainStack.Navigator initialRouteName="Register">
        <MainStack.Screen
          name="Register"
          component={RegistrationScreen}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name="Comments"
          component={CommentsScreen}
          options={{ headerShown: false }}
        />
        <MainStack.Screen name="Map" component={MapScreen} />
      </MainStack.Navigator>
    </NavigationContainer>
  );
}
export default Main;
