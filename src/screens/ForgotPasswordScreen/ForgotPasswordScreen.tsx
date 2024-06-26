import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../context/AuthContext";
import { ApiContext } from "../../context/ApiContext";

const ForgotPasswordScreen = () => {
  const [emailToResetPassword, setEmailToResetPassword] = useState("");
  const navigation = useNavigation();
  const { height } = useWindowDimensions();
  const { resetPasswordToken, resetPasswordTokenInit } =
    useContext(AuthContext);
  const { post } = useContext(ApiContext);
  const onResetPasswordPressed = () => {
    post(
      "reset_password",
      {
        email: emailToResetPassword,
        token: resetPasswordToken,
      },
      navigation.navigate("ResetPassword"),
      null,
      true
    );
  };
  const onBackToLoginPressed = () => {
    navigation.navigate("SignIn");
  };

  useEffect(() => {
    resetPasswordTokenInit();
  }, []);
  return (
    <View style={[styles.root, { height: height * 1 }]}>
      <View style={styles.windowTab}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.title} resizeMode="contain">
            Zresetuj swoje hasło
          </Text>
          <CustomInput
            placeholder="Podaj e-mail"
            value={emailToResetPassword}
            setValue={setEmailToResetPassword}
            secureTextEntry={undefined}
            additionalStyle={{
              color: "#fff",
            }}
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
        </ScrollView>
      </View>
    </View>
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
    height: "92%",
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
    color: "#ffffff",
  },
});

export default ForgotPasswordScreen;
