import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, Platform, ActivityIndicator } from "react-native";
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import HomeScreen from "../screens/HomeScreen";
import ConfirmEmailScreen from "../screens/ConfirmEmailScreen";
import SearchEventsScreen from "../screens/SearchEventsScreen";
import AddEventScreen from "../screens/AddEventScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { ApiContext } from "../context/ApiContext";
import ResetPasswordScreen from "../screens/ResetPasswordScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import { AuthContext } from "../context/AuthContext";
import EventViewScreen from "../screens/EventViewScreen";
import SearchFriendsScreen from "../screens/SearchFriendsScreen";
import SearchNewFriendsScreen from "../screens/SearchNewFriendsScreen";
import InviteFriendsToEventScreen from "../screens/InviteFriendsToEventScreen";
import FriendInvitesScreen from "../screens/FriendInvitesScreen";
import { NavigationContext } from "../context/NavigationContext";
import EventInvitesScreen from "../screens/EventInvitesScreen";
import ChatListScreen from "../screens/ChatListScreen";
import ChatScreen from "../screens/ChatScreen";
import { ChatContext } from "../context/ChatContext";
import { EventsContext } from "../context/EventsContext";
import { FriendsContext } from "../context/FriendsContext";
import NewChatScreen from "../screens/NewChatScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import DisplayProfileScreen from "../screens/DisplayProfileScreen";
import PolicyScreen from "../screens/PolicyScreen";

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
    paddingTop: 0,
    height: "10%",
    margin: 0,
    backgroundColor: "#1D1F24",
    borderRadius: 20,
    borderTopWidth: 0,
    borderTopColor: "transparent",
    zIndex: 999,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }),
    transform: [
      {
        translateY: 0,
      },
      {
        scale: 1,
      },
    ],
  },
};

const screenOptionsLoggedOut = {
  tabBarShowLabel: false,
  headerShown: false,
  tabBarVisible: false,
  tabBarStyle: {
    height: "0%",
    margin: 0,
    backgroundColor: "#1D1F24",
    borderRadius: 20,
    borderTopWidth: 0,
    borderTopColor: "transparent",
  },
};

const TabNavScreen = () => {
  const { userToken } = useContext(ApiContext);

  return userToken ? <TabsLoggedIn /> : <TabsLoggedOut />;
};
const TabsLoggedIn = () => {
  const { unreadChatCounter } = useContext(ChatContext);
  const { unreadFriendInvitesCounter } = useContext(FriendsContext);
  const { unreadEventInvitesCounter } = useContext(EventsContext);
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
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
                  Mapa
                </Text>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="SearchEvents"
        component={SearchEventsScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
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
        name="ChatListScreen"
        component={ChatListScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Ionicons
                  name="chatbox-outline"
                  size={24}
                  color={focused ? "#F2B138" : "#676D75"}
                />
                {unreadChatCounter > 0 && (
                  <View
                    style={{
                      fontSize: 12,
                      color: focused ? "#F2B138" : "#676D75",
                      position: "absolute",
                      top: -5,
                      right: -5,
                      backgroundColor: "red",
                      borderRadius: 10,
                      paddingHorizontal: 4,
                      paddingVertical: 1,
                      textAlign: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 12,
                        color: "white",
                      }}
                    >
                      {unreadChatCounter}
                    </Text>
                  </View>
                )}
                <Text
                  style={{
                    fontSize: 12,
                    color: focused ? "#F2B138" : "#676D75",
                  }}
                >
                  Czat
                </Text>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Ionicons
                  name="person-outline"
                  size={24}
                  color={focused ? "#F2B138" : "#676D75"}
                />
                {unreadEventInvitesCounter + unreadFriendInvitesCounter > 0 && (
                  <View
                    style={{
                      fontSize: 12,
                      color: focused ? "#F2B138" : "#676D75",
                      position: "absolute",
                      top: -5,
                      right: -5,
                      backgroundColor: "red",
                      borderRadius: 10,
                      paddingHorizontal: 4,
                      paddingVertical: 1,
                      textAlign: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 12,
                        color: "white",
                      }}
                    >
                      {unreadEventInvitesCounter + unreadFriendInvitesCounter}
                    </Text>
                  </View>
                )}
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
      <Tab.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{
          tabBarButton: () => null,
        }}
      />
      <Tab.Screen
        name="DisplayProfile"
        component={DisplayProfileScreen}
        options={{
          tabBarButton: () => null,
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          tabBarButton: () => null,
        }}
      />
      <Tab.Screen
        name="NewChat"
        component={NewChatScreen}
        options={{
          tabBarButton: () => null,
        }}
      />
      <Tab.Screen
        name="AddEvent"
        component={AddEventScreen}
        options={{
          tabBarButton: () => null,
        }}
      />
      <Tab.Screen
        name="InviteFriendsToEvent"
        component={InviteFriendsToEventScreen}
        options={{
          tabBarButton: () => null,
        }}
      />
      <Tab.Screen
        name="FriendInvitesScreen"
        component={FriendInvitesScreen}
        options={{
          tabBarButton: () => null,
        }}
      />
      <Tab.Screen
        name="EventInvitesScreen"
        component={EventInvitesScreen}
        options={{
          tabBarButton: () => null,
        }}
      />
      <Tab.Screen
        name="FriendsList"
        component={SearchFriendsScreen}
        options={{
          tabBarButton: () => null,
        }}
      />
      <Tab.Screen
        name="NewFriend"
        component={SearchNewFriendsScreen}
        options={{
          tabBarButton: () => null,
        }}
      />
      <Tab.Screen
        name="EventView"
        component={EventViewScreen}
        options={{
          tabBarButton: () => null,
        }}
      />
    </Tab.Navigator>
  );
};
const TabsLoggedOut = () => {
  return (
    <Tab.Navigator screenOptions={screenOptionsLoggedOut}>
      <Tab.Screen
        name="SignIn"
        component={SignInScreen}
        options={{
          tabBarButton: () => null,
        }}
      />
      <Tab.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{
          tabBarButton: () => null,
        }}
      />
      <Tab.Screen
        name="ResetPassword"
        component={ResetPasswordScreen}
        options={{
          tabBarButton: () => null,
        }}
      />
      <Tab.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        options={{
          tabBarButton: () => null,
        }}
      />
      <Tab.Screen
        name="Policy"
        component={PolicyScreen}
        options={{
          tabBarButton: () => null,
        }}
      />
      <Tab.Screen
        name="ConfirmEmail"
        component={ConfirmEmailScreen}
        options={{
          tabBarButton: () => null,
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate("ConfirmEmail");
          },
        })}
      />
    </Tab.Navigator>
  );
};
const Navigation = () => {
  const { isLoading } = useContext(AuthContext);
  const { navigationRef } = useContext(NavigationContext);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }
  return (
    <NavigationContainer ref={navigationRef}>
      <TabNavScreen />
    </NavigationContainer>
  );
};

export default Navigation;
