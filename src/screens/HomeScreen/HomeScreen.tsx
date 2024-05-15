import {View, Text, StyleSheet, Pressable, Image, ActivityIndicator} from "react-native";
import React, {useContext, useState} from "react";
import { MapViewComponent } from "../../components/MapViewComponent";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import eventsAddImg from "../../../assets/images/addevent.png";
import userImg from "../../../assets/images/user.png";
import Avatar from "../../components/Avatar";
import {AuthContext} from "../../context/AuthContext";

const HomeScreen = () => {
  const navigation = useNavigation();
  const { userData, fetchUserData } = useContext(AuthContext);
  const [isLoadingUserData, setIsLoadingUserData] = useState<boolean>(false);
  if (!userData) {
    if (!isLoadingUserData) {
      fetchUserData();
      setIsLoadingUserData(true);
    }
    return (
        <View
            style={{
              flex: 1,
              justifyContent: "center",
              backgroundColor: "#131417",
              alignItems: "center",
            }}
        >
          <ActivityIndicator size={"large"} />
        </View>
    );
  }
  const profilePressed = () => {
    navigation.navigate("Profile");
  };
  return (
    <View style={styles.root}>
      <MapViewComponent />
      <View style={styles.profileButton}>
        <Pressable onPress={profilePressed}>
          <Avatar
              userId={userData.id}
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
            }}
              allowRedirect={false}
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
    borderStyle: "solid",
    borderWidth: 3,
    borderColor: "#131417",
  },
});

export default HomeScreen;
