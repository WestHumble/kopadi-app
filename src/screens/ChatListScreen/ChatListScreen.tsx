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
import {ChatContext} from "../../context/ChatContext";
import ChatList from "../../components/ChatList";

const ChatListScreen = () => {
  const { height } = useWindowDimensions();
  const [searchPhrase, setSearchPhrase] = useState("");
  const { chats } = useContext(ChatContext);

  return (
      <>
        <View style={[styles.root, { height: height * 1 }]}>
          <View style={styles.windowTab}>
            <ChatList data={[
                {
                  title: "Chaty",
                  data: searchPhrase ? chats.filter(chat => {
                    let matches = true;
                    searchPhrase.split(' ').every(phrasePart => {
                      if (!chat.name.toLowerCase().includes(phrasePart.toLowerCase())) {
                        matches = false
                        return false
                      }
                      return true
                    })
                    return matches
                  }) : chats,
                },
              ]}/>
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

export default ChatListScreen;
