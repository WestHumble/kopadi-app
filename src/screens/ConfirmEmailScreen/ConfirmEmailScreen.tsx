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

const ConfirmEmailScreen = () => {
  const [emailConfirmCode, setEmailConfirmCode] = useState("");
  const navigation = useNavigation();

  const onRegisterPressed = () => {
    console.warn("Kliknięto rejestrację");
  };
  const onResendPressed = () => {
    console.warn("Kliknięto wyślij ponownie");
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
          Potwierdź swój adres e-mail
        </Text>
        <CustomInput
          placeholder="Podaj kod potwierdzający"
          value={emailConfirmCode}
          setValue={setEmailConfirmCode}
          secureTextEntry={undefined}
        />
        <CustomButton
          text="Potwierdź adres e-mail"
          onPress={onRegisterPressed}
          type="PRIMARY"
          bgColor={undefined}
          fgColor={undefined}
        />

        <CustomButton
          text="Wyślij ponownie kod potwierdzający"
          onPress={onResendPressed}
          type="SECONDARY"
          bgColor={undefined}
          fgColor={"white"}
        />
        <CustomButton
          text="Cofnięcie do logowania"
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

export default ConfirmEmailScreen;
