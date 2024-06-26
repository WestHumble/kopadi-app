import React, { useContext } from "react";
import {
  View,
  Text,
  SectionList,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import CustomButton from "../CustomButton";
import { ApiContext } from "../../context/ApiContext";
import { FriendInvite } from "../../types/friendInvite";
import { FriendsContext } from "../../context/FriendsContext";
import { FriendInviteNotification } from "../../types/notification";
import { EventsContext } from "../../context/EventsContext";
import { EventInvite } from "../../types/eventInvite";
import Avatar from "../Avatar";
import refusalButton from "../../../assets/images/no.png";
import acceptButton from "../../../assets/images/accept.png";
import {useNavigation} from "@react-navigation/native";

const API_ADDRESS = process.env.EXPO_PUBLIC_API_URL;
const FriendInviteItem = ({ notification }) => {
  const { post } = useContext(ApiContext);
  const { getPendingFriendInvites, getFriendList } = useContext(FriendsContext);
  const acceptInvite = (friendInvite: FriendInvite) => {
    post(
      "friend-invite/update-status",
      {
        friendInviteId: friendInvite.id,
        transition: "accept",
      },
      () => {
        getPendingFriendInvites();
        getFriendList();
      }
    );
  };
  const declineInvite = (friendInvite: FriendInvite) => {
    post(
      "friend-invite/update-status",
      {
        friendInviteId: friendInvite.id,
        transition: "decline",
      },
      () => {
        getPendingFriendInvites();
      }
    );
  };
  return (
    <View style={styles.notificationContainer}>
      <View style={styles.notificationFriendsName}>
        <Avatar
          style={{
            width: 50,
            height: 50,
            borderRadius: 5,
            marginRight: 10,
            padding: 1,
            shadowColor: "black",
            backgroundColor: "#F2B138",
          }}
          userId={notification.friendInvite.friend.id}
          userName={notification.friendInvite.friend.name}
          userSurname={notification.friendInvite.friend.surname}
        />
        <Text style={styles.name}>
          {notification.friendInvite.friend.name}{" "}
          {notification.friendInvite.friend.surname}
        </Text>
      </View>
      <View style={styles.buttonsFriends}>
        <View style={styles.acceptButton}>
          <TouchableWithoutFeedback
            onPress={() => acceptInvite(notification.friendInvite)}
          >
            <Image
              source={acceptButton}
              style={styles.acceptButtonImg}
              resizeMode="contain"
            />
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.refusalButton}>
          <TouchableWithoutFeedback
            onPress={() => declineInvite(notification.friendInvite)}
          >
            <Image
              source={refusalButton}
              style={styles.refusalButtonImg}
              resizeMode="contain"
            />
          </TouchableWithoutFeedback>
        </View>
      </View>
    </View>
  );
};

const EventInviteItem = ({ notification }) => {
  const { post } = useContext(ApiContext);
  const { getPendingEventInvites, loadAllEvents, clearSearchEvents } =
    useContext(EventsContext);
  const navigation = useNavigation();
  const acceptInvite = (eventInvite: EventInvite) => {
    post(
      "event-invite/update-status",
      {
        eventInviteId: eventInvite.id,
        transition: "accept",
      },
      () => {
        getPendingEventInvites();
        loadAllEvents();
        clearSearchEvents();
      }
    );
  };
  const declineInvite = (eventInvite: EventInvite) => {
    post(
      "event-invite/update-status",
      {
        eventInviteId: eventInvite.id,
        transition: "decline",
      },
      () => {
        getPendingEventInvites();
      }
    );
  };
  return (
    <View style={styles.notificationContainer}>
        <TouchableWithoutFeedback
            onPress={() => navigation.navigate("EventView", { eventId: notification.eventInvite.event.id })}
        >
          <Text style={styles.name}>{notification.eventInvite.event.name}</Text>
        </TouchableWithoutFeedback>
      <View style={styles.buttons}>
        <View style={styles.acceptButton}>
          <TouchableWithoutFeedback
            onPress={() => acceptInvite(notification.eventInvite)}
          >
            <Image
              source={acceptButton}
              style={styles.acceptButtonImg}
              resizeMode="contain"
            />
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.refusalButton}>
          <TouchableWithoutFeedback
            onPress={() => declineInvite(notification.eventInvite)}
          >
            <Image
              source={refusalButton}
              style={styles.refusalButtonImg}
              resizeMode="contain"
            />
          </TouchableWithoutFeedback>
        </View>
      </View>
    </View>
  );
};

const NotificationList = ({ inviteData }) => {
  return (
    <SectionList
      sections={inviteData}
      keyExtractor={(item, index) => item.id.toString()}
      renderSectionHeader={({ section: { title } }) => (
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionHeaderText}>{title}</Text>
        </View>
      )}
      renderItem={({ item }) => {
        if (item.notificationType === "friendInvite")
          return <FriendInviteItem notification={item} />;
        if (item.notificationType === "eventInvite")
          return <EventInviteItem notification={item} />;
      }}
      renderSectionFooter={({ section }) =>
        section.data.length === 0 && (
          <View style={styles.noEventsContainer}>
            <Text style={styles.noEventsText}>Brak</Text>
          </View>
        )
      }
    />
  );
};

const styles = StyleSheet.create({
  notificationContainer: {
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
    flex: 2 / 3,
  },
  notificationFriendsName: {
    flexDirection: "row",
    alignItems: "center",
    flex: 2 / 3,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  date: {
    color: "#888",
  },
  location: {
    color: "#888",
  },
  description: {
    marginTop: 8,
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
  noEventsContainer: {
    padding: 16,
    alignItems: "center",
  },
  noEventsText: {
    fontSize: 16,
    color: "#888",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
    flex: 1 / 3,
  },
  acceptButton: {
    marginRight: 10,
  },
  refusalButton: {
    marginLeft: 10,
  },
  acceptButtonImg: {
    width: 30,
    height: 30,
  },
  refusalButtonImg: {
    width: 30,
    height: 30,
  },
  buttonsFriends: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
    flex: 1 / 3,
  },
});

export default NotificationList;
