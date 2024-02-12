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

const SignUpScreen = () => {
  const [userFullName, setUserFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const navigation = useNavigation();

  const onRegisterPressed = () => {
    console.warn("Kliknięto rejestrację");
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
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title} resizeMode="contain">
          Utwórz konto
        </Text>
        <CustomInput
          placeholder="Podaj Imię i Nazwisko"
          value={userFullName}
          setValue={setUserFullName}
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
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
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
    color: "#003f63",
  },
});

export default SignUpScreen;
