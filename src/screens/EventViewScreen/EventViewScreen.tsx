import {
  View,
  Text,
  StyleSheet,
  Image,
  useWindowDimensions,
  ScrollView,
  ActivityIndicator,
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
import {Friend} from "../../types/friend";
import {EventInvite} from "../../types/eventInvite";

Geocoding.init(process.env.REACT_APP_GEOCODING_API_KEY);

const EventViewScreen = ({ route }) => {
  const { eventId } = route.params;

  const { height } = useWindowDimensions();
  const { setEventById, loadAllEvents } = useContext(EventsContext);
  const navigation = useNavigation();
  const [event, setEvent] = useState<Event>(null);
  const { post } = useContext(ApiContext);

  useEffect(() => {
    setEvent(null);
    setEventById(eventId, setEvent);
  }, [eventId]);

  const joinEvent = () => {
    post('event/join', {
      eventId: eventId
    }, (res) => {
      loadAllEvents()
    })
  };

  const leaveEvent = () => {
    console.log('leaveEvent')
      // post('event-invite/update-status', {
      //   "eventInviteId": eventInvite.id,
      //   "transition": "accept"
      // }, ()=>{
      //   getPendingEventInvites()
      //   loadAllEvents()
      //   clearSearchEvents()
      // })
  };

  const onPressJoinEvent = () => {
    event.invite_status != 'accepted' ? joinEvent() : leaveEvent()
  };

  const onInviteFriendsPressed = () => {
    navigation.navigate("InviteFriendsToEvent", { eventId });
  };

  if (!event) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }

  return (
    <>
      <View style={[styles.root, { height: height * 1 }]}>
        <View style={styles.windowTab}>
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
          <Text style={styles.address} resizeMode="contain">
            {event.address}
          </Text>
          <View style={styles.hr} />
          <Text style={styles.titleSectionDescription} resizeMode="contain">
            Opis wydarzenia
          </Text>
          <Text style={styles.description} resizeMode="contain">
            {event.description}
          </Text>

          <CustomButton
            additionalStyles={{
              margin: 0,
            }}
            additionalStylesText={{
              fontSize: 20,
            }}
            text={event.invite_status != 'accepted' ? "Dołącz do wydarzenia" : "Opuść wydarzenie"}
            onPress={onPressJoinEvent}
            type="PRIMARY"
            bgColor={undefined}
            fgColor={undefined}
          />
          <CustomButton
            text="Zaproś znajomych"
            onPress={onInviteFriendsPressed}
            type="PRIMARY"
            bgColor={undefined}
            fgColor={undefined}
            additionalStyles={styles.addEventButton}
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
    alignSelf: "left",
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
    marginVertical: 10,
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
});

export default EventViewScreen;
