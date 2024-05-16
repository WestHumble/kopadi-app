import {
  View,
  Text,
  StyleSheet,
  Image,
  useWindowDimensions,
  ScrollView,
  ActivityIndicator,
  Pressable,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Geocoding from "react-native-geocoding";
import { ApiContext } from "../../context/ApiContext";
import { EventsContext } from "../../context/EventsContext";
import { useNavigation } from "@react-navigation/native";
import { Event } from "../../types/event";
import eventImg from "../../../assets/images/emoji-beer-mug.png";
import { Friend } from "../../types/friend";
import { EventInvite } from "../../types/eventInvite";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import addFriendButtonImg from "../../../assets/images/add-user.png";
import addChatButtonImg from "../../../assets/images/chat.png";
import { LocationContext } from "../../context/LocationContext";

Geocoding.init(process.env.REACT_APP_GEOCODING_API_KEY);

const EventViewScreen = ({ route }) => {
  const { eventId } = route.params;

  const { height } = useWindowDimensions();
  const { setEventById, loadAllEvents } = useContext(EventsContext);
  const { mapViewRef } = useContext(LocationContext);
  const navigation = useNavigation();
  const [event, setEvent] = useState<Event>(null);
  const [chatExists, setChatExists] = useState(false);
  const { post } = useContext(ApiContext);
  const { userData, fetchUserData } = useContext(AuthContext);
  const [isLoadingUserData, setIsLoadingUserData] = useState<boolean>(false);
  const { getChatList, chats } = useContext(ChatContext);

  useEffect(() => {
    setEvent(null);
    setEventById(eventId, setEvent);
  }, [eventId]);

  useEffect(() => {
    let chatExists =
      event && event.chat_id && chats.find((e) => e.id === event.chat_id);
    setChatExists(chatExists);
    if (!chatExists && event && event.chat_id) {
      getChatList();
    }
  }, [event, chats]);

  const joinEvent = () => {
    post(
      "event/join",
      {
        eventId: eventId,
      },
      (res) => {
        loadAllEvents();
        setEventById(eventId, setEvent, true);
      }
    );
  };

  const leaveEvent = () => {
    post(
      "event/leave",
      {
        eventId: eventId,
      },
      (res) => {
        loadAllEvents();
        setEventById(eventId, setEvent, true);
      }
    );
  };

  const onLocationPressed = () => {
    if (event && event.latlng && mapViewRef.current) {
      mapViewRef.current.animateToRegion(
        {
          latitude: event.latlng.latitude,
          longitude: event.latlng.longitude,
          latitudeDelta: 0.14,
          longitudeDelta: 0.16,
        },
        0
      );
      navigation.navigate("Home");
    }
  };

  const onPressJoinEvent = () => {
    event.invite_status != "accepted" ? joinEvent() : leaveEvent();
  };

  const onInviteFriendsPressed = () => {
    navigation.navigate("InviteFriendsToEvent", { eventId });
  };

  const openChat = () => {
    getChatList();
    if (chatExists) {
      navigation.navigate("Chat", {
        chatId: event.chat_id,
      });
    }
  };

  if (!userData || !event) {
    if (event && !isLoadingUserData) {
      fetchUserData();
      setIsLoadingUserData(true);
    }
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
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.HeaderSection}>
              <Image
                source={eventImg}
                style={styles.eventImg}
                resizeMode="contain"
              />
              <View style={styles.HeaderSectionText}>
                <Text style={styles.titleSectionHeader} resizeMode="contain">
                  Nazwa wydarzenia
                </Text>
                <Text style={styles.title} resizeMode="contain">
                  {event.name}
                </Text>
              </View>
            </View>
            <Text style={styles.titleSectionDate} resizeMode="contain">
              Data i godzina
            </Text>
            <Text style={styles.date} resizeMode="contain">
              {new Date(event.date.date).toLocaleString([], {
                year: "numeric",
                month: "numeric",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
            <View style={styles.hr} />
            <Text style={styles.titleSectionAddress} resizeMode="contain">
              Lokalizacja wydarzenia
            </Text>
            <Pressable onPress={onLocationPressed}>
              <Text style={styles.address} resizeMode="contain">
                {event.address}
              </Text>
            </Pressable>
            <View style={styles.hr} />
            <Text style={styles.titleSectionDescription} resizeMode="contain">
              Opis wydarzenia
            </Text>
            <Text style={styles.description} resizeMode="contain">
              {event.description}
            </Text>
            <View style={styles.buttonsGroup}>
              {userData.id !== event.user_id && (
                <CustomButton
                  additionalStyles={styles.joinEventButton}
                  additionalStylesText={{
                    fontSize: 18,
                  }}
                  text={
                    event.invite_status != "accepted"
                      ? "Dołącz do wydarzenia"
                      : "Opuść wydarzenie"
                  }
                  onPress={onPressJoinEvent}
                  type="PRIMARY"
                  bgColor={undefined}
                  fgColor={undefined}
                />
              )}
              <View style={styles.divButtonsScd}>
                <View style={styles.addFriendButton}>
                  <Pressable onPress={onInviteFriendsPressed}>
                    <Image
                      source={addFriendButtonImg}
                      style={styles.refreshIcon}
                    />
                  </Pressable>
                </View>
                {chatExists && (
                  <View style={styles.addChatButton}>
                    <Pressable onPress={openChat}>
                      <Image
                        source={addChatButtonImg}
                        style={styles.chatIcon}
                      />
                    </Pressable>
                  </View>
                )}
              </View>
            </View>
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
  inputDate: {
    color: "#fff",
  },
  inputDateButton: {
    marginTop: 10,
    borderRadius: 20,
    paddingVertical: 0,
    marginBottom: 20,
  },
  textArea: { color: "#fff" },
  addEventButton: {
    marginTop: 0,
    borderRadius: 20,
    paddingVertical: 0,
    bottom: 0,
  },
  inputAddress: {
    color: "#fff",
  },
  inputEventName: {
    color: "#fff",
  },
  eventImg: {
    width: 70,
    height: 70,
    alignSelf: "flex-start",
    marginBottom: 0,
    overflow: "visible",
    zIndex: 1,
  },
  HeaderSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#131417",
    padding: 20,
    borderRadius: 20,
  },
  HeaderSectionText: {
    marginLeft: 20,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-end",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 5,
    color: "#fff",
  },
  date: {
    color: "#fff",
    fontSize: 24,
    marginBottom: 20,
    marginTop: 5,
  },
  address: {
    color: "#fff",
    fontSize: 24,
    marginBottom: 20,
    marginTop: 5,
  },
  description: {
    color: "#fff",
    fontSize: 24,
    marginBottom: 20,
    marginTop: 5,
  },
  hr: {
    borderBottomColor: "#676D75",
    borderBottomWidth: 1,
    marginVertical: 2,
  },
  titleSectionHeader: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#F2B138",
  },
  titleSectionDate: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#F2B138",
    marginTop: 20,
  },
  titleSectionAddress: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#F2B138",
    marginTop: 20,
  },
  titleSectionDescription: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#F2B138",
    marginTop: 20,
  },
  buttonsGroup: {
    flexDirection: "column",
  },
  divButtonsScd: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 3,
  },
  refreshIcon: {
    width: 20,
    height: 20,
    alignSelf: "center",
    tintColor: "#F2B138",
  },
  addFriendButton: {
    backgroundColor: "#1D1F24",
    borderRadius: 20,
    padding: 5,
    borderWidth: 1,
    borderColor: "#F2B138",
    flex: 1 / 2,
    height: 60,
    alignContent: "center",
    justifyContent: "center",
    marginHorizontal: 3,
  },
  addChatButton: {
    backgroundColor: "#1D1F24",
    borderRadius: 20,
    padding: 5,
    borderWidth: 1,
    borderColor: "#F2B138",
    flex: 1 / 2,
    height: 60,
    alignContent: "center",
    justifyContent: "center",
    marginHorizontal: 3,
  },
  chatIcon: {
    width: 20,
    height: 20,
    alignSelf: "center",
    tintColor: "#F2B138",
  },
  joinEventButton: {
    marginTop: 0,
  },
});

export default EventViewScreen;
