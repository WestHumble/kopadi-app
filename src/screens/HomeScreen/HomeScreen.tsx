import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { MapViewComponent } from "../../components/MapViewComponent";

const HomeScreen = () => {
  return (
    <View>
      <MapViewComponent />
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
});

export default HomeScreen;
