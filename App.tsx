import React from "react";
import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { View, StyleSheet } from "react-native";
import Navigation from "./src/navigation";
import { ApiProvider } from "./src/context/ApiContext";
import { AuthProvider } from "./src/context/AuthContext";
import { LocationProvider } from "./src/context/LocationContext";
import {NotificationProvider} from "./src/context/NotificationContext";
import {EventsProvider} from "./src/context/EventsContext";
import {FriendsProvider} from "./src/context/FriendsContext";
import {NavigationProvider} from "./src/context/NavigationContext";
import {AppProvider} from "./src/context/AppStateContext";

const App = () => {
    return (
        <NavigationProvider>
            <ApiProvider>
              <AuthProvider>
                  <NotificationProvider>
                      <LocationProvider>
                          <FriendsProvider>
                              <EventsProvider>
                                  <AppProvider>
                                      <View style={styles.root}>
                                          <Navigation />
                                          <StatusBar style="auto" />
                                      </View>
                                  </AppProvider>
                              </EventsProvider>
                          </FriendsProvider>
                      </LocationProvider>
                  </NotificationProvider>
              </AuthProvider>
            </ApiProvider>
        </NavigationProvider>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#131417",
  },
});

export default App;
