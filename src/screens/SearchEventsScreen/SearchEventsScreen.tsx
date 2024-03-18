import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import EventList from "../../components/EventList";

const SearchEventsScreen = () => {
  const navigation = useNavigation();
  const { height } = useWindowDimensions();

  const data = [
    {
      title: "Wydarzenia Moje i Znajomych",
      data: [
        {
          id: 3,
          title: "Moje Wydarzenie 1",
          date: "2024-03-12",
          location: "Moja Lokalizacja 1",
          description: "Opis mojego wydarzenia 1",
        },
        {
          id: 4,
          title: "Znajomych Wydarzenie 1",
          date: "2024-03-13",
          location: "Lokalizacja Znajomego 1",
          description: "Opis wydarzenia znajomego 1",
        },
      ],
    },
    {
      title: "Wydarzenia Publiczne",
      data: [
        {
          id: 1,
          title: "Publiczne Wydarzenie 1",
          date: "2024-03-10",
          location: "Publiczna Lokalizacja 1",
          description: "Opis publicznego wydarzenia 1",
        },
        {
          id: 2,
          title: "Publiczne Wydarzenie 2",
          date: "2024-03-11",
          location: "Publiczna Lokalizacja 2",
          description: "Opis publicznego wydarzenia 2",
        },
      ],
    },
  ];

  const onRefreshPressed = () => {
    console.log("Odświeżono");
  };

  return (
    <>
      <View style={[styles.root, { height: height * 1 }]}>
        <View style={styles.windowTab}>
          <Text style={styles.title} resizeMode="contain">
            Wyszukaj wydarzenia
          </Text>
          <ScrollView showsVerticalScrollIndicator={false}>
            <EventList data={data} />
          </ScrollView>
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
