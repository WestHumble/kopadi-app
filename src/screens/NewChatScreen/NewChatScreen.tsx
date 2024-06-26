import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import CustomInput from "../../components/CustomInput";
import { FriendsContext } from "../../context/FriendsContext";
import FriendList from "../../components/FriendList";
import { Friend } from "../../types/friend";
import CustomButton from "../../components/CustomButton";
import { ChatContext } from "../../context/ChatContext";
import { useIsFocused } from "@react-navigation/native";

const NewChatScreen = () => {
  const { height } = useWindowDimensions();
  const [searchPhrase, setSearchPhrase] = useState("");
  const { friends } = useContext(FriendsContext);
  const { initChat, initializingChat } = useContext(ChatContext);
  const [pickedFriends, setPickedFriends] = useState<Friend[]>([]);

  const pickFriend = (friend: Friend) => {
    setPickedFriends([...pickedFriends, friend]);
  };
  const removeFriend = (friend: Friend) => {
    setPickedFriends(pickedFriends.filter((f) => f.id !== friend.id));
  };
  const onInitChatPressed = () => {
    if (pickedFriends.length === 0) {
      Alert.alert("Wybierz przynajmniej jednego znajomego");
      return;
    }
    initChat(pickedFriends);
    setPickedFriends([]);
  };
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      setPickedFriends([]);
    }
  }, [isFocused]);
  const data = [
    {
      title: "Dodaj znajomych",
      data: searchPhrase
        ? friends.filter((friend) => {
            let matches = true;
            searchPhrase.split(" ").every((phrasePart) => {
              if (
                !friend.name
                  .toLowerCase()
                  .startsWith(phrasePart.toLowerCase()) &&
                !friend.surname
                  .toLowerCase()
                  .startsWith(phrasePart.toLowerCase())
              ) {
                matches = false;
                return false;
              }
              return true;
            });
            return matches;
          })
        : friends,
    },
  ];

  if (initializingChat) {
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
          <FriendList
            noDataText={"Brak znajomych"}
            data={data}
            action={(friend) => {
              pickedFriends.find((e) => e.id === friend.id)
                ? removeFriend(friend)
                : pickFriend(friend);
            }}
            actionText={(friend) => {
              return pickedFriends.find((e) => e.id === friend.id)
                ? "Usuń"
                : "Dodaj";
            }}
          />
          <View style={styles.searchContainer}>
            <CustomInput
              placeholder="Szukaj"
              value={searchPhrase}
              setValue={setSearchPhrase}
              secureTextEntry={undefined}
              additionalStyle={styles.searchInput}
            />
            <CustomButton
              text="Utwórz czat"
              onPress={onInitChatPressed}
              type="PRIMARY"
              bgColor={undefined}
              fgColor={undefined}
              additionalStyles={styles.newChatButton}
            />
          </View>
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
  newChatButton: {
    fontSize: 50,
    flex: 1 / 3,
  },
  searchInput: {
    color: "#fff",
    flex: 1,
    marginRight: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 0,
  },
});

export default NewChatScreen;
