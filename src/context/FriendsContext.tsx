import React, {createContext, useContext, useEffect, useRef, useState} from 'react';
import * as Location from "expo-location";
import {ApiContext} from "./ApiContext";
import {LocationContext} from "./LocationContext";
import {MarkerData} from "../types/marker";
import {Event} from "../types/event";
import {Alert, AppState} from "react-native";
import {Friend} from "../types/friend";
import * as Notifications from "expo-notifications";
import {FriendInvite} from "../types/friendInvite";
import {NavigationContext} from "./NavigationContext";

export const FriendsContext = createContext(null);

export const FriendsProvider = ({children}) => {

    const [friends, setFriends] = useState<Friend[]>([]);
    const [pendingInvites, setPendingInvites] = useState<FriendInvite[]>([]);
    const appState = useRef(AppState.currentState);

    const { get, userToken } = useContext(ApiContext);
    const { navigationRef } = useContext(NavigationContext);
    const getFriendList = () => {
        get('user/get-friends', null, (res) => {
            setFriends(res.data)
        })
    };
    const getPendingFriendInvites = () => {
        get('friend-invite/invites', null, (res) => {
            setPendingInvites(res.data)
        })
    };
    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(() => {
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            if ('new_friend' === notification.request.trigger.channelId) {
                getFriendList()
            }
            if ('new_friend_invite' === notification.request.trigger.channelId) {
                getPendingFriendInvites()
            }
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            if ('new_friend_invite' === response.notification.request.trigger.channelId) {
                navigationRef.current?.navigate('NotificationsList');
            }
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);

    useEffect(() => {
        if (userToken) {
            getFriendList()
            getPendingFriendInvites()
        } else {
            setFriends([])
            setPendingInvites([])
        }
    }, [userToken]);

    useEffect(() => {
        const subscription = AppState.addEventListener('change', nextAppState => {
            if (appState.current.match(/inactive|background/) &&
                nextAppState === 'active') {
                getFriendList()
                getPendingFriendInvites()
            }

            appState.current = nextAppState;
        });

        return () => {
            subscription.remove();
        };
    }, []);

    return (
        <FriendsContext.Provider value={{
            friends,
            getFriendList,
            pendingInvites,
            getPendingFriendInvites,
        }}>
            {children}
        </FriendsContext.Provider>
    );
}