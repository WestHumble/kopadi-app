import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  Alert,
  Animated,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Geocoding from "react-native-geocoding";
import { ApiContext } from "../../context/ApiContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { EventsContext } from "../../context/EventsContext";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import add = Animated.add;
import Checkbox from "../../components/Checkbox";

Geocoding.init(process.env.REACT_APP_GEOCODING_API_KEY);

const EventViewScreen = (event) => {
  const route = useRoute();
  const EventData = route.params?.marker;
  const [eventName, setEventName] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");

  const [eventDescription, setEventDescription] = useState("");
  const { height } = useWindowDimensions();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const { post } = useContext(ApiContext);
  const { loadAllEvents } = useContext(EventsContext);
  const navigation = useNavigation();

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.warn("A date has been picked: ", date);
    setSelectedDate(date);
    hideDatePicker();
  };

  return (
    <>
      <View style={[styles.root, { height: height * 1 }]}>
        <View style={styles.windowTab}>
          <Text style={styles.title} resizeMode="contain">
            Dodaj wydarzenie
          </Text>
          <ScrollView showsVerticalScrollIndicator={false}>
            <CustomInput
              placeholder="Podaj nazwę wydarzenia"
              value={eventName}
              setValue={setEventName}
              secureTextEntry={undefined}
              additionalStyle={styles.inputEventName}
            />
            <CustomInput
              placeholder="Data wydarzenia"
              readonly={true}
              value={selectedDate ? selectedDate.toDateString() : ""}
              editable={false}
              setValue={setSelectedDate}
              secureTextEntry={undefined}
              additionalStyle={styles.inputDate}
            />
            <CustomButton
              text="Wybierz datę wydarzenia"
              onPress={showDatePicker}
              type="PRIMARY"
              bgColor={undefined}
              fgColor={undefined}
              additionalStyles={styles.inputDateButton}
            />
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
            <CustomInput
              placeholder="Podaj miasto"
              value={city}
              setValue={setCity}
              secureTextEntry={undefined}
              additionalStyle={styles.inputAddress}
            />
            <CustomInput
              placeholder="Podaj ulicę i numer"
              value={address}
              setValue={setAddress}
              secureTextEntry={undefined}
              additionalStyle={styles.inputAddress}
            />
            <CustomInput
              placeholder="Opis wydarzenia"
              value={eventDescription}
              setValue={setEventDescription}
              secureTextEntry
              inputType="textArea"
              additionalStyle={styles.textArea}
            />
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
  inputDate: {
    color: "#fff",
  },
  inputDateButton: {
    marginTop: 10,
    borderRadius: 20,
    paddingVertical: 0,
    marginBottom: 20,
  },
  textArea: { color: "#fff" },
  addEventButton: {
    marginTop: 0,
    borderRadius: 20,
    paddingVertical: 0,
    bottom: 0,
  },
  inputAddress: {
    color: "#fff",
  },
  inputEventName: {
    color: "#fff",
  },
});

export default EventViewScreen;
