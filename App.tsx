import React from "react";
import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { View, StyleSheet } from "react-native";
import Navigation from "./src/navigation";
import { AuthProvider } from "./src/context/AuthContext";
import {LocationProvider} from "./src/context/LocationContext";

const App = () => {
  return (
  <AuthProvider>
    <LocationProvider>
      <View style={styles.root}>
        <Navigation />
        <StatusBar style="auto" />
      </View>
    </LocationProvider>
  </AuthProvider>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#f9fbfc",
  },
});

export default App;
