import React from "react";
import { View, Text, SectionList, StyleSheet, Image } from "react-native";
import CustomButton from "../CustomButton";

const API_ADDRESS = process.env.EXPO_PUBLIC_API_URL;
const FriendItem = ({
  friend,
  action,
  actionText,
  hideAction = () => false,
}) => (
  <View style={styles.friendContainer}>
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        display: "flex",
      }}
    >
      <View
        style={{
          flex: 3 / 4,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Image
          style={{
            width: 50,
            height: 50,
            borderRadius: 5,
            marginRight: 10,
            padding: 1,
            shadowColor: "black",
            backgroundColor: "#222",
          }}
          source={{ uri: `${API_ADDRESS}/api/avatar/get/${friend.id}` }}
        />
        <Text style={styles.name}>
          {friend.name} {friend.surname}
        </Text>
      </View>
      <View style={{ flex: 1 / 4 }}>
        {action && !hideAction(friend) && (
          <CustomButton
            text={actionText(friend)}
            onPress={() => action(friend)}
            type="PRIMARY"
            bgColor={undefined}
            fgColor={undefined}
          />
        )}
      </View>
    </View>
  </View>
);

const FriendList = ({ data, action, actionText, hideAction }) => (
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
        friend={item}
        action={action}
        actionText={actionText}
        hideAction={hideAction}
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
