import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import React, {useContext, useState} from "react";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import {AuthContext} from "../../context/AuthContext";
import {resetPasswordHandle} from "../../components/Api/resetPassword";

const ResetPasswordScreen = () => {
  const [resetPasswordCode, setResetPasswordCode] = useState("");
  const [resetPassword, setResetPassword] = useState("");
  const [resetPasswordConfirm, setResetPasswordConfirm] = useState("");
  const navigation = useNavigation();
  const { resetPasswordToken } = useContext(AuthContext);

  const onSetNewPasswordPressed = () => {
    resetPasswordHandle(resetPasswordToken, resetPassword, resetPasswordCode)
        .then(()=>{navigation.navigate("SignIn")})
        .catch(()=>{
          console.error("Reset password failed")
          navigation.navigate("SignIn")
        })
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

export default ResetPasswordScreen;
