import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState } from "react";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Geocoding from "react-native-geocoding";

Geocoding.init(process.env.REACT_APP_GEOCODING_API_KEY);

const AddEventScreen = () => {
  const [eventName, setEventName] = useState("");
  const [address, setAddress] = useState("");
  const [addressCoordinates, setAddressCoordinates] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [eventDescription, setEventDescription] = useState("");
  const { height } = useWindowDimensions();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

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

  const onRegisterPressed = () => {
    try {
      // Sprawdź, czy wszystkie dane są uzupełnione
      if (!eventName || !selectedDate || !address || !eventDescription) {
        Alert.alert("Powiadomienie", "Wszystkie pola muszą być wypełnione.");
        return;
      }

      //Bbiekt z danymi wydarzenia
      const eventData = {
        eventName,
        selectedDate: selectedDate.toISOString(),
        address,
        addressCoordinates,
        eventDescription,
      };

      console.log("Dane wydarzenia:", eventData);

      // Wywołaj funkcję do wysyłki danych przez REST API
      // const response = await register(eventData);

      // Sprawdź odpowiedź od serwera
      if (response.status === 200) {
        console.log("Wydarzenie zarejestrowane pomyślnie!");
        // Możesz również dodać nawigację do innej strony lub inny kod obsługi sukcesu
      } else {
        console.error("Błąd podczas rejestracji wydarzenia:", response.data);
        Alert.alert("Błąd", "Wystąpił błąd podczas rejestracji wydarzenia.");
      }
    } catch (error) {
      console.error("Błąd podczas rejestracji wydarzenia:", error);
      Alert.alert("Błąd", "Wystąpił nieoczekiwany błąd.");
    }
  };

  const onAddressChange = async (inputAddress) => {
    setAddress(inputAddress);

    try {
      const response = await Geocoding.from(inputAddress);
      const { results } = response;

      if (results && results.length > 0) {
        const { geometry } = results[0];
        const { location } = geometry;

        console.log("Koordynaty:", location);
        setAddressCoordinates({
          latitude: location.lat,
          longitude: location.lng,
        });
      } else {
        Alert.alert(
          "Błąd",
          "Nie można znaleźć koordynatów dla podanego adresu."
        );
      }
    } catch (error) {
      console.error("Błąd geokodowania:", error);
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
            />
            <CustomInput
              placeholder="Data wydarzenia"
              value={selectedDate ? selectedDate.toDateString() : ""}
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
              placeholder="Podaj adres wydarzenia"
              value={address}
              setValue={onAddressChange}
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
            text="Dodaj wydarzenie"
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
    paddingVertical: 25,
    marginBottom: 20,
  },
  textArea: { color: "#fff" },
  addEventButton: {
    marginTop: 20,
    borderRadius: 20,
    paddingVertical: 25,
    bottom: 0,
  },
  inputAddress: {
    color: "#fff",
  },
});

export default AddEventScreen;
