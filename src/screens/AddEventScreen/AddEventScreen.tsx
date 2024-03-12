import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { register } from "../../components/Api/register";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const AddEventScreen = () => {
  const [eventName, setEventName] = useState("");
  const [adress, setAdress] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
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
    register(email, password, name, surname)
      .then(() => {
        navigation.navigate("ConfirmEmail");
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };
  const onBackToLoginPressed = () => {
    navigation.navigate("SignIn");
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
              value={adress}
              setValue={setAdress}
              secureTextEntry={undefined}
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
});

export default AddEventScreen;
