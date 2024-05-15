import {
  View,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  Text,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useState } from "react";
import Avatar from "../../components/Avatar";
import { ChatContext } from "../../context/ChatContext";
import CustomButton from "../../components/CustomButton";
import { FriendsContext } from "../../context/FriendsContext";
import { Friend } from "../../types/friend";
const DisplayProfileScreen = ({ route }) => {
  const { userId, userName, userSurname } = route.params;
  const { initChat, initializingChat } = useContext(ChatContext);
  const { friends, inviteSent, sendFriendInvite, deleteFriendInvite } =
    useContext(FriendsContext);

  const { height } = useWindowDimensions();

  return (
    <>
      <View style={[styles.root, { height: height * 1 }]}>
        <View style={styles.windowTab}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.avatarDiv}>
              <View style={styles.imageProfile}>
                <Avatar
                  userId={userId}
                  userName={userName}
                  userSurname={userSurname}
                  style={styles.avatarImage}
                  allowRedirect={false}
                />
              </View>
            </View>
            <View style={styles.dataDiv}>
              <Text style={styles.titleSectionHeader} resizeMode="contain">
                Imię i nazwisko
              </Text>
              <Text style={styles.title} resizeMode="contain">
                {userName} {userSurname}
              </Text>
              <View style={{ height: 20 }}></View>
              <CustomButton
                additionalStyles={{
                  margin: 0,
                }}
                additionalStylesText={{
                  fontSize: 18,
                }}
                text={
                  inviteSent.find((e) => e.id === userId) ||
                  friends.find((e) => e.id === userId)
                    ? "Usuń znajomego"
                    : "Dodaj znajomego"
                }
                onPress={() =>
                  inviteSent.find((e) => e.id === userId) ||
                  friends.find((e) => e.id === userId)
                    ? deleteFriendInvite({ id: userId })
                    : sendFriendInvite({ id: userId })
                }
                type="PRIMARY"
                bgColor={undefined}
                fgColor={undefined}
              />
              <CustomButton
                text={
                  initializingChat ? (
                    <ActivityIndicator size={"large"} />
                  ) : (
                    "Czat"
                  )
                }
                disabled={initializingChat}
                onPress={() => initChat([{ id: userId }])}
                type="PRIMARY"
                bgColor={undefined}
                fgColor={undefined}
                additionalStylesText={{
                  fontSize: 18,
                }}
              />
            </View>
          </ScrollView>
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
  avatarDiv: {
    zIndex: 0,
    flexDirection: "row",
    justifyContent: "center",
  },
  refreshIcon: {
    width: 20,
    height: 20,
    alignSelf: "center",
    tintColor: "#F2B138",
  },
  changeAvatarIcon: {
    position: "absolute",
    zIndex: 1,
    alignSelf: "flex-end",
    marginTop: 80,
    marginLeft: 50,
    backgroundColor: "#1D1F24",
    borderRadius: 50,
    padding: 5,
    right: 85,
    bottom: 9,
    borderWidth: 1,
    borderColor: "#F2B138",
  },
  imageProfile: {
    zIndex: 0,
    borderWidth: 3,
    borderColor: "#F2B138",
    borderRadius: 50,
    margin: 10,
  },
  dataDiv: {
    marginTop: 20,
  },
  titleSectionHeader: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#F2B138",
  },
  avatarImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
    backgroundColor: "#F2B138",
  },
});

export default DisplayProfileScreen;
