import React, {useContext} from "react";
import {View, Text, SectionList, StyleSheet, Image} from "react-native";
import CustomButton from "../CustomButton";
import {NavigationContext} from "../../context/NavigationContext";
import {useNavigation} from "@react-navigation/native";

const API_ADDRESS = process.env.EXPO_PUBLIC_API_URL;
const ChatItem = ({ chat }) => {
  const navigation = useNavigation()
  return (
      <View style={styles.chatContainer}>
        <Text style={styles.name}>{chat.name}</Text>
        <CustomButton
            text="Otwórz"
            onPress={() => navigation.navigate("Chat", {chatId: chat.id})}
            type="PRIMARY"
            bgColor={undefined}
            fgColor={undefined}
        />
      </View>
  );
}

const ChatList = ({ data }) => (
  <SectionList
    sections={data}
    keyExtractor={(item, index) => item.id.toString()}
    renderSectionHeader={({ section: { title } }) => (
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderText}>{title}</Text>
      </View>
    )}
    renderItem={({ item }) => (
      <ChatItem
          chat={item}
      />
    )}
    renderSectionFooter={({ section }) =>
      section.data.length === 0 && (
        <View style={styles.noFriendsContainer}>
          <Text style={styles.noFriendsText}>Brak znajomych</Text>
        </View>
      )
    }
  />
);

const styles = StyleSheet.create({
  chatContainer: {
    padding: 16,
    marginVertical: 4,
    backgroundColor: "#131417",
    borderRadius: 20,
    shadowColor: "black",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  sectionHeader: {
    color: "#fff",
    padding: 8,
    marginTop: 12,
  },
  sectionHeaderText: {
    fontSize: 21,
    fontWeight: "bold",
    color: "#fff",
  },
  noFriendsContainer: {
    padding: 16,
    alignItems: "center",
  },
  noFriendsText: {
    fontSize: 16,
    color: "#888",
  },
});

export default ChatList;
