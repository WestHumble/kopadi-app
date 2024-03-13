import React from "react";
import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import {Text, View, Button, Platform, StyleSheet, AppState} from "react-native";
import Navigation from "./src/navigation";
import { ApiProvider } from "./src/context/ApiContext";
import { AuthProvider } from "./src/context/AuthContext";
import { LocationProvider } from "./src/context/LocationContext";
import { useState, useEffect, useRef } from 'react';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true, //AppState.currentState !== 'active',
        shouldPlaySound: false,
        shouldSetBadge: false,

    }),
});

async function registerForPushNotificationsAsync() {
    let token;

    console.log(Platform.OS)
    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('test', {
            name: 'test',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }


    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync({
            projectId: 'ff57d77b-51b0-41b5-b0f6-bae96e24294a'
        })).data;
        console.log("Expo push token:", token);

    } else {
        alert('Must use physical device for Push Notifications');
    }

    return token.data;
}
const App = () => {
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
            console.log(notification)
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);


    return (
    <ApiProvider>
      <AuthProvider>
          <LocationProvider>
            <View style={styles.root}>
              <Navigation />
              <StatusBar style="auto" />
            </View>
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>
                  <Text>Your expo push token: {expoPushToken}</Text>
                  <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                      <Text>Title: {notification && notification.request.content.title} </Text>
                      <Text>Body: {notification && notification.request.content.body}</Text>
                      <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
                  </View>
                  <Button
                      title="Press to Send Notification"
                      onPress={async () => {
                          await sendPushNotification(expoPushToken);
                      }}
                  />
              </View>
          </LocationProvider>
      </AuthProvider>
    </ApiProvider>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#131417",
  },
});

export default App;
