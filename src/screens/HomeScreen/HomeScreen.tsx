import { View, Text, StyleSheet } from "react-native";
import React, {useEffect, useState} from "react";
import { MapViewComponent } from "../../components/MapViewComponent";
import EventSource from 'react-native-event-source'

const HomeScreen = () => {

  useEffect(() => {
    const eventSource = new EventSource("https://mercure-test-2.loca.lt/.well-known/mercure?topic=%2Fsomething%2F1");
    console.log("test");
    eventSource.addEventListener('message', (data) => {
      console.log("message");
      console.log(data.type);
      console.log(data.data);
    });
  }, []);
  return (
    <View style={styles.root}>
      <MapViewComponent />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

export default HomeScreen;
