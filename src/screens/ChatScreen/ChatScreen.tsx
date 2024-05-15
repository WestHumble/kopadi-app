import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Geocoding from "react-native-geocoding";
import { Event } from "../../types/event";
import { Chat, ChatMessage } from "../../types/chat";
import { ChatContext } from "../../context/ChatContext";
import { ApiContext } from "../../context/ApiContext";
import * as Notifications from "expo-notifications";
import { NavigationContext } from "../../context/NavigationContext";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import Avatar from "../../components/Avatar";

const ChatMessageItem = ({ chat, chatMessage, displayFriend }) => {
  let friend = chat.participants.find((f) => f.id === chatMessage.sender_id);

  return (
    <View
      style={
        chatMessage.sent_by_logged_user
          ? styles.selfMessageContainer
          : styles.messageContainer
      }
    >
      {!chatMessage.sent_by_logged_user && (<View style={styles.avatarColumn}>
        <Avatar
            userId={friend?.id}
            userName={friend?.name}
            userSurname={friend?.surname}
            style={styles.avatarImage}
            allowRedirect={true}
        />
      </View>)}


      <View style={styles.messColumn}>
        <Text
          style={
            chatMessage.sent_by_logged_user
              ? styles.selfMessageFriendName
              : styles.messageFriendName
          }
        >
          {friend?.name}
        </Text>
        <Text style={styles.messageText}>{chatMessage.message_text}</Text>
      </View>
    </View>
  );
};
const ChatScreen = ({ route }) => {
  const { chatId } = route.params;
  const scrollRef = useRef(null);
  const { height } = useWindowDimensions();
  const [message, setMessage] = useState<string>(null);
  const [sendingMessage, setSendingMessage] = useState<string>(null);
  const {
    setChatId,
    getChatById,
    setChatMessages,
    setChatAsRead,
    refreshTime,
  } = useContext(ChatContext);
  const [chat, setChat] = useState<Chat>(null);
  const { post } = useContext(ApiContext);
  const notificationListener = useRef();

  const onSendMessage = () => {
    setSendingMessage(true);
    post(
      "chat/message",
      {
        conversationId: chatId,
        textMessage: message,
      },
      (res) => {
        setChatMessages(chatId);
        setSendingMessage(false);
      },
      (res) => {
        setSendingMessage(false);
      }
    );
    setMessage(null);
  };

  useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: false });
  }, [chat, refreshTime]);

  useEffect(() => {
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setTimeout(
          () =>
            setChatMessages(
              JSON.parse(
                JSON.parse(notification.request.trigger.remoteMessage.data.body)
                  .payload
              ).conversation_id
            ),
          1000
        );
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
    };
  }, [chat]);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      setChatId(chatId);
      setChat(getChatById(chatId));
      setChatMessages(chatId);
      setChatAsRead(chatId);
    }
  }, [isFocused, chatId]);

  if (!chat || chat.id !== chatId) {
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
            {chat.name}
          </Text>
          <ScrollView
            ref={scrollRef}
            contentOffset={{ x: 0, y: 9999 }}
            showsVerticalScrollIndicator={false}
          >
            {chat.messages?.map((chatMessage) => (
              <ChatMessageItem
                key={chatMessage.id}
                chat={chat}
                chatMessage={chatMessage}
                displayFriend={
                  chat.event_name !== null || chat.participants.length > 2
                }
              />
            ))}
          </ScrollView>
          <View style={styles.messSendContainer}>
            <View style={{ flex: 3 / 4, marginRight: 10 }}>
              <CustomInput
                placeholder="Napisz wiadomość"
                value={message}
                setValue={setMessage}
                secureTextEntry={undefined}
                additionalStyle={styles.searchInput}
              />
            </View>
            <View style={{ flex: 1 / 4 }}>
              <CustomButton
                text={
                  sendingMessage ? (
                    <ActivityIndicator size={"large"} />
                  ) : (
                    "Wyślij"
                  )
                }
                disabled={sendingMessage}
                onPress={onSendMessage}
                type="PRIMARY"
                bgColor={undefined}
                fgColor={undefined}
                additionalStylesText={styles.sendButton}
              />
            </View>
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
  messageText: {
    fontSize: 14,
    fontWeight: "normal",
    color: "#999999",
  },
  sendButton: {
    fontSize: 16,
  },
  searchInput: { color: "#fff" },
  messSendContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
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
    alignSelf: "flex-start",
    flexDirection: "row",
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
    alignSelf: "flex-end",
    flexDirection: "row",
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

  avatarImage: {
    width: 25,
    height: 25,
    borderRadius: 25,
    backgroundColor: "#F2B138",
    marginRight: 5,
    marginTop: 3,
  },
  messageFriendName: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#fff",
  },
  avatarColumn: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    flex: 0.2,
  },
  messColumn: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    flex: 1,
  },
  selfMessageFriendName: {
    display: "none",
  },
});

export default ChatScreen;
