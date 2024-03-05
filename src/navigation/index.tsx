import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { View, Text, Platform } from "react-native";
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import HomeScreen from "../screens/HomeScreen";
import ConfirmEmailScreen from "../screens/ConfirmEmailScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import ResetPasswordScreen from "../screens/ResetPasswordScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const screenOptions = {
  tabBarShowLabel: false,
  headerShown: false,
  tabBarStyle: {
    position: "absolute",
    bottom: "5%",
    right: "3%",
    left: "3%",
    paddingBottom: 0,
    height: "10%",
    backgroundColor: "#1D1F24",
    borderRadius: 20,
    zIndex: 999,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }),
  },
};
const TabStackScreen = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Strona główna" }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{ title: "Zarejestruj się" }}
      />
      <Stack.Screen
        name="ConfirmEmail"
        component={ConfirmEmailScreen}
        options={{ title: "Potwierdź email" }}
      />
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{ title: "Zaloguj się" }}
      />
    </Stack.Navigator>
  );
};

const Navigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={screenOptions} mode="modal">
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <Feather
                    name="home"
                    size={24}
                    color={focused ? "#F2B138" : "#676D75"}
                  />
                  <Text
                    style={{
                      fontSize: 12,
                      color: focused ? "#F2B138" : "#676D75",
                    }}
                  >
                    Home
                  </Text>
                </View>
              );
            },
          }}
        />
        <Tab.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <Ionicons
                    name="search-outline"
                    size={24}
                    color={focused ? "#F2B138" : "#676D75"}
                  />

                  <Text
                    style={{
                      fontSize: 12,
                      color: focused ? "#F2B138" : "#676D75",
                    }}
                  >
                    Wyszukaj
                  </Text>
                </View>
              );
            },
          }}
        />

        <Tab.Screen
          name="ConfirmEmail"
          component={ConfirmEmailScreen}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <Ionicons
                    name="chatbox-outline"
                    size={24}
                    color={focused ? "#F2B138" : "#676D75"}
                  />
                  <Text
                    style={{
                      fontSize: 12,
                      color: focused ? "#F2B138" : "#676D75",
                    }}
                  >
                    Chat
                  </Text>
                </View>
              );
            },
          }}
        />
        <Tab.Screen
          name="SignIn"
          component={SignInScreen}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <Ionicons
                    name="person-outline"
                    size={24}
                    color={focused ? "#F2B138" : "#676D75"}
                  />
                  <Text
                    style={{
                      fontSize: 12,
                      color: focused ? "#F2B138" : "#676D75",
                    }}
                  >
                    Profil
                  </Text>
                </View>
              );
            },
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
