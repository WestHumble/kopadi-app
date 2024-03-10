import React from "react";
import { View, Text, SectionList, StyleSheet } from "react-native";

const EventItem = ({ title, date, location, description }) => (
  <View style={styles.eventContainer}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.date}>{date}</Text>
    <Text style={styles.location}>{location}</Text>
    <Text style={styles.description}>{description}</Text>
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
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
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
    backgroundColor: "#f0f0f0",
    padding: 8,
  },
  sectionHeaderText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default EventList;
