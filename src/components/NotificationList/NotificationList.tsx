import React, {useContext} from "react";
import {View, Text, SectionList, StyleSheet, Image} from "react-native";
import CustomButton from "../CustomButton";
import {ApiContext} from "../../context/ApiContext";
import {FriendInvite} from "../../types/friendInvite";
import {FriendsContext} from "../../context/FriendsContext";

const API_ADDRESS = process.env.EXPO_PUBLIC_API_URL;
const FriendInviteItem = ({notification, accept, decline}) => (
    <View style={styles.notificationContainer}>
        <Image
            style={{width: 100, height: 100}}
            source={{uri: `${API_ADDRESS}/api/avatar/get/${notification.friendInvite.friend.id}`}}
        />
        <Text
            style={styles.name}>{notification.friendInvite.friend.name} {notification.friendInvite.friend.surname}</Text>
        <CustomButton
            text="Zaakceptuj"
            onPress={() => accept(notification.friendInvite)}
            type="PRIMARY"
            bgColor={undefined}
            fgColor={undefined}
        />
        <CustomButton
            text="Odrzuć"
            onPress={() => decline(notification.friendInvite)}
            type="PRIMARY"
            bgColor={undefined}
            fgColor={undefined}
        />
    </View>
);

const NotificationList = ({friendInviteData}) => {
    const {post} = useContext(ApiContext);
    const { getPendingFriendInvites, getFriendList } = useContext(FriendsContext);

    const acceptFriendInvite = (friendInvite: FriendInvite) => {
        post('friend-invite/update-status', {
            "friendInviteId": friendInvite.id,
            "transition": "accept"
        }, ()=>{
            getPendingFriendInvites()
            getFriendList()
        })
    }
    const declineFriendInvite = (friendInvite: FriendInvite) => {
        post('friend-invite/update-status', {
            "friendInviteId": friendInvite.id,
            "transition": "decline"
        }, ()=>{
            getPendingFriendInvites()
        })
    }

    return (
        <SectionList
            sections={friendInviteData}
            keyExtractor={(item, index) => item.id.toString()}
            renderSectionHeader={({section: {title}}) => (
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionHeaderText}>{title}</Text>
                </View>
            )}
            renderItem={({item}) => (
                <FriendInviteItem
                    notification={item}
                    accept={acceptFriendInvite}
                    decline={declineFriendInvite}
                />
            )}
            renderSectionFooter={({section}) =>
                section.data.length === 0 && (
                    <View style={styles.noEventsContainer}>
                        <Text style={styles.noEventsText}>Brak wydarzeń</Text>
                    </View>
                )
            }
        />
    )
};

const styles = StyleSheet.create({
    notificationContainer: {
        padding: 16,
        marginVertical: 4,
        backgroundColor: "#131417",
        borderRadius: 20,
        shadowColor: "black",
        shadowOffset: {width: 0, height: -3},
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    name: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#fff",
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
});

export default NotificationList;
