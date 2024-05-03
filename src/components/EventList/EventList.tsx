import React from "react";
import {View, Text, Image, SectionList, StyleSheet, TouchableWithoutFeedback} from "react-native";
import eventButton from "../../../assets/images/right-alt-yellow.png";
import {useNavigation} from "@react-navigation/native";

const EventItem = ({ date, month, title, hour, id }) => {
  const navigation = useNavigation()
  const onEventPressed = () => {
    navigation.navigate("EventView", {eventId: id})
  }
  return (
      <View style={styles.eventContainer}>
        <View style={styles.eventDate}>
          <Text style={styles.month}>{month}</Text>
          <Text style={styles.date}>{date}</Text>
        </View>
        <View style={styles.eventContent}>
          <Text style={styles.hour}>{hour}</Text>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.eventButton}>
          <TouchableWithoutFeedback  onPress={onEventPressed}>
            <Image
                source={eventButton}
                style={styles.eventButtonImg}
                resizeMode="contain"
            />
          </TouchableWithoutFeedback>
        </View>
      </View>
  );
}

function konwerterDaty(data) {
  const months = [
    "Sty",
    "Lut",
    "Mar",
    "Kwi",
    "Maj",
    "Cze",
    "Lip",
    "Sie",
    "Wrz",
    "Paź",
    "Lis",
    "Gru",
  ];
  const month = months[data.getMonth()];
  return month;
}

const EventList = ({ data }) => (
  <SectionList
    sections={data}
    stickySectionHeadersEnabled={false}
    keyExtractor={(item, index) => index.toString() + item.id.toString()}
    renderSectionHeader={({ section: { title } }) => (
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderText}>{title}</Text>
      </View>
    )}
    renderItem={({ item }) => (
      <EventItem
        id = {item.id}
        month={konwerterDaty(new Date(item.date.date))}
        date={new Date(item.date.date).toLocaleString([], {
          day: "numeric",
        })}
        title={item.name}
        hour={new Date(item.date.date).toLocaleString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
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
  eventContainer: {
    padding: 16,
    marginVertical: 4,
    backgroundColor: "#131417",
    borderRadius: 20,
    shadowColor: "black",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    flexDirection: "row",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  date: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  month: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  hour: {
    color: "#F2B138",
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
    paddingVertical: 8,
    marginVertical: 4,
  },
  noEventsContainer: {
    padding: 16,
    alignItems: "center",
  },
  noEventsText: {
    fontSize: 16,
    color: "#888",
  },
  eventDate: {
    marginRight: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F2B138",
    padding: 8,
    width: 70,
    height: 70,
    borderRadius: 10,
  },
  eventContent: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
  },
  eventButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  eventButtonImg: {
    width: 30,
    height: 30,
  },
});

export default EventList;
