import React from "react";
import { View, Text, SectionList, StyleSheet } from "react-native";
import CustomButton from "../CustomButton";

const NotificationItem = ({ notification }) => (
  <View style={styles.notificationContainer}>
    <Text style={styles.title}>{notification.title}</Text>
    { notification.action() && (<CustomButton
      text={notification.actionText()}
      onPress={() => notification.action()}
      type="PRIMARY"
      bgColor={undefined}
      fgColor={undefined}
  />)}
  </View>
);

const NotificationList = ({ data }) => (
  <SectionList
    sections={data}
    keyExtractor={(item, index) => item.id.toString()}
    renderSectionHeader={({ section: { title } }) => (
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderText}>{title}</Text>
      </View>
    )}
    renderItem={({ item }) => (
      <NotificationItem
        title={item.name}
        date={item.name}
        location={item.name}
        description={item.description}
      />
    )}
    renderSectionFooter={({ section }) =>
      section.data.length === 0 && (
        <View style={styles.noEventsContainer}>
          <Text style={styles.noEventsText}>Brak wydarzeń</Text>
        </View>
      )
    }
  />
);

const styles = StyleSheet.create({
  notificationContainer: {
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
  noEventsContainer: {
    padding: 16,
    alignItems: "center",
  },
  noEventsText: {
    fontSize: 16,
    color: "#888",
  },
});

export default NotificationList;
