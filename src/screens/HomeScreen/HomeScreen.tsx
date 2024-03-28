import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { MapViewComponent } from "../../components/MapViewComponent";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import ChatComponent from "../../components/ChatComponent";

const HomeScreen = () => {
  const navigation = useNavigation();
  const addEventPressed = () => {
    navigation.navigate("AddEvent");
  };
  const profilePressed = () => {
    navigation.navigate("Profile");
  };
  return (
    <View style={styles.root}>
      <MapViewComponent />
      <ChatComponent />
      <CustomButton
        text="+"
        onPress={profilePressed}
        type="PRIMARY"
        bgColor={undefined}
        fgColor={undefined}
        additionalStyles={styles.profileButton}
      />
      <CustomButton
        text="+"
        onPress={addEventPressed}
        type="PRIMARY"
        bgColor={undefined}
        fgColor={undefined}
        additionalStyles={styles.addEventButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  addEventButton: {
    position: "absolute",
    bottom: "16%",
    right: "5%",
    borderWidth: 3,
    fontSize: 50,
    width: 55,
    height: 55,
    borderRadius: 50,
    zIndex: 99,
  },
  profileButton: {
    position: "absolute",
    top: "10%",
    right: "5%",
    borderWidth: 3,
    fontSize: 50,
    width: 55,
    height: 55,
    borderRadius: 50,
    zIndex: 99,
  },
});

export default HomeScreen;
