import React, { useContext } from "react";
import {
  View,
  Text,
  SectionList,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import CustomButton from "../CustomButton";
import { useNavigation } from "@react-navigation/native";
import { ChatContext } from "../../context/ChatContext";
import eventButton from "../../../assets/images/right-alt-yellow.png";

const ChatItem = ({ chat }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.chatContainer}>
      <View style={styles.chatDivText}>
        {chat.is_seen ? (
          ""
        ) : (
          <Text style={styles.nameNewMessage}>Nowa wiadomość</Text>
        )}
        <Text style={styles.name}>{chat.name}</Text>
      </View>
      <View style={styles.chatDivButton}>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate("Chat", { chatId: chat.id })}
        >
          <Image
            source={eventButton}
            style={styles.eventButtonImg}
            resizeMode="contain"
          />
        </TouchableWithoutFeedback>
        {/* <CustomButton
          text="Otwórz"
          onPress={() => navigation.navigate("Chat", { chatId: chat.id })}
          type="PRIMARY"
          bgColor={undefined}
          fgColor={undefined}
        /> */}
      </View>
    </View>
  );
};

const ChatList = ({ data }) => (
  <SectionList
    sections={data}
    keyExtractor={(item, index) => item.id.toString()}
    renderSectionHeader={({ section: { title } }) => (
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderText}>{title}</Text>
      </View>
    )}
    renderItem={({ item }) => <ChatItem chat={item} />}
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
    flexDirection: "row",
    alignItems: "center",
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
  chatDivText: {
    flex: 2 / 3,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  chatDivButton: {
    flex: 1 / 3,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  eventButtonImg: {
    width: 30,
    height: 30,
  },
  nameNewMessage: {
    color: "#ffffff",
    backgroundColor: "#F2B138",
    padding: 5,
    borderRadius: 10,
    marginBottom: 5,
    width: 125,
  },
});

export default ChatList;
