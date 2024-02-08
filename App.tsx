import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View, Text, Button, StyleSheet } from "react-native";
import SignInScreen from "./src/screens/SignInScreen";

const App = () => {
  return (
    <View style={styles.root}>
      <SignInScreen />
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#f9fbfc",
  },
});

export default App;
