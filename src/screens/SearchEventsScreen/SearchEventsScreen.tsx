import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import React, {useContext, useState} from "react";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import EventList from "../../components/EventList";
import {LocationContext} from "../../context/LocationContext";
import {EventsContext} from "../../context/EventsContext";

const SearchEventsScreen = () => {
  const navigation = useNavigation();
  const { height } = useWindowDimensions();

  const { eventsCreated, eventsInvited, eventsOther } =
      useContext(EventsContext);

  const data = [
    {
      title: "Wydarzenia Moje",
      data: eventsCreated,
    },
    {
      title: "Wydarzenia Znajomych",
      data: eventsInvited,
    },
    {
      title: "Wydarzenia Publiczne",
      data: eventsOther,
    },
  ];

  const onRefreshPressed = () => {
    console.log("Odświeżono");
  };

  return (
    <>
      <View style={[styles.root, { height: height * 1 }]}>
        <View style={styles.windowTab}>
            <EventList data={data} />
          <CustomButton
            text="Odśwież"
            onPress={onRefreshPressed}
            type="PRIMARY"
            bgColor={undefined}
            fgColor={undefined}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "#131417",
    flex: 1,
  },
  windowTab: {
    height: "75%",
    width: "100%",
    backgroundColor: "#1D1F24",
    top: "7%",
    borderRadius: 20,
    padding: 20,
  },
  text: {
    color: "#999999",
    marginTop: 20,
    marginBottom: 25,
  },
  link: {
    color: "#003f63",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: "5%",
    color: "#fff",
  },
});

export default SearchEventsScreen;
