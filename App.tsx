import React from "react";
import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { View, StyleSheet } from "react-native";
import Navigation from "./src/navigation";
import { ApiProvider } from "./src/context/ApiContext";
import { AuthProvider } from "./src/context/AuthContext";
import { LocationProvider } from "./src/context/LocationContext";

const App = () => {
  return (
    <ApiProvider>
      <AuthProvider>
          <LocationProvider>
            <View style={styles.root}>
              <Navigation />
              <StatusBar style="auto" />
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
