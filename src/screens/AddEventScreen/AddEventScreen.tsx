import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  Alert, Animated, ActivityIndicator, TouchableOpacity, Pressable,
} from "react-native";
import React, {useContext, useEffect, useState} from "react";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Geocoding from "react-native-geocoding";
import { ApiContext } from "../../context/ApiContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { EventsContext } from "../../context/EventsContext";
import { useNavigation } from "@react-navigation/native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import {TimerPickerModal} from "react-native-timer-picker";
import {getFormattedTime} from "../../components/Utils/timeFormat.util";


Geocoding.init(process.env.REACT_APP_GEOCODING_API_KEY);

const AddEventScreen = () => {
  const [eventName, setEventName] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [isPrivate, setIsPrivate] = useState<boolean>(false);

  const [eventDescription, setEventDescription] = useState("");
  const { height } = useWindowDimensions();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [timeString, setTimeString] = useState<
      string | null
  >(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const { post } = useContext(ApiContext);
  const { loadAllEvents } = useContext(EventsContext);
  const navigation = useNavigation();
  const [isRegisteringEvent, setIsRegisteringEvent] = useState<boolean>(false)

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setSelectedDate(date);
    hideDatePicker();
  };

  const onRegisterPressed = async () => {
    setIsRegisteringEvent(true)
    if (!eventName || !selectedDate || !timeString || !city || !address || !eventDescription) {
      Alert.alert("Powiadomienie", "Wszystkie pola muszą być wypełnione.");

      setIsRegisteringEvent(false)
      return;
    }

    selectedDate.setHours(timeString.split(":")[0]);
    selectedDate.setMinutes(timeString.split(":")[1]);

    if (selectedDate < Date.now()) {
      Alert.alert("Powiadomienie", "Data musi być późniejsza niż aktualna.");

      setIsRegisteringEvent(false)
      return;
    }

    try {
      const response = await Geocoding.from(city + ' ' + address);
      const { results } = response;

      if (results && results.length > 0) {
        const { geometry } = results[0];
        const { location } = geometry;

        post(
            "event",
            {
              name: eventName,
              description: eventDescription,
              longitude: location.lng,
              latitude: location.lat,
              city: city,
              postal_code: "12-345",
              address: address,
              date: selectedDate.toDateString() + " " + timeString,
              isPrivate: isPrivate,
            },
            (res) => {
              setIsRegisteringEvent(false)
              loadAllEvents();
              setSelectedDate(null)
              setEventName("")
              setIsPrivate(false)
              setTimeString("")
              setCity("")
              setAddress("")
              setEventDescription("")
              navigation.navigate("InviteFriendsToEvent", {eventId: res.data["eventId"]});
            },
            (res) => {
              setIsRegisteringEvent(false)
              Alert.alert("Błąd", "Wystąpił błąd podczas rejestracji wydarzenia.");
            }
        );
      } else {
        setIsRegisteringEvent(false)
        Alert.alert(
            "Błąd",
            "Nie można znaleźć podanego adresu."
        );
      }
    } catch (error) {
      setIsRegisteringEvent(false)
      Alert.alert(
          "Błąd",
          "Nie można znaleźć podanego adresu."
      );
    }
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
            <BouncyCheckbox
                size={25}
                fillColor="#F2B138"
                unFillColor="#131417"
                text="Wydarzenie publiczne"
                iconStyle={{ borderColor: "#F2B138" }}
                innerIconStyle={{ borderWidth: 2 }}
                textStyle={{
                  color: "#999999",
                  textDecorationLine: "none",
                }}
                onPress={(isChecked: boolean) => {setIsPrivate(!isChecked)}}
            />

            <Pressable onPress={showDatePicker}>
              <CustomInput
                  placeholder="Data wydarzenia"
                  readonly={true}
                  value={selectedDate ? selectedDate.toLocaleString([], {
                      year: "numeric",
                      month: "numeric",
                      day: "numeric",
                    }) : ""}
                  editable={false}
                  secureTextEntry={undefined}
                  additionalStyle={styles.inputDate}
              />
            </Pressable>
            <Pressable
                onPress={() => setShowPicker(true)}>
              <CustomInput
                  placeholder="Godzina rozpoczęcia"
                  readonly={true}
                  value={timeString}
                  editable={false}
                  secureTextEntry={undefined}
                  additionalStyle={styles.inputDate}
              />
            </Pressable>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
            <TimerPickerModal
                hideSeconds
                hideCancelButton
                visible={showPicker}
                setIsVisible={setShowPicker}
                onConfirm={(time) => {
                  setTimeString(getFormattedTime(time.hours, time.minutes));
                  setShowPicker(false);
                }}
                modalTitle="Godzina rozpoczęcia"
                onCancel={() => setShowPicker(false)}
                closeOnOverlayPress
                styles={{
                  theme: "dark",
                }}
                modalProps={{
                  overlayOpacity: 0.2,
                }}
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
          <CustomButton
            text={isRegisteringEvent ? (<ActivityIndicator size={"large"} />) : "Dodaj wydarzenie"}
            onPress={onRegisterPressed}
            type="PRIMARY"
            bgColor={undefined}
            fgColor={undefined}
            additionalStyles={styles.addEventButton}
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

export default AddEventScreen;
