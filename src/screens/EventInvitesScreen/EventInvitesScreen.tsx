import {
  View,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import React, {useContext, useEffect, useState} from "react";
import CustomInput from "../../components/CustomInput";
import {EventsContext} from "../../context/EventsContext";
import NotificationList from "../../components/NotificationList";
import {EventInviteNotification} from "../../types/notification";
import {useIsFocused} from "@react-navigation/native";
import {EventInvite} from "../../types/eventInvite";
import {ApiContext} from "../../context/ApiContext";

const EventInvitesScreen = () => {

  const { height } = useWindowDimensions();
  const [searchPhrase, setSearchPhrase] = useState("");
  const { getPendingEventInvites, pendingInvites } = useContext(EventsContext);
  const {post} = useContext(ApiContext);
  const [eventInviteNotification, setEventInviteNotification] = useState<EventInviteNotification[]>([]);

  useEffect(() => {
    let eventInvites: EventInviteNotification[] = pendingInvites.map(invite=> { return {
      'notificationType': 'eventInvite',
      'id': invite.id + '_event',
      'eventInvite': invite,
    }})

    setEventInviteNotification(searchPhrase ? eventInvites.filter(invite => {
      let matches = true;
      searchPhrase.split(' ').every(phrasePart => {
        if (!invite.eventInvite.event.name.toLowerCase().startsWith(phrasePart.toLowerCase())) {
          matches = false
          return false
        }
        return true
      })
      return matches
    }) : eventInvites)
  }, [pendingInvites, searchPhrase]);

  const setAllAsSeen = () => {
    post('event-invite/read-all', null, ()=>{
      getPendingEventInvites()
    })
  }

  const isFocused = useIsFocused()

  useEffect(() => {
    if (isFocused) {
      setAllAsSeen()
    }
  }, [isFocused])

  return (
      <>
        <View style={[styles.root, { height: height * 1 }]}>
          <View style={styles.windowTab}>
            <NotificationList inviteData={[
              {
                title: "Zaproszenia na wydarzenia",
                data: eventInviteNotification,
              },
            ]} />
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

export default EventInvitesScreen;
