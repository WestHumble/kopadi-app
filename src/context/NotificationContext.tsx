import React, {createContext, useContext, useEffect, useState} from 'react';
import * as Location from "expo-location";
import {ApiContext} from "./ApiContext";
import * as Notifications from "expo-notifications";
import {AppState, Platform} from "react-native";
import * as Device from "expo-device";

export const NotificationContext = createContext(null);

Notifications.setNotificationHandler({
    handleNotification: async (notification) => {
        return ({
            shouldShowAlert: true,
            shouldPlaySound: false,
            shouldSetBadge: false,
        })
    },
});

async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('new_friend', {
            name: 'new_friend',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
            showBadge: false,
        });
        Notifications.setNotificationChannelAsync('new_event_invite', {
            name: 'new_event_invite',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
            showBadge: false,
        });
        Notifications.setNotificationChannelAsync('new_friend_invite', {
            name: 'new_friend_invite',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
            showBadge: false,
        });
        Notifications.setNotificationChannelAsync('chat', {
            name: 'chat',
            importance: Notifications.AndroidImportance.NONE,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
            showBadge: false,
        });
        Notifications.setNotificationChannelAsync('chat_init', {
            name: 'chat_init',
            importance: Notifications.AndroidImportance.NONE,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
            showBadge: false,
        });
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
            showBadge: false,
        });
    }

    if (Device.isDevice) {
        const {status: existingStatus} = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const {status} = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync({
            projectId: process.env.EXPO_PUBLIC_EAS_ID,
        })).data;
    } else {
        alert('Must use physical device for Push Notifications');
    }
    return token;
}

export const NotificationProvider = ({children}) => {
    const [expoPushToken, setExpoPushToken] = useState('');
    const {post, userToken} = useContext(ApiContext);

    useEffect(() => {
        if (userToken && expoPushToken) {
            post('push-token/setup', {
                pushToken: expoPushToken
            })
        }
    }, [expoPushToken, userToken]);

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
    }, []);
    return (
        <NotificationContext.Provider value={{expoPushToken}}>
            {children}
        </NotificationContext.Provider>
    );
}