import React, {createContext, useContext, useEffect, useRef, useState} from 'react';
import * as Location from "expo-location";
import {ApiContext} from "./ApiContext";
import {LocationContext} from "./LocationContext";
import {MarkerData} from "../types/marker";
import {Event} from "../types/event";
import {Alert, AppState} from "react-native";
import {Friend} from "../types/friend";
import * as Notifications from "expo-notifications";

export const FriendsContext = createContext(null);

export const FriendsProvider = ({children}) => {
    const [friends, setFriends] = useState<Friend[]>([]);
    const appState = useRef(AppState.currentState);

    const { get, userToken } = useContext(ApiContext);
    const getFriendList = () => {
        get('user/get-friends', null, (res) => {
            setFriends(res.data)
        })
    };
    const notificationListener = useRef();

    useEffect(() => {
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            if ('new_friend' === notification.request.trigger.channelId) {
                getFriendList()
            }
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
        };
    }, []);

    useEffect(() => {
        if (userToken) {
            getFriendList()
        } else {
            setFriends([])
        }
    }, [userToken]);

    useEffect(() => {
        const subscription = AppState.addEventListener('change', nextAppState => {
            if (appState.current.match(/inactive|background/) &&
                nextAppState === 'active') {
                getFriendList()
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
        }}>
            {children}
        </FriendsContext.Provider>
    );
}