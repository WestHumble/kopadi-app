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

const ForgotPasswordScreen = () => {
  const [emailToResetPassword, setEmailToResetPassword] = useState("");
  const navigation = useNavigation();

  const onResetPasswordPressed = () => {
    navigation.navigate("ResetPassword");
    console.warn("Kliknięto resetuj hasło");
  };
  const onBackToLoginPressed = () => {
    navigation.navigate("SignIn");
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title} resizeMode="contain">
          Zresetuj swoje hasło
        </Text>
        <CustomInput
          placeholder="Podaj e-mail"
          value={emailToResetPassword}
          setValue={setEmailToResetPassword}
          secureTextEntry={undefined}
        />
        <CustomButton
          text="Wyślij link do resetowania hasła"
          onPress={onResetPasswordPressed}
          type="PRIMARY"
          bgColor={undefined}
          fgColor={undefined}
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

export default ForgotPasswordScreen;
