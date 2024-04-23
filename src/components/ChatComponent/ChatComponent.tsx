
import React, {useEffect, useRef, useState} from "react";
import * as Notifications from "expo-notifications";
import {AppState} from "react-native";

const ChatComponent = () => {
    const notificationListener = useRef();
    const responseListener = useRef();

    const appState = useRef(AppState.currentState);
    useEffect(() => {
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            // console.log('ChatComponent notificationListener3')
            // console.log(notification.request.trigger.remoteMessage.data.payload)
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            // console.log('ChatComponent responseListener');
        });


        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);

  return (
    <>
    </>
  );
};

export default ChatComponent;
