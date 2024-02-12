import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import Logo from "../../../assets/images/Logo-Test.png";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import SocialSignInButtons from "../../components/SocialSignInButtons";
import { useNavigation } from "@react-navigation/native";

const SignInScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { height } = useWindowDimensions();
  const navigation = useNavigation();

  const onSignInPressed = () => {
    //Validacja logowania usera
    navigation.navigate("Home");
  };
  const onForgotPressed = () => {
    console.warn("Klikniecie zapomniałem hasła");
  };
  const onCreateAccPressed = () => {
    navigation.navigate("SignUp");
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Image
          source={Logo}
          style={(styles.logo, { height: height * 0.3 })}
          resizeMode="contain"
        />
        <CustomInput
          placeholder="Podaj adres e-mail"
          value={email}
          setValue={setEmail}
          secureTextEntry={undefined}
        />
        <CustomInput
          placeholder="Hasło"
          value={password}
          setValue={setPassword}
          secureTextEntry
        />
        <CustomButton
          text="Zaloguj"
          onPress={onSignInPressed}
          type="PRIMARY"
          bgColor={undefined}
          fgColor={undefined}
        />
        <CustomButton
          text="Zapomniałem hasła"
          onPress={onForgotPressed}
          type="TERTIARY"
          bgColor={undefined}
          fgColor={undefined}
        />
        <SocialSignInButtons />
        <CustomButton
          text="Nie mam konta - zarejestruj się"
          onPress={onCreateAccPressed}
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
  logo: {
    width: "70%",
    maxWidth: 300,
    maxHeight: 200,
  },
});

export default SignInScreen;
