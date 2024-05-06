import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import React, { useState } from "react";
import { MapViewComponent } from "../../components/MapViewComponent";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import eventsAddImg from "../../../assets/images/addevent.png";
import userImg from "../../../assets/images/user.png";

const HomeScreen = () => {
  const navigation = useNavigation();

  const profilePressed = () => {
    navigation.navigate("Profile");
  };
  return (
    <View style={styles.root}>
      <MapViewComponent />
      <View style={styles.profileButton}>
        <Pressable onPress={profilePressed}>
          <Image
            source={userImg}
            style={{
              width: 30,
              height: 30,
              borderRadius: 10,
            }}
          />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  addEventButton: {
    position: "absolute",
    bottom: "17%",
    right: "5%",
    backgroundColor: "#F2B138",
    borderRadius: 50,
    padding: 12,
    borderStyle: "solid",
    borderWidth: 3,
    borderColor: "#131417",
  },
  profileButton: {
    position: "absolute",
    top: "10%",
    right: "5%",
    backgroundColor: "#F2B138",
    borderRadius: 50,
    padding: 12,
    borderStyle: "solid",
    borderWidth: 3,
    borderColor: "#131417",
  },
});

export default HomeScreen;
