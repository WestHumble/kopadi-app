import React, { useState } from "react";
import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { View, Text, Button, StyleSheet } from "react-native";
import Navigation from "./src/navigation";

const App = () => {
  return (
    <View style={styles.root}>
      <Navigation />
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
