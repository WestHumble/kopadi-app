import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  Alert, ActivityIndicator,
} from "react-native";
import React, {useContext, useEffect, useState} from "react";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Geocoding from "react-native-geocoding";
import {Event} from "../../types/event";
import {Chat, ChatMessage} from "../../types/chat";
import {ChatContext} from "../../context/ChatContext";

const ChatMessageItem = ({ chat, chatMessage }) => {
  let friend = chat.participants.find(f => f.id === chatMessage.sender_id)

  return (
      <View style={chatMessage.sent_by_logged_user ? styles.selfMessageContainer : styles.messageContainer}>
        <Text style={styles.messageText}>{(friend?.name??'A') + ' ' + chatMessage.message_text}</Text>
      </View>
  );
}
const ChatScreen = ({route}) => {
  const { chatId } = route.params;

  const { height } = useWindowDimensions();
  const [chat, setChat] = useState<Chat>(null);
  const [chatMessagesList, setChatMessagesList] = useState<ChatMessage[]>([]);
  const {setChatById, setChatMessages} = useContext(ChatContext)

  useEffect(() => {
    setChat(null)
    setChatMessagesList([])
    setChatById(chatId, setChat)
    setChatMessages(chatId, setChatMessagesList)
  }, [chatId]);


  if (!chat) {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size={"large"} />
        </View>
    );
  }

  chatMessagesList.sort((c1, c2) => c1.created_at > c2.created_at)

  return (
    <>
      <View style={[styles.root, { height: height * 1 }]}>
        <View style={styles.windowTab}>
          <Text style={styles.title} resizeMode="contain">
            {chat.name}
          </Text>
          <ScrollView showsVerticalScrollIndicator={false}>
            {chatMessagesList.map((chatMessage)=>(<ChatMessageItem key={chatMessage.id}  chat={chat} chatMessage={chatMessage} />))}
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
  messageText: {
    fontSize: 14,
    fontWeight: "normal",
    color: "#999999",
  },
  messageContainer: {
    padding: 16,
    marginVertical: 4,
    backgroundColor: "#131417",
    borderRadius: 20,
    shadowColor: "black",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    maxWidth: "75%",
  },
  selfMessageContainer: {
    padding: 16,
    marginVertical: 4,
    backgroundColor: "#3c3f48",
    borderRadius: 20,
    shadowColor: "black",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    maxWidth: "75%",
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: "5%",
    color: "#fff",
  },
});

export default ChatScreen;
