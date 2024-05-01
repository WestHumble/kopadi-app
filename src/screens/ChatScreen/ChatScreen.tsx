import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  Alert, ActivityIndicator,
} from "react-native";
import React, {useContext, useEffect, useRef, useState} from "react";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Geocoding from "react-native-geocoding";
import {Event} from "../../types/event";
import {Chat, ChatMessage} from "../../types/chat";
import {ChatContext} from "../../context/ChatContext";
import {ApiContext} from "../../context/ApiContext";
import * as Notifications from "expo-notifications";
import {NavigationContext} from "../../context/NavigationContext";
import {useFocusEffect, useIsFocused} from "@react-navigation/native";

const ChatMessageItem = ({ chat, chatMessage, displayFriend }) => {
  let friend = chat.participants.find(f => f.id === chatMessage.sender_id)

  return (
      <View style={chatMessage.sent_by_logged_user ? styles.selfMessageContainer : styles.messageContainer}>
        <Text style={styles.messageText}>{(displayFriend ? (friend?.name??'Anon') + ' ' : ' ') + chatMessage.message_text}</Text>
      </View>
  );
}
const ChatScreen = ({route}) => {
  const { chatId } = route.params;
  const scrollRef = useRef(null)
  const { height } = useWindowDimensions();
  const [message, setMessage] = useState<string>(null);
  const { chat, setChat, setChatById, setChatMessages, setChatAsRead} = useContext(ChatContext)
  const { post } = useContext(ApiContext);
  const notificationListener = useRef();

  const onSendMessage = () => {
    post('chat/message', {
      conversationId: chatId,
      textMessage: message
    }, (res) => {
      setChatMessages()
    })
    setMessage(null)
  }

  useEffect(() => {
    setChatById(chatId, setChat)
  }, [chatId]);

  useEffect(() => {
    setChatMessages()
  }, [chat]);

  useEffect(() => {
    scrollRef.current?.scrollToEnd({animated: false})
  }, [chat, chat?.messages]);

  useEffect(() => {
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      if(JSON.parse(JSON.parse(notification.request.trigger.remoteMessage.data.body).payload).conversation_id === chat.id) {
        setChatMessages()
      }
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
    };
  }, [chat]);

  const isFocused = useIsFocused()

  useEffect(() => {
    if (isFocused) {
      setChatAsRead(chatId)
    }
  }, [isFocused, chatId])


  if (!chat || chat.id !== chatId) {
    return (
        <View style={{ flex: 1, justifyContent: "center",
          backgroundColor: "#131417",alignItems: "center" }}>
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
          <ScrollView ref={scrollRef} contentOffset={{x:0, y:9999}} showsVerticalScrollIndicator={false}>
            {chat?.messages?.map((chatMessage)=> {
              if (chatMessage.chat_id === chatId) return (<ChatMessageItem key={chatMessage.id}  chat={chat} chatMessage={chatMessage} displayFriend={chat.participants.length > 2}/>)
            })}
          </ScrollView>
          <CustomInput
              placeholder="Napisz wiadomość"
              value={message}
              setValue={setMessage}
              secureTextEntry={undefined}
              additionalStyle={styles.searchInput}
          />
          <CustomButton
              text="Wyślij"
              onPress={onSendMessage}
              type="PRIMARY"
              bgColor={undefined}
              fgColor={undefined}
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
  searchInput: {color: "#fff"},
});

export default ChatScreen;
