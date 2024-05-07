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
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../context/AuthContext";
import { ApiContext } from "../../context/ApiContext";

const ResetPasswordScreen = () => {
  const [resetPasswordCode, setResetPasswordCode] = useState("");
  const [resetPassword, setResetPassword] = useState("");
  const { height } = useWindowDimensions();
  const [resetPasswordConfirm, setResetPasswordConfirm] = useState("");
  const navigation = useNavigation();
  const { resetPasswordToken } = useContext(AuthContext);
  const { post } = useContext(ApiContext);

  const onSetNewPasswordPressed = () => {
    post(
      "reset_password/handle",
      {
        token: resetPasswordToken,
        newPassword: resetPassword,
        code: resetPasswordCode,
      },
      navigation.navigate("SignIn"),
      null,
      true
    );
  };
  const onBackToLoginPressed = () => {
    navigation.navigate("SignIn");
  };

  return (
    <View style={[styles.root, { height: height * 1 }]}>
      <View style={styles.windowTab}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.title} resizeMode="contain">
            Zresetuj swoje hasło
          </Text>
          <CustomInput
            placeholder="Podaj kod z maila"
            value={resetPasswordCode}
            setValue={setResetPasswordCode}
            secureTextEntry={undefined}
          />
          <CustomInput
            placeholder="Podaj hasło"
            value={resetPassword}
            setValue={setResetPassword}
            secureTextEntry={undefined}
          />
          <CustomInput
            placeholder="Powtórz hasło"
            value={resetPasswordConfirm}
            setValue={setResetPasswordConfirm}
            secureTextEntry={undefined}
          />
          <CustomButton
            text="Wyślij"
            onPress={onSetNewPasswordPressed}
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
    color: "#003f63",
  },
});

export default ResetPasswordScreen;
