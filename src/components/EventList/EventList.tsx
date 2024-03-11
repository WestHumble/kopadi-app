import React from "react";
import { View, Text, SectionList, StyleSheet } from "react-native";

const EventItem = ({ title, date, location, description }) => (
  <View style={styles.eventContainer}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.date}>{date}</Text>
    <Text style={styles.location}>{location}</Text>
  </View>
);

const EventList = ({ data }) => (
  <SectionList
    sections={data}
    keyExtractor={(item, index) => item.id.toString()}
    renderSectionHeader={({ section: { title } }) => (
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderText}>{title}</Text>
      </View>
    )}
    renderItem={({ item }) => (
      <EventItem
        title={item.title}
        date={item.date}
        location={item.location}
        description={item.description}
      />
    )}
  />
);

const styles = StyleSheet.create({
  eventContainer: {
    padding: 16,
    marginVertical: 4,
    backgroundColor: "#131417",
    borderRadius: 20,
    shadowColor: "black",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  date: {
    color: "#888",
  },
  location: {
    color: "#888",
  },
  description: {
    marginTop: 8,
  },
  sectionHeader: {
    color: "#fff",
    padding: 8,
    marginTop: 12,
  },
  sectionHeaderText: {
    fontSize: 21,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default EventList;
