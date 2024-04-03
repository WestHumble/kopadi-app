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
import {FriendsContext} from "../../context/FriendsContext";
import FriendList from "../../components/FriendList";

const SearchFriendsScreen = () => {
  const navigation = useNavigation();
  const { height } = useWindowDimensions();
  const [searchPhrase, setSearchPhrase] = useState("");
  const {
    friends,
    isSearchActive
  } =
      useContext(FriendsContext);

  const data = [
    {
      title: "Znajomi",
      data: isSearchActive ? friends : friends,
    },
  ];

  const onSearchPressed = () => {
    // searchEvents(searchPhrase)
  };

  return (
    <>
      <View style={[styles.root, { height: height * 1 }]}>
        <View style={styles.windowTab}>
          <FriendList data={data} />
          <CustomInput
            placeholder="Szukaj"
            value={searchPhrase}
            setValue={setSearchPhrase}
            secureTextEntry={undefined}
            additionalStyle={styles.searchInput}
          />
          <CustomButton
            text="Szukaj"
            onPress={onSearchPressed}
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
  searchInput: {color: "#fff"},
});

export default SearchFriendsScreen;
