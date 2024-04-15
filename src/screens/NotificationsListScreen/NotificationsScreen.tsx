import {
  View,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import React, {useContext, useEffect, useState} from "react";
import CustomInput from "../../components/CustomInput";
import {FriendsContext} from "../../context/FriendsContext";
import NotificationList from "../../components/NotificationList";
import {FriendInviteNotification} from "../../types/notification";

const NotificationsScreen = () => {

  const { height } = useWindowDimensions();
  const [searchPhrase, setSearchPhrase] = useState("");
  const { pendingInvites } = useContext(FriendsContext);
  const [friendInviteNotification, setFriendInviteNotification] = useState<FriendInviteNotification[]>([]);

  useEffect(() => {
    let friendInvites: FriendInviteNotification[] = pendingInvites.map(invite=> { return {
      'id': invite.id + '_friend',
      'friendInvite': invite,
    }})

    setFriendInviteNotification(searchPhrase ? friendInvites.filter(invite => {
      let matches = true;
      searchPhrase.split(' ').every(phrasePart => {
        if (!invite.friendInvite.friend.name.toLowerCase().startsWith(phrasePart.toLowerCase()) &&
            !invite.friendInvite.friend.surname.toLowerCase().startsWith(phrasePart.toLowerCase())) {
          matches = false
          return false
        }
        return true
      })
      return matches
    }) : friendInvites)
  }, [pendingInvites, searchPhrase]);

  return (
      <>
        <View style={[styles.root, { height: height * 1 }]}>
          <View style={styles.windowTab}>
            <NotificationList friendInviteData={[
              {
                title: "Zaproszenia do znajomych",
                data: friendInviteNotification,
              },
            ]} />
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
