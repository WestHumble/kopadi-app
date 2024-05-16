import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  ScrollView, ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import CustomButton from "../../components/CustomButton";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { LocationContext } from "../../context/LocationContext";
import {FriendsContext} from "../../context/FriendsContext";
import {EventsContext} from "../../context/EventsContext";

const ProfileScreen = () => {
  const { shareLocation, setShareLocation } =
    useContext(LocationContext);

  const {unreadFriendInvitesCounter} = useContext(FriendsContext);
  const {unreadEventInvitesCounter} = useContext(EventsContext);

  const navigation = useNavigation();
  const { height } = useWindowDimensions();
  const { logout, userData, fetchUserData } = useContext(AuthContext);
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

  return (
    <>
      <View style={[styles.root, { height: height * 1 }]}>
        <View style={styles.windowTab}>
          <Text style={styles.title} resizeMode="contain">
            Witaj {userData.name}!
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
                text={(<>Zaproszenia do znajomych { unreadFriendInvitesCounter > 0 && (<View
                    style={{
                      fontSize: 12,
                      color:"#F2B138",
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
                    {unreadFriendInvitesCounter}
                  </Text>
                </View>)}</>)}
              onPress={onFriendInvitesPressed}
              type="PRIMARY"
              bgColor={undefined}
              fgColor={undefined}
            />
            <CustomButton
              text={(<>Zaproszenia na wydarzenia { unreadEventInvitesCounter > 0 && (<View
                  style={{
                    fontSize: 12,
                    color:"#F2B138",
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
                  {unreadEventInvitesCounter}
                </Text>
              </View>)}</>)}
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
