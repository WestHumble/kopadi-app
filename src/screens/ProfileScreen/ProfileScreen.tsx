import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import CustomButton from "../../components/CustomButton";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { LocationContext } from "../../context/LocationContext";

const ProfileScreen = () => {
  const { userLocation, shareLocation, setShareLocation } =
    useContext(LocationContext);
  const navigation = useNavigation();
  const { height } = useWindowDimensions();
  const { logout } = useContext(AuthContext);
  const onShareLocationToggle = () => {
    setShareLocation(!shareLocation);
  };

  const onFriendInvitesPressed = () => {
    navigation.navigate("FriendInvitesScreen");
  };
  const onEventInvitesPressed = () => {
    navigation.navigate("EventInvitesScreen");
  };
  const onEditProfilePressed = () => {
    navigation.navigate("EditProfile");
  };
  const onFriendsPressed = () => {
    navigation.navigate("FriendsList");
  };
  const onAddEventPressed = () => {
    navigation.navigate("AddEvent");
  };

  return (
    <>
      <View style={[styles.root, { height: height * 1 }]}>
        <View style={styles.windowTab}>
          <Text style={styles.title} resizeMode="contain">
            Profil
          </Text>
          <ScrollView showsVerticalScrollIndicator={false}>
            <CustomButton
              text="Edytuj profil"
              onPress={onEditProfilePressed}
              type="PRIMARY"
              bgColor={undefined}
              fgColor={undefined}
            />
            <CustomButton
              text="Zaproszenia do znajomych"
              onPress={onFriendInvitesPressed}
              type="PRIMARY"
              bgColor={undefined}
              fgColor={undefined}
            />
            <CustomButton
              text="Zaproszenia na wydarzenia"
              onPress={onEventInvitesPressed}
              type="PRIMARY"
              bgColor={undefined}
              fgColor={undefined}
            />
            <CustomButton
              text="Znajomi"
              onPress={onFriendsPressed}
              type="PRIMARY"
              bgColor={undefined}
              fgColor={undefined}
            />
            <CustomButton
              text="Dodaj wydarzenie"
              onPress={onAddEventPressed}
              type="PRIMARY"
              bgColor={undefined}
              fgColor={undefined}
            />
            <CustomButton
              additionalStyles={{}}
              text={shareLocation ? "Udostępnianie lokalizacji: Włączone" : "Udostępnianie lokalizacji: Wyłączone"}
              onPress={onShareLocationToggle}
              type="PRIMARY"
              bgColor={undefined}
              fgColor={undefined}
            />
            <CustomButton text="Wyloguj" onPress={logout} type="PRIMARY" />
          </ScrollView>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "#131417",
    flex: 1,
  },
  windowTab: {
    height: "75%",
    width: "100%",
    backgroundColor: "#1D1F24",
    top: "7%",
    borderRadius: 20,
    padding: 20,
  },
  text: {
    color: "#999999",
    marginTop: 20,
    marginBottom: 25,
  },
  link: {
    color: "#003f63",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: "5%",
    color: "#fff",
  },
});

export default ProfileScreen;
