import React from "react";
import {View, Text, SectionList, StyleSheet, Image} from "react-native";

const API_ADDRESS = process.env.EXPO_PUBLIC_API_URL;
const FriendItem = ({ id, name, surname }) => (
  <View style={styles.friendContainer}>
      <Image
          style={{width: 100, height: 100}}
          source={{uri:`${API_ADDRESS}/api/avatar/get/${id}`}}
      />
    <Text style={styles.name}>{name} {surname}</Text>
  </View>
);

const FriendList = ({ data }) => (
  <SectionList
    sections={data}
    keyExtractor={(item, index) => item.id.toString()}
    renderSectionHeader={({ section: { title } }) => (
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderText}>{title}</Text>
      </View>
    )}
    renderItem={({ item }) => (
      <FriendItem
          id={item.id}
          name={item.name}
          surname={item.surname}
      />
    )}
    renderSectionFooter={({ section }) =>
      section.data.length === 0 && (
        <View style={styles.noFriendsContainer}>
          <Text style={styles.noFriendsText}>Brak znajomych</Text>
        </View>
      )
    }
  />
);

const styles = StyleSheet.create({
  friendContainer: {
    padding: 16,
    marginVertical: 4,
    backgroundColor: "#131417",
    borderRadius: 20,
    shadowColor: "black",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
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
  noFriendsContainer: {
    padding: 16,
    alignItems: "center",
  },
  noFriendsText: {
    fontSize: 16,
    color: "#888",
  },
});

export default FriendList;
