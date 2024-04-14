import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import React, {useContext, useEffect, useState} from "react";
import CustomInput from "../../components/CustomInput";
import {FriendsContext} from "../../context/FriendsContext";
import FriendList from "../../components/FriendList";
import {Friend} from "../../types/friend";
import {ApiContext} from "../../context/ApiContext";
import friendList from "../../components/FriendList";
import NotificationList from "../../components/NotificationList";

const NotificationsScreen = ({ route }) => {

  const { height } = useWindowDimensions();
  const [searchPhrase, setSearchPhrase] = useState("");
  const { friends } = useContext(FriendsContext);
  const [inviteSent, setInviteSent] = useState<Friend[]>([]);
  const { get, post } = useContext(ApiContext);


  const data = [
    {
      title: "Zaproszenia do znajomych",
      data: []
    },
  ];

  return (
      <>
        <View style={[styles.root, { height: height * 1 }]}>
          <View style={styles.windowTab}>
            <NotificationList data={data} />
            <CustomInput
                placeholder="Szukaj"
                value={searchPhrase}
                setValue={setSearchPhrase}
                secureTextEntry={undefined}
                additionalStyle={styles.searchInput}
            />
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
  searchInput: {color: "#fff"},
});

export default NotificationsScreen;
