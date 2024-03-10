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
import SocialSignInButtons from "../../components/SocialSignInButtons";
import { useNavigation } from "@react-navigation/native";
import { register } from "../../components/Api/register";

const AddEventScreen = () => {
  const [surname, setSurname] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const navigation = useNavigation();
  const { height } = useWindowDimensions();

  const onRegisterPressed = () => {
    register(email, password, name, surname)
      .then(() => {
        navigation.navigate("ConfirmEmail");
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };
  const onTermsOfUsePressed = () => {
    console.warn("Kliknięto warunki użytkowania");
  };
  const onPrivatePolicyPressed = () => {
    console.warn("Kliknięto politykę prywatności");
  };
  const onBackToLoginPressed = () => {
    navigation.navigate("SignIn");
  };

  return (
    <>
      <View style={[styles.root, { height: height * 1 }]}>
        <View style={styles.windowTab}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.title} resizeMode="contain">
              Utwórz konto
            </Text>
            <CustomInput
              placeholder="Podaj Imię"
              value={name}
              setValue={setName}
              secureTextEntry={undefined}
            />
            <CustomInput
              placeholder="Podaj Nazwisko"
              value={surname}
              setValue={setSurname}
              secureTextEntry={undefined}
            />
            <CustomInput
              placeholder="Podaj adres e-mail"
              value={email}
              setValue={setEmail}
              secureTextEntry={undefined}
            />
            <CustomInput
              placeholder="Podaj hasło"
              value={password}
              setValue={setPassword}
              secureTextEntry
            />
            <CustomInput
              placeholder="Powtórz hasło"
              value={passwordRepeat}
              setValue={setPasswordRepeat}
              secureTextEntry
            />
            <CustomButton
              text="Zarejestruj"
              onPress={onRegisterPressed}
              type="PRIMARY"
              bgColor={undefined}
              fgColor={undefined}
            />
            <Text style={styles.text}>
              Rejestrując się, potwierdzasz, że akceptujesz{" "}
              <Text style={styles.link} onPress={onTermsOfUsePressed}>
                Warunki użytkowania
              </Text>{" "}
              i{" "}
              <Text style={styles.link} onPress={onPrivatePolicyPressed}>
                Politykę prywatności
              </Text>
            </Text>
            <SocialSignInButtons />
            <CustomButton
              text="Masz konto? - przejdź do logowania"
              onPress={onBackToLoginPressed}
              type="TERTIARY"
              bgColor={undefined}
              fgColor={undefined}
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
    // right: "3%",
    // left: "3%",
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
    marginTop: "15%",
    color: "#fff",
  },
});

export default AddEventScreen;
