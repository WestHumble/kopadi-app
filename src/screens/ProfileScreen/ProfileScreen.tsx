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

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { height } = useWindowDimensions();
  const { login, logout, isLoading } = useContext(AuthContext);

  const onEditProfilePressed = () => {
    console.log("Kliknieto edytuj profil");
  };
  const onEventHistoryPressed = () => {
    console.log("Kliknieto historia wydarzeń");
  };
  const onFriendsPressed = () => {
    navigation.navigate("FriendsList")
  };
  const onAddEventPressed = () => {
    console.log("Kliknieto dodaj wydarzenie");
  };
  const onSettingsPressed = () => {
    console.log("Kliknieto ustwienia");
  };
  const onStatutePressed = () => {
    console.log("Kliknieto regulamin");
  };

  return (
    <>
      <View style={[styles.root, { height: height * 1 }]}>
        <View style={styles.windowTab}>
          <Text style={styles.title} resizeMode="contain">
            Profil
          </Text>
          <CustomButton
            text="Edytuj profil"
            onPress={onEditProfilePressed}
            type="PRIMARY"
            bgColor={undefined}
            fgColor={undefined}
          />
          <CustomButton
            text="Historia wydarzeń"
            onPress={onEventHistoryPressed}
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
            text="Ustawienia"
            onPress={onSettingsPressed}
            type="PRIMARY"
            bgColor={undefined}
            fgColor={undefined}
          />
          <CustomButton
            text="Regulamin"
            onPress={onStatutePressed}
            type="PRIMARY"
            bgColor={undefined}
            fgColor={undefined}
          />
          <CustomButton text="Wyloguj" onPress={logout} type="PRIMARY" />
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
