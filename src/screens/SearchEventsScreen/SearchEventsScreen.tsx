import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import React, { useContext, useState } from "react";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import EventList from "../../components/EventList";
import { EventsContext } from "../../context/EventsContext";

const SearchEventsScreen = () => {
  const { height } = useWindowDimensions();
  const [searchPhrase, setSearchPhrase] = useState("");
  const {
    eventsCreated,
    eventsInvited,
    eventsOther,
    searchEvents,
    eventsCreatedSearch,
    eventsInvitedSearch,
    eventsOtherSearch,
    isSearchActive,
  } = useContext(EventsContext);

  const onSearchPressed = () => {
    searchEvents(searchPhrase);
  };
  console.log(eventsInvited);

  return (
    <>
      <View style={[styles.root, { height: height * 1 }]}>
        <View style={styles.windowTab}>
          <EventList
            data={[
              {
                title: "Moje",
                data: isSearchActive ? eventsCreatedSearch : eventsCreated,
              },
              {
                title: "Zaproszone",
                data: isSearchActive ? eventsInvitedSearch : eventsInvited,
              },
              {
                title: "Publiczne",
                data: isSearchActive ? eventsOtherSearch : eventsOther,
              },
            ]}
          />
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
  searchInput: { color: "#fff" },
});

export default SearchEventsScreen;
