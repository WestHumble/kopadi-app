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
import SocialSignInButtons from "../../components/SocialSignInButtons";
import { useNavigation } from "@react-navigation/native";
import { ApiContext } from "../../context/ApiContext";

const SignUpScreen = () => {
  const [surname, setSurname] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const navigation = useNavigation();
  const { height } = useWindowDimensions();
  const { post } = useContext(ApiContext);

  const onRegisterPressed = () => {
    post(
      "register",
      {
        email,
        password,
        name,
        surname,
      },
      () => {
        navigation.navigate("ConfirmEmail");
      },
      null,
      true
    );
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
              additionalStyle={styles.inputName}
            />
            <CustomInput
              placeholder="Podaj Nazwisko"
              value={surname}
              setValue={setSurname}
              secureTextEntry={undefined}
              additionalStyle={styles.inputSurname}
            />
            <CustomInput
              placeholder="Podaj adres e-mail"
              value={email}
              setValue={setEmail}
              secureTextEntry={undefined}
              additionalStyle={styles.inputEmail}
            />
            <CustomInput
              placeholder="Podaj hasło"
              value={password}
              setValue={setPassword}
              secureTextEntry
              additionalStyle={styles.inputPassword}
            />
            <CustomInput
              placeholder="Powtórz hasło"
              value={passwordRepeat}
              setValue={setPasswordRepeat}
              secureTextEntry
              additionalStyle={styles.inputPasswordRepeat}
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
            <CustomButton
              text="Masz konto? - przejdź do logowania"
              onPress={onBackToLoginPressed}
              type="TERTIARY"
              bgColor={undefined}
              fgColor={undefined}
            />
          </ScrollView>
        </View>
        {/* <MapViewComponent /> */}
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
    marginTop: "15%",
    color: "#fff",
  },
  inputEmail: {
    color: "#fff",
  },
  inputPassword: {
    color: "#fff",
  },
  inputPasswordRepeat: {
    color: "#fff",
  },
  inputName: {
    color: "#fff",
  },
  inputSurname: {
    color: "#fff",
  },
});

export default SignUpScreen;
