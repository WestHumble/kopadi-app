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

const SearchNewFriendsScreen = () => {
  const { height } = useWindowDimensions();
  const [searchPhrase, setSearchPhrase] = useState("");
  const { post } = useContext(ApiContext);
  const { friends, inviteSent, sendFriendInvite, deleteFriendInvite  } = useContext(FriendsContext);
  const [searchFriends, setSearchFriends] = useState<Friend[]>([]);

  const triggerSearchFriends = () => {
    post('user/search', {
      searchPhrase
    }, (res) => {
      setSearchFriends(res.data)
    })
  };

  useEffect(() => {
    if (searchPhrase) {
      triggerSearchFriends()
    }
  }, [searchPhrase]);

  return (
    <>
      <View style={[styles.root, { height: height * 1 }]}>
        <View style={styles.windowTab}>
          <FriendList
              data={[
                {
                  title: "Szukaj nowych znajomych",
                  data: searchPhrase ? searchFriends : [],
                },
              ]}
              action={friend=>{inviteSent.find(e => e.id === friend.id) || friends.find(e => e.id === friend.id) ? deleteFriendInvite(friend) : sendFriendInvite(friend)}}
              actionText={friend=>{ return inviteSent.find(e => e.id === friend.id) || friends.find(e => e.id === friend.id) ? "Usuń" : "Dodaj"}}
          />
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

export default SearchNewFriendsScreen;
